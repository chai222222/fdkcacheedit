import Base from './Base';

export default class CountZero extends Base {

  description() {
    return `\
【CountZero】
★数量＜１、名前に期限を含む
(1) 物品名の先頭の【賞味期限】を削除
(2) カテゴリを削除
(3) 賞味期限（消費）の数字を削除
`;
  }

  isTarget(zaico) {
    // 数量
    const quantity = this.toNum(zaico.quantity);
    if (quantity === undefined) {
      return false; // 初期導入データなのでスキップ
    }
    return quantity < 1 && this._isLimitIntTitle(zaico);
  }

  editOne(zaico) {
    zaico.title = zaico.title.replace(/^【[^】]+】/, ''); // (1)
    zaico.category = ''; // (2)
    this._optSet(zaico, Base.OPTION_NAMES.LIMIT, ''); // (3)
    return zaico;
  }
}
