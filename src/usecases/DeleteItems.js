import _ from 'lodash'
import Base from './Base';

class DeleteItems extends Base {

  _checkDefine() {
    // 派生クラスで必ず定義すること
    console.error('must be define derived class')
    process.exit(1);
  }

  getDescriptions() {
    this._checkDefine();
  }

  description() {
    const descs = this.getDescriptions();
    return `\
【DeleteNullItems】
全条件にマッチしたデータの削除
` + descs.join('\n') + '\n';
  }

  isTarget(zaico) {
    return this.isDeleteTarget(zaico);
  }

  isDeleteTarget(zaico) {
    this._checkDefine();
  }

  editOne(zaico) {
    if (!record) return zaico; // zaicoのデータがinputのcsvには存在しない
    return this.isDeleteTarget(zaico) ? ({ id: zaico.id }) : zaico;
  }
}

export class DeleteNullItems extends DeleteItems {

  getDescriptions() {
    return [
      '数量(quantity)がnull',
      '画像(item_image.url)がnull',
    ];
  }

  isDeleteTarget(zaico) {
    return zaico.quantity === null || _.get(zaico, 'item_image.url', null) === null;
  }
}

export class DeleteNullItemsNotUpdated extends DeleteNullItems {

  getDescriptions() {
    return [
      ...super.getDescriptions(),
      '作成日時(created_at)と更新日時(updated_at)の値が等価',
    ];
  }

  isDeleteTarget(zaico) {
    return super.isDeleteTarget(zaico) && zaico.created_at === zaico.updated_at;
  }
}
