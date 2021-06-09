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

            interface el_Object {
                el(path:string):el_Object,
                remove():void,
                class:{
                    add(class_name:string):void,
                    remove(class_name:string):void
                },
                style:{
                    get(property_name:string):string,
                    set(property_name:string,value:string|number):void
                    MultiSet(settings:{[keys:string]:string}):void
                },
                text:{
                    get():string | null,
                    set(value:string|number):void
                },
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
                 * スタイルの設定
                 */
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