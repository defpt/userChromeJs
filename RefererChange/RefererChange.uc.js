// ==UserScript==
// @name        refererChanger.uc.js
// @description 破解图片外链脚本，黑名单、工具菜单版、自用DIY版
// @include     main
// @include     chrome://browser/content/browser.xul
// @charset     utf-8
// @version     v2014.10.04
// @note        添加某站点规则
// ==/UserScript==
/* 设置参数：
   @NORMAL：不改变referer
   @FORGE：发送根站点referer
   @ORIGINAL：发送打开站点referer
   @BLOCK : 发送空referer */

var refererChanger = {};
refererChanger.state = true; /* 启动时是否启用 */
refererChanger.enabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADdSURBVDhPtVNBCsIwEOwbxH+IR4sYk5RAexP8ki/x6A8EEf8iFi+91IsnnQ3ZkBbTRsGBoTvZnemS0kwpVYI38PUlyVNSQGhuEulDKMAKrfU8S4SUcsY+H+AaO9QtPe3kAGIBT6dbOzUA7/MFQG8GH/0NoHNw5aTFx4AYYD6CZyctkgOKoljyTLiF9/nCAfUW3DhJ+sQz4RZ81gkQQkwxdIeujTETfNo195l0Fg2A+cAa9R7PC+vg3G7BuhPA9Rj/E4DVcmqkAPewCAN++ROZNV1cRUWvMUr4rlLK6g1AWikHrFj7lgAAAABJRU5ErkJggg==";
refererChanger.disabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVDhPnVExDsIwDOwj+AgjC8HJBBsSX+I1PALxFwRiYSkLE5yNHblSWtWcdIp98V3Spss5b8Eb+ImwM6Dx5uccqvUHCGIupSxVmg321QAWiOiIuudVJiZQfT4gpfTWvpepCVRfLQA+GSGvv28QQTiAZ3CztbbjAagP4F5bgc0g4KxSOwDfvwAfMqGwfSOee+P1QQBOOPFqgH6xfaPdwvpBgIfpLfr9ZoBpY/QzUogrAPyHlQ+rMDHAu1rjZrzWlYh2X7nA+NaBJVlNAAAAAElFTkSuQmCC";

refererChanger.sites = {
	'img.ph.126.net' : '@FORGE',
    'isnowfy.com' : '@FORGE',
    'image.itmedia.co.jp' : '@FORGE',
    '2ch.net' : '@FORGE',
    'imepita.jp' : '@ORIGINAL',
    'tumblr.com' : '@FORGE',
    'photo.store.qq.com' : '@FORGE',
    'img.pconline.com.cn' : '@FORGE',
    'fc2.com' : '@BLOCK',
    'blogs.yahoo.co.jp' : '@BLOCK',
    'hentaiverse.net': '@BLOCK',
    'photo.sina.com.cn':'@BLOCK',
    'qlogo.cn':'@BLOCK',
    'qpic.cn':'@BLOCK',
    'fmn.rrfmn.com' : '@BLOCK',
    'bdstatic.com' : 'http://tieba.baidu.com/',
    'space.wenxuecity.com' : 'http://bbs.wenxuecity.com/',
    'www.autoimg.cn' : 'http://club.autohome.com.cn/',
    'kkkmh.com' : 'http://www.kkkmh.com/',
    'nonie.1ting.com' : 'http://www.1ting.com/',
    'sinaimg.cn' : 'http://blog.sina.com.cn/',
    'yyets.com' : 'http://www.yyets.com/',
    'img.knb.im' : 'http://www.kenengba.com/',
    'tianya.cn' : 'http://bbs.tianya.cn/',
    'baidu-img.cn' : 'http://www.baidu.com/',
    'xici.net' : 'http://www.xici.net/',
    'media.chinagate.com' : 'http://www.wenxuecity.com/',
    'jdstatic.tankr.net' : 'http://jandan.net/',
    'sankakustatic.com' : 'http://chan.sankakucomplex.com/',
	'img.liufen.com': 'http://www.liufen.com.cn/',
    'postimage.org' : '@FORGE',
	'hiphotos.baidu.com' : '@FORGE',
	'hiphotos.bdimg.com' : '@FORGE',
	'img.cnbeta.com' : '@FORGE',
	'imgsrc.baidu.com' : '@FORGE',
	'zol.com.cn' : '@BLOCK',
};

refererChanger.init = function() {
	var src = this.state ? this.enabledSrc : this.disabledSrc;
	var label = this.state ? "破解图片外链已启用" : "破解图片外链已禁用";
	var menuitem = document.createElement('menuitem');
	menuitem.setAttribute('id', 'RefererChanger');
	menuitem.setAttribute('class', 'menuitem-iconic');
	menuitem.setAttribute("tooltiptext", "破解图片外链开关");
	menuitem.setAttribute("label", label);
	menuitem.setAttribute('src', src);
	menuitem.setAttribute('oncommand', 'refererChanger.RCToggle();');
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