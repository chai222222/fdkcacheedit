import Base from './Base';

export default class Category2Keyword extends Base {

  description() {
    return `\
【Category2Keyword】
★カテゴリの変更
カテゴリに、空白以外で年月日,年月,期限なし以外が入っている場合にカテゴリに入っているものをキーワードに移す。
カテゴリは、賞味期限（消費）に期限値があれば設定する。なければから文字列にする。
(カテゴリは賞味期限の年月。なのでxxxx年yy月のものはそのまま)
`;
  }

  isTarget(zaico) {
    // カテゴリ
    const { category } = zaico;
    return typeof category === 'string' && category && !this._isLimitStr(category);
  }

  editOne(zaico) {
    const { category } = zaico;
    this._optSet(zaico, Base.OPTION_NAMES.KEYWORD, category);
    const limit = this._getLimit(zaico);
    zaico.category = limit || '';
    return zaico;
  }
}
