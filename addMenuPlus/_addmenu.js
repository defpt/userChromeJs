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
	}
]);
// 添加横排按钮
var openMenu = PageMenu({ _type: 'group', id: "context-openIn", label: '打开...', condition:"noselect noimage noinput nomailto nocanvas nomedia", insertBefore: 'context-openlinkincurrent'});
openMenu([
    { _type: 'spacer', width: 30 },
    {
		label:"复制文本|链接",
		tooltiptext: "左键:BBCode|中键:MD代码|右键:普通",
		onclick: function(event){
			var formats = [
				"[url=%RLINK_OR_URL%]%RLT_OR_UT%[/url]",
                "[%RLT_OR_UT%](%RLINK_OR_URL%)",
                "%RLT_OR_UT%\n%RLINK_OR_URL%",
            ];
            var str = addMenu.convertText(formats[event.button]);
            addMenu.copy(str);
            if (event.button === 1) {  // 中键点击后自动关闭菜单
                document.getElementById("contentAreaContextMenu").hidePopup();
            }
		},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg=="
	},
    {
		label:"在隐私窗口打开",
		oncommand: "openLinkIn(addMenu.convertText('%RLINK_OR_URL%'), 'window',{private:true});",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKDSURBVDhPpY/PT5IBGMffWl76ceiS62/wlrc6uLmZM81MZ3noQik4NAWRVwXlVSbKDyEFcgoCyoshIvgCBpgS/siUhbnWDJrKVnaouS5tuTaX3wSxVrfGZ3sO3+/zPN89D5Ex7+dYWDLmIC1TsNnDWfcE1nNpeaS9Z5NeWv5NG4/aPgmorNSfr3s4LpHLmB2VwrdHSdzzkg7XnFw2tddNORL1XCtVWjpyIbVI4FRVlekOIWoxf9OrbTutLVN+Ra/747RrEevRGOKxBCJrb7EQjiL8PAqvZxljRgbdEttuC98alIrpN8Imy1dCKuRtzljb4PFE4A+sYdL5Cl7fOywuJ7C1vYf1jV3Q9ig02gUo+2ZgMc2ANnvAOLzoEo1uEWTTSCjgCYHqdO1z6wyb1dVKe3XNwCdZz1OsvExgdi6G+kYbbpdLP5RXiO13q+TxRsHYvscRAMk3LxKcmpHBee8c+Pwh6/FvBEFR1GkuVxN1Tm2AtkXAYqlepFspamuVTveoDZwHRjnRyeM8spscUPe5v3d1jTvb2x1ikcjWIBQ+DtH0KsasyyBJc0AgsDaQJH3UM3mUPU9+aLqNP0tKNFeIyMR1yNuaj35aQv/AM6jVfgz0B6HRzIJhXqdKqz32FQpfynfRDBo4en/qnN1wGZrvV3iFvNGVCQsDxrWEadcaBnU+hIIRzPtXYTYEwbgjmJ4MY9xgB9nYHyss1Fz+HWAWZyM3l53FZg2ppGLDZ73Scqjo0B1IWofjEnI4rujQHuh6DYedpPZLDUurLi7uvZhaTnISkJZEQYHqUlmJquhmkfJaXh51Jlm3bsivJr38fFl2euwP/wb8NxkH+HU5mQVkBkH8AgvRfy93EDdrAAAAAElFTkSuQmCC"
	},
    {
        label: "在 IE 中打开",
        text: "%RLINK_OR_URL%",
        exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
    },
    {
        label: "在 TWC 中打开",
		text: "%RLINK_OR_URL%",
        exec: "D:\\Program Files\\TheWorld\\TheWorld.exe",
    },
	{
		label:"在谷歌缓存打开",
		url:"http://webcache.googleusercontent.com/search?q=cache:%RLINK_OR_URL%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH7SURBVDhPhVI9a9tQFBUeO4YOwZTSH+Ch1I2esIdi10jvPYsMmTLkH5Sm9lI8FIsOHUsU+gOMKSGEBNwiB5K9xJbdQJYQYtWIYEonL82HBhNe7316LnbT2AcOsu5759xzr6zdB+FoibPlTPL6OJMUQkuo8nwEtvGsx/TtgOuXASci6hripkMuoy7ZufaXnqtr/0eP69UeI7coDBjpH7JseLKXDW+6RhgbGbdg9F5dj3FeNAryyck7KeR6GHCDYs2y6JZpss/4O+rq5oRRFWsS0PEXRD4G4QjFOLc6mjJAXPlLi2iCSa78zFNZhK6tuDMRMELwo0hWcYF49q8BIvINiimAcR2EW2MDxcO+nX5sWdYT06TnlsXOKKWP5GWFeBQylC89Tj6gEEa5gD2syCIAujdALJCQ4hRYi8lp1CENTPH7e/ohGqyhyU87/UBpJUC4O2mA4yAhDc81aSPfhPqBuaCu3wXGHu+Ac76oyhJ5j4U5j8UjIF59+pYsua2N8uaR/Hyz8HKf2dg936R1VdK0dbeTeuO2R6WN1uD1ZntqYZMofCkkofsAOHrhFVOqHKPktt8CBZqsu77tOOLv/99xnETOo1yKoTvsoKKOpgFjVGQSZQT0QPAVBBcyNnS+VzwGjgNGdTAaopHsCAsD1u7Enofyx6OFmZ9K07Q/7iAmIuxhVMIAAAAASUVORK5CYII="
	},
]);
page({condition:"noselect noimage noinput", insertAfter:"context-openIn"});

//添加页面右键菜单项
page([
	{
		label:"发送到 OneNote",
		condition: "nolink nomailto noimage nomedia noinput",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVDhPrVNJL0NRFO7/EMTC/AvE1i+wsENjHn+A2JAYFhJaMeyI2IlFB68W5hZ92pKUV1NiClFp8Z56nuG1+dx71FyCOMmXfPe9c7977jnfNfxLOLIGwGFP64U1qQf2VDNsX4D+JZspP76dCWQPsI8mTOcPw1sjYKXMBk+5HZ6KBKi0w1fvgJDe9ypgSzFjrmAU+yN+BKf2cL0vQz2UcbUZJkR2znFzpBAPu0+w1bUMfmh8OxNgZUltToRcR+BxuRaEFrwmziP2EMXVVpi4rj1go2UeQmb/myvkDCLQuYh7+ZaSXIVjmMobQkyP0poLikYL8bsLDVLrwoceMAGpw4l75UnA3zQDT9UElcpD9p/BWycQ/1Ig0OF6qcDXMAn1QIa7xEKlq+z+vxLgk9BOI1BY00SjFZHdc6w2TtK/n1VQ44ASb9p2t5vGt948S+sfCYjFFshSiHgsGiN/LBWN0zqhgMBmKrU7Eb3TKUkJhGjjc9yeqWwSp8R1TU8wxtxBbJtEZpJjKOxk9ZCZhl2Bcw5uLG4kzsPLx5+NJGT0w1crQCy1QmSd/xYsx1s98d7KvBz+FujBMFt/i0SP6e9hMDwCEXZqhPWpJdgAAAAASUVORK5CYII=",
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
]);

// 页面右键菜单
new function () {
	var items = [
	{
		label:"繁体转简体",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADlSURBVDhPrVPJDYQwDEwRroMKkPJLFUj8+NNBPjxSwn4ogBrogAq2hW3Cm8NOAgkR0m6kUWTkGQ9jEH85r/cHm1gnBADs9HF6TvSrwIFDDwi9wcUR7T2MtrYCARPO9wJEdo3jhMpPNf5OAoBqrQpk5AiathvsXO1cxWEVB4uWliRx2PP6LMrTqwKMnBiDq7gg+k2IJODhSVvIoilA64LeBmhF3HR2k8JsbYFsdnorXDwTIJvcnK9QrfQKTxy4pOfi42GBtCWilxnkq0rpy3A3BfwGUkMEi3g0M2iB80k/FNF/OUJ8Aad+5VEArUCmAAAAAElFTkSuQmCC",
		oncommand: function(){
			content.document.documentElement.appendChild(content.document.createElement("script")).src = "http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn2.js";
			content.document.documentElement.appendChild(content.document.createElement("style")).textContent = 'body { font-family: "微软雅黑" }';
		}
	}, 
	{
		label:"自动刷新",
		url: "javascript:(function(p)%7Bopen('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3E%E7%82%B9%E5%87%BB%E5%BC%BA%E5%88%B6%E5%88%B7%E6%96%B0%3C/a%3E%3Cscript%3Efunction%20i(n)%7Breturn%20d.getElementById(n)%7Dfunction%20z()%7Bc+=0.2;if(c%3E=t)%7Bc=0;e.location=u;r++%7Dx()%7Dfunction%20x()%7Bs=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0%7C%7Cc/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22%E5%88%B7%E6%96%B0%E8%AE%A1%E6%95%B0:%20%22+r;i(3).innerHTML=%22%E5%88%B7%E6%96%B0%E5%80%92%E8%AE%A1%E6%97%B6:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)%7Dc=r=0;d=document;e=opener.top;u=prompt(%22%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80%22,e.location.href);t=u?prompt(%22%E5%88%B7%E6%96%B0%E9%97%B4%E9%9A%94/%E7%A7%92%EF%BC%9A%22,300):0;setInterval(%22z()%22,200);if(!t)%7Bwindow.close()%7D%3C/script%3E%3C/body%3E')%7D)('status=0,scrollbars=0,width=240,height=160,left=1,top=1')",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK2SURBVDhPY0AGq/6HMs9/YFo794Hp8oUPrTIWP3Aymn/fXqC+noEJqoQwmHpT2nvybZlPU24p/pl0Tft130Xzox1n7YKg0vjBkmde8vMemkycekvu28Qb0v87Lyn8rzuu9q/ysG4DUJoRogoHWPLE3mD2PZ3DU27J/Zl8S+p/3zXZ/63nlP5XHtL4VLRP0xmqDDuY/9JUYvY97b2Tb0n/m3Jb6v+E69L/Oi/J/qg/qfKvdJ/WueKdemJQpWDwH+iaVaGhzFAuA8Os+zoZQH//mnRTCmTAvUk3ZTrazymmVB1Re160R2ti6CoGhGIgOCYjw3lYWVkbzJn535h1+h2lVZNuSnyfckNq6dS70nqr/jMw11/RYivZp92Wv0vPHawQCZy1sFA5qKraeMbYmJVh5lNJLmDIb5h8W7Jy4i0hPqgaMKifry+wONcMRey8u7vCUX39tfvl5HZukpTkYph5xph10i3J5CkvRXmgauDgsIGB/hETk/pjFhac++3tWU47OFgf1tU9sFdO7u9eaelVYBeAwJyH6lKrViEFChRsU1FJ2qqg8GafqWneAVPTtu1KSk+2SEn93ywp+WublFQmVBl2AAxppjVyctNXiIn9XyMl9XO1pOTfVUD2SjGxf2tERfevFRGRhCrFDlYpKfEvlpA4Ol9Y+D8ILwDihcLCfxeKiJxaKiJiDFWGG8yWl9ecLir6dKqg4P9pQDwdRAsJbZ8jLKwOlMafKoGAcaKoqHKvgMD+bn7+V718fD97+Pn/dfPwbAeyhaBqIGDlypWiixcvNl24cKH7okWLgoF0FJBOXrJwYeq87u7y2cXFk6bHx2+e7ONzo9/a+vn0zMxqkFqQHpBeBqBixSVLlgQB6WygYBWQ3QKkO4D0JKDYVBAGsRcvWNC5aN689oXz51eD1EL0LFIEAGnEJwptdKj6AAAAAElFTkSuQmCC"
	},
	{
	    label: "GBK <-> UTF-8",
	    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC3SURBVDhPY6AKmGs//z85GKp9WBlwtP/Yf2RwY/PN/xeXX4Ly/v+/f/D+/9XRa7EbsDV/O1gRSNNCj8X/T886A+aDAEhuV+UeMBtkCFYD0DFMw/OLz+FiMACyAMSHakcYALL1/aMPUGW4wYbUTZgG7G8+CJYE2QhSAPMSspPRMVQ7xABYAILoZYErwAbBACjgQGIgw0AAqxdAgjAFIAAyABQOyAaB2CCXYXUBORiqfTAYQD5gYAAArhcq19H6/18AAAAASUVORK5CYII=",
	    oncommand: function() {
	        var charset = gBrowser.mCurrentBrowser._docShell.charset;
	        BrowserSetForcedCharacterSet(charset == "UTF-8" ? "GBK" : "UTF-8");
	    }
	},
	{},
	{
		label: "宽度匹配",
		url: "javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGXSURBVDhPYxh4MHHiRPv///8zQrlEA5Ce/v5+B4aWlpZX9fX1TFBxogFIT3Nz8yu4AatWrWI+fPiwIFAOp2tAtoLUgNSiGLB//36WdevWuU2YMKEZKMECVY8BQHIgNRs2bHABscEGtLa2vt66dasrkHOdm5v77Zw5c3iBhhpkZ2ebAA0W2bZtmyiI3d7ert/Z2ckLUgNUew1kCFDda4a2trbP4uLi30RERP5zcXG9rays1BESEvouLCz8u66uLrampiYOyP8NEisrK9MGqQGpFRMT+wbSCzLgG5Dzi4+P7z8nJ+fb9PR0fUFBwV8CAgL/srKykjIyMlJAbCD+mZycrMfBwfGWl5cXZMAvoOu/gb2wePHilLS0tBcgA2bOnCkC9F8YUGPsmjVrVEE4NTU1FuiaUJAcyACgQc8XLVqUDPYCKCCAfuVYsGBBOtC50/AFItASVqA3pgPVpoH0gAMRRAA1MQEDi/3IkSPK+BIVSA6kBqQWpAfFAKgaogHcAGDUhJOblDs6OiIYQKkKKkYyoEQvFDAwAACRUudRsBI1mwAAAABJRU5ErkJggg==",
	}, 
	{
		label: "破解右键防复制",
		url: "javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEZSURBVDhPjZExisJQEIYfrIW4HsBOq8VLLCoiKjYeQNAykHZBRQW9gPZewkJBiwVLL7B3sBRLC2c2M5mJL9FH/OEneZP//5L3Ykjj6Rxd5kCaXhVtS8wtDSb1NsQG2KWkJf4sDaQByFKJSx/aANjvEQYDnpFodqjVcdPuPEOSgNloglAoYJBEWK14vu71eX37yODS8+OQJIDvj8cQkM0i7HZ4/czzettoRhmpOwCBfr8r0VsZ1u3yXDNSdwNIUCyG5VwO8XLhmWak7gbovu8ECEyfT9KM1B8A23g+Pw7S98MrncfpFGWk/hoA1SqX/r7KvNbzgFIJFz9Dnkk9LnrAv9HzOKz7JhEUWq10gFqDrrVU4rIDaTbGmH8Vxu1dx2qGHAAAAABJRU5ErkJggg==",
    }, 
	{},
	{
		label:"编辑当前网页",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK1SURBVDhPY6AGYHn14fOqt2+/3MaHQWoYGCS5GLi5xRgY+BUYGHhEgXpZQQbwPH/z8Ty3pPIzRi6xx4w8oo9QMFCMTUju1cNnby4ANets3L53xa0HT3/NWLB6DgOPpAjIAKEnL9+dAip+6M8edguGmXhET/lHJYNpkEH7j5y6uGL1pi33n775f+LS7f9N05Z+YWDgUwYZIPz01bsTDFySd5i4xA5hYvHDIMNX7zrxY9aK7f93HTv/v2fu2v8dU2bvhhvw8NX7Y4xc4jcZeST2RgfIXYRhIH8/v1PM9aaeSV+Xbzn43zeu6H/HnDX/y5t6LzLxiKUC9cqADXj0/P0RBk7Rq4w84jsQWGIX0AUHW3snvoQ5G6RZN7f9NQOHRDUDt7gDMDAFwAY8fvHhEAOHyGVGLolNCUHKJ2ND5E/5ecpemDlr2nuYZpCzkyra7jDwSNUyMIu5MHBxSQD1soANePry436gqReA3ljLyC2+npFHbHvnxCnPkDU390//wsgp0YauGQSEH738sJeJX/IM0Nkrov0Uj02fNfN99+w1/5ds3AvWnJJT/S01p+QuA5tEELpmEBB+9OrdbiZu0ZMMfCKLgS5Y1zhh0S/v+ML/aX1L/2eUVL0HpYVpC5aeZWCQ0ASqR9EMAsKPX73bycgtcTwjp2QPv6z2Vp+E4v8xrbP/miRXfgJ65ywwgK+dOHPlAAMw5KB6UIDwk+fvtwMD8AQDn8R8bhGljVwSqkeBMXEOJAaKEZD3Hjx5vQOkFqIFFQg/ffF+q4SK/kURGY29glJqB3hEVU7xiiueAybvk3zSKodFFHSugNSA1EK0oAKhq3ceTnn17vOJd+8+nwQl68s37p69dP3uuXuPX5x5+e7dKZAcSA1ILUQLKuABJggloPe0GXiENbBiBh4tsBqwWmTAwAAAYo9bM5woFn0AAAAASUVORK5CYII=",
		oncommand: 'content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";'
	}, 
	{
		label:"为此页搜索油侯脚本",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADSSURBVDhPnZK9DcIwEIXTsQBL0CAU15RQUtKwRAbIAlmCPuzADExAmwUyQHjPvrNs6zA/T/p0jvPe6Sy7MXQEE1ikXsBPWtzNRfD9DNvfqysadGH7s3RkMkh4kH2LLciUjW5Bj4prn0pkhlLoUXHtU1APHsAMpdAD9JixwSQ/r250cxlKgYesGYJ2UkODdmx9rQGvkkkn8JShEvGtQNQecPPMaoVSxLsBpv46xgGkP6pIE95ClNxsXfQVU0SJpS763jU4gTvgY9JHUjILGpY30DQvwsxGGOnZ9v8AAAAASUVORK5CYII=",
		oncommand: function () {
			var domain = content.location.hostname;
			gBrowser.selectedTab = gBrowser.addTab('https://www.google.de/search?q=site:greasyfork.org%20' + domain);
		}
	}];
	var menu = PageMenu({
		label: "多功能菜单",
		condition: 'normal',
		insertBefore: 'context-openlinkincurrent',
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG1SURBVDhPrVO5TsNAFLQ4Cqg5whXOcN804Szge6AHESVQEsEXQBu+AkQJUpoUIIUqSZkK7xpsx46HfS9rkkAKJFjpFR7PzL59h/EvR0xOQE5NQs5M1yI2hRATE+MQfb21GBmGXFpkDv3XcsP4Ivb21IKIc7OMyfk52GcpVG4z8J4e4ReLsHa2IaIjdQMmLszDPj+Dm8nAz2ZReXiAGIjA2tpEgPoJggDW7g5MdYmWGwZ9EEjEkOy/vLCB3Iyj+vaGwLYROA6qlgX5PQM22NttNigUYEb6YW1vNWeggrhNGYjxMcjVFTjpNJyrSxVXsE+O+Ra5vKTwC8Y4FIe4pNFyXcSxUZgd7TraYHZ31bpBeKfGONoZI42W6wzUTXYiATuZhJNK4uPoEGI0ym2zE6eMURCHuE0ZtKxBqfT7Gnw3oFZ5uVy9C6bJHQhcF9X3959d4Detr6Fydwf/9RWBEPCfn1tn4HlsYDYafE3i0CAXzorHYR3s8zvl4gLcm2t49/fw83lUy2WeGZpWLW/YhekYzzgVj8e5ccTVc5i3sd56F5hM4tCsYaF4wZQ5c1RWIa7lfzmG8Ql21RinaTw+ywAAAABJRU5ErkJggg=="
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
		label: '解析图像 QR 码',
		oncommand: 'CusFuncLibs.qrReaderOnline();'
	},
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
		{label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "B",image:" "},
		{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "X",image:" "}
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
		{label:"搜索所选文本",url:"http://www.baidu.com/baidu?wd=%s",image:"http://www.baidu.com/favicon.ico"},
		{label:"翻译所选文本",url:"http://translate.google.de/#auto/zh-CN/%s",image:"http://translate.google.de/favicon.ico"},
		{label:"百度云搜索",url:"https://www.google.de/search?q=site:pan.baidu.com%20%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJuSURBVDhPrVNZaxNRGL0/U7JM0yQqCIIEV7CCti+CIm70Uakg+OCDiELNvlobmlQS27Sl2jbJzKRJZslMJmOa5Pjd65T2XQcud5nvnO989zuX/ZdPSqsI5boIJGUEEm2EC334vjRp1jCX6UBKKTQfi7U/3oIv3kSkqMODnxEEKZAH+CkglPX2RCpxcK5HexXz+b6YI6VzBJyZZ/atHkFKdzBPwfP5HoEVXM4quFlScGu9j3DyL3kgJQtyD04E2WOESVK4qAlgkMgkOrv9tYOS6uDAAdItGw+qOoEVQcDL8+CMnUrndQdIwYWEjBBlqxsT/NSGeN0wsLzr4MX3Lu6ukcIsDUrkwRnjkvnFSXQPd8oaPhw6KLQH2NFdLGxoeHfoYqNjo9z9jeUtU1x2lNR6cMb8pMCX6eJiRsGnXwYmADqWi2t5GfGmhVrPwf2KTvegYWnTQGxdh5Q/RxCjH0XKaM+AwciF5bh4uW3h7a6JPXOMqwUVn4+GopwDe4LWcIIndeOMoNpzMZ1OMJ1NacywZ4yxVNGgnQD3qiZW2yOkDk083NTw+IeFR3ULC6TIgzP2cV+HNhxhfHKCGREkZRevGiZ2beB6UcE2lfBs20ZKHqGs2Hi/PxAle3DGomkZKzsG8sdjJCjT05qO51sWlms9oWCloWOx0sebfQexooob33oIkaE8OGO+OPWdentlTUc03UYkR86jNl4qkusSZNuMCinREu3zkwtDBV3Y2oMzxk3BrcstK9GPObHukOdbYh0kq/PWccMJy9OavwcPTgrIQPxxcC/w+TSYvxFhaSLiVudZQ3TO3wN3rQf/l4+xP5yBeeudxxlpAAAAAElFTkSuQmCC"},
		{},
		{label:"BookLink",keyword: 'bl', text:'%SEL%', where:'tab', image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFh0lEQVRYhb1XW0wTaRQ+aRqChhREJIYYH0zfmhBD9oEQHjaGF7Ntp8UuLJXWhkUWpEJFW7AbVxYRASWliIvQoiCl03JxZV3BWzItUC5VwAKF1G5FV9G4xiXGGGJMc/ahLXIZLlrXk5xM8mf++b7zncv/D8DGjAEAIXFxcWylUikjW1pOA0CYf/2rWKh7cICavlA7P5SdhfdVxzAjI0MBAMyvRWDzzNXOWYuAhxYBDymCi3bS6Nm0adNO+EoqhLo62mYCBCwCHg7lZuPRI0dOAUDIWhsjIyNZcrmcDwChwZANmepod1MEFxer8MBw5WV+fr5cLBYncTicneBLSQCEIZFI9kx23xhzlJZ4G2tr6yGIumG6/uhyLiZgEfDQKhLiYNaPOFKoxOn6unf2jnabUqnM5HA47Osmk26i4sx7KpAyRR7qamp0n0OCeUKtlk3V171ZTmC5UwQXh+Q56G66PN8nTkXLMsWcxta56OjohE8hEHrNbNaOqou864Gv58OHc7FAoWgGgF0bJcDsNBo1w/IcpIIAXlDAYHAzmcw9QFO0DAAIi4iIiNi2bVsYAGwGgBC1Wp0+duJnb9DABBcnNFXvExISVAAQRRc9c5yi7rhbDa897eaXj652PnV1tHsmf7vwNljZAwQG2sxPAOAbWunZbPYOl77h7ZJN/o3BggfcUVLsTUpKktISOHTokMiuOPzFwCiCizaZZOm6kI/66uouAGCtIKDVaAocp371rlZotgMSfNhwEWdMRpwxGbEvLWVNAtbvk/Fp17UVpOxXmp+u1gGhBEFIrSQ5cU95dIX0Y+oinL3ZgxYBDz3NTWjPy0VKwMPR4yocyspESsDD3pR96Cj+BfvSUnDop4Po1tWjRchHe5584TvTuob5LVu2JNKmAXwjdLtMJiuwk+RM76Io7xco0N2owyed7fhqcAAtQj669Q04WXEGn/15HS3JBM72dOOYuhAfm004WqTC8dIS/PvaVRxTFy18x6mp8iYmJkphjROUAQBMqVSabs//yNx5rtIXnTgVH9bX4Zi6EGdv3USK4OKjVgPeP1aArroLaBHy8VGrAZ3nKvFfhwNHVMeWKNmbKkLnpca5Oq22IioqKmY1JWDv3r3xD4pPLvT/YzOJo4VKfHDyBD6/fQt7U/bhP7Z+fFhfhxNlp9GeJ8dn3TdwxmTE4Zws9LQ0o026H5/fvY3jJcW4/ADrl6bjlJl8UVZaqqItypiYmChXc9PrwKb+9DQcPV6Ik+VlaN0n8K1JxGg7kI4UwUWK4OJgZgb2pooW3rcIeGgVJaNNJqFtZ4rgoqO0BIVCYTZtKixtbT1fcg7Q+XSjbn7r1q0C2jTIZDLBSJEq6DEciHaF87/Dm3qdCwBiaQmw2ewdf5HGN1+CQL9EjLfNZqdOq7lz5XwN1arV9rXX1g5nHTx4HgC206agy0Se75OIg5dayEe7iXwRGRkpAoAYAIj2g+7wP1e2ZFpaWqKzumo+6BoQ8tFhaJnbvXu3wg+2uO0YsEobbh7v6R60CPm0edxozvul+/GeiZyNjY3NA4CN35wzMzO/ndRUfVgCJuTjhKbqvZUkPeNnKz5YRcI1yVAEF++aza7w8HARTeTrWsi58vKKEXWhlyK4OHw4F6lWg9t/mYiLj49P1lZUkH2XL3mmmi69naqt+dC3/4cVBJqqq63gy/Nn3YBDz5aVnZ1qb5srUCiamUxmEny8yTDAd2PayWKx4jkcjshpaHm1fNoZa7Q28BXdZxkDAELCw8N3+YFDaCIJkGFUlperBzIzlhD4/eLFexCEAp9kLBYr0tnRNkMRXLT4i/WGrsEBn1J8QRqjSKXKnqws9zob9e+69Xqnf8isfuL9DxYmEAhkERERfPCN1+2wzj9jwP4Dbl10ubCceuUAAAAASUVORK5CYII="},
		{label:"炫电影",url:"http://www.xuandy.com/index.php?s=%s&submit=%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzUlEQVQ4jX3Ty4uPYRQH8M+MSxq3yCUxiSYLpSTKNcoluWWBZiUL1Eixw0INyt5CYYWkDMolIYsfY4z3fc5JWRDJUvkzbN6ffmZwVk895/me7+U8NBVsCFqFzTqqxcSKtaP0DdLtXzXKwuRb4dhYgMKl4GvhyP8AZgelZg90TktmJjeSF0nP/wBGko2F9cmFFtPa9xUzalYXems2BceT8zqmzAleBweCx8lwzeqadcHh5HLwMKmCCN4kT1UsbwAWBB+CJ8Hp5GAyFNwObiU/gpPJior5SU+LiZLPwfaaJUFdWNM27y2zkknJ2STfsbiwtWbZb+rB8+ROYU3QSuZ0elPYmbyoWNsAVsnV3w2NxgPJ7uBJiymNpEnJ/uRt0F/obcdZs2lcCoVTwfUOZkuTT8HX5Gbyvjnv+FuKXU3OL5Mzw8xtGKyqWBTsa5jsQte4103Tq8LeYCS4396BxpvHwZZgW+HcO+b9AZAcDW4NMaHx5O4wcwsrk6dB/yh9QX/wPXhWsaitvTd41PGJupKeZvKX4GfwILlSOFE4lHwMrrX34GIyMFZbYWWzkQOj9A0xucPgfcm9EaYLTr9k6lhfBuluPs4404aYXLNkkO5fnNPM2ace42kAAAAASUVORK5CYII="},
		{label:"YouTube",url:"https://www.youtube.com/results?search_query=%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPElEQVRYhe3Wz0tUURjG8Xc195xz77n3nmv2AyIoccToT2jlPxCEIC7aiLjIoBa1cCm0bBSxCZ1EDKQGBCMoFGsSHXVm0EUuxkJIEUajceEsxmBAeFokA2rmK4XTYh747M75nu0hqq66/2UZI++lAzuRDtRSOlBLGaM2MoGNf8KojXI3UONpI28eeDwVqPF0YOMspYwdJyKieU82LwQ2KmHek800a+x40tiohFljx2nGl5kZo1ARvsxQwsjcR6PANXP5PPvsSRJG5mjKl3vvjQJH4lINfmxtorj2Fdn7nUhc8Fn3jjPlyz2a9BW4EjfCKJVKZcVvW1jpeoQPVy6yG4fRO1+B7XoYxWLxgN3dXRQ2c1h++AATtT6/tY/e+ApsjfXY2dn5rUKhgO+fV5C608rv+Qo07iuwNdYjn8//0fb2Nr68HMXrGs1q0pgnwdZQh1wud6LkyDDGAofVpLgnwdZQh/X19WN9WphH5PYtdNkhvGI2adSTYAtfw+rq6hHLi4uItreh07MR0YLf8yTohSfBFr6KbDZbtjg3h6ftbbhbG+CxY2HkNK19NKxFadiV4Bg85yM1PY3k5ASetLagw7XRbVuIMe8foUWJYq7YeO5KcAy6Eh2Bh3YZQrcjEGPeO07MFWs0oEVywJXgip7i7Im0SFJUW0PPXIFKiGpriPod0dSvBSrCEU1ERNSnrUifFjhbVuTAvzDihFp6tPW2V4ulMkfke7XAX/nVKDd7tDURcUItZ/PVrq46xn4C/yowaRwJnAkAAAAASUVORK5CYII="},
		{label:"搜库搜索",url:"http://www.soku.com/search_video/q_%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUUlEQVQ4jZ2RzY2EMAyFXQLHlYKIS6AESpgSKGFL8FbACaHkQgmUQAkcZp3rlBCJcGcPweFnZrWajRQplvM+28/gCbNAeli+cE2X9GMmvMF2ZsLbQvqx54veE2YAABCoaE7i7QbSYxK/yC+kpw2gx0PVeiasAyFJB6ky6ckTZjNhLZCZsP61QqCiAQA4fE4jLaSn+Adp6wKrhYpeEjsEqz8B4kGgovGEeOwogvcRYoyfpxGeNrCb6K/AVyZDXCOSmBlI+0B68ISltBwIq1QodkJpjR/dhLnhQRnXiEB1XCvrRtVyqcz3p7wlnxsecsNDDLp7lVu35tatIpY4N0zKulHeCSD57l6dACexZa9aLt8CXMUAAP8CKMtT1kzZ+wDDwxUiAGW5v3qmWi6fTbTcn4CGaYe6Mbfsc+tWZdwjrqzlUuZOa9wgyrgmdnGAbmLx6AeFqfCwQvMXAAAAAABJRU5ErkJggg=="},
		{},
		{label:"搜索相关图片",url:"https://www.google.com/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&q=%s", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH9SURBVDhPzVE7i5pREP1+gYWFIMKCIPgHfKyFoCkEwdbKQny/xbeCoCK4i6KfqCyCCGIlbGN+wgrCohAUY20TXEgXWEg7uWfwC0tIlSoDhzv3zpkzjyv9v2axWD4ZjUbv3d2dV6/X8wkYDAavzWbzqlQq9Y36d3t4eHgtlUqUTCYpk8kQ/EQiwVgsFiSE7pnocrme3G63bDKZZKEsW61W2Ww2yyLxLZfL0Wg0+sFEYcFg8HO326VarUYibwWeVC6XCUin01QoFPgURCoWi7TZbOh8Pv8Mh8PPgUDgWVQ+Hg4Hmk6n3Al4UiqVIuBWRPJ4PKtYLEar1Youlws9Pj6yWD6fp1arxaKn04mazSbF43GSIpEIAbd8yW63y9Vqle+z2ewNsWg0ytWQ0O/3OSbuX/AuifYIQEuohBHq9TqTRMVvSBLtswg4jUaDY8J/RadQYvVQKMQkPGazWXI6nZH5fP5dScQ7Cg2HQ/L5fHW/3/+VBZQRlKUo/nK5pOv1SpPJhLeOsTqdDm23W9rv91SpVLjg7xHw30oXEMK/r9dr2u1272gZNh6PX47HIw0GA+6IdwcHQKIygiKCzfd6vXeHwyGLf5dF7AU/ofBYoN1uE4C2P3aBIBYIIcSwF8ThA+DwN2q1WrtOp7tXq9UMjUbD+OgrAO/P+226fzVJ+gV+cHLx+IUV6AAAAABJRU5ErkJggg=="},
		//{label:"搜索所选文本",url:"http://www.bing.com/search?q=%s",image:"http://www.bing.com/s/a/bing_p.ico"},
		{label:"360网盘搜索",url:"https://www.google.de/search?q=site:yunpan.cn%20%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChklEQVQ4jZ3Q3UtTcRgH8N9fEupetOlQ3Jmbk0wIuojuCsIgqsvuCsR5tplFVrbedLo5l0o1kUSKQJxtOydfVphKYstWzKDUnDq3s/myt7PtfLuxESiCXnxuvs/D8zw8hBBC5C3e6sqGkaTGwApVTaM4iMbACJrrg5ny+98VhBBCSm7N1FQ1sjjRFz8UTSMLefNsNVFrHQmNPYajUGmHY6TSwED1fGdfZwZiuDwUR01fbN+6WucWiNrAgurd2uPRVBJZAQCAGC+gjonv6VHrGRCVgUFZdxRl3VFoXmziytAOTvdv4c3XCK7aPuJ82xgGphYR4wX0fEnipH0z16/Su0FUegaltijOvtoCl9hdCWA+sINz9j8oaVtC1cPPeO3xgfVHsZ0ScOntNkptUVTo3CAVegbyrgh+htNgfet4511Bgs8AAPiMAONkHCWWdYi0LogN4xicXoJ3LQV5V+T/ARz6JxdxyjgBkWEclbdH8MEfzF3TM5dAsZVDsZWDaXQZCT6LYisHJe0CUeoYyCxhtDq+4c57DrJODsdNq8inWTwe9iGz+8mxRR4vvUkk0ln8CGxC1smBanAJRKljUGQJ48KzOfAZAeyvFCaWeHjX0yhrmcVFsweh7WTumkgshVrrNIosYShoZ5ZQOjcKzSGIjQuoNXtg8yzDxP6GqnkMUtMqxEY/ZA0O3LDP4FrvJ0jqhiA2LqDQHIKSdqUJRbvS0o4QpB0hiB74kXdzCnlNM5C0BvAvl5jWUHB3HgX3fJC2B3O5gnamiFI7vCbp2MBRUPWOABE9CYoVtCsrbt/AYVC0K33MtCojhBCS9zRYRmlHQuW0M6ug3TiQ1pmh6h3B/NaVQkII+QtqncEVt0PFzwAAAABJRU5ErkJggg=="},
		{},
		{label:"汉典查寻",url:"http://www.zdic.net/search?lb=1&q=%s", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANrSURBVDhPTZNrTJNXHMb7ZR/3abdkY0vmIlumyy4CKqszBtHAihM0wBxDB1IRlMiGy9yi2wyKSmHlYvv2Sgd2OlEWDSNDcWFrjKKRFC/0QilYLa2lpoKiMpi/nb66bB/e9z3vyTm/8/z/z3MUBvctJE+U+gBoR2eQvFGM7hCSmG+fBLP/DgZ3BGVGFmVao/yvuzaGwROR1yiahu5gHxjkQlcjvb/b+al/gGbfJLrL11meX0hNzwU6gaT0DLK3fMGRGDIgvjkOURgGg0hDMSJNabBNgddejuHaTWyBu7y5IIW1lV+xvcXOK3MTeUe5lPSPC9l/uk9Woh8MofjBf5+T53sJSlnMfv00Y9Y8zAPDrK2oIvHtd1m5Xk1pnZ55C5LZ2XGaurNXxcb/lSC5RA/8UWyDIziPf8/Z3wy0XXJiHJ2kVHOQ/O07KTnQTFruJxyJzNIaFn16Il8uwTh0i8Zzt4XsCMZADO3wQ3SecSwjEzT2eUic/xbzklLYUq8nZUUmJfsasAp4XL4MaBsPUaW5T5ZqlpqOKIfCE5TVG1jxaTG72k+Qvm4D769aQ023g4RX58iAlsC9/wCSN4zJNY7qw0cUqB+ILs/wTfspFmeuEpvOkCq+SgHYprOhKirF7Is+LuFfF/RCumkkjPaPCLWdM2iu/EKD00nJ3iaqzIdZuFLFEgHYuKeeXce6MQ3H0LvCSOKRAfFXXI7ZL2p2O6joVXMo9DcH+318LgBvCCuVWTl8truWbztOIYm1+qtBzE9ACkmkTi/kWLyTFJxYzI5OI9W/XqLSZKe8wUTCa3NZtiafnK1VpKqyef29ZOYnL2JvlwOryIpCL2xs80NRVzbF3ZlU1LaxLDdfPrFo9wGeefY5MtYVonFcZv+fA9Sdc1Enxk39foy+2yjMngDlPWpSbQo0zjO0XJ/GFpyS47s0J4+N+xr50vozq8sqOToBxqF4E4Xl4s7IQbK4vaTZn+KjY3NEGTER6wjNzlGW5xXwgWiexR+jNfiAhSIDytW5wrEQrWPT8ukyoNX/iD0XD7PDUY1tZJrqkz1kb9rKJpHCH29OPbbMO45BxPf5F1/ihYSXKRaOaPvcYl64oHMFsfoe0uL7S1xrYed5F7Yb9zh6F5qv3JD9jt8+i0if7qKHzOLNJKUqUX9XI5RN8Q9zteNcnUu7SgAAAABJRU5ErkJggg=="},
		//{label:"Wiki-DE该词条",url:"https://de.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"Wiki-EN该词条",url:"https://en.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"Wiki-CN该词条",url:"https://zh.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"}
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