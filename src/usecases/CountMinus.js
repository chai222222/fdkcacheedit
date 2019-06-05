import Base from './Base';

export default class CountMinus extends Base {

  description() {
    return `\
【CountMinus】
★数量＜０
(1) 数量を０にする
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
