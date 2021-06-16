``?``は任意設定
```javascript
    {
        a?:"この値は設定しなくても動く",
        b:"この値は必須設定"
    }
```

# 例
```typescript
var settings =  {
    /**
     * スクロールスピード
     */
    speed?:number,
    /**
     * ループ設定
     */
    loop?:{
        /**
         * スクロール開始前に待機する時間
         */
        start_keep?:number,
        /**
         * スクロール終了状態で待機する時間
         */
        end_keep?:number,

    },
    /**
     * 終了時の設定
     */
    end?:{
        /**
         * 時間経過で停止する場合設定
         */
        time?:number,
        /**
         * クリックした時に停止
         */
        click?:boolean,
        /**
         * 手動でスクロールされた時に停止
         */
        scroll?:boolean,
        /**
         * スクロール検知に使用する感度
         */
        tolerance?:number,
        /**
         * 停止後自動的に再スタートする場合、秒数をミリ秒で指定
         */
        auto_restart?:number,
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