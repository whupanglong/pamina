(function(){
    //如果没有jquery环境就给它装个~
    if(typeof jQuery == 'undefined'){
        var jq = document.createElement('script');
        jq.type="text/javascript";
        jq.src="http://code.jquery.com/jquery-1.7.2.min.js";
        document.head.appendChild(jq);
    }
    $p = window.jQuery.noConflict();//免得又像空间一样用$j这样的别名
})();

function addAchLink(text, href, title, key, target, id) {
	var ach = $p('<a></a>');
    ach.attr('href', href);
    ach.attr('title', title);
	if(id) {
        ach.attr('id', id);
	}
    ach.attr('accessKey', key);
    ach.attr('target', target);
    ach.attr('style', 'width:0px;height:0px;overflow:hidden;display:block;');
	ach.innerHTML = text;
	ach.appendTo($p('head')[0]);
}

function changeMode(mode) {
	window.location.hash = '#' + mode;
	document.body.innerHTML = window.accessHelperDOMCache;
	var s = $p('<script></script>');
	s.attr('src', 'http://127.0.0.1/access.js?type=' + mode);
	s.attr('id', 'pahjs');
	s.appendTo($p('head')[0]);
}

if(window === top.window){//iframe内部不加，会重复
    if(!($p('#access-helper-help').length)) {
		addAchLink('无障碍说明', 'http://127.0.0.1/help.html', '现在按回车可以得到详细的无障碍说明，你也可以在需要时用alt+h键访问说明页面', 'h', '_blank', 'access-helper-help');
		addAchLink('切换阅读模式', "javascript:changeMode('news');void(0);", '现在按回车可以切换到阅读模式，你也可以在需要时用alt+逗号键访问说明页面', ',', '_self');
		addAchLink('切换通用模式', "javascript:changeMode('common');void(0);", '现在按回车可以得到详细的无障碍说明，你也可以在需要时用alt+点号键访问说明页面', '.', '_self');
	}
	window.accessHelperDOMCache = $p('body')[0].innerHTML;
}
