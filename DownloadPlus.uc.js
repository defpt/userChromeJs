// ==UserScript==
// @name           downloadPlus.uc.js
// @description    新建下载，下载重命名 + 双击复制链接、另存为...，完成下载提示音，自动关闭下载产生的空白标签
// @note           微改自用 ywzhaiqi 整合版
// @include        chrome://browser/content/browser.xul
// @include        chrome://browser/content/places/places.xul
// @include        chrome://mozapps/content/downloads/unknownContentType.xul
// @include        chrome://mozapps/content/downloads/downloads.xul
// @charset        UTF-8
// ==/UserScript==

(function() {

    switch (location.href) {
        case "chrome://browser/content/browser.xul":
            newDownload_button();// 下载按钮右键点击新建下载
            download_sound_play();//下载提示音
            autoClose_blankTab();//自动关闭下载产生的空白标签
            break;
        case "chrome://mozapps/content/downloads/unknownContentType.xul":
            download_dialog_changeName();// 下载改名
			download_dialog_saveas();//另存为...
            download_dialog_showCompleteURL();// 下载弹出窗口双击链接复制完整链接
            break;
    }

    function download_sound_play() {
        var downloadPlaySound = {
		  // -- config --
		  DL_START : null,
		  DL_DONE  : "file:///C:/WINDOWS/Media/chimes.wav",
		  DL_CANCEL: null,
		  DL_FAILED: null,
		  // -- config --

		  _list: null,
		  init: function sampleDownload_init() {
			XPCOMUtils.defineLazyModuleGetter(window, "Downloads",
					  "resource://gre/modules/Downloads.jsm");

			//window.removeEventListener("load", this, false);
			window.addEventListener("unload", this, false);

			//**** ダウンロード監視の追加
			if (!this._list) {
			  Downloads.getList(Downloads.ALL).then(list => {
				this._list = list;
				return this._list.addView(this);
			  }).then(null, Cu.reportError);
			}
		  },

		  uninit: function() {
			window.removeEventListener("unload", this, false);
			if (this._list) {
			  this._list.removeView(this);
			}
		  },

		  onDownloadAdded: function (aDownload) {
			//**** ダウンロード開始イベント
			if (this.DL_START);
			  this.playSoundFile(this.DL_START);
		  },

		  onDownloadChanged: function (aDownload) {
			//**** ダウンロードキャンセル
			if (aDownload.canceled && this.DL_CANCEL)
			  this.playSoundFile(this.DL_CANCEL)
			//**** ダウンロード失敗
			if (aDownload.error && this.DL_FAILED)
			  this.playSoundFile(this.DL_FAILED)
			//**** ダウンロード完了
			if (aDownload.succeeded && this.DL_DONE)
			  this.playSoundFile(this.DL_DONE)
		  },

		  playSoundFile: function(aFilePath) {
			if (!aFilePath)
			  return;
			var ios = Components.classes["@mozilla.org/network/io-service;1"]
					  .createInstance(Components.interfaces["nsIIOService"]);
			try {
			  var uri = ios.newURI(aFilePath, "UTF-8", null);
			} catch(e) {
			  return;
			}
			var file = uri.QueryInterface(Components.interfaces.nsIFileURL).file;
			if (!file.exists())
			  return;

			this.play(uri);
		   },

		  play: function(aUri) {
			var sound = Components.classes["@mozilla.org/sound;1"]
					  .createInstance(Components.interfaces["nsISound"]);
			sound.play(aUri);
		  },

		  handleEvent: function(event) {
			switch (event.type) {
			  case "unload":
				this.uninit();
				break;
			}
		  }
		}
		downloadPlaySound.init();
    }

    function newDownload_button() {
        document.getElementById('downloads-button').parentNode.addEventListener('click', function(e){
            if(e.target.id == "downloads-button" || e.target.id == "downloads-indicator"){
                if(e.button == 2 && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey){
                    open_newDownload_dialog();
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        }, false);
    }

    function open_newDownload_dialog() {
        window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPD94bWwtc3R5bGVzaGVldCBocmVmPSJjaHJvbWU6Ly9nbG9iYWwvc2tpbi8iIHR5cGU9InRleHQvY3NzIj8+Cjx3aW5kb3cgeG1sbnM9Imh0dHA6Ly93d3cubW96aWxsYS5vcmcva2V5bWFzdGVyL2dhdGVrZWVwZXIvdGhlcmUuaXMub25seS54dWwiIHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiB0aXRsZT0i5paw5bu65LiL6L295Lu75YqhIj4KICAgIDxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvlvIDlp4st57uT5p2fLeS9jeaVsF0pIj4KICAgICAgICA8bGFiZWwgdmFsdWU9IuaJuemHj+S7u+WKoSI+PC9sYWJlbD4KICAgICAgICA8dGV4dGJveCBmbGV4PSIxIi8+CiAgICA8L2hib3g+CiAgICA8dGV4dGJveCBpZD0idXJscyIgbXVsdGlsaW5lPSJ0cnVlIiBmbGV4PSIxIi8+CiAgICA8aGJveCBkaXI9InJldmVyc2UiPgogICAgICAgIDxidXR0b24gbGFiZWw9IuW8gOWni+S4i+i9vSIvPgogICAgPC9oYm94PgogICAgPHNjcmlwdD4KICAgICAgICA8IVtDREFUQVsKICAgICAgICBmdW5jdGlvbiBQYXJzZVVSTHMoKSB7CiAgICAgICAgICAgIHZhciBiYXRjaHVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZTsKICAgICAgICAgICAgaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7CiAgICAgICAgICAgICAgICBmb3IgKHZhciBtYXRjaCA9IGJhdGNodXJsLm1hdGNoKC9cWyhcZCspLShcZCspLT8oXGQrKT9cXS8pLCBpID0gbWF0Y2hbMV0sIGogPSBtYXRjaFsyXSwgayA9IG1hdGNoWzNdLCB1cmxzID0gW107IGkgPD0gajsgaSsrKSB7CiAgICAgICAgICAgICAgICAgICAgdXJscy5wdXNoKGJhdGNodXJsLnJlcGxhY2UoL1xbXGQrLVxkKygtXGQrKT9cXS8sIChpICsgIiIpLmxlbmd0aCA8IGsgPyAoZXZhbCgiMTBlIiArIChrIC0gKGkgKyAiIikubGVuZ3RoKSkgKyAiIikuc2xpY2UoMikgKyBpIDogaSkpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI3VybHMiKS52YWx1ZSA9IHVybHMuam9pbigiXG4iKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJ0ZXh0Ym94IikuYWRkRXZlbnRMaXN0ZW5lcigia2V5dXAiLCBQYXJzZVVSTHMsIGZhbHNlKTsKICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJidXR0b24iKS5hZGRFdmVudExpc3RlbmVyKCJjb21tYW5kIiwgZnVuY3Rpb24gKCkgewogICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjdXJscyIpLnZhbHVlLnNwbGl0KCJcbiIpLmZvckVhY2goZnVuY3Rpb24gKHVybCkgewogICAgICAgICAgICAgICAgb3BlbmVyLnNhdmVVUkwodXJsICwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSwgbnVsbCwgZG9jdW1lbnQpOwogICAgICAgICAgICB9KTsKICAgICAgICAgICAgY2xvc2UoKQogICAgICAgIH0sIGZhbHNlKTsKICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJ0ZXh0Ym94IikudmFsdWUgPSAob3BlbmVyLm9wZW5lciB8fCB3aW5kb3cub3BlbmVyKS5yZWFkRnJvbUNsaXBib2FyZCgpOwogICAgICAgIFBhcnNlVVJMcygpOwogICAgICAgIF1dPgogICAgPC9zY3JpcHQ+Cjwvd2luZG93Pg==",
            "name", "top=" + (window.screenY + 50) + ",left=" + (window.screenX + 50));
    }

    function download_dialog_showCompleteURL() {
        var s = document.querySelector("#source");
        s.value = dialog.mLauncher.source.spec;
        s.setAttribute("crop", "center");
        s.setAttribute("tooltiptext", dialog.mLauncher.source.spec);
        s.addEventListener("dblclick", function() {
            Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(dialog.mLauncher.source.spec)
        }, false);
    }

    function download_dialog_changeName() {
        if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;
        document.querySelector("#mode").addEventListener("select", function () {
			if (dialog.dialogElement("save").selected) {
				if (!document.querySelector("#locationtext")) {
					var locationtext = document.querySelector("#location").parentNode.insertBefore(document.createElement("textbox"), document.querySelector("#location"));
					locationtext.id = "locationtext";
					locationtext.setAttribute("style", "margin-top:-2px;margin-bottom:-3px");
					locationtext.value = document.querySelector("#location").value;
				}
				document.querySelector("#location").hidden = true;
				document.querySelector("#locationtext").hidden = false;
			} else {
				document.querySelector("#locationtext").hidden = true;
				document.querySelector("#location").hidden = false;
			}
        }, false)
        dialog.dialogElement("save").click();
        window.addEventListener("dialogaccept", function () {
			if ((document.querySelector("#locationtext").value != document.querySelector("#location").value) && dialog.dialogElement("save").selected) {
				var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
				mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, document.querySelector("#locationtext").value, null, null, null, null, null, null, mainwin.document, Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch).getBoolPref("browser.download.useDownloadDir"), null);
				document.documentElement.removeAttribute("ondialogaccept");
			}
        }, false);
    }

	function download_dialog_saveas() {
        var saveas = document.documentElement.getButton("extra1");
		saveas.setAttribute("hidden", "false");
		saveas.setAttribute("label", "\u53E6\u5B58\u4E3A");
		saveas.setAttribute("oncommand", 'var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser"); mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value : dialog.mLauncher.suggestedFileName), null, null, null, null, null, null, mainwin.document, 0, null);close()');
    }

    function autoClose_blankTab() {
        eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
            if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
            && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
            aWebProgress.DOMWindow.setTimeout(function() {\
            !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
            }, 100);\
            }\
        '));
    }

})();
