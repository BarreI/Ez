# 例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--これをHTMLのheadタグに貼り付けます。-->
    <script src="https://lp0ql.github.io/Ez/index.js"></script>
</head>
<body>
    <div id="a">
    </div>
</body>
<script>
    Ez.document.title.set("新しいタイトル")
    var el_Object = Ez.el("#a");
    el_Object.text.set("a");
<script>
</html>
```

# [戻る](./index.md)