// ==UserScript==
// @name        refererChanger
// @include     main
// @include     chrome://browser/content/browser.xul
// @version     v2014.10.04
// @description 破解图片外链脚本，黑名单、工具菜单版、外置配置 自用DIY版
// @note        添加某站点规则
// ==/UserScript==
// ◆設定方法
//   @NORMAL：不改变referer
//   @FORGE：发送根站点referer
//   @ORIGINAL：发送打开站点referer
//   @BLOCK : 发送空referer

var refererChanger = {};
refererChanger.state = true; /* 启动时是否启用 */
refererChanger.fileName = 'Local\\_refererChange.js';
refererChanger.enabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADdSURBVDhPtVNBCsIwEOwbxH+IR4sYk5RAexP8ki/x6A8EEf8iFi+91IsnnQ3ZkBbTRsGBoTvZnemS0kwpVYI38PUlyVNSQGhuEulDKMAKrfU8S4SUcsY+H+AaO9QtPe3kAGIBT6dbOzUA7/MFQG8GH/0NoHNw5aTFx4AYYD6CZyctkgOKoljyTLiF9/nCAfUW3DhJ+sQz4RZ81gkQQkwxdIeujTETfNo195l0Fg2A+cAa9R7PC+vg3G7BuhPA9Rj/E4DVcmqkAPewCAN++ROZNV1cRUWvMUr4rlLK6g1AWikHrFj7lgAAAABJRU5ErkJggg==";
refererChanger.disabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVDhPnVExDsIwDOwj+AgjC8HJBBsSX+I1PALxFwRiYSkLE5yNHblSWtWcdIp98V3Spss5b8Eb+ImwM6Dx5uccqvUHCGIupSxVmg321QAWiOiIuudVJiZQfT4gpfTWvpepCVRfLQA+GSGvv28QQTiAZ3CztbbjAagP4F5bgc0g4KxSOwDfvwAfMqGwfSOee+P1QQBOOPFqgH6xfaPdwvpBgIfpLfr9ZoBpY/QzUogrAPyHlQ+rMDHAu1rjZrzWlYh2X7nA+NaBJVlNAAAAAElFTkSuQmCC";
refererChanger.sites = {};

refererChanger.init = function() {
	this.reload();
	var src = this.state ? this.enabledSrc : this.disabledSrc;
	var label = this.state ? "破解图片外链已启用" : "破解图片外链已禁用";
	var menuitem = document.createElement('menuitem');
	menuitem.setAttribute('id', 'RefererChanger');
	menuitem.setAttribute('class', 'menuitem-iconic');
	menuitem.setAttribute("tooltiptext", '左键开关、中键重载、右键配置');
	menuitem.setAttribute("label", label);
	menuitem.setAttribute('src', src);
	menuitem.setAttribute('oncommand', 'refererChanger.RCToggle();');
	menuitem.setAttribute('onclick', 'if (event.button == 2) {event.preventDefault();closeMenus(event.currentTarget); refererChanger.edit();}else if(event.button == 1) { event.preventDefault(); refererChanger.reload(true);}');
	document.getElementById('menu_ToolsPopup').appendChild(menuitem);

	var os = Cc['@mozilla.org/observer-service;1'].getService(
	Ci.nsIObserverService);
	os.addObserver(this, 'http-on-modify-request', false);

};
refererChanger.RCToggle = function() {
	this.state = !this.state;
	let menuitem = document.getElementById('RefererChanger');
	try {
		var src = this.state ? this.enabledSrc : this.disabledSrc;
		var label = this.state ? "破解图片外链已启用" : "破解图片外链已禁用";
		menuitem.setAttribute("src", src);
		menuitem.setAttribute("label", label);
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
};

// *********Config End**********
//var statusbarHidden = true;
refererChanger.adjustRef = function (http, site) {
    try {
        var sRef;
        var refAction = undefined;
        for (var i in this.sites) {
            if(site.indexOf(i) != -1){
                refAction = this.sites[i];
                break;
            }
        }

        if (refAction == undefined)
            return true;
        if (refAction.charAt(0) == '@'){
            //下はデバッグ用
            //logs.logStringMessage("ReferrerChanger:  " + http.originalURI.spec + " : "+refAction);
            //logs.logStringMessage("ReferrerChanger:  OriginalReferrer: "+http.referrer.spec);

            switch (refAction){
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
        }else if(refAction.length == 0) {
            return true;
        }else{
            sRef= refAction;
        }
        http.setRequestHeader("Referer", sRef, false);
        if (http.referrer)
            http.referrer.spec = sRef;
        return true;
    } catch (e) {}
    return true;
};

refererChanger.observe = function (aSubject, aTopic, aData) {
    if (aTopic != 'http-on-modify-request') return;
    if (!this.state) return;
    var http = aSubject.QueryInterface(Ci.nsIHttpChannel);
    for (var s = http.URI.host; s != ""; s = s.replace(/^.*?(\.|$)/, "")){
        if (this.adjustRef(http, s))
            return;
    }
    if (http.referrer && http.referrer.host != http.originalURI.host)
        http.setRequestHeader('Referer',
            http.originalURI.spec.replace(/[^/]+$/,''), false);
};

refererChanger.unregister = function () {
    var os = Cc['@mozilla.org/observer-service;1'].getService(
        Ci.nsIObserverService);
    os.removeObserver(this, 'http-on-modify-request', false);
};

var added = false;
if (location == "chrome://browser/content/browser.xul") {
    added = true;
    refererChanger.init();
}
window.addEventListener("unload", function () {
    if (location == "chrome://browser/content/browser.xul")
    if (added)
    refererChanger.unregister();
}, false);

