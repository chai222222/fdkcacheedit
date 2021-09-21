import Base from './Base';

export default class CountZero extends Base {

  description() {
    return `\
【CountZero】
★数量＜１ 、「賞味（消費）期限（日付型）」が値を持つもの
(1) 物品名の先頭の【賞味期限】を削除
(2) 賞味期限（消費）の数字を削除
`;
  }

  isTarget(zaico) {
    // 数量
    const quantity = this.toNum(zaico.quantity);
    if (quantity === undefined) {
      return false; // 初期導入データなのでスキップ
    }
    const limit = this._optValue(zaico, Base.OPTION_NAMES.LIMIT_DATE);
    return quantity < 1 && typeof limit === 'string' && limit;
  }

  editOne(zaico) {
    zaico.title = this._titleWithoutDate(zaico.title); // (1)
    this._optSet(zaico, Base.OPTION_NAMES.LIMIT_DATE, null); // (2)
    return zaico;
  }
}
