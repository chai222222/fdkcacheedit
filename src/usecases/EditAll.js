import fs from 'fs';
import path from 'path';

export default class EditAll {

  constructor(editors) {
    this.editors = editors;
    if (!editors.length) {
      throw new Error('コマンドが指定されていません');
    }
  }

  description() {
    console.log(this.editors.map(e => e.description()).join('\n'));
  }

  edit(targetPath) {
    return this._preEditAll(targetPath).catch(e => {
      console.log('前処理で失敗しました', e.message);
      return Promise.reject(e);
    }).then(() => {
      try {
        this._editTarget(targetPath);
      } catch (e) {
        console.log(e.message);
      }
    });
  }

  _editTarget(targetPath) {
    const arr = this._path2Json(targetPath);
    if (!Array.isArray(arr)) throw new Error(`ファイル ${targetPath} が配列形式になっていません。`);
    const res = this._editAll(arr);
    if (res && res.length) {
      const dir = path.dirname(targetPath);
      const base = path.basename(targetPath);
      const npath = path.join(dir, 'edited_' + base);
      this._json2Path(npath, res);
      if (process.env.FDKCACHEEDIT_OUTPUTORG) {
        const orgPath = path.join(dir, 'org_' + base);
        const idSet = new Set(res.map(info => String(info.id)));
        this._json2Path(orgPath, arr.filter(info => idSet.has(String(info.id))));
      }
    } else {
      console.log('編集したデータはありませんでした');
    }
  }

  _preEditAll(targetPath) {
    return Promise.all(this.editors.map(e => e.preEdit(targetPath)));
  }

  _editAll(zaicos) {
    return zaicos.map((zaico, idx) => {
      const editors = this.editors.filter(e => e.isTarget(zaico));
      if (editors.length) {
        console.log(`[${idx+1}/${zaicos.length}] ${zaico.title}`);
        const nZaico = editors.reduce((z, e) => e.editOne(z), this._cloneDeepJsonObj(zaico));
        if (!this._equalsDeep(zaico, nZaico)) return nZaico;
      }
      return undefined;
    }).filter(v => v);
  }

  _cloneDeepJsonObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  _equalsDeep(o1, o2) {
    return JSON.stringify(o1) === JSON.stringify(o2);
  }

  _json2path(targetPath, json) {
    fs.writeFileSync(targetPath, JSON.stringify(json, null, 2));
  }

  _path2Json(targetPath) {
    if (!fs.existsSync(targetPath)) {
      throw new Error(`ファイル ${targetPath} が存在しません。パスを確認してください。`);
    }
    try {
      console.log(`read... ${targetPath}`);
      return JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
    } catch (e) {
      throw new Error(`ファイル ${targetPath} の JSON 読み込みに失敗しました ${e}`);
    }
  }

  _json2Path(targetPath, json) {
    try {
      console.log(`write... ${targetPath}`);
      return fs.writeFileSync(targetPath, JSON.stringify(json, null, 2));
    } catch (e) {
      throw new Error(`ファイル ${targetPath} の JSON 書き込みに失敗しました ${e}`);
    }
  }

}
