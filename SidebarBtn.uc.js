// ==UserScript==
// @name                 SidebarBtn.uc.js
// @namespace            SidebarBtn@gmail.com
// @description          侧栏按钮：左键组件管理、中键书签、右键历史
// @author               defpt
// @charset              UTF-8
// @version              v2013.6.21
// ==/UserScript==
(function SidebarButton() {
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
        if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
        var SidebarBtn = document.createElement("toolbarbutton");
        SidebarBtn.id = "Sidebar-button";
        SidebarBtn.setAttribute("type", "button");
        SidebarBtn.setAttribute("onclick", "SidebarBtn.onClick(event);");
        SidebarBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		SidebarBtn.setAttribute("label","侧栏");
        SidebarBtn.setAttribute("tooltiptext","左键：附加组件\n中键：侧栏书签\n右键：侧栏历史");
        SidebarBtn.setAttribute("removable", "true");
        SidebarBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACXSURBVDhPrZNBDoMwEAP3a4QPkHOSt/UpPKW/KIcegC2OWuyqUJSR9mCvvYcIrAldLGMfy/zPeAd1szCUh5uBQr/GO6ib9TG/TMhDtiP5na9XIQ+RfDXOvMVnBvWGByBd33YBgvPfDuwDhOzZkAAhezYkQMieDQkQst+M/IRcdbr7QApyIAxpqua5yeunnCbUG/xM1zFbALy99RbygffSAAAAAElFTkSuQmCC)";
        
        navigator.palette.appendChild(SidebarBtn);
    }

        SidebarBtn = {
            onClick: function(event) {
                switch(event.button) {
                    case 0:
                    openWebPanel('附加组件', 'chrome://mozapps/content/extensions/extensions.xul')
                    break;
                    case 1:
                    toggleSidebar('viewBookmarksSidebar');
                    break;
                    case 2:
					event.preventDefault();
                    event.stopPropagation();
                    toggleSidebar('viewHistorySidebar');
                    break;
                }
            }
        }

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Sidebar-button") < 0) return;
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