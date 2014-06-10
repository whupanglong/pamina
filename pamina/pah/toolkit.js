(function(PAH){
	//parse the original rules
	var parseRules = function(rules){
		var parseRules = {}, tmp, reg = /(\w{1,7}?)\[([^=]+)=([^\]]+)\]/;
		if(rules){
			for(var i in rules){
				tmpl = reg.exec(i);
				if(tmpl && tmpl.length == 4){
					if(!parseRules[tmpl[1]]){
						parseRules[tmpl[1]] = [];
					}
					parseRules[tmpl[1]].push({
//						tagName : tmpl[1],
						attrName : tmpl[2],
//						attrVal : tmpl[3],
						title : rules[i].title,
						accesskey : rules[i].accesskey,
						attrVal : new RegExp(tmpl[3]),
						href : rules[i].href,
						tabindex : rules[i].tabindex
					});
				}
			}
		}
		return parseRules;
	};

	var addTitle = function(dom, title){
		dom.setAttribute('title', title);
	};
	var addAccessKey = function(dom, keyVal){
		dom && dom.setAttribute('accesskey', keyVal || 'z');   //重要的功能键使用
	};

	var firstFocus = function(selector){
		var dom;
		if(selector){
			dom = $p(selector).focus().select();
		}
	};

	var addLabel = function(inputIds){
		if(inputIds){
			for(var i in config.labels){
				doms = $p('#'+i);
				doms.after('<label for="'+i+'">'+config.labels[i]+'</label>');
			}
		}
	};

	//进入iframe然后注入js
	var inIframe = function(){
		var w = document.getElementsByTagName('iframe'), doc, s, url;
		s = document.getElementById('pahjs');
		if(s && (url = s.src)){
//			try{
				for(var i = 0; i < w.length; i++){
					doc = w[i].contentWindow.document;
					s = doc.createElement('script');
					s.src = url;
					doc.getElementsByTagName('head')[0].appendChild(s);
				}
//			}catch(ign){}
		}
	};

    //TODO 应该整合下面的两个处理函数，更易扩展，功能更强

    PAH.dealAll = function(config){
        for(var i in config.rules){//处理最主要的rules，config的其他属性供扩展
            var item = config.rules[i],
                dom = $p(i);
            for(var attr in item){
                var attrVal = item[attr];
                switch(attr){
                    case 'initFocus':
                        (function(d){
                            setTimeout(function(){
                                d.focus().select();
                            }, 1000);
                        })(dom);
                        //dom.focus();
                        break;
                    case 'title':
                    case 'href':
                    case 'accesskey': 
                        dom.attr(attr, attrVal);
                        break;
                    case 'clearEvent':
                        for(var index in attrVal){
                            dom.unbind(attrVal[index]);
                        }
                        break;
                    case 'clearAttr':
                        for(var index in attrVal){
                            dom.removeAttr(attrVal);
                        }
                        break;
                    case 'clearVlue':
                        dom.val('');
                        break;
                    case 'tabindex':
                        dom.attr('tabindex', attrVal);
                        break;
                    case 'addEvent':
                        for(var index in attrVal){
                            dom.bind(index, attrVal[index]);
                        }
                        break;
                    case 'radioTitle'://专门给radio加title的，用数组的形式
                        for(var ri=0; ri<dom.length; ri++){
                            $p(dom[ri]).attr('title', attrVal[ri]);
                        }
                        break;
                    case 'radioTabIndex'://专门给radio加tabindex的，用数组的形式
                        for(var rt=0; rt<dom.length; rt++){
                            $p(dom[rt]).attr('tabindex', attrVal[rt]);
                        }
                        break;
                    case 'selectOption':
                        dom.find('option').each(function(i,n){
                            $p(n).html(attrVal[i]);
                        });
                        break;
                }
            }
        }
        if(config.describe){
            var p = document.createElement('iframe');
            p.style = 'display:none; z-index:9999';
            //p.innerHTML = config.describe;
            //$(p).attr('tabindex', 0);
            document.body.appendChild(p);
        }
	};
	var mainSchedule = function(config){
		var rules, i, doms,  val, rule;
		if(config.rules){
			rules = parseRules(config.rules);
			//rules解析
			for(i in rules){
				doms = document.getElementsByTagName(i);
				for(var j = 0, lenJ = rules[i].length; j < lenJ; j++){
					rule = rules[i][j];

					for(var t = 0, lenT = doms.length; t < lenT; t++){
						if((val = doms[t][rule.attrName]) && rule.attrVal.test(val)){
							if(rule.href && (doms[t].innerText || doms[t].textContent)){
								continue;
							}
							rule.title && addTitle(doms[t], rule.title);
							rule.accesskey && addAccessKey(doms[t], rule.accesskey);
							rule.href && (doms[t].setAttribute('href', rule.href));
							rule.tabindex && (doms[t].setAttribute('tabindex', rule.tabindex));
							break;
						}
					}
				}
			}
		}
		//focus解析
		if(config.firstFocus){
			(function(tag){
				setTimeout(function(){
					firstFocus(tag);
				}, 1000);
			})(config.firstFocus);
		}

		//iframe内部执行, bookmarklet的方式
		if(config.iframe && !window.GM_log && !(window.chrome && window.chrome.runtime)){
			inIframe();
		}
	};

	PAH.init = mainSchedule;
})((window.PAHelper = window.PAHelper || {}));
 
function hello(){
  alert('hello');
}

//reset page tabindex , 
function resetTabindex(removeprev){
    
}
