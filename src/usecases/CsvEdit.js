import fs from 'fs';
import iconv from 'iconv-lite';
import csv from 'csv';

import Base from './Base';

export default class CsvEdit extends Base {

  constructor() {
    super();
    this.loadCsv();
  }

  loadCsv() {
    fs.createReadStream('20200227エースコック.csv')
      .pipe(iconv.decodeStream('SJIS'))
      .pipe(iconv.encodeStream('UTF-8'))
      .pipe(csv.parse())
      .pipe(csv.transform(function(record) {
        console.log('pipe', record);
      }));
    }

  description() {
    return `\
【CsvEdit】
★CSVファイルのデータ
(1) 更新データが zaico の値と違う場合上書き
(2) 削除指定データがある場合、削除用データを作成
`;
  }

  isTarget(zaico) {
    // 数量
    const quantity = this.toNum(zaico.quantity);
    if (quantity === undefined) {
      return false; // 初期導入データなのでスキップ
    }
    return quantity < 0;
  }

  editOne(zaico) {
    zaico.quantity = '0.0'; // (1)
    return zaico;
  }
}
