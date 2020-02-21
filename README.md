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