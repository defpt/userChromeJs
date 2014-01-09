keys[1] = "gBrowser.selectedTab = gBrowser.addTab('http://translate.google.de/#auto/zh-CN/');";
keys[2] = "gBrowser.selectedTab = gBrowser.addTab('http://bbs.kafan.cn/forum-215-1.html');";
keys[3] = "gBrowser.selectedTab = gBrowser.addTab('http://booklink.me/');";
keys[4] = "gBrowser.selectedTab = gBrowser.addTab('https://github.com/defpt/userChromeJs');";
keys['F4'] = "window._ehhWrapper.toggleSelection();";//ABP辅助扩展
keys['a'] = function(){if(content.ap)
uAutoPagerize.gotoprev();else if(uAutoPagerize && content.document.body.getAttribute("name") == "MyNovelReader")
uAutoPagerize.gotoprev(content, ".title");else
content.scrollByPages(-1);};//自动翻页上一页
keys['c'] = "gBrowser.removeCurrentTab();"; //关闭当前页
keys['d'] = function(){if(content.ap)
uAutoPagerize.gotonext();else if(uAutoPagerize && content.document.body.getAttribute("name") == "MyNovelReader")
uAutoPagerize.gotonext(content, ".title");else
content.scrollByPages(1);};//自动翻页下一页
keys['e'] = "__readable_by_evernote.readable_by_evernote__button__call(event);";//evernote clear
keys['f'] = "var s = prompt('站内搜索——请输入待搜索字符串', '');if (s.length > 0) gBrowser.addTab('http://www.google.de/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));";//站内搜索
keys['h'] = "gWHT.addWord();";//添加高亮关键词
keys['j'] = function(){var canvas=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");canvas.width=content.document.documentElement.scrollWidth;canvas.height=content.document.documentElement.scrollHeight;var ctx=canvas.getContext("2d");ctx.drawWindow(content,0,0,canvas.width,canvas.height,"rgb(255,255,255)");saveImageURL(canvas.toDataURL(),content.document.title+".png",null,null,null,null,document);};//整个页面截图
keys['l'] = "gWHT.destroyToolbar();";//取消高亮工具条
keys['o'] = "openPreferences();";//选项
keys['p'] = "OpenBrowserWindow({private: true});";//隐私窗口
keys['r'] = "undoCloseTab();";//恢复关闭的标签
keys['s'] = "snapLinks.init();";//snap links
keys['t'] = "noscriptOverlay.allowPage();";//NoScript临时允许全部
keys['x'] = "BrowserForward();";//前进
keys['z'] = "BrowserBack();";//后退
//keys["Ctrl+Alt+R"] = "Services.appinfo.invalidateCachesOnRestart() || Application.restart();"; //重启
//keys["Shift+G"] = "var s = getMarkupDocumentViewer();s.authorStyleDisabled = !s.authorStyleDisabled;";// サイトの CSS を ON/OFF トグル
//keys["VK_F12+Ctrl"] = "openPreferences();";//firefox选项
//keys["p+alt"] = "openPreferences();";
//keys["U+Ctrl"] = "undoCloseTab();";//撤销关闭标签页

