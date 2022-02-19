import Base from './Base';

export default class DateNormalize extends Base {

  regIsDateNumOnly = /^(\d{4})(\d{2})(\d{2})$/;
  regStartDateNumWithBracket = /^【(\d{4})(\d{2})(\d{2})】(.*)$/;

  description() {
    return `\
【DateNormalize】
★日付の８桁数値を正規化(YYYY/MM/DD)
(1) オプション属性(optional_attributes[])のnameが"賞味（消費）期限（日付型）"の value 値全体文字列が８桁数値のものを正規化
(2) titleが【数値８桁】で始まっているものを正規化
`;
  }

  isTarget(zaico) {
    // カテゴリ
    const { title } = zaico;
    let opt;
    return typeof title === 'string' && this.regStartDateNumWithBracket.exec(title)
      || (opt = this._getLimit(zaico)) && this.regIsDateNumOnly.exec(opt);
  }

  editOne(zaico) {
    const { title } = zaico;
    let opt, res;
    if (typeof title === 'string' && (res = this.regStartDateNumWithBracket.exec(title))) {
      this._setTitleDate(zaico, `${res[1]}/${res[2]}/${res[3]}`);
    }
    if ((opt = this._getLimit(zaico)) && (res = this.regIsDateNumOnly.exec(opt))) {
      this._optSet(zaico, Base.OPTION_NAMES.LIMIT_DATE, `${res[1]}/${res[2]}/${res[3]}`);
    }
    return zaico;
  }
}
