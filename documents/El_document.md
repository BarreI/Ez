# ratio - 画面比率の取得
"Vertical" か "Horizontal" が設定されています。

- 画面が縦長の場合``Vertical``
- 画面が横長の場合``Horizontal``

# title - ページのタイトルを設定・取得

## get - ページタイトルを取得
```typescript
var title = Ez.document.title.get();
console.log(title);
```

## set - ページタイトルを設定
```typescript
Ez.document.title.set("New Page Title");
```