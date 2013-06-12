// ==UserScript==
// @name                 Bookmarksplus.uc.js
// @namespace            Bookmarksplus@gmail.com
// @description          书签菜单按钮补丁：左键菜单，右键侧栏书签
// @author               defpt
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function() {
    var button = document.getElementById("bookmarks-menu-button");
    button.addEventListener("click",
    function(event) {
        if (event.button == 2) {
            event.preventDefault();
            event.stopPropagation();
            toggleSidebar('viewBookmarksSidebar');
        }
    },
    false);
})();