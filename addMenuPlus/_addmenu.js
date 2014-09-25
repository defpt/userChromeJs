//添加标签右键菜单项
tab([{
		label:"复制 Favicon 的 URL",
		text:"%FAVICON%",
		image:" "
	},{
		label:"复制 Favicon 的 Base64",
		text:"%FAVICON_BASE64%",
		image:" "
	},{
		label: "关闭所有标签页",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.addTab('about:newtab'));",
		insertAfter:"context_closeOtherTabs",
	},
]);

// 添加横排按钮 horizontal menu
var HMenu = GroupMenu({
		id: "context-openIn",
		label: '打开...',
		condition:"noselect noimage noinput nomailto nocanvas nomedia",
		insertBefore: 'context-sep-navigation',
	});
HMenu([
    {
		label:"复制链接+文本",
		tooltiptext: "左键:Discuz!代码|中键:MD代码|右键:普通",
		onclick: function(event){
			var formats = [
				"[url=%RLINK_OR_URL%]%RLT_OR_UT%[/url]",
                "[%RLT_OR_UT%](%RLINK_OR_URL%)",
                "%RLT_OR_UT%\n%RLINK_OR_URL%",
            ];
            var str = addMenu.convertText(formats[event.button]);
            addMenu.copy(str);
            if (event.button === 1)// 中键点击后自动关闭菜单
                document.getElementById("contentAreaContextMenu").hidePopup();
		},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVDhPnZJBDoAgEAP5Gtz0/08w+gylZlnGlcTIJA10W5CDKVJKWar2qvND6ix2rGPB6MBIux37T7tk+sltPv3kNusbG97pAPaEewYsRNgT7hlwpTjTXrhnwEKEPeGeAVeKM+2FewYsRNgT7hmwEGFPuGfAQoQ9Yf6YviDnvFWtCv78iYed7+gWBaH4kn/xQUoXescBVG1EAoAAAAAASUVORK5CYII="
	},
    {
        label: "在其它浏览器中打开",
		tooltiptext: "左:IE、右:Chrome",
		onclick: function(event){
			var url = addMenu.convertText("%RLINK_OR_URL%");
			if (event.button === 0) 
				addMenu.exec("C:\\Program Files\\Internet Explorer\\iexplore.exe", url);
			else if (event.button === 2) 
				addMenu.exec("D:\\Program Files\\MyChrome\\MyChrome.exe", url);
		},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIISURBVDhPYyADcAExPxAzgnlEAn4WFhYraWnpPFNT01ZDQ8Mebm7uSKA4M0QaFcBM9mJiYiphZ2dvBipelJCQMH3Xrl328fHxChMmTFBNTU3N4uLikoSqRQBmZubQgICA/9gwDw9PDVAJL0idn5+foZycHIoBTKysrGnYNCJjTk7OBUC1/P39/QKhoaGoXkBW6OzsfLS4uHhuQ0NDf0hIyA4dHZ1rSIZkA5WjaGYB+rMVpsDLy2sXVBwOCgsLpygrK98AyQsICIDkUf0vKSm5BWaAt7f3Bk1NzRo2NrYqoFQVBwdHFVBsiqqq6lWYGqB3jSE6gQCoQE5eXv4oTJIYDHSNH1Q7AwMwqlSALjgJk7S0tDwSGxu7BRh1YBwTEwNnw8STkpIsodoZGICBkolsuoGBwQqoFFFABBiAGzU0NA6LiorCQxro/+XAhBQHTBdeQP/2AL25DSg2G6i+EORliFYgACVRQUHBMwsWLIgDpq4pyC7BhoF+P5Senq4A1c7AICEh4QkM3X1QLkN+fv4EGRmZ8+ga+fn5r/n6+q5bsWKFNVAZE0Q1EGRkZNiqqKish3IZgAEmBkxlqcA0PzU4OHidp6cnKMDmLFq0KHPhwoVqQCUIzSAAzF3CwJQ2EWjDFF5e3gJFRcWUkpIS623btskA07tUYGCgjI+Pj4ixsTErVAsSYGAAAKvp5W/hT+VqAAAAAElFTkSuQmCC"
    },
    {
		label:"在隐私窗口|谷歌缓存打开",
		tooltiptext: "左:Private、右:googleCache",
		onclick: function(event){
			var url = addMenu.convertText("%RLINK_OR_URL%");
			if (event.button === 0) 
				openLinkIn(url, 'window',{private:true});
			else if (event.button === 2) 
				gBrowser.selectedTab = gBrowser.addTab('http://webcache.googleusercontent.com/search?q=cache:'+url);
		},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEESURBVDhPxVE7CsJAFNwIViKCV4kgpMk/dW4hCDZeIKU2HsHCVo+hYCM2sUxlkUbvoDPyEtcoQmLhwJC8mXHcfVE/w3XdLSmjsiyri3kCzkFPyPcJPYk9EcfxjTRNs+04ztjzvEuhVUmPGWbDMOygdFEWNOVbAf4lrWoFP3llge/7Ux6N17Jte6CHSGr0mGGWGq5wLgvQvoRvMERgPmjeQWTCYFb01csVIKRo3eC5BnNNz6mJdyp0LHTYeIkoWj3Oowl7PfCNOMkxCILeSwG/K0pmWNaVM94zcCTMqNFjhtnHj4miQEaVJEkriqK+jCWo0ZPxiWpBbfy/ABvdYjE7GWtCqTvEsgXPOLjW9AAAAABJRU5ErkJggg=="
	},
	{
        label:"生成短网址到剪切板\n左：is.gd、右：goo.gl",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVDhPrVPbDYMwDGSALtAFugDfiAD/TMAGbMAKrMAMXYItWKa9c2wrWNCvWjrFj+TsHKH6iw3DkLquOxSjpiv4G7BfIaX01m1VxaDv+w+h/gJM2LhZ/gqo10IA57jaACw/apkAzhQLBeY74Nov6V6OD8ZdV3blNYhIKnANyMRAiVYWleCkAXOat3gXAgQzA8KKBTiubAZqiy1nBKcxUSg7+YEIJ6AhsfAKTMLnIfmMwBoIpQFX18BMNTiNCIzwTUzqw7qseiwbhVRmfvdSC+rj19Em1iA/Ilo4JI9HD5ZvxB+V1jMBElGoRfNy/1A7gf9QOb4rS/a4+QZZi6Zpnj6SGoqcwP++COrRtu3jC8H0RM7z4TSuAAAAAElFTkSuQmCC",
		onclick:function(event){
			var url = addMenu.convertText("%RLINK_OR_URL%");
			xhr = new XMLHttpRequest();
			if (event.button === 0) {	// 调用isgd短网址API
				url = "http://is.gd/api.php?longurl=" + encodeURIComponent(url);
				xhr.open("GET", url, true);
				xhr.onload = function() {
					addMenu.copy(xhr.responseText);
				}
				xhr.send(null);
			}	
			else if (event.button === 2){	// 调用google短网址API
				xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url", true);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.onload = function() {
					var obj = JSON.parse(xhr.responseText);
					addMenu.copy(obj.id);
				}
				xhr.send(JSON.stringify({longUrl: url}));
			}
		}
    },
]);
page({id:"context-sep-navigation", condition:"link",insertBefore:"page-menu-separator", clone:true});

//添加页面右键菜单项
page([
	{
		label:"复制",
		tooltiptext: "左:默认、右:纯文本",
		accesskey:"C",
		condition:"select",
		insertBefore: "context-copy",
		onclick: function(event){
			if (event.button === 0) 
				goDoCommand('cmd_copy');
			else if (event.button === 2) 
				addMenu.copy(addMenu.convertText('%SEL%'));
		},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACUSURBVDhPrZLNCcAgDIVdzIMeO4drdJ2O0WkKHaM1jwjxaamCHwSS9yM91C0nxpjyPAOTtFLTCX6OVuZpHggh7HlO+zqP+vjsoqEs/JXLSE7y5UZZaIQONtPk2YRIcKbKsWk1vnkHbEIkOFPl2LQa37wDNiESnKlyjdDBZnS/YQiz/4H3/sr7hrKQj9E/8dDKKpx7AU1z2m6NGyc/AAAAAElFTkSuQmCC"
	},
	{
		label:"发送到 OneNote",
		condition: "nomailto noimage nomedia noinput",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY6AKcHJy+u/o6PgfRBODYWqh2iEGkIOh2hEGQLkEAe0NUFdXX6empnZLQ0NDEsqvAvHBkkBA0ACgxsMgDSCDQHyyDADibqgrsskyAKQJiP2gLplDlgEgNkwz2QZoaWnxkGOAGkgjlAvmA7ExlEvYAEIAqwHA9P0PJkEshmpHmEgqhmqnBDAwAABoiM/FCYTHngAAAABJRU5ErkJggg==",
		insertBefore: "context-searchselect",
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
	},
	{
		label: "粘贴并确定",
		condition: "input",
		insertBefore: "context-paste",
		oncommand: function() {
			goDoCommand("cmd_paste");
			window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils).sendKeyEvent("keypress", KeyEvent.DOM_VK_RETURN, 0, 0);
    }
}
]);

// 多功能js菜单
new function () {
	var items = [
	{
		label:"繁体转简体",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADlSURBVDhPrZLdDYJAEIRpwwZswGcSgXcqsAM6sAVaoAaboAua0fmOWYJ6iIluMtm9/Znb3bvir1JV1alpmqOPi+C3uS0qPNd1fTcuQYaNT+cJ39Yl3DKuCAJ9zg+Zy2YhMZM0Cm3OL927dBYcERQGgXZbxpLcHKebNIbLnoUABdKDk9Pt0pBOQYQtvJM4SHGHFiDoDBaZlgmyBHJOTuAFwl7jGvZHAmm6iNZ5tnT2CPsEL4nMm/N/14F0F4VfEwhp05FssMjlr+wRdHxVkgLyLQsEWwTpvXP/3ITEE8qyPDj0qxTFAyOH4j/JaiwmAAAAAElFTkSuQmCC",
		oncommand: function(){
			content.document.documentElement.appendChild(content.document.createElement("script")).src = "http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn2.js";
			content.document.documentElement.appendChild(content.document.createElement("style")).textContent = 'body { font-family: "微软雅黑" }';
		}
	},
	{
		label:"自动刷新",
		url: "javascript:(function(p)%7Bopen('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3E%E7%82%B9%E5%87%BB%E5%BC%BA%E5%88%B6%E5%88%B7%E6%96%B0%3C/a%3E%3Cscript%3Efunction%20i(n)%7Breturn%20d.getElementById(n)%7Dfunction%20z()%7Bc+=0.2;if(c%3E=t)%7Bc=0;e.location=u;r++%7Dx()%7Dfunction%20x()%7Bs=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0%7C%7Cc/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22%E5%88%B7%E6%96%B0%E8%AE%A1%E6%95%B0:%20%22+r;i(3).innerHTML=%22%E5%88%B7%E6%96%B0%E5%80%92%E8%AE%A1%E6%97%B6:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)%7Dc=r=0;d=document;e=opener.top;u=prompt(%22%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80%22,e.location.href);t=u?prompt(%22%E5%88%B7%E6%96%B0%E9%97%B4%E9%9A%94/%E7%A7%92%EF%BC%9A%22,300):0;setInterval(%22z()%22,200);if(!t)%7Bwindow.close()%7D%3C/script%3E%3C/body%3E')%7D)('status=0,scrollbars=0,width=240,height=160,left=1,top=1')",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADISURBVDhPzVPBEcMgDPMIHaEjdAMILJJRukFHyAgdiVFSqxHUpr6+8qjudJezEMiGyOmoteZlWZ6llN0SNWhcJimlGz8/yDk/ZuNMrOnraDswmZtyxYkgvllzm9F6xO5FjbppvAulgSgdJRHTc4vM0UxAyiKmuLLkoJtedZO76q4Nyv8AG0vZEBexKTuojhvxLfSCJQZHeQADVu09B6dbI4grozQAs5q2vsa+yijBz4f0dUAvRo9lZpTO/Rg4Ef3NRtRc7HMg8gLZYcKHnBAOtAAAAABJRU5ErkJggg=="
	},
	{
	    label: "GBK <-> UTF-8",
	    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACUSURBVDhPzVLbDYAgELsRHIER3IDAJG7oCI7gKI6AV+0lRPGFH9qERPpS8OR/8N63IYQhxtiREjyDg0aqDBjUPOlKCJAWFiZohyUqOAtvjXkxNUdphRKNCmNm2L1lUzIiY8Jl2FAs0fP1JNJZ2MCSxY/s+wJ8hm7qj0Ch/hINStT/RkNuxPCQvjdIBhgYeD7KH0BkBunBj8nDYt6dAAAAAElFTkSuQmCC",
	    oncommand: function() {
	        var charset = gBrowser.mCurrentBrowser._docShell.charset;
	        BrowserSetForcedCharacterSet(charset == "UTF-8" ? "GBK" : "UTF-8");
	    }
	},
	{},
	{
		label: "宽度匹配",
		url: "javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABiSURBVDhPtYxbCsAwCAQ9ove/TB9BQRxrSNoO+OHusPIJqnrcZ+8U+DmYjbUDKAvgeNCdqQNkUXw6UwfIYoCyAE4OXg9UxH57wB34CC48687UnwYy0YGPoCD2WwORVb9B5ATEqLmh/a1suQAAAABJRU5ErkJggg==",
	},
	{
		label:"编辑当前网页",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAExSURBVDhPnVK9SgNhELwgGMFIKkGsrPMIx8Fxf3AP4CXvkkbbvIPYWKew0E6wt0hzagoLXyNpkpnNfPLl8osDm92dndlvORIQSZKMkFrWHIeWPCukaboA8VBV1YmonaAG+kd6RNkFnyQQ47Is26I3EMfxGTTP1NIj2i640wLGWxiGFxr9Ic/zLmbvTocF9xrZgp4bKD6iKLrUmC9fgZs0ND2NV+DGhuAbr17DfIP6x5+tve5jy5Ip4tfndpod/CWoXxlHmx3cEpzf4Qc9aMawD1GNPFN+ognxouACcr6mb2Y0txT8J2wJilrEkCczq7ezGa7nrKGpeT5PWuAvesqLJKB5ZicCezXcwgYxLIrinFl9bW6AtbhNDX4qNWuRZdlA/sMaFjjnC+Sc2Tc7bNcEwRIQgv380FfaywAAAABJRU5ErkJggg==",
		oncommand: 'content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";'
	},
	{
		label: "破解右键防复制",
		url: "javascript:(function(){var%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20(){return%20true;};with(document.wrappedJSObject||document){onmouseup=null;onmousedown=null;oncontextmenu=null;}var%20arAllElements=document.getElementsByTagName('*');for(var%20i=arAllElements.length-1;i>=0;i--){var%20elmOne=arAllElements[i];with(elmOne.wrappedJSObject||elmOne){onmouseup=null;onmousedown=null;}}var%20head=document.getElementsByTagName('head')[0];if(head){var%20style=document.createElement('style');style.type='text/css';style.innerHTML=%22html,*{-moz-user-select:auto!important;}%22;head.appendChild(style);}void(0);})();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACJSURBVDhPpZNBDoAgDAT5lx4o4QLflqcYfYa2BhqCFStusgmw0z0V45wL6A19fDTNBCoYGS7eqOC6WGsno5T3fi5zXJAztR4L8JzKW2sAWDI2VoBOGXsuqKXKVJAgzlSQIM5UkCDOVJAgzlSQIM56UE+3gi+rTGxd8Ocz7QbXM9KhCV6NcysAxBMX5fcfN++yKAAAAABJRU5ErkJggg==",
    }, 
	{},
	{
		label: "错误控制台",
		oncommand: "toJavaScriptConsole();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADWSURBVDhPYyAG2NvbCzg5OR10dHTUhgoRBj4+PlxWVla8QE1BQM03gPg/kP0SpyGhoaFsQEUTgQreAulPIA048CushgAFJ2BRjAtjGgIUuIVFIT58A6oVAkAmAgVfoSnCh4vBGoGMSUDNu2xsbESxGQIU+wOk1wDpDiDd7uzsXASkbcGaQQDIOQBSCMQXsBjyChiFFlCl2AFQgQRQ0zVshgDpWKgy/ADZECB9EWaIh4cHH1QJYQDULI5uCFSKeDA8DbkKNWQXVJg0ADVkP5DuggqhAQYGANCdt5rwHHceAAAAAElFTkSuQmCC"
	},
	{
		label: "权限管理器",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:permissions')",
		image: "chrome://mozapps/skin/passwordmgr/key.png"
	},
	{
		label: "复制扩展清单",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEYSURBVDhPpZPNbcJAEIU3OcEpEeIIacGS/+SbazFFQC1UAD0kHYQbJSC4uAA48Pc9eTbBYMsoGenTzs7se9odsLuLlziOC9gZhWpV64mIomgI3wgvxko1a3fHnwyCIHhP03QkEIwRzFgPwvKx77N/M9lvUPyCjQfBjvUoLPf1LesC6iY0/HU7kZFuYtIqmg620WZwgtJQ3igWMoCPLMsGrBruq2YwD8MwgpB8ycHzvfAGzWQK+qVWUDjc+tVdnJMHRd2kSawbaLj7m9r2/wYUak/QIRptM9ETZuCfMKkNUWKZyEyhnPrPTNg/DtE3jVK66kGPT5JB1/+gTJIkttZzBhTX/gCc2c/zPO8J5ar5PvtPfTsmJZy7AuvoA2wi9C/vAAAAAElFTkSuQmCC",
		oncommand: function() {
			Application.getExtensions(function(extensions) {
				var actives = [],
					unActives = [];
				extensions.all.forEach(function(item) {
					var arr = item._item.isActive ? actives : unActives;
					arr.push(item._item.name);
				});

				var str = '目前启用的：\n';
				str += actives.map(function(name, i) {
					return i + 1 + ": " + name;
				}).join('\n');
				str += '\n\n目前禁用的：\n';
				str += unActives.map(function(name, i) {
					return i + 1 + ": " + name;
				}).join('\n');

				addMenu.copy(str);
			});
		}
	},
];
	var menu = PageMenu({
		label: "多功能菜单",
		condition: 'normal',
		insertBefore: 'context-openlinkincurrent',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABiSURBVDhPY6AKcHJyOhIQEPAfGTs6Oh6GShOUZ0CXhGGoNEH54WAAtkACiUGlCcoPAkAongnJExWIDg4O1lAug4uLiw2yPFEGQJlwgCKGrAkZQ6WpYwCyF0BsZPmBTAcMDACMLvUa5tdA9QAAAABJRU5ErkJggg=="
	});
	menu(items);
};

//图片
new function () {
	var items = [
	{
		label: '谷歌以图搜图',
		url : 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
		image:" "
	},
	{
		label: "打开图像RAR",
		condition: "image",
		oncommand: function() {
			var imageUrl = (gContextMenu.mediaURL || gContextMenu.imageURL);
			imageUrl = imageUrl.replace(/\.jpg\.thumb\.jpg$/, '.jpg');

			var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("TmpD", Ci.nsILocalFile);
			file.append(new Date().getTime() + ".rar");

			Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist)
				.saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService)
					.newURI(imageUrl, null, null), null, null, null, null, file, null);
			setTimeout(function() {
				file.launch();
			}, 200);
		}
	},
	{
		label:"复制图片 Base64",
		text:"%IMAGE_BASE64%",
		image:" "
	}];
	
	var menu = PageMenu({
		condition:'image', 
		insertBefore:'context-savelink', 
		icon:'image', 
		onpopupshowing: syncHidden,
	});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

//快捷回复
new function(){
	var items = [
		{label:"谢谢你的解答", input_text: "非常感谢您的解答！！！",accesskey: "T",image:" "},
		{label:"亲，要的就是", input_text: "亲，要的就是这个，非常感谢！！！",accesskey: "D",image:" "},
		{label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",accesskey: "Y",image:" "},
		{label:"反馈情况再说", input_text: "Mark，看反馈情况再说。。。",accesskey: "M",image:" "},
		{label:"收藏备用~~~", input_text: "看起来很不错哦，收藏之~~~\n谢谢LZ啦！！！",accesskey: "G",image:" "},
		{label:"谢谢楼主分享", input_text: "谢谢楼主的分享!这个绝对要顶！！！",accesskey: "F",image:" "},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "R",image:" "},
		{label:"坐等楼下解答", input_text: "坐等楼下高手解答~~~⊙_⊙",accesskey: "V",image:" "},
		{},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！",accesskey: "A",image:" "},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "S",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",accesskey: "C",image:" "},
		{label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子~~~",accesskey: "B",image:" "},
		{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "X",image:" "},
	];
	var menu = PageMenu({
		label:"快速回复...",
		condition:"input",
		accesskey: "W",
		insertBefore:"context-openlinkintab",
		// position: 1,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACGSURBVDhPYxh0gAWIw4B4rbe399+AgID/IAxig8SgciA1WIGWv7//b5gmXBikBqQWogUBlJBtJIShLlKCaIWAtdgU4sMgPRCtQODn5/cPKigAwkiKcPJBeoBsCKDYACCgzAtAQHEgggBF0QgDWBMSMoaqIRlEwAyE8skCYkCMEnCDATAwAACbYMG591LPcQAAAABJRU5ErkJggg==",
		oncommand: function(event){
			var input_text = event.target.getAttribute('input_text');
			if(input_text) {
				addMenu.copy(input_text);
				setTimeout(function() {
					goDoCommand("cmd_paste");
				}, 100);
			}
		}
	});
	menu(items);
};

//搜索所选文本
new function () {
	var items = [
		{label:"搜索所选文本",url:"http://www.baidu.com/s?wd=%s",image:"http://www.baidu.com/favicon.ico"},
		{label:"翻译所选文本",url:"http://translate.google.de/#auto/zh-CN/%s",image:"http://translate.google.de/favicon.ico"},
		{label:"百度云搜索",url:"https://www.google.de/search?q=site:pan.baidu.com%20%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIklEQVQ4jZ3MS0hUURwG8NOmVjGLFtGm9i1aGESRUItWs1CoICiKIMhtybSwKOhND1KooCGhF9j15kRBFDHgjIJiUmSOIyaak/mayTNzz/ucEL4Wl5ujbszFb/P9v+9PfN+PSSk9a61zzmE1rLVOSuml0+kYEUJ41lqshRDCI8YYt9YHxhhHjLFYjiuL9vwfXOxewNWeBWQn3IpOhBhjUE1rg2tdBodeWZz56HD6ncPhDos3w0t7EaJ1OIrkpxVqH5VxJ8uhtQaTGqc6GOqeVaC1xvI+CcOQmp5Bv9+JeKIbqS/lf/n5tyXUNBfRN2kQiMW+1hpEKQ2lNFKDAkeelzBUfxKVfQcw0dCI/GgR2e8MBz2OeJtEvE3i2GuJgSmJaEeUUsj94tj5YA5HX5Yw1dmL33dbUKjZi6b6G9h+bwa1ySK8rwypbwz7H5cQf1oEFxJKKRApFe53lbDlyjj6xyuQUkJKib66E9h9NoNt138gPbyYt2TD7sBPBikViBASD7OzWJ/Io+NzEUJIzFc49iQy2HAujye9YRbJTVbQ4E2iSDmEkOGDwhzDpgt5bGwawvEXE9hxewSkMYfL76cghFiiUBJo/cRBAxE+4FyAc4GeMYpdrQWsuzmGzc3juJWZBecc0T3yYXAeWy+NYHQ6AOcChDHuqgtBwMHYymG16M4Yd4RS6jEWjv4XpeV2kkwmY5RSLwiYW+0wCJijlHq+78f+AjFijgdXSBqcAAAAAElFTkSuQmCC"},
		{},
		{label:"BookLink",keyword: 'bl', text:'%SEL%', where:'tab', image:"http://booklink.me/favicon.ico"},
		{label:"炫电影",url:"http://www.xuandy.com/index.php?s=%s&submit=%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2",image:"http://www.xuandy.com/favicon.ico"},
		{label:"YouTube",url:"https://www.youtube.com/results?search_query=%s",image:"https://s.ytimg.com/yts/img/favicon_32-vflWoMFGx.png"},
		{label:"搜库搜索",url:"http://www.soku.com/search_video/q_%s",image:"http://www.soku.com/favicon.ico"},
		{},
		{label:"搜索相关图片",url:"https://www.google.com/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&q=%s", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH9SURBVDhPzVE7i5pREP1+gYWFIMKCIPgHfKyFoCkEwdbKQny/xbeCoCK4i6KfqCyCCGIlbGN+wgrCohAUY20TXEgXWEg7uWfwC0tIlSoDhzv3zpkzjyv9v2axWD4ZjUbv3d2dV6/X8wkYDAavzWbzqlQq9Y36d3t4eHgtlUqUTCYpk8kQ/EQiwVgsFiSE7pnocrme3G63bDKZZKEsW61W2Ww2yyLxLZfL0Wg0+sFEYcFg8HO326VarUYibwWeVC6XCUin01QoFPgURCoWi7TZbOh8Pv8Mh8PPgUDgWVQ+Hg4Hmk6n3Al4UiqVIuBWRPJ4PKtYLEar1Youlws9Pj6yWD6fp1arxaKn04mazSbF43GSIpEIAbd8yW63y9Vqle+z2ewNsWg0ytWQ0O/3OSbuX/AuifYIQEuohBHq9TqTRMVvSBLtswg4jUaDY8J/RadQYvVQKMQkPGazWXI6nZH5fP5dScQ7Cg2HQ/L5fHW/3/+VBZQRlKUo/nK5pOv1SpPJhLeOsTqdDm23W9rv91SpVLjg7xHw30oXEMK/r9dr2u1272gZNh6PX47HIw0GA+6IdwcHQKIygiKCzfd6vXeHwyGLf5dF7AU/ofBYoN1uE4C2P3aBIBYIIcSwF8ThA+DwN2q1WrtOp7tXq9UMjUbD+OgrAO/P+226fzVJ+gV+cHLx+IUV6AAAAABJRU5ErkJggg=="},
		{label:"搜索所选文本",url:"http://www.bing.com/search?q=%s",image:"http://www.bing.com/s/a/bing_p.ico"},
		{},
		{label:"汉典查寻",url:"http://www.zdic.net/search?lb=1&q=%s", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADwSURBVDhPrVPBDYMwEMsAXaALdAHeiAB/JmADNmAFVugMXaJbsEx7DnZCQ0Go6klWcne2eyGp+3uUZXmt67oAWHLK0WNpP4w4N03zIkbv/UO59Z6kbcMIPQgiUzBnhsHE1p6yFDnxCOBSlkIGXCfsMf6qfl9zKEuxaoYRsTdMzLEfThmcwaEB13gE3YLVfzsCgf3+EdZ3LYLI33IAGsrDr4cPRdJI4F1IiIlUEzc9Kks6EjBmNGvb9sanHUe3FUca0KM8vn9dV4RIMhCQf/wvrFDkBEPHtquq6pJ/JzP3bC8BgokwxcDSJmBKzrRUnHsDZiEGMEdIh0MAAAAASUVORK5CYII="},
		//{label:"Wiki-DE该词条",url:"https://de.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"Wiki-EN该词条",url:"https://en.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"Wiki-CN该词条",url:"https://zh.wikipedia.org/zh-cn/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"}
		];
	var menu = PageMenu({
		condition:"select",
		position: 10,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFRSURBVDhPrZI9S8NQFIbzoaiTH4tIJ6Gugrq4iZOKooOz2B/g4hhTE5QsDoL4C3R1dRLEBBx0dZEanAJuVlIVP2o1PicpGCEpWHzg4c09pOfe0xvlX7Ftu8MwjFFyzTTNsmVZq47jDEVRpDZfackgHqmqWic/sKZp2hfrKs8b2IW59OIZvuEejuGwruvT5Ck20MFs2KlMfJIrSeUXsvMhJ3klJ+NKmiAIeogrXrgk82Yt0vyR3E2WKWgwQDzjTlzI5xpPkscUYRj2S6DMngcH0G7J42SZwvd9mfECK6hLLYNxfMHteJVBif9Ark7G6I4rPxTwHOWURSlkIT86wAaNZM4SznLsdfIGI3zCBcxFRtnEO3ynUb15dXJDW2QNH/g2FsmW9OEUym4T2InCEsoYcpJ5KfwV+UaWURrc4wy2xRxWGWs/WbaB53kjrusyqqJ8A05wUqnA1dFgAAAAAElFTkSuQmCC"
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