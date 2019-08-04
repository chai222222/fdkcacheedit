import Base from './Base';

export default class CountNotZero extends Base {

  description() {
    return `\
【CountNotZero】
★数量＞０、賞味期限消費あり、名前に期限を含まない
(1) 物品名の先頭に【賞味期限】を追加
(2) カテゴリを追加（賞味期限の年月。YYYYMMDD => YYYY年MM月）
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
    zaico.title = `【${limit}】${zaico.title}`;
    zaico.category = this._limitStr2CategoryStr(limit);
    return zaico;
  }
}
