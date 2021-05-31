# el_Object
ドキュメント内の要素を操作する為のオブジェクトです。

# はじめに
``Ez.el()``もしくは``el_Object.el()``を使用して``el_Object``を取得してください。[Ez.elの説明](./el.md)

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

# class オブジェクト - クラスの追加と削除
要素にクラスを追加したり削除します。
## クラスの追加
クラス``a``を要素に追加します。
```javascript
el_Object.class.add("a");
```
## クラスの削除
クラス``a``を要素から削除します。
```javascript
el_Object.class.remove("a");
```

# remove 関数 - 要素の削除
要素を削除します。
```javascript
el_Object.remove();
```




