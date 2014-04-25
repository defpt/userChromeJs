// ==UserScript==
// @name           quickProxyModokiMod.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    快速代理设置
// @include        main
// @compatibility  Firefox 3.0 3.5 3.6 3.7a1pre  WinXP
// @charset        UTF-8
// @author         Alice0775
// @note           自用修改版 by defpt
// @version        2012/01/31 11:00 by Alice0775  12.0a1 about:newtab
// @note           左键：打开代理 中键：设置默认状态 右键：代理设置UI
// ==/UserScript==

(function (css) {
	if (window.quickProxy) {
		window.quickProxy.destroy();
		delete window.quickProxy;
	}

	var quickProxy = {
		optionInTab : true,
		optionDelay : 800,
		//-- config --
		_init : function () {
			var overlay = '\
						<overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" \
							xmlns:html="http://www.w3.org/1999/xhtml"> \
						 <toolbarpalette id="urlbar-icons">\
							<image id="quickproxy-status" label="quickproxySwitch" \
									onclick="quickProxy._click(event);" \
									tooltiptext="" >\
				                 </image>\
				            </toolbarpalette>\
				        </overlay>';
			overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8," + encodeURI(overlay);
			window.userChrome_js.loadOverlay(overlay, quickProxy);
			addStyle(css);

			quickProxy.addPrefListener(quickProxy.buttonPrefListener); // 登録処理
			window.addEventListener('unload', function () {
				quickProxy.removePrefListener(quickProxy.buttonPrefListener);
			}, false);
		},

		observe : function (subject, topic, data) {
			if (topic == "xul-overlay-merged") {
				var icon = document.getElementById("quickproxy-status");
				var qp_autooff = quickProxy.getPref('quickproxy.autooff', 'bool', false);
				var Is_Proxy_On = quickProxy.getPref("network.proxy.type", 'int', 0);
				quickProxy.addPrefListener(quickProxy.buttonPrefListener); // 登録処理
				window.addEventListener('unload', function () {
					quickProxy.removePrefListener(quickProxy.buttonPrefListener);
				}, false);
				if (qp_autooff == true && quickProxy.getNumberOfWindow() == 1) {
					Is_Proxy_On = 0
				}
				quickProxy.setPref("network.proxy.type", 'int', Is_Proxy_On);

				quickProxy._updateUI();
				//Application.console.log("quickProxy界面加载完毕！");
			}
		},

		getNumberOfWindow : function () {
			var mediator = Components.classes["@mozilla.org/appshell/window-mediator;1"]
				.getService(Components.interfaces.nsIWindowMediator);
			var enumerator = mediator.getEnumerator("navigator:browser");
			var num = 0;
			while (enumerator.hasMoreElements()) {
				var win = enumerator.getNext();
				num++;
			}
			return num;
		},

		_switch : function () {
			var Is_Proxy_On = this.getPref("network.proxy.type", 'int', 0);
			var Proxy_Type = this.getPref("quickproxy.type", 'int', 1);
			if (Is_Proxy_On == 0) {
				Is_Proxy_On = Proxy_Type;
			} else {
				Is_Proxy_On = 0;
			}
			this.setPref("network.proxy.type", 'int', Is_Proxy_On);
			this._updateUI();
		},

		_click : function (e) {
			if (e.button == 0) {
				this._switch();
			}
			if (e.button == 2) {
				gBrowser.selectedTab = gBrowser.addTab("chrome://browser/content/preferences/connection.xul");
			}
			if (e.button == 1) {
				var qp_autooff = this.getPref('quickproxy.autooff', 'bool', true);
				var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
					.getService(Components.interfaces.nsIPromptService);
				var check = {
					value : qp_autooff
				};
				prompts.alertCheck(window, 'Window title', '',
					"启动时设置为禁用代理", check); //起動時は常にプロキシはオフ
				this.setPref('quickproxy.autooff', 'bool', check.value);
			}
			e.preventDefault();
		},

		optionOnload : function (w, prefBack) {
			alert(2)
			this.setPref("browser.preferences.instantApply", "bool", prefBack);
			w.gAdvancedPane.showConnections();
		},

		_updateUI : function () {
			var Is_Proxy_On = this.getPref("network.proxy.type", 'int', 0);
			var icon = document.getElementById("quickproxy-status");
			var text1 = "";
			switch (Is_Proxy_On) {
			case 0:
			case 3:
				icon.setAttribute("state", "disable");
				icon.setAttribute("tooltiptext", "代理已关闭\n左键：打开代理\n中键：设置默认状态\n右键：代理设置 UI");
				return;
			case 1:
				var ip = this.getPref("network.proxy.http", "str", "");
				var port = this.getPref("network.proxy.http_port", "int", 0);
				text1 = "\n当前代理：" + ip + ":" + port;
				break;
			case 2:
				text1 = "\n当前状态：自动代理配置(PAC)";
				break;
			case 4:
				text1 = "\n当前状态：自动检测此网络的代理设置";
				break;
			case 5:
				text1 = "\n当前状态：使用系统代理设置";
				break;
			}
			icon.setAttribute("state", "enable");
			icon.setAttribute("tooltiptext", "代理已打开" + text1 + "\n左键：打开代理\n中键：设置默认状态\n右键：代理设置 UI");
		},

		getPref : function (aPrefString, aPrefType, aDefault) {
			var xpPref = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefBranch);
			try {
				switch (aPrefType) {
				case "str":
					return xpPref.getCharPref(aPrefString).toString();
					break;
				case "int":
					return xpPref.getIntPref(aPrefString);
					break;
				case "bool":
				default:
					return xpPref.getBoolPref(aPrefString);
					break;
				}
			} catch (e) {}
			return aDefault;
		},

		setPref : function (aPrefString, aPrefType, aValue) {
			var xpPref = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefBranch);
			try {
				switch (aPrefType) {
				case "str":
					return xpPref.setCharPref(aPrefString, aValue);
					break;
				case "int":
					aValue = parseInt(aValue);
					return xpPref.setIntPref(aPrefString, aValue);
					break;
				case "bool":
				default:
					return xpPref.setBoolPref(aPrefString, aValue);
					break;
				}
			} catch (e) {}
			return null;
		},
		// 監視を開始する
		addPrefListener : function (aObserver) {
			try {
				var pbi = Components.classes['@mozilla.org/preferences;1'].getService(Components.interfaces.nsIPrefBranch2);
				pbi.addObserver(aObserver.domain, aObserver, false);
			} catch (e) {}
		},

		// 監視を終了する
		removePrefListener : function (aObserver) {
			try {
				var pbi = Components.classes['@mozilla.org/preferences;1'].getService(Components.interfaces.nsIPrefBranch2);
				pbi.removeObserver(aObserver.domain, aObserver);
			} catch (e) {}
		},

		buttonPrefListener : {
			domain : 'network.proxy.type',
			//"grabScroll.XXX"という名前の設定が変更された場合全てで処理を行う

			observe : function (aSubject, aTopic, aPrefstring) {
				if (aTopic == 'nsPref:changed') {
					// 設定が変更された時の処理
					var type = quickProxy.getPref(aPrefstring, 'int', 0);
					if (type != 0)
						quickProxy.setPref("quickproxy.type", 'int', type);
					quickProxy._updateUI();
				}
			}
		}
	}
	quickProxy._init();
	window.quickProxy = quickProxy;

	function addStyle(css) {
		var pi = document.createProcessingInstruction(
				'xml-stylesheet',
				'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"');
		return document.insertBefore(pi, document.documentElement);
	}

})('\
	#quickproxy-status {\
		list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACtSURBVDhPtZLRDcIwDEQzBFOwRCrEJkh8lVHYCJHRii7xpc7FleCDJ0XN3dluUjX9hbUsG5bJAWZryVezZvaiNuTxupy911Yw4F7yybYVDgDIvP4avIknaHo/2SFawCa/LBqJ7gofT16v+u/lhn3FF+uykqAmPy1q+NDrGv5K1Oy9KO8wxLcwq3tsUt05CtRX3YmCqUgIczU5lL7qCQT+l9YG1RP4STT0DWNzSh+/vPJ+zsBLfwAAAABJRU5ErkJggg==");\
	}\
	#quickproxy-status[state="disable"] {\
	  list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACpSURBVDhPtZLRDcIwDEQ9BFPwVVFG6CbM05FpwOZsOWdXgg+eFMl3Z6dJFfkLY5WhC3LCs3GXDVYlmrDJscg1e7a6Dd7BBaWhjSgty/pr9Et+AtM4gYVncIMP5YVoprur+qjtelofqzy0NryxW2gpPc+b7Ig+5DBrC3+lG85elwce6r+AFZ4PsQ7OAvZZB11Qmog2Z9M3dZ91AWE8aR5gXdBHwmEemIdFXgyA2y0tFxR1AAAAAElFTkSuQmCC");\
	}\
	');
