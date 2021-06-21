 ``?``は任意設定
```javascript
    {
        a?:"この値は設定しなくても動く",
        b:"この値は必須設定"
    }
```

# 形
 
 ```javascript
    Ez.el("#example").click({
        /**
         * クリック時 
         */
        click?:(x,y,remove_event){

        },
        /**
         * タップ時
        */
        tap?:(x,y,remove_event){

        },
        /**
         * stopPropagation 設定
         */
        stop_propagation?:boolean,
        /**
         * 右クリックの設定
         */
        right_click?:{
            /**
             * 右クリック時
             */
            on_event:(x,y,remove_event){

            },
        },
        /**
         * ロングクリックの設定
         */
        long_click?:{
            /**
             * 長押しが検知された時
             */
            on_event:(x,y,remove_event){

            },
            /**
             * 長押しとして判定する時間（ミリ秒）
             */
            duration:number,
        },
        /**
         * 長押しの設定
         */
        long_tap?:{
            /**
             * 長押し時
             */
            on_event:(x,y,remove_event){

            },
            /**
             * 長押しとして判定する時間（ミリ秒)
             */
            duration:number
        },
        /**
         * 複数回クリックの設定
         */
        double_click?:{
            /**
             * 複数回クリック時
             * 設定された時間内に指定された回数クリックされたら実行
             */
            on_event:(locations,remove_event){

            },
            /**
             * 時間設定
             */
            duration:number,
            /**
             * 回数設定
             */
            times:number,
        },
        /**
         * スワイプの設定
         */
        move?:{
            /**
             * スワイプ時
             */
            on_event:(location,remove_event){

            },
        },
        /**
         * イベントキャンセルの設定
         */
        cancel?:{
            /**
             * キャンセル時
             */
            on_event:(location,remove_event){

            }
        },
        /**
         * イベント終了時
         */
        ended?:(location,remove_event){

        }
    }):void
```


# 引数(locations)
```javascript
const locations = {
    start:{
        x:number,
        y:number
    },
    end:{
        x:number,
        y:number
    },
    moved?:{//移動量
        x:number,
        y:number
    }
};
```

# 引数(remove_event)
```javascript
const remove_event = {
    all_events:function(){},//Ez.el() に含まれている要素からclickを解除します
    this_event:function(){}//このイベントが実行された要素上からclickを解除します。
}
```
