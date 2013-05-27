// ==UserScript==
// @name               MouseGestures.uc.js
// @namespace          MouseGestures@gmail.com
// @description        从紫云飞大大博客定制的鼠标手势
// ==/UserScript==
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
			//转到页首
			"U": {
				name: "\u8f6c\u5230\u9875\u9996",
				cmd: function() {
					goDoCommand("cmd_scrollTop");
				}
			},
			//转到页尾
			"D": {
				name: "\u8f6c\u5230\u9875\u5c3e",
				cmd: function() {
					goDoCommand("cmd_scrollBottom");
				}
			},
			//后退
			"L": {
				name: "\u540e\u9000",
				cmd: function() {
					getWebNavigation().canGoBack && getWebNavigation().goBack();
				}
			},
			//前进
			"R": {
				name: "\u524d\u8fdb",
				cmd: function() {
					getWebNavigation().canGoForward && getWebNavigation().goForward();
				}
			},
			//刷新当前页面
			"UD": {
				name: "\u5237\u65b0\u5f53\u524d\u9875\u9762",
				cmd: function() {
					gBrowser.mCurrentBrowser.reload();
				}
			},
			//激活左边的标签页
			"UL": {
				name: "\u6fc0\u6d3b\u5de6\u8fb9\u7684\u6807\u7b7e\u9875",
				cmd: function() {
					gBrowser.tabContainer.advanceSelectedTab(-1, true);
				}
			},
			//激活右边的标签页
			"UR": {
				name: "\u6fc0\u6d3b\u53f3\u8fb9\u7684\u6807\u7b7e\u9875",
				cmd: function() {
					gBrowser.tabContainer.advanceSelectedTab(1, true);
				}
			},
			//跳过缓存刷新当前页面
			"DU": {
				name: "\u8df3\u8fc7\u7f13\u5b58\u5237\u65b0\u5f53\u524d\u9875\u9762",
				cmd: function() {
					BrowserReloadSkipCache();
				}
			},
			//关闭所有标签页
			"DL": {
				name: "\u5173\u95ed\u6240\u6709\u6807\u7b7e\u9875",
				cmd: function() {
					gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);
					gBrowser.removeCurrentTab();
				}
			},
			//关闭当前标签
			"DR": {
				name: "\u5173\u95ed\u5f53\u524d\u6807\u7b7e",
				cmd: function() {
					gBrowser.removeCurrentTab();
				}
			},
			//最小化窗口
			"LD": {
				name: "\u6700\u5c0f\u5316\u7a97\u53e3",
				cmd: function(self) {
					self.isMouseDownR = false;
					setTimeout("minimize()", 10);
				}
			},
			//恢复关闭的标签页
			"RL": {
				name: "\u6062\u590d\u5173\u95ed\u7684\u6807\u7b7e\u9875",
				cmd: function() {
					undoCloseTab();
				}
			},
			//打开新标签
			"RU": {
				name: "\u6253\u5f00\u65b0\u6807\u7b7e",
				cmd: function() {
					BrowserOpenTab();
				}
			},
			//下一页，配合nextpage.uc.xul脚本
			"RDR": {
				name: "NextPage",
				cmd: function() {
					nextPage.next(true);
				}
			},
			//上一页，配合nextpage.uc.xul脚本
			"LDL": {
				name: "PrevPage",
				cmd: function() {
					nextPage.prev();
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
						XULBrowserWindow.statusTextField.label = this.GESTURES[this.directionChain] ? "\u624b\u52bf: " + this.directionChain + " " + this.GESTURES[this.directionChain].name : "\u672a\u77e5\u624b\u52bf:" + this.directionChain;
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
					XULBrowserWindow.statusTextField.label = "\u53d6\u6d88\u624b\u52bf";
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
			(this.GESTURES[this.directionChain] ? this.GESTURES[this.directionChain].cmd(this, event) & (XULBrowserWindow.statusTextField.label = "") : (XULBrowserWindow.statusTextField.label = "\u672a\u77e5\u624b\u52bf:" + this.directionChain)) & (this.directionChain = "");
		}
	};
	ucjsMouseGestures.init()
})()
