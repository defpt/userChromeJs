// ==UserScript==
// @name			TabPlus.uc.js
// @description		修改整合版标签增强
// @include			chrome://browser/content/browser.xul
// @include			chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include			chrome://browser/content/history/history-panel.xul
// @include			chrome://browser/content/places/places.xul
// @compatibility	Firefox 18
// ==/UserScript==
(function() {
    //总在当前标签页打开Bookmarklet
    eval("openLinkIn = " + openLinkIn.toString().replace(/(?=if \(where == "save"\))/, 'if (url.substr(0, 11) == "javascript:") where = "current";').replace(/(?=var loadInBackground)/, 'if (w.gBrowser.currentURI.spec == "about:blank" && !w.gBrowser.mCurrentTab.hasAttribute("busy")) where = "current";'));
    //新标签打开:书签、历史、搜索栏
    try {
        str = openLinkIn.toString();
        str = str.replace('w.gBrowser.selectedTab.pinned', '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)');
        str = str.replace(/ &&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/, '');
        str = str.replace(/loadInBackground = false;/g, 'loadInBackground = aInBackground;');
        eval('openLinkIn = ' + str);
    } catch(e) {}
    //地址栏新标签打开
    try {
        if (location.href == 'chrome://browser/content/browser.xul') {
            str = gURLBar.handleCommand.toString();
            str = str.replace('&& !isTabEmpty', '|| isTabEmpty');
            str = str.replace('|| altEnter', '|| !altEnter');
            eval('gURLBar.handleCommand = ' + str);
        }
    } catch(e) {}
    //中键点击bookmark菜单不关闭
    try {
        eval('BookmarksEventHandler.onClick =' + BookmarksEventHandler.onClick.toString().replace('node.hidePopup()', ''));
        eval('checkForMiddleClick =' + checkForMiddleClick.toString().replace('closeMenus(event.target);', ''));
    } catch(e) {}
    //右键关闭标签页
    gBrowser.mTabContainer.addEventListener("click",
    function(e) {
        if (e.target.localName == "tab" && e.button == 2 && !e.ctrlKey) {
            gBrowser.removeTab(e.target);
            e.stopPropagation();
            e.preventDefault();
        }
    },
    false);
    //鼠标停留标签自动聚焦
    (document.getElementById("tabbrowser-tabs") || gBrowser.mTabBox).addEventListener('mouseover',
    function self(e) {
        if ((self.target = e.target).localName === 'tab') {
            if (!self.timeoutID) {
                this.addEventListener('mouseout',
                function() {
                    clearTimeout(self.timeoutID);
                },
                false);
            }
            self.timeoutID = setTimeout(function() {
                gBrowser.selectedTab = self.target;
            },
            200);
        }
    },
    false);

})();
