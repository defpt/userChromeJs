// ==UserScript==
// @name        refererChangerBlacklistVersion
// @include     main
// @include     chrome://browser/content/browser.xul
// @charset      utf-8
// @version     1.0.3
// @description Refererの内容を柔軟に書き換えるUserScriptです。
// ==/UserScript==
var refererChanger = {};
refererChanger.state = true; /* 启动时是否启用 */
refererChanger.fileName = 'Local\\_refererChange.js';
refererChanger.enabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC8SURBVDhPY7i90OM/JRhswP9p8mRh4gxYoocdA+UQBkAFMDTC6B0+mBgojuoCkEIYRuaDFN9s+A8Hb3fBDUF1ATYMs+3VVqhuKMBrAEwTMibJBSBJdBqEQYbAMFQMYQB6GMA0wTCSJqwGfGqRBWOsBqHTSBjDALhB7SGYhsEwSLzHFYxxGoANH090+r8wzPb/ahN5ON40Lek/A4gASSArANHIGKYBWR7DAHRFyBibGAijGEAOhhtAPk76DwAKvrj2Wt5wPAAAAABJRU5ErkJggg==";
refererChanger.disabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVDhPtY7RDcMgDAWzJENkBwaBAUB8swFrMAJiB1emfZYLtFVTFeli5dk++Ugp0S/8X5Bz3oL+EOgAIONaSllAXy7gAOh/Hq61El7vXSQi0MsaDLbWHuv391aApuarC7gxV4YlAJkIPl2hl7YC7/1gJ5qrZhGAEMIiA5zHGAcvBTustXSeJxljBOccHfzhhh7gqsGC7i+CeUizy5gnwRVEcB1HNyOn51aAQn6VAAAAAElFTkSuQmCC";

refererChanger.sites = {

};
refererChanger.init = function() {
	this.reload();
	var src = this.state ? this.enabledSrc : this.disabledSrc;
	var statusbarpanel = document.createElement('button');
	statusbarpanel.setAttribute('id', 'RefererChanger');
	statusbarpanel.setAttribute('class', 'statusbarpanel-iconic');
	statusbarpanel.setAttribute("tooltiptext", '左键：开关外链\n中键：重载配置\n右键：编辑配置');
	statusbarpanel.setAttribute('src', src);
	statusbarpanel.setAttribute('oncommand', 'refererChanger.RCToggle();');
	statusbarpanel.setAttribute('style', 'padding:4px 2px;');
	statusbarpanel.setAttribute('onclick', 'if (event.button == 2) {event.preventDefault();closeMenus(event.currentTarget); refererChanger.edit();}else if(event.button == 1) { event.preventDefault(); refererChanger.reload(true);}');
	document.getElementById('TabsToolbar_aidBar').appendChild(statusbarpanel);

	var os = Cc['@mozilla.org/observer-service;1'].getService(
	Ci.nsIObserverService);
	os.addObserver(this, 'http-on-modify-request', false);

};
refererChanger.RCToggle = function() {
	this.state = !this.state;
	let statusbarpanel = document.getElementById('RefererChanger');
	try {
		var src = this.state ? this.enabledSrc : this.disabledSrc;
		statusbarpanel.setAttribute("src", src);
	} catch (e) {}
};

refererChanger.reload = function(isAlert) {
	var data = this.loadFile(this.fileName);
	if (!data) return;
	var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
	try {
		Cu.evalInSandbox(data, sandbox, "1.8");
	} catch (e) {
		this.alert("Error: " + e + "\n请重新检查配置文件");
		return;
	}
	this.sites = sandbox.sites;
	if (isAlert) this.alert("配置已经重新载入");
};

refererChanger.loadFile = function(aLeafName) {
	var aFile = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIDirectoryService).QueryInterface(Ci.nsIProperties).get('UChrm', Ci.nsILocalFile);
	aFile.appendRelativePath(aLeafName);
	if (!aFile.exists() || !aFile.isFile()) return null;
	var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
	var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
	fstream.init(aFile, -1, 0, 0);
	sstream.init(fstream);
	var data = sstream.read(sstream.available());
	try {
		data = decodeURIComponent(escape(data));
	} catch (e) {}
	sstream.close();
	fstream.close();
	return data;
};
refererChanger.alert = function(aString, aTitle) {
	Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "RefererChanger", aString, false, "", null);
};

refererChanger.edit = function() {
	var aFile = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIDirectoryService).QueryInterface(Ci.nsIProperties).get('UChrm', Ci.nsILocalFile);
	aFile.appendRelativePath(this.fileName);
	if (!aFile || !aFile.exists() || !aFile.isFile()) return;
	var editor;
	try {
		editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
	} catch (e) {
		this.alert("请设置编辑器的路径。\nview_source.editor.path");
		toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
		return;
	}
	var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
	UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "gbk" : "UTF-8";
	var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);

	try {
		var path = UI.ConvertFromUnicode(aFile.path);
		var args = [path];
		process.init(editor);
		process.run(false, args, args.length);
	} catch (e) {
		this.alert("编辑器不正确！")
	}
},
// *********Config End**********
//var statusbarHidden = true;
refererChanger.adjustRef = function(http, site) {
	try {
		var sRef;
		var refAction = undefined;
		for (var i in this.sites) {
			if (site.indexOf(i) != -1) {
				refAction = this.sites[i];
				break;
			}
		}

		if (refAction == undefined) return true;
		if (refAction.charAt(0) == '@') {
			//下はデバッグ用
			//logs.logStringMessage("ReferrerChanger:  " + http.originalURI.spec + " : "+refAction);
			//logs.logStringMessage("ReferrerChanger:  OriginalReferrer: "+http.referrer.spec);

			switch (refAction) {
			case '@NORMAL':
				return true;
				break;
			case '@FORGE':
				sRef = http.URI.scheme + "://" + http.URI.hostPort + "/";
				break;
			case '@BLOCK':
				sRef = "";
				break;
			case '@AUTO':
				return false;
			case '@ORIGINAL':
				sRef = window.content.document.location.href;
				break;
			default:
				//return false;
				break;
			}
		} else if (refAction.length == 0) {
			return true;
		} else {
			sRef = refAction;
		}
		http.setRequestHeader("Referer", sRef, false);
		if (http.referrer) http.referrer.spec = sRef;
		return true;
	} catch (e) {}
	return true;
};

refererChanger.observe = function(aSubject, aTopic, aData) {
	if (aTopic != 'http-on-modify-request') return;
	if (!this.state) return;
	var http = aSubject.QueryInterface(Ci.nsIHttpChannel);
	for (var s = http.URI.host; s != ""; s = s.replace(/^.*?(\.|$)/, "")) {
		if (this.adjustRef(http, s)) return;
	}
	if (http.referrer && http.referrer.host != http.originalURI.host) http.setRequestHeader('Referer', http.originalURI.spec.replace(/[^/]+$/, ''), false);
};

refererChanger.unregister = function() {
	var os = Cc['@mozilla.org/observer-service;1'].getService(
	Ci.nsIObserverService);
	os.removeObserver(this, 'http-on-modify-request', false);
};

var added = false;
if (location == "chrome://browser/content/browser.xul") {
	added = true;
	refererChanger.init();
}
window.addEventListener("unload", function() {
	if (location == "chrome://browser/content/browser.xul") if (added) refererChanger.unregister();
}, false);