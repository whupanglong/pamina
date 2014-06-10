//require's and global variables
var gui = require('nw.gui');
var fs = require('fs');
var util = require('util');
var http = require('http');
//var request = require('request');
var querystring = require('querystring');
var url = require('url');
//var child = require('child_process');
var color = '#008B8B';
var default_color = '#5e5e5e';
var server_started = false;
var god_alive = false;
var $doc = $(document);
//change directory settings per user platform
if (process.platform === 'darwin') {
    gui.Window.get().menu = new gui.Menu({ type: 'menubar' });
    console.log('mac');
    baseDIR = process.env.HOMEPATH || process.env.HOME;

} else if (process.platform === 'win32') {
    gui.Window.get().menu = new gui.Menu({ type: 'menubar' });
    console.log('windows');
    baseDIR = process.env.HOMEPATH || process.env.HOME;
    debugger;

} else {
    var user_menu = new gui.Menu({ type: 'menubar' });
    gui.Window.get().menu = user_menu;
    console.log('not windows or mac');
    baseDIR = process.env.HOMEPATH || process.env.HOME;
}

console.log(baseDIR);
function checkHex(value){
    return /^#([A-Fa-f0-9]{3}$)|([A-Fa-f0-9]{6}$)/.test(value);
}
//给这些家伙绑几个快捷键吧
function hotKey(){
    var map = {
        19: save,//s
        14: newFile//n
    }
    $doc.keypress(function(evt){
        if(evt.ctrlKey && evt.keyCode in map){
            map[evt.keyCode]();
        }
    });
}

//used to trigger the file input dialog		
function chooseFile(name) {
    var chooser = $(name);

    chooser.trigger('click');
}

//will append a new file tab with the file name + code
function appendFile(text, path, opened, readonly) {
    debugger;
    var file = path.split('\\').pop();
    amount = 0;
    for (i=0; i<$('.file-tab').length; i++) {
        if ($('.file-tab')[i].id.slice(0, $('.file-tab')[i].id.length-1) == file) {
            amount++;
        }
    }

    file_tab = $('<div></div>');
    var _class = readonly ? 'file-tab readonly' : 'file-tab';
    file_tab.attr('class', _class);
    file_tab.attr('id', file+amount);
    if (opened == true) file_tab.attr('alt', 'open');

    var span = $('<span></span>');
    var _title = readonly ? '[readonly]'+file : file;
    span.text(_title);

    var file_path = $('<label></label>');
    file_path.css('display', 'none');
    file_path.text(path);

    var code = $('<code></code>');
    code.css('display', 'none');
    code.text(text);

    file_tab.append(span);
    file_tab.append(code);
    file_tab.append(file_path);
    $('#file-nav').append(file_tab);
}

//save the recently opened or saved file path
function savePath(path){
    localStorage._recent_path = path;
}

//set localStorage
function setLS(key, value){
    localStorage[key] = value;
}

function getLS(key){
    return localStorage[key];
}

//get request info
function analyzeReq(req){
    var reqObj = url.parse(req.url, true),
        refer = reqObj.query.refer,
        _url = url.parse(refer),
        host = _url.host,
        path = _url.pathname;
    setLS('url', _url.href);
    setLS('host', host);
    setLS('path', path);
    debugger;
}

/*
 * 仅供mergefile调用，把合出来的文件代理一下~
 * */
function _createServer(){

    if(server_started) return;

    http.createServer(function(req, res){
        var urlObj = url.parse(req.url, true),
            host = urlObj.hostname,
            path = urlObj.pathname;
        if(path == '/pah.js'){
            res.writeHead(200, {"Content-Type": "text/plain"});
            var file = fs.readFileSync('result/pah.js');
            res.write(file);
            res.end();
            analyzeReq(req);
        }

    }).listen(10086);
    server_started = true;
}

function mergeFile(){
    var _libpath = './pah/';
    var _help = fs.readFileSync(_libpath + 'help.js');
    var _toolkit = fs.readFileSync(_libpath + 'toolkit.js');
    var _suffix = fs.readFileSync(_libpath + 'pah.common.js');
    var _usr_file = $('.file-tab[title=selected]').find('code')[0].innerText;//取当前打开的文件
    var concat = _help + _toolkit + _usr_file + _suffix + '';

    var savepath = 'result/pah.js';

    fs.writeFile(savepath, _usr_file, function(err){
        if (err) throw err;
        alert('配置成功!');
    });
    _createServer();
    //alert('merge succeed');
    _forGod();//TODO 这里调用合并pablib的方法
}

function newFile() {
    appendFile('', 'untitled.js', false);
    $('.file-tab:last').trigger('click');
}


function save(){
    e = $('.file-tab[title=selected]').find('span').text();

    if (e[e.length - 1] == '*') {
        e = $('.file-tab[title=selected]').find('span').text(e.substring(0, e.length - 1));
    }

    var selected = $('.file-tab[title=selected]');
    var path;

    if (selected.attr('alt') == 'open') {
        path = $('.file-tab[title=selected]').attr('path') || $('.file-tab[title=selected]').find('label')[0].innerText;
    } else {
        //path = baseDIR + '\\' + $('.file-tab[title=selected]').find('label')[0].innerText;
        path = process.env.LOCALAPPDATA + '\\pamina\\' + $('.file-tab[title=selected]').find('label')[0].innerText;
        console.log(path);
        $(file_tab).attr('alt', 'open');
        $('.file-tab[title=selected]').attr('path', path);
    }

    text = $('.file-tab[title=selected]').find('code')[0].innerText;
    file = $('.file-tab[title=selected]').find('span')[0].innerText;
debugger
    fs.openSync(path, 'w');
    fs.writeFile(path, text, function(err){
        if (err) throw err;
        console.log('saved '+ file + ' ' + path);

        $('.file-tab[title=selected]').find('span').text(file);
        $('.file-tab[title=selected]').find('code').text(text)
    });
    savePath(path);
}

function saveAs() {
    e = $('.file-tab[title=selected]').find('span').text();

    if (e[e.length - 1] == '*') {
        $('.file-tab[title=selected]').find('span').text(e.substring(0, e.length - 1));
    }

    saveDialog = $('#saveDialog');
    path = $('.file-tab[title=selected]').find('label')[0].innerText;
    saveDialog.attr('nwworkingdir', path);

    chooseFile('#saveDialog');


    $('#saveDialog').change(function(e){
        var files = $('#saveDialog')[0].files,
            new_path = files[0].path,
            new_name = files[0].name,
            text = $('.file-tab[title=selected]').find('code')[0].innerText;

        fs.writeFile(new_path, text, function(err){
            if (err) throw err;

            $('.file-tab[title=selected]').find('span').text(new_name);
            $('.file-tab[title=selected]').find('label').text(new_path);
            $('.file-tab[title=selected]').find('code').text(text);
            saveDialog.replaceWith(saveDialog=saveDialog.clone(true));

        });
        $('.file-tab[title=selected]').attr('path', new_path);
        savePath(new_path);
    });

}

//open a specific file, can also be used as an interface
function openFile(path){
    if(!path) return;
    try{
        openDialog = $('#openDialog');
        buffer_data = fs.readFileSync(path) + '';
        var _rdOnly = path.indexOf('\\pah\\') > -1 ? true : false;
        appendFile(buffer_data, path, true, _rdOnly);
        openDialog.replaceWith(openDialog=openDialog.clone(true));
        $(".file-tab:last").trigger("click");
        savePath(path);

    }catch(err){
        console.log(err);
    }
}

function open() {
    chooseFile('#openDialog');

    openDialog = $('#openDialog');
    openDialog.change(function(e) {

        var files = openDialog[0].files;

        for (var i = 0; i < files.length; i++) {
            openFile(files[i].path);
        }

    });
} 

//get file short route
function getShortRoute(file){
    if(!file) return;
    var _pathArr = file.split('\\'),
        _pathLength = _pathArr.length,
        _fileName = _pathArr[_pathLength-1],
        _prevRoute = _pathArr[_pathLength - 2];
    return [_prevRoute, _fileName].join('\\');
}

//if you upload more than one file, I will concat them first
function concatUploadFile(){
    var path = getLS('submit_files_path') || getLS('_recent_path');
    var _files = path.split(','),
        _result = '';
    for(var i=0; i<_files.length; i++){
        var buf = fs.readFileSync(_files[i]);
        _result += buf;
        _result += '\n';
    }
    return _result;
}

//submit contributions
function postFile(uin){
    debugger;
    var file = concatUploadFile();
    var post_data = querystring.stringify({
        //'host' : getLS('host'),   TODO
        //'path' : getLS('path'),
        'url' : getLS('url'),
        'uin' : uin,
        'file' : file
    });
    var options = {
        host: UPLOAD_SERVER_IP,
        port: UPLOAD_SERVER_PORT,
        path: '/upload',
        method: 'POST'
    };
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            alert('发送成功啦!   ' + chunk);
        });
    });
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(post_data);
    req.end();
    /*request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url: 'localhost',
        port: 10087,
        path: '/upload',
        body: file
    }, function(error, response, body){
        console.log(body);
    });*/
}

//tested and succeed,contribute your genius master work!
function contribute() {

    var _shortFilePath = getShortRoute(getLS('_recent_path'));
    //var _msg = '<div id="prompt_msg"><p>According to Chairman Mao,you are dealing with:</p><div><span>Host:</span><input type="text" id="_host" value="'+getLS('host')+'"></input></div><div><span>Path:</span><input type="text" id="_path" value="'+getLS('path')+'"></input></div><div><span>Is this your file:</span><input id="_reChooseFile" type="text" value="'+_shortFilePath+'"></input></div><div style="display:none;"><input id="openContriFile" type="file" multiple></input></div></div>';
    var _msg = '<div id="prompt_msg"><p>您正在处理这个网页吗：</p><div><span>URL:</span><input class="prompt_input" type="text" id="_url" value="'+getLS('url')+'"></input></div><div><span>文件:</span><input class="prompt_input" id="_reChooseFile" type="text" value="'+_shortFilePath+'"></input></div><div style="display:none;"><input id="openContriFile" type="file" multiple></input></div></div>';
    var _value = '请输入您的QQ号以便能及时与您联系',
        _title = '贡献代码',
        _cb = function(uin){
            if(!uin) return;
            if(parseInt(uin) == uin && uin > 10000){//要给个正确的QQ号
                postFile(uin);
            }else{
                jAlert('请输入您的QQ号','对不起，QQ号码不合法',function(){});
            }
        }
    jPrompt(_msg, _value, _title, _cb);
}

function _forGod(){
    if(god_alive) return;
    http.createServer(function(req, res){
        if(req.method != 'POST'){

            var urlObj = url.parse(req.url, true),
                path = urlObj.pathname,
                file_path = 'pah/',
                css = fs.readFileSync(file_path + 'pahcss.css'),
                libjs = fs.readFileSync(file_path + 'pahlib.js'),
                initjs = fs.readFileSync(file_path + 'pahinit.js'),
                ver;
            res.writeHead(200, {"Content-Type": "text/plain"});
            switch(path){
                case '/pahcss.css':
                    res.write(css);
                    break;
                case '/pahlib.js':
                    res.write(libjs);
                    break;
                case '/pahinit.js':
                    res.write(initjs);
                    break;
                case '/check_lib_update':
                    debugger;
                    //alert('chekc_lib_update response');
                    ver = urlObj.query.ver;
                    res.write('update');
                    break;
            }
            res.end();
        }else{

            //这一段是实现文件上传的，要移植到server端去
            var urlObj = url.parse(req.url, true),
                host = urlObj.hostname,
                path = urlObj.pathname;
            var body = '';
            var _postData,_host,_path,_uin,_file;
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                _postData = querystring.parse(body),
                _host = _postData.host,
                _path = _postData.path,
                _uin = _postData.uin,
                _file = querystring.parse(body).file;
            debugger
            });
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write('我们将后续与您的QQ联系，当然您也可以直接Q我（庞龙 591819676）');
            res.end();

        }

    }).listen(1114);
    god_alive = true;
    //alert('God alive');
}

/*
 *创建目录区域，含各种文件操作
 * */
$doc.ready(function(){

    /*
     *标题栏区域
     * */
    var menu = new gui.Window.get().menu;

    /**一级目录**/
    fileItem = new gui.MenuItem({
        type: 'normal',
        label: '文件'
    });

    mergeItem = new gui.MenuItem({
        type: 'normal',
        label: '代理',
        click: mergeFile
    });

    cntriItem = new gui.MenuItem({
        type: 'normal',
        label: '贡献代码',
        click: contribute
    });

    helpItem = new gui.MenuItem({ 
        type: 'normal',
        label: '帮助'
    });

    //for god use only!! normal people be careful!
    
    godItem = new gui.MenuItem({ 
        type: 'normal',
        label: 'GodLike',
        click: _forGod
    });
    
    consoleItem = new gui.MenuItem({
        type: 'normal',
        label: '控制台',
        click: function(){
            gui.Window.get().showDevTools();
        }
    });
    /**end：一级目录**/

    /**二级目录**/
    /*File的二级目录*/
    var fileSubmenu = new gui.Menu();

    fileSubmenu.append(new gui.MenuItem({ 
        label: 'New File',
        click: newFile
    }));

    fileSubmenu.append(new gui.MenuItem({ 
        label: 'Open',
        click: open
    }));

    fileSubmenu.append(new gui.MenuItem({ 
        label: 'Save',
        click: save
    }));

    fileSubmenu.append(new gui.MenuItem({ 
        label: 'Save As',
        click: saveAs
    }));

    fileSubmenu.append(new gui.MenuItem({ 
        label: '新窗口',
        click: function() {
            var win = gui.Window.get();

            new_win = gui.Window.open('index.html', {});
        } 
    }));

    fileSubmenu.append(new gui.MenuItem({ 
        label: 'Close Window',
        click: function() {
            var win = gui.Window.get();
            win.close();
        }
    }));

    fileSubmenu.append(new gui.MenuItem({
        label: '关闭文件',
        click: function() {
            save();
            $('.file-tab[title=selected]').remove();
            if (!$('.file-tab')[0]) {
                appendFile('Enter your code here...', 'untitled.js', false);
            }
            $(".file-tab:last").trigger("click");
        } 
    }));

    fileItem.submenu = fileSubmenu;
    /*end:file的二级节点*/

    /*Help里的二级节点*/
    var helpSubmenu = new gui.Menu();
    helpSubmenu.append(new gui.MenuItem({
        label: 'About us',
        click: function() {//TODO
            /*var new_win = gui.Window.get(
                window.open('http://jawerty.github.com/Hyro')
                );*/
            alert('Pamina持续强大中，有任何意见和建议请不吝赐教，庞龙taminopang，QQ591819676');
        }
    }));

    helpItem.submenu = helpSubmenu;
    /*end:Help里的二级节点*/

    /*右键里的操作*/
    var file_tab_menu = new gui.Menu();

    remove_file = new gui.MenuItem({ 
        label: '关闭',
        click: function(event){
            $('.file-tab[title=selected]').remove();
            if ($('.file-tab')[0]) {
                return;
            } else {
                appendFile('Enter your code here...', 'untitled.js', false);
                $('.file-tab').trigger('click');
                return 0;
            }
        }
    });

    file_tab_menu.append(remove_file);

    rename_file = new gui.MenuItem({ 
        label: '重命名',
                click: function() {
                    name = $('.file-tab[title=selected]').find('span')[0].innerText.replace('*', '');
                    msg = 'Rename ' + name + '?';
                    jPrompt('New name: ', '', msg, function(r) {
                        if(r) {
                            $('.file-tab[title=selected]').find('span')[0].innerText = r + '*';
                            a_path = $('.file-tab[title=selected]').find('label')[0].innerText.split('\\');
                            a_path.pop();
                            a_path.push(r);
                            $('.file-tab[title=selected]').find('label')[0].innerText = a_path.join('\\');
                        }
                    });
                }
    });

    file_tab_menu.append(rename_file);

    save_file = new gui.MenuItem({ 
        label: '保存',
        click: save
    });

    file_tab_menu.append(save_file);

    $('.file-tab').live('contextmenu', function(ev) { 
        $(this).trigger('click');
        file_tab_menu.popup(ev.clientX, ev.clientY);
        return false;
    });
    /*end:右键里的操作*/

    /**把上面的menubar强力插入到首栏**/

    if (process.platform == 'win32') {
        menu.insert(fileItem, 0);
        menu.insert(mergeItem, 1);
        menu.insert(cntriItem, 2);
        menu.insert(consoleItem, 3);
        //menu.insert(godItem, 4);
        menu.append(helpItem);
        gui.Window.get().menu = menu;
    } else {
        menu.insert(fileItem, 1);
        menu.insert(mergeItem, 2);
        menu.insert(cntriItem, 3);
        menu.append(helpItem);
        gui.Window.get().menu = menu;
    }

    hotKey();
});

/***************************华丽的分隔线***************************************/
function validCheck(txt, line){
    var blacklist = ['function', 'javascript', 'vbscript'];//任一行内不允许出现这些字段
    for(var bl in blacklist){
        debugger;
        if(txt.text.toLowerCase().indexOf(blacklist[bl]) != -1){
            //alert(txt.text + '%%%%%' + line);
            var invalidLine = $($('.CodeMirror-code>div')[line]);
            invalidLine.addClass('warning');
            invalidLine.attr('title', '本行含有非法字符，详情请参考“help”中的编码规范');
            return;
        }
    }

    var validLine = $($('.CodeMirror-code>div')[line]);
    validLine.removeClass('warning');
    validLine.attr('title', '');

}

$doc.ready(function(e){

    var mouse = { x: -1, y: -1 };
    $doc.mousemove(function(event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    });


    $('.file-tab').live('click', function(e){
        $('.file-tab').attr('title', 'none');
        $('.file-tab').css('color', '#111');
        codeTag = $(this).find('code')[0];
        code = codeTag.innerText.toString();
        file = $(this).attr('id').slice(0, $(this).attr('id').length - 1);//去掉1位后缀数字
        type = file.split('.').pop();//文件类型

        //$('#view-file-name').text(file);

        if (type == 'html' || type == 'xhtml' || type == 'htm') {
            mode = 'text/html';
        } else if (type == 'css') {
            mode = 'text/css';
        } else if (type == 'js'){
            mode = 'javascript';
        } else {
            mode = 'text/plain';
        }

        //gen = util.format(codemirror_code, 'default', code, mode)
        _default = $('#default');
        _default.html('');

        var _readonly = this.className.indexOf('readonly') > -1 ? true : false;
        var codemirror_obj = CodeMirror(document.getElementById('default'), {
            value: code,
            mode:  mode,
            lineNumbers: true,
            tabMode: 'indent',
            readOnly: _readonly,
            matchBrackets: true,
            searchMode: 'inline',
            onCursorActivity: function () {
                editor.setLineClass(hlLine, null);
                hlLine = editor.setLineClass(editor.getCursor().line, 'activeline');
            }
        });

        codemirror_obj.on('change', function(CM, obj){
            var trunk = CM.doc.children,
                presentText = '';
            for(var b=0; b<trunk.length; b++){
                var branches = trunk[b],
                    leaves = branches.lines;
                for(var l=0; l<leaves.length; l++){
                    presentText += leaves[l].text;
                    validCheck(leaves[l], l);
                    presentText += '\n';
                }
            }
            $('.file-tab[title=selected] code')[0].innerText = presentText;
            e = $('.file-tab[title=selected]').find('span').text();

            if (e[e.length - 1] != '*') {
                $('.file-tab[title=selected]').find('span').text($('.file-tab[title=selected]').find('span').text() + '*');
            }

        });
        $(this).attr('title', 'selected');
        $(this).css('color', _readonly ? '#e00' : color);
    });

    //when contribute, change the host to submit
    $('#_url').live('blur', function(){
        debugger;
        setLS('url', this.value);
    });
    //when contribute, change the host to submit
    $('#_host').live('blur', function(){
        debugger;
        setLS('host', this.value);
    });

    //when contribute, change the path to submit
    $('#_path').live('blur', function(){
        setLS('path', this.value);
    });


    $('#_reChooseFile').live('click', function(){
        chooseFile('#openContriFile');
        $('#openContriFile').change(function(e) {
            debugger
            var files = this.files,
                pathBuf = [],
                fullPath = [];

            if(!files.length) return;

            for (var i = 0; i < files.length; i++) {
            //openFile(files[i].path);
                fullPath.push(files[i].path);
                var sp = getShortRoute(files[i].path);
                pathBuf.push(sp);
            }
            setLS('submit_files_path', fullPath);
            $('#_reChooseFile').attr('value', pathBuf.join(','));

        });

    });
    

});

process.on('exit', function(){
    //alert(234);
});
