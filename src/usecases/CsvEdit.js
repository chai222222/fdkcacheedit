import fs from 'fs';
import iconv from 'iconv-lite';
import csv from 'csv';
import jp from 'jsonpath';

import Base from './Base';

export default class CsvEdit extends Base {

  static CSV_DEFINE_FILE = './csv_define.json';

  preEdit() {
    this.initCsvDef();
    return new Promise((resolve, reject) => {
      const warn = (s) => { console.error(`CSV：SKIP：${s}`); };
      fs.createReadStream(this.csvdef.input)
        .pipe(iconv.decodeStream('SJIS'))
        .pipe(iconv.encodeStream('UTF-8'))
        .pipe(csv.parse())
        .pipe(csv.transform((record) => {
          if (this.csvHeader) {
            const ukey = this.getUniquekeyStr(record);
            if (/^:*$/.test(ukey)) {
              warn(`ユニークカラムにデータがありません[${ukey}]`);
            } else if (this.csvData[ukey]) {
              warn(`[${ukey}]が重複しています`);
            } else {
              this.csvData[ukey] = record;
            }
          } else {
            this.csvColumns = record;
            this.csvHeader = record.reduce((acc, col, idx) => ({ ...acc, [col]: idx }), {});
            this.csvData = {};
          }
        }))
        .on('finish', () => resolve())
        .on('error', err => reject(err));
    });
  }

  getUniquekeyStr(record) {
    const err = (s) => { throw new Error(`CSV定義ファイル(uniquekey)：${s}`); };
    return this.csvdef.uniquekey.map(col => {
      if (!col || this.csvHeader[col] === undefined) err('カラム文字列が不正です');
      return record[this.csvHeader[col]];
    }).join(':');
  }

  initCsvDef() {
    this.csvdef = JSON.parse(fs.readFileSync(CsvEdit.CSV_DEFINE_FILE, 'utf-8'));
    const err = (s) => { throw new Error(`CSV定義ファイル：${s}`); };
    // 簡易チェック。そのうちちゃんとスキーマ定義にしたほうが良い
    if (typeof this.csvdef.input !== 'string') err('inputがStringではありません');
    if (!fs.existsSync(this.csvdef.input)) err(`inputファイル(${this.csvdef.input})が存在しません`);
    if (typeof this.csvdef.mapping !== 'object') err('mappingがObjectではありません');
    if (!Array.isArray(this.csvdef.uniquekey)) err('uniquekeyがArrayではありません');
    if (!this.csvdef.uniquekey.length) err('uniquekeyの要素がありません');
    if (!Array.isArray(this.csvdef.update)) err('updateがArrayではありません');
    if (!Array.isArray(this.csvdef.delete)) err('deleteがArrayではありません');
    if (!Array.isArray(this.csvdef.newArrayValue)) err('newArrayValueがArrayではありません');
  }

  zaicoUniquekeyStr(zaico) {
    return this.csvdef.uniquekey.map(col => `${this.zaicoValue(zaico, col)}`).join(':');
  }

  zaicoPath(col) {
    const err = (s) => { throw new Error(`CSV定義ファイル(update)：${s}`); };
    if (this.csvdef.mapping[col] === undefined) err(`カラム[${col}]がmappingに定義されていません`);
    return this.csvdef.mapping[col].replace('{key}', col);
  }

  zaicoValue(zaico, col, typeChecker = () => true) {
    return this.zaicoValueByPath(zaico, this.zaicoPath(col), typeChecker);
  }

  zaicoValueByPath(zaico, path, typeChecker = () => true) {
    const result = jp.query(zaico, path, 1);
    return result.length && typeChecker(result[0]) ? result[0] : undefined;
  }


  description() {
    return `\
【CsvEdit】
★CSVファイル(${CsvEdit.CSV_DEFINE_FILE}のinputへ記述})のデータを読み込んで更新
(1) 更新データが zaico の値と違う場合上書き
(2) 削除指定データがある場合、削除用データを作成
`;
  }

  isUpdateTarget(zaico, record) {
    const uperr = (s) => { throw new Error(`CSV定義ファイル(update)：${s}`); };
    return this.csvdef.update.some(col => {
      const val = record[this.csvHeader[col]];
      const zval = this.zaicoValue(zaico, col);
      if (zval === undefined) return false;
      if (typeof zval === 'number') return parseInt(val, 10) !== zval;
      if (typeof zval === 'string') return val !== zval;
      if (zval === null) return true; // zaico値が null の場合には文字列として上書きさせる
      return false; // 数値・文字列以外は現状更新させない
    });
  }

  isDeleteTarget(zaico, record) {
    const delerr = (s) => { throw new Error(`CSV定義ファイル(delete)：${s}`); };
    return this.csvdef.delete.some(delInfo => {
      if (typeof delInfo.column !== 'string') delerr(`column定義が不正です(column)`);
      if (typeof delInfo.regexp !== 'string') delerr(`column定義が不正です(regexp)`);
      const re = new RegExp(delInfo.regexp);
      const val = record[this.csvHeader[delInfo.column]];
      return re.test(`${val}`);
    });
  }

  isTarget(zaico) {
    const key = this.zaicoUniquekeyStr(zaico);
    const record = this.csvData[key];
    if (!record) return false; // zaicoのデータがinputのcsvには存在しない
    return this.isUpdateTarget(zaico, record) || this.isDeleteTarget(zaico, record);
  }

  editOne(zaico) {
    const key = this.zaicoUniquekeyStr(zaico);
    const record = this.csvData[key];
    if (!record) return zaico; // zaicoのデータがinputのcsvには存在しない
    if (this.isDeleteTarget(zaico, record)) {
      return { id: zaico.id };
    }
    // update
    return this.csvdef.update.reduce((acc, col) => {
      const v = this.csvData[this.zaicoUniquekeyStr(zaico)][this.csvHeader[col]];
      const zv = this.zaicoValue(zaico, col);
      if (v != zv) {
        const newVal = typeof zv === 'number' ? parseInt(v) : v;
        try {
          jp.value(acc, this.zaicoPath(col), newVal);
        } catch (e) {
          // 配列値への設定不可エラーだと思うので、新しい配列を追加するロジックを行う
          const nav = this.csvdef.newArrayValue.find(narr => narr.columns.includes(col));
          if (nav) { // 定義がある
            const { arrayPath, template } = nav;
            const arr = this.zaicoValueByPath(acc, arrayPath, Array.isArray) || [];
            arr.push(JSON.parse(template.replace('{key}', col).replace('{value}', newVal)));
            jp.value(acc, arrayPath, arr);
          }
        }
      }
      return acc;
    }, zaico);
  }
}
