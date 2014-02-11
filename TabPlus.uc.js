// ==UserScript==
// @name			NewTabPlus_mod
// @description	    整合版标签增强
// @include			chrome://browser/content/browser.xul
// @include			chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include			chrome://browser/content/history/history-panel.xul
// @include			chrome://browser/content/places/places.xul
// ==/UserScript==

(function() {
	// 新标签打开:书签、历史、搜索栏
	try {
		eval('openLinkIn=' + openLinkIn.toString().
		replace('w.gBrowser.selectedTab.pinned', '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)').
		replace(/&&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/, ''));
    }catch(e){}

    // 地址栏新标签打开
   try {
		location=="chrome://browser/content/browser.xul" && 
		eval("gURLBar.handleCommand="+gURLBar.handleCommand.toString().replace(/^\s*(load.+);/gm,
		"if(/^javascript:/.test(url)||isTabEmpty(gBrowser.selectedTab)){loadCurrent();}else{this.handleRevert();gBrowser.loadOneTab(url, {postData: postData, inBackground: false, allowThirdPartyFixup: true});}"));
    }catch(e){}

	/*主页新标签打开*/
    try {
        eval("BrowserGoHome = " + BrowserGoHome.toString().replace(
            /switch \(where\) {/, "where = (gBrowser.currentURI.spec!="
            +"'about:blank' || gBrowser.webProgress.isLoadingDocument"+
            ") ? 'tab' : 'current'; $&")); 
    }catch(e){}

	// 滚轮切换标签
	gBrowser.mTabContainer.addEventListener("DOMMouseScroll", function(event){
		this.advanceSelectedTab(event.detail > 0 ? +1 : -1, true);
	}, true);

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

	// 标签上双击刷新
	gBrowser.mTabContainer.addEventListener('dblclick', function (event){
		if (event.target.localName == 'tab' && event.button == 0){
			getBrowser().getBrowserForTab(event.target).reload();
		}
	}, false);
	
	//自动关闭下载产生的空白标签
	eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
      if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
          && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
        aWebProgress.DOMWindow.setTimeout(function() {\
          !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
        }, 100);\
      }\
    '));

})();
