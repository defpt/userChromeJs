// ==UserScript==
// @name                 Historymenu.uc.js
// @namespace            Historymenu@gmail.com
// @description          简单的历史按钮、右键恢复关闭的标签
// @author               defpt
// @charset              UTF-8
// @version              1.0.2 2013.5.19
// ==/UserScript==
const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
location == "chrome://browser/content/browser.xul" && (function () { 
    function createBtn(){
        var navigator = document.getElementById("navigator-toolbox");
  	if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Historymenu = document.createElementNS (XULNS, 'toolbarbutton');
		Historymenu.id = "Historymenu";
		Historymenu.setAttribute("label","Historymenu");
		Historymenu.setAttribute("tooltiptext","Historymenu");
		Historymenu.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Historymenu.setAttribute("type", "menu");
		Historymenu.setAttribute("removable", "true");
		Historymenu.addEventListener("click",function(event){event.preventDefault();event.stopPropagation();if(event.button==2) 					undoCloseTab();}, false);
		Historymenu.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKySURBVDhPZVPdS9NhFN51f0GXQQrVVJxflLqlpo6yINCbELzRXQROpvNjfs+PpkaCLqMPUbtRUEmcF7rQTXSI5idleKsItYhQZm7anHs65+BvCP7g7P3tfd/nOec85/mpMqxWcNxvbpY1u60NuqYmqCsqEGU0StwuL0daYyNy6OzyXQ4hUDYyKRJqauS/ZXgY72dn8YHCOjYmYE11dQSoYFTKC68ptbV4MTGB3z4fAqen8B4e4ufBAf6enMDn9+P1zAzu1ddLhQomQsDg0aUl8POOsuZ1dCCtoQE6AmTT+UuHA8GzM7i3t5FK+4wTguzWViRQaTbKzI9xcBCxZjMSqRVDXx+mFhagNhgQR5o86+lB6PwcH+fnEV9VBcaquByOw+Nj9M/NiXj69nYkEYG5vx8rGxuIKihAbkuLgFrGxxEKhfC4sxNaElZ1hxSuGxnBaTCIRzabbGbRZQ1dNvT2YmF5Gdf1emjoXorFIm39OToSPTiZ6mZpqWT+RYKlE5j14LhLFbydnMTy6ip0hYUotdvxnFrSmEz4truLma0tGfEVAh5lOrWUU1eHzy4X1tfXUUNCuhYX4fJ4kFhSgi87O3AqBLeIkfvy09hyL0yUReLEEHERkXloMtfUatzIy0N0fj5iioux5/VKUjaYintiNZng1dSUTIBNI1pQz08rKxFbVIRMqiieAKaBAYTDYRR0d4seMkZW943TKQc8qjgCZZCQOiJJJpCWPMIufEgi+wIBONbWBPOAx5hxYQh22DyZhKfRPDoqeiRRBckETqUz09AQDmjUX/f2RGTthRsjTuTeuaQBtxsnRMJ2/r6/L/GD7PyPXPhpZUVE5nu8ihMZrJDwyqU+6eqCfXoa05ubMi7+oLhnPuPMClgq4J/LJKwJX4ohk0SXlUmw2UTsK5+zFf8BgHKPDXrUClwAAAAASUVORK5CYII=)";
		navigator.palette.appendChild(Historymenu);
		//历史菜单
		var popup = document.createElementNS (XULNS, 'menupopup');
		popup.setAttribute ('placespopup', 'true');
		popup.setAttribute ('oncommand', 'this.parentNode._placesView._onCommand(event);');
		popup.setAttribute ('onclick', 'checkForMiddleClick(this, event);');
		popup.setAttribute ('onpopupshowing', 'if (!this.parentNode._placesView) new HistoryMenu(event);');
		popup.setAttribute ('tooltip', 'bhTooltip');
		popup.setAttribute ('popupsinherittooltip', 'true');

		//最近关闭的标签页
		item = document.getElementById ('historyUndoMenu');
		if (item) {
			item = item.cloneNode (false);
			item.setAttribute ('id', 'Historymenu-menu_recentlyClosedTabsMenu');
			let itemPopup = document.createElementNS (XULNS, 'menupopup');
			itemPopup.setAttribute ('id', 'Historymenu_recentlyClosedTabsMenupopup');
			itemPopup.setAttribute ('onpopupshowing', "document.getElementById('Historymenu')._placesView.populateUndoSubmenu();");
			itemPopup.setAttribute ('placespopup', 'true');
			item.appendChild (itemPopup);
			popup.appendChild (item);
		}
		//侧栏查看所有历史记录
		let item = document.createElement('menuitem');
		item.setAttribute ('id', 'Historymenu-menu_allhistory');
		item.setAttribute("label", '\u4FA7\u680F\u6253\u5F00\u5386\u53F2\u8BB0\u5F55');
		item.setAttribute ('oncommand', "toggleSidebar('viewHistorySidebar');");
		popup.appendChild (item);
		//分割线
		item = document.getElementById ('startHistorySeparator');
		if (item) {
			item = item.cloneNode (false);
			item.setAttribute ('id', 'Historymenu_startHistorySeparator');
			popup.appendChild (item);
		}
		Historymenu.appendChild (popup);//显示历史记录
		
	}
	function updateToolbar() {
        var toolbars = document.querySelectorAll("toolbar");
        Array.slice(toolbars).forEach(function (toolbar) {
            var currentset = toolbar.getAttribute("currentset");
            if (currentset.split(",").indexOf("Historymenu") < 0) return;
            toolbar.currentSet = currentset;
            try {
                BrowserToolboxCustomizeDone(true);
            } catch (ex) {
            }
       });
    }
	createBtn();
	updateToolbar();
})();
