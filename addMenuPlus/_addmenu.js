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
page([
	{
		condition: "select",
		insertBefore:"context-selectall"
	},
/* 	{
		label:"发送到 OneNote",
		condition: "nolink nomailto noimage nomedia noinput",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVDhPrVNJL0NRFO7/EMTC/AvE1i+wsENjHn+A2JAYFhJaMeyI2IlFB68W5hZ92pKUV1NiClFp8Z56nuG1+dx71FyCOMmXfPe9c7977jnfNfxLOLIGwGFP64U1qQf2VDNsX4D+JZspP76dCWQPsI8mTOcPw1sjYKXMBk+5HZ6KBKi0w1fvgJDe9ypgSzFjrmAU+yN+BKf2cL0vQz2UcbUZJkR2znFzpBAPu0+w1bUMfmh8OxNgZUltToRcR+BxuRaEFrwmziP2EMXVVpi4rj1go2UeQmb/myvkDCLQuYh7+ZaSXIVjmMobQkyP0poLikYL8bsLDVLrwoceMAGpw4l75UnA3zQDT9UElcpD9p/BWycQ/1Ig0OF6qcDXMAn1QIa7xEKlq+z+vxLgk9BOI1BY00SjFZHdc6w2TtK/n1VQ44ASb9p2t5vGt948S+sfCYjFFshSiHgsGiN/LBWN0zqhgMBmKrU7Eb3TKUkJhGjjc9yeqWwSp8R1TU8wxtxBbJtEZpJjKOxk9ZCZhl2Bcw5uLG4kzsPLx5+NJGT0w1crQCy1QmSd/xYsx1s98d7KvBz+FujBMFt/i0SP6e9hMDwCEXZqhPWpJdgAAAAASUVORK5CYII=",
		insertBefore: "context-selectall",
		oncommand: function(){
			var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";
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
	}, */
	{
		label: "翻译所选文本",
		condition: "select",
		oncommand: "gTranslator.selectionTranslation();",
		insertBefore: "context-selectall",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFCSURBVDhPnZExSwNBEEZPESStP8PKP2Fnr1hYiI2dkEoQJKWCnVXEIpDGQsRGJGKhFsKBHpEIFokJ4VQkpFMLm5E3OsvcmRBx4XG3e/u9md2LGB9vPfH0e+3A6/OD6KZhIx+u1Y5kb383I3h5uh8uIURgfaOoLC0vKjaHtNv4m8AHvWikAK7jCw0kjVgDq6UtWYslMH8pMnf2LjMnIlMHn4oK/IVZRTravumPFKjEC7hAaz0fPm+mCpKBgsfWbebshAy6sb/Bu4UL5VQiPnDuiWJT74EumFvLQGXbR6FfAsIGFwicFRBQ+TBOtDoC1girwIcNAiYghHDzNNEgAmRBwPBh5mMLx6FN+60EDdamKx2Z3Kl/C8ZXrjTMExCArzhbvVPoBAHPjCAfNhAQtJaBy4YgYAySsAF82NaMn/h/RxR9Ab4TXij6pKP0AAAAAElFTkSuQmCC"
	},
	{
		id: "readLater-addList",
		condition: "noselect nomailto noimage nomedia noinput"
	},
	{
		label: "当前日期 & 时间",
		condition: "input",
		position: 2,
		oncommand: function() {
 			var localnow = new Date();
			var yy = localnow.getFullYear();
			var mm = localnow.getMonth()+1;
			if(mm < 10) mm = '0' + mm;
			var dd = localnow.getDate();
			if(dd < 10) dd = '0' + dd;
			var hh = localnow.getHours()+7;
			if(hh < 10) hh = '0' + hh;
			var mi = localnow.getMinutes();
			if(mi < 10) mi = '0' + mi;
			var localnowstr = '【' + yy + '.' + mm + '.' + dd + ' & ' + hh + ':' + mi + '】';
			addMenu.copy(localnowstr);
			goDoCommand("cmd_paste");
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPtZPNCYQwEIVTi/V4yE0I5ObVElKBhdhAzmIDKcACUsfbvGEM7G4WNqz7YJifzPuMguYWWWv3EuiMXe0CgHMO2hrWrdBjOadH25sA8zx3xRtAy6/1H0DOGSEEjOOIdV3rAmvOYox11gSklMSoiziOA9u2YRgGyZyd5ym7TcAlgkoC88ttBMriI0AXqqkLoNerS9SyLPDeg9+ntHIrzpsAfVINgq7XYRBWsqgJ6NGTZ5qm7p+JHrX/ImMenDoO+LcxQdwAAAAASUVORK5CYII="
	},
]);

//当前页面
new function () {
	var items = [
	{
		label:"复制此页标题+URL",
		text:"%TITLES%\n%URL%",
		image:" "
	},
	{
		label:"复制此页标题",
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
		label:"在 IE 中打开此页",
		text:"%u",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:" "
	},
	{
		label:"在 TWC 中打开此页",
		text:"%u",
		exec:"D:\\Program Files (x86)\\TheWorld\\theworld.exe",
		image:" "
	},
	{
		label:"在 Firefox 中打开此页",
		text:"%u",
		exec:"D:\\Program Files (x86)\\MyFirefox\\Pcxfirefox.lnk",
		image:" "
	}];
	
	var menu = PageMenu({condition: 'normal', insertBefore: 'context-reload', onpopupshowing: syncHidden });
	menu(items);
};

// 页面信息右键菜单
new function () {
	var items = [
	{
		label:"自动刷新",
		url: "javascript:(function(p)%7Bopen('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3E%E7%82%B9%E5%87%BB%E5%BC%BA%E5%88%B6%E5%88%B7%E6%96%B0%3C/a%3E%3Cscript%3Efunction%20i(n)%7Breturn%20d.getElementById(n)%7Dfunction%20z()%7Bc+=0.2;if(c%3E=t)%7Bc=0;e.location=u;r++%7Dx()%7Dfunction%20x()%7Bs=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0%7C%7Cc/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22%E5%88%B7%E6%96%B0%E8%AE%A1%E6%95%B0:%20%22+r;i(3).innerHTML=%22%E5%88%B7%E6%96%B0%E5%80%92%E8%AE%A1%E6%97%B6:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)%7Dc=r=0;d=document;e=opener.top;u=prompt(%22%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80%22,e.location.href);t=u?prompt(%22%E5%88%B7%E6%96%B0%E9%97%B4%E9%9A%94/%E7%A7%92%EF%BC%9A%22,300):0;setInterval(%22z()%22,200);if(!t)%7Bwindow.close()%7D%3C/script%3E%3C/body%3E')%7D)('status=0,scrollbars=0,width=240,height=160,left=1,top=1')",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK2SURBVDhPY0AGq/6HMs9/YFo794Hp8oUPrTIWP3Aymn/fXqC+noEJqoQwmHpT2nvybZlPU24p/pl0Tft130Xzox1n7YKg0vjBkmde8vMemkycekvu28Qb0v87Lyn8rzuu9q/ysG4DUJoRogoHWPLE3mD2PZ3DU27J/Zl8S+p/3zXZ/63nlP5XHtL4VLRP0xmqDDuY/9JUYvY97b2Tb0n/m3Jb6v+E69L/Oi/J/qg/qfKvdJ/WueKdemJQpWDwH+iaVaGhzFAuA8Os+zoZQH//mnRTCmTAvUk3ZTrazymmVB1Re160R2ti6CoGhGIgOCYjw3lYWVkbzJn535h1+h2lVZNuSnyfckNq6dS70nqr/jMw11/RYivZp92Wv0vPHawQCZy1sFA5qKraeMbYmJVh5lNJLmDIb5h8W7Jy4i0hPqgaMKifry+wONcMRey8u7vCUX39tfvl5HZukpTkYph5xph10i3J5CkvRXmgauDgsIGB/hETk/pjFhac++3tWU47OFgf1tU9sFdO7u9eaelVYBeAwJyH6lKrViEFChRsU1FJ2qqg8GafqWneAVPTtu1KSk+2SEn93ywp+WublFQmVBl2AAxppjVyctNXiIn9XyMl9XO1pOTfVUD2SjGxf2tERfevFRGRhCrFDlYpKfEvlpA4Ol9Y+D8ILwDihcLCfxeKiJxaKiJiDFWGG8yWl9ecLir6dKqg4P9pQDwdRAsJbZ8jLKwOlMafKoGAcaKoqHKvgMD+bn7+V718fD97+Pn/dfPwbAeyhaBqIGDlypWiixcvNl24cKH7okWLgoF0FJBOXrJwYeq87u7y2cXFk6bHx2+e7ONzo9/a+vn0zMxqkFqQHpBeBqBixSVLlgQB6WygYBWQ3QKkO4D0JKDYVBAGsRcvWNC5aN689oXz51eD1EL0LFIEAGnEJwptdKj6AAAAAElFTkSuQmCC"
	},
	{
		label:"全页面截图",
		oncommand: function () {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = content.document.documentElement.scrollWidth;
			canvas.height = content.document.documentElement.scrollHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);
		},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABISURBVDhPY6AOWPnmPwpGBuhy6PJggE8Buhy6PBjglEADA2/AMAAUhwHtDUDGyACbPAjDAV5JIMAmD8IkA7I1wgDFBmAABgYA9oelARp3ZZ4AAAAASUVORK5CYII="
	},
	{
		label:"搜索油侯脚本",
		url: "https://www.google.de/search?q=site:userscripts.org%20%HOST%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADSSURBVDhPnZK9DcIwEIXTsQBL0CAU15RQUtKwRAbIAlmCPuzADExAmwUyQHjPvrNs6zA/T/p0jvPe6Sy7MXQEE1ikXsBPWtzNRfD9DNvfqysadGH7s3RkMkh4kH2LLciUjW5Bj4prn0pkhlLoUXHtU1APHsAMpdAD9JixwSQ/r250cxlKgYesGYJ2UkODdmx9rQGvkkkn8JShEvGtQNQecPPMaoVSxLsBpv46xgGkP6pIE95ClNxsXfQVU0SJpS763jU4gTvgY9JHUjILGpY30DQvwsxGGOnZ9v8AAAAASUVORK5CYII="
	},
	{ command: 'context-sep-viewsource' },
	{ command: 'context-viewsource' },
	{ command: 'context-viewinfo' }];
	var menu = PageMenu({condition: 'normal', insertBefore: 'context-reload', onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu #' + it.command + '{ display: none !important; }')
	});
};

//复制链接文本地址
new function () {
	var items = [
	{
		label:"复制链接文本+URL",
		text:"%LINK_TEXT%\n%l",
		image:" "
	},
	{ command: 'context-copylink' },
	{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
		image:" "
	},
	{},
	{ command: 'context-savelink' }
	];
	var menu = PageMenu({ condition:'link', insertBefore:'context-openlink', onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//打开链接的各种方法
new function () {
	var items = [
	{ command: 'context-openlinkintab' },
	{
		label:"用 Web Cache 打开",
		url:"http://webcache.googleusercontent.com/search?q=cache:%l",
		image:" "
	},
	{
		label: "用 Google Docs 打开",
		url : "http://docs.google.com/viewer?url=%l",
		image:" "
    },
	{},
	{ command: 'context-copyemail' },
	{
		label:"在隐私窗口打开",
		oncommand:"gContextMenu.openLinkInPrivateWindow();",
	},
	{
		label:"在侧边栏中打开",
		oncommand:"openWebPanel(gContextMenu.linkText(), gContextMenu.linkURL);",
	},
	{},
	{
		label:"在 IE 中打开",
		text:"%l",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:" "
	},
	{
		label:"在 TWC 中打开",
		text:"%l",
		exec:"D:\\Program Files (x86)\\TheWorld\\theworld.exe",
		image:" "
	},
	{
		label:"在 Firefox 中打开",
		text:"%l",
		exec:"D:\\Program Files (x86)\\MyFirefox\\Pcxfirefox.lnk",
		image:" "
	}
	];
	var menu = PageMenu({ condition: 'link', insertBefore:'context-openlink', onpopupshowing: syncHidden});
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
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
	});
};

//图片
new function () {
	var items = [
	{command: 'context-copyimage'},
	{command: 'context-reloadimage'},
	{ // 替换 openImgRar.uc.js
		label: "打开图像RAR",
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
	},{
		label: '谷歌以图搜图',
		url : 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
		image:" "
	},
	{command: 'context-sep-copyimage'},
	{command: 'context-viewimageinfo'},
	{
		label:"复制图片 Base64",
		text:"%IMAGE_BASE64%",
		image:" "
	}];
	
	var menu = PageMenu({ condition:'image', insertBefore:'context-saveimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

//快捷回复
new function(){
	var items = [
		{label:"Outlook~~~",input_text: "xxxxxx@outlook.com",accesskey: "1",image:" "},
		{label:"Gmail~~~",input_text: "xxxxxx@gmail.com",accesskey: "2",image:" "},
		{label:"xxxxxx",input_text: "xxxxxx@outlook.com",accesskey: "3",image:" "},
		{},
		{label:"谢谢你的解答~~~", input_text: "非常感谢您的解答！！！",accesskey: "T",image:" "},
		{label:"亲，要的就是~~~", input_text: "亲，要的就是这个，非常感谢！！！",accesskey: "D",image:" "},
		{label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",accesskey: "Y",image:" "},
		{label:"看起来很不错~~~", input_text: "看起来很不错哦，收藏备用~~~\n谢谢LZ啦！！！",accesskey: "G",image:" "},
		{label:"谢谢楼主分享~~~", input_text: "谢谢楼主的分享!这个绝对要顶！！！",accesskey: "F",image:" "},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "R",image:" "},
		{label:"坐等楼下解答~~~", input_text: "坐等楼下高手解答~~~⊙_⊙",accesskey: "V",image:" "},
		{},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！",accesskey: "A",image:" "},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "S",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",accesskey: "C",image:" "},
		{label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "B",image:" "},
		{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "X",image:" "}
	];
	var menu = PageMenu({
		label:"快速回复...",
		condition:"input",
		accesskey: "W",
		position: 1,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACGSURBVDhPYxh0gAWIw4B4rbe399+AgID/IAxig8SgciA1WIGWv7//b5gmXBikBqQWogUBlJBtJIShLlKCaIWAtdgU4sMgPRCtQODn5/cPKigAwkiKcPJBeoBsCKDYACCgzAtAQHEgggBF0QgDWBMSMoaqIRlEwAyE8skCYkCMEnCDATAwAACbYMG591LPcQAAAABJRU5ErkJggg==",
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
		{label:"在百度云搜索",url:"https://www.google.de/search?q=site:pan.baidu.com%20%LINK_TEXT%",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJuSURBVDhPrVNZaxNRGL0/U7JM0yQqCIIEV7CCti+CIm70Uakg+OCDiELNvlobmlQS27Sl2jbJzKRJZslMJmOa5Pjd65T2XQcud5nvnO989zuX/ZdPSqsI5boIJGUEEm2EC334vjRp1jCX6UBKKTQfi7U/3oIv3kSkqMODnxEEKZAH+CkglPX2RCpxcK5HexXz+b6YI6VzBJyZZ/atHkFKdzBPwfP5HoEVXM4quFlScGu9j3DyL3kgJQtyD04E2WOESVK4qAlgkMgkOrv9tYOS6uDAAdItGw+qOoEVQcDL8+CMnUrndQdIwYWEjBBlqxsT/NSGeN0wsLzr4MX3Lu6ukcIsDUrkwRnjkvnFSXQPd8oaPhw6KLQH2NFdLGxoeHfoYqNjo9z9jeUtU1x2lNR6cMb8pMCX6eJiRsGnXwYmADqWi2t5GfGmhVrPwf2KTvegYWnTQGxdh5Q/RxCjH0XKaM+AwciF5bh4uW3h7a6JPXOMqwUVn4+GopwDe4LWcIIndeOMoNpzMZ1OMJ1NacywZ4yxVNGgnQD3qiZW2yOkDk083NTw+IeFR3ULC6TIgzP2cV+HNhxhfHKCGREkZRevGiZ2beB6UcE2lfBs20ZKHqGs2Hi/PxAle3DGomkZKzsG8sdjJCjT05qO51sWlms9oWCloWOx0sebfQexooob33oIkaE8OGO+OPWdentlTUc03UYkR86jNl4qkusSZNuMCinREu3zkwtDBV3Y2oMzxk3BrcstK9GPObHukOdbYh0kq/PWccMJy9OavwcPTgrIQPxxcC/w+TSYvxFhaSLiVudZQ3TO3wN3rQf/l4+xP5yBeeudxxlpAAAAAElFTkSuQmCC"},
	{label:"BookLink此小说",url:"https://www.google.de/search?q=site:booklink.me%20%LINK_TEXT%%20_%E6%9C%80%E6%96%B0%E7%AB%A0%E8%8A%82",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFh0lEQVRYhb1XW0wTaRQ+aRqChhREJIYYH0zfmhBD9oEQHjaGF7Ntp8UuLJXWhkUWpEJFW7AbVxYRASWliIvQoiCl03JxZV3BWzItUC5VwAKF1G5FV9G4xiXGGGJMc/ahLXIZLlrXk5xM8mf++b7zncv/D8DGjAEAIXFxcWylUikjW1pOA0CYf/2rWKh7cICavlA7P5SdhfdVxzAjI0MBAMyvRWDzzNXOWYuAhxYBDymCi3bS6Nm0adNO+EoqhLo62mYCBCwCHg7lZuPRI0dOAUDIWhsjIyNZcrmcDwChwZANmepod1MEFxer8MBw5WV+fr5cLBYncTicneBLSQCEIZFI9kx23xhzlJZ4G2tr6yGIumG6/uhyLiZgEfDQKhLiYNaPOFKoxOn6unf2jnabUqnM5HA47Osmk26i4sx7KpAyRR7qamp0n0OCeUKtlk3V171ZTmC5UwQXh+Q56G66PN8nTkXLMsWcxta56OjohE8hEHrNbNaOqou864Gv58OHc7FAoWgGgF0bJcDsNBo1w/IcpIIAXlDAYHAzmcw9QFO0DAAIi4iIiNi2bVsYAGwGgBC1Wp0+duJnb9DABBcnNFXvExISVAAQRRc9c5yi7rhbDa897eaXj652PnV1tHsmf7vwNljZAwQG2sxPAOAbWunZbPYOl77h7ZJN/o3BggfcUVLsTUpKktISOHTokMiuOPzFwCiCizaZZOm6kI/66uouAGCtIKDVaAocp371rlZotgMSfNhwEWdMRpwxGbEvLWVNAtbvk/Fp17UVpOxXmp+u1gGhBEFIrSQ5cU95dIX0Y+oinL3ZgxYBDz3NTWjPy0VKwMPR4yocyspESsDD3pR96Cj+BfvSUnDop4Po1tWjRchHe5584TvTuob5LVu2JNKmAXwjdLtMJiuwk+RM76Io7xco0N2owyed7fhqcAAtQj669Q04WXEGn/15HS3JBM72dOOYuhAfm004WqTC8dIS/PvaVRxTFy18x6mp8iYmJkphjROUAQBMqVSabs//yNx5rtIXnTgVH9bX4Zi6EGdv3USK4OKjVgPeP1aArroLaBHy8VGrAZ3nKvFfhwNHVMeWKNmbKkLnpca5Oq22IioqKmY1JWDv3r3xD4pPLvT/YzOJo4VKfHDyBD6/fQt7U/bhP7Z+fFhfhxNlp9GeJ8dn3TdwxmTE4Zws9LQ0o026H5/fvY3jJcW4/ADrl6bjlJl8UVZaqqItypiYmChXc9PrwKb+9DQcPV6Ik+VlaN0n8K1JxGg7kI4UwUWK4OJgZgb2pooW3rcIeGgVJaNNJqFtZ4rgoqO0BIVCYTZtKixtbT1fcg7Q+XSjbn7r1q0C2jTIZDLBSJEq6DEciHaF87/Dm3qdCwBiaQmw2ewdf5HGN1+CQL9EjLfNZqdOq7lz5XwN1arV9rXX1g5nHTx4HgC206agy0Se75OIg5dayEe7iXwRGRkpAoAYAIj2g+7wP1e2ZFpaWqKzumo+6BoQ8tFhaJnbvXu3wg+2uO0YsEobbh7v6R60CPm0edxozvul+/GeiZyNjY3NA4CN35wzMzO/ndRUfVgCJuTjhKbqvZUkPeNnKz5YRcI1yVAEF++aza7w8HARTeTrWsi58vKKEXWhlyK4OHw4F6lWg9t/mYiLj49P1lZUkH2XL3mmmi69naqt+dC3/4cVBJqqq63gy/Nn3YBDz5aVnZ1qb5srUCiamUxmEny8yTDAd2PayWKx4jkcjshpaHm1fNoZa7Q28BXdZxkDAELCw8N3+YFDaCIJkGFUlperBzIzlhD4/eLFexCEAp9kLBYr0tnRNkMRXLT4i/WGrsEBn1J8QRqjSKXKnqws9zob9e+69Xqnf8isfuL9DxYmEAhkERERfPCN1+2wzj9jwP4Dbl10ubCceuUAAAAASUVORK5CYII="},
	{label:"龙部落此电影",url:"http://www.longbuluo.com/index.php?s=%LINK_TEXT%&submit=%E5%85%A8%E7%AB%99%E6%90%9C%E7%B4%A2", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADkSURBVDhPzVLbDcIwDPRXpTgswAIswAJMwARswAZdgV36C20/+GCLLlNyzblyHyAk+OCkU5Ozz3HcyE9xVd02qlViSUmaEI7Q2qLYUVoCQRrBnhz2dQhn7G+qD9PI8RC5i2xq1f0qWaCO8eT1RUdtjAdURsDWvsC8g0kB3JMJSOzwJSvMxZ+MThDDmvY8vEmSow3RaAchRntGEkufSJavZoC50ZoBA6pbAkzQPpoBwMD4+2z9Px2ssKI1A8K7DvwVkJfY0ZqBZNAekTdhPbtCnwpfaM0YXmCif9YMDTHT5rEvIfIEoLvpsYVTY8EAAAAASUVORK5CYII="},
	{label:"翻译此链接文本",url:"http://translate.google.de/#auto/zh-CN/%LINK_TEXT%",image:"http://translate.google.de/favicon.ico"},
	{label:"搜索此链接文本",url:"http://www.baidu.com/baidu?wd=%LINK_TEXT%",image:"http://www.baidu.com/favicon.ico"},
	//{label:"搜索此链接文本",url:"http://www.bing.com/search?q=%LINK_TEXT%",image:"http://www.bing.com/s/a/bing_p.ico"},
	];
	var menu = PageMenu({
		condition:"noinput noimage link noselect",
		position: 10,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
	});
	menu(items);
};

//搜索所选文本
new function () {
	var items = [
		{label:"搜索所选文本",url:"https://www.google.de/search?q=%s",image:"https://www.google.de/favicon.ico"},
		{label:"谷歌站内搜索",url:"http://www.google.de/search?q=site:%HOST% %s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"},
		{label:"翻译所选文本",url:"http://translate.google.de/#auto/zh-CN/%s",image:"http://translate.google.de/favicon.ico"},
		{},
		{label:"在百度云搜索",url:"https://www.google.de/search?q=site:pan.baidu.com%20%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJuSURBVDhPrVNZaxNRGL0/U7JM0yQqCIIEV7CCti+CIm70Uakg+OCDiELNvlobmlQS27Sl2jbJzKRJZslMJmOa5Pjd65T2XQcud5nvnO989zuX/ZdPSqsI5boIJGUEEm2EC334vjRp1jCX6UBKKTQfi7U/3oIv3kSkqMODnxEEKZAH+CkglPX2RCpxcK5HexXz+b6YI6VzBJyZZ/atHkFKdzBPwfP5HoEVXM4quFlScGu9j3DyL3kgJQtyD04E2WOESVK4qAlgkMgkOrv9tYOS6uDAAdItGw+qOoEVQcDL8+CMnUrndQdIwYWEjBBlqxsT/NSGeN0wsLzr4MX3Lu6ukcIsDUrkwRnjkvnFSXQPd8oaPhw6KLQH2NFdLGxoeHfoYqNjo9z9jeUtU1x2lNR6cMb8pMCX6eJiRsGnXwYmADqWi2t5GfGmhVrPwf2KTvegYWnTQGxdh5Q/RxCjH0XKaM+AwciF5bh4uW3h7a6JPXOMqwUVn4+GopwDe4LWcIIndeOMoNpzMZ1OMJ1NacywZ4yxVNGgnQD3qiZW2yOkDk083NTw+IeFR3ULC6TIgzP2cV+HNhxhfHKCGREkZRevGiZ2beB6UcE2lfBs20ZKHqGs2Hi/PxAle3DGomkZKzsG8sdjJCjT05qO51sWlms9oWCloWOx0sebfQexooob33oIkaE8OGO+OPWdentlTUc03UYkR86jNl4qkusSZNuMCinREu3zkwtDBV3Y2oMzxk3BrcstK9GPObHukOdbYh0kq/PWccMJy9OavwcPTgrIQPxxcC/w+TSYvxFhaSLiVudZQ3TO3wN3rQf/l4+xP5yBeeudxxlpAAAAAElFTkSuQmCC"},
		{label:"BookLink此小说",url:"https://www.google.de/search?q=site:booklink.me%20%s%20_%E6%9C%80%E6%96%B0%E7%AB%A0%E8%8A%82",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFh0lEQVRYhb1XW0wTaRQ+aRqChhREJIYYH0zfmhBD9oEQHjaGF7Ntp8UuLJXWhkUWpEJFW7AbVxYRASWliIvQoiCl03JxZV3BWzItUC5VwAKF1G5FV9G4xiXGGGJMc/ahLXIZLlrXk5xM8mf++b7zncv/D8DGjAEAIXFxcWylUikjW1pOA0CYf/2rWKh7cICavlA7P5SdhfdVxzAjI0MBAMyvRWDzzNXOWYuAhxYBDymCi3bS6Nm0adNO+EoqhLo62mYCBCwCHg7lZuPRI0dOAUDIWhsjIyNZcrmcDwChwZANmepod1MEFxer8MBw5WV+fr5cLBYncTicneBLSQCEIZFI9kx23xhzlJZ4G2tr6yGIumG6/uhyLiZgEfDQKhLiYNaPOFKoxOn6unf2jnabUqnM5HA47Osmk26i4sx7KpAyRR7qamp0n0OCeUKtlk3V171ZTmC5UwQXh+Q56G66PN8nTkXLMsWcxta56OjohE8hEHrNbNaOqou864Gv58OHc7FAoWgGgF0bJcDsNBo1w/IcpIIAXlDAYHAzmcw9QFO0DAAIi4iIiNi2bVsYAGwGgBC1Wp0+duJnb9DABBcnNFXvExISVAAQRRc9c5yi7rhbDa897eaXj652PnV1tHsmf7vwNljZAwQG2sxPAOAbWunZbPYOl77h7ZJN/o3BggfcUVLsTUpKktISOHTokMiuOPzFwCiCizaZZOm6kI/66uouAGCtIKDVaAocp371rlZotgMSfNhwEWdMRpwxGbEvLWVNAtbvk/Fp17UVpOxXmp+u1gGhBEFIrSQ5cU95dIX0Y+oinL3ZgxYBDz3NTWjPy0VKwMPR4yocyspESsDD3pR96Cj+BfvSUnDop4Po1tWjRchHe5584TvTuob5LVu2JNKmAXwjdLtMJiuwk+RM76Io7xco0N2owyed7fhqcAAtQj669Q04WXEGn/15HS3JBM72dOOYuhAfm004WqTC8dIS/PvaVRxTFy18x6mp8iYmJkphjROUAQBMqVSabs//yNx5rtIXnTgVH9bX4Zi6EGdv3USK4OKjVgPeP1aArroLaBHy8VGrAZ3nKvFfhwNHVMeWKNmbKkLnpca5Oq22IioqKmY1JWDv3r3xD4pPLvT/YzOJo4VKfHDyBD6/fQt7U/bhP7Z+fFhfhxNlp9GeJ8dn3TdwxmTE4Zws9LQ0o026H5/fvY3jJcW4/ADrl6bjlJl8UVZaqqItypiYmChXc9PrwKb+9DQcPV6Ik+VlaN0n8K1JxGg7kI4UwUWK4OJgZgb2pooW3rcIeGgVJaNNJqFtZ4rgoqO0BIVCYTZtKixtbT1fcg7Q+XSjbn7r1q0C2jTIZDLBSJEq6DEciHaF87/Dm3qdCwBiaQmw2ewdf5HGN1+CQL9EjLfNZqdOq7lz5XwN1arV9rXX1g5nHTx4HgC206agy0Se75OIg5dayEe7iXwRGRkpAoAYAIj2g+7wP1e2ZFpaWqKzumo+6BoQ8tFhaJnbvXu3wg+2uO0YsEobbh7v6R60CPm0edxozvul+/GeiZyNjY3NA4CN35wzMzO/ndRUfVgCJuTjhKbqvZUkPeNnKz5YRcI1yVAEF++aza7w8HARTeTrWsi58vKKEXWhlyK4OHw4F6lWg9t/mYiLj49P1lZUkH2XL3mmmi69naqt+dC3/4cVBJqqq63gy/Nn3YBDz5aVnZ1qb5srUCiamUxmEny8yTDAd2PayWKx4jkcjshpaHm1fNoZa7Q28BXdZxkDAELCw8N3+YFDaCIJkGFUlperBzIzlhD4/eLFexCEAp9kLBYr0tnRNkMRXLT4i/WGrsEBn1J8QRqjSKXKnqws9zob9e+69Xqnf8isfuL9DxYmEAhkERERfPCN1+2wzj9jwP4Dbl10ubCceuUAAAAASUVORK5CYII="},
		{label:"龙部落此电影",url:"http://www.longbuluo.com/index.php?s=%s&submit=%E5%85%A8%E7%AB%99%E6%90%9C%E7%B4%A2",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADkSURBVDhPzVLbDcIwDPRXpTgswAIswAJMwARswAZdgV36C20/+GCLLlNyzblyHyAk+OCkU5Ozz3HcyE9xVd02qlViSUmaEI7Q2qLYUVoCQRrBnhz2dQhn7G+qD9PI8RC5i2xq1f0qWaCO8eT1RUdtjAdURsDWvsC8g0kB3JMJSOzwJSvMxZ+MThDDmvY8vEmSow3RaAchRntGEkufSJavZoC50ZoBA6pbAkzQPpoBwMD4+2z9Px2ssKI1A8K7DvwVkJfY0ZqBZNAekTdhPbtCnwpfaM0YXmCif9YMDTHT5rEvIfIEoLvpsYVTY8EAAAAASUVORK5CYII="},
		{},
		{label:"汉典查字",url:"http://www.zdic.net/search?lb=1&q=%s", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANrSURBVDhPTZNrTJNXHMb7ZR/3abdkY0vmIlumyy4CKqszBtHAihM0wBxDB1IRlMiGy9yi2wyKSmHlYvv2Sgd2OlEWDSNDcWFrjKKRFC/0QilYLa2lpoKiMpi/nb66bB/e9z3vyTm/8/z/z3MUBvctJE+U+gBoR2eQvFGM7hCSmG+fBLP/DgZ3BGVGFmVao/yvuzaGwROR1yiahu5gHxjkQlcjvb/b+al/gGbfJLrL11meX0hNzwU6gaT0DLK3fMGRGDIgvjkOURgGg0hDMSJNabBNgddejuHaTWyBu7y5IIW1lV+xvcXOK3MTeUe5lPSPC9l/uk9Woh8MofjBf5+T53sJSlnMfv00Y9Y8zAPDrK2oIvHtd1m5Xk1pnZ55C5LZ2XGaurNXxcb/lSC5RA/8UWyDIziPf8/Z3wy0XXJiHJ2kVHOQ/O07KTnQTFruJxyJzNIaFn16Il8uwTh0i8Zzt4XsCMZADO3wQ3SecSwjEzT2eUic/xbzklLYUq8nZUUmJfsasAp4XL4MaBsPUaW5T5ZqlpqOKIfCE5TVG1jxaTG72k+Qvm4D769aQ023g4RX58iAlsC9/wCSN4zJNY7qw0cUqB+ILs/wTfspFmeuEpvOkCq+SgHYprOhKirF7Is+LuFfF/RCumkkjPaPCLWdM2iu/EKD00nJ3iaqzIdZuFLFEgHYuKeeXce6MQ3H0LvCSOKRAfFXXI7ZL2p2O6joVXMo9DcH+318LgBvCCuVWTl8truWbztOIYm1+qtBzE9ACkmkTi/kWLyTFJxYzI5OI9W/XqLSZKe8wUTCa3NZtiafnK1VpKqyef29ZOYnL2JvlwOryIpCL2xs80NRVzbF3ZlU1LaxLDdfPrFo9wGeefY5MtYVonFcZv+fA9Sdc1Enxk39foy+2yjMngDlPWpSbQo0zjO0XJ/GFpyS47s0J4+N+xr50vozq8sqOToBxqF4E4Xl4s7IQbK4vaTZn+KjY3NEGTER6wjNzlGW5xXwgWiexR+jNfiAhSIDytW5wrEQrWPT8ukyoNX/iD0XD7PDUY1tZJrqkz1kb9rKJpHCH29OPbbMO45BxPf5F1/ihYSXKRaOaPvcYl64oHMFsfoe0uL7S1xrYed5F7Yb9zh6F5qv3JD9jt8+i0if7qKHzOLNJKUqUX9XI5RN8Q9zteNcnUu7SgAAAABJRU5ErkJggg=="},
		{label:"搜索相关图片",url:"https://www.google.com/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&q=%s", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH9SURBVDhPzVE7i5pREP1+gYWFIMKCIPgHfKyFoCkEwdbKQny/xbeCoCK4i6KfqCyCCGIlbGN+wgrCohAUY20TXEgXWEg7uWfwC0tIlSoDhzv3zpkzjyv9v2axWD4ZjUbv3d2dV6/X8wkYDAavzWbzqlQq9Y36d3t4eHgtlUqUTCYpk8kQ/EQiwVgsFiSE7pnocrme3G63bDKZZKEsW61W2Ww2yyLxLZfL0Wg0+sFEYcFg8HO326VarUYibwWeVC6XCUin01QoFPgURCoWi7TZbOh8Pv8Mh8PPgUDgWVQ+Hg4Hmk6n3Al4UiqVIuBWRPJ4PKtYLEar1Youlws9Pj6yWD6fp1arxaKn04mazSbF43GSIpEIAbd8yW63y9Vqle+z2ewNsWg0ytWQ0O/3OSbuX/AuifYIQEuohBHq9TqTRMVvSBLtswg4jUaDY8J/RadQYvVQKMQkPGazWXI6nZH5fP5dScQ7Cg2HQ/L5fHW/3/+VBZQRlKUo/nK5pOv1SpPJhLeOsTqdDm23W9rv91SpVLjg7xHw30oXEMK/r9dr2u1272gZNh6PX47HIw0GA+6IdwcHQKIygiKCzfd6vXeHwyGLf5dF7AU/ofBYoN1uE4C2P3aBIBYIIcSwF8ThA+DwN2q1WrtOp7tXq9UMjUbD+OgrAO/P+226fzVJ+gV+cHLx+IUV6AAAAABJRU5ErkJggg=="},
		{label:"搜索所选文本",url:"http://www.baidu.com/baidu?wd=%s",image:"http://www.baidu.com/favicon.ico"},
		//{label:"搜索所选文本",url:"http://www.bing.com/search?q=%s",image:"http://www.bing.com/s/a/bing_p.ico"},
		{label:"360网盘搜索",url:"https://www.google.de/search?q=site:yunpan.cn%20%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChklEQVQ4jZ3Q3UtTcRgH8N9fEupetOlQ3Jmbk0wIuojuCsIgqsvuCsR5tplFVrbedLo5l0o1kUSKQJxtOydfVphKYstWzKDUnDq3s/myt7PtfLuxESiCXnxuvs/D8zw8hBBC5C3e6sqGkaTGwApVTaM4iMbACJrrg5ny+98VhBBCSm7N1FQ1sjjRFz8UTSMLefNsNVFrHQmNPYajUGmHY6TSwED1fGdfZwZiuDwUR01fbN+6WucWiNrAgurd2uPRVBJZAQCAGC+gjonv6VHrGRCVgUFZdxRl3VFoXmziytAOTvdv4c3XCK7aPuJ82xgGphYR4wX0fEnipH0z16/Su0FUegaltijOvtoCl9hdCWA+sINz9j8oaVtC1cPPeO3xgfVHsZ0ScOntNkptUVTo3CAVegbyrgh+htNgfet4511Bgs8AAPiMAONkHCWWdYi0LogN4xicXoJ3LQV5V+T/ARz6JxdxyjgBkWEclbdH8MEfzF3TM5dAsZVDsZWDaXQZCT6LYisHJe0CUeoYyCxhtDq+4c57DrJODsdNq8inWTwe9iGz+8mxRR4vvUkk0ln8CGxC1smBanAJRKljUGQJ48KzOfAZAeyvFCaWeHjX0yhrmcVFsweh7WTumkgshVrrNIosYShoZ5ZQOjcKzSGIjQuoNXtg8yzDxP6GqnkMUtMqxEY/ZA0O3LDP4FrvJ0jqhiA2LqDQHIKSdqUJRbvS0o4QpB0hiB74kXdzCnlNM5C0BvAvl5jWUHB3HgX3fJC2B3O5gnamiFI7vCbp2MBRUPWOABE9CYoVtCsrbt/AYVC0K33MtCojhBCS9zRYRmlHQuW0M6ug3TiQ1pmh6h3B/NaVQkII+QtqncEVt0PFzwAAAABJRU5ErkJggg=="},
/* 		{},
		{label:"Wiki-DE该词条",url:"https://de.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"Wiki-EN该词条",url:"https://en.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"Wiki-CN该词条",url:"https://zh.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"} */
		];
	var menu = PageMenu({
		condition:"select",
		position: 10,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
	});
	menu(items);
};

//隐藏相同项。必须，不能删除
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
