import fs from 'fs';
import path from 'path';

export default class Base {

  /** optional attributes の name値 */
  static OPTION_NAMES = {
    LIMIT: '賞味期限（消費）',
    LIMIT_DATE: '賞味（消費）期限（日付型）',
    KEYWORD: 'キーワード',
    PLACE_OF_FOODDRIVE: 'フードドライブ場所',
  }

  /** 日時期限なし文字列 */
  static UNLIMIT_DATE = '期限なし';

  /** 日時フォーマット正規表現 */
  static DATE_PATTERN = new RegExp(`^(\\d{4})[-/年]?(\\d{2})[-/月]?(\\d{2})?\\D?|^${Base.UNLIMIT_DATE}$`);

  description() {
  }

  isTarget() {
    return false;
  }

  editOne() {
  }

  preEdit() {
    return Promise.resolve();
  }

  toNum(val) {
    if (typeof val === 'number') return val;
    if (typeof val !== 'string') {
      return undefined;
    }
    if (val.length === 0) return 0;
    try {
      return parseInt(val, 10);
    } catch (e) {
      return undefined;
    }
  }

  _isLimitStr(str) {
    return str && Base.DATE_PATTERN.test(str);
  }

  _isLimitIntTitle(zaico) {
    if (typeof zaico.title !== 'string' || !zaico.title) return false;
    const res = /^【([^】]+)】/.exec(zaico.title);
    // if (res) console.log('******', res[0]);
    return res && this._isLimitStr(res[1]);
  }

  _getLimit(zaico) {
    const limitIndex = this._optIndex(zaico, Base.OPTION_NAMES.LIMIT_DATE);
    return limitIndex >= 0 && zaico.optional_attributes[limitIndex].value || '';
  }

  _limitStr2CategoryStr(limit) {
    let m = limit.match(/^(\d+)年(\d+)月/);
    if (!m) m = limit.match(/^(\d{4})(\d{2})\d{2}/);
    if (!m) return limit;
    return `${m[1]}年${m[2]}月`;
  }

  _optIndex(zaico, targetName) {
    return Array.isArray(zaico.optional_attributes)
      ? zaico.optional_attributes.findIndex(({name}) => name === targetName)
      : -1;
  }

  _optValue(zaico, targetName) {
    const idx = this._optIndex(zaico, targetName);
    return idx < 0 ? undefined : zaico.optional_attributes[idx].value;
  }

  _optSet(zaico, targetName, value) {
    if (Array.isArray(zaico.optional_attributes)) {
      const idx = zaico.optional_attributes.findIndex(({name}) => name === targetName);
      if (idx >= 0) {
        zaico.optional_attributes[idx].value = value;
        return;
      }
    } else {
      zaico.optional_attributes = [];
    }
    zaico.optional_attributes.push({ name: targetName, value: value });
  }

  _titleWithoutDate(title) {
    return title.replace(/^【[^】]+】 */, '');
  }

  _setTitleDate(zaico, dt) {
    const nTitle = this._titleWithoutDate(zaico.title);
    zaico.title =  dt ? `【${this._formatDate(dt)}】${nTitle}` : nTitle;
  }

  _toDate(str) {
    const mArr = Base.DATE_PATTERN.exec(str);
    if (!Array.isArray(mArr) || mArr.length < 4) return null; // 日時フォーマットに合致しないか期限なし
    const [ , syear, smonth, sday ] = mArr;
    const d = new Date(parseInt(syear), parseInt(smonth) - 1, sday === undefined ? 1 : parseInt(sday));
    if (sday === undefined) { // year, monthのみ
      d.setMonth(d.getMonth() + 1);
      d.setDate(d.getDate() - 1);
    }
    return d;
  }

  /**
   * 旧日時フォーマット（数値８桁）から Date を作成して返します。
   * @param {String} dtStr 日時文字列
   * @return {Date|null} フォーマットが正しい場合 Date を返し、それ以外は falthy 値を返します。
   */
  _toDateOld(dtStr) {
    const str = dtStr.trim();
    let dstr;
    const fmtIsDate = str.match(/^\d{8}$/) && Date.parse(dstr = str.replace(/^(\d{4})(\d{2})/, '$1/$2/'));
    return fmtIsDate && new Date(dstr);
  }

  _formatDate(dt) {
    return dt instanceof Date
      ? [
          dt.getFullYear(),
          ('00' + (dt.getMonth()+1)).slice(-2),
          ('00' + dt.getDate()).slice(-2)
        ].join('/')
      : String(dt);
  }

  _isJan(code) {
    const janLengthArr = [8, 13]; // JANの長さ定義
    return (typeof code === 'string') && code.match(/^\d+$/) && janLengthArr.includes(code.length);
  }
}
