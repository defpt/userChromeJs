//打开链接的各种方法
new function () {
	var items = [
	{ command: 'context-openlinkintab' },
	{
		label:"用 Web Cache 打开",
		url:"http://webcache.googleusercontent.com/search?q=cache:%l",
		accesskey: 'W',
		image:" "
	},
	{
		label: "用 Google Docs 打开",
		url : "http://docs.google.com/viewer?url=%l",
		accesskey: "D",
		image:" "
    },
	{},
	{ command: 'context-copyemail' },
	{
		label:"在隐私窗口打开",
		oncommand:"gContextMenu.openLinkInPrivateWindow();",
		accesskey: 'P'
	},
	{
		label:"在侧边栏中打开",
		oncommand:"openWebPanel(gContextMenu.linkText(), gContextMenu.linkURL);",
		accesskey: 'S'
	},
	{},
	{
		label:"在 IE 中打开",
		text:"%l",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		accesskey: 'I',
		image:" "
	},
	{
		label:"在 Chrome 中打开",
		text:"%l",
		exec:"D:\\Program Files\\MyChrome\\chrome\\chrome.exe",
		accesskey: 'C',
		image:" "
	}
	];
	var menu = PageMenu({ condition: 'link', insertBefore:'context-savelink', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//复制文本
new function () {
	var items = [
	{ command: 'context-copy' },
	{
		label:"复制纯文本",
		text:"%SEL%",
		image:" "
	},
	{
		label:"复制 BBCode",
		image:" ",
		oncommand: function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			function HTMLtoBBCode(a){function b(k,g,j,h,f){this.pos=k;this.font=g;this.face=j;this.size=h;this.color=f}fl=new b(50);fc=new b(50);al=new b(50);function e(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<FONT",l);if(l!=-1){m=h.indexOf(">",l);fl[g]=new b(0,0,0,0,0);fl[g].pos=l;fl[g].font=1;k=h.substring(l,m);if(k.search(/FACE/)!=-1){fl[g].face=1}else{fl[g].face=0}if(k.search(/SIZE/)!=-1){fl[g].size=1}else{fl[g].size=0}if(k.search(/COLOR/)!=-1){fl[g].color=1}else{fl[g].color=0}l++;g++}}for(l=0;l!=-1;l){l=h.indexOf("</FONT>",l++);if(l!=-1){fc[f]=new b(0,0,0,0,0);fc[f].pos=l;fc[f].font=1;for(ii=g-1;ii>=0;ii--){if(fl[ii].pos<l){if(fl[ii].font==1){fl[ii].font=0;fc[f].color=fl[ii].color;fc[f].size=fl[ii].size;fc[f].face=fl[ii].face;ii=-1}}}l++;f++}else{fc[f]=new b(0,0,0,0,0);fc[f].font=0}}}function d(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<A HREF",l);if(l!=-1){m=h.indexOf(">",l);al[g]=new b(0,0,0,0,0);al[g].font=1;k=h.substring(l,m);if(k.search(/MAILTO:/)!=-1){k=k.replace(/<A HREF=MAILTO:/,"");k=k.replace(/\"/,"");k=k.replace(/\'/,"");al[g].pos=1;k=k.toLowerCase();al[g].face=k}else{al[g].pos=2}l++;g++}else{al[g]=new b(0,0,0,0,0);al[g].pos=0}}}e(a);a=a.replace(/<SCRIPT[^>]*>/gi,"<TEXTAREA>");a=a.replace(/<\/SCRIPT>/gi,"</TEXTAREA>");a=a.replace(/ = /gi,"=");a=a.replace(/=\"/gi,"=");a=a.replace(/=\'/gi,"=");a=a.replace(/<param name=movie[^>]*value=/gi,"<movie=");a=a.replace(/\s+BORDER=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TARGET=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASSID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+NAME=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+STYLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASS=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ALT=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TITLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+REL=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ONCLICK=[^\'\">]*[\'\">]/gi,"");a=a.replace(/<A\s*HREF/i,"<A HREF");d(a);a=a.replace(/<BR>/gi,"\r");a=a.replace(/<BR(.*?)\/>/gi,"\r");a=a.replace(/<P>/gi,"\r\r");a=a.replace(/<P [^>]*>/gi,"\r\r");a=a.replace(/<CODE>/gi,"[code]");a=a.replace(/<\/CODE>/gi,"[/code]");a=a.replace(/<BLOCKQUOTE>/gi,"[quote]");a=a.replace(/<\/BLOCKQUOTE>/gi,"[/quote]");a=a.replace(/<UL[^>]*>/gi,"[list]");a=a.replace(/<\/UL>/gi,"[/list]");a=a.replace(/<OL[^>]*>/gi,"[list=1]");a=a.replace(/<\/OL>/gi,"[/list]");a=a.replace(/<LI>/gi,"[*]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<BIG>/gi,"[b]");a=a.replace(/<\/BIG>/gi,"[/b]");a=a.replace(/<B>/gi,"[b]");a=a.replace(/<\/B>/gi,"[/b]");a=a.replace(/<U>/gi,"[u]");a=a.replace(/<\/U>/gi,"[/u]");a=a.replace(/<I>/gi,"[i]");a=a.replace(/<\/I>/gi,"[/i]");a=a.replace(/<EM>/gi,"[i]");a=a.replace(/<\/EM>/gi,"[/i]");a=a.replace(/<h\d>/gi,"\r\r[b]");a=a.replace(/<\/h\d>/gi,"[/b]");a=a.replace(/&nbsp;/gi," ");a=a.replace(/<FONT Face[^\'\">]*[\'\">]/gi,"<FONT");a=a.replace(/ FACE=[^\'\"]*[\'\"]/gi,"");a=a.replace(/<STRONG>/gi,"[b]");a=a.replace(/<\/STRONG>/gi,"[/b]");a=a.replace(/<TR[^>]*>/gi,"\r");a=a.replace(/<TD[^>]*>/gi," ");a=a.replace(/<TH[^>]*>/gi," ");a=a.replace(/<\/TR>/gi," ");a=a.replace(/<\/TD>/gi," ");a=a.replace(/<\/TH>/gi," ");a=a.replace(/<FONT SIZE=/gi,"[size=");a=a.replace(/<FONT color=/gi,"[color=");a=a.replace(/ color=/gi,"][color=");a=a.replace(/ size=/gi,"][size=");var c;for(i=0;fc[i].font!=0;i++){c="";if(fc[i].color==1){c=c+"[/color]"}if(fc[i].size==1){c=c+"[/size]"}a=a.replace(/<\/FONT>/i,c)}for(i=0;al[i].pos!=0;i++){if(al[i].pos==2){a=a.replace(/<A HREF/i,"[url");a=a.replace(/<\/A>/i,"[/url]")}if(al[i].pos==1){a=a.replace(/<A HREF[^<]*<\/A>/i,al[i].face)}}a=a.replace(/<[^>]*>/g,"");a=a.replace(/>/g,"]");a=a.replace(/\'>/g,"]");a=a.replace(/\">/g,"]");a=a.replace(/\']/g,"]");a=a.replace(/\"]/g,"]");a = a.replace(/\[url\=([^\]]+?)\]|\[img\](.+?)\[\/img\]/g, function($0,$1,$2){if($0.indexOf("http://")<0){var u = $1||$2,b="/";if(u){if(/^\.?\//.test(u)) b = "";return $0.replace(u,content.location.origin+b+u)}}else{return $0}});return a};
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(HTMLtoBBCode(div.innerHTML));
		}
	}];
	
	var menu = PageMenu({ condition:'select', insertBefore:'context-paste', onpopupshowing: syncHidden });
	menu(items);
	//page({ condition:'select', insertBefore:'context-sep-copylink' });
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
	});
};

//复制链接文本地址
new function () {
	var items = [
	{ command: 'context-copylink' },
	{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
		image:" "
	},
	{
		label:"复制链接文本+URL",
		text:"%LINK_TEXT%\n%l",
		image:" "
	}];
	var menu = PageMenu({ condition:'link', insertBefore:'context-savelink', onpopupshowing: syncHidden });
	page({ condition:'link', insertBefore:'context-savelink' });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//图片
new function () {
	var items = [
	{command: 'context-copyimage'},
	{command: 'context-reloadimage'},
	{ // 替换 openImgRar.uc.js
		label: "打开图像RAR",
		accesskey:'R',
		oncommand: function(){
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			try {
				var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
				file.initWithPath(path);
			} catch (e) {
				var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
			}
			file.initWithPath(path);
			Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
			setTimeout(function () {
				file.launch();
			}, 100);
		}
	},
	{
		label: '谷歌以图搜图', 
		accesskey:'G', 
		url : 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
		image:" "
	},
	{command: 'context-sep-copyimage'},
	{command: 'context-viewimageinfo'},
	{
		label:"复制图片 Base64",
		text:"%IMAGE_BASE64%",
		image:" ",
		accesskey: 'B'
	}];
	
	var menu = PageMenu({ condition:'image', insertBefore:'context-saveimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

//当前页面
new function () {
	var items = [
	{
		label:"复制此页标题+URL",
		condition:"normal",
		text:"%TITLES%\n%URL%",
		insertBefore:"context-savelink",
		image:" "
	},
	{
		label:"复制此页标题",
		condition:"normal",
		text:"%TITLES%",
		image:" "
	},
	{},
	{
		label:"在隐私窗打开此页",
		oncommand: "openLinkIn(content.location, 'window',{private:true});"
	},
	{
		label:"在侧栏中打开此页",
		oncommand:"openWebPanel(content.document.title, content.location);",
	},
	{},
	{
		label:"无忧代理打开此页",
		url:'http://s5.51dl.pw/c.php?u=%u',
		image:" "
	},
	{
		label:"在 IE 中打开此页",
		text:"%u",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:" "
	},
	{
		label:"在 Chrome 中打开此页",
		text:"%u",
		exec:"D:\\Program Files\\MyChrome\\chrome\\chrome.exe",
		image:" "
	}];
	
	var menu = PageMenu({condition: 'normal', insertBefore: 'context-bookmarkpage', onpopupshowing: syncHidden });
	menu(items);
};

// 页面信息右键菜单
new function () {
	var items = [
	{ command: 'context-savepage' },
	{
		label:"页面自动刷新",
        accesskey: 'R',
		url: "javascript:(function(p)%7Bopen('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3E%E7%82%B9%E5%87%BB%E5%BC%BA%E5%88%B6%E5%88%B7%E6%96%B0%3C/a%3E%3Cscript%3Efunction%20i(n)%7Breturn%20d.getElementById(n)%7Dfunction%20z()%7Bc+=0.2;if(c%3E=t)%7Bc=0;e.location=u;r++%7Dx()%7Dfunction%20x()%7Bs=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0%7C%7Cc/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22%E5%88%B7%E6%96%B0%E8%AE%A1%E6%95%B0:%20%22+r;i(3).innerHTML=%22%E5%88%B7%E6%96%B0%E5%80%92%E8%AE%A1%E6%97%B6:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)%7Dc=r=0;d=document;e=opener.top;u=prompt(%22%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80%22,e.location.href);t=u?prompt(%22%E5%88%B7%E6%96%B0%E9%97%B4%E9%9A%94/%E7%A7%92%EF%BC%9A%22,300):0;setInterval(%22z()%22,200);if(!t)%7Bwindow.close()%7D%3C/script%3E%3C/body%3E')%7D)('status=0,scrollbars=0,width=240,height=130,left=1,top=1')",
		image:" "
	},
	{ command: 'context-sep-viewsource' },
	{ command: 'context-viewsource' },
	{ command: 'context-viewinfo' }];
	var menu = PageMenu({condition: 'normal', insertBefore: 'context-bookmarkpage', onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu #' + it.command + '{ display: none !important; }')
	});
};

//快捷回复
new function(){
	var items = [
		{label:"Outlook~~~",input_text: "zzzzzz@outlook.com",accesskey: "1",image:" "},
		{label:"Gmail~~~",input_text: "zzzzzz@gmail.com",accesskey: "2",image:" "},
		{},
		{label:"谢谢你的解答~~~", input_text: "非常感谢你的解答！！！",image:" "},
		{label:"要的就是这个~~~", input_text: "亲，要的就是这个，非常感谢！！！",image:" "},
		{label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",image:" "},
		{label:"看起来很不错~~~", input_text: "看起来很不错哦，收藏备用~~~\n谢谢LZ啦！！！",image:" "},
		{label:"谢谢楼主分享~~~", input_text: "谢谢楼主的分享!这个绝对要顶！！！",image:" "},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
		{label:"坐等楼下解答~~~", input_text: "坐等楼下高手解答~~~⊙_⊙",image:" "},
		{},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！",image:" "},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",image:" "},
		{label:"不知LZ在说~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "},
		{label:"纯支持下吧~~~", input_text: "纯支持下吧……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
		{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "}
	];
	var menu = PageMenu({
		label:"快速回复...",
		condition:"input",
		accesskey: "W",
		position: 1,
		oncommand: function(event){
			var input_text = event.target.getAttribute('input_text');
			if(input_text) {
				addMenu.copy(input_text);
				goDoCommand("cmd_paste");
			}
		}
	});
	menu(items);
};

//搜索链接文本
new function () {
	var items = [
	{label:"搜索此链接文本",url:"https://www.google.de/search?q=%LINK_TEXT%",image:"https://www.google.de/favicon.ico"},
	{label:"搜索此链接文本",url:"http://www.baidu.com/baidu?wd=%LINK_TEXT%",image:"http://www.baidu.com/favicon.ico"},
	{label:"搜索此链接文本",url:"http://www.bing.com/search?q=%LINK_TEXT%",image:"http://www.bing.com/s/a/bing_p.ico"}
	];
	var menu = PageMenu({
		condition:"noinput noimage link",
		position: 10,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
	});
	menu(items);
};

//搜索选中文本
new function () {
	var items = [
		{label:"搜索选中文本",url:"https://www.google.de/search?q=%s",image:"https://www.google.de/favicon.ico"},
		{label:"搜索选中文本",url:"http://www.baidu.com/baidu?wd=%s",image:"http://www.baidu.com/favicon.ico"},
		{label:"搜索选中文本",url:"http://www.bing.com/search?q=%s",image:"http://www.bing.com/s/a/bing_p.ico"},
		{},
		{label:"德文搜索该词",url:"https://de.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"英文搜索该词",url:"https://en.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"中文搜索该词",url:"https://zh.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{},
		{label:"搜索相关图片",url:"https://www.google.com/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&q=%s",
			image:"https://www.google.de/favicon.ico"},
		{label:"搜索相关图片",url:"http://www.bing.com/images/search?q=%s",image:"http://www.bing.com/s/a/bing_p.ico"}
		];
	var menu = PageMenu({
		condition:"select",
		position: 10,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
	});
	menu(items);
};

//添加标签右键菜单项
tab([{
		label:"复制 Favicon 的 URL",
		text:"%FAVICON%",
		image:" "
	}, {
		label:"复制 Favicon 的 Base64",
		text:"%FAVICON_BASE64%",
		image:" "
	},{
		label: "关闭所有标签页",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.addTab('about:newtab'));",
		insertAfter:"context_closeOtherTabs",
		accesskey: "Q"
	}
]);

//添加页面右键菜单项
page([{
		label:"发送到 OneNote",
		condition: "nolink nomailto noimage nomedia",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMlSURBVDhPTZPvb1NlFMebaDDsla/IMKKRxWgQE98oMYbwH/jCFwSNcSQGNDAnZoOM8WKOzc0NNeAW5qQO04mKgCtzhdXZdRuspba97frrlq6/7mWlW+1dSexcXZt9vL13Q77Juc+53+c533POc881bOCJw7v2t021j6YkU6giXvAgDUeIGf2IgwLRb32I3/jwf+3Cd87F3QshnE3T1BhqarXgy/UDsw8Sy+TEHNlAFiWskBUWyfx5nyXPEkvuHBlHRl+dGRS/QsDoqwpsN3y4+502JZbnnkvC3TaGu/0mSiCPPCNxueFHhg6bmLfGiVsTJFSTbBKyXSZsDKIm32643WlJFdNFcqqyZe8Zft7TidA/jfibSO8bXTS92IrvagBpXCJ5I6lZZjKDf2Cjgnmjr7IYWCQ+HuWX17sZVgWMe7soFVa5PTzL0bpmhEtzeM8LePu8+PvnCA4Ecfe49QpSpiAFsYBsS/Hdq52Y64f44uVTTPTeIDIp0vB8C3O2MIHRCBPtU9hO2vF0e3F2OHWBmHoZSkAh9GuQnt2tTH9p5eJ7g7S81IJtaJqDz3yMLN5nEwtqtU6jwPhxu95CYiiI7JDxXhQ4+cIJzB0jSD6ZozubaXrtU95+upF0JMPa2tqGhI58vKALiAMCMXMM62eTNNQd51rnqHbg7EEj9c81c2DHMWK+pMY9Cst5O08+XrvPIJxx4Bh0YemdoP7ZY/zUcV07IIezvFV7RLNMbEnjyuUy6+vrmv/Bnla2bdnxpirgJHQpRHJW5txH33NrxKMdKP1Twtz3B32NJrLJHKUH/1IsrGh7WXXgPnnlNFsNW58yuD+fZeLsDN7R8MM+tVVNlF9YplKuPOQ3s9/8agrzIYt+B57uO8RsCf5WdPUqiqq/GVRcXkG5t0wxr++vrpQ4UNeI6d0ruoCz6xbzM2kWwnqflYqacbXMXymFtZWyJlTtfROusTkO7TrF5IkpXcB+5Hfi6leIjUSJXhORLBLpsTTiFZHID1Fc/R6iV++SuK7+BxYZR88d7Grw+PtWXUB91FadGnWqNKI6XRum8/+bzj/6bnjsP4D/2SwfIsl8AAAAAElFTkSuQmCC",
		position: 111,
		oncommand: function(){
			var onenotePath = "D:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";
			var focusedWindow = document.commandDispatcher.focusedWindow;
			var selection = new String(focusedWindow.getSelection());
			if (selection.length == 0) {
				 goDoCommand('cmd_selectAll');
				 var allSelection = new String(focusedWindow.getSelection());
				 if (allSelection.length == 0)return;
				 goDoCommand('cmd_copy');
				 goDoCommand('cmd_selectNone');
			}
			else
			{
				 goDoCommand('cmd_copy');
			}
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(onenotePath);
			var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
			process.init(file);
			var args = ["/sidenote", "/paste"];
			process.run(false, args, args.length);
		}
	}
]);

//隐藏相同项
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
				elem.hidden = true;
				return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};