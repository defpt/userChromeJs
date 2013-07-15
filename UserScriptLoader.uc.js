// ==UserScript==
// @name           UserScriptLoader.uc.js
// @description    Greasemonkey っぽいもの
// @namespace      http://d.hatena.ne.jp/Griever/
// @include        main
// @compatibility  Firefox 5.0
// @charset        UTF-8
// @license        MIT License  
// @note           modified by lastdream2013: add switch: reload page on disable/enable script 2013.05.12
// @note           modified by lastdream2013: add GM_notification API 2013.05.05 
// @note           modified by lastdream2013: fix compatibility for firefox23a1 2013.04.23  
// @note           by dannylee edited 2013.4.9
// @note           0.1.8.2 
// ==/UserScript==

(function (css) {

const GLOBAL_EXCLUDES = [
	"chrome:*"
	,"jar:*"
	,"resource:*"
];


const { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
if (!window.Services) Cu.import("resource://gre/modules/Services.jsm");

if (window.USL) {
	window.USL.destroy();
	delete window.USL;
}

var USL = {};

// Class
USL.PrefManager = function (str) {
	var root = 'UserScriptLoader.';
	if (str)
		root += str;
	this.pref = Services.prefs.getBranch(root);
};
USL.PrefManager.prototype = {
	setValue: function(name, value) {
		try {
			switch(typeof value) {
				case 'string' :
					var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
					str.data = value;
					this.pref.setComplexValue(name, Ci.nsISupportsString, str);
					break;
				case 'number' : this.pref.setIntPref(name, value); break;
				case 'boolean': this.pref.setBoolPref(name, value); break;
			}
		} catch(e) { }
	},
	getValue: function(name, defaultValue){
		var value = defaultValue;
		try {
			switch(this.pref.getPrefType(name)) {
				case Ci.nsIPrefBranch.PREF_STRING: value = this.pref.getComplexValue(name, Ci.nsISupportsString).data; break;
				case Ci.nsIPrefBranch.PREF_INT   : value = this.pref.getIntPref(name); break;
				case Ci.nsIPrefBranch.PREF_BOOL  : value = this.pref.getBoolPref(name); break;
			}
		} catch(e) { }
		return value;
	},
	deleteValue: function(name) {
		try {
			this.pref.deleteBranch(name);
		} catch(e) { }
	},
	listValues: function() {this.pref.getChildList("", {});}
};

USL.ScriptEntry = function (aFile) {
	this.init.apply(this, arguments);
};
USL.ScriptEntry.prototype = {
	includeRegExp: /^https?:\/\/.*/,
	excludeRegExp: /^$/,
	init: function(aFile) {
		this.file = aFile;
		this.leafName = aFile.leafName;
		this.path = aFile.path;
		this.lastModifiedTime = aFile.lastModifiedTime;
		this.code = USL.loadText(aFile);
		this.getMetadata();
		this.disabled = false;
		this.requireSrc = "";
		this.resources = {};

		this.run_at = "run-at" in this.metadata ? this.metadata["run-at"][0] : "document-end";
		this.name = "name" in this.metadata ? this.metadata.name[0] : this.leafName;
		if (this.metadata.delay) {
			let delay = parseInt(this.metadata.delay[0], 10);
			this.delay = isNaN(delay) ? 0 : Math.max(delay, 0);
		} else if (this.run_at === "document-idle") {
			this.delay = 0;
		}
		if (this.metadata.match) {
			this.includeRegExp = this.createRegExp(this.metadata.match, true);
			this.includeTLD = this.isTLD(this.metadata.match);
		} else if (this.metadata.include) {
			this.includeRegExp = this.createRegExp(this.metadata.include);
			this.includeTLD = this.isTLD(this.metadata.include);
		}
		if (this.metadata.unmatch) {
			this.excludeRegExp = this.createRegExp(this.metadata.unmatch, true);
			this.excludeTLD = this.isTLD(this.metadata.unmatch);
		} else if (this.metadata.exclude) {
			this.excludeRegExp = this.createRegExp(this.metadata.exclude);
			this.excludeTLD = this.isTLD(this.metadata.exclude);
		}

		this.prefName = 'scriptival.' + (this.metadata.namespace || 'nonamespace/') + '/' + this.name + '.';
		this.__defineGetter__('pref', function() {
			delete this.pref;
			return this.pref = new USL.PrefManager(this.prefName);
		});

		if (this.metadata.resource) {
			this.metadata.resource.forEach(function(r){
				let res = r.split(/\s+/);
				this.resources[res[0]] = { url: res[1] };
			}, this);
		}

		this.getRequire();
		this.getResource();
	},
	getMetadata: function() {
		this.metadata = {};
		let m = this.code.match(/\/\/\s*==UserScript==[\s\S]+?\/\/\s*==\/UserScript==/);
		if (!m)
			return;
		m = (m+'').split(/[\r\n]+/);
		for (let i = 0; i < m.length; i++) {
			if (!/\/\/\s*?@(\S+)($|\s+([^\r\n]+))/.test(m[i]))
				continue;
			let name  = RegExp.$1.toLowerCase().trim();
			let value = RegExp.$3;
			if (this.metadata[name]) {
				this.metadata[name].push(value);
			} else {
				this.metadata[name] = [value];
			}
		}
	},
	createRegExp: function(urlarray, isMatch) {
		let regstr = urlarray.map(function(url) {
			url = url.replace(/([()[\]{}|+.,^$?\\])/g, "\\$1");
			if (isMatch) {
				url = url.replace(/\*+|:\/\/\*\\\./g, function(str, index, full){
					if (str === "\\^") return "(?:^|$|\\b)";
					if (str === "://*\\.") return "://(?:[^/]+\\.)?";
					if (str[0] === "*" && index === 0) return "(?:https?|ftp|file)";
					if (str[0] === "*") return ".*";
					return str;
				});
			} else {
				url = url.replace(/\*+/g, ".*");
				url = url.replace(/^\.\*\:?\/\//, "https?://");
				url = url.replace(/^\.\*/, "https?:.*");
			}
			//url = url.replace(/^([^:]*?:\/\/[^\/\*]+)\.tld\b/,"$1\.(?:com|net|org|info|(?:(?:co|ne|or)\\.)?jp)");
			//url = url.replace(/\.tld\//,"\.(?:com|net|org|info|(?:(?:co|ne|or)\\.)?jp)/");
			return "^" + url + "$";
		}).join('|');
		return new RegExp(regstr);
	},
	isTLD: function(urlarray) {
		return urlarray.some(function(url) /^.+?:\/{2,3}?[^\/]+\.tld\b/.test(url));
	},
	makeTLDURL: function(aURL) {
		try {
			var uri = Services.io.newURI(aURL, null, null);
			uri.host = uri.host.slice(0, -Services.eTLD.getPublicSuffix(uri).length) + "tld";
			return uri.spec;
		} catch (e) {}
		return "";
	},
	isURLMatching: function(url) {
		if (this.excludeRegExp.test(url)) return false;
		
		var tldurl = this.excludeTLD || this.includeTLD ? this.makeTLDURL(url) : "";
		if (this.excludeTLD && tldurl && this.excludeRegExp.test(tldurl)) return false;
		if (this.includeRegExp.test(url)) return true;
		if (this.includeTLD && tldurl && this.includeRegExp.test(tldurl)) return true;
		return false;
	},
	getResource: function() {
		if (!this.metadata.resource) return;
		var self = this;
		for (let [name, aaa] in Iterator(this.resources)) {
			let obj = aaa;
			let url = obj.url;
			let aFile = USL.REQUIRES_FOLDER.clone();
			aFile.QueryInterface(Ci.nsILocalFile);
			aFile.appendRelativePath(encodeURIComponent(url));
			if (aFile.exists() && aFile.isFile()) {
				let fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(aFile);
				USL.getLocalFileContents(fileURL, function(bytes, contentType){
					let ascii = /^text|javascript/.test(contentType);
					if (ascii) {
						try { bytes = decodeURIComponent(escape(bytes)); } catch(e) {}
					}
					obj.bytes = bytes;
					obj.contentType = contentType;
				});
				continue;
			}
			USL.getContents(url, function(bytes, contentType){
				let ascii = /^text|javascript/.test(contentType);
				if (ascii) {
					try { bytes = decodeURIComponent(escape(bytes)); } catch(e) {}
				}
				let data = ascii ? USL.saveText(aFile, bytes) : USL.saveFile(aFile, bytes);
				obj.bytes = data;
				obj.contentType = contentType;
			});
		}
	},
	getRequire: function() {
		if (!this.metadata.require) return;
		var self = this;
		this.metadata.require.forEach(function(url){
			let aFile = USL.REQUIRES_FOLDER.clone();
			aFile.QueryInterface(Ci.nsILocalFile);
			aFile.appendRelativePath(encodeURIComponent(url));
			if (aFile.exists() && aFile.isFile()) {
				self.requireSrc += USL.loadText(aFile) + ";\r\n";
				return;
			}
			USL.getContents(url, function(bytes, contentType){
				let ascii = /^text|javascript/.test(contentType);
				if (ascii) {
					try { bytes = decodeURIComponent(escape(bytes)); } catch(e) {}
				}
				let data = ascii ? USL.saveText(aFile, bytes) : USL.saveFile(aFile, bytes);
				self.requireSrc += data + ';\r\n';
			});
		}, this);
	},
};

USL.Console = function Console() {};
USL.Console.prototype = {
	__exposedProps__: {
		log: "r",
		dir: "r",
		time: "r",
		timeEnd: "r",
	},
	log: function(str){ Application.console.log(str); },
	dir: function(obj){ window.inspectObject? inspectObject(obj): this.log(obj); },
	time: function(name) { this['_' + name] = new Date().getTime(); },
	timeEnd: function(name) {
		if (typeof this['_' + name] == 'undefined')
			return this.log('timeEnd: Error' + name);
		this.log(name + ':' + (new Date().getTime() - this['_' + name]));
		delete this['_' + name];
	},
	__noSuchMethod__: function(id, args){ this.log('console.' + id + ' is not function'); }
};

USL.API = function(script, sandbox, win, doc) {
	var self = this;

	this.GM_log = function() {
		Services.console.logStringMessage("["+ script.name +"] " + Array.slice(arguments).join(", "));
	};

	this.GM_notification = function (aMsg, aTitle, aIconURL, aCallback) {
	if  (!USL.ALLOW_NOTIFY)  return;
		if (aCallback)
			var callback = {
				observe : function (subject, topic, data) {
					if ("alertclickcallback" != topic)
						return;
					aCallback.call(null);
				}
			}
		else
			callback = null;
		var alertsService = Components.classes["@mozilla.org/alerts-service;1"]
			.getService(Components.interfaces.nsIAlertsService);
		alertsService.showAlertNotification(
			aIconURL || "chrome://global/skin/icons/information-32.png", aTitle || "UserScriptLoader-notification", aMsg + "", !!callback, "", callback);
	};
	
	this.GM_xmlhttpRequest = function(obj) {
		if(typeof(obj) != 'object' || (typeof(obj.url) != 'string' && !(obj.url instanceof String))) return;

		var baseURI = Services.io.newURI(win.location.href, null, null);
		obj.url = Services.io.newURI(obj.url, null, baseURI).spec;
		var req = new XMLHttpRequest();
		req.open(obj.method || 'GET',obj.url,true);
		if(typeof(obj.headers) == 'object') for(var i in obj.headers) req.setRequestHeader(i,obj.headers[i]);
		['onload','onerror','onreadystatechange'].forEach(function(k) {
			if(obj[k] && (typeof(obj[k]) == 'function' || obj[k] instanceof Function)) req[k] = function() {
				obj[k]({
					__exposedProps__: {
						status: "r",
						statusText: "r",
						responseHeaders: "r",
						responseText: "rw",
						readyState: "r",
						finalUrl: "r"
					},
					status          : (req.readyState == 4) ? req.status : 0,
					statusText      : (req.readyState == 4) ? req.statusText : '',
					responseHeaders : (req.readyState == 4) ? req.getAllResponseHeaders() : '',
					responseText    : req.responseText,
					readyState      : req.readyState,
					finalUrl        : (req.readyState == 4) ? req.channel.URI.spec : '' });
			};
		});

		if(obj.overrideMimeType) req.overrideMimeType(obj.overrideMimeType);
		var c = 0;
		var timer = setInterval(function() { if(req.readyState == 1 || ++c > 100) { clearInterval(timer); req.send(obj.data || null); } },10);
		USL.debug(script.name + ' GM_xmlhttpRequest ' + obj.url);
	};

	this.GM_addStyle = function GM_addStyle(code) {
		var head = doc.getElementsByTagName('head')[0];
		if (head) {
			var style = doc.createElement('style');
			style.type = 'text/css';
			style.appendChild(doc.createTextNode(code+''));
			head.appendChild(style);
			return style;
		}
	};

	this.GM_setValue = function(name, value) {
		return USL.USE_STORAGE_NAME.indexOf(name) >= 0?
			USL.database.pref[script.prefName + name] = value:
			script.pref.setValue(name, value);
	};

	this.GM_getValue = function(name, def) {
		return USL.USE_STORAGE_NAME.indexOf(name) >= 0?
			USL.database.pref[script.prefName + name] || def:
			script.pref.getValue(name, def);
	};

	this.GM_listValues = function() {
		var p = script.pref.listValues();
		var s = [x for(x in USL.database.pref[script.prefName + name])];
		s.forEach(function(e, i, a) a[i] = e.replace(script.prefName, ''));
		p.push.apply(p, s);
		return p;
	};

	this.GM_deleteValue = function(name) {
		return USL.USE_STORAGE_NAME.indexOf(name) >= 0?
			delete USL.database.pref[script.prefName + name]:
			script.pref.deleteValue(name);
	};

	this.GM_registerMenuCommand = function(label, func, aAccelKey, aAccelModifiers, aAccessKey) {
		let uuid = self.GM_generateUUID();
		win.USL_registerCommands[uuid] = {
			label: label,
			func: func,
			accelKey: aAccelKey,
			accelModifiers: aAccelModifiers,
			accessKey: aAccessKey,
			tooltiptext: script.name
		};
		return uuid;
	};
	
	this.GM_unregisterMenuCommand = function(aUUID) {
		return delete win.USL_registerCommands[aUUID];
	};

	this.GM_enableMenuCommand = function(aUUID) {
		let item = win.USL_registerCommands[aUUID];
		if (item) delete item.disabled;
	};
	
	this.GM_disableMenuCommand = function(aUUID) {
		let item = win.USL_registerCommands[aUUID];
		if (item) item.disabled = "true";
	};

	this.GM_getResourceText = function(name) {
		let obj = script.resources[name];
		if (obj) return obj.bytes;
	};

	this.GM_getResourceURL = function(name) {
		let obj = script.resources[name];
		try {
			if (obj) return 'data:' + obj.contentType + ';base64,' + btoa(obj.bytes);
		} catch (e) {
			USL.error(e);
		}
	};

	this.GM_getMetadata = function(key) {
		return script.metadata[key] ? script.metadata[key].slice() : void 0;
	};
};
USL.API.prototype = {
	GM_openInTab: function(url, loadInBackground, reuseTab) {
		openLinkIn(url, loadInBackground ? "tabshifted" : "tab", {});
	},
	GM_setClipboard: function(str) {
		if (str.constructor === String || str.constructor === Number) {
			Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(str);
		}
	},
	GM_safeHTMLParser: function(code) {
		let HTMLNS = "http://www.w3.org/1999/xhtml";
		let gUnescapeHTML = Cc["@mozilla.org/feed-unescapehtml;1"].getService(Ci.nsIScriptableUnescapeHTML);
		let doc = document.implementation.createDocument(HTMLNS, "html", null);
		let body = document.createElementNS(HTMLNS, "body");
		doc.documentElement.appendChild(body);
		body.appendChild(gUnescapeHTML.parseFragment(code, false, null, body));
		return doc;
	},
	GM_generateUUID: function() {
		return Cc["@mozilla.org/uuid-generator;1"].getService(Ci.nsIUUIDGenerator).generateUUID().toString();
	},
};


USL.database = { pref: {}, resource: {} };
USL.readScripts = [];
USL.USE_STORAGE_NAME = ['cache', 'cacheInfo'];
USL.initialized = false;
USL.isready = false;
USL.eventName = "USL_DocumentStart" + Math.random();

USL.__defineGetter__("pref", function(){
	delete this.pref;
	return this.pref = new USL.PrefManager();
});

USL.__defineGetter__("SCRIPTS_FOLDER", function(){
	let folderPath = this.pref.getValue('SCRIPTS_FOLDER', "");
	let aFolder = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile)
	if (!folderPath) {
		aFolder.initWithPath(Services.dirsvc.get("UChrm", Ci.nsIFile).path);
		aFolder.appendRelativePath('UserScriptLoader');
	} else {
		aFolder.initWithPath(folderPath);
	}
	if ( !aFolder.exists() || !aFolder.isDirectory() ) {
		aFolder.create(Ci.nsIFile.DIRECTORY_TYPE, 0664);
	}
	delete this.SCRIPTS_FOLDER;
	return this.SCRIPTS_FOLDER = aFolder;
});

USL.__defineGetter__("REQUIRES_FOLDER", function(){
	let aFolder = this.SCRIPTS_FOLDER.clone();
	aFolder.QueryInterface(Ci.nsILocalFile);
	aFolder.appendRelativePath('require');
	if ( !aFolder.exists() || !aFolder.isDirectory() ) {
		aFolder.create(Ci.nsIFile.DIRECTORY_TYPE, 0664);
	}
	delete this.REQUIRES_FOLDER;
	return this.REQUIRES_FOLDER = aFolder;
});

USL.__defineGetter__("EDITOR", function(){
	delete this.EDITOR;
	return this.EDITOR = this.pref.getValue('EDITOR', "") || Services.prefs.getCharPref("view_source.editor.path");
});

USL.__defineGetter__("disabled_scripts", function(){
	let ds = this.pref.getValue('script.disabled', '');
	delete this.disabled_scripts;
	return this.disabled_scripts = ds? ds.split('|') : [];
});

USL.__defineGetter__("GLOBAL_EXCLUDES_REGEXP", function(){
	let regexp = null;
	let ge = USL.pref.getValue('GLOBAL_EXCLUDES', null);
	ge = ge ? ge.trim().split(/\s*\,\s*/) : GLOBAL_EXCLUDES;
	try {
		regexp = new RegExp(ge.map(USL.wildcardToRegExpStr).join("|"));
	} catch (e) {
		regexp = /^(?:chrome|resource|jar):/;
	}
	delete this.GLOBAL_EXCLUDES_REGEXP;
	return this.GLOBAL_EXCLUDES_REGEXP = regexp;
});

var DISABLED = true;
USL.__defineGetter__("disabled", function() DISABLED);
USL.__defineSetter__("disabled", function(bool){
	if (bool) {
		this.icon.setAttribute("state", "disable");
		this.icon.setAttribute("tooltiptext", "UserScriptLoader已禁用");
		gBrowser.mPanelContainer.removeEventListener(USL.eventName, this, false);
	} else {
		this.icon.setAttribute("state", "enable");
		this.icon.setAttribute("tooltiptext", "UserScriptLoader已启用");
		gBrowser.mPanelContainer.addEventListener(USL.eventName, this, false);
	}
	return DISABLED = bool;
});

var DEBUG = USL.pref.getValue('DEBUG', false);
USL.__defineGetter__("DEBUG", function() DEBUG);
USL.__defineSetter__("DEBUG", function(bool) {
	DEBUG = !!bool;
	let elem = $("UserScriptLoader-debug-mode");
	if (elem) elem.setAttribute("checked", DEBUG);
	return bool;
});

var HIDE_EXCLUDE = USL.pref.getValue('HIDE_EXCLUDE', false);
USL.__defineGetter__("HIDE_EXCLUDE", function() HIDE_EXCLUDE);
USL.__defineSetter__("HIDE_EXCLUDE", function(bool){
	HIDE_EXCLUDE = !!bool;
	let elem = $("UserScriptLoader-hide-exclude");
	if (elem) elem.setAttribute("checked", HIDE_EXCLUDE);
	return bool;
});

var ALLOW_NOTIFY = USL.pref.getValue('ALLOW_NOTIFY', true);
USL.__defineGetter__("ALLOW_NOTIFY", function() ALLOW_NOTIFY);
USL.__defineSetter__("ALLOW_NOTIFY", function(bool){
	ALLOW_NOTIFY = !!bool;
	let elem = $("UserScriptLoader-allow-notify");
	if (elem) elem.setAttribute("checked", ALLOW_NOTIFY);
	return bool;
});

var AUTO_RELOAD_PAGE = USL.pref.getValue('AUTO_RELOAD_PAGE', true);
USL.__defineGetter__("AUTO_RELOAD_PAGE", function() AUTO_RELOAD_PAGE);
USL.__defineSetter__("AUTO_RELOAD_PAGE", function(bool){
	AUTO_RELOAD_PAGE = !!bool;
	let elem = $("UserScriptLoader-auto-reload-page");
	if (elem) elem.setAttribute("checked", AUTO_RELOAD_PAGE);
	return bool;
});

var CACHE_SCRIPT = USL.pref.getValue('CACHE_SCRIPT', true);
USL.__defineGetter__("CACHE_SCRIPT", function() CACHE_SCRIPT);
USL.__defineSetter__("CACHE_SCRIPT", function(bool){
	CACHE_SCRIPT = !!bool;
	let elem = $("UserScriptLoader-cache-script");
	if (elem) elem.setAttribute("checked", CACHE_SCRIPT);
	return bool;
});

USL.getFocusedWindow = function () {
	var win = document.commandDispatcher.focusedWindow;
	return (!win || win == window) ? content : win;
};
//urlbar-icons  TabsToolbar  addon-bar PlacesToolbar nav-bar
USL.init = function(){
	  USL.isready = false;
	   var overlay = '\
		<overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" \
			xmlns:html="http://www.w3.org/1999/xhtml"> \
		 <toolbarpalette id="nav-bar">\
			<toolbarbutton id="UserScriptLoader-icon" \
			        label="UserScriptLoader" \
					class="toolbarbutton-1 chromeclass-toolbar-additional" \
					type="menu" \
					onclick="USL.iconClick(event);" \
					tooltiptext="油猴脚本管理器（鼠标右键开 | 关)" >\
		<menupopup id="UserScriptLoader-popup" \
		           position="after_end"\
		           onpopupshowing="USL.onPopupShowing(event);"\
		           onpopuphidden="USL.onPopupHidden(event);"\
		           onclick="USL.menuClick(event);">\
			<menuseparator id="UserScriptLoader-menuseparator"/>\
			<menuitem label="重新加载脚本"\
					          oncommand="USL.rebuild();" />\
			<menuitem label="打开脚本目录"\
					  id="UserScriptLoader-openFolderMenu"\
					  oncommand="USL.openFolder();" />\
			<menu label="用户脚本命令"\
			      id="UserScriptLoader-register-menu">\
				<menupopup id="UserScriptLoader-register-popup"/>\
			</menu>\
			<menu label="其它选项设置" id="UserScriptLoader-submenu">\
				<menupopup id="UserScriptLoader-submenu-popup">\
					<menuitem label="删除系统pref预加载"\
					          oncommand="USL.deleteStorage(\'pref\');" />\
					<menuitem label="为本站搜索脚本"\
		                 id="UserScriptLoader-find-script"\
				         oncommand="USL.findscripts();" />\
					<menuitem label="隐藏未触发脚本"\
					          id="UserScriptLoader-hide-exclude"\
					          type="checkbox"\
					          checked="' + USL.HIDE_EXCLUDE + '"\
					          oncommand="USL.HIDE_EXCLUDE = !USL.HIDE_EXCLUDE;" />\
					<menuseparator/>\
					<menuitem label="缓存脚本"\
					          id="UserScriptLoader-cache-script"\
					          type="checkbox"\
					          checked="' + USL.CACHE_SCRIPT + '"\
					          oncommand="USL.CACHE_SCRIPT = !USL.CACHE_SCRIPT;" />\
					<menuitem label="切换到调试模式"\
					          id="UserScriptLoader-debug-mode"\
					          type="checkbox"\
					          checked="' + USL.DEBUG + '"\
					          oncommand="USL.DEBUG = !USL.DEBUG;" />\
					<menuitem label="允许脚本弹窗通知"\
					          id="UserScriptLoader-allow-notify"\
					          type="checkbox"\
					          checked="' + USL.ALLOW_NOTIFY + '"\
					          oncommand="USL.ALLOW_NOTIFY = !USL.ALLOW_NOTIFY;" />\
					<menuitem label="启动/禁用脚本时自动刷新页面"\
					          id="UserScriptLoader-auto-reload-page"\
					          type="checkbox"\
					          checked="' + USL.AUTO_RELOAD_PAGE + '"\
					          oncommand="USL.AUTO_RELOAD_PAGE = !USL.AUTO_RELOAD_PAGE;" />\
				</menupopup>\
			</menu>\
			<menuitem label="保存当前页面的脚本"\
			          id="UserScriptLoader-saveMenu"\
			          oncommand="USL.saveScript();"/>\
              		</menupopup>\
                 </toolbarbutton>\
            </toolbarpalette>\
        </overlay>';
  overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8," + encodeURI(overlay);
  window.userChrome_js.loadOverlay(overlay, USL);
	USL.style = addStyle(css);
};

USL.loadconfig = function () {
  USL.loadSetting();
  USL.icon          = $('UserScriptLoader-icon');
	USL.popup         = $('UserScriptLoader-popup');
	USL.menuseparator = $('UserScriptLoader-menuseparator');
	USL.registMenu    = $('UserScriptLoader-register-menu');
	USL.saveMenu      = $('UserScriptLoader-saveMenu');

	USL.rebuild();
	USL.disabled = USL.pref.getValue('disabled', false);
	window.addEventListener('unload', USL, false);
	Services.obs.addObserver(USL, "content-document-global-created", false);
	USL.debug('observer start');
	USL.initialized = true;
};

USL.uninit = function () {
	window.removeEventListener('unload', USL, false);
	Services.obs.removeObserver(USL, "content-document-global-created");
	USL.debug('observer end');
	USL.saveSetting();
};

USL.destroy = function () {
	window.removeEventListener('unload', USL, false);
	Services.obs.removeObserver(USL, "content-document-global-created");
	USL.log('observer end');

	let disabledScripts = [x.leafName for each(x in USL.readScripts) if (x.disabled)];
	USL.pref.setValue('script.disabled', disabledScripts.join('|'));
	USL.pref.setValue('disabled', USL.disabled);
	USL.pref.setValue('HIDE_EXCLUDE', USL.HIDE_EXCLUDE);
	USL.pref.setValue('ALLOW_NOTIFY', USL.ALLOW_NOTIFY);
	USL.pref.setValue('AUTO_RELOAD_PAGE', USL.AUTO_RELOAD_PAGE);
	
	var e = document.getElementById("UserScriptLoader-icon");
	if (e) e.parentNode.removeChild(e);
	var e = document.getElementById("UserScriptLoader-popup");
	if (e) e.parentNode.removeChild(e);
	if (USL.style) USL.style.parentNode.removeChild(USL.style);
	USL.disabled = true;
};

USL.handleEvent = function (event) {
	switch(event.type) {
		case USL.eventName:
			var win = event.target.defaultView;
			win.USL_registerCommands = {};
			win.USL_run = [];
			win.USL_match = [];
			if (USL.disabled) return;
			if (USL.readScripts.length === 0) return;
			this.injectScripts(win);
			break;
		case "unload":
			this.uninit();
			break;
	}
};

USL.observe = function (subject, topic, data) {
	if (topic === "content-document-global-created") {
		var doc = subject.document;
		var evt = doc.createEvent("Events");
		evt.initEvent(USL.eventName, true, false);
		doc.dispatchEvent(evt);
	}
	if (topic == "xul-overlay-merged") {
		if (!USL.isready) {
		  USL.isready = true;
		  USL.loadconfig();
		}
	}
};

USL.createMenuitem = function () {
	if (USL.popup.firstChild != USL.menuseparator) {
		var range = document.createRange();
		range.setStartBefore(USL.popup.firstChild);
		range.setEndBefore(USL.menuseparator);
		range.deleteContents();
		range.detach();
	}
	USL.readScripts.forEach(function(script){
		let m = document.createElement('menuitem');
		m.setAttribute('label', script.name);
		m.setAttribute("class", "UserScriptLoader-item");
		m.setAttribute('checked', !script.disabled);
		m.setAttribute('type', 'checkbox');
		m.setAttribute('oncommand', 'this.script.disabled = !this.script.disabled;if(USL.AUTO_RELOAD_PAGE)BrowserReload();');
		m.script = script;
		USL.popup.insertBefore(m, USL.menuseparator);
	});
};

USL.rebuild = function() {
	USL.disabled_scripts = [x.leafName for each(x in USL.readScripts) if (x.disabled)];
	USL.pref.setValue('script.disabled', USL.disabled_scripts.join('|'));

	let newScripts = [];
	let ext = /\.user\.js$/i;
	let files = USL.SCRIPTS_FOLDER.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);

	while (files.hasMoreElements()) {
		let file = files.getNext().QueryInterface(Ci.nsIFile);
		if (!ext.test(file.leafName)) continue;
		let script = loadScript(file);
		newScripts.push(script);
	}
	USL.readScripts = newScripts;
	USL.createMenuitem();

	function loadScript(aFile) {
		var script,
		    leafName = aFile.leafName,
		    lastModifiedTime = aFile.lastModifiedTime;
		USL.readScripts.some(function(s, i){
			if (s.leafName === leafName) {
				if (s.lastModifiedTime !== lastModifiedTime && USL.initialized) {
					USL.log(s.name + " reload.");
					return true;
				}
				script = s;
				return true;
			}
		});

		if (!script) {
			script = new USL.ScriptEntry(aFile);
			if (USL.disabled_scripts.indexOf(leafName) !== -1)
				script.disabled = true;
		}
		return script;
	}
};

USL.reloadScripts = function() {
	USL.readScripts.forEach(function(script){
		let aFile = script.file;
		if (aFile.exists() && script.lastModifiedTime !== aFile.lastModifiedTimeOfLink) {
			script.init(aFile);
			USL.log(script.name + " reload.");
		}
	});
};

USL.openFolder = function() {
	USL.SCRIPTS_FOLDER.launch();
};

USL.saveScript = function() {
	var win = USL.getFocusedWindow();
	var doc = win.document;
	var name = /\/\/\s*@name\s+(.*)/i.exec(doc.body.textContent);
  var filename = (name && name[1] ? name[1] : win.location.href.split("/").pop()).replace(/\.user\.js$|$/i, ".user.js").replace(/\s/g, '_').toLowerCase();
  
	// https://developer.mozilla.org/ja/XUL_Tutorial/Open_and_Save_Dialogs
	var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
	fp.init(window, "", Ci.nsIFilePicker.modeSave);
	fp.appendFilter("JS Files","*.js");
	fp.appendFilters(Ci.nsIFilePicker.filterAll);
	fp.displayDirectory = USL.SCRIPTS_FOLDER; // nsILocalFile
	fp.defaultExtension = "js";
	fp.defaultString = filename;
	var callbackObj = {
		done: function(res) {
			if (res != fp.returnOK && res != fp.returnReplace) return;

			var wbp = Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist);
			wbp.persistFlags = wbp.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;
			var uri = doc.documentURIObject;
			var loadContext = win.QueryInterface(Ci.nsIInterfaceRequestor)
				.getInterface(Ci.nsIWebNavigation)
				.QueryInterface(Ci.nsILoadContext);
			wbp.saveURI(uri, null, uri, null, null, fp.file, loadContext);
		}
	}
	fp.open(callbackObj);
};

USL.deleteStorage = function(type) {
	var data = USL.database[type];
	var list = [x for(x in data)];
	if (list.length == 0)
		return alert(type + ' is none.');

	list.push('All ' + type);
	var selected = {};
	var ok = Services.prompt.select(
		window, "UserScriptLoader " + type, "Select delete URL.", list.length, list, selected);

	if (!ok) return;
	if (selected.value == list.length -1) {
		list.pop();
		list.forEach(function(url, i, a) {
			delete data[url]
		});
		return;
	}
	delete data[list[selected.value]];
};

USL.onPopupShowing = function(event) {
	var win = USL.getFocusedWindow();
	var popup = event.target;

	switch(popup.id) {
		case 'UserScriptLoader-popup':
			let run = win.USL_run, match = win.USL_match;
			Array.slice(popup.children).some(function(menuitem){
				if (!menuitem.classList.contains("UserScriptLoader-item")) return true;
				let index_run = run ? run.indexOf(menuitem.script) : -1,
				    index_match = match ? match.indexOf(menuitem.script) : -1;
				menuitem.style.fontWeight = index_run !== -1 ? "bold" : "";
				menuitem.hidden = USL.HIDE_EXCLUDE && index_match === -1;
			});
			USL.saveMenu.hidden = !(/\.user\.js$/.test(win.document.location.href) && /javascript|plain/.test(win.document.contentType));
			b:if (win.USL_registerCommands) {
				for (let n in win.USL_registerCommands) {
					USL.registMenu.disabled = false;
					break b;
				}
				USL.registMenu.disabled = true;
			} else {
				USL.registMenu.disabled = true;
			}
			break;

		case 'UserScriptLoader-register-popup':
			var registers = win.USL_registerCommands;
			if (!registers) return;
			for (let [uuid, item] in Iterator(registers)) {
				let m = document.createElement('menuitem');
				m.setAttribute('label', item.label);
				m.setAttribute('tooltiptext', item.tooltiptext);
				m.setAttribute('oncommand', 'this.registCommand();');
				if (item.accessKey)
					m.setAttribute("accesskey", item.accessKey);
				if (item.disabled)
					m.setAttribute("disabled", item.disabled);
				m.registCommand = item.func;
				popup.appendChild(m);
			}
			break;
	}
};

USL.onPopupHidden = function(event) {
	var popup = event.target;
	switch(popup.id) {
		case 'UserScriptLoader-register-popup':
			var child = popup.firstChild;
			while (child && child.localName == 'menuitem') {
				popup.removeChild(child);
				child = popup.firstChild;
			}
			break;
	}
};

USL.menuClick = function(event){
	var menuitem = event.target;
	if (event.button == 0 || menuitem.getAttribute('type') != 'checkbox')
		return;

	event.preventDefault();
	event.stopPropagation();
	if (event.button == 1) {
		menuitem.doCommand();
		menuitem.setAttribute('checked', menuitem.getAttribute('checked') == 'true'? 'false' : 'true');
	} else if (event.button == 2 && USL.EDITOR && menuitem.script) {
		USL.edit(menuitem.script.path);
	}
};

USL.edit = function(path) {
	if (!USL.EDITOR) return;
	try {
		var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
		UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0? "GB2312": "UTF-8";
		path = UI.ConvertFromUnicode(path);
		var app = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
		app.initWithPath(USL.EDITOR);
		var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
		process.init(app);
		process.run(false, [path], 1);
	} catch (e) {}
};

USL.iconClick = function(event){
	if (event.target != USL.icon) return;
	if (event.button == 2) {
		event.preventDefault();
		USL.disabled = !USL.disabled;
		USL.pref.setValue('disabled', USL.disabled);
	} else if (event.button == 1) {
		USL.rebuild();
	}
};

USL.retryInject = function(safeWin) {
	function func(event) {
		safeWin.removeEventListener("readystatechange", func, true);
		if (event.target.URL === "about:blank") return;
		USL.injectScripts(event.target.defaultView, true);
	}
	safeWin.addEventListener("readystatechange", func, true);
};

USL.injectScripts = function(safeWindow, rsflag) {
	var aDocument = safeWindow.document;
	var locationHref = safeWindow.location.href;

	// document-start でフレームを開いた際にちょっとおかしいので…
	if (!rsflag && locationHref == "" && safeWindow.frameElement)
		return USL.retryInject(safeWindow);
	// target="_blank" で about:blank 状態で開かれるので…
	if (!rsflag && locationHref == 'about:blank')
		return USL.retryInject(safeWindow);

	if (USL.GLOBAL_EXCLUDES_REGEXP.test(locationHref)) return;

	if (!USL.CACHE_SCRIPT)
		USL.reloadScripts();

	var console = new USL.Console();
	var documentEnds = [];
	var windowLoads = [];

	USL.readScripts.filter(function(script, index) {
		//if (!/^(?:https?|data|file|chrome):/.test(locationHref)) return;
		if (!script.isURLMatching(locationHref)) return false;
		if ("noframes" in script && 
		    safeWindow.frameElement && 
		    !(safeWindow.frameElement instanceof HTMLFrameElement))
			return false;
			
		safeWindow.USL_match.push(script);
		if (script.disabled) return false;
		
		if (script.run_at === "document-start") {
			"delay" in script ? safeWindow.setTimeout(run, script.delay, script) : run(script)
		} else if (script.run_at === "window-load") {
			windowLoads.push(script);
		} else {
			documentEnds.push(script);
		}
	});
	if (documentEnds.length) {
		aDocument.addEventListener("DOMContentLoaded", function(event){
			event.currentTarget.removeEventListener(event.type, arguments.callee, false);
			documentEnds.forEach(function(s) "delay" in s ? 
				safeWindow.setTimeout(run, s.delay, s) : run(s));
		}, false);
	}
	if (windowLoads.length) {
		safeWindow.addEventListener("load", function(event) {
			event.currentTarget.removeEventListener(event.type, arguments.callee, false);
			windowLoads.forEach(function(s) "delay" in s ? 
				safeWindow.setTimeout(run, s.delay, s) : run(s));
		}, false);
	}

	function run(script) {
		if (safeWindow.USL_run.indexOf(script) >= 0) {
			USL.debug('DABUTTAYO!!!!! ' + script.name + locationHref);
			return false;
		}
		if ("bookmarklet" in script.metadata) {
			let func = new Function(script.code);
			safeWindow.location.href = "javascript:" + encodeURIComponent(func.toSource()) + "();";
			safeWindow.USL_run.push(script);
			return;
		}

		let sandbox = new Cu.Sandbox(safeWindow, {sandboxPrototype: safeWindow});
		let GM_API = new USL.API(script, sandbox, safeWindow, aDocument);
		for (let n in GM_API)
			sandbox[n] = GM_API[n];

		sandbox.XPathResult  = Ci.nsIDOMXPathResult;
		sandbox.unsafeWindow = safeWindow.wrappedJSObject;
		sandbox.document     = safeWindow.document;
		sandbox.console      = console;
		sandbox.window       = safeWindow;

		sandbox.__proto__ = safeWindow;
		USL.evalInSandbox(script, sandbox);
		safeWindow.USL_run.push(script);
	}
};

USL.evalInSandbox = function(aScript, aSandbox) {
	try{
		var lineFinder = new Error();
		Cu.evalInSandbox('(function() {' + aScript.requireSrc + '\r\n' + aScript.code + '\r\n})();', aSandbox, "1.8");
	} catch(e) {
		let line = e.lineNumber - lineFinder.lineNumber - aScript.requireSrc.split("\n").length;
		USL.error(aScript.name + ' / line:' + line + "\n" + e);
	}
};

USL.log = function() {
	Services.console.logStringMessage("[USL] " + Array.slice(arguments));
};

USL.debug = function() {
	if (USL.DEBUG) Services.console.logStringMessage('[USL DEBUG] ' + Array.slice(arguments));
};

USL.error = function() {
	var err = Cc["@mozilla.org/scripterror;1"].createInstance(Ci.nsIScriptError);
	err.init(Array.slice(arguments), null, null, null, null, err.errorFlag, null);
	Services.console.logMessage(err);
};

USL.loadText = function(aFile) {
	var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
	var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
	fstream.init(aFile, -1, 0, 0);
	sstream.init(fstream);
	var data = sstream.read(sstream.available());
	try { data = decodeURIComponent(escape(data)); } catch(e) {}
	sstream.close();
	fstream.close();
	return data;
};

USL.loadBinary = function(aFile){
	var istream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
	istream.init(aFile, -1, -1, false);
	var bstream = Cc["@mozilla.org/binaryinputstream;1"].createInstance(Ci.nsIBinaryInputStream);
	bstream.setInputStream(istream);
	return bstream.readBytes(bstream.available());
};

USL.saveText = function(aFile, data) {
	var suConverter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
	suConverter.charset = "UTF-8";
	data = suConverter.ConvertFromUnicode(data);
	return USL.saveFile(aFile, data);
};

USL.saveFile = function (aFile, data) {
	var foStream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
	foStream.init(aFile, 0x02 | 0x08 | 0x20, 0664, 0);
	foStream.write(data, data.length);
	foStream.close();
	return data;
};

USL.loadSetting = function() {
	try {
		var aFile = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
		aFile.appendRelativePath("Local\\UserScriptLoader.json");
		var data = USL.loadText(aFile);
		data = JSON.parse(data);
		USL.database.pref = data.pref;
		//USL.database.resource = data.resource;
		USL.debug('loaded UserScriptLoader.json');
	} catch(e) {
		USL.debug('can not load UserScriptLoader.json');
	}
};

USL.saveSetting = function() {
	let disabledScripts = [x.leafName for each(x in USL.readScripts) if (x.disabled)];
	USL.pref.setValue('script.disabled', disabledScripts.join('|'));
	USL.pref.setValue('disabled', USL.disabled);
	USL.pref.setValue('HIDE_EXCLUDE', USL.HIDE_EXCLUDE);
	USL.pref.setValue('ALLOW_NOTIFY', USL.ALLOW_NOTIFY);
	USL.pref.setValue('AUTO_RELOAD_PAGE', USL.AUTO_RELOAD_PAGE);
	USL.pref.setValue('CACHE_SCRIPT', USL.CACHE_SCRIPT);
	USL.pref.setValue('DEBUG', USL.DEBUG);

	var aFile = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
	aFile.appendRelativePath("Local\\UserScriptLoader.json");
	USL.saveText(aFile, JSON.stringify(USL.database));
};

USL.getContents = function(aURL, aCallback){
	try {
		urlSecurityCheck(aURL, gBrowser.contentPrincipal, Ci.nsIScriptSecurityManager.DISALLOW_INHERIT_PRINCIPAL);
	} catch(ex) {
		return;
	}
	var uri = Services.io.newURI(aURL, null, null);
	if (uri.scheme != 'http' && uri.scheme != 'https')
		return USL.error('getContents is "http" or "https" only');

	let aFile = USL.REQUIRES_FOLDER.clone();
	aFile.QueryInterface(Ci.nsILocalFile);
	aFile.appendRelativePath(encodeURIComponent(aURL));

	var wbp = Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist);
	wbp.persistFlags &= ~Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_NO_CONVERSION;
	if (aCallback) {
		wbp.progressListener = {
			onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
				if (aStateFlags & Ci.nsIWebProgressListener.STATE_STOP){
					let channel = aRequest.QueryInterface(Ci.nsIHttpChannel);
					let bytes = USL.loadBinary(aFile);
					aCallback(bytes, channel.contentType);
					return;
				}
			},
			onLocationChange: function(aProgress, aRequest, aURI){},
			onProgressChange: function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {},
			onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) {},
			onSecurityChange: function(aWebProgress, aRequest, aState) {},
			onLinkIconAvailable: function(aIconURL) {},
		}
	}
	wbp.saveURI(uri, null, null, null, null, aFile, null);
	USL.debug("getContents: " + aURL);
};

USL.getLocalFileContents = function(aURL, callback) {
	var channel = Services.io.newChannel(aURL, null, null);
	if (channel.URI.scheme != 'file')
		return USL.error('getLocalFileContents is "file" only');

	var input = channel.open();
	var binaryStream = Cc['@mozilla.org/binaryinputstream;1'].createInstance(Ci.nsIBinaryInputStream);
	binaryStream.setInputStream(input);
	var bytes = binaryStream.readBytes(input.available());
	binaryStream.close();
	input.close();
	callback(bytes, channel.contentType);
};

USL.wildcardToRegExpStr = function(urlstr) {
	if (urlstr instanceof RegExp) return urlstr.source;
	let reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str){
		return str === "*" ? ".*" : "[^/]*";
	});
	return "^" + reg + "$";
};

USL.findscripts = function() {
	var wins = USL.getFocusedWindow();
  var href = wins.location.href;
  var p=0;			//for number of "."
  var f= new Array(); 
  var q=2; 
  var t=1; 
  var a=0; 
  var y;
  var o;
  var m=4;
  var stringa; //= new Array();
  var re = /(?:[a-z0-9-]+\.)+[a-z]{2,4}/;
  href=href.match(re); //extract the url part 
  href=href.toString();
  //get the places and nunbers of the "."
  for (var i=0;i<href.length;i++){
 		if (href[i]=="."){
 				f[p]=i;
				p++ ;		
	  } 
  }
  if (p==t){  
    stringa=href.substring(a,f[0]);

  }
	else if  (p==q){
	  stringa=href.substring(++f[0],f[1]);
	}
 	else {
 		stringa=href.substring(++f[0],f[2]);
	}
  //openLinkIn("http://www.google.com/search?btnG=Google+Search&q=site:userscripts.org+inurl:scripts+inurl:show+"+ stringa, "tab", {});	
	openLinkIn("http://userscripts.org/scripts/search?q="+ stringa + "&submit=Search",  "tab", {});	
};

USL.init();
window.USL = USL;


function log(str) { Application.console.log(Array.slice(arguments)); }
function debug() { if (USL.DEBUG) Application.console.log('[USL DEBUG] ' + Array.slice(arguments));}

function $(id) document.getElementById(id);
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
})('\
/* http://www.famfamfam.com/lab/icons/silk/preview.php */\
#UserScriptLoader-icon {\
	list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALtSURBVDhPjdN7SFNRHAfwYyUkvUDNJAqCiBKCoCglLM25xNxSsxBnKmYvKF2upXOZGptztpfTq6ZOzXJhUGlmuagZrSwzTVdb4TPSYpgPMDDNzG93g2aWQn/84N5zf7/POb9zzyFKtuP0/4aatQh/j9kA0zvT1FxBBZJjOQGkWuxH+oU7yXiGDyn68/u8QCFdSLHIS7k/GUv3IRB4E1iBbCa5IWUQymg2/pwXoIKIpiCIjKoDCdJ96cJdBBLmQtvSFQEO4xf3EOp37j8Atc+hrCLCZfI2dwOuRLuCClqA0vBlaJD6oqkgGDdPbfqpZjnq0nYT7nlvkmQHhN4kQeJPlGVxq0ffVsWir0GIzjvxqEvegsY8NiwvMjHQlImeeh6uJWyckoSsmJBHrpmwAbQIFcf9u5S1dPKxIgCW5yIMtsgx0paLz4ZMWJrk+NSswGCrEgMvs9BYdAg54atQLdkLa60NqM5kQh3uhteVsfjy6hJa9OmgSo7A/EwBwyMxki4dhL4m2YaYarjIOuAG6vSWGeDymW0Q7XdGi/YYnaSC5mo89hz3gUwVi8KKROzgbEdqegiG2yn06i9AGbUegtDVM0DK/rVTaWxXvLkdj+E2NWTySKzc6gyROAYazVms2+EOqYiDEWMh3UY29LmhOO3n9NW+idGei815JzymPzakYqBZifaHEkgyOGh5qMaAuQp3tanoeJqDfoMMbdd56LyXCGnYyj47wPUiKdpzXt+7dQI8yI5B130xvXn5GHpdiqG2cvQ/pdCqFaLiFAs6WRQ6aEAW4m6xA9aTVRzn8a2rno9aCQd5h32RH8UAFemP4qP76Hf6OYaBW6IIdNQL0ECFge/n1DULEDKWfHigCkbPoxQYa5LwvDIRT8q5aKzkofVmMrr1GeilWzQUR0AU6jJmNLXPvkxWRMBcbinle04bSiJhqk7A+zo+zLU8NGuPQ6cKQfHJzT9S6ImsxbOO8p9hvbLWPzNX/J2rZDtO/wLIbGc98IvR+AAAAABJRU5ErkJggg==");\
}\
#UserScriptLoader-icon[state="disable"] {\
	list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJdSURBVDhPlZPLS6JhFMbnn2nXv+DCVWZ2w7xhGxOJbjO50BTMaBOSIGGCF0Zb1CIhGS+EoqCJhJe8UDZuZjEws2jdQGM15TPvOcNYxriYxeF87/u95/c973PO906r1fb+I/B2jwHX19dP/wqVSmWam5v7NDk5+X1sbKwrl8uDr98PBYg9k4iqUqm8m5iYgCim6M7Ozkanp6d97Xb7eShArD+KuFWr1aBimUwGUcjSBbAr1PhenR0EiOfI4uLio91ux9LSEhXBaDRib28P4XAYVqv1WaPRZMbHxz8IRdY+QCzez8zMeFZWVm5jsRiKxSJOT0+xvb2NUCiEarWKWq2GbDZLkCedTne/sLBw/xcAsXgQkh99Ph8qlQqazSYuLy9xfn7OhRcXF2i1WpwjkQgMBgPcbjcrZMDu7i5vRqNRNBoN/pLX60WpVEI6nYbT6QQpI0gqlYJer4fZbH4BWCwWiLsxgA6RbDLR5XIhEAiwmTabDVdXVygUCjCZTPy+DxAL6jkSiQRL39nZwcjICLa2tuD3+zE6OsrPon18DdoTvv0QtX9MlEgkn9fW1npkXr1eRy6Xw+bmJudOp4OjoyO+DnlycnKCTCaD+fn5b32AVCq1OxyOByqgu1OmL5Eakl0ul7lwY2MD+/v7DBA+3PQBNFmrq6s/yTyPx8MzsLy8zJnMoixazGbTmWAwCDHWXwYACoXiK7Uxn8+z08fHxzg8POQcj8fZvLOzM26jmIM7oWzwZyLI1NTUjZjC3sHBAZLJJLeQBoq6Q/D19fVf9CEqHhjlN8HtGRJvzmp7vwFji4ZDlVnnwQAAAABJRU5ErkJggg==");\
}\
');