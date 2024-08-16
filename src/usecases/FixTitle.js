import Base from './Base';

// 先頭１文字を半角にする(全角英数字記号が前提)
const toFirstCharHarfWidthFunc = (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
// 文字列中の全角英数字ドットを半角にする
const toHarfWidthAlnumDotFunc = (s) => s.replace(/[０-９Ａ-Ｚａ-ｚ．]/g, toFirstCharHarfWidthFunc);

export default class FixTitle extends Base {

  description() {
    return `\
【FixTitle】
★タイトルの一括補正を行う
(1) 日付以外の先頭の 【～】を削除する
(2) 末尾が、空白＋数値(全角半角) ＋ 英字(全角半角) or 英数字以外 の場合の英数字の半角化
(3) 末尾が、半角内容量(数値(半角) ＋ 英字(半角) or 英数字以外)に、空白 + 半角内容量が続く場合に、半角内容量１つに加工
`;
  }

  changeTitle(title) {
    return title.replace(/^【(?!\d{4}\/\d{2}\/\d{2})[^】]*】/, '') // (1) の対応
      .replace(/\s+[0-9０-９]+[A-Za-zＡ-Ｚａ-ｚ]+$/, toHarfWidthAlnumDotFunc) // (2)
      .replace(/([0-9]+[^0-9]+) \1$/, '$1');
  }

  isTarget(zaico) {
    // タイトル
    const title = this.changeTitle(zaico.title);
    return title !== zaico.title;
  }

  editOne(zaico) {
    zaico.title = this.changeTitle(zaico.title); // (1)
    return zaico;
  }
}
