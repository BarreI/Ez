console.log("Ezを読み込みました。");
/**
 * 汚さないようにする
 */
var Ez = (function () {
    var convart_to__el_Object = {
        /**
         * 複数の要素から生成
         * @param {Array} element - 取得したデータ
         * @param path - 取得に使用したテキスト
         */
        convart: function (elements_array, path) {
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
                /**
                 * 要素内のテキスト
                 */
                text: "",
                /**
                 * 要素のid
                 */
                id: null
            };
            //idの設定
            if (elements_array.length == 1) {
                re.id = elements_array[0].id;
            }
            ;
            //値が変更された時イベント設定
            Object.defineProperty(re, "text", {
                set: function (new_value) {
                    elements_array.forEach(function (element) {
                        element.innerText = new_value;
                    });
                }
            });
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
        }
    };
})();