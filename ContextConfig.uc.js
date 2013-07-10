// ==UserScript==
// @name               ContextConfig.uc.js
// @namespace          ContextConfig@gmail.com
// @charset            UTF-8
// @description        右键菜单增加某些功能
// @note               增加谷歌快照打开链接、划词翻译、简化隐私窗口打开右键菜单 by defpt 2013.06.10
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
	translator: function() {
        loadURI("javascript:void((function(){if(window.Como&&window.Como.someyi){Como.someyi.open()}else{var%20a=document.createElement('script');a.setAttribute('type','text/javascript');var%20b=document.charset?document.charset:document.characterSet;var%20c=b.toLowerCase()=='gb2312'?'pack-gb2312.js':'pack-utf8.js';a.setAttribute('src','http://yi.comsome.com/'+c);document.getElementsByTagName('head').item(0).appendChild(a);Text.prototype.tagName='#text'}})())");
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
		
		this.mItem3 = document.createElement("menuitem");
        this.mItem3.setAttribute("id", "context-sideopen");
        this.mItem3.setAttribute("label", "侧边栏打开当前页面");
		
		this.mItem4 = document.createElement("menuitem");
        this.mItem4.setAttribute("id", "context-translator");
        this.mItem4.setAttribute("label", "尚译划词翻译");
		
        document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",
        function() {
            MyContext.onPopupShowing(this);
        },
        false);
		
		let menuitem = document.getElementById("context-openlinkprivate");
		menuitem.setAttribute("label", "在隐私窗口打开链接");
    },
    onPopupShowing: function(aPopup) {
        var contextmenu = document.getElementById("contentAreaContextMenu");
		var copylink = document.getElementById("context-copylink");
        aPopup.insertBefore(this.mItem, copylink);
        aPopup.insertBefore(this.mItem1, copylink);
        aPopup.appendChild(this.mItem2, contextmenu);
		aPopup.appendChild(this.mItem3, contextmenu);
        aPopup.insertBefore(this.mItem4, copylink);
		
        this.mItem.setAttribute("oncommand", "MyContext.webcache();");
        this.mItem.hidden = !gContextMenu.onLink;
		
        this.mItem1.setAttribute("oncommand", "MyContext.link();");
        this.mItem1.hidden = !gContextMenu.onLink;
		
        this.mItem2.setAttribute("oncommand", "MyContext.page();");
        this.mItem2.hidden = gContextMenu.onLink;
		
		this.mItem3.setAttribute("oncommand", "openWebPanel(content.document.title, content.location);");
        this.mItem3.hidden = gContextMenu.onLink;
		
		this.mItem4.setAttribute("oncommand", "MyContext.translator();");
		this.mItem4.setAttribute("class", "menuitem-iconic");
		this.mItem4.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKySURBVDhPrZLrS1NhHMePznN2duzyIuj2ol5G4YuEqMzwNp2ampuXbYIYREgyCsmcbmdzm0c33cVLmaZ4yXkpzTFvaUoZOBHBYq+C6EX2Ouhv+PbboejUy+iBLw88z/P9/G4P81+WYOqDYOqFujoE5mYXkgzd0FR3g6/yQWXwgiltB1PiBmdoh9rgAad3gdU58NNOAHMPODIfqw2hvncM6ff7CeQFX9mJ03U+lLsGoCdpKj1g9W3gdE6k5IoKgCkEjTGEVIo6FJnH+/gGLt0LIvwqgsH5MA6+7ODT5xiO17QhKd8BNs8BVZ4CoDEGIRgDcvpMmYSLliDSLQGsbC0gNBPGm901ZDXRvVaEUOCEOl9ESp5dAagOUL1dOH83hKFoBLcCI2CyRFxrDOLrwS4+fNxGpqUbzPUWMFdIma3glIAjZj/801PYii3g+7c4PBNh1EiP8Xo7StFXIY2OY3tvjTKKwvnkKUoe+KHKVQAS0S809OJcvR8j0Tk09AzCNzWJ2s4+AqxjaXMBlq4++J9NYvBFGHprAKqcVkUJNC6mrANHTR2YWnkOozSAtHov7ngfYS/+Fi/X51Hc6ENyDqWfYaUSWsBqbb8BQpUXyeUSMuSaY9iPr2F4bgL2gWHE9jextDGH2cVxLG/O4GyViyZgA/cnoBNMkQvusXFs7CzjjNENs6NH1uq7JTT3D+NUqYi0OgmHi0QaY6KJihL4Cok+iAcnajtwspJmnUP0bHpw9SFGI9O4LdHHutxEjUsYbTTGvwDqisQXdYMtFOnSjtRiEakUSa1tRXhxGuXNQRphMwSdDTylnjhntdSPX4vTu8HfcOBQoR0CGTU6uyyWHpodQaq7Dcm5LXJkdT7tdM4pAZoSJwSKLithLkgAbLKYbKv8mC8gE5l5Eqe1Uh8UgH9fDPMDGrSp6zHp7RQAAAAASUVORK5CYII=");
        this.mItem4.hidden = gContextMenu.onLink;
    }
};
window.setTimeout(function() {
    MyContext.init();
});