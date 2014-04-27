// ==UserScript==
// @name            autoCopy.uc.js
// @namespace       autoCopy@zbinlin
// @description     开启“clipboard.autocopy”时，使非 *unix 系统也支持自动复制
// @author          zbinlin
// @homepage        http://blog.mozcp.com/
// @version         0.0.5 修复 Firefox 22 会出现 event.view 在第二次访问时值为 null
// @version         0.0.4 修改 取消在 contenteditable 特性的标签内按 Ctrl+A 自动复制
// @version         0.0.3 修改 取消在文本框中按 Ctrl+A 自动复制
// @version         0.0.2 添加 按下 Ctrl+A （全选）快捷键时自动复制
// @version         0.0.1
// ==/UserScript==

(function () {
    var {classes: Cc, interfaces: Ci, utils: Cu} = Components;
    Cu.import("resource://gre/modules/Services.jsm");
    var AutoCopy = {
        init: function () {
            var prefs = Services.prefs;
            prefs.addObserver("clipboard.", this, false);
            if (prefs.getBoolPref("clipboard.autocopy")) {
                document.addEventListener("mouseup", this, false);
                document.addEventListener("keyup", this, false);
            }
            window.addEventListener("unload", this, false);
        },
        handleEvent: function (e) {
            switch (e.type) {
                case "unload" :
                    window.removeEventListener("unload", this, false);
                    this.uninit();
                    break;
                case "mouseup" :
                    if (e.button != 0) return;
                    this.getText(e);
                    break;
                case "keyup" :
                    var keyCode = e.keyCode;
                    /*
                    *  如果按下以下快捷键，将自动复制选中文本：
                    *  Shift+Home Shift+End  Shift+Left Shift+Right
                    *  Shift+Up   Shift+Down Ctrl+A
                    */
                    isKC = keyCode == 35 || keyCode == 36 || keyCode == 37 ||
                           keyCode == 39 || keyCode == 38 || keyCode == 40;
                    if ((e.shiftKey && isKC) || (e.ctrlKey && keyCode == 65)) {
                        this.getText(e);
                    }
                    break;
            }
        },
        getText: function (event) {
            var text = "";
            var win = event.view;
            var doc = win.document;
            var elem = doc.activeElement || event.target;
            var isCopyInEditor = event.type == "mouseup" && (event.altKey || event.ctrlKey);
            if (elem.localName == "input" || elem.localName == "textarea") {
                if (!isCopyInEditor) return;
                // 在文本框中按 Ctrl+A 无效
                // 如果需要按 Ctrl+A 自动复制，可以先按住鼠标左键，再按 Ctrl+A，并同时松开
                if (event.type == "keyup" && event.keyCode == 65) return;
                text = elem.value.substring(elem.selectionStart, elem.selectionEnd);
            } else {
                if ((doc.designMode == "on" || elem.isContentEditable) && !isCopyInEditor) return;
                text = win.getSelection().toString();
            }
            if (text) {
                // 直接复制密码框中的原始字符串到剪贴板里
                if (elem.localName == "input") return this.toClipboard(text);
                this.toCopy(text);
            }
        },
        toCopy: function (text) {
            try {
                var command = "cmd_copy";
                var controller = top.document.commandDispatcher
                                    .getControllerForCommand(command);
                if (controller && controller.isCommandEnabled(command)) {
                    controller.doCommand(command);
                    return;
                }
            } catch (ex) {
            }
            // 上面的复制命令失败后，直接将字符串复制到剪贴板里
            this.toClipboard(text);
        },
        toClipboard: function (text) {
            var clipboard = Cc["@mozilla.org/widget/clipboardhelper;1"]
                               .getService(Ci.nsIClipboardHelper);
            clipboard.copyString(text);
        },
        observe: function (aSubject, aTopic, aData) {
            if (aTopic != "nsPref:changed") return;
            aSubject.QueryInterface(Ci.nsIPrefBranch);
            if (aData == "clipboard.autocopy") {
                var autocopy = aSubject.getBoolPref(aData);
                if (autocopy) {
                    document.addEventListener("mouseup", this, false);
                    document.addEventListener("keyup", this, false);
                } else {
                    document.removeEventListener("mouseup", this, false);
                    document.removeEventListener("keyup", this, false);
                }
            }
        },
        uninit: function () {
            var prefs = Services.prefs;
            prefs.removeObserver("clipboard.", this);
            document.removeEventListener("mouseup", this, false);
            document.removeEventListener("keyup",this, false);
        }
    };
    AutoCopy.init();
})();
