GESTURES = {
	//转到页首
	"U": {
		name: "\u8f6c\u5230\u9875\u9996",
		cmd: function() {
			goDoCommand("cmd_scrollTop");
		}
	},
	//转到页尾
	"D": {
		name: "\u8f6c\u5230\u9875\u5c3e",
		cmd: function() {
			goDoCommand("cmd_scrollBottom");
		}
	},
	//后退
	"L": {
		name: "\u540e\u9000",
		cmd: function() {
			getWebNavigation().canGoBack && getWebNavigation().goBack();
		}
	},
	//前进
	"R": {
		name: "\u524d\u8fdb",
		cmd: function() {
			getWebNavigation().canGoForward && getWebNavigation().goForward();
		}
	},
	//刷新当前页面
	"UD": {
		name: "\u5237\u65b0\u5f53\u524d\u9875\u9762",
		cmd: function() {
			gBrowser.mCurrentBrowser.reload();
		}
	},
	//激活左边的标签页
	"UL": {
		name: "\u6fc0\u6d3b\u5de6\u8fb9\u7684\u6807\u7b7e\u9875",
		cmd: function() {
			gBrowser.tabContainer.advanceSelectedTab(-1, true);
		}
	},
	//激活右边的标签页
	"UR": {
		name: "\u6fc0\u6d3b\u53f3\u8fb9\u7684\u6807\u7b7e\u9875",
		cmd: function() {
			gBrowser.tabContainer.advanceSelectedTab(1, true);
		}
	},
	//跳过缓存刷新当前页面
	"DU": {
		name: "\u8df3\u8fc7\u7f13\u5b58\u5237\u65b0\u5f53\u524d\u9875\u9762",
		cmd: function() {
			BrowserReloadSkipCache();
		}
	},
	//关闭所有标签页
	"DL": {
		name: "\u5173\u95ed\u6240\u6709\u6807\u7b7e\u9875",
		cmd: function() {
			gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);
			gBrowser.removeCurrentTab();
		}
	},
	//关闭当前标签
	"DR": {
		name: "\u5173\u95ed\u5f53\u524d\u6807\u7b7e",
		cmd: function() {
			gBrowser.removeCurrentTab();
		}
	},
	//最小化窗口
	"LD": {
		name: "\u6700\u5c0f\u5316\u7a97\u53e3",
		cmd: function(self) {
			self.isMouseDownR = false;
			setTimeout("minimize()", 10);
		}
	},
	//站内搜索
	"LU": {
		name: "站内搜索",
		cmd: function() {
			var s = prompt('站内搜索——请输入待搜索字符串', '');
			if (s.length > 0)
			   gBrowser.addTab('http://www.google.de/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));
		}
	},
	//恢复关闭的标签页
	"RL": {
		name: "\u6062\u590d\u5173\u95ed\u7684\u6807\u7b7e\u9875",
		cmd: function() {
			undoCloseTab();
		}
	},
	//uAutoPagerize2自动翻页上一页
	"RU": {
		name: "自动翻页上一页",
		cmd: function(){
			if (content.ap)
				return uAutoPagerize.gotoprev();
			else if (uAutoPagerize && content.document.body.getAttribute("name") == "MyNovelReader")
				uAutoPagerize.gotoprev(content, ".title");
			else
				content.scrollByPages(-1);
		}
	},
	//uAutoPagerize2自动翻页下一页
	"RD": {
		name: "自动翻页下一页",
		cmd: function(){
			if(content.ap)
				return uAutoPagerize.gotonext();
			else if (uAutoPagerize && content.document.body.getAttribute("name") == "MyNovelReader")
				uAutoPagerize.gotonext(content, ".title");
			else content.scrollByPages(1);
		}
	},
}