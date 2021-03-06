var lib_version = 1|| getLS('lib_version') || 1;//TODO

/*
 *用于更新本地文件，目前是给更新库文件的pahlib和pahcss用的
 *@param Array 格式为[请求中的路径，要备份的文件路径，新文件路径]
 * */
function updateFile(arr){
    if(arr.length <3) return;
    var reqPath = arr[0],
        bakFile = arr[1],
        newFile = arr[2],
        fileBuf = '',
        oldFile = fs.readFileSync(newFile);//要保存的文件,就是待会要更新的文件

    var options = {//向服务器发送的请求头
        host: SERVER_IP,
        port: SERVER_PORT,
        path: reqPath
    };

    var req = http.request(options, function(res) {//biu!发送了，然后保存返回结果
        res.setEncoding('utf8');
        res.on('data', function (ret) {//缓存数据
            fileBuf += ret;//这里一定要用+=，因为数据大的话会分包
            debugger;
        });
        res.on('end', function(){//保存文件的一系列动作
            fs.writeFile(bakFile, oldFile, function(err){//备份文件
                console.log('err in backup old file');
                debugger;
                console.log(err);
            });

            fs.writeFile(newFile, fileBuf, function(err){//写入新的文件
                console.log('err in write new file');
                console.log(err);
            });
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();

}

/*
 * 这主要是个配置的功能，要更新的文件写在这里面
 *
 * */
function update_lib(ret){
    //alert('ret=' + ret);
    if(ret <= lib_version) return;
    var config = {
        1: ['/update_pahcss?ver=' + lib_version, './pah/pahcss.css.bak', './pah/pahcss.css'],
        2: ['/update_pahlib?ver=' + lib_version, './pah/pahlib.js.bak', './pah/pahlib.js']
    };
    for(var item in config) updateFile(config[item]);

}

/*
 *这里是这个文件的主入口，发送一个检测是否库文件过期的测试，如有更新才执行上边的操作
 *
 * */
//(function(){
setTimeout(function(){
    //alert('3 seconds up!');
    debugger;

    var options = {
        host: SERVER_IP,
        port: SERVER_PORT,
        path: '/check_lib_update?ver=' + lib_version
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (ret) {
            if(ret) {
                jAlert('检测到库文件有更新，您之前的改动将另存为pah目录下的.bak文件，更多信息可以查阅帮助中的介绍', '库文件更新',function(){
                    update_lib(ret);//开始更新咯
                    setLS('lib_version', ret);//更新一下版本号
                });
            }
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();

},3000);
//})();
