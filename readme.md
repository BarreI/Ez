# EZについて
EzはJSから簡単にHTMLを操作する為のライブラリです。

# [更新履歴](./documents/updates/index.md)

# 未完成
このライブラリは未完成ですが、ドキュメント内にある事はできます。

# [ドキュメントを見る](./docs/documents/index.md)

# フォルダの説明

Ez
|_ index.ts - 次のバージョンの ts ファイル
|_ index.js - 次のバージョンの js ファイル
|_ ready.sh - ts を js に変換 & このディレクトリの ``test.js`` を ``docs/beta/test.js`` にコピー & docs 内にある次のバージョンのフォルダーに、このディレクトリの ts と js をコピー 
|_ npm_publish.sh - npm に公開する処理を実行
|
|_ documents - 次のバージョンのドキュメント
|_ docs - scriptタグでの読み込みに使用する github pages で公開中のフォルダ
|  |_ beta - 次のバージョンの js & ts ファイル
|  |   |_ index.js - 次のバージョンの js ファイル
|  |   |_ index.ts - 次のバージョンの ts ファイル
|  |   |_ test.html - ``ready.sh`` によってコピーされた ファイル
|  |_ documents - 現在のバージョンのドキュメント
|  |_ versions - バージョン毎の js & ts ファイルとドキュメント
|  |_ index.js - 現在のバージョンの js ファイル
|  |_ index.ts - 現在のバージョンの ts ファイル
