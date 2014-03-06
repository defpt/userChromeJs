// ==UserScript==
// @name               shareContext.uc.js
// @namespace          shareContext@gmail.com
// @charset            UTF-8
// @description        一键分享
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function(){
	var contextmenu = document.getElementById("contentAreaContextMenu");
	var shareContext = document.createElement("menuitem");
	shareContext.setAttribute("id", "context-shareContext");
	shareContext.setAttribute("label", "一键分享");
	shareContext.setAttribute("oncommand", "onekeyshare();");
	shareContext.setAttribute("class", "menuitem-iconic");
	shareContext.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEZSURBVDhPY6AKiFqnmxq5Xu9u1Dq9f5HrdL/iw2A1YLW6qVDtDAyR63WfgSSi1uv9B+GY9Qb/I9bq/PdYJgbGIDZIDCYPMUT3GVQ70AUwCSCOXq//P2SN+v/ETeb/Z56rA2MQGyQGkkNWC9UOdME63S8QQX2wTX6rFP5nbXf+//TzfTAGsUFiEFdADAHpgWoHG/A1ZoMB2Bb/lQr/7Rdx/4/fZPr/3fdXYAxig8RAciA1ILUgPVDtEAMigf4EOTVru9P/hE0m/yv2hvx/8eUJGIPYIDGQHEgNSC2GAaDAmnW+/v+jj7f+v/z65P9LoMbff3+DMYgNEgPJgdSA1FLfAIq9QGkgUhaNEM0QTF5CojgpU5qZyAcMDACKTtz8JrkGuwAAAABJRU5ErkJggg==");
	contextmenu.insertBefore(shareContext, document.getElementById("context-inspect"));
})();
//下面放要调用的函数
function onekeyshare(){
	//gBrowser.loadURI("");
	
}
