// ==UserScript==
// @name                 Mousegestures.uc.js
// @namespace            Mousegestures@gmail.com
// @description          自定义鼠标手持，订阅修改自紫云飞代码
// @author               defpt
// @charset              UTF-8
location == "chrome://browser/content/browser.xul" && (function () {
	ucjsMouseGestures = {
		lastX: 0,
		lastY: 0,
		sourceNode: "",
		directionChain: "",
		isMouseDownL: false,
		isMouseDownR: false,
		hideFireContext: false,
		shouldFireContext: false,
		GESTURES: {
			//强制转到页首
			"U" : {
				name : "转到页首",
				cmd : function () {
					goDoCommand('cmd_scrollTop');
				}
			},
			//强制转到页尾
			"D" : {
				name : "转到页尾",
				cmd : function (gestures, event) {
					goDoCommand('cmd_scrollBottom');
				}
			},
			//后退
			"L" : {
				name : "后退",
				cmd : function () {
				getWebNavigation().canGoBack && getWebNavigation().goBack();
				}
			},
			//前进
			"R" : {
				name : "前进",
				cmd : function () {
				getWebNavigation().canGoForward && getWebNavigation().goForward();
				}
			},
			//刷新当前页面
			"UD" : {
				name : "刷新当前页面",
				cmd : function () {
					gBrowser.mCurrentBrowser.reload();
				}
			},
			//刷新当前页面,故意重复，这个容易误识别
			"URD" : {
				name : "刷新当前页面",
				cmd : function () {
					gBrowser.mCurrentBrowser.reload();
				}
			},
			//激活左边的标签页
			"UL" : {
				name : "激活左边的标签页",
				cmd : function () {
					gBrowser.tabContainer.advanceSelectedTab(-1, true);
				}
			},
			//激活右边的标签页
			"UR" : {
				name : "激活右边的标签页",
				cmd : function () {
					gBrowser.tabContainer.advanceSelectedTab(1, true);
				}
			},
			//跳过缓存刷新当前页面
			"DU" : {
				name : "跳过缓存刷新当前页面",
				cmd : function () {
					BrowserReloadSkipCache();
				}
			},
			//跳过缓存刷新当前页面，故意重复，这个容易误识别
			"DRU" : {
				name : "跳过缓存刷新当前页面",
				cmd : function () {
					BrowserReloadSkipCache();
				}
			},
			//关闭所有标签页（不关闭 Pinned 标签，且在pinned页面上可用）
			"DL" : {
				name : "关闭所有标签页",
				cmd : function () {
					var tab = gBrowser.mCurrentTab;
					if (tab.pinned) {
						var tabs = gBrowser.mCurrentTab.boxObject;
						do {
							tab = tabs.nextSibling;
							while (tab.pinned)
								tab = tab.nextSibling;
							gBrowser.removeTab(tab);
						} while (tab);
					} else {
						gBrowser.removeAllTabsBut(tab);
					}
					gBrowser.removeCurrentTab();
				}
			},
			//关闭当前标签
			"DR" : {
				name : "关闭当前标签",
				cmd : function () {
					gBrowser.removeCurrentTab();
				}
			},
			//谷歌站内搜索
			"LU" : {
				name : "谷歌站内搜索",
				cmd : function (self) {
					var s = prompt('站内搜索——请输入待搜索字符串', '');
					if (s.length > 0) 
						gBrowser.addTab('http://www.google.de/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));
				}
			},
			//最小化窗口
			"LD" : {
				name : "最小化窗口",
				cmd : function (self) {
					self.isMouseDownR = false;
					setTimeout("minimize()", 10);
				}
			},
			//恢复关闭的标签页
			"RL" : {
				name : "恢复关闭的标签页",
				cmd : function () {
					undoCloseTab();
				}
			},
			//uAutoPagerize2自动翻页上一页
			"RU" : {
				name : "自动翻页上一页",
				cmd : function (gestures, event) {
					var doc = event.target.ownerDocument;
					var win = doc.defaultView;
					if (win.ap)
						uAutoPagerize.gotoprev(win);
					else if (uAutoPagerize && doc.body && doc.body.getAttribute("name") == "MyNovelReader")
						uAutoPagerize.gotoprev(win, ".title");
					else
						win.scrollByPages(-1);
				}
			},
			//uAutoPagerize2自动翻页下一页
			"RD" : {
				name : "自动翻页下一页",
				cmd : function (gestures, event) {
					var doc = event.target.ownerDocument;
					var win = doc.defaultView;
					if (win.ap)
						uAutoPagerize.gotonext(win);
					else if (uAutoPagerize && doc.body && doc.body.getAttribute("name") == "MyNovelReader")
						uAutoPagerize.gotonext(win, ".title");
					else
						win.scrollByPages(1);
				}
			},
			//清理浏览痕迹
			"LUR" : {
				name : "清理浏览痕迹",
				cmd : function () {
					Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);
				}
			},
		},
		init: function () {
			var self = this;
			["mousedown", "mousemove", "mouseup", "contextmenu", "DOMMouseScroll", "dragend"].forEach(function (type) {
				gBrowser.mPanelContainer.addEventListener(type, self, true);
			});
			window.addEventListener("unload", function () {
				["mousedown", "mousemove", "mouseup", "contextmenu", "DOMMouseScroll", "dragend"].forEach(function (type) {
					gBrowser.mPanelContainer.removeEventListener(type, self, true);
				});
			}, false);
		},
		handleEvent: function (event) {
			switch (event.type) {
			case "mousedown":
				if(/object|embed/i.test(event.target.localName)) return;
				if (event.button == 2) {
					this.sourceNode = event.target;
					this.isMouseDownR = true;
					this.hideFireContext = false;
					[this.lastX, this.lastY, this.directionChain] = [event.screenX, event.screenY, ""];
				}
				if (event.button == 2 && this.isMouseDownL) {
					this.isMouseDownR = false;
					this.shouldFireContext = false;
					this.hideFireContext = true;
					this.directionChain = "L>R";
					this.stopGesture(event);
				} else if (event.button == 0) {
					this.isMouseDownL = true;
					if (this.isMouseDownR) {
						this.isMouseDownL = false;
						this.shouldFireContext = false;
						this.hideFireContext = true;
						this.directionChain = "L<R";
						this.stopGesture(event);
					}
				}
				break;
			case "mousemove":
				if (this.isMouseDownR) {
					this.hideFireContext = true;
					var [subX, subY] = [event.screenX - this.lastX, event.screenY - this.lastY];
					var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
					var direction;
					if (distX < 10 && distY < 10) return;
					if (distX > distY) direction = subX < 0 ? "L" : "R";
					else direction = subY < 0 ? "U" : "D";
					if (direction != this.directionChain.charAt(this.directionChain.length - 1)) {
						this.directionChain += direction;
						XULBrowserWindow.statusTextField.label = this.GESTURES[this.directionChain] ? "手势: " + this.directionChain + " " + this.GESTURES[this.directionChain].name : "未知手势:" + this.directionChain;
					}
					this.lastX = event.screenX;
					this.lastY = event.screenY;
				}
				break;
			case "mouseup":
				if (event.ctrlKey && event.button == 2) {
					this.isMouseDownL = false;
					this.isMouseDownR = false;
					this.shouldFireContext = false;
					this.hideFireContext = false;
					this.directionChain = "";
					event.preventDefault();
					XULBrowserWindow.statusTextField.label = "取消手势";
					break;
				}
				if (this.isMouseDownR && event.button == 2) {
					if (this.directionChain) this.shouldFireContext = false;
					this.isMouseDownR = false;
					this.directionChain && this.stopGesture(event);
				} else if (event.button == 0 && this.isMouseDownL) {
					this.isMouseDownL = false;
					this.shouldFireContext = false;
				}
				break;
			case "contextmenu":
				if (this.isMouseDownL || this.isMouseDownR || this.hideFireContext) {
					var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
					var contextmenu = pref.getBoolPref("dom.event.contextmenu.enabled");
					pref.setBoolPref("dom.event.contextmenu.enabled", true);
					setTimeout(function () {
						pref.setBoolPref("dom.event.contextmenu.enabled", contextmenu);
					}, 10);
					event.preventDefault();
					event.stopPropagation();
					this.shouldFireContext = true;
					this.hideFireContext = false;
				}
				break;
			case "DOMMouseScroll":
				if (this.isMouseDownR) {
					event.preventDefault();
					event.stopPropagation();
					this.shouldFireContext = false;
					this.hideFireContext = true;
					this.directionChain = "W" + (event.detail > 0 ? "+" : "-");
					this.stopGesture(event);
				}
				break;
			case "dragend":
				this.isMouseDownL = false;
			}
		},
		stopGesture: function (event) {
			(this.GESTURES[this.directionChain] ? this.GESTURES[this.directionChain].cmd(this, event) & (XULBrowserWindow.statusTextField.label = "") : (XULBrowserWindow.statusTextField.label = "未知手势:" + this.directionChain)) & (this.directionChain = "");
		}
	};
	ucjsMouseGestures.init()
})()