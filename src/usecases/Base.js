import fs from 'fs';
import path from 'path';

export default class Base {

  static OPTION_NAMES = {
    LIMIT: '賞味期限（消費）',
    LIMIT_DATE: '賞味（消費）期限（日付型）',
    KEYWORD: 'キーワード',
    PLACE_OF_FOODDRIVE: 'フードドライブ場所',
  }

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
    return str && /^\d+年\d+月|^\d{4}\/\d{2}\/\d{2}\D?|^\d{8}\D?|^期限なし$/.test(str);
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

  _toDate(dtStr) {
    const str = dtStr.trim();
    let dstr;
    const fmtIsDate = str.match(/^\d{8}$/) && Date.parse(dstr = str.replace(/^(\d{4})(\d{2})/, '$1/$2/'));
    return fmtIsDate && new Date(dstr);
  }

  _formatDate(dt) {
    return [
      dt.getFullYear(),
      ('00' + (dt.getMonth()+1)).slice(-2),
      ('00' + dt.getDate()).slice(-2)
    ].join('/');
  }

  _isJan(code) {
    const janLengthArr = [8, 13]; // JANの長さ定義
    return (typeof code === 'string') && code.match(/^\d+$/) && janLengthArr.includes(code.length);
  }
}
