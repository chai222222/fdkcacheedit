import fs from 'fs';
import _ from 'lodash';
import JSONStream from 'JSONStream';
import Base from './Base';

export default class FixedTw extends Base {

  /**
   * 完全にタイトルが一致して jan フォーマットが正しいデータを除去し、単一コードのみを作成する。
   * map[char][title] = [{ id, code }];
   * @param {Object} map 正しいデータのマップ
   */
  static _normalizeCodeMap(map) {
    return Object.keys(map).reduce((nmap, key) => {
      if (Array.isArray(map[key])) {
        if(map[key].length === 1) {
          nmap[key] = map[key][0].code;
        } else {
          console.error('タイトルが一致していてJANが正しいものが複数あります', key, JSON.stringify(map[key], null, ''));
        }
      } else {
        nmap[key] = FixedTw._normalizeCodeMap(map[key]);
      }
      return nmap;
    }, {});
  }

  description() {
    return `\
【FixedTw】
★codeがtwではじまるデータ
(1) codeの値をJANで正しいものを検索して置き換える

正しいものは物品名から日付を外して、全データからjanがtwで始まらないもので物品名から日付を外た最短一致したもの。
JANは８桁、１３桁の数値文字列。
`;
  }

  preEdit(targetFile) {
    this.twMap = {};
    const normalMap = {}; // normalMap[[先頭１文字][title] = [ { code(String) twで始まらないcode, id } ]
    return new Promise((resolve, reject) => {
      const is = fs.createReadStream(targetFile, 'utf-8');
      is.pipe(JSONStream.parse('*'))
        .on('data', zaico => {
          const title = this._titleWithoutDate(zaico.title)
          const { code, id } = zaico;
          if (this._isJan(code)) { // codeが文字列値が入っていないものは無視する
            const firstChar = title.charAt(0);
            const path = `['${firstChar}']['${title}']`;
            const val = _.get(normalMap, path, []); // 完全一致が存在するので配列で持つ
            _.set(normalMap, path, [...val, { code, id }]);
          } else if (typeof code === 'string' && code.startsWith('tw')) { // zaico自動設定
            this.twMap[id] = { title, code }
          }
        }).on('error', (e) => {
          reject(e);
        }).on('end', () => {
          const nMap = FixedTw._normalizeCodeMap(normalMap); // normalMap[[先頭１文字][title] = code(String) twで始まらないcode
          _.toPairs(this.twMap).forEach(([id, vmap]) => {
            const firstChar = vmap.title.charAt(0);
            const title2code = _.get(nMap, `['${firstChar}']`, {});
            vmap.newCode = Object.keys(title2code).sort().reverse().reduce((acc, tit) => {
              return tit.startsWith(vmap.title) ? title2code[tit] : acc;
            }, undefined);
          });
          _.toPairs(this.twMap).forEach(([id, vmap]) => {
            if (!vmap.newCode) {
              const info = Object.assign({ id, ...vmap });
              console.error('修復不可', JSON.stringify(info, null, ''));
            }
          });
          resolve();
        });
    });
  }

  isTarget(zaico) {
    // 数量
    const quantity = this.toNum(zaico.quantity);
    if (quantity === undefined) {
      return false; // 初期導入データなのでスキップ
    }
    return this.twMap[zaico.id] && this.twMap[zaico.id].newCode;
  }

  editOne(zaico) {
    zaico.code = this.twMap[zaico.id].newCode;
    return zaico;
  }
}
