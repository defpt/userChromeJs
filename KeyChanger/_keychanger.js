keys['0'] = "Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);"; //清理历史记录
keys['1'] = function() {gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(getBrowserSelection()));};//Google搜索选中文字
keys['2'] = function() {gBrowser.selectedTab = gBrowser.addTab('http://translate.google.de/#auto/zh-CN/' + encodeURIComponent(getBrowserSelection()));};//Google搜索选中文字
keys['3'] = "gBrowser.selectedTab = gBrowser.addTab('http://bbs.kafan.cn/forum-215-1.html');";
keys['4'] = function() {if(getBrowserSelection()) gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=site:booklink.me ' + encodeURIComponent(getBrowserSelection() + ' 最新章节')); else gBrowser.selectedTab = gBrowser.addTab('http://booklink.me/');};//BookLinkMe搜索选中文字
keys['5'] = function() {var newtabs = ["http://www.zdfans.com/", "http://www.lite6.com/", "http://www.ccav1.com/","http://yun.baidu.com/share/link?uk=1781991321&shareid=648883838#dir/path=%2F%E8%85%BE%E8%AE%AFQQ"];var i=0;while(i<=newtabs.length-1){gBrowser.selectedTab=gBrowser.addTab(newtabs[i]);i=i+1;}};//打开一组标签页

keys['a'] = function(){if(content.ap)
				uAutoPagerize.gotoprev();else if(uAutoPagerize && content.document.body.getAttribute("name") == "MyNovelReader")
				uAutoPagerize.gotoprev(content, ".title");else content.scrollByPages(-1);};//自动翻页上一页
keys['b'] = "gBrowser.selectedTab = gBrowser.addTab('chrome://browser/content/places/places.xul');"; //打开我的足迹
keys['c'] = "gBrowser.removeCurrentTab();"; //关闭当前页
keys['d'] = function(){if(content.ap)
				uAutoPagerize.gotonext();else if(uAutoPagerize && content.document.body.getAttribute("name") == "MyNovelReader")
				uAutoPagerize.gotonext(content, ".title");else content.scrollByPages(1);};//自动翻页下一页
// keys['e'] = "__readable_by_evernote.button__call(event);";//evernote clear
keys['f'] = "gFindBar.onFindCommand();";//打开查找栏
// keys['g'] = "";
keys['h'] = "gWHT.addWord();";//高亮脚本，添加高亮关键词
keys['i'] = function() {try {var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);file.append("Internet Explorer");file.append("iexplore.exe");var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);process.init(file);process.run(false, [content.location.href], 1);} catch (ex) {alert("\u6253\u5f00IE\u5931\u8d25!")}};//用IE打开当前页
keys['j'] = function(){var canvas=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");canvas.width=content.document.documentElement.scrollWidth;canvas.height=content.document.documentElement.scrollHeight;var ctx=canvas.getContext("2d");ctx.drawWindow(content,0,0,canvas.width,canvas.height,"rgb(255,255,255)");saveImageURL(canvas.toDataURL(),content.document.title+".png",null,null,null,null,document);};//整个页面截图
// keys['k'] = "";
keys['l'] = "gWHT.destroyToolbar();";//取消高亮工具条
// keys['m'] = "";
// keys['n'] = "";//已占用，高亮脚本的下一个功能
keys['o'] = "openPreferences();";//选项
keys['p'] = "OpenBrowserWindow({private: true});";//隐私窗口
// keys['q'] = "";
keys['r'] = "undoCloseTab();";//恢复关闭的标签
keys['s'] = "var s = prompt('站内搜索——请输入待搜索字符串', '');if (s.length > 0) gBrowser.addTab('http://www.google.de/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));";//站内搜索
keys['t'] = "BrowserOpenTab();";//新建标签页
keys['u'] = "var str = addMenu.convertText('[url=%u]%TITLE%[/url]');addMenu.copy(str);"; //复制当前页完整标题
// keys['v'] = "";
// keys['w'] = "";
keys['x'] = "getWebNavigation().canGoForward && getWebNavigation().goForward();";//前进
keys['y'] = "gTranslator.selectionTranslation();";
keys['z'] = "getWebNavigation().canGoBack && getWebNavigation().goBack();";//后退

keys['F2'] = "gFindBar.onFindAgainCommand(true);";//查找栏上一个
keys['F4'] = "gFindBar.toggleHighlight(true);";//全部高亮
keys['F6'] = "gBrowser.selectedTab = gBrowser.addTab('about:config');";//参数设置
keys['F8'] = "gBrowser.selectedTab = gBrowser.addTab('chrome://global/content/console.xul');";//错误控制台

keys["Alt+C"] = "var str = addMenu.convertText('[code]%CLIPBOARD%[/code]');addMenu.copy(str);goDoCommand('cmd_paste');";//粘贴为code代码
keys["Alt+Q"] = "var str = addMenu.convertText('[quote]%CLIPBOARD%[/quote]');addMenu.copy(str);goDoCommand('cmd_paste');";//粘贴为quote代码



//keys["Ctrl+Alt+R"] = "Services.appinfo.invalidateCachesOnRestart() || Application.restart();"; //重启浏览器
// keys['g'] = function (){gBrowser.loadURI("javascript:var%20AS_interval_pointer;AS_speed=4;AS_speed_temp=4;AS_speed_pairs=%5B%5B0,0%5D,%5B1,200.0%5D,%5B1,120.0%5D,%5B1,72.0%5D,%5B1,43.2%5D,%5B1,25.9%5D,%5B2,31.0%5D,%5B4,37.2%5D,%5B8,44.8%5D,%5B8,26.4%5D,%5B16,32.0%5D%5D;AS_last_onkeypress=document.onkeypress;AS_stop=function()%7BclearTimeout(AS_interval_pointer)%7D;AS_start=function()%7BAS_abs_speed=Math.abs(AS_speed);AS_direction=AS_speed/AS_abs_speed;AS_speed_pair=AS_speed_pairs%5BAS_abs_speed%5D;AS_interval_pointer=setInterval('scrollBy(0,'+AS_direction*AS_speed_pair%5B0%5D+');%20if((pageYOffset%3C=1)%7C%7C(pageYOffset==document.height-innerHeight))%20AS_speed=0;',AS_speed_pair%5B1%5D);%7D;AS_adj=function(q)%7BAS_speed+=q;if(Math.abs(AS_speed)%3E=AS_speed_pairs.length)%7BAS_speed=(AS_speed_pairs.length-1)*(AS_speed/Math.abs(AS_speed));%7D%7D;AS_pause=function()%7Bif(AS_speed!=0)%7BAS_speed_temp=AS_speed;AS_speed=0;%7Delse%7BAS_speed=AS_speed_temp;%7D%7D;document.onkeypress=function(e)%7Bif(e.charCode==113)%7BAS_stop();document.onkeypress=AS_last_onkeypress;return;%7Delse%7Bswitch(e.charCode)%7Bcase%2057:AS_speed=4;break;case%2048:AS_speed=0;break;case%2061:AS_adj(1);break;case%2045:AS_adj(-1);break;case%2032:AS_pause();break;default:break;%7D;%7D;AS_stop();AS_start();%7D;AS_stop();AS_start();");};//自动滚屏