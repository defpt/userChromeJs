// ==UserScript==
// @name                 Mousegestures.uc.js
// @namespace            Mousegestures@gmail.com
// @description          自定义鼠标手势，搜集修改自网络各种代码
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
		GESTURES: {},
		createMenuitem: function() {
			var menuitem = document.createElement('menuitem');
			menuitem.setAttribute('id', 'ucjsMouseGestures');
			menuitem.setAttribute('label', 'Gestures 重载/编辑');
			menuitem.setAttribute('oncommand', 'ucjsMouseGestures.reload(true);');
			menuitem.setAttribute('onclick', 'if (event.button == 2) { event.preventDefault(); closeMenus(event.currentTarget); ucjsMouseGestures.edit(ucjsMouseGestures.file); }');
			var insPos = document.getElementById('devToolsSeparator');
			insPos.parentNode.insertBefore(menuitem, insPos);
		},
		init: function () {
			this.reload();
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
		reload: function(isAlert) {
			var file = this.getMouseGesturesFile();
			if (!file.exists()) return this.alert('Load Error: 配置文件不存在');
			try {
				this.importMouseGestures(file);
			} catch (e) {
				this.alert('Error: ' + e + '\n请重新检查配置文件');
				return;
			}
			if (isAlert) this.alert('配置已经重新载入');
		},
		alert: function(aString, aTitle) {
			Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "MouseGestures", aString, false, "", null);
		},
		getMouseGesturesFile: function() {
			var aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
			aFile.appendRelativePath("Local");
			aFile.appendRelativePath("_mouseGestures.js");
			if (!aFile.exists() || !aFile.isFile()) return null;
			delete this.file;
			return this.file = aFile;
		},
		importMouseGestures: function(file) {
			var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
			var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
			fstream.init(file, -1, 0, 0);
			sstream.init(fstream);
			var data = sstream.read(sstream.available());
			try {
				data = decodeURIComponent(escape(data));
			} catch (e) {}
			sstream.close();
			fstream.close();
			this.GESTURES = new Function('', 'return ' + data)();
			return;
		},
		edit: function(aFile) {
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
	ucjsMouseGestures.createMenuitem();
	ucjsMouseGestures.init();
})()