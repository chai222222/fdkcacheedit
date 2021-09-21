import Base from './Base';

export default class CountNotZero extends Base {

  description() {
    return `\
【CountNotZero】
★数量＞０、「賞味（消費）期限（日付型）」あり、名前に期限を含まない
(1) 物品名の先頭に【賞味期限】を追加
`;
  }

  isTarget(zaico) {
    // 数量
    const quantity = this.toNum(zaico.quantity);
    if (quantity === undefined) {
      return false; // 初期導入データなのでスキップ
    }
    return quantity > 0 && this._isLimitStr(this._getLimit(zaico)) && !this._isLimitIntTitle(zaico);
  }

  editOne(zaico) {
    const limit = this._getLimit(zaico);
    zaico.title = `【${limit}】${zaico.title}`; // (1)
    return zaico;
  }
}
