// ==UserScript==
// @name               MyContext.uc.js
// @namespace          MyContext@gmail.com
// @charset            UTF-8
// @description        右键菜单增加某些功能
// @note               增加谷歌快照打开链接、简化隐私窗口打开右键菜单 by defpt 2013.06.10
// @note               复制链接文本+地址、网页标题+地址
// ==/UserScript==
var MyContext = {
    copy: function(aString) {
        var clipb = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
        clipb.copyString(aString);
        dump(aString);
    },
    webcache: function() {
        gBrowser.addTab('http://webcache.googleusercontent.com/search?q=cache:' + gContextMenu.linkURL);
    },
    link: function() {
        this.copy(gContextMenu.linkText() + "\n" + gContextMenu.linkURL);
    },
    page: function() {
        this.copy(window.content.document.title + "\n" + window.content.document.location.href);
    },
    init: function() {
        this.mItem = document.createElement("menuitem");
        this.mItem.setAttribute("id", "context-webcache");
        this.mItem.setAttribute("label", "用谷歌快照打开链接");
        this.mItem1 = document.createElement("menuitem");
        this.mItem1.setAttribute("id", "context-copylinkurl");
        this.mItem1.setAttribute("label", "复制链接文本+URL");
        this.mItem2 = document.createElement("menuitem");
        this.mItem2.setAttribute("id", "context-copyPageTitle");
        this.mItem2.setAttribute("label", "复制网页标题+URL");
        document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",
        function() {
            MyContext.onPopupShowing(this);
        },
        false);
    },
    onPopupShowing: function(aPopup) {
        var copymenu = document.getElementById("context-copylink");
        aPopup.insertBefore(this.mItem, copymenu);
        aPopup.insertBefore(this.mItem1, copymenu);
        aPopup.appendChild(this.mItem2, copymenu);

        this.mItem.setAttribute("oncommand", "MyContext.webcache();");
        this.mItem.hidden = !gContextMenu.onLink;
        this.mItem1.setAttribute("oncommand", "MyContext.link();");
        this.mItem1.hidden = !gContextMenu.onLink;
        this.mItem2.setAttribute("oncommand", "MyContext.page();");
        this.mItem2.hidden = gContextMenu.onLink;
    }
};
window.setTimeout(function() {
    document.getElementById("context-openlinkprivate").setAttribute("label", "在隐私窗口打开链接");
    MyContext.init();
});