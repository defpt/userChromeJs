// ==UserScript==
// @name           addMenu.uc.js
// @description    通过配置文件自定义菜单
// @namespace      http://d.hatena.ne.jp/Griever/
// @author         Griever
// @include        main
// @license        MIT License
// @compatibility  Firefox 21
// @charset        UTF-8
// @version        0.0.7
// ==/UserScript==


/***** 説明 *****
可添加的范围
		page: 页面右键菜单
		tab: 标签右键
		app: 左上角橙色菜单
		too: 工具菜单
二级子菜单 PageMenu, TabMenu, ToolMenu, AppMenu
标签的介绍
		label       标签的名字
		accesskey   快捷键
		exec        启动外部应用程序。（\\ 代表当前配置的路径，例：\\Chrome 配置下的Chrome文件夹）
		keyword     指定了关键字的书签和搜索引擎
		text        复制你想要的字符串到剪贴板，可与 keyword, exec 一起使用
		url         打开你想要的网址
		where       打开的位置 (current, tab, tabshifted, window)
		condition   菜单出现的条件 (select, link, mailto, image, media, input, noselect, nolink, nomailto, noimage, nomedia, noinput)
		oncommand/command  自定义命令
		image       添加图标 （对应 图标 url 或 base64）
		style       添加样式
		id          标签的ID（我新增的，修改原菜单用）
        position/insertBefore/insertAfter:position: 1,  insertBefore: "id",  insertAfter: "id"
可利用的变量
		%EOL%            改行(\r\n)
		%TITLE%          标题
		%TITLES%         简化标题（我新增的，来自faviconContextMenu.uc.xul.css）
		%URL%            地址
		%SEL%            选取范围内的文字
		%RLINK%          链接的地址
		%IMAGE_URL%      图片的 URL
		%IMAGE_BASE64%   图片的 Base64（我新增的）
		%IMAGE_ALT%      图片的 alt 属性
		%IMAGE_TITLE%    图片的 title 属性
		%LINK%           链接的地址
		%LINK_TEXT%      链接的文本
		%RLINK_TEXT%     链接的文本
		%MEDIA_URL%      媒体 URL
		%CLIPBOARD%      剪贴板的内容
		%FAVICON%        Favicon（站点图标） 的 URL
		%FAVICON_BASE64% Favicon 的 Base64（我新增的）
		%EMAIL%          E-mail 链接
		%HOST%           当前网页(域名)
		%LINK_HOST%      当前网页(域名)
		%RLINK_HOST%     当前网页(域名)
		%XXX_HTMLIFIED%  转义后的变量 （XXX 为 上面的 TITLE 等）
		%XXX_HTML%       转义后的变量
		%XXX_ENCODE%     encodeURIComponent 后的变量
简易的变量
		%h               当前网页(域名)
		%i               图片的 URL
		%l               链接的 URL
		%m               媒体的 URL
		%p               剪贴板的内容
		%s               选取的文字列
		%t               标题
		%u               URL

*/

(function(css){

let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;

if (window.addMenu) {
	window.addMenu.destroy();
	delete window.addMenu;
}

window.addMenu = {
	get prefs() {
		delete this.prefs;
		return this.prefs = Services.prefs.getBranch("addMenu.")
	},
	get FILE() {
		let aFile;
		try {
			// addMenu.FILE_PATH があればそれを使う
			aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile)
			aFile.initWithPath(this.prefs.getCharPref("FILE_PATH"));
		} catch (e) {
			aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
			aFile.appendRelativePath("_addmenu.js");
		}
		delete this.FILE;
		return this.FILE = aFile;
	},
	get focusedWindow() {
		return gContextMenu && gContextMenu.target ? gContextMenu.target.ownerDocument.defaultView : content;
	},
	init: function() {
		let he = "(?:_HTML(?:IFIED)?|_ENCODE)?";
		let rTITLE     = "%TITLE"+ he +"%|%t\\b";
		let rTITLES    = "%TITLES"+ he +"%|%t\\b";
		let rURL       = "%(?:R?LINK_OR_)?URL"+ he +"%|%u\\b";
		let rHOST      = "%HOST"+ he +"%|%h\\b";
		let rSEL       = "%SEL"+ he +"%|%s\\b";
		let rLINK      = "%R?LINK(?:_TEXT|_HOST)?"+ he +"%|%l\\b";
		let rIMAGE     = "%IMAGE(?:_URL|_ALT|_TITLE)"+ he +"%|%i\\b";
		let rIMAGE_BASE64 = "%IMAGE_BASE64"+ he +"%|%i\\b";
		let rMEDIA     = "%MEDIA_URL"+ he +"%|%m\\b";
		let rCLIPBOARD = "%CLIPBOARD"+ he +"%|%p\\b";
		let rFAVICON   = "%FAVICON"+ he +"%";
		let rFAVICON_BASE64 = "%FAVICON_BASE64"+ he +"%";
		let rEMAIL     = "%EMAIL"+ he +"%";
		let rExt       = "%EOL"+ he +"%";

		this.rTITLE     = new RegExp(rTITLE, "i");
		this.rTITLES    = new RegExp(rTITLES, "i");
		this.rURL       = new RegExp(rURL, "i");
		this.rHOST      = new RegExp(rHOST, "i");
		this.rSEL       = new RegExp(rSEL, "i");
		this.rLINK      = new RegExp(rLINK, "i");
		this.rIMAGE     = new RegExp(rIMAGE, "i");
		this.rIMAGE_BASE64 = new RegExp(rIMAGE_BASE64, "i");
		this.rMEDIA     = new RegExp(rMEDIA, "i");
		this.rCLIPBOARD = new RegExp(rCLIPBOARD, "i");
		this.rFAVICON   = new RegExp(rFAVICON, "i");
		this.rFAVICON_BASE64 = new RegExp(rFAVICON_BASE64, "i");
		this.rEMAIL     = new RegExp(rEMAIL, "i");
		this.rExt       = new RegExp(rExt, "i");
		this.regexp     = new RegExp(
			[rTITLE, rTITLES, rURL, rHOST, rSEL, rLINK, rIMAGE, rIMAGE_BASE64, rMEDIA, rCLIPBOARD, rFAVICON, rFAVICON_BASE64, rEMAIL, rExt].join("|"), "ig");

		var ins;
		ins = $("context-viewinfo");
		ins.parentNode.insertBefore(
			$C("menuseparator", { id: "addMenu-page-insertpoint", class: "addMenu-insert-point" }), ins.nextSibling);
		ins = $("context_closeTab");
		ins.parentNode.insertBefore(
			$C("menuseparator", { id: "addMenu-tab-insertpoint", class: "addMenu-insert-point" }), ins.nextSibling);
		ins = $("prefSep");
		ins.parentNode.insertBefore(
			$C("menuseparator", { id: "addMenu-tool-insertpoint", class: "addMenu-insert-point" }), ins.nextSibling);
		ins = $("appmenu-quit");
		ins.parentNode.insertBefore(
			$C("menuseparator", { id: "addMenu-app-insertpoint", class: "addMenu-insert-point" }), ins.nextSibling);
		ins = $("devToolsSeparator");
		ins.parentNode.insertBefore($C("menuitem", {
			id: "addMenu-rebuild",
			label: "addMenu 的刷新",
			oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
			onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
		}), ins);

		$("contentAreaContextMenu").addEventListener("popupshowing", this, false);
		this.style = addStyle(css);
		this.rebuild();
	},
	uninit: function() {
		$("contentAreaContextMenu").removeEventListener("popupshowing", this, false);
	},
	destroy: function() {
		this.uninit();
		this.removeMenuitem();
		$$('#addMenu-rebuild, .addMenu-insert-point').forEach(function(e) e.parentNode.removeChild(e));
		if (this.style && this.style.parentNode) this.style.parentNode.removeChild(this.style);
		if (this.style2 && this.style2.parentNode) this.style2.parentNode.removeChild(this.style2);
	},
	handleEvent: function(event) {
		switch(event.type){
			case "popupshowing":
				if (event.target != event.currentTarget) return;
				var state = [];
				if (gContextMenu.onTextInput)
					state.push("input");
				if (gContextMenu.isContentSelected || gContextMenu.isTextSelected)
					state.push("select");
				if (gContextMenu.onLink)
					state.push(gContextMenu.onMailtoLink ? "mailto" : "link");
				if (gContextMenu.onCanvas)
					state.push("canvas image");
				if (gContextMenu.onImage)
					state.push("image");
				if (gContextMenu.onVideo || gContextMenu.onAudio)
					state.push("media");
				event.currentTarget.setAttribute("addMenu", state.join(" "));
				break;
		}
	},
	onCommand: function(event) {
		var menuitem = event.target;
		var text     = menuitem.getAttribute("text") || "";
		var keyword  = menuitem.getAttribute("keyword") || "";
		var url      = menuitem.getAttribute("url") || "";
		var where    = menuitem.getAttribute("where") || "";
		var exec     = menuitem.getAttribute("exec") || "";

		if (keyword) {
			let kw = keyword + (text? " " + (text = this.convertText(text)) : "");
			let newurl = getShortcutOrURI(kw);
			if (newurl == kw && text)
				return this.log(U("未找到关键字: ") + keyword);
			this.openCommand(event, newurl, where);
		}
		else if (url)
			this.openCommand(event, this.convertText(url), where);
		else if (exec)
			this.exec(exec, this.convertText(text));
		else if (text)
			this.copy(this.convertText(text));
	},
	openCommand: function(event, url, where) {
		var uri;
		try {
			uri = Services.io.newURI(url, null, null);
		} catch (e) {
			return this.log(U("URL 不正确: ") + url);
		}
		if (uri.scheme === "javascript")
			loadURI(url);
		else if (where)
			openUILinkIn(uri.spec, where);
		else if (event.button == 1)
			openNewTabWith(uri.spec);
		else openUILink(uri.spec, event);
	},
	exec: function(path, arg){
        path = this.handleRelativePath(path);

		var file    = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
		try {
			var a = (typeof arg == 'string' || arg instanceof String) ? arg.split(/\s+/) : [arg];
			file.initWithPath(path);

            if (!file.exists()) {
                Cu.reportError('File Not Found: ' + path);
                return;
            }

            if (file.isExecutable()) {
                process.init(file);
                process.run(false, a, a.length);
            } else {
                file.launch();
            }

		} catch(e) {
			this.log(e);
		}
	},
    handleRelativePath: function(path) {
        if (path) {
            path = path.replace(/\//g, '\\').toLocaleLowerCase();
            var ffdir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).path;
            if (/^(\\)/.test(path)) {
                return ffdir + path;
            }else{
                return path;
            }
        }
    },
	rebuild: function(isAlert) {
		var aFile = this.FILE;
		if (!aFile || !aFile.exists() || !aFile.isFile()) {
			this.log(aFile? aFile.path : U("配置文件") +  U(" 不存在"));
			return;
		}

		var aiueo = [
			{ current: "page", submenu: "PageMenu", insertId: "addMenu-page-insertpoint" },
			{ current: "tab" , submenu: "TabMenu" , insertId: "addMenu-tab-insertpoint"  },
			{ current: "tool", submenu: "ToolMenu", insertId: "addMenu-tool-insertpoint" },
			{ current: "app" , submenu: "AppMenu" , insertId: "addMenu-app-insertpoint"  }
		];

		var data = loadText(aFile);
		var sandbox = new Cu.Sandbox( new XPCNativeWrapper(window) );
		sandbox.Components = Components;
		sandbox.Cc = Cc;
		sandbox.Ci = Ci;
		sandbox.Cr = Cr;
		sandbox.Cu = Cu;
		sandbox.Services = Services;
		sandbox.locale = Services.prefs.getCharPref("general.useragent.locale");

		var includeSrc = "";
		sandbox.include = function(aLeafName) {
			var data = loadFile(aLeafName);
			if (data)
				includeSrc += data + "\n";
		};
		sandbox._css = [];

		aiueo.forEach(function({ current, submenu }){
			sandbox["_" + current] = [];
			sandbox[current] = function(itemObj) {
				ps(itemObj, sandbox["_" + current]);
			}
			sandbox[submenu] = function(menuObj) {
				menuObj._items = []
				sandbox["_" + current].push(menuObj);
				return function(itemObj) {
					ps(itemObj, menuObj._items);
				}
			}
		}, this);

		function ps(item, array) {
			("join" in item && "unshift" in item) ?
				[].push.apply(array, item) :
				array.push(item);
		}

		try {
			Cu.evalInSandbox("function css(code){ this._css.push(code+'') };\n" + data, sandbox, "1.8");
			Cu.evalInSandbox(includeSrc, sandbox, "1.8");
		} catch (e) {
			this.alert("Error: " + e + "\n请重新检查配置文件.");
			return this.log(e);
		}
		if (this.style2 && this.style2.parentNode)
			this.style2.parentNode.removeChild(this.style2);
		if (sandbox._css.length)
			this.style2 = addStyle(sandbox._css.join("\n"));

		this.removeMenuitem();

		aiueo.forEach(function({ current, submenu, insertId }){
			if (!sandbox["_" + current] || sandbox["_" + current].length == 0) return;
			let insertPoint = $(insertId);
			this.createMenuitem(sandbox["_" + current], insertPoint);
		}, this);

		if (isAlert) this.alert(U("配置已经重新载入"));
	},
	newMenu: function(menuObj) {
		var menu = document.createElement("menu");
		var popup = menu.appendChild(document.createElement("menupopup"));
		for (let [key, val] in Iterator(menuObj)) {
			if (key === "_items") continue;
			if (typeof val == "function")
				menuObj[key] = val = "(" + val.toSource() + ").call(this, event);"
			menu.setAttribute(key, val);
		}
		let cls = menu.classList;
		cls.add("addMenu");
		cls.add("menu-iconic");

		// 表示 / 非表示の設定
		if (menuObj.condition)
			this.setCondition(menu, menuObj.condition);

		menuObj._items.forEach(function(obj) {
			popup.appendChild(this.newMenuitem(obj));
		}, this);

		// menu に label が無い場合、最初の menuitem の label 等を持ってくる
		// menu 部分をクリックで実行できるようにする(splitmenu みたいな感じ)
		if (!menu.hasAttribute('label')) {
			let firstItem = menu.querySelector('menuitem');
			if (firstItem) {
				let command = firstItem.getAttribute('command');
				if (command)
					firstItem = document.getElementById(command) || firstItem;
				['label','accesskey','image','icon'].forEach(function(n){
					if (!menu.hasAttribute(n) && firstItem.hasAttribute(n))
						menu.setAttribute(n, firstItem.getAttribute(n));
				}, this);
				menu.setAttribute('onclick', "\
					if (event.target != event.currentTarget) return;\
					var firstItem = event.currentTarget.querySelector('menuitem');\
					if (!firstItem) return;\
					if (event.button === 1) {\
						checkForMiddleClick(firstItem, event);\
					} else {\
						firstItem.doCommand();\
						closeMenus(event.currentTarget);\
					}\
				");
			}
		}
		return menu;
	},
	newMenuitem: function(obj) {
		var menuitem;
		// label == separator か必要なプロパティが足りない場合は区切りとみなす
		if (obj.label === "separator" ||
		    (!obj.label && !obj.text && !obj.keyword && !obj.url && !obj.oncommand && !obj.command)) {
			menuitem = document.createElement("menuseparator");
		} else if (obj.oncommand || obj.command) {
			let org = obj.command ? document.getElementById(obj.command) : null;
			if (org && org.localName === "menuseparator") {
				menuitem = document.createElement("menuseparator");
			} else {
				menuitem = document.createElement("menuitem");
				if (obj.command)
					menuitem.setAttribute("command", obj.command);
				if (!obj.label)
					obj.label = obj.command || obj.oncommand;
			}
		} else {
			menuitem = document.createElement("menuitem");
			// property fix
			if (!obj.label)
				obj.label = obj.exec || obj.keyword || obj.url || obj.text;

			if (obj.keyword && !obj.text) {
				let index = obj.keyword.search(/\s+/);
				if (index > 0) {
					obj.text = obj.keyword.substr(index).trim();
					obj.keyword = obj.keyword.substr(0, index);
				}
			}

			if (obj.where && /\b(tab|tabshifted|window|current)\b/i.test(obj.where))
				obj.where = RegExp.$1.toLowerCase();

			if (obj.where && !("acceltext" in obj))
				obj.acceltext = obj.where;

			if (!obj.condition && (obj.url || obj.text)) {
				// 表示 / 非表示の自動設定
				let condition = "";
				if (this.rSEL.test(obj.url || obj.text))   condition += " select";
				if (this.rLINK.test(obj.url || obj.text))  condition += " link";
				if (this.rEMAIL.test(obj.url || obj.text)) condition += " mailto";
				if (this.rIMAGE.test(obj.url || obj.text)) condition += " image";
				if (this.rMEDIA.test(obj.url || obj.text)) condition += " media";
				if (condition)
					obj.condition = condition;
			}
		}

		// obj を属性にする
		for (let [key, val] in Iterator(obj)) {
			if (key === "command") continue;
			if (typeof val == "function")
				obj[key] = val = "(" + val.toSource() + ").call(this, event);";
			menuitem.setAttribute(key, val);
		}
		var cls = menuitem.classList;
		cls.add("addMenu");
		cls.add("menuitem-iconic");

		// 表示 / 非表示の設定
		if (obj.condition)
			this.setCondition(menuitem, obj.condition);

		// separator はここで終了
		if (menuitem.localName == "menuseparator")
			return menuitem;

		if (!obj.onclick)
			menuitem.setAttribute("onclick", "checkForMiddleClick(this, event)");

		// oncommand, command はここで終了
		if (obj.oncommand || obj.command)
			return menuitem;

		menuitem.setAttribute("oncommand", "addMenu.onCommand(event);");

		// 可能ならばアイコンを付ける
		this.setIcon(menuitem, obj);

		return menuitem;
	},
	createMenuitem: function(itemArray, insertPoint) {
		var chldren = $A(insertPoint.parentNode.children);
		for (let [, obj] in Iterator(itemArray)) {
			if (!obj) continue;
			let menuitem;
			// clone menuitem and set attribute
			if(obj.id && (menuitem = $(obj.id))){
                let dupMenuitem;
                if(obj.clone == false){
                    dupMenuitem = menuitem;
                }else{
                    dupMenuitem = menuitem.cloneNode(true);
                    dupMenuitem.classList.add("addMenu");

                    menuitem.classList.add("addMenuR");
                }

				for (let [key, val] in Iterator(obj)) {
					if (key === "command") continue;
					if (typeof val == "function")
						obj[key] = val = "(" + val.toSource() + ").call(this, event);";
					dupMenuitem.setAttribute(key, val);
				}

                // 没有插入位置的默认放在原来那个菜单的后面
                if(!obj.insertAfter && !obj.insertBefore && !obj.position){
                    obj.insertAfter = obj.id;
                }
                insertMenuItem(obj, dupMenuitem, true);

				continue;
			}

			menuitem = obj._items ? this.newMenu(obj) : this.newMenuitem(obj);
			insertMenuItem(obj, menuitem);
		}

		function insertMenuItem(obj, menuitem, noMove){
			let ins;
			if (obj.insertAfter && (ins = $(obj.insertAfter))) {
				ins.parentNode.insertBefore(menuitem, ins.nextSibling);
				return;
			}
			if (obj.insertBefore && (ins = $(obj.insertBefore))) {
				ins.parentNode.insertBefore(menuitem, ins);
				return;
			}
			if (obj.position && parseInt(obj.position, 10) > 0) {
				(ins = chldren[parseInt(obj.position, 10)-1]) ?
					ins.parentNode.insertBefore(menuitem, ins):
					insertPoint.parentNode.appendChild(menuitem);
				return;
			}
            insertPoint.parentNode.insertBefore(menuitem, insertPoint);
		}
	},

	removeMenuitem: function() {
		$$('menu.addMenu').forEach(function(e) e.parentNode.removeChild(e) );
		$$('.addMenu').forEach(function(e) e.parentNode.removeChild(e) );
		$$('.addMenuR').forEach(function(e) { e.classList.remove('addMenuR');} );
	},

	setIcon: function(menu, obj) {
		if (menu.hasAttribute("src") || menu.hasAttribute("image") || menu.hasAttribute("icon"))
			return;

		if (obj.exec) {
			var aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			try {
				aFile.initWithPath(obj.exec);
			} catch (e) {
				return;
			}
			if (!aFile.exists() || !aFile.isExecutable()) {
				menu.setAttribute("disabled", "true");
			} else {
				let fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(aFile);
				menu.setAttribute("image", "moz-icon://" + fileURL + "?size=16");
			}
			return;
		}

		if (obj.keyword) {
			let engine = Services.search.getEngineByAlias(obj.keyword);
			if (engine && engine.iconURI) {
				menu.setAttribute("image", engine.iconURI.spec);
				return;
			}
		}

		let url = obj.keyword ? getShortcutOrURI(obj.keyword) : obj.url ? obj.url.replace(this.regexp, "") : "";
		if (!url) return;

		let uri, iconURI;
		try {
			uri = Services.io.newURI(url, null, null);
		} catch (e) { }
		if (!uri) return;

		menu.setAttribute("scheme", uri.scheme);
		PlacesUtils.favicons.getFaviconDataForPage(uri, {
			onComplete: function(aURI, aDataLen, aData, aMimeType) {
				try {
					// javascript: URI の host にアクセスするとエラー
					menu.setAttribute("image", aURI && aURI.spec?
						"moz-anno:favicon:" + aURI.spec:
						"moz-anno:favicon:" + uri.scheme + "://" + uri.host + "/favicon.ico");
				} catch (e) { }
			}
		});
	},
	setCondition: function(menu, condition) {
		if (/\bnormal\b/i.test(condition)) {
			menu.setAttribute("condition", "normal");
		} else {
			let match = condition.toLowerCase().match(/\b(?:no)?(?:select|link|mailto|image|canvas|media|input)\b/ig);
			if (!match || !match[0])
				return;
			match = match.filter(function(c,i,a) a.indexOf(c) === i);
			menu.setAttribute("condition", match.join(" "));
		}
	},
	convertText: function(text) {
		var that = this;
		var context = gContextMenu || { // とりあえずエラーにならないようにオブジェクトをでっち上げる
			link: { href: "", host: "" },
			target: { alt: "", title: "" },
			__noSuchMethod__: function(id, args) "",
		};
		var tab = document.popupNode && document.popupNode.localName == "tab" ? document.popupNode : null;
		var win = tab ? tab.linkedBrowser.contentWindow : this.focusedWindow;

		return text.replace(this.regexp, function(str){
			str = str.toUpperCase().replace("%LINK", "%RLINK");
			if (str.indexOf("_HTMLIFIED") >= 0)
				return htmlEscape(convert(str.replace("_HTMLIFIED", "")));
			if (str.indexOf("_HTML") >= 0)
				return htmlEscape(convert(str.replace("_HTML", "")));
			if (str.indexOf("_ENCODE") >= 0)
				return encodeURIComponent(convert(str.replace("_ENCODE", "")));
			return convert(str);
		});

		function convert(str) {
			switch(str) {
				case "%T"            : return win.document.title;
				case "%TITLE%"       : return win.document.title;
				case "%TITLES%"      : return win.document.title.replace(/\s-\s.*/i,"").replace(/_[^\[\]【】]+$/,"");
				case "%U"            : return win.location.href;
				case "%URL%"         : return win.location.href;
				case "%H"            : return win.location.host;
				case "%HOST%"        : return win.location.host;
				case "%S"            : return that.getSelection(win) || "";
				case "%SEL%"         : return that.getSelection(win) || "";
				case "%L"            : return context.linkURL || "";
				case "%RLINK%"       : return context.linkURL || "";
				case "%RLINK_HOST%"  : return context.link.host || "";
				case "%RLINK_TEXT%"  : return context.linkText() || "";
				case "%RLINK_OR_URL%": return context.linkURL || win.location.href;
				case "%IMAGE_ALT%"   : return context.target.alt || "";
				case "%IMAGE_TITLE%" : return context.target.title || "";
				case "%I"            : return context.imageURL || "";
				case "%IMAGE_URL%"   : return context.imageURL || "";
				case "%IMAGE_BASE64%": return img2base64(context.imageURL);
				case "%M"            : return context.mediaURL || "";
				case "%MEDIA_URL%"   : return context.mediaURL || "";
				case "%P"            : return readFromClipboard() || "";
				case "%CLIPBOARD%"   : return readFromClipboard() || "";
				case "%FAVICON%"     : return gBrowser.getIcon(tab ? tab : null) || "";
				case "%FAVICON_BASE64%" : return img2base64(gBrowser.getIcon(tab ? tab : null));
				case "%EMAIL%"       : return getEmailAddress() || "";
				case "%EOL%"         : return "\r\n";
			}
			return str;
		}
		function htmlEscape(s) {
			return (s+"").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
		};

		function getEmailAddress() {
			var url = context.linkURL;
			if (!url || !/^mailto:([^?]+).*/i.test(url)) return "";
			var addresses = RegExp.$1;
			try {
				var characterSet = context.target.ownerDocument.characterSet;
				const textToSubURI = Cc['@mozilla.org/intl/texttosuburi;1'].getService(Ci.nsITextToSubURI);
				addresses = textToSubURI.unEscapeURIForUI(characterSet, addresses);
			} catch (ex) {
			}
			return addresses;
		}
		function img2base64(imgsrc) {
			if (typeof imgsrc == 'undefined') return "";

			const NSURI = "http://www.w3.org/1999/xhtml";
			var img = new Image();
			var that = this;
			var canvas,
				isCompleted = false;
			img.onload = function() {
				var width = this.naturalWidth,
					height = this.naturalHeight;
				canvas = document.createElementNS(NSURI, "canvas");
				canvas.width = width;
				canvas.height = height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(this, 0, 0);
				isCompleted = true;
			};
			img.onerror = function() {
				Components.utils.reportError("Count not load: " + imgsrc);
				isCompleted = true;
			};
			img.src = imgsrc;

			var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
			while (!isCompleted) {
				thread.processNextEvent(true);
			}

			var data = canvas ? canvas.toDataURL("image/png") : "";
			canvas = null;
			return data;
		}
		// 离线状态下，但会让 base64 变长
		// function img2base64(imgsrc){
		// 	if(typeof imgsrc == 'undefined') return "";

  //           var iconImage = new ImageConverter(imgsrc);
  //           var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
  //           while ( !iconImage.iscompleted ) {
  //               thread.processNextEvent(true);
  //           }
  //           return iconImage.Database64;
		// }
	},
	getSelection: function(win) {
		// from getBrowserSelection Fx19
		win || (win = this.focusedWindow);
		var selection  = this.getRangeAll(win).join(" ");
		if (!selection) {
			let element = document.commandDispatcher.focusedElement;
			let isOnTextInput = function (elem) {
				return elem instanceof HTMLTextAreaElement ||
					(elem instanceof HTMLInputElement && elem.mozIsTextField(true));
			};

			if (isOnTextInput(element)) {
				selection = element.QueryInterface(Ci.nsIDOMNSEditableElement)
					.editor.selection.toString();
			}
		}

		if (selection) {
			selection = selection.replace(/^\s+/, "")
				.replace(/\s+$/, "")
				.replace(/\s+/g, " ");
		}
		return selection;
	},
	getRangeAll: function(win) {
		win || (win = this.focusedWindow);
		var sel = win.getSelection();
		var res = [];
		for (var i = 0; i < sel.rangeCount; i++) {
			res.push(sel.getRangeAt(i));
		};
		return res;
	},
	getInputSelection: function(elem) {
		if (elem instanceof HTMLTextAreaElement || elem instanceof HTMLInputElement && elem.mozIsTextField(false))
			return elem.value.substring(elem.selectionStart, elem.selectionEnd);
		return "";
	},
	edit: function(aFile) {
		if (!aFile || !aFile.exists() || !aFile.isFile()) return;
		var editor = Services.prefs.getCharPref("view_source.editor.path");
		if (!editor) return this.log(U("编辑器的路径未设定。\n 请设置 view_source.editor.path"));
		try {
			var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0? "Shift_JIS": "UTF-8";
			var path = UI.ConvertFromUnicode(aFile.path);
			this.exec(editor, path);
		} catch (e) {}
	},
	copy: function(aText) {
		Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(aText);
		XULBrowserWindow.statusTextField.label = "Copy: " + aText;
	},
	alert: function(aString, aTitle) {
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService)
			.showAlertNotification("", aTitle||"addMenu" , aString, false, "", null);
	},
	$$: function(exp, context, aPartly) {
		context || (context = this.focusedWindow.document);
		var doc = context.ownerDocument || context;
		var elements = $$(exp, doc);
		if (arguments.length <= 2)
			return elements;
		var sel = doc.defaultView.getSelection();
		return elements.filter(function(q) sel.containsNode(q, aPartly));
	},
	log: log,
};

window.addMenu.init();

function ImageConverter(imageURL) {
    this.imageURL = imageURL;
    this.channel = Services.io.newChannel(imageURL, null, null);
    this.channel.asyncOpen(this, null);
}
ImageConverter.prototype = {
    imageURL : "",
    channel : null,
    bytes : [],
    stream : null,
    Database64 : null,
    iscompleted: false,

    // nsISupports
    QueryInterface : function (iid) {
        if (!iid.equals(Components.interfaces.nsISupports) &&
            !iid.equals(Components.interfaces.nsIRequestObserver) &&
            !iid.equals(Components.interfaces.nsIStreamListener)) {
            throw Components.results.NS_ERROR_NO_INTERFACE;
        }
        return this;
    },

    // nsIRequestObserver
    onStartRequest : function (aRequest, aContext) {
        this.stream = Components.classes["@mozilla.org/binaryinputstream;1"].createInstance(Components.interfaces.nsIBinaryInputStream);
    },

    onStopRequest : function (aRequest, aContext, aStatusCode) {
        this.Database64 = 'data:' + this.channel.contentType + ';base64,' + btoa(String.fromCharCode.apply(null, this.bytes));
        this.iscompleted = true;
    },

    // nsIStreamListener
    onDataAvailable : function (aRequest, aContext, aInputStream, aOffset, aCount) {
        this.stream.setInputStream(aInputStream);
        var chunk = this.stream.readByteArray(aCount);
        this.bytes = this.bytes.concat(chunk);
    }
};

function $(id) { return document.getElementById(id); }
function $$(exp, doc) { return Array.prototype.slice.call((doc || document).querySelectorAll(exp)); }
function $A(args) { return Array.prototype.slice.call(args); }
function log() { Application.console.log(Array.slice(arguments)); }
function U(text) 1 < 'あ'.length ? decodeURIComponent(escape(text)) : text;
function $C(name, attr) {
	var el = document.createElement(name);
	if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
	return el;
}
function addStyle(css) {
	var pi = document.createProcessingInstruction(
		'xml-stylesheet',
		'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
	);
	return document.insertBefore(pi, document.documentElement);
}

function loadText(aFile) {
	var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
	var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
	fstream.init(aFile, -1, 0, 0);
	sstream.init(fstream);

	var data = sstream.read(sstream.available());
	try { data = decodeURIComponent(escape(data)); } catch(e) {}
	sstream.close();
	fstream.close();
	return data;
}
function loadFile(aLeafName) {
	var aFile = Cc["@mozilla.org/file/directory_service;1"]
		.getService(Ci.nsIDirectoryService)
		.QueryInterface(Ci.nsIProperties)
		.get('UChrm', Ci.nsILocalFile);
	aFile.appendRelativePath(aLeafName);
	if (!aFile.exists() || !aFile.isFile()) return null;
	var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
	var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
	fstream.init(aFile, -1, 0, 0);
	sstream.init(fstream);
	var data = sstream.read(sstream.available());
	try { data = decodeURIComponent(escape(data)); } catch(e) {}
	sstream.close();
	fstream.close();
	return data;
}


})('\
.addMenuR\
  { display: none !important; }\
\
#contentAreaContextMenu:not([addMenu~="select"]) .addMenu[condition~="select"],\
#contentAreaContextMenu:not([addMenu~="link"])   .addMenu[condition~="link"],\
#contentAreaContextMenu:not([addMenu~="mailto"]) .addMenu[condition~="mailto"],\
#contentAreaContextMenu:not([addMenu~="image"])  .addMenu[condition~="image"],\
#contentAreaContextMenu:not([addMenu~="canvas"])  .addMenu[condition~="canvas"],\
#contentAreaContextMenu:not([addMenu~="media"])  .addMenu[condition~="media"],\
#contentAreaContextMenu:not([addMenu~="input"])  .addMenu[condition~="input"],\
#contentAreaContextMenu[addMenu~="select"] .addMenu[condition~="noselect"],\
#contentAreaContextMenu[addMenu~="link"]   .addMenu[condition~="nolink"],\
#contentAreaContextMenu[addMenu~="mailto"] .addMenu[condition~="nomailto"],\
#contentAreaContextMenu[addMenu~="image"]  .addMenu[condition~="noimage"],\
#contentAreaContextMenu[addMenu~="canvas"]  .addMenu[condition~="nocanvas"],\
#contentAreaContextMenu[addMenu~="media"]  .addMenu[condition~="nomedia"],\
#contentAreaContextMenu[addMenu~="input"]  .addMenu[condition~="noinput"],\
#contentAreaContextMenu:not([addMenu=""])  .addMenu[condition~="normal"]\
  { display: none; }\
\
.addMenu-insert-point\
  { display: none !important; }\
\
\
.addMenu[url] {\
  list-style-image: url("chrome://mozapps/skin/places/defaultFavicon.png");\
}\
\
.addMenu.exec,\
.addMenu[exec] {\
  list-style-image: url("chrome://browser/skin/aboutSessionRestore-window-icon.png");\
}\
\
.addMenu.copy,\
menuitem.addMenu[text]:not([url]):not([keyword]):not([exec])\
{\
  list-style-image: url("chrome://browser/skin/appmenu-icons.png");\
  -moz-image-region: rect(0pt, 32px, 16px, 16px);\
}\
\
.addMenu.checkbox .menu-iconic-icon {\
  -moz-appearance: checkbox;\
}\
\
.addMenu > .menu-iconic-left {\
  -moz-appearance: menuimage;\
}\
');
