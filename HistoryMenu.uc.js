// ==UserScript==
// @name                 Historymenu.uc.js
// @namespace            Historymenu@gmail.com
// @description          简单的历史按钮、左键点击打开菜单，右键点击恢复最后关闭的标签
// @author               defpt
// @charset              UTF-8
// @version              v2013.5.30
// ==/UserScript==
const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
location == "chrome://browser/content/browser.xul" && (function() {
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
        if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
        var Historymenu = document.createElementNS(XULNS, 'toolbarbutton');
        Historymenu.id = "Historymenu";
        Historymenu.setAttribute("label", "Historymenu");
        Historymenu.setAttribute("tooltiptext", "Historymenu");
        Historymenu.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
        Historymenu.setAttribute("type", "menu");
        Historymenu.setAttribute("removable", "true");
        Historymenu.addEventListener("click",
        function(event) {
            if (event.button == 2) {
                event.preventDefault();
                event.stopPropagation();
                undoCloseTab();
            }
        },
        false);
        Historymenu.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC+SURBVDhPY7D3OPOfEjyIDWDZ8v//hQcL/r//ev//91/vwWyQGLo6uAEwAGKDFII0wcDz9+ehrP8YhmAYgKz5woP5cA0rj/mDxUAA2RAMA5A1w+Rg+MDVerDcg1f74WIYBoAAyN/oTgVhkBgMwMSwGoAMYPIgDDMA5EqYGEkGgJwOAsjegxtACMP8DwJYAxEfBtkIAxtPx6PIETTgxtP1UK3//++4kI8hT9AAkHNBCQndZhgmOgxwYQoNOPMfAE+4s7Tq+nfIAAAAAElFTkSuQmCC)";
        navigator.palette.appendChild(Historymenu);
        //status-bar  urlbar-icons addon-bar alltabs-button TabsToolbar go-button
        //document.getElementById("urlbar-icons").appendChild(Historymenu);
        //历史菜单
        var popup = document.createElementNS(XULNS, 'menupopup');
        popup.setAttribute('placespopup', 'true');
        popup.setAttribute('oncommand', 'this.parentNode._placesView._onCommand(event);');
        popup.setAttribute('onclick', 'checkForMiddleClick(this, event);');
        popup.setAttribute('onpopupshowing', 'if (!this.parentNode._placesView) new HistoryMenu(event);');
        popup.setAttribute('tooltip', 'bhTooltip');
        popup.setAttribute('popupsinherittooltip', 'true');

        //最近关闭的标签页
        item = document.getElementById('historyUndoMenu');
        if (item) {
            item = item.cloneNode(false);
            item.setAttribute('id', 'Historymenu_recentlyClosedTabsMenu');
            itemPopup = document.createElementNS(XULNS, 'menupopup');
            itemPopup.setAttribute('id', 'Historymenu_recentlyClosedTabsMenupopup');
            itemPopup.setAttribute('onpopupshowing', "document.getElementById('Historymenu')._placesView.populateUndoSubmenu();");
            itemPopup.setAttribute('placespopup', 'true');
            item.appendChild(itemPopup);
            popup.appendChild(item);
        }
        //查看所有历史记录
        item = document.createElement('menuitem');
        item.setAttribute('id', 'Historymenu_allhistory');
        item.setAttribute("label", '\u67E5\u770B\u6240\u6709\u5386\u53F2\u8BB0\u5F55');
        item.setAttribute('oncommand', "toggleSidebar('viewHistorySidebar');");
        popup.appendChild(item);
        //分割线
        item = document.getElementById('startHistorySeparator');
        if (item) {
            item = item.cloneNode(false);
            item.setAttribute('id', 'Historymenu_startHistorySeparator');
            popup.appendChild(item);
        }
        Historymenu.appendChild(popup); //显示历史记录
        document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent('\
#Historymenu menuitem {\
		max-width: 200px !important;\
	}\
') + '"'), document.documentElement);
    }
    function updateToolbar() {
        var toolbars = document.querySelectorAll("toolbar");
        Array.slice(toolbars).forEach(function(toolbar) {
            var currentset = toolbar.getAttribute("currentset");
            if (currentset.split(",").indexOf("Historymenu") < 0) return;
            toolbar.currentSet = currentset;
            try {
                BrowserToolboxCustomizeDone(true);
            } catch(ex) {}
        });
    }
    createBtn();
    updateToolbar();
})();