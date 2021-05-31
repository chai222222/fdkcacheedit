# fdkcacheedit

jangetterで取得した Zaico キャッシュデータを、運用コマンドによって編集し、差分編集ファイル(JSON)を作成するためのコマンド。

## usage

usage: fdkcacheedit [[CommandNames...] file]

### 使い方表示

```sh
$ fdkcacheedit<CR>
```

下記のフォーマットで使えるコマンドが列挙される

```
【コマンド名】
★このコマンドが大まかに何をやっているか
(n) やっていることを順に列挙
補足
```

### 全コマンド実行

```sh
$ fdkcacheedit cache_file<CR>
```

全てのコマンドをキャッシュファイルに適用し、結果差分がでたもののみ edited_cache_file という名前で保存する。

### 特定コマンドを実行

```sh
$ fdkcacheedit command1 cache_file<CR>          # １つのケース
$ fdkcacheedit command1 command2 cache_file<CR> # ２つのケース
```

指定されたコマンドのみをキャッシュファイルに適用し、結果差分がでたもののみ edited_cache_file という名前で保存する。

---

### usage

usage: fdkcacheedit [[CommandNames...] file]

【Category2Keyword】
★カテゴリに、空白以外で年月日,年月,期限なし以外が入っている
(1) カテゴリに入っているものをキーワードに移す。
(2) カテゴリは、賞味期限（消費）に期限値があれば設定する。なければから文字列にする。
(カテゴリは賞味期限の年月。なのでxxxx年yy月のものはそのまま)

【CountNotZero】
★数量＞０、賞味期限消費あり、名前に期限を含まない
(1) 物品名の先頭に【賞味期限】を追加

【CountZero】
★数量＜１ 、賞味期限に20を含む
(1) 物品名の先頭の【賞味期限】を削除
(2) 賞味期限（消費）の数字を削除

【CountMinus】
★数量＜０
(1) 数量を０にする

【DeleteFoodDrivePlace】
★オプション属性の name が "フードドライブ場所" で value が文字列で存在する場合。
(1) valueを "" にする

【CsvEdit】
★CSVファイル(./csv_define.jsonのinputへ記述})のデータを読み込んで更新
(1) 更新データが zaico の値と違う場合上書き
(2) 削除指定データがある場合、削除用データを作成

【DeleteNullItems】
全条件にマッチしたデータの削除
数量(quantity)がnull
画像(item_image.url)がnull

【DeleteNullItems】
全条件にマッチしたデータの削除
数量(quantity)がnull
画像(item_image.url)がnull
作成日時(created_at)と更新日時(updated_at)の値が等価
