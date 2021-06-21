console.log("Ezを読み込みました。");

/**
 * 汚さないようにする
 */
const Ez = (function(){


    

    //画面がリサイズされた時のイベント
    function resize_function(){
        //document.ratioの設定
        (function(){
            const height:number = window.document.documentElement.clientHeight;
            const width:number = window.document.documentElement.clientWidth;

            if(width < height){
                Document.ratio = "Vertical";
            }else{
                Document.ratio = "Horizontal";
            };
        })();
    };

    //リサイズ時に実行
    window.addEventListener("resize",resize_function);




    const convart_to__el_Object = {
        /**
         * 複数の要素から生成
         * @param {Array} element - 取得したデータ
         * @param path - 取得に使用したテキスト
         */
        convart:function(elements_array,path:string){
            //複数のスタイルを同時に設定する時に使用するオブジェクト

            /**
             * 自動スクロール関数の引数
             */
            interface scrollBar_auto {
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
                     * 停止後、自動的にスクロールを再開する場合、再開までの時間をミリ秒で指定
                     */
                    auto_restart?:number,
                    /**
                     * 停止後、自動的に初期地点に戻る
                     */
                    auto_back_to_start_point?:boolean,
                }
            };

            /**
             * ドラッグ&ドロップで使用する位置オブジェクト
             */
            interface swipe_location{
                start:{
                    x:number,
                    y:number
                },
                end:{
                    x:number,
                    y:number
                },
                moved?:{
                    x:number,
                    y:number
                }
            };


            /**
             * イベントの削除オブジェクト
             */
            interface click_remove_event_interface {
                this_event:()=>void,
                all_events:()=>void
            };


            interface el_Object {
                /**
                 * パスを移動
                 * @param {string} path - 移動先の設定 - 現在のパス（./)は不要 -../で上の階層へ
                 */
                el(path:string):el_Object,
                /**
                 * 要素の削除
                 * - 現在、このオブジェクトに含まれている全ての要素を削除
                 */
                remove():void,
                /**
                 * クラスに関する設定
                 * - クラスの追加
                 * - クラスの削除
                 */
                class:{
                    /**
                     * クラスの追加
                     * @param {string} class_name - 追加するクラス名
                     */
                    add(class_name:string):void,
                    /**
                     * クラスの削除
                     * @param {string} class_name - 削除するクラス名
                     */
                    remove(class_name:string):void
                },
                /**
                 * スタイルの設定
                 */
                style:{
                    /**
                     * スタイルの取得
                     * @param {string} property_name - 取得したいプロパティ名(例：left) => 10px
                     * @return {string}
                     */
                    get(property_name:string):string,
                    /**
                     * スタイルの設定
                     * @param property_name - 設定するプロパティ名 
                     * @param value - 設定する値
                     */
                    set(property_name:string,value:string|number):void
                    /**
                     * 複数のスタイルを同時に設定
                     * @param {Object} settings 
                     */
                    MultiSet(settings:{[keys:string]:string}):void
                },
                /**
                 * テキストの設定
                 */
                text:{
                    /**
                     * 要素内に設定されているテキストを取得
                     */
                    get():string | null,
                    /**
                     * 要素に設定されているテキストを更新
                     * @param {string} value 
                     */
                    set(value:string|number):void
                },
                /**
                 * スクロールの設定
                 */
                scroll:{

                    /**
                     * 自動スクロールの設定
                     */
                    auto:{
                        _scroll_control(
                            from_start_point:"scrollLeft"|"scrollTop",
                            all_scroll:"scrollWidth"|"scrollHeight",
                            content_size:"clientWidth"|"clientHeight",
                            reverse:boolean,
                            settings:scrollBar_auto
                        ),
                        /**
                         * 縦に自動スクロール
                         */
                        Vertical:{
                            /**
                             * 上から下へ
                             */
                            top_to_bottom(settings:scrollBar_auto):("now"|"next_start"),
                            /**
                             * 下から上へ
                             */
                            bottom_to_top(settings:scrollBar_auto):("now"|"next_start")
                        },
                        /**
                         * 横に自動スクロール
                         */
                        Horizontal:{
                            /**
                             * 右から左へ
                             */
                            right_to_left(settings:scrollBar_auto):("now"|"next_start"),
                            /**
                             * 左から右へ
                             */
                            left_to_right(settings:scrollBar_auto):("now"|"next_start")
                        }
                    }
                },
                /**
                 * クリックとタップの処理
                 */
                click(settings:{                    
                    click?:(x:number,y:number,remove_event:click_remove_event_interface)=>void,
                    tap?:(x:number,y:number,remove_event:click_remove_event_interface)=>void,
                    stop_propagation?:boolean,
                    right_click?:{
                        on_event:(x:number,y:number,remove_event:click_remove_event_interface)=>void,
                    },
                    long_click?:{
                        on_event:(x:number,y:number,remove_event:click_remove_event_interface)=>void,
                        duration:number,
                    },
                    long_tap?:{
                        on_event:(x:number,y:number,remove_event:click_remove_event_interface)=>void,
                        duration:number
                    },
                    double_click?:{
                        on_event:(locations:swipe_location,remove_event:click_remove_event_interface)=>void,
                        duration:number,
                        times:number,
                    },
                    // double_tap?:{
                    //     on_event:(locations:swipe_location)=>void,
                    //     duration:number,
                    //     times:number
                    // },
                    move?:{
                        on_event:(location:swipe_location,remove_event:click_remove_event_interface)=>void,
                    },
                    cancel?:{
                        on_event:(location:swipe_location,remove_event:click_remove_event_interface)=>void
                    },
                    /**
                     * すべての一連のプロセスが終了した時に実行されます。
                     */
                    ended?:(location:swipe_location,remove_event:click_remove_event_interface)=>void
                }):void
                /**
                 * htmlのelement一覧
                 */
                raw:Element[],
                id?:string | null,

            };

            let re:el_Object = {
                /**
                 * 要素内で要素を検索 or 親要素へ移動
                 * @param path - 要素のid、クラス、タグ
                 */
                el:function(path:string){

                    function core(path){
                        return convart_to__el_Object.process.el(elements_array,path);
                    };
                    
                    //パス形式でい指定された時の処理
                    var splited = path.split("/");
                    var location = core(splited[0]);


                    splited.shift();
                    splited.forEach(path => {
                        location = location.el(path);
                    });
                    return location;
                    
                },
                raw:elements_array,
                /**
                 * 要素内のテキスト
                 */
                text:{
                    /**
                     * - 要素のテキストを取得
                     * - 複数の要素に対して実行した場合どの値が取得できるかは不明
                     */
                    get:function(){
                        var text = null;
                        try{
                            text = elements_array[0].innerText
                        }catch{
                            console.warn("テキストの取得に失敗しました。");
                        };

                        if(text){
                            return text;
                        }else{
                            return null;
                        }
                    },
                    /**
                     * 要素のテキストを更新する
                     * @param {string} value - 内容 
                     */
                    set:function(value:string){
                        elements_array.forEach(element => {
                            element.innerText = value;
                        });
                    }
                },
                /**
                 * スタイルの取得と設定
                 */
                style:{
                    /**
                     * - スタイルの取得
                     * - 複数のオブジェクトに対して実行する場合、どのオブジェクトのスタイルか不明
                     * @param {string} property_name - スタイルのプロパティ名を入力します 
                     */
                    get:function(property_name:string){
                        try{
                            return window.getComputedStyle(elements_array[0],null)[property_name]
                        }catch(e){
                            console.warn("スタイル" + property_name + "が取得できませんでした。値が正しい事を確認してください。");
                            console.warn(e);
                        };
                    },

                    /**
                     *  - スタイルの設定・更新
                     * @param property_name 
                     * @param value 
                     */
                    set:function(property_name:string,value:string | number){
                        elements_array.forEach(element => {
                            element.style[property_name] = value;
                        });
                    },

                    /**
                     * - 複数のスタイルを同時に設定 
                     * @param {object} settings -スタイルの設定
                     */
                    MultiSet:function(settings:{[keys:string]:string}){
                        Object.keys(settings).forEach(property_name => {
                            elements_array.forEach(element => {
                                element.style[property_name] = settings[property_name];
                            });
                        });
                    }
                },
                /**
                 * 要素のid
                 */
                id:null,
                /**
                 * 要素の削除
                 */
                remove:function(){
                    elements_array.forEach(element => {
                        element.remove();
                    });
                },
                /**
                 * クラスの設定
                 */
                class:{
                    //クラスの追加
                    add:function(class_name){
                        elements_array.forEach(element => {
                            element.classList.add(class_name);
                        });
                    },
                    //クラスの削除
                    remove:function(class_name){
                        elements_array.forEach(element => {
                            element.classList.remove(class_name);   
                        });
                    }
                },
                /**
                 * スクロール
                 */
                scroll:{
                    auto:{
                        _scroll_control:function(                
                            from_start_point,
                            all_scroll,
                            content_size,
                            reverse:boolean,
                            settings:scrollBar_auto
                        ){
                                //未設定の初期値を設定　
                                (function(){
                                    //スクロールのスピード
                                    if(!settings.speed){
                                        settings.speed = 14;
                                    };

                                    //スクロール検知時の感度
                                    if(!settings.end.tolerance){
                                        settings.end.tolerance = 10;
                                    };

                                    //スクロール開始前の待機時間
                                    if(settings.loop && !settings.loop.start_keep){
                                        settings.loop.start_keep = 1000;
                                    };

                                    //スクロール終了時の待機時間
                                    if(settings.loop && !settings.loop.end_keep){
                                        settings.loop.end_keep = 1000;
                                    };

                                })();

                                let global_switch = [];

                                elements_array.forEach(function(element,index){
                                    global_switch.push({
                                        loop_stop_status:0,
                                        move_stop_status:0,
                                        loop_stop:function(){
                                            global_switch[index].loop_stop_status++;

                                            if(settings.end.auto_restart){
                                                setTimeout(function(){
                                                    global_switch[index].move_stop_status--;
                                                    scroll();
                                                },settings.end.auto_restart);
                                            };
                                        },
                                        move_stop:function(){
                                            global_switch[index].move_stop_status++;
                                            //停止時に初期値に戻る設定がされている場合
                                            if(settings.end && settings.end.auto_back_to_start_point == true){
                                                reset();
                                            };

                                            if(settings.end.auto_restart){
                                                setTimeout(function(){
                                                    global_switch[index].move_stop_status--;
                                                    scroll();
                                                },settings.end.auto_restart);
                                            };
                                        }
                                    });

        
                                    function reset(){
                                        function reset_start_position(){
                                            if(reverse){
                                                element[from_start_point] = element[all_scroll] - element[content_size]
                                            }else{
                                                element[from_start_point] = 0;
                                            };
                                        };

                                        setTimeout(function(){

                                            if(settings.loop){
                                                reset_start_position();
                                                setTimeout(function(){
                                                    scroll();
                                                },settings.loop.start_keep);
                                            };
                                        },settings.loop.end_keep);
                                    };
        
                                    function scroll(Forecast:number|void){

                                        if(global_switch[index].move_stop_status == 0){
                                            if(Forecast){
                                                //予測位置と同じ（+- settings.end.toleranceまで許容)
                                                if(element[from_start_point] == Forecast || (element[from_start_point] < Forecast + settings.end.tolerance && element[from_start_point] > Forecast - settings.end.tolerance)){
                                                    //予測された位置と同じ
                                                }else{
                                                    //スクロールされた場合
                                                    if(settings.end && settings.end.scroll){
                                                        console.log("スクロールを検出した為停止しました。 予測：" + Forecast + " 実際:" + element[from_start_point] );
                                                        
                                                        global_switch[index].move_stop();
                                                        return;
                                                    }else{
                                                        console.warn("スクロールを検出しましたが、スクロール時に停止する設定がされていない為、スクロールを継続します。");
                                                    };
                                                };
                                            };

                                            var new_from_start_point_value;
                                            var old_from_start_point_value = Math.floor(element[from_start_point]);
                                            if(reverse){
                                                new_from_start_point_value = Math.floor(element[from_start_point]) - 1;
                                            }else{
                                                new_from_start_point_value = Math.floor(element[from_start_point]) + 1;
                                            };

                                            element[from_start_point] = new_from_start_point_value;

                                            setTimeout(function(){
                                                var max_scroll = element[all_scroll] - element[content_size];

                                                if(reverse){
                                                    if(new_from_start_point_value == old_from_start_point_value){
                                                        reset();
                                                    }else{
                                                        scroll(new_from_start_point_value);
                                                    };
                                                }else{
                                                    if(Math.floor(max_scroll) == old_from_start_point_value){
                                                        reset();
                                                    }else{
                                                        scroll(new_from_start_point_value);
                                                    };
                                                };
                                            },settings.speed);
                                        };
                                    };

                                    //各種イベント設定
                                    (function(){
                                        //クリックで終了が設定されてる時
                                        if(settings.end.click && settings.end.click == true){
                                            element.addEventListener("mousedown",function(){
                                                global_switch[index].move_stop();
                                            });
                                        };

                                        //タッチで終了が設定されている時
                                        if(settings.end.click && settings.end.click == true){
                                            element.addEventListener("touchdown",function(){
                                                global_switch[index].move_stop();
                                            })
                                        };

                                        //スクロールで終了が設定されている時
                                        if(settings.end.scroll && settings.end.scroll == true){
                                            element.addEventListener("wheel",function(e){
                                                
                                                if(from_start_point == "scrollLeft"){
                                                    //横スクロールの時
                                                    if(e.shiftKey == true){
                                                        global_switch[index].move_stop();
                                                    };
                                                }else{
                                                    //縦スクロールの時
                                                    if(e.shiftKey == false){
                                                        global_switch[index].move_stop();
                                                    };
                                                };
                                            });
                                        };

                                        //タイマーで終了が設定されている時
                                        if(settings.end.time){
                                            setTimeout(function(){
                                                global_switch[index].move_stop();
                                            },settings.end.time);
                                        };
                                    })();
        
                                    scroll();
                                });


                                
                                return function(end:"now"|"next_start"){
                                    //すべてのスクロールに対して停止を設定
                                    global_switch.forEach(settings_obj => {
                                        if(end == "next_start"){
                                            settings_obj.loop_stop();
                                        }else if(end == "now"){
                                            settings_obj.move_stop();
                                        };   
                                    });
                                };

                        },
                        Vertical:{
                            top_to_bottom:function(settings:scrollBar_auto){
                                return re.scroll.auto._scroll_control("scrollTop","scrollHeight","clientHeight",false,settings)
                            },
                            bottom_to_top:function(settings:scrollBar_auto){
                                return re.scroll.auto._scroll_control("scrollTop","scrollHeight","clientHeight",true,settings)
                            }
                        },
                        Horizontal:{
                            left_to_right:function(settings){
                                return re.scroll.auto._scroll_control("scrollLeft","scrollWidth","clientWidth",true,settings)

                            },
                            right_to_left:function(settings){
                                return re.scroll.auto._scroll_control("scrollLeft","scrollWidth","clientWidth",false,settings)


                            }
                        }
                        
                    }
                },
                click:function(settings){
                    //各要素のイベント削除用の関数配列
                    let global_remove_events = [];

                    elements_array.forEach(function(element){

                        //イベント設定の解除に使用するオブジェクト
                        const click_remove_event_object:click_remove_event_interface = {
                            all_events:function(){
                                global_remove_events.forEach(fnc => {
                                    fnc();
                                });
                            },
                            this_event:function(){
                                Object.keys(EventListeners).forEach(function(event_name){
                                    if(event_name == "mousedown" || event_name == "touchstart" || event_name == "contextmenu"){
                                        element.removeEventListener(event_name,EventListeners[event_name]);
                                    }else{
                                        document.documentElement.removeEventListener(event_name,EventListeners[event_name]);
                                    };
                                });
                            }
                        };

                        interface Status{
                            type:"mouse"|"touch"|null,
                            location:swipe_location,
                            time:{
                                start:number|null,
                                end:number|null
                            };
                            times?:number,
                            can_move?:boolean
                        };
                        
                        let status:Status = {
                            type:null,
                            location:{
                                start:{
                                    x:null,
                                    y:null
                                },
                                end:{
                                    x:null,
                                    y:null
                                }
                            },
                            time:{
                                start:null,
                                end:null
                            },
                            times:0,
                            can_move:true
                        };

                        //ロングクリック用にクリック開始時間を保存する
                        let long_click_status:number = 0;

                        let input_style_is_tap:number = 0;

                        function reset_status(){
                            if(settings.ended){
                                settings.ended(status.location,click_remove_event_object);
                            };

                            status = {
                                type:null,
                                location:{
                                    start:{
                                        x:null,
                                        y:null
                                    },
                                    end:{
                                        x:null,
                                        y:null
                                    }
                                },
                                time:{
                                    start:null,
                                    end:null
                                },
                                times:0,
                                can_move:true
                            };
                        };


                        const Event_functions = {
                            start:function(mode:"click"|"tap"){
                                status.time.start = performance.now(); 
                                Event_functions.long(mode);
                            },
                            right_click:function(e){
                                if(settings.right_click && settings.right_click.on_event){
                                    settings.right_click.on_event(e.clientX,e.clientY,click_remove_event_object)
                                };
                            },
                            end:function(mode:"click"|"tap"){
                                status.time.end = performance.now();
                                long_click_status = 0;
                                status.can_move = false;
                                Event_functions.normal(mode);
                                Event_functions.double(mode);


                            },
                            //通常クリック&タップ処理
                            normal:function(mode:"click"|"tap"){
                                if(settings[mode]){
                                    if(!status.location.moved){
                                        if(settings["long_" + mode] && status.time.end - status.time.start > settings["long_" + mode].duration){
                                            //settings.long_click.on_event(status.location.end.x,status.location.end.y)
                                        }else{
                                            settings[mode](status.location.end.x,status.location.end.y,click_remove_event_object);
                                        };
                                    };
                                };
                            },
                            //ロングクリック&タップ処理
                            long:function(mode:"click"|"tap"){
                                if(settings["long_" + mode] && settings["long_" + mode].on_event){
                                    const long_click_start_status = status.time.start;
                                    const long_click_end_status = status.time.end;

                                    setTimeout(function(){
                                        if(long_click_start_status == status.time.start && long_click_end_status == status.time.end){
                                            settings["long_" + mode].on_event(status.location.start.x,status.location.start.y,click_remove_event_object);
                                        };
                                    },settings["long_" + mode].duration);
                                };
                            },
                            move:function(mode:"click"|"tap"){
                                status.location.moved = {
                                    x:(status.location.start.x - status.location.end.x)*-1,
                                    y:(status.location.start.y - status.location.end.y)*-1
                                };

                                if(settings.move && settings.move.on_event){
                                    settings.move.on_event(status.location,click_remove_event_object);
                                };
                            },
                            double:function(mode:"click"|"tap"){
                                if(settings["double_" + mode ] && settings["double_" + mode].on_event){
                                    status.times++;
                                    if(status.times + 0 == settings["double_" + mode].times){
                                        settings["double_" + mode].on_event(status.location,click_remove_event_object);
                                        reset_status();
                                    }else{
                                        const tmp_time_keeper = status.time.start;
                                        setTimeout(function(){
                                            if(tmp_time_keeper == status.time.start){
                                                reset_status();
                                            };
                                        },settings["double_" + mode].duration);
                                    };
                                }else{
                                    reset_status();
                                };
                            },
                            cancel:function(){
                                if(settings.cancel && settings.cancel.on_event){
                                    status.can_move = false;
                                    settings.cancel.on_event(status.location,click_remove_event_object);
                                    reset_status();
                                }
                            }
                        };

                        function stop_propagation_check(e){
                            if(settings.stop_propagation && settings.stop_propagation == true){
                                e.stopPropagation();
                            };
                        };
                        //イベントリスト
                        const EventListeners = {
                            mousedown(e){
                                stop_propagation_check(e);
                                if(status.type == null && input_style_is_tap == 0){
                                    status.type = "mouse";
                                    status.location.start.x = e.clientX;
                                    status.location.start.y = e.clientY;
                                    
                                    if(e.button == 0){
                                        Event_functions.start("click");
                                    }else if(e.button == 2){
                                        Event_functions.right_click(e);
                                    };
                                };
                            },
                            mouseup(e){
                                stop_propagation_check(e);
                                if(status.type == "mouse"){
                                    status.location.end.x = e.clientX;
                                    status.location.end.y = e.clientY;
                                    Event_functions.end("click");
                                };
                            },
                            mousecancel(e){
                                stop_propagation_check(e);
                                if(status.type == "mouse"){
                                    status.location.end.x = e.clientX;
                                    status.location.end.y = e.clientY;
                                    Event_functions.cancel();
                                };
                            },
                            mousemove(e){
                                stop_propagation_check(e);
                                if(status.type == "mouse" && status.can_move == true){
                                    status.location.end.x = e.clientX;
                                    status.location.end.y = e.clientY;
                                    Event_functions.move("click");
                                };
                            },
                            touchstart(e){
                                stop_propagation_check(e);
                                if(status.type == null){
                                    input_style_is_tap++;
                                    setTimeout(function(){
                                        input_style_is_tap--;
                                    },200);
                                    status.type = "touch";
                                    status.location.start.x = e.touches[0].clientX;
                                    status.location.start.y = e.touches[0].clientY;  
                                    Event_functions.start("tap");
                                };
                            },
                            contextmenu(e){
                                stop_propagation_check(e);
                                if(settings.long_tap || settings.right_click){
                                    e.preventDefault();
                                };
                            },
                            touchend(e){
                                stop_propagation_check(e);
                                if(status.type == "touch"){
                                    status.location.end.x = e.changedTouches[0].clientX;
                                    status.location.end.y = e.changedTouches[0].clientY;
                                    Event_functions.end("tap");
                                };
                            },
                            touchcancel(e){
                                stop_propagation_check(e);
                                if(status.type == "touch"){
                                    status.location.end.x = e.touches[0].clientX;
                                    status.location.end.y = e.touches[0].clientY;
                                    Event_functions.cancel();
                                };
                            },
                            touchmove(e){
                                stop_propagation_check(e);
                                if(status.type == "touch" && status.can_move == true){
                                    status.location.end.x = e.touches[0].clientX;
                                    status.location.end.y = e.touches[0].clientY;
                                    Event_functions.move("tap");
                                };
                            }
                        };

                        //後でキャンセルできるようにglobal_events配列に設定
                        global_remove_events.push(click_remove_event_object.this_event);

                        //イベントリスナーの設定
                        Object.keys(EventListeners).forEach(event_name => {
                            if(event_name == "mousedown" || event_name == "touchstart" || event_name == "contextmenu"){
                                element.addEventListener(event_name,EventListeners[event_name]);
                            }else{
                                document.documentElement.addEventListener(event_name,EventListeners[event_name]);
                            };
                        });
                    });
          
                    
                }
            };

            //idの設定
            if(elements_array.length == 1){
                re.id = elements_array[0].id;
            };

            
            //要素が一つも取得できない時警告を表示
            if(elements_array.length == 0){
                console.warn(path + "によって取得された要素数は0です。");
            };

            return re;
        },
        /**
         * 共通のプロセス
         */
        process:{
            /**
             * 要素内の子要素を取得
             * @param elements 
             * @param path 
             */
            el:function(elements,path:string){
                
                if(path == ".."){
                    //親要素の取得

                    if(elements.length == 1){
                        return convart_to__el_Object.convart([elements[0].parentNode],path)
                    }else{
                        console.error("el_Object.el(..) が実行されましたが、このel_Objectは複数の要素を持っている為親要素へ移動出来ません。");
                    };
                }else{
                    const type = path.substr(0,1);
                    let element = [];

                    if(type == "#"){
                        var result = document.getElementById(path.slice(1));
                        if(result){
                            element.push(result);
                        }


                        if(!(element.length == 0)){
                            element = Object.keys(element).map(function (key) {return element[key]});
                            return convart_to__el_Object.convart(element,path);
                        }else{
                            //要素が見つからなかった
                            console.warn("el_Object.el に指定されたid「 " + path + " 」は見つかりませんでした。");
                        };


                    }else if(type == "."){
                        //要素内でクラスを検索
                        elements.forEach(this_element => {
                            var result = this_element.getElementsByClassName(path.slice(1));
                            if(result){
                                result = Object.keys(result).map(function (key) {return result[key]});
                                element = element.concat(result);
                            }
                        });


                        if(!(element.length == 0)){
                            return convart_to__el_Object.convart(element,path);
                        }else{
                            //要素が見つからなかった
                            console.warn("el_Object.el に指定されたクラス「 " + path + " 」は見つかりませんでした。");
                        };
                        

                    }else if(type == "<"){
                        //要素内でタグを検索
                        elements.forEach(this_element => {
                            
                            var result = this_element.getElementsByTagName(path.slice(1));
                            if(result){
                                result = Object.keys(result).map(function (key) {return result[key]});
                                element = element.concat(result);
                            }
                        });


                        if(!(element.length == 0)){
                            return convart_to__el_Object.convart(element,path);
                        }else{
                            //要素が見つからなかった
                            console.warn("el_Object.el に指定されたタグ「 < " + path.slice(1) + " > 」は見つかりませんでした。");
                        };
                    }else{
                        console.error("el_Object.el に設定される引数の1文字目は「#」か「.」もしくは「<」である必要がありますが、それを検出できませんでした。 入力された値 : " + path);
                    }
                };
            }
        }
    };

    interface document{
        ratio:"Vertical"|"Horizontal",
        title:{
            set(title:string):void,
            get():string
        }
    };

    /**
     * ページ全体について
     */
    const Document:document = {
        ratio:"Vertical",
        title:{
            set:function(title){
                window.document.title = title;
            },
            get:function(){
                return window.document.title
            }
        }
    };

    
    //return 前にリサイズ時のイベントを走らせる
    resize_function();
    return {
        /**
         * ドキュメント全体を検索
         * @param path - #id .class
         */
        el:function(path:string){
            //メインの処理
            function core(path){
                /**
                 * 指定された文字の1文字目
                 */
                const type = path.substr(0,1);
                let element = null;

                if(type == "#"){

                    element = document.getElementById(path.slice(1));

                    if(element){
                        //要素が見つかった
                        return convart_to__el_Object.convart([element],path);
                    }else{
                        //要素が見つからなかった
                        console.warn("Ez.el に指定された要素「 " + path + " 」は見つかりませんでした。");
                    };

                }else if(type == "."){
                    element = document.getElementsByClassName(path.slice(1));

                    if(!(element.length == 0)){
                        element = Object.keys(element).map(function (key) {return element[key]});
                        return convart_to__el_Object.convart(element,path);
                    }else{
                        //要素が見つからなかった
                        console.warn("Ez.el に指定されたクラス「 " + path + " 」は見つかりませんでした。");
                    };
                }else if(type == "<"){
                    element = document.getElementsByTagName(path.slice(1));

                    if(!(element.length == 0)){
                        element = Object.keys(element).map(function (key) {return element[key]});
                        return convart_to__el_Object.convart(element,path);
                    }else{
                        //要素が見つからなかった
                        console.warn("Ez.el に指定されたタグ「 < " + path.slice(1) + " > 」は見つかりませんでした。");
                    };
                }else{
                    console.error("Ez.el に設定される引数の1文字目は「#」か「.」もしくは「<」である必要がありますが、それを検出できませんでした。 入力された値 : " + path);
                };
            };

            //パス形式でい指定された時の処理
            var splited = path.split("/");
            var location = core("<body");
            splited.forEach(path => {
                location = location.el(path);
            });
            return location;
        },
        document:Document
    };

})();