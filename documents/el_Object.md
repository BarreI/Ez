# el_Object
ドキュメント内の要素を操作する為のオブジェクトです。

# はじめに
このオブジェクトを取得するには[要素を取得する](./el.md)に従って対象の要素を取得してください。

# raw 配列 - [Element](https://developer.mozilla.org/ja/docs/Web/API/Element)
要素のオブジェクトをそのまま返します。

``Ez.el`` で指定したパスに一致する全ての要素が配列で取得できます。

```javascript
[
    {element},
    {element},
    {element}
]
```


# [el](./el.md) 関数 - 別の要素を取得
要素の中で要素を検索します。

この例では``class_a``の中にある``b``クラスを検索しています。
``class_a``に複数の要素が含まれている場合、``class_a``に含まれている全ての要素内で検索されます。
```javascript
    var class_a = Ez.el(".a")
    var class_b = class_a.el(".b");
```

# id 文字列 - 要素のidを取得
``Ez.el``で指定した条件に一致する要素が一つしかない場合、その要素のidが設定されます。


# text 文字列 - 文字を設定
文字列を設定、更新します。

クラス``a`` の中にあるクラス``b``が全て``あ``になります。
```javascript
    Ez.el(".a/.b").text = "あ";
```


