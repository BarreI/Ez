# ドラッグ・アンド・ドロップを実装する


# デフォルト位置を保存する
スワイプを検知した時、ここで設定した``d`` + ``スワイプ量``で新しい位置へオブジェクトを移動させます。
```javascript
var d = {
    y:Number(Ez.el("#obj").style.get("top").slice(0, -2)),
    x:Number(Ez.el("#obj").style.get("left").slice(0, -2))
};
```

# イベントを設定
スワイプされた事を検知する為にイベントを設定しておきます。
```javascript
Ez.el("#obj").click({
    move:{
        on_event(location,click_remove_event_object){
            //事前に保存しておいたデフォルト位置をベースに、新しいオブジェクト位置を計算して適応します。
            Ez.el("#obj").style.set("left",d.x + location.moved.x + "px");
            Ez.el("#obj").style.set("top",d.y + location.moved.y + "px");

        }
    },
    ended(location,click_remove_event_object){
        //マウスや画面から指が離れた時にデフォルト位置を更新します。
        d = {
            y:Number(Ez.el("#obj").style.get("top").slice(0, -2)),
            x:Number(Ez.el("#obj").style.get("left").slice(0, -2))
        };
    }
});
```

# 完成形
```javascript
    var d = {
        y:Number(Ez.el("#obj").style.get("top").slice(0, -2)),
        x:Number(Ez.el("#obj").style.get("left").slice(0, -2))
    };

    Ez.el("#obj").click({
    move:{
        on_event(location,click_remove_event_object){
            //事前に保存しておいたデフォルト位置をベースに、新しいオブジェクト位置を計算して適応します。
            Ez.el("#obj").style.set("left",d.x + location.moved.x + "px");
            Ez.el("#obj").style.set("top",d.y + location.moved.y + "px");

        }
    },
    ended(location,click_remove_event_object){
        //マウスや画面から指が離れた時にデフォルト位置を更新します。
        d = {
            y:Number(Ez.el("#obj").style.get("top").slice(0, -2)),
            x:Number(Ez.el("#obj").style.get("left").slice(0, -2))
        };
    }
});
```

## 変数を使用して実装する
```javascript
var obj = Ez.el("#obj");

var d = {
    y:Number(obj.style.get("top").slice(0, -2)),
    x:Number(obj.style.get("left").slice(0, -2))
};

obj.click({
move:{
    on_event(location,click_remove_event_object){
        //事前に保存しておいたデフォルト位置をベースに、新しいオブジェクト位置を計算して適応します。
        obj.style.set("left",d.x + location.moved.x + "px");
        obj.style.set("top",d.y + location.moved.y + "px");

    }
},
ended(location,click_remove_event_object){
    //マウスや画面から指が離れた時にデフォルト位置を更新します。
    d = {
        y:Number(obj.style.get("top").slice(0, -2)),
        x:Number(obj.style.get("left").slice(0, -2))
    };
}
});
```