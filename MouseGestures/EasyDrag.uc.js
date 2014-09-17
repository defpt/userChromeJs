// ==UserScript==
// @name               EasyDrag.uc.js
// @namespace          EasyDrag@gmail.com
// @author             紫云飞
// @description        从紫大博客定制,修复了拖拽链接的一个小bug
// @homepageURL        http://www.cnblogs.com/ziyunfei/archive/2011/12/20/2293928.html
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function(event) {
	var self = arguments.callee;
	if (!event) {
		["dragstart", "dragover", "drop"].forEach(function(type) {
			gBrowser.mPanelContainer.addEventListener(type, self, false);
		});
		window.addEventListener("unload", function() {
			["dragstart", "dragover", "drop"].forEach(function(type) {
				gBrowser.mPanelContainer.removeEventListener(type, self, false);
			});
		}, false);
		self.seemAsURL = function(url) { // 来自 Easy DragToGo+ 扩展，略作修正
			var DomainName = /(\w+(\-+\w+)*\.)+\w{2,7}/i;
			var HasSpace = /\S\s+\S/;
			var KnowNameOrSlash = /^(www|bbs|forum|blog)|\//i;
			var KnowTopDomain1 = /\.(com|net|org|gov|edu|info|mobi|mil|asia)$/i;
			var KnowTopDomain2 = /\.(de|uk|eu|nl|it|cn|be|us|br|jp|ch|fr|at|se|es|cz|pt|ca|ru|hk|tw|pl|me|tv|cc)$/i;
			var IsIpAddress = /^([1-2]?\d?\d\.){3}[1-2]?\d?\d/;
			var seemAsURL = !HasSpace.test(url) && DomainName.test(url) && (KnowNameOrSlash.test(url) || KnowTopDomain1.test(url) || KnowTopDomain2.test(url) || IsIpAddress.test(url));
			return seemAsURL;
		};
		return;
	}
	switch (event.type) {
	case "dragstart":
		{
			self.startPoint = [event.screenX, event.screenY];
			self.sourceNode = event.target;
			event.target.localName == "img" && event.dataTransfer.setData("application/x-moz-file-promise-url", event.target.src);
			break;
		}
	case "dragover":
		{
			self.startPoint && (Components.classes["@mozilla.org/widget/dragservice;1"].getService(Components.interfaces.nsIDragService).getCurrentSession().canDrop = true);
			break;
		}
	case "drop":
		{
			if (self.startPoint && event.target.localName != "textarea" && (!(event.target.localName == "input" && (event.target.type == "text" || event.target.type == "password"))) && event.target.contentEditable != "true") {
				event.preventDefault();
				event.stopPropagation();
				var [subX, subY] = [event.screenX - self.startPoint[0], event.screenY - self.startPoint[1]];
				var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
				var direction;
				if (distX > distY) direction = subX < 0 ? "L" : "R";
				else direction = subY < 0 ? "U" : "D";
				if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
					var edgimg = event.dataTransfer.getData("application/x-moz-file-promise-url");//目标图片链接
					if (direction == "U") {
						//新标签打开图片(前台)
						gBrowser.selectedTab = gBrowser.addTab(edgimg);
						return;
					}
					if (direction == "D") {
						//搜索相似图片(Google)
						gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + encodeURIComponent(edgimg));
						return;
					}
					if (direction == "L") {
						//复制图片地址
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString('[img]' + edgimg + '[/img]');
						return;
					}
					if (direction == "R") {
						//下载图片(不弹窗)
						saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, true, null, document);
						return;
					}
				} else if (event.dataTransfer.types.contains("text/x-moz-url")) {
					var edglink = event.dataTransfer.getData("text/x-moz-url").replace(/[\n\r]+/, "\n").split("\n");//目标链接
					if (direction == "U") {
						//新标签打开链接(后台)
						gBrowser.addTab(edglink[0]);
						return;
					}
					if (direction == "D") {
						if (event.ctrlKey){
							//下载链接
							saveImageURL(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], null, null, null, true, null, document);
						} else {
							//新标签打开链接(前台)
							gBrowser.selectedTab = gBrowser.addTab(edglink[0]);
						}
						return;
					}
					if (direction == "L") {
						//复制链接文本
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(edglink[1]);
						return;
					}
					if (direction == "R") {
						//复制链接地址
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(edglink[0]);
						return;
					}
				} else {
					var edgsel = event.dataTransfer.getData("text/unicode");//选中的文字
					if (direction == "U") {
						//搜索框搜索选中文字(站内)(前台)
						gBrowser.selectedTab = gBrowser.addTab();
						BrowserSearch.loadSearch("site:" + content.location.host + " " + edgsel, false);
						return;
					}
					if (direction == "D") {
						//搜索框搜索选中文字(前台)[识别URL并打开]
						(self.seemAsURL(edgsel) && (gBrowser.selectedTab = gBrowser.addTab(edgsel))) || ((gBrowser.selectedTab = gBrowser.addTab()) & BrowserSearch.loadSearch(edgsel, false));
						return;
					}
					if (direction == "L") {
						//复制所选文字
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(edgsel);
					}
					if (direction == "R") {
						//页面内查找所选文字
						gFindBar.onFindCommand();
						return;
					}
				}
				self.startPoint = 0;
			}
		}
	}
})()