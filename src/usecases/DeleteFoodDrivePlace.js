import Base from './Base';

export default class DeleteFoodDrivePlace extends Base {

  description() {
    return `\
【DeleteFoodDrivePlace】
★オプション属性の name が "${Base.OPTION_NAMES.PLACE_OF_FOODDRIVE}" で value が文字列で存在する場合。
(1) valueを "" にする
`;
  }

  isTarget(zaico) {
    const place = this._optValue(zaico, Base.OPTION_NAMES.PLACE_OF_FOODDRIVE);
    return typeof place === 'string' && place.length > 0;
  }

  editOne(zaico) {
    this._optSet(zaico, Base.OPTION_NAMES.PLACE_OF_FOODDRIVE, '');
    return zaico;
  }
}
