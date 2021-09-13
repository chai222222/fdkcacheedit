import Base from './Base';

export default class CountMinusByExpiryDate extends Base {

  constructor() {
    super();
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    this._today = today;
  }

  description() {
    return `\
【CountMinusByExpiryDate】
★「賞味（消費）期限（日付型）」が空で「賞味期限（消費）」が入っている場合
(1) 日付を日付型にコピーする(「賞味期限（消費）」=>「賞味（消費）期限（日付型）」)
(2) 期限が過去であれば数値を０にし、タイトルから削除する
(3) 日付フォーマットがおかしい場合(8桁数値ではない、日付値としてありえないなど)の場合にはエラーを出す
`;
  }

  isTarget(zaico) {
    // 数量
    const quantity = this.toNum(zaico.quantity);
    if (quantity === undefined) {
      return false; // 初期導入データなのでスキップ
    }
    const limit = this._optValue(zaico, Base.OPTION_NAMES.LIMIT);
    const limitDate = this._optValue(zaico, Base.OPTION_NAMES.LIMIT_DATE);
    if (limitDate || !limit) return false;
    if (!this._toDate(limit)) {
      console.log(`[${zaico.title}] 日付不正(skip) [id:${zaico.id}, code:${zaico.code}]`); // (3)
      return false;
    }
    return true;
  }

  editOne(zaico) {
    const d = this._toDate(this._optValue(zaico, Base.OPTION_NAMES.LIMIT))
    this._optSet(zaico, Base.OPTION_NAMES.LIMIT_DATE, this._formatDate(d));
    // this._optSet(zaico, Base.OPTION_NAMES.LIMIT, '');
    if (d < this._today) {
      zaico.quantity = '0.0'; // (2)
      this._setTitleDate(zaico);
    } else {
      this._setTitleDate(zaico, d);
    }
    return zaico;
  }
}
