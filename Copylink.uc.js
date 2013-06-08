// ==UserScript==
// @name               copylink.uc.js
// @namespace          copylink@gmail.com
// @description        右键菜单增加复制链接文本、链接文本+地址、网页标题+地址
// ==/UserScript==
var copyLink = {
    copy: function(aString) {
        var clipb = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
        clipb.copyString(aString);
        dump(aString);
    },

    textlink: function() {
        this.copy(gContextMenu.linkText());
    },

    link: function() {
        this.copy(gContextMenu.linkText() + "\n" + gContextMenu.linkURL);
    },

    page: function() {
        this.copy(window.content.document.title + "\n" + window.content.document.location.href);
    },

    init: function() {
        this.mItem = document.createElement("menuitem");
        this.mItem.setAttribute("id", "context-copyLinkText");
        this.mItem.setAttribute("label", "\u590D\u5236\u94FE\u63A5\u6587\u672C");

        this.mItem1 = document.createElement("menuitem");
        this.mItem1.setAttribute("id", "context-copyPage");
        this.mItem1.setAttribute("label", "\u590D\u5236\u94FE\u63A5\u6587\u672C+URL");

        this.mItem2 = document.createElement("menuitem");
        this.mItem2.setAttribute("id", "context-copyLinkURL");
        this.mItem2.setAttribute("label", "\u590D\u5236\u7F51\u9875\u6807\u9898+URL");

        document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",
        function() {
            copyLink.onPopupShowing(this);
        },
        false);
    },

    onPopupShowing: function(aPopup) {
        var copymenu = document.getElementById("context-copylink");
        aPopup.insertBefore(this.mItem, copymenu);
        aPopup.insertBefore(this.mItem1, copymenu);
        aPopup.appendChild(this.mItem2, copymenu);

        this.mItem.setAttribute("oncommand", "copyLink.textlink();");
        this.mItem.hidden = !gContextMenu.onLink;

        this.mItem1.setAttribute("oncommand", "copyLink.link();");
        this.mItem1.hidden = !gContextMenu.onLink;

        this.mItem2.setAttribute("oncommand", "copyLink.page();");
        this.mItem2.hidden = gContextMenu.onLink;
    }
};

window.setTimeout(function() {
    copyLink.init();
});