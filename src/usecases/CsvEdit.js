import fs from 'fs';
import iconv from 'iconv-lite';
import csv from 'csv';
import jp from 'jsonpath';

import Base from './Base';

export default class CsvEdit extends Base {

  static CSV_DEFINE_FILE = './csv_define.json';

  preEdit() {
    return new Promise((resolve, reject) => {
      this.initCsvDef();
      fs.createReadStream('20200227エースコック.csv')
        .pipe(iconv.decodeStream('SJIS'))
        .pipe(iconv.encodeStream('UTF-8'))
        .pipe(csv.parse())
        .pipe(csv.transform(function(record) {
          if (this.csvHeader) {
            const ukey = this.getUniquekeyStr(record);
            this.csvData[ukey] = record;
          } else {
            this.csvColumns = record;
            this.csvHeader = record.reduce((acc, col, idx) => ({ ...acc, [col]: idx }), {});
            this.csvData = {};
          }
          console.log('pipe', record);
        }))
        .on('end', () => resolve())
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
    if (typeof this.csvdef.input !== 'string') err('inputがStringではありません');
    if (!fs.exists(this.csvdef.input)) err('inputファイルが存在しません');
    if (typeof this.csvdef.mapping !== 'object') err('mappingがObjectではありません');
    if (!Array.isArray(this.csvdef.uniquekey)) err('uniquekeyがArrayではありません');
    if (!this.csvdef.uniquekey.length) err('uniquekeyの要素がありません');
    if (!Array.isArray(this.csvdef.update)) err('updateがArrayではありません');
    if (!Array.isArray(this.csvdef.delete)) err('deleteがArrayではありません');
  }

  zaicoUniquekeyStr(zaico) {
    return this.csvdef.uniquekey.map(col => `${this.zaicoValue(zaico, col)}`).join(':');
  }

  zaicoPath(col) {
    const err = (s) => { throw new Error(`CSV定義ファイル(update)：${s}`); };
    if (this.csvdef.mapping[col] === undefined) err(`カラム[${col}]がmappingに定義されていません`);
    return this.csvdef.mapping[col].replace('{key}', col);
  }

  zaicoValue(zaico, col) {
    return jp.query(zaico, this.zaicoPath(col));
  }

  description() {
    return `\
【CsvEdit】
★CSVファイルのデータ
(1) 更新データが zaico の値と違う場合上書き
(2) 削除指定データがある場合、削除用データを作成
`;
  }

  isUpdateTarget(zaico) {
    const uperr = (s) => { throw new Error(`CSV定義ファイル(update)：${s}`); };
    return this.csvdef.update.some(col => {
      const key = this.zaicoUniquekeyStr(zaico);
      const record = this.csvData[key];
      if (record === undefined) uperr(`csvデータにキー[${key}]が存在しません`);
      const val = record[this.csvHeader[col]];
      const zval = this.zaicoValue(zaico, col);
      if (!zval) return false;
      if (typeof zval === 'number') return parseInt(val, 10) !== zval;
      if (typeof zval === 'string') return val !== zval;
      return false; // 数値・文字列以外は現状更新させない
    });
  }

  isDeleteTarget(zaico) {
    const delerr = (s) => { throw new Error(`CSV定義ファイル(delete)：${s}`); };
    return this.csvdef.delete.some(delInfo => {
      if (typeof delInfo.column !== 'string') delerr(`column定義が不正です(column)`);
      if (typeof delInfo.regexp !== 'string') delerr(`column定義が不正です(regexp)`);
      const re = new RegExp(delInfo.regexp);
      const zval = this.zaicoValue(zaico, col);
      return re.test(`${zval}`);
    });
  }

  isTarget(zaico) {
    return this.isUpdateTarget(zaico) || this.isDeleteTarget(zaico);
  }

  editOne(zaico) {
    if (this.isDeleteTarget(zaico)) {
      return { id: zaico.id };
    }
    // update
    return this.csvdef.update.reduce((acc, col) => {
      const v = this.csvData[this.zaicoUniquekeyStr()][this.csvHeader[col]];
      const zv = this.zaicoValue(zaico, col);
      if (v != zv) jp.value(acc, this.zaicoPath(col), typeof zv === 'number' ? parseInt(v) : v);
      return acc;
    }, zaico);
  }
}
