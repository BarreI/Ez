``?``は任意設定
```javascript
    {
        a?:"この値は設定しなくても動く",
        b:"この値は必須設定"
    }
```

# 例
```javascript
var settings =  {
    /**
     * スクロールスピード
     */
    speed?:number,
    /**
     * 終了時の設定
     */
    end?:{
        time?:number,//時間経過で自動停止
        touch?:boolean,//タッチした時に停止
        click?:boolean//クリックした時に停止
        /**
         * 停止後、自動的に初期地点に戻る
         */
        auto_back_to_start_point?:boolean,
    }
};

el_Object.scroll.auto.Vertical.top_to_bottom(settings);
el_Object.scroll.auto.Vertical.bottom_to_top(settings);
el_Object.scroll.auto.Horizontal.right_to_left(settings);
el_Object.scroll.auto.Horizontal.left_to_right(settings);
```