//ローカルテスト用の簡易サーバー
let http = require("http");
let server = http.createServer();
let fs = require("fs");
const mime = require("mime");

server.on("request",function(req,res){
    // ファイルの読み込み
    var url = req.url;

    url = url.split("?");

    console.log(url);

    url = url[0];

    url = url.split("/");

    if(url[1] == "Ez"){

        url.shift();
        url.shift();

        var tmp_url = "";

        url.forEach(u => {
            tmp_url = tmp_url + "/" + u
        });

        url = tmp_url;

        var file_path = __dirname + '/../docs'+ url;



        fs.readFile(file_path, function(err, data){
            if (err){
                //ファイル読み込み失敗時
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('Page Not Found.');
                res.end();
                console.log("404 : " + __dirname + '/..' + url);
    
            }else{
                //ファイル読み込み成功時
                res.setHeader('Content-Type',mime.getType(file_path));
                res.statusCode = 200
                res.end(data,"utf-8");
                console.log("200 : [" + mime.getType(file_path) + "] " + __dirname + '/..' + url);
    
            };
        });
    }else{
        console.error("Ezが含まれていない")
    }


});

server.listen(8000,"localhost");
console.log("localhost:8000/file_name");