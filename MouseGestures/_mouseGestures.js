GESTURES = {
	//强制转到页首
	"U" : {
		name : "转到页首",
		cmd : function (gestures, event) {
			var doc = event.target.ownerDocument;
			var win = doc.defaultView;
			win.scrollTo(0, 0);
		}
	},
	//强制转到页尾
	"D" : {
		name : "转到页尾",
		cmd : function (gestures, event) {
			var doc = event.target.ownerDocument;
			var win = doc.defaultView;
			win.scrollTo(0, 1e10);
		}
	},
	//后退
	"L" : {
		name : "后退",
		cmd : function () {
		getWebNavigation().canGoBack && getWebNavigation().goBack();
		}
	},
	//前进
	"R" : {
		name : "前进",
		cmd : function () {
		getWebNavigation().canGoForward && getWebNavigation().goForward();
		}
	},
/* 	// 增强型后退,没后退翻到上一页
	"L" : {
		name : "后退",
		cmd : function () {
			var nav = gBrowser.webNavigation;
			if (nav.canGoBack) {
				nav.goBack();
			} else {
				var document = window._content.document;
				var links = document.links;
				for(i = 0; i < links.length; i++) {
				if ((links[i].text == '上一頁') || (links[i].text == '上一页') || (links[i].text == '<上一页') || (links[i].text == '« 上一页') || (links[i].text == '<<上一页') || (links[i].text == '[上一页]') || (links[i].text == '翻上页') || (links[i].text == '【上一页】') || (links[i].text == 'Previous') || (links[i].text == 'Prev') || (links[i].text == 'previous') || (links[i].text == 'prev') || (links[i].text == '‹‹') || (links[i].text == '<')) document.location = links[i].href;
				}
			}
		}
	},
	//增强型前进,没前进翻到下一页
	"R" : {
		name : "前进",
		cmd : function () {
			var nav = gBrowser.webNavigation;
			if (nav.canGoForward) {
				nav.goForward();
			} else {
				var document = window._content.document;
				var links = document.links;
				for(i = 0; i < links.length; i++) {
				if ((links[i].text == '下一頁') || (links[i].text == '下一页') || (links[i].text == '下一页>') || (links[i].text == '下一页 »') ||(links[i].text == '下一页>>') || (links[i].text == '[下一页]') || (links[i].text == '翻下页') || (links[i].text == '【下一页】') || (links[i].text == 'Next') || (links[i].text == 'next') || (links[i].text == '››') || (links[i].text == '>')) document.location = links[i].href;
				}
			}
		}
	}, */
	//刷新当前页面
	"UD" : {
		name : "刷新当前页面",
		cmd : function () {
			gBrowser.mCurrentBrowser.reload();
		}
	},
	// //刷新当前页面
	"URD" : {
		name : "刷新当前页面",
		cmd : function () {
			gBrowser.mCurrentBrowser.reload();
		}
	},
	//激活左边的标签页
	"UL" : {
		name : "激活左边的标签页",
		cmd : function () {
			gBrowser.tabContainer.advanceSelectedTab(-1, true);
		}
	},
	//激活右边的标签页
	"UR" : {
		name : "激活右边的标签页",
		cmd : function () {
			gBrowser.tabContainer.advanceSelectedTab(1, true);
		}
	},
	//跳过缓存刷新当前页面
	"DU" : {
		name : "跳过缓存刷新当前页面",
		cmd : function () {
			BrowserReloadSkipCache();
		}
	},
	//跳过缓存刷新当前页面
	"DRU" : {
		name : "跳过缓存刷新当前页面",
		cmd : function () {
			BrowserReloadSkipCache();
		}
	},
	//关闭所有标签页（不关闭 Pinned 标签，且在pinned页面上可用）
	"DL" : {
		name : "关闭所有标签页",
		cmd : function () {
			var tab = gBrowser.mCurrentTab;
			if (tab.pinned) {
				var tabs = gBrowser.mCurrentTab.boxObject;
				do {
					tab = tabs.nextSibling;
					while (tab.pinned)
						tab = tab.nextSibling;
					gBrowser.removeTab(tab);
				} while (tab);
			} else {
				gBrowser.removeAllTabsBut(tab);
			}
			gBrowser.removeCurrentTab();
		}
	},
	//关闭当前标签
	"DR" : {
		name : "关闭当前标签",
		cmd : function () {
			gBrowser.removeCurrentTab();
		}
	},
	//最小化窗口
	"LD" : {
		name : "最小化窗口",
		cmd : function (self) {
			self.isMouseDownR = false;
			setTimeout("minimize()", 10);
		}
	},
	//打开新标签
	"LR" : {
		name : "打开新标签",
		cmd : function () {
			BrowserOpenTab();
		}
	},
	//站内搜索
	"LU" : {
		name : "站内搜索",
		cmd : function () {
			var s = prompt('站内搜索——请输入待搜索字符串', '');
			if (s.length > 0)
				gBrowser.addTab('http://www.google.de/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));
		}
	},
	//恢复关闭的标签页
	"RL" : {
		name : "恢复关闭的标签页",
		cmd : function () {
			undoCloseTab();
		}
	},
	//uAutoPagerize2自动翻页上一页
	"RU" : {
		name : "自动翻页上一页",
		cmd : function (gestures, event) {
			var doc = event.target.ownerDocument;
			var win = doc.defaultView;
			if (win.ap)
				uAutoPagerize.gotoprev(win);
			else if (uAutoPagerize && doc.body && doc.body.getAttribute("name") == "MyNovelReader")
				uAutoPagerize.gotoprev(win, ".title");
			else
				win.scrollByPages(-1);
		}
	},
	//uAutoPagerize2自动翻页下一页
	"RD" : {
		name : "自动翻页下一页",
		cmd : function (gestures, event) {
			var doc = event.target.ownerDocument;
			var win = doc.defaultView;
			if (win.ap)
				uAutoPagerize.gotonext(win);
			else if (uAutoPagerize && doc.body && doc.body.getAttribute("name") == "MyNovelReader")
				uAutoPagerize.gotonext(win, ".title");
			else
				win.scrollByPages(1);
		}
	},
	//清理浏览痕迹
	"LUR" : {
		name : "清理浏览痕迹",
		cmd : function () {
			Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);
		}
	},
	//添加到收藏夹
	"RULD" : {
		name : "添加到收藏夹",
		cmd : function () {
			PlacesCommandHook.bookmarkCurrentPage(true, PlacesUtils.bookmarksMenuFolderId);
		}
	},
	//切换当前网页可编辑
	"DLURD": {
		name: "切换当前网页可编辑",
		cmd: function() {
			content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";
		}
	},
	//新建隐私窗口
	"URDL" : {
		name : "新建隐私窗口",
		cmd : function () {
			OpenBrowserWindow({
				private : true
			});
		}
	},
	//清爽阅读 EverNote clearly
	"RULDR" : {
		name : "清爽阅读",
		cmd : function () {
			__readable_by_evernote.button__call();
		}
	},
	//复制扩展清单，
	"DLD" : {
		name : "复制扩展清单",
		cmd : function () {
			Application.extensions ? Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(Application.extensions.all.map(function (item, id) {
					return id + 1 + ": " + item._item.name;
				}).join("\n")) : Application.getExtensions(function (extensions) {
				Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(extensions.all.map(function (item, id) {
						return id + 1 + ": " + item._item.name;
					}).join("\n"));
			})
		}
	},
};