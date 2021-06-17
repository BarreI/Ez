console.log("Ezを読み込みました。");
/**
 * 汚さないようにする
 */
var Ez = (function () {
    //画面がリサイズされた時のイベント
    function resize_function() {
        //document.ratioの設定
        (function () {
            var height = window.document.documentElement.clientHeight;
            var width = window.document.documentElement.clientWidth;
            if (width < height) {
                Document.ratio = "Vertical";
            }
            else {
                Document.ratio = "Horizontal";
            }
            ;
        })();
    }
    ;
    //リサイズ時に実行
    window.addEventListener("resize", resize_function);
    var convart_to__el_Object = {
        /**
         * 複数の要素から生成
         * @param {Array} element - 取得したデータ
         * @param path - 取得に使用したテキスト
         */
        convart: function (elements_array, path) {
            //複数のスタイルを同時に設定する時に使用するオブジェクト
            ;
            ;
            ;
            ;
            var re = {
                /**
                 * 要素内で要素を検索 or 親要素へ移動
                 * @param path - 要素のid、クラス、タグ
                 */
                el: function (path) {
                    function core(path) {
                        return convart_to__el_Object.process.el(elements_array, path);
                    }
                    ;
                    //パス形式でい指定された時の処理
                    var splited = path.split("/");
                    var location = core(splited[0]);
                    splited.shift();
                    splited.forEach(function (path) {
                        location = location.el(path);
                    });
                    return location;
                },
                raw: elements_array,
                /**
                 * 要素内のテキスト
                 */
                text: {
                    /**
                     * - 要素のテキストを取得
                     * - 複数の要素に対して実行した場合どの値が取得できるかは不明
                     */
                    get: function () {
                        var text = null;
                        try {
                            text = elements_array[0].innerText;
                        }
                        catch (_a) {
                            console.warn("テキストの取得に失敗しました。");
                        }
                        ;
                        if (text) {
                            return text;
                        }
                        else {
                            return null;
                        }
                    },
                    /**
                     * 要素のテキストを更新する
                     * @param {string} value - 内容
                     */
                    set: function (value) {
                        elements_array.forEach(function (element) {
                            element.innerText = value;
                        });
                    }
                },
                /**
                 * スタイルの取得と設定
                 */
                style: {
                    /**
                     * - スタイルの取得
                     * - 複数のオブジェクトに対して実行する場合、どのオブジェクトのスタイルか不明
                     * @param {string} property_name - スタイルのプロパティ名を入力します
                     */
                    get: function (property_name) {
                        try {
                            return window.getComputedStyle(elements_array[0], null)[property_name];
                        }
                        catch (e) {
                            console.warn("スタイル" + property_name + "が取得できませんでした。値が正しい事を確認してください。");
                            console.warn(e);
                        }
                        ;
                    },
                    /**
                     *  - スタイルの設定・更新
                     * @param property_name
                     * @param value
                     */
                    set: function (property_name, value) {
                        elements_array.forEach(function (element) {
                            element.style[property_name] = value;
                        });
                    },
                    /**
                     * - 複数のスタイルを同時に設定
                     * @param {object} settings -スタイルの設定
                     */
                    MultiSet: function (settings) {
                        Object.keys(settings).forEach(function (property_name) {
                            elements_array.forEach(function (element) {
                                element.style[property_name] = settings[property_name];
                            });
                        });
                    }
                },
                /**
                 * 要素のid
                 */
                id: null,
                /**
                 * 要素の削除
                 */
                remove: function () {
                    elements_array.forEach(function (element) {
                        element.remove();
                    });
                },
                /**
                 * クラスの設定
                 */
                "class": {
                    //クラスの追加
                    add: function (class_name) {
                        elements_array.forEach(function (element) {
                            element.classList.add(class_name);
                        });
                    },
                    //クラスの削除
                    remove: function (class_name) {
                        elements_array.forEach(function (element) {
                            element.classList.remove(class_name);
                        });
                    }
                },
                /**
                 * スクロール
                 */
                scroll: {
                    auto: {
                        _scroll_control: function (from_start_point, all_scroll, content_size, reverse, settings) {
                            //未設定の初期値を設定　
                            (function () {
                                //スクロールのスピード
                                if (!settings.speed) {
                                    settings.speed = 14;
                                }
                                ;
                                //スクロール検知時の感度
                                if (!settings.end.tolerance) {
                                    settings.end.tolerance = 10;
                                }
                                ;
                                //スクロール開始前の待機時間
                                if (settings.loop && !settings.loop.start_keep) {
                                    settings.loop.start_keep = 1000;
                                }
                                ;
                                //スクロール終了時の待機時間
                                if (settings.loop && !settings.loop.end_keep) {
                                    settings.loop.end_keep = 1000;
                                }
                                ;
                            })();
                            var global_switch = [];
                            elements_array.forEach(function (element, index) {
                                global_switch.push({
                                    loop_stop_status: 0,
                                    move_stop_status: 0,
                                    loop_stop: function () {
                                        global_switch[index].loop_stop_status++;
                                        if (settings.end.auto_restart) {
                                            setTimeout(function () {
                                                global_switch[index].move_stop_status--;
                                                scroll();
                                            }, settings.end.auto_restart);
                                        }
                                        ;
                                    },
                                    move_stop: function () {
                                        global_switch[index].move_stop_status++;
                                        //停止時に初期値に戻る設定がされている場合
                                        if (settings.end && settings.end.auto_back_to_start_point == true) {
                                            reset();
                                        }
                                        ;
                                        if (settings.end.auto_restart) {
                                            setTimeout(function () {
                                                global_switch[index].move_stop_status--;
                                                scroll();
                                            }, settings.end.auto_restart);
                                        }
                                        ;
                                    }
                                });
                                function reset() {
                                    function reset_start_position() {
                                        if (reverse) {
                                            element[from_start_point] = element[all_scroll] - element[content_size];
                                        }
                                        else {
                                            element[from_start_point] = 0;
                                        }
                                        ;
                                    }
                                    ;
                                    setTimeout(function () {
                                        if (settings.loop) {
                                            reset_start_position();
                                            setTimeout(function () {
                                                scroll();
                                            }, settings.loop.start_keep);
                                        }
                                        ;
                                    }, settings.loop.end_keep);
                                }
                                ;
                                function scroll(Forecast) {
                                    if (global_switch[index].move_stop_status == 0) {
                                        if (Forecast) {
                                            //予測位置と同じ（+- settings.end.toleranceまで許容)
                                            if (element[from_start_point] == Forecast || (element[from_start_point] < Forecast + settings.end.tolerance && element[from_start_point] > Forecast - settings.end.tolerance)) {
                                                //予測された位置と同じ
                                            }
                                            else {
                                                //スクロールされた場合
                                                if (settings.end && settings.end.scroll) {
                                                    console.log("スクロールを検出した為停止しました。 予測：" + Forecast + " 実際:" + element[from_start_point]);
                                                    global_switch[index].move_stop();
                                                    return;
                                                }
                                                else {
                                                    console.warn("スクロールを検出しましたが、スクロール時に停止する設定がされていない為、スクロールを継続します。");
                                                }
                                                ;
                                            }
                                            ;
                                        }
                                        ;
                                        var new_from_start_point_value;
                                        var old_from_start_point_value = Math.floor(element[from_start_point]);
                                        if (reverse) {
                                            new_from_start_point_value = Math.floor(element[from_start_point]) - 1;
                                        }
                                        else {
                                            new_from_start_point_value = Math.floor(element[from_start_point]) + 1;
                                        }
                                        ;
                                        element[from_start_point] = new_from_start_point_value;
                                        setTimeout(function () {
                                            var max_scroll = element[all_scroll] - element[content_size];
                                            if (reverse) {
                                                if (new_from_start_point_value == old_from_start_point_value) {
                                                    reset();
                                                }
                                                else {
                                                    scroll(new_from_start_point_value);
                                                }
                                                ;
                                            }
                                            else {
                                                if (Math.floor(max_scroll) == old_from_start_point_value) {
                                                    reset();
                                                }
                                                else {
                                                    scroll(new_from_start_point_value);
                                                }
                                                ;
                                            }
                                            ;
                                        }, settings.speed);
                                    }
                                    ;
                                }
                                ;
                                //各種イベント設定
                                (function () {
                                    //クリックで終了が設定されてる時
                                    if (settings.end.click && settings.end.click == true) {
                                        element.addEventListener("mousedown", function () {
                                            global_switch[index].move_stop();
                                        });
                                    }
                                    ;
                                    //タッチで終了が設定されている時
                                    if (settings.end.click && settings.end.click == true) {
                                        element.addEventListener("touchdown", function () {
                                            global_switch[index].move_stop();
                                        });
                                    }
                                    ;
                                    //スクロールで終了が設定されている時
                                    if (settings.end.scroll && settings.end.scroll == true) {
                                        element.addEventListener("wheel", function (e) {
                                            if (from_start_point == "scrollLeft") {
                                                //横スクロールの時
                                                if (e.shiftKey == true) {
                                                    global_switch[index].move_stop();
                                                }
                                                ;
                                            }
                                            else {
                                                //縦スクロールの時
                                                if (e.shiftKey == false) {
                                                    global_switch[index].move_stop();
                                                }
                                                ;
                                            }
                                            ;
                                        });
                                    }
                                    ;
                                    //タイマーで終了が設定されている時
                                    if (settings.end.time) {
                                        setTimeout(function () {
                                            global_switch[index].move_stop();
                                        }, settings.end.time);
                                    }
                                    ;
                                })();
                                scroll();
                            });
                            return function (end) {
                                //すべてのスクロールに対して停止を設定
                                global_switch.forEach(function (settings_obj) {
                                    if (end == "next_start") {
                                        settings_obj.loop_stop();
                                    }
                                    else if (end == "now") {
                                        settings_obj.move_stop();
                                    }
                                    ;
                                });
                            };
                        },
                        Vertical: {
                            top_to_bottom: function (settings) {
                                return re.scroll.auto._scroll_control("scrollTop", "scrollHeight", "clientHeight", false, settings);
                            },
                            bottom_to_top: function (settings) {
                                return re.scroll.auto._scroll_control("scrollTop", "scrollHeight", "clientHeight", true, settings);
                            }
                        },
                        Horizontal: {
                            left_to_right: function (settings) {
                                return re.scroll.auto._scroll_control("scrollLeft", "scrollWidth", "clientWidth", true, settings);
                            },
                            right_to_left: function (settings) {
                                return re.scroll.auto._scroll_control("scrollLeft", "scrollWidth", "clientWidth", false, settings);
                            }
                        }
                    }
                },
                drug_and_drop: function (settings) {
                    if (!(elements_array.length == 1)) {
                        console.error("このel_Objectが対象としている要素は1つではありません。drug_and_drop設定は要素が1つの時に設定できます。");
                        return;
                    }
                    ;
                    var element = elements_array[0];
                    var status;
                    var Events = {
                        start: function (e) {
                            console.log(e);
                            if (status.touch.target == true) {
                                status.location.start.x = e.touches[0].clientX;
                                status.location.end.x = e.touches[0].clientX;
                                status.location.start.y = e.touches[0].clientY;
                                status.location.end.y = e.touches[0].clientY;
                            }
                            else {
                                status.location.start.x = e.clientX;
                                status.location.end.x = e.clientX;
                                status.location.start.y = e.clientY;
                                status.location.end.y = e.clientY;
                            }
                            ;
                            if (!settings.get_only) {
                                status.default_element_location = {
                                    x: element.offsetLeft,
                                    y: element.offsetTop
                                };
                            }
                            ;
                            if (settings.events && settings.events.drop) {
                                settings.events.drug(status.location, addEventListeners.remove);
                            }
                            ;
                        },
                        move: function (e) {
                            if (status.touch.target == true) {
                                status.location.end.x = e.touches[0].clientX;
                                status.location.end.y = e.touches[0].clientY;
                            }
                            else {
                                status.location.end.x = e.clientX;
                                status.location.end.y = e.clientY;
                            }
                            ;
                            status.location.moved = {
                                x: (status.location.start.x - status.location.end.x) * -1,
                                y: (status.location.start.y - status.location.end.y) * -1
                            };
                            if (!settings.get_only) {
                                element.style.left = status.default_element_location.x + status.location.moved.x + "px";
                                element.style.top = status.default_element_location.y + status.location.moved.y + "px";
                            }
                            ;
                            if (settings.events && settings.events.move) {
                                settings.events.move(status.location, addEventListeners.remove);
                            }
                            ;
                        },
                        end: function (e) {
                            if (settings.events && settings.events.drop) {
                                settings.events.drop(status.location, addEventListeners.remove);
                            }
                            ;
                            Events.reset_status();
                        },
                        cancel: function (e) {
                            if (settings.events && settings.events.cancel) {
                                settings.events.cancel(status.location, addEventListeners.remove);
                            }
                            ;
                            Events.reset_status();
                        },
                        reset_status: function () {
                            console.log(status);
                            status = {
                                mouse: {
                                    hover: false,
                                    click: false
                                },
                                touch: {
                                    target: false,
                                    id: null
                                },
                                location: {
                                    start: {
                                        x: null,
                                        y: null
                                    },
                                    end: {
                                        x: null,
                                        y: null
                                    }
                                },
                                default_element_location: {
                                    x: null,
                                    y: null
                                }
                            };
                        }
                    };
                    Events.reset_status();
                    var to_document_events = [
                        "mousemove",
                        "mouseup",
                        "mousecancel",
                        "touchmove",
                        "touchend",
                        "touchcancel"
                    ];
                    var to_element_events = [
                        "mousedown",
                        "touchstart"
                    ];
                    var addEventListeners = {
                        document_mousemove: function (e) {
                            if (status.mouse.click == true) {
                                Events.move(e);
                            }
                            ;
                        },
                        document_mouseup: function (e) {
                            if (status.mouse.click == true) {
                                Events.end(e);
                            }
                            ;
                        },
                        document_mousecancel: function (e) {
                            if (status.mouse.click == true) {
                                Events.cancel(e);
                            }
                            ;
                        },
                        element_mousedown: function (e) {
                            if (status.touch.target == false) {
                                status.mouse.click = true;
                                Events.start(e);
                            }
                            ;
                        },
                        document_touchmove: function (e) {
                            if (status.touch.target == true) {
                                Events.move(e);
                            }
                            ;
                        },
                        document_touchend: function (e) {
                            if (status.touch.target == true) {
                                Events.end(e);
                            }
                            ;
                        },
                        document_touchcancel: function (e) {
                            if (status.touch.target == true) {
                                Events.cancel(e);
                            }
                            ;
                        },
                        element_touchstart: function (e) {
                            console.log("touch_start");
                            if (status.mouse.click == false) {
                                status.touch.target = true;
                                status.touch.id = e.touches[0];
                                Events.start(e);
                            }
                            ;
                        },
                        set: function () {
                            to_document_events.forEach(function (event_name) {
                                document.documentElement.addEventListener(event_name, addEventListeners["document_" + event_name]);
                            });
                            to_element_events.forEach(function (event_name) {
                                element.addEventListener(event_name, addEventListeners["element_" + event_name]);
                            });
                        },
                        remove: function () {
                            to_document_events.forEach(function (event_name) {
                                document.documentElement.removeEventListener(event_name, addEventListeners["document_" + event_name]);
                            });
                            to_element_events.forEach(function (event_name) {
                                element.removeEventListener(event_name, addEventListeners["element_" + event_name]);
                            });
                        }
                    };
                    addEventListeners.set();
                }
            };
            //idの設定
            if (elements_array.length == 1) {
                re.id = elements_array[0].id;
            }
            ;
            //要素が一つも取得できない時警告を表示
            if (elements_array.length == 0) {
                console.warn(path + "によって取得された要素数は0です。");
            }
            ;
            return re;
        },
        /**
         * 共通のプロセス
         */
        process: {
            /**
             * 要素内の子要素を取得
             * @param elements
             * @param path
             */
            el: function (elements, path) {
                if (path == "..") {
                    //親要素の取得
                    if (elements.length == 1) {
                        return convart_to__el_Object.convart([elements[0].parentNode], path);
                    }
                    else {
                        console.error("el_Object.el(..) が実行されましたが、このel_Objectは複数の要素を持っている為親要素へ移動出来ません。");
                    }
                    ;
                }
                else {
                    var type = path.substr(0, 1);
                    var element_1 = [];
                    if (type == "#") {
                        var result = document.getElementById(path.slice(1));
                        if (result) {
                            element_1.push(result);
                        }
                        if (!(element_1.length == 0)) {
                            element_1 = Object.keys(element_1).map(function (key) { return element_1[key]; });
                            return convart_to__el_Object.convart(element_1, path);
                        }
                        else {
                            //要素が見つからなかった
                            console.warn("el_Object.el に指定されたid「 " + path + " 」は見つかりませんでした。");
                        }
                        ;
                    }
                    else if (type == ".") {
                        //要素内でクラスを検索
                        elements.forEach(function (this_element) {
                            var result = this_element.getElementsByClassName(path.slice(1));
                            if (result) {
                                result = Object.keys(result).map(function (key) { return result[key]; });
                                element_1 = element_1.concat(result);
                            }
                        });
                        if (!(element_1.length == 0)) {
                            return convart_to__el_Object.convart(element_1, path);
                        }
                        else {
                            //要素が見つからなかった
                            console.warn("el_Object.el に指定されたクラス「 " + path + " 」は見つかりませんでした。");
                        }
                        ;
                    }
                    else if (type == "<") {
                        //要素内でタグを検索
                        elements.forEach(function (this_element) {
                            var result = this_element.getElementsByTagName(path.slice(1));
                            if (result) {
                                result = Object.keys(result).map(function (key) { return result[key]; });
                                element_1 = element_1.concat(result);
                            }
                        });
                        if (!(element_1.length == 0)) {
                            return convart_to__el_Object.convart(element_1, path);
                        }
                        else {
                            //要素が見つからなかった
                            console.warn("el_Object.el に指定されたタグ「 < " + path.slice(1) + " > 」は見つかりませんでした。");
                        }
                        ;
                    }
                    else {
                        console.error("el_Object.el に設定される引数の1文字目は「#」か「.」もしくは「<」である必要がありますが、それを検出できませんでした。 入力された値 : " + path);
                    }
                }
                ;
            }
        }
    };
    ;
    /**
     * ページ全体について
     */
    var Document = {
        ratio: "Vertical",
        title: {
            set: function (title) {
                window.document.title = title;
            },
            get: function () {
                return window.document.title;
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
        el: function (path) {
            //メインの処理
            function core(path) {
                /**
                 * 指定された文字の1文字目
                 */
                var type = path.substr(0, 1);
                var element = null;
                if (type == "#") {
                    element = document.getElementById(path.slice(1));
                    if (element) {
                        //要素が見つかった
                        return convart_to__el_Object.convart([element], path);
                    }
                    else {
                        //要素が見つからなかった
                        console.warn("Ez.el に指定された要素「 " + path + " 」は見つかりませんでした。");
                    }
                    ;
                }
                else if (type == ".") {
                    element = document.getElementsByClassName(path.slice(1));
                    if (!(element.length == 0)) {
                        element = Object.keys(element).map(function (key) { return element[key]; });
                        return convart_to__el_Object.convart(element, path);
                    }
                    else {
                        //要素が見つからなかった
                        console.warn("Ez.el に指定されたクラス「 " + path + " 」は見つかりませんでした。");
                    }
                    ;
                }
                else if (type == "<") {
                    element = document.getElementsByTagName(path.slice(1));
                    if (!(element.length == 0)) {
                        element = Object.keys(element).map(function (key) { return element[key]; });
                        return convart_to__el_Object.convart(element, path);
                    }
                    else {
                        //要素が見つからなかった
                        console.warn("Ez.el に指定されたタグ「 < " + path.slice(1) + " > 」は見つかりませんでした。");
                    }
                    ;
                }
                else {
                    console.error("Ez.el に設定される引数の1文字目は「#」か「.」もしくは「<」である必要がありますが、それを検出できませんでした。 入力された値 : " + path);
                }
                ;
            }
            ;
            //パス形式でい指定された時の処理
            var splited = path.split("/");
            var location = core("<body");
            splited.forEach(function (path) {
                location = location.el(path);
            });
            return location;
        },
        document: Document
    };
})();
