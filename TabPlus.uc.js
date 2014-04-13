(function() {
// ==UserScript==
// @name			TabPlus.uc.js
// @description	    自用整合版标签增强
// @namespace       TabPlus@gmail.com
// @include			chrome://browser/content/browser.xul
// @include			chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include			chrome://browser/content/history/history-panel.xul
// @include			chrome://browser/content/places/places.xul
// @Note            2014.03.21 最后一次修正整合 by defpt
// ==/UserScript==

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

	//中键点击bookmark菜单不关闭
    try {
        eval('BookmarksEventHandler.onClick =' + BookmarksEventHandler.onClick.toString().replace('node.hidePopup()', ''));
        eval('checkForMiddleClick =' + checkForMiddleClick.toString().replace('closeMenus(event.target);', ''));
    } catch(e) {}

	//右键关闭标签页
    gBrowser.mTabContainer.addEventListener("click",
    function(e) {
        if (e.target.localName == "tab" && e.button == 2 && !e.ctrlKey) {
            e.preventDefault();
            gBrowser.removeTab(e.target);
			e.stopPropagation();
        }
    },
    false);
	
	//左键点击地址栏自动复制网址
	document.getElementById('urlbar').addEventListener('click',
	   function(e){
		  if(e.button===0 )
			 goDoCommand('cmd_copy');
	   },
	   false
	);
/* 
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
 */
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
