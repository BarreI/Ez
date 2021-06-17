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


# text オブジェクト - 文字の追加・変更と取得

## 文字の追加・更新
文字列を設定、更新します。

クラス``a`` の中にあるクラス``b``が全て``あ``になります。
```javascript
    Ez.el(".a/.b").text.set("あ");
```

## 文字の取得
```javascript
    var now_text = Ez.el(".a/.b").text.get();
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

# style の追加・変更と取得
## スタイルの追加・変更
```javascript
el_Object.style.set("top","50px");
```

## 複数のスタイルを同時に追加・変更
```javascript
el_Object.style.MultiSet({
    position:"absolute",
    left:"5%",
    top:"5%",
    width:"10%",
    height:"10%",
    backgroundColor:"black"
});
```

# scrollの設定 - オブジェクト

## auto - 自動スクロールの設定

### Vertical - 縦のスクロールを設定

 - top_to_bottom([引数の設定を見る](./scroll/auto.md)) 上から下へ 
 - bottom_to_top([引数の設定を見る](./scroll/auto.md)) 下から上へ

```javascript
el_Object.scroll.auto.Vertical.top_to_bottom
el_Object.scroll.auto.Vertical.bottom_to_top
 ```

### Horizontal - 横のスクロールを設定

 - right_to_left([引数の設定を見る](./scroll/auto.md)) 右から左へ 
 - left_to_right([引数の設定を見る](./scroll/auto.md)) 左から右へ

 ```javascript
el_Object.scroll.auto.Horizontal.right_to_left
el_Object.scroll.auto.Horizontal.left_to_right
 ```

# remove 関数 - 要素の削除
要素を削除します。
```javascript
el_Object.remove();
```




