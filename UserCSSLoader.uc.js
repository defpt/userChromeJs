// ==UserScript==
// @name           UserCSSLoader
// @description    Stylish样式管理自用微改版
// @namespace      http://d.hatena.ne.jp/Griever/
// @author         Griever
// @include        main
// @license        MIT License
// @compatibility  Firefox 4
// @charset        UTF-8
// @version        0.0.4
// ==/UserScript==
//到about:config里修改 "view_source.editor.path" 以指定编辑器
(function(){

let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
if (!window.Services)
  Cu.import("resource://gre/modules/Services.jsm");

// 起動時に他の窓がある（２窓目の）場合は抜ける
let list = Services.wm.getEnumerator("navigator:browser");
while(list.hasMoreElements()){ if(list.getNext() != window) return; }

if (window.UCL) {
	window.UCL.destroy();
	delete window.UCL;
}

window.UCL = {
	USE_UC: "UC" in window,
	AGENT_SHEET: Ci.nsIStyleSheetService.AGENT_SHEET,
	USER_SHEET : Ci.nsIStyleSheetService.USER_SHEET,
	readCSS    : {},
	optionwin: false,
	get disabled_list() {
		let obj = [];
		try {
			obj = this.prefs.getComplexValue("disabled_list", Ci.nsISupportsString).data.split("|");
		} catch(e) {}
		delete this.disabled_list;
		return this.disabled_list = obj;
	},
	get prefs() {
		delete this.prefs;
		return this.prefs = Services.prefs.getBranch("UserCSSLoader.")
	},
	get styleSheetServices(){
		delete this.styleSheetServices;
		return this.styleSheetServices = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	},
	get FOLDER() {
		let aFolder;
		try {
			// UserCSSLoader.FOLDER があればそれを使う
			let folderPath = this.prefs.getCharPref("FOLDER");
			aFolder = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile)
			aFolder.initWithPath(folderPath);
		} catch (e) {
			aFolder = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
			aFolder.appendRelativePath("CSS");
		}
		if (!aFolder.exists() || !aFolder.isDirectory()) {
			aFolder.create(Ci.nsIFile.DIRECTORY_TYPE, 0664);
		}
		delete this.FOLDER;
		return this.FOLDER = aFolder;
	},
	getFocusedWindow: function() {
		let win = document.commandDispatcher.focusedWindow;
		if (!win || win == window) win = content;
		return win;
	},
	init: function() {
		var opt = document.getElementById("urlbar-icons"); 
		//status-bar  urlbar-icons addon-bar alltabs-button TabsToolbar go-button
	    var menubtn = document.createElement("toolbarbutton");
		menubtn.setAttribute("id", "usercssloader-menu");
		menubtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
        menubtn.setAttribute("label", "CSS 管理");
        //menubtn.setAttribute("tooltiptext", "用户样式管理器");
        menubtn.setAttribute("type", "menu");
        menubtn.setAttribute("removable", "true");
		menubtn.style.listStyleImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANfSURBVDhPbZN/TNRlHMe/CqcX5wFy3HFwnYrA/fYOOXYQIIEcmijtZAlFHGmdAYKAkMmCpQWbK6HC0AIlmRNwbjaMY5WDmkbyo9zEtkpqg6y19WujsvWD5NWXL9Bfvrdn3+3Z83193u/3s0eQB8mIs6gxbdBgtGmINYeTmLoG9w4T23Zaycgxog4OIl0ThiNUiVkZhC1YgVncky1bhhBrCedUXwE9Q17OXS7inTEfzV05FJVb8Xhjyd61jlWCwNEYLX0PWHk33YE/zc7FFBvqlTIEozi5Z9BL/7iPgetPk/uYkfgEK7uf2MOB6oNU7j9AkddLanIyVrWKU04Do1lO3hNBEfIVCAabmq6BQi5/VsbOYhOP5Hn5deY37qWSmlpKIpR8usUludDMOzDbI7g04uPix8U4XRb++vNv6fDk5CStx1tpbj5G19mz3PrmNodeeJFSzSqub00SAYsOdGuDaWjdgu+Qk8LHH2Vubk5aSa5k9EaBrDw9CrGDYpuRREMsx2zrGMlKZGDTIiBEISdro4F0WzS5O7ZL02dnZ/H7/RQU7MJiNbP6PjkepYxOezQj7kQGH4yXypQACXE6Jk4f5PsLR3A7jQxdvSZBlnTnzh/cmJigpuF5dKtDOemI4ZpY4sAm+wLAvj6SK69W8PmZOoZfqyAtwUJj03FGR79mZubuImZBPX2XMMgD+WhzAv1LJTpiohhu3c/Nzmfpb3qKFKMe326BxiMhlJc5qX+ukunp21KseSU77PiTTHwi3oR2pehgHjDSVs1oWyVWw3r0a6N5yC3wVrvA+V4Bp12gvr7p/3JTXC48YUHsWaNBEbB8ATD+Ri3vH30Sb36emPl32tu7yc8vITt7O6WlFUxNTUnTf/n5Jwy2eKo73qb89V6UKvVCB2Mnaxh6eS+Z6WnSwXvp7r+zFBcW4NlXR//0P3SNTRMepV+KUMUXXXXU5meSk51JVVU1J9o66T3vp7u7j5aWV8h52EOur4ZzN37gzPi3tF+9hSryfoQNooMPW/aJMWr47sJhtm00UbZX4HSHwEuNAg3PCCjFzIe7P6B74kfevPIlHcNf0TZ4kzCtDkEWGIA2TEmUKphI8auQyzHEycjIWIF7s4z01EBCxGesizYQqtZKU8PFpRJ/Xh4QwH84nEX73key6wAAAABJRU5ErkJggg==)';
        opt.appendChild(menubtn);
        //opt.insertBefore(menubtn,opt.childNodes[3
    
		var xml = '\
		<menupopup id="usercssloader-menupopup" position="after_end" >\
					<menu label="新建|编辑样式">\
						<menupopup id="usercssloader-submenupopup">\
							<menuitem label="当前站点样式"\
							          oncommand="UCL.create();" />\
							<menuitem label="浏览器样式(Chrome)"\
							          id="usercssloader-test-chrome"\
							          oncommand="UCL.styleTest(window,\'\');" />\
							<menuitem label="站点样式(Web)"\
							          id="usercssloader-test-content"\
							          oncommand="UCL.styleTest(\'\',\'\');" />\
							<menuitem label="为本站搜索样式"\
							          oncommand="UCL.searchStyle();" />\
							<menuseparator id="ucl-sepalator"/>\
						    <menuitem label="编辑userChrome"\
							          hidden="false"\
							          oncommand="UCL.editUserCSS(\'userChrome.css\')" />\
					        <menuitem label="编辑userContent"\
							          hidden="false"\
							          oncommand="UCL.editUserCSS(\'userContent.css\')" />\
						</menupopup>\
					</menu>\
					<menuitem label="打开CSS文件夹"\
							  oncommand="UCL.openFolder();" />\
					<menuitem label="重新加载样式"\
							  oncommand="UCL.rebuild();" />\
					<menu label="(UC扩展).uc.css" hidden="'+ !UCL.USE_UC +'">\
						<menupopup id="usercssloader-ucmenupopup">\
							<menuitem label="Rebuild(.uc.js)"\
							          oncommand="UCL.UCrebuild();" />\
							<menuseparator id="usercssloader-ucsepalator"/>\
						</menupopup>\
					</menu>\
					<menuseparator/>\
				</menupopup>\
		';
		var range = document.createRange();
	  range.selectNodeContents($('usercssloader-menu'));
	  range.collapse(false);
	  range.insertNode(range.createContextualFragment(xml.replace(/\n|\t/g, '')));
	  range.detach();
	  
	  $("mainKeyset").appendChild($C("key", {
			id: "usercssloader-rebuild-key",
			oncommand: "UCL.rebuild();",
			key: "R",
			modifiers: "alt",
		}));

		this.rebuild();
		this.initialized = true;
		if (UCL.USE_UC) {
			setTimeout(function() {
				UCL.UCcreateMenuitem();
			}, 1000);
		}
		window.addEventListener("unload", this, false);
	},
	uninit: function() {
		var dis = [x for(x in this.readCSS) if (!this.readCSS[x].enabled)];
		var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
		str.data = dis.join("|");
		this.prefs.setComplexValue("disabled_list", Ci.nsISupportsString, str);
		window.removeEventListener("unload", this, false);
	},
	destroy: function() {
		var i = document.getElementById("usercssloader-menu");
		if (i) i.parentNode.removeChild(i);
		var i = document.getElementById("usercssloader-rebuild-key");
		if (i) i.parentNode.removeChild(i);
		this.uninit();
	},
	handleEvent: function(event) {
		switch(event.type){
			case "unload": this.uninit(); break;
		}
	},
	rebuild: function() {
		let ext = /\.css$/i;
		let not = /\.uc\.css/i;
		let files = this.FOLDER.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);

		while (files.hasMoreElements()) {
			let file = files.getNext().QueryInterface(Ci.nsIFile);
			if (!ext.test(file.leafName) || not.test(file.leafName)) continue;
			let CSS = this.loadCSS(file);
			CSS.flag = true;
		}
		for (let [leafName, CSS] in Iterator(this.readCSS)) {
			if (!CSS.flag) {
				CSS.enabled = false;
				delete this.readCSS[leafName];
			}
			delete CSS.flag;
			this.rebuildMenu(leafName);
		}
		if (this.initialized)
			XULBrowserWindow.statusTextField.label = "Rebuild 已完成";
	},
	loadCSS: function(aFile) {
		var CSS = this.readCSS[aFile.leafName];
		if (!CSS) {
			CSS = this.readCSS[aFile.leafName] = new CSSEntry(aFile);
			if (this.disabled_list.indexOf(CSS.leafName) === -1) {
				CSS.enabled = true;
			}
		} else if (CSS.enabled) {
			CSS.enabled = true;
		}
		return CSS;
	},
	rebuildMenu: function(aLeafName) {
		var CSS = this.readCSS[aLeafName];
		var menuitem = document.getElementById("usercssloader-" + aLeafName);
		if (!CSS) {
			if (menuitem)
				menuitem.parentNode.removeChild(menuitem);
			return;
		}
		if (!menuitem) {
			menuitem = document.createElement("menuitem");
			menuitem.setAttribute("label", aLeafName);
			menuitem.setAttribute("id", "usercssloader-" + aLeafName);
			menuitem.setAttribute("class", "usercssloader-item " + (CSS.SHEET == this.AGENT_SHEET? "AGENT_SHEET" : "USER_SHEET"));
			menuitem.setAttribute("type", "checkbox");
			menuitem.setAttribute("autocheck", "false");
			menuitem.setAttribute("oncommand", "UCL.toggle('"+ aLeafName +"');");
			menuitem.setAttribute("onclick", "UCL.itemClick(event);");
			document.getElementById("usercssloader-menupopup").appendChild(menuitem);
		}
		menuitem.setAttribute("checked", CSS.enabled);
	},
	toggle: function(aLeafName) {
		var CSS = this.readCSS[aLeafName];
		if (!CSS) return;
		CSS.enabled = !CSS.enabled;
		this.rebuildMenu(aLeafName);
	},
	itemClick: function(event) {
		if (event.button == 0) return;

		event.preventDefault();
		event.stopPropagation();
		let label = event.currentTarget.getAttribute("label");

		if (event.button == 1) {
			this.toggle(label);
		}
		else if (event.button == 2) {
			closeMenus(event.target);
			this.styleTest('',this.getFileFromLeafName(label));
			//this.edit(this.getFileFromLeafName(label));
		}
	},
	getFileFromLeafName: function(aLeafName) {
		let f = this.FOLDER.clone();
		f.QueryInterface(Ci.nsILocalFile); // use appendRelativePath
		f.appendRelativePath(aLeafName);
		return f;
	},
	styleTest: function(aWindow,filenm) {
		if (UCL.optionwin) return;
		UCL.optionwin = true;
		aWindow || (aWindow = this.getFocusedWindow());
		new CSSTester(aWindow, function(tester){
			if (tester.saved)
				UCL.rebuild();
			UCL.optionwin = false;
		},filenm);
	},
	searchStyle: function() {
		let win = this.getFocusedWindow();
		let word = win.location.hostname;
		word = word.replace(/.*\.(.*?)\..*/,'$1')
		openLinkIn("http://userstyles.org/styles/browse/" + word, "tab", {});
	},
	openFolder: function() {
		this.FOLDER.launch();
	},
	editUserCSS: function(aLeafName) {
		let file = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
		file.appendRelativePath(aLeafName);
		this.styleTest('',file);
		//this.edit(file);
	},
	edit: function(aFile) {
		var editor = Services.prefs.getCharPref("view_source.editor.path");
		if (!editor) return alert("缺省的编辑器没有设置 view_source.editor.path 设置不正确 ");
		try {
			var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0? "GB2312": "UTF-8";
			var path = UI.ConvertFromUnicode(aFile.path);
			var app = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			app.initWithPath(editor);
			var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
			process.init(app);
			process.run(false, [path], 1);
		} catch (e) {}
		
	},
	create: function(aLeafName) {
		var aWindow = this.getFocusedWindow();
    var doc = aWindow.document;
    var { host, href } = aWindow.location;
    var code = "@namespace url(" + doc.documentElement.namespaceURI + ");\n";
    code += !host || host.indexOf(".") === -1?
    "@-moz-document url(" + href + ") {\n\n\n\n}":
    "@-moz-document domain(" + host + ") {\n\n\n\n}";
    Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(code);
    if (!aLeafName) aLeafName = prompt("确认新建样式文件吗？", host + ".css");
    if (aLeafName) aLeafName = aLeafName.replace(/\s+/g, " ").replace(/[\\/:*?\"<>|]/g, "");
    if (!aLeafName || !/\S/.test(aLeafName)) return;
    if (!/\.css$/.test(aLeafName)) aLeafName += ".css";
    let file = this.getFileFromLeafName(aLeafName);
    //this.edit(file);
    this.styleTest('',file);
	},
	UCrebuild: function() {
		let re = /^file:.*\.uc\.css(?:\?\d+)?$/i;
		let query = "?" + new Date().getTime();
		Array.slice(document.styleSheets).forEach(function(css){
			if (!re.test(css.href)) return;
			if (css.ownerNode) {
				css.ownerNode.parentNode.removeChild(css.ownerNode);
			}
			let pi = document.createProcessingInstruction('xml-stylesheet','type="text/css" href="'+ css.href.replace(/\?.*/, '') + query +'"');
			document.insertBefore(pi, document.documentElement);
		});
		UCL.UCcreateMenuitem();
	},
	UCcreateMenuitem: function() {
		let sep = $("usercssloader-ucsepalator");
		let popup = sep.parentNode;
		if (sep.nextSibling) {
			let range = document.createRange();
			range.setStartAfter(sep);
			range.setEndAfter(popup.lastChild);
			range.deleteContents();
			range.detach();
		}

		let re = /^file:.*\.uc\.css(?:\?\d+)?$/i;
		Array.slice(document.styleSheets).forEach(function(css) {
			if (!re.test(css.href)) return;
			let fileURL = decodeURIComponent(css.href).split("?")[0];
			let aLeafName = fileURL.split("/").pop();
			let m = document.createElement("menuitem");
			m.setAttribute("label", aLeafName);
			m.setAttribute("tooltiptext", fileURL);
			m.setAttribute("id", "usercssloader-" + aLeafName);
			m.setAttribute("type", "checkbox");
			m.setAttribute("autocheck", "false");
			m.setAttribute("checked", "true");
			m.setAttribute("oncommand", "this.setAttribute('checked', !(this.css.disabled = !this.css.disabled));");
			m.setAttribute("onclick", "UCL.UCItemClick(event);");
			m.css = css;
			popup.appendChild(m);
		});
	},
	UCItemClick: function(event) {
		if (event.button == 0) return;
		event.preventDefault();
		event.stopPropagation();

		if (event.button == 1) {
			event.target.doCommand();
		}
		else if (event.button == 2) {
			closeMenus(event.target);
			let fileURL = event.currentTarget.getAttribute("tooltiptext");
			let file = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getFileFromURLSpec(fileURL);
			this.styleTest('',file);
			//this.edit(file);
		}
	},
};

function CSSEntry(aFile) {
	this.path = aFile.path;
	this.leafName = aFile.leafName;
	this.lastModifiedTime = 1;
	this.SHEET = /^xul-|\.as\.css$/i.test(this.leafName) ? 
		Ci.nsIStyleSheetService.AGENT_SHEET: 
		Ci.nsIStyleSheetService.USER_SHEET;
}
CSSEntry.prototype = {
	sss: Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService),
	_enabled: false,
	get enabled() {
		return this._enabled;
	},
	set enabled(isEnable) {
		var aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile)
		aFile.initWithPath(this.path);
	
		var isExists = aFile.exists(); // ファイルが存在したら true
		var lastModifiedTime = isExists ? aFile.lastModifiedTime : 0;
		var isForced = this.lastModifiedTime != lastModifiedTime; // ファイルに変更があれば true

		var fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(aFile);
		var uri = Services.io.newURI(fileURL, null, null);
		if (this.sss.sheetRegistered(uri, this.SHEET)) {
			// すでにこのファイルが読み込まれている場合
			if (!isEnable || !isExists) {
				this.sss.unregisterSheet(uri, this.SHEET);
			}
			else if (isForced) {
				// 解除後に登録し直す
				this.sss.unregisterSheet(uri, this.SHEET);
				this.sss.loadAndRegisterSheet(uri, this.SHEET);
			}
		} else {
			// このファイルは読み込まれていない
			if (isEnable && isExists) {
				this.sss.loadAndRegisterSheet(uri, this.SHEET);
			}
		}
		if (this.lastModifiedTime !== 1 && isEnable && isForced) {
			log(this.leafName + " 确认已更新。。");
		}
		this.lastModifiedTime = lastModifiedTime;
		return this._enabled = isEnable;
	},
};

function CSSTester(aWindow, aCallback,aFile) {
	this.win = aWindow || window;
	this.doc = this.win.document;
	this.callback = aCallback;
	this.afile = aFile;
	this.init();
}
CSSTester.prototype = {
	sss: Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService),
	preview_code: "",
	saved: false,
	init: function() {
		this.dialog = openDialog(
			"data:text/html;charset=UTF-8,"+encodeURIComponent('<!DOCTYPE HTML><html lang="en-us"><head></head><body></body></html>'),
			"",
			"resizable= false,width=670,height=530,dialog=no");
		this.dialog.addEventListener("load", this, false);
	},
	destroy: function() {
		this.preview_end();
		this.dialog.removeEventListener("unload", this, false);
		this.previewButton.removeEventListener("click", this, false);
		this.saveButton.removeEventListener("click", this, false);
		this.closeButton.removeEventListener("click", this, false);
		this.textbox.removeEventListener( "input", this, false );
		this.textbox.removeEventListener( "scroll", this, false );
	},
	handleEvent: function(event) {
		switch(event.type) {
			case "click":
				if (event.button != 0) return;
				if (this.previewButton == event.currentTarget) {
					this.preview();
				}
				else if (this.saveButton == event.currentTarget) {
					this.save();
				}
				else if (this.closeButton == event.currentTarget) {
					this.dialog.close();
				}
				break;
			case "load":
				var doc = this.dialog.document;
				var oHead = doc.getElementsByTagName('head')[0];
				//oHead.innerHTML = <![CDATA[
				oHead.innerHTML = (function(){/*
				  <meta http-equiv="Content-Type" content="text/html;charset=utf-8"><title>CSSTester</title>
				  <style type="text/css">
				     * {
            	margin: 0;
            	padding: 0;
             }
            html, body, #main{
            	width: 100%;
            	height: 100%;
            }
            #main { 
							border-spacing: 0px; 
							top: 0px !important;
							left: 0px !important;
						}
            body {
            	padding: .5em;
            	-moz-box-sizing: border-box;
            	-webkit-box-sizing: border-box;
            }
            
            .ldt, .ldt label {
            	padding: 2px;
            }
            .ldt, .ldt pre, .ldt textarea {
            	font-size: 16px !important;
            	font-family: monospace !important;
            	color: black;
            }
            .ldt textarea {
            	color: transparent !important;
            	color: rgba(0,0,0,.5) !important;
            }
            .ldt {
            	overflow: auto;
            	position: relative;
            }
            .ldt pre {
            	-moz-padding-start: 1px;
            	top: 0px !important;
            	left: 0px !important;
            	width: 647px !important;
            	height: 463px !important;
            	resize: none !important;
            	overflow: auto !important;
            }
            .ldt label {
            	position: absolute !important;
            	top: 0px !important;
            	left: 0px !important;
            	border: 1px solid #aaa;
            	width: 650px !important;
            	height: 465px !important;
            	display: inline;
            	-moz-box-sizing: border-box;
            	-webkit-box-sizing: border-box;
            	cursor: text;
            	resize: none !important;
            }
            .ldt textarea {
            	margin: 0;
            	padding: 0;
            	top: 0px !important;
            	left: 0px !important;
            	width: 650px !important;
	            height: 465px !important;
            	border: 0px;
            	background: 0;
            	outline: none;
            	resize: none;
            	overflow: hidden;
            }
            #textarea {
            	position: absolute !important;
            	top: 0px !important;
            	left: 0px !important;
            	border: 1px solid #aaa;
            	-moz-box-sizing: border-box;
            	-webkit-box-sizing: border-box;
            	font-size: 16px !important;
            	font-family: monospace; 
            	width: 650px !important;
            	height: 465px !important;
            	overflow: auto !important;
            }
				  </style>
				*/}).toString().replace(/^.+\s/,"").replace(/.+$/,"");
				//]]>.toString();
				//doc.body.innerHTML = <![CDATA[
				doc.body.innerHTML = (function(){/*
				  <table id="main">
						<tr height="100%"> 
							<td colspan="4"><div class="ldt textarea"><pre id="ldt pre"></pre><label><textarea id="textarea" class='' spellcheck='false' wrap="off"></textarea></label></div></td>
						</tr>
						<tr height="25">
							<td><input type="button" value="预览" /></td>
							<td><input type="button" value="保存" /></td>
							<td width="80%"><span class="log"></span></td>
							<td><input type="button" value="关闭" /></td>
						</tr>
					</table>
				*/}).toString().replace(/^.+\s/,"").replace(/.+$/,"");	
				//]]>.toString();
	      var output = doc.getElementById("ldt pre");
	      this.textbox = doc.getElementById("textarea");
	      this.pretext = output;
				
				this.previewButton = doc.querySelector('input[value="预览"]');
				this.saveButton = doc.querySelector('input[value="保存"]');
				this.closeButton = doc.querySelector('input[value="关闭"]');
				this.logField = doc.querySelector('.log');
        if (this.afile) {
        	var code = this.loadText(this.afile);
        	if (!code) {
        		code = "@namespace url(" + this.doc.documentElement.namespaceURI + ");\n";
				    code += this.win.location.protocol.indexOf("http") === 0?
					  "@-moz-document domain(" + this.win.location.host + ") {\n\n\n\n}":
					  "@-moz-document url(" + this.win.location.href + ") {\n\n\n\n}";
        	}
        } else {
				  var code = "@namespace url(" + this.doc.documentElement.namespaceURI + ");\n";
				  code += this.win.location.protocol.indexOf("http") === 0?
					  "@-moz-document domain(" + this.win.location.host + ") {\n\n\n\n}":
					  "@-moz-document url(" + this.win.location.href + ") {\n\n\n\n}";
				}
				this.textbox.value = code;
				this.dialog.addEventListener("unload", this, false);
				this.previewButton.addEventListener("click", this, false);
				this.saveButton.addEventListener("click", this, false);
				this.closeButton.addEventListener("click", this, false);
				this.textbox.addEventListener( "input", this, false );
				this.textbox.addEventListener( "scroll", this, false );
				writetext(this.textbox,this.pretext);
				this.textbox.focus();
				let p = this.textbox.value.length - 3;
				this.textbox.setSelectionRange(p, p);
				break;
			case "unload":
				this.destroy();
				this.callback(this);
				break;
		  case "input":
		    writetext(this.textbox,this.pretext);
		    this.textbox.focus();
		    break;
		  case "scroll":
		    this.pretext.scrollTop = this.textbox.scrollTop;
		    this.pretext.scrollLeft = this.textbox.scrollLeft;
		    this.textbox.scrollTop = this.pretext.scrollTop;
		    this.textbox.scrollLeft = this.pretext.scrollLeft;
		    break;
		}
	},
	preview: function() {
		var code = this.textbox.value;
		if (!code || !/\:/.test(code))
			return;
		code = "data:text/css;charset=utf-8," + encodeURIComponent(this.textbox.value);
		if (code == this.preview_code)
			return;
		this.preview_end();
		var uri = Services.io.newURI(code, null, null);
		this.sss.loadAndRegisterSheet(uri, Ci.nsIStyleSheetService.AGENT_SHEET);
		this.preview_code = code;
		this.log("Preview");
	},
	preview_end: function() {
		if (this.preview_code) {
			let uri = Services.io.newURI(this.preview_code, null, null);
			this.sss.unregisterSheet(uri, Ci.nsIStyleSheetService.AGENT_SHEET);
			this.preview_code = "";
		}
	},
	save: function() {
		var data = this.textbox.value;
		if (!data) return;
    if (this.afile) {
    	var filenm = this.afile;
    } else {
		  var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
		  fp.init(window, "", Ci.nsIFilePicker.modeSave);
		  fp.appendFilter("CSS Files","*.css");
		  fp.defaultExtension = "css";
		  fp.defaultString = this.win.location.host + ".css";
		  if (window.UCL)
			  fp.displayDirectory = UCL.FOLDER;
		  var res = fp.show();
		  if (res != fp.returnOK && res != fp.returnReplace) return;
		  var filenm = fp.file;
    }
		var suConverter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
		suConverter.charset = "UTF-8";
		data = suConverter.ConvertFromUnicode(data);
		var foStream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
		foStream.init(filenm, 0x02 | 0x08 | 0x20, 0664, 0);
		foStream.write(data, data.length);
		foStream.close();
		this.saved = true;
	},
	log: function() {
		this.logField.textContent = new Date().toLocaleFormat("%H:%M:%S") + ": " + $A(arguments);
	},
	loadText: function(aFile) {
		var thpath = aFile.path;
		var aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile)
		aFile.initWithPath(thpath);
		var isExists = aFile.exists(); 
		if (isExists) {
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
  },
  
};

UCL.init();

function $(id) { return document.getElementById(id); }
function $A(arr) Array.slice(arr);
function $C(name, attr) {
	var el = document.createElement(name);
	if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
	return el;
}

function log() { Application.console.log(Array.slice(arguments)); }

var BASE_Style = {
	MlutiComment   : 'color:#080;',
	LineComment    : 'color:#080;',
	DoubleQuotation: 'color:#c11;',
	SingleQuotation: 'color:#c11;',
	URL            : '',
	CDATA          : 'color:#c11;',
};
var CSS_Style = {
	keyword  : 'color:#a09;',
	pseudo   : 'color:#a09;',
	property : 'color:#06a;',
	hougen   : 'color:#06a;',
};
var CSS = {};
var BASE = {};

CSS.keyword = [
"@import","@charset","@media","@font-face","@page","@namespace","@keyframes",
"!important",
"@-moz-document",
];

CSS.pseudo = [
":before",":after",":first-letter",":first-line",
"::before","::after","::first-letter","::first-line","::selection",
":root",":not", ":link",":visited",":active",":focus",":hover",
":target",":enabled",":disabled",":checked",":default",":empty",
":nth-child",":nth-of-type",":first-child",":last-child",":only-child",
":nth-last-child",":nth-last-of-type",
":first-of-type",":last-of-type",":only-of-type",

"::-moz-anonymous-block","::-moz-anonymous-positioned-block",":-moz-any",
":-moz-any-link",":-moz-bound-element",":-moz-broken","::-moz-canvas",
"::-moz-cell-content",":-moz-drag-over",":-moz-first-node","::-moz-focus-inner",
"::-moz-focus-outer",":-moz-focusring",":-moz-full-screen",":-moz-full-screen-ancestor",
":-moz-handler-blocked",":-moz-handler-crashed",":-moz-handler-disabled","::-moz-inline-table",
":-moz-last-node",":-moz-list-bullet",":-moz-list-number",":-moz-loading",
":-moz-locale-dir",":-moz-lwtheme",":-moz-lwtheme-brighttext",":-moz-lwtheme-darktext",
":-moz-math-stretchy",":-moz-math-anonymous",":-moz-only-whitespace","::-moz-page",
"::-moz-page-sequence","::-moz-pagebreak","::-moz-pagecontent",":-moz-placeholder",
":-moz-read-only",":-moz-read-write","::-moz-selection","::-moz-scrolled-canvas",
"::-moz-scrolled-content","::-moz-scrolled-page-sequence",":-moz-suppressed",
":-moz-submit-invalid","::-moz-svg-foreign-content",":-moz-system-metric",
"::-moz-table","::-moz-table-cell","::-moz-table-column","::-moz-table-column-group",
"::-moz-table-outer","::-moz-table-row","::-moz-table-row-group",":-moz-tree-checkbox",
":-moz-tree-cell",":-moz-tree-cell-text",":-moz-tree-column",":-moz-tree-drop-feedback",
":-moz-tree-image",":-moz-tree-indentation",":-moz-tree-line",":-moz-tree-progressmeter",
":-moz-tree-row",":-moz-tree-separator",":-moz-tree-twisty",":-moz-ui-invalidGecko",
":-moz-ui-validGecko",":-moz-user-disabled","::-moz-viewport","::-moz-viewport-scroll",
":-moz-window-inactive","::-moz-xul-anonymous-block"
];

CSS.property = [
"padding","margin","background","font","overflow",
"border","border-radius",
"border-color","border-width","border-style",
"border-top","border-right","border-bottom","border-left",
"outline","-moz-outline-radius","-moz-column-rule",
"-moz-padding-start","-moz-padding-end",
"-moz-margin-start","-moz-margin-end",
"-moz-border-start","-moz-border-end"
];
CSS.hougen = [];
var s = getComputedStyle(document.documentElement, null);
for(var i = 0, p; p = s[i]; i++) {
	p[0] === "-" ? CSS.hougen.push(p) : CSS.property.push(p);
}

CSS.colors = [
'aliceblue','antiquewhite','aqua','aquamarine','azure','beige','bisque','black',
'blanchedalmond','blue','blueviolet','brass','brown','burlywood','cadetblue',
'chartreuse','chocolate','coolcopper','copper','coral','cornflower',
'cornflowerblue','cornsilk','crimson','cyan','darkblue','darkbrown','darkcyan',
'darkgoldenrod','darkgray','darkgreen','darkkhaki','darkmagenta',
'darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen',
'darkslateblue','darkslategray','darkturquoise','darkviolet','deeppink',
'deepskyblue','dimgray','dodgerblue','feldsper','firebrick','floralwhite',
'forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray',
'green','greenyellow','honeydew','hotpink','indianred','indigo','ivory','khaki',
'lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral',
'lightcyan','lightgoldenrodyellow','yellowgreen',

'ActiveBorder','ActiveCaption','AppWorkspace','Background','ButtonFace',
'ButtonHighlight','ButtonShadow','ButtonText','CaptionText','GrayText',
'Highlight','HighlightText','InactiveBorder','InactiveCaption',
'InactiveCaptionText','InfoBackground','InfoText','Menu','MenuText',
'Scrollbar','ThreeDDarkShadow','ThreeDFace','ThreeDHighlight',
'ThreeDLightShadow','ThreeDShadow','Window','WindowFrame','WindowText',

'-moz-activehyperlinktext','-moz-hyperlinktext','-moz-visitedhyperlinktext',
'-moz-buttondefault','-moz-buttonhoverface','-moz-buttonhovertext','-moz-cellhighlight',
'-moz-cellhighlighttext','-moz-field','-moz-fieldtext','-moz-dialog','-moz-dialogtext',
'-moz-dragtargetzone','-moz-mac-accentdarkestshadow','-moz-mac-accentdarkshadow',
'-moz-mac-accentface','-moz-mac-accentlightesthighlight','-moz-mac-accentlightshadow',
'-moz-mac-accentregularhighlight','-moz-mac-accentregularshadow','-moz-mac-chrome-active',
'-moz-mac-chrome-inactive','-moz-mac-focusring','-moz-mac-menuselect','-moz-mac-menushadow',
'-moz-mac-menutextselect','-moz-menuhover','-moz-menuhovertext','-moz-win-communicationstext',
'-moz-win-mediatext','-moz-nativehyperlinktext'
];

var CSS_Words = {};
Object.keys(CSS).forEach(function(key){
	CSS[key].forEach(function(word){
		CSS_Words[word] = key === "colors" ? "color: " + word + ";" : CSS_Style[key];
	});
});

BASE.URL_r      = ['h?t?tps?://\\w+\\.wikipedia\\.org/wiki/[^\\s<]+'
                  ,'(?:h?t?tps?|ftp)://[\\w\\-]+\\.[\\w.\\-]+(?:[\\w#%=~^_?.;:+*/\\-]|&amp\\;)*'
                  ,'(?:chrome|resource)://[\\w/.#()\\-]+'
                  ,'(?:jar:)?file:///\\w:/[\\w/.#()\\-]+'
                  ,'data:\\w+/[a-zA-Z-]+\\;[\\w-]+?\\,[a-zA-Z0-9/+%\\s\\\\]+={0,2}'
                  ].join('|');
BASE.MComment_r = "/\\*[\\s\\S]*?\\*/";
//BASE.SComment_r = "//.*";
BASE.DString_r  = '"(?:[^\\n"\\\\]|\\\\.|\\\\\\n)*"';
BASE.SString_r  = "'(?:[^\\n'\\\\]|\\\\.|\\\\\\n)*'";
//BASE.CDATA_r    = "&lt\\;\\!\\[CDATA\\[[\\s\\S\]*?\\]\\]&gt\\;";
BASE.R_URL = new RegExp(BASE.URL_r, "gm");
CSS.R_ALL = new RegExp([
	BASE.MComment_r
	,BASE.DString_r
	,BASE.SString_r
	,'(?::?:|\\b|@)[a-zA-Z\\-]+\\b'
	,'\\!important\\b'
	,'#[0-9A-Fa-f]{3}[0-9A-Fa-f]{3}?'
].join('|'), "gm");

function parseLink(aText) {
	return aText.replace(BASE.R_URL, function(str){
		var url = str;
		//if (url.indexOf("data:image/") === 0)
		//	return '<img src="'+ url.replace(/\\/g, '') +'" alt="'+ str +'">';

		url = url.replace(/^h?t?tp(s)?/,'http$1');
		return '<a href="'+ url +'" style="'+ BASE_Style.URL +'">'+ str +'</a>';
	});
}

function parse(aText) {
	aText = aText.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
	aText = CSSParser(aText);
	aText = parseLink(aText);
	return aText;
}

function CSSParser(aText) {
	return aText.replace(CSS.R_ALL, function(str, offset, s) {
		if (str.indexOf("/*") === 0) {
			return '<span style="'+ BASE_Style.MlutiComment +'">' + str + '</span>';
		}
		if (str[0] === "'") {
			return '<span style="'+ BASE_Style.DoubleQuotation +'">' + str.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '</span>';
		}
		if (str[0] === '"') {
			return '<span style="'+ BASE_Style.SingleQuotation +'">' + str.replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") + '</span>';
		}
		if (str[0] === '#') {
			return '<span style="color:'+ str +';">' + str + '</span>';
		}
		if (CSS_Words[str]) {
			return '<span style="'+ CSS_Words[str] +'">' + str + '</span>';
		}
		return str;
	});
}

function writetext(textarea,pretext) {
	var inputpre = textarea.value;
	if( inputpre ){
		pretext.innerHTML = '';
		var html = parse(inputpre);
		pretext.innerHTML = html;
	}	else {
		pretext.innerHTML = '';
	}
}

})();

