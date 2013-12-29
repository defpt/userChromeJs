keys[1] = "gBrowser.selectedTab = gBrowser.addTab('http://translate.google.de/#auto/zh-CN/');";
keys[2] = "gBrowser.selectedTab = gBrowser.addTab('http://bbs.kafan.cn/forum-215-1.html');";
keys[3] = "gBrowser.selectedTab = gBrowser.addTab('http://booklink.me/');";
keys[4] = "gBrowser.selectedTab = gBrowser.addTab('https://github.com/defpt/userChromeJs');";
keys['F4'] = "window._ehhWrapper.toggleSelection();";//ABP辅助扩展
keys['l'] = "gWHT.destroyToolbar();";//取消高亮工具条
keys['h'] = "gWHT.addWord();";//添加高亮关键词
keys['p'] = "OpenBrowserWindow({private: true});";//隐私窗口
keys['q'] = "content.window.wrappedJSObject.X_readability();";//Readability 中文增强版
keys['z'] = "BrowserBack();";//后退
keys['x'] = "BrowserForward();";//前进
keys['r'] = "undoCloseTab();";//恢复关闭的标签
keys['c'] = "gBrowser.removeCurrentTab();"; //关闭当前页
keys['s'] = "snapLinks.init();";//snap links
keys['a'] = function(){if(content.ap)
return uAutoPagerize.gotoprev();else if(uAutoPagerize && content.document.body.getAttribute("name") == "MyNovelReader")
uAutoPagerize.gotoprev(content, ".title");else
content.scrollByPages(-1);};//自动翻页上一页
keys['d'] = function(){if(content.ap)
return uAutoPagerize.gotonext();else if(uAutoPagerize && content.document.body.getAttribute("name") == "MyNovelReader")
uAutoPagerize.gotonext(content, ".title");else
content.scrollByPages(1);};//自动翻页下一页
keys['f'] = "var s = prompt('站内搜索——请输入待搜索字符串', '');if (s.length > 0) gBrowser.addTab('http://www.google.de/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));";//站内搜索
//keys["Ctrl+Alt+R"] = "Services.appinfo.invalidateCachesOnRestart() || Application.restart();"; //重启
//keys["Shift+G"] = "var s = getMarkupDocumentViewer();s.authorStyleDisabled = !s.authorStyleDisabled;";// サイトの CSS を ON/OFF トグル
//keys["F4"] = "toggleSidebar('viewBookmarksSidebar')";// ブックマークサイドバーを开く
//keys["VK_F12+Ctrl"] = "openPreferences();";//firefox选项
//keys["p+alt"] = "openPreferences();";
//keys["U+Ctrl"] = "undoCloseTab();";//撤销关闭标签页
//keys["p"] = function( ){ document.getElementById('quickproxy-status').click() }; //代理状态切换
