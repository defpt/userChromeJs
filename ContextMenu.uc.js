// ==UserScript==
// @name               ContextConfig.uc.js
// @namespace          ContextConfig@gmail.com
// @charset            UTF-8
// @description        右键菜单增加某些功能
// @note               增加谷歌快照打开链接、简化隐私窗口打开右键菜单 by defpt 2013.11.10
// @note               复制链接文本、复制链接文本+地址、网页标题+地址
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
	linktext: function() {
        this.copy(gContextMenu.linkText());
    },
    page: function() {
        this.copy(window.content.document.title + "\n" + window.content.document.location.href);
    },
	
    init: function() {
        this.mItem = document.createElement("menuitem");
        this.mItem.setAttribute("id", "context-webcache");
        this.mItem.setAttribute("label", "用快照打开链接");
		
		this.mItem1 = document.createElement("menuitem");
        this.mItem1.setAttribute("id", "context-copylinktext");
        this.mItem1.setAttribute("label", "复制链接文本");
		
        this.mItem2 = document.createElement("menuitem");
        this.mItem2.setAttribute("id", "context-copylinkurl");
        this.mItem2.setAttribute("label", "复制链接文本+URL");
		
        this.mItem3 = document.createElement("menuitem");
        this.mItem3.setAttribute("id", "context-copyPageTitle");
        this.mItem3.setAttribute("label", "复制网页标题+URL");
		
		this.mItem4 = document.createElement("menuitem");
        this.mItem4.setAttribute("id", "context-sideopen");
        this.mItem4.setAttribute("label", "在侧边栏打开当前页面");
		
        document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",
        function() {
            MyContext.onPopupShowing(this);
        },
        false);
		
		let menuitem = document.getElementById("context-openlinkprivate");
		menuitem.setAttribute("label", "在隐私窗口打开此链接");
    },
    onPopupShowing: function(aPopup) {
        var contextmenu = document.getElementById("contentAreaContextMenu");
		var copylink = document.getElementById("context-copylink");
        aPopup.insertBefore(this.mItem, copylink);
		aPopup.insertBefore(this.mItem1, copylink);
		aPopup.insertBefore(this.mItem2, copylink);
        aPopup.appendChild(this.mItem3, contextmenu);
		aPopup.appendChild(this.mItem4, contextmenu);
		
        this.mItem.setAttribute("oncommand", "MyContext.webcache();");
        this.mItem.hidden = !gContextMenu.onLink;
		this.mItem.setAttribute("class", "menuitem-iconic");
		this.mItem.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJsSURBVDhPrVNLTxNRFJ4+KCHGnSaKaHDjRqMrExOXGiokGk3cKyG68ie4dedK/4A7RVpoqZRHiYAUUWt8ROzQdtqZvuh0lCJ9TOlM289zb1soaz3Jyb1z73e+e+ac7wj/xWzuCOweCdYJERZyx7QMYfwnHD4FtskorK5N2Cdj5FFY6FwY3+B37XAioIsebxxWIrJMhDmohxFSIA+ekvi9zc1wCVoj6O0msE/FcMwTwY1lGRcXFfRNJziwRSjybBiGrcw7xO1wQTjilfDoxw60OuBRdTwMZTH2VcO9jxmMhnJ48O037oe2MPZFw+jnHJzvUjg605XBiTcSlnNF1Go16A1ArZqQ/lTgzul4GlYRyJWwTee+9A6ebOTxMl3CqbnkAcGZ+SSUPexbjfzx9xwuLMg4O6/g2vs8XikFiCUD7mwJa1oZg4H0AcHATBxytYlGowHDMLCgVXHOL/Fi8iKS317fQkKvwyTyBGEHA5nDGYiFCn/dNE08E/Pon1XaHYjx9cpSCqvqLsdIZROnZ6nVHRvwJxDZraLZbHJf+aXjEnWj1yfzfrOu3A0mkdHZ++C/yx5thwvCSe8mz6BepzaQMdhzqYDr63mcn5NwJ5jC222jdUcZRot7hwmOkwZ82SIytSZiVH25bFBNGnAlC3iRrmCROsTOssQRL1bhVyvo7+6CwyXi8qKMW580OFcUjKxlMUSiuvlBxdCSjOHVNJz0PRLMYDiYxtWgij5SajucCOhf2SzYmN6paEy6TN4tBdKeJNwpKJ8Z2nNV7hsNB9M2ky8rGhsqBmaaZzPA2ml5HebDxM45jg3cv5sg/AXXmVB6oQ/sCwAAAABJRU5ErkJggg==");
		
		this.mItem1.setAttribute("oncommand", "MyContext.linktext();");
        this.mItem1.hidden = !gContextMenu.onLink;
		this.mItem1.setAttribute("class", "menuitem");
		
        this.mItem2.setAttribute("oncommand", "MyContext.link();");
        this.mItem2.hidden = !gContextMenu.onLink;
		this.mItem2.setAttribute("class", "menuitem-iconic");
		this.mItem2.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB/SURBVDhPjY7RDYAgEENvRRdwAff/1qB9sSAn95ImUNqGaGz7cWa6AytmRZdiOQRHyiM+4KVRin8hsBpoUqWHRx8YwW9S7cVLfnbwkaoPmB4cwXepng9w5g54qtd+4JBRvfaDma/6O+D6g4zq+cDKV73HgxmlgYpU6ZkFM0VEXGM87FJCmlCsAAAAAElFTkSuQmCC");
		
        this.mItem3.setAttribute("oncommand", "MyContext.page();");
        this.mItem3.hidden = gContextMenu.onLink;
		this.mItem3.setAttribute("class", "menuitem-iconic");
		this.mItem3.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB/SURBVDhPjY7RDYAgEENvRRdwAff/1qB9sSAn95ImUNqGaGz7cWa6AytmRZdiOQRHyiM+4KVRin8hsBpoUqWHRx8YwW9S7cVLfnbwkaoPmB4cwXepng9w5g54qtd+4JBRvfaDma/6O+D6g4zq+cDKV73HgxmlgYpU6ZkFM0VEXGM87FJCmlCsAAAAAElFTkSuQmCC");
		
		this.mItem4.setAttribute("oncommand", "openWebPanel(content.document.title, content.location);");
        this.mItem4.hidden = gContextMenu.onLink;
		this.mItem4.setAttribute("class", "menuitem-iconic");
		this.mItem4.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVDhPrZPbDYAgDEUhuhcr6Ad/4gAyg6u5mqa1RZ5KhJM0sbdw0wKKbkzGHhCUlpCz2fZ5tSflDgkiFeQtBaDGaxIDpdTIBa31QDKTbIbACvNiEGzmMWsNsm1/GsA3ydmZ4xzxDUh62l7czQQdocJUGiDxOqTrCM2H2PMamaQTCKx4tD1lgNujtETxZ/qJEBdk+r9go7hxIgAAAABJRU5ErkJggg==");
		
    }
};
window.setTimeout(function() {
    MyContext.init();
});