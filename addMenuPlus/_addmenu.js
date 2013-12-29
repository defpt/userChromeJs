// ===================== 橙色按钮菜单 ======================
css('/*=====橙色菜单定制=========*/\
    #appmenu_newTab,\
	#appmenuPrimaryPane > hbox,\
	#appmenu_find,\
	#appmenu_print+menuseparator,\
	#appmenu_webDeveloper,\
	#sync-setup-appmenu,\
	#sync-syncnowitem-appmenu,\
	#appmenu-quit{display: none !important;}\
	#appmenu_print{\
	list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJnSURBVDhPrVJNbxJRFH0rFzYNlbZ8PKDMAPPBANPOwAzzGGAKAwzDR7VduvGPmBDdmKhL3Ws0NmGhMWlZlm5cGN0ZYjTujJvGxLSJxt3zPXwJC9JdT3Jz7rtzzl2cueBKEQwGY41a7UW/6+F2YxcP/C7utlvYa7nYJ9xuOC+phsmXEYlEkpVScVwp6dhBZVw1S9gmVbfM+bvpVMccxyWZfBmRtbWkJkvjUi6LaWmyiLclAatiBuuKhFFRIwsiywvy+XxYVVVPz8v7hQz/WohHT7Jb8RPKYoL0XGLOlqYeGYZxW5KkoaIoEWYH4Oawf2/Y6838VuuQjS7FwPeP9ofDrwe39u6zEQCe6x73PQ/7XueXY9vvTV0/1QqFqa6rp4amTU3z/7teRR9d1z3vuE3c8zrHzA5AxSxOHGSRwAxMQiSBWbhilDAifZXMbNLXrfK86DengvBuBU2YHQBdlic0KCOv4G3CqpDGRRLiDgmRhkdZy0rzMIuKjHXSbxMPswMgQzgR41GcjMFzwl9ECGe0clxiXmISztJwYybEw9+y3OZvhUtgeQsuFvDr6xM+sHohbsHnbHQpMgl4FA9t/hVgeLEgFdp4komGPhkF5Y7bcB77nc6zQbc76rRao0GvN/La7Qdd133re94jchd309HwdykWfcrsANxYWcmtXr/WE3jerKHyuGHbn2sITduN2pQy+TPvkFX+4VTROBWLNYOBwAH1MPsC9JSRtjO2DeMNOd8ROelR3bJG5P3Q0tUP9BvVMPkyIISJHUU6VHn+Qk2lzualpM6ETOpnXkj/KeWkV1TD5FcBAP4BqTvMdz4j4nQAAAAASUVORK5CYII=") !important;\
	-moz-image-region: rect(0px, 16px, 16px, 0px) !important;}\
	#appmenu_bookmarks{\
	list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD6SURBVDhPtY+rCgJRGIQPIiIGhTXtBRc2yeJDmEwmk8lk8DVMWsUgm0wmMfkEYjIZfArDYloWk86P47LsxQvowIQz55s5HPVXGYbRN01zwOP3wsAaA1sev5Ou6xWUA4yEmqZVGX8ulHvwTSxfYfyZ8HoDpVVsYCMZr9MCMIUPCYexgWviTjxlXSnHcWoI/GfhncFe4DrrD+HCQrhLwhnev/pOAcA4UYiMByZgig80R1jvZJXFGOgSyxcgL6tML4nlqgjoLDCGQnhkWdYQ54CZ77puiWxagNoETyi2GMu3msiPcidfZJwWgDm8sG27zCiSZBiewR6jX0ipO9EQbm5/SoIkAAAAAElFTkSuQmCC") !important;\
	-moz-image-region: rect(0px, 16px, 16px, 0px) !important;}');
app([{
		label:"重启浏览器",
		oncommand:"Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
		insertBefore:"appmenu-quit",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAETSURBVDhPldIxSkRBEIThiYzEwFhExAOIeAIREQMxFkOPIF5APIGnEAMDz2DoCYyMRIyMRES0PphZ3g7PXS34Yaa6uum3O2WGFsJDxfnfWg/flQ3GX7QdrsNu0DQcsBPUZEa1F96DhrvQD+A5y8hOybpvQeApbIV+wGZQc5fVM5HVFF7DGiPqB5DaS+DdMGg5fAbmKaNqbADJ8PToLfvV+ApLjKrfBiwGWb7eclIv1h9K0LpwHkpWz7HLYb18hP7B2Gi4FcnI6jlirNQLDhhz1D4Zqwy6D4x5z7Y9b1k9E3llbept6NcmnlrL6ZnSRWjF53AZfCOcea3uPqqz0H6gMdTOw0z5z6/CY/BY4MwbvoeolB+cZmBjrblh9QAAAABJRU5ErkJggg=="
	},{
		id:"appmenu_newPrivateWindow",
		label:"新建隐私窗口",
		acceltext:" ",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEpSURBVDhPtdO/KwdxHMfx86v8zI9kEVEGxWawWUgmyqRE2SwWgzKIEYOyGZlkxEJSZJHyI5H4azyf1903d/e57+ZVj/p+r3u/7z6f9+ei/0oDhjCDpcQ0BlGPqunDBs5wj9fEHU6xhm4EM4BzvOO7xBv2UMgwrvCDUKG+cI0p1KCSduzjE6FCWXyJWTQjkwncIFSotHgOrcikFqv4QKhYLs0nF4qNF3dQtnavH6ENwXRiF/kGvraje4RT2UYX0nhGRv3hhmwhX+ya57GAB7xgEz2owxMOEP9ZgTf8LU43rAnLuMUzbNIL3+4EccZwARs45/yGdcDjbBMfdAwP1CHitGAddvXMF+ZMbLKIdNye2ElU4gaNwLGWpRF+ZOPoR+HDyhzPKknui6Jfpl5bjkWeBlIAAAAASUVORK5CYII=",
		clone:false
	},{
		label:"网购专用版",
		exec:'D:\\Program Files\\MyFirefox\\Debug.lnk',
		insertBefore:"appmenu_newPrivateWindow",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHWSURBVDhPndLRS1NhGMfxM5QUYgg7JynCm23ECIltoOFICGTQCGxzjC7m4sDyxl0I2yLcRYuuI4Td1EUsVjeRUnlhqReCStFFpeWF9s+s7++4Mw5TvPCBD8973vOe533f875GT/g6+VwxGQgEZjrta5jFqPN0HBdwByM4MZFefsATTOITXtVqtatkJ9rtti8UCk3TXMJ1p9MTEzjEd2xjDw8xiG5Uq9XLpJd4h371ufEM/3DkoYK/MA43TMuy5sh/YDs9hJavir0FdkzTfJrL5YZou5FEHT/wFn4YJj7CW2Afz+v1upbcjUKhECOt4i++IgJDP+oz3I9V6HUwGLxFDiKPuxgoFoth8ho0Zisej98kG8PQCtwC8htv8B7fsABt5TZ+QgU2Y7HYDbLzpzXYuwX9QBXZYND9RqOhbV6CjlrvNXYZlnO+fr//QeeF1xZ0L+7hEXbgTnLIpbP1LW02mc9fIX2BdxWiZ5e3fyWTyWjrx6FKiURCM2nW3sG91lOpVLI7uxscWb9t22M0X0C3UZdIx3UA/Y9dLJVKpbjG0j4ZXJq+crlsZbPZKY5oLhKJPMZiNBqdT6fTqUqlMqwxneFnRl84HB5otVoXpdls6qRO+dAw/gM4QpQy8D2BYAAAAABJRU5ErkJggg=="
	},{
		id:"charsetMenu",
		insertBefore:"appmenu_find",
		clone:false
	},{
		id:"abp-menuitem",
		insertBefore:"appmenu_find",
		clone:false
	},{
		label:"更新脚本",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADNSURBVDhPtVJRCsIwFKs7gg79Ezpo1+0c3sEz++8B/BT8FwRlJuw96LqppWAgrHtNsnTU/A3e+0HZtu0g43zEAaSM86HGEEJZAGtrSNd15Q1ozm7Q9/0a4hq1NxqglFlNjcjngOBEcVw/pszPIl+Gc+5CMX8eGYdhfRXZZ1hrdwi56dk1jLOmafYi+w4ItzDeaWQAzA88LbaqUfEbFUwHmF7gEzxithq3FqBn1S8ql35mrBP79NpyUwVpYHyh+C7LaUBKbZG2KbqdcxjzBmMJjgDzpdTwAAAAAElFTkSuQmCC",
		exec:'\\chrome\\Local\\UpdataLocal.bat',
		insertBefore:"appmenu_find"
	},{
		label:"备份此配置",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGeSURBVDhPfdPBa9NgHMbxdmImRbuOFAolFrsxJBvqP+DRuz0rwVvBgyioh3mpdJS0C5QdpkUvHrwIXuLEgpYaZ3esCKKb7V/j9xkJSbbMBz783rx588ubpM1lxMCFsObDsSxiAWdGC+7gLd5hC0p0LNtYxen0er01ymfMsW+a5mPqI/wJ52RmGMZDqnaWjud565QAWnhQLBYfaJ78wCw0r1QqT6nnkM5gMFCDb9DCKXd6pnni4/juqrVaLbtBuAM10OI9zSnVavUyRY/x/wadTifZQO/iHl7gLj7huAE2cR7pnNjBe9u2b1N1oRp9QNTgJUyk0+/3Nyj70MJfcKHoM+pCzctvOEin2+1GDbT4S6lUuk99hb+ILo58x0XESTTQgp947TiOTY1eYJJuchVxEo+gk6r6jB6OkNXgOuKcaHCA5/V6/Rb1rAbXEKfdbmu7X6GTU+ziBg6R1SD9CM1mc8myrCcM9wqFwk6j0bjJ+A30KZM+lstlr9Vq6R+aSt513eXxeLw6HA4t3/cvBUFwRcdJk8lkZTQahb+DXO4fqmqaqGkVSboAAAAASUVORK5CYII=",
		exec:'\\chrome\\Local\\BackupProfiles.bat',
		insertBefore:"appmenu_find"
	},{
		id:"appmenu_addons",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE/SURBVDhPtZK7SsRAGIWNN1QQbARBIWgTkkwukGa7VOITxMpHsdHX8A20sbCwULHyAiqi2NkJ7lpoo+J99ZvJ7DrEGILggW/n8p/zM5PZnn+V53mDvu8vCyEOYRPmdameCMzCp8FLo9EY1uVasuSPDn+onSolSTKA8RKuoSnhCo+M6gTM76CluYFVHc0l74zxuROowbaO5tINngqmKnZUMMuyPtd1/T834C5LLNpBEEwxfyuYirTDMJxmvIe1ToMzw1AJ3isVQlEUjakJhYui8Td0AytN035OPKMasLkI77ZtDzG+lgVN8MxJP6yrBsjiOJPyY7LZfXeDW/jxcfFu6Xyusga8zAQliz/ZCOsFs4Z3N09+q5fNB9MEzTiOx8ueGO+eznVlsbkP5xhO4YT5huM4o7LI+oD1MRxJhBArX1je5uPCzzEkAAAAAElFTkSuQmCC",
		clone:false
	}
]);
//===================== 标签右键菜单 ======================
tab([{
		label:"复制 Favicon 的 URL",
		text:"%FAVICON%",
		image:" "
	}, {
		label:"复制 Favicon 的 base64",
		text:"%FAVICON_BASE64%",
		image:" "
	}
]);
// ===================== 页面右键菜单 ======================
page([{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
		condition:"link noimage nomedia",
		insertBefore:"context-copylink",
		image:" "
	}, {
		label:"复制链接文本+URL",
		text:"%LINK_TEXT%\n%l",
		condition:"link noimage nomedia",
		insertAfter:"context-copylink",
		image:" "
	}, {
		label:"复制网页标题+URL",
		condition: "noselect nolink nomailto noimage nomedia",
		text:"%TITLES%\n%URL%",
		image:" ",
		insertAfter:"context-inspect"
	}, {
		label:"发送到 OneNote",
		condition: "nolink nomailto noimage nomedia",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI6SURBVDhPrZJLT1NRFIX7C5yriYkzojHEAXGkAyYyceLAMMYBERVHRARKMGKiJhITiUpACSCKCBFEU8IbebT2SqU8+oJeKBcoLX1Cgbbc8lmOTMhlYNSVrME5Z69v750c3X+Rsc3MaIeZAf1XjIVdf+yDuE7X/26UwQcG5j9YiSxECMlh/DN+/NM+gs4wAVuQVcnLsnEZZWwJz9DiYUDnrVbmWqxsemM4miVs9SZ8k2siID3/hunlKAvpkDKisNgnI3fLhwH7h/B8iDXLKl8uP6PpVBHT9UaWTApVGaXcP1OM3WDDJ/mQe2XchiMAAWcQr7RCT24tb07fozmnirASoudpD8WZJZjf/sDV5sJaaxXWANYdARSjwqcr1TRmP+ZRpp7x2iHMXRYKMor43j6B/bOTwcph+or6jgDY11kxrvD60hM67jTRUvqR8qwKGvSt5J8vwWmR2Zd3zseswaEF+GfXsXc6eHi2jPeFjfiXA9xOj37txE3ys/Q4JDd7qT0B2ZcGsDDgwfRKQn+ujBd5NaKooaKdi7pcblwoxz2zJO5240nUXVULcHW4GK4e5/rJQu5mV5JKd3NPebh6vICcY3nYzfMiuLMVT7+ltABz3QSW9in6m0cY75TSvfaIb8fFD+2q6yca3GBnc5tYZEtMogFYmiaZ6rURi/4uUFVVdFKTuyS2E+zE4iTjCVJqimhgQwsYrhnD/dMjxkyk99wMxYTVpCr2DnsjRPxRAf9U060F/I0P4v8ine4X5rNxj9X2cqcAAAAASUVORK5CYII=",
		insertBefore:"idmmzcc-dwnl1",
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
	}, { // 替换 openImgRar.uc.js
	label: "打开图像RAR",
	condition: 'image',
	insertBefore: "context-copyimage-contents",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMQSURBVDhPxZPrT5NnGMbf1RJlA5UOyqGTiROHzBiKWJo5WtTapFthTgQcHoYtyiF2JOjCwdK3dHKq2FLSlMoKAzxENpaoUbNkmW9j1A/GOIFQ2SkjZskW2LJlyz7/Vgp/wb7sSn6581zJdedOnvsW/n9duuhzjgfc4qi/R7wa9IjXQv0x7k72iddHHMv+kCdWlxgb9DpXosvqOfdx+D1NLnWGAgbaN3FiXw6Hd6qxFr6G70QuTaZ0DuRvobwgh7Idr7M/fxNtddbwSlwQvptfEJubmqKhbNp3m7g8UEfLXjPNmndpLdzFLVGH++CrnMzTU6/eja3AQK2miJaTK01u37gtRX78i86OboJvtXJVN8CI1s3YrgtcLupntLSBx4PlnH9bxXBxDyNvurmi9+HX23FYasOCx90rTU5MMD23SKjVI/3y1bfMj80wc+Ypz07PELbcYfj4Njoqsvji0EVmrWEiNfeYsUqc1lUhzP/8p9jabGdyYpJarRlXlZnuD8poyN8TG9eSr6OvrYFPh0b5qMzAqai35DdqjJSpdyDcuH5T+iayiL3FjirLSLLCgEJRjHyNNkZqjpaqIzVRyjGUHGPVam2UQmRxOykq/VAS3F2d0pWxcaaeLdDVG5KCXy/SOP6cPQ7Is/3DRt1zbPUWNNFfMJW0oz76O3l1f5N7fIH04gmEuR9+ddjbRD6/9hnqvDMcKj1HZYkLeUKAeMUw8qQumsoz6Xw/g9SNJhKSL7A2xcuLCjdxqhYEl9PF08hvdLS72KBOJ74gE9l2FWu2rUa2RYY8R05NRTbB6lRe2JxI3Nb1yLITETYnYKw2S8Ls1JTO5/Ey+/0f2M6/ge+ns1TOVZL6wIDqsYmUL5OpqH+Fs+/IUXySQlJYyTopmZfvp5F5Ko3YLkSmn+h9Xh/bD2RhtCVhbkxCeewl0i2JKKviKTLGc7BwFcoj68mwrCXDuo606gQ27FMuN1jSo4cP9V5ftzMQ8oj+KB5/lxiI3kR/9E6G+h1iyO8SAyPL74Fgn+gd7HU+mX6kX4n/VwnCvy+JquIx63JOAAAAAElFTkSuQmCC",
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
}]);
//打开链接
var openlinksub = PageMenu({
	label:"此链接...",
	condition:"link noimage nomedia noinput",
	insertBefore:"context-savelink"
});
openlinksub([{
		label:"在新标签页打开",
		oncommand:"gContextMenu.openLinkInTab();"
	}, {
		label:"在隐私窗口打开",
		oncommand:"gContextMenu.openLinkInPrivateWindow();"
	}, {
		label:"在侧边栏中打开",
		oncommand:"openWebPanel(gContextMenu.linkText(), gContextMenu.linkURL);"
	},{
		label:"在 IE 中打开",
		text:"%l",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe"
	}, {
		label:"在 Chrome 中打开",
		text:"%l",
		exec:"D:\\Program Files\\MyChrome\\chrome\\chrome.exe"
	}, {
		label:"用谷歌快照打开",
		url:"http://webcache.googleusercontent.com/search?q=cache:%l",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJySURBVDhPtZFPSJNhHMddhA63RihUBHUYnXJ/k6Fp5liErtlw893/Oeb27t1my2Ztoyhd2xI8dghjh45C4GmX8NKlswQGQaAdPORRamDI/PPt9zzvSxJCnfrCh433+X1+z/N7nrb/kUtESqVSLRFvFZbYN2Xtr3FrNJoVp9P5eXp6eqdUKu4Xi4V9URR3BgcHP3V2dq6wGrn0ZMa7u7tX5+bmfpKAoaEb6O3tRX9/P0ZGRhCPxzE1Ff/e1dW1ympl5TiXaedGpVLZc7lc8IdFPHvxCtK9AsbGxuDz+fhvKBRCLDb5g07SYI6syrk/Ojq6IYpJGAwGPHn+EmtfgdnHizCbzaA1pNNp+P1+JBJTsNlsX5gjqxS6pOVsNtMcGLiOvr4+jAuTSD8oY+iWG9ozZ9FjMPLd8/k8IpEIAoFgkzmKzhu8L5VKB0ajEXa7HXq9HlctdvikOsdsuw2PxwO6H95AFKUD5ig6b/ChUHh0aLFY+Kwmkwl3hFks1tc47mAJwWAQtVqN7iBGY0iHzFF03qBBs+0OD9/kO7GZne4okvnXSD2sIziZQy6XQ7lcppdIQBBCu8xRdJ6n9Fzb0WgEDocDkiTxmVmzQCCAN8vvsLCwgEwmg1QqSxd7bZs5sirnilqtXqfj7Xm9Xj7GzMwMn7larWJ+fp6/QjIp0e6RvY4O9TpzZPU4ok6n2wqHwy16a7BGDDZ7LBani8tgYiLc0mp1W6xWVk5GopNsWq3WpiAILVFMHSUS6SOv198ymazN9nb1JquRS//MaeI80UPcJerER+KbAvvPvrE1I3GBYM7vnCK0xDni4j9gG7FactrafgFMwhaUbUncRwAAAABJRU5ErkJggg=="
	}
]);
//当前页面
var openpageinsub = PageMenu({
	label:"当前页面...",
	condition:"nolink noimage nomedia noinput",
	insertBefore:"context-savelink"
});
openpageinsub([{
		label:"在侧栏中打开",
		oncommand:"openWebPanel(content.document.title, content.location);"
	},{
		label:"在 IE 中打开",
		text:"%u",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe"
	}, {
		label:"在 Chrome 中打开",
		text:"%u",
		exec:"D:\\Program Files\\MyChrome\\chrome\\chrome.exe"
	}
]);
//快捷回复
var Quickpostsub = PageMenu({
	label:"Quick Reply With...",
	condition:"input",
	insertBefore:"context-undo",
	oncommand: function(){
		var input_text = gContextMenu.target;
		if (input_text!="undefined") goDoCommand("cmd_paste");
	}
});
Quickpostsub([
	{label:"Outlook~~~",text: "xxxxxx@outlook.com",image:" "},
	{label:"Gmail~~~",text: "xxxxxx@gmail.com",image:" "},
	{label:"SSY~~~",text: "xxxxxx",image:" "},
	{},
	{label:"谢谢你的解答~~~", text: "非常感谢你的解答！！！",image:" "},
	{label:"要的就是这个~~~", text: "亲，要的就是这个，非常感谢！！！",image:" "},
	{label:"不用客气~~~", text: "不用客气，大家互相帮助……\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",image:" "},
	{label:"看起来很不错~~~", text: "看起来很不错哦，收了~~~\n谢谢LZ啦！！！",image:" "},
	{label:"谢谢楼主分享~~~", text: "谢谢楼主的分享!这个绝对要顶！！！",image:" "},
	{label:"楼上正解~~~", text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
	{label:"坐等楼下解答~~~", text: "坐等楼下高手解答……⊙_⊙",image:" "},
	{},
	{label:"不明真相的~~~", text: "不明真相的围观群众……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
	{label:"没图没真相~~~", text: "没图没真相，纯支持下了~~~",image:" "},
	{label:"LZ在说什么~~~", text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "},
	{label:"纯支持下吧~~~", text: "纯支持下吧……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
	{label:"嘿嘿~~~", text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "},
	{label:"我哭~~~", text: "\uFF5E\u003E\u005F\u003C\uFF5E\u0022\u002C\u0020\u0022\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",image:" "}
]);