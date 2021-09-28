import Base from './Base';

export default class CountNotZero extends Base {

  description() {
    return `\
【CountNotZero】
★数量＞０、「賞味（消費）期限（日付型）」あり
(1) 物品名の先頭の「賞味（消費）期限（日付型）」,【賞味期限】を値の正規化を行い再設定(期限なしのみ正規化はしない)
=
「賞味（消費）期限（日付型）」フォーマットがおかしい場合にはエラーを出力

YYYY年MM月DD => YYYY/MM/DD
YYYY/MM/DD   => YYYY/MM/DD
YYYYMMDD     => YYYY/MM/DD
期限なし     => 期限なし

([月/-])DDの省略時は、その月の一番最後の日にする

`;
  }

  isTarget(zaico) {
    // 数量
    const quantity = this.toNum(zaico.quantity);
    if (quantity === undefined) {
      return false; // 初期導入データなのでスキップ
    }
    const limit = this._getLimit(zaico);
    if (quantity < 1 || !limit) return false; // (1) skip
     if (!this._isLimitStr(limit)) {
       return this._err('フォーマットエラー', zaico, limit);
     }
     const d = this._toDate(limit);
     if (d && d.getTime() < Date.now()) {
       return this._err('古い期限', zaico, limit);
     }
     return true;
  }

  _err(msg, zaico, limit) {
    const { id, code, title } = zaico;
    console.error(`${Base.OPTION_NAMES.LIMIT_DATE}: ${msg}`, JSON.stringify({ id, code, title, limit }, null, ''));
    return false;
  }

  editOne(zaico) {
    const limit = this._getLimit(zaico);
    const d = this._toDate(limit);
    this._setTitleDate(zaico, d || Base.UNLIMIT_DATE);
    return zaico;
  }
}
