# Ez.el
要素を取得します。

## ドキュメント全体から取得
``id="description"``の要素を取得します。

```javascript
var id_description = Ez.el("#description");
```

``class="description"``の要素を取得します
```javascript
var class_description = Ez.el(".description");
```

``<li>"``の要素を取得します
```javascript
var class_description = Ez.el("<li");
//（注意｝Ez.el("<li>");では無くEz.el("<li");です。
```

## 指定の要素内から取得
``#project_01/.title/.image``にある要素を取得します。
```javascript
var Project_01__title_image = Ez.el("#project_01").el(".title").el(".image");
```
通常のパスと同じように ``/`` で区切ったり、組み合わせて使う事もできます。
```javascript
var Project_01__title_image = Ez.el("#project_01/.title/.image");

var Project_01__title_image = Ez.el("#project_01/.title").el(".image");

```

## 親要素の取得
親要素を取得します
```html
<div id="a">
    <div id="b">
        <div id="c">

        </div>
    </div>
</div>
```

```javascript
var id_c = Ez.el("#c");

var id_b = id_c.el("..");

var id_a = id_c.el("..").el("..");

var id_a = id_c.el("../..");


```


## [取得できる内容](./el_Object.md)
