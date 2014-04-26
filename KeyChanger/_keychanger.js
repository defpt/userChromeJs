keys[1] = "BrowserOpenTab();";
keys[2] = "gBrowser.selectedTab = gBrowser.addTab('http://translate.google.de/#auto/zh-CN/');";
keys[3] = "gBrowser.selectedTab = gBrowser.addTab('http://bbs.kafan.cn/forum-215-1.html');";
keys[4] = "gBrowser.selectedTab = gBrowser.addTab('http://booklink.me/');";
keys[5] = function(){var newtabs=["http://booklink.me/","http://bbs.kafan.cn/forum-215-1.html","http://www.ifeng.com/","http://www.ithome.com/list/","http://www.zdfans.com/"];var i=0;while(i<=newtabs.length-1){gBrowser.selectedTab=gBrowser.addTab(newtabs[i]);i=i+1;}};//一键打开标签组
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
keys['e'] = "__readable_by_evernote.button__call(event);";//evernote clear
keys['f'] = "var s = prompt('站内搜索——请输入待搜索字符串', '');if (s.length > 0) gBrowser.addTab('http://www.google.de/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));";//站内搜索
keys['g'] = function (){gBrowser.loadURI("javascript:var%20AS_interval_pointer;AS_speed=4;AS_speed_temp=4;AS_speed_pairs=%5B%5B0,0%5D,%5B1,200.0%5D,%5B1,120.0%5D,%5B1,72.0%5D,%5B1,43.2%5D,%5B1,25.9%5D,%5B2,31.0%5D,%5B4,37.2%5D,%5B8,44.8%5D,%5B8,26.4%5D,%5B16,32.0%5D%5D;AS_last_onkeypress=document.onkeypress;AS_stop=function()%7BclearTimeout(AS_interval_pointer)%7D;AS_start=function()%7BAS_abs_speed=Math.abs(AS_speed);AS_direction=AS_speed/AS_abs_speed;AS_speed_pair=AS_speed_pairs%5BAS_abs_speed%5D;AS_interval_pointer=setInterval('scrollBy(0,'+AS_direction*AS_speed_pair%5B0%5D+');%20if((pageYOffset%3C=1)%7C%7C(pageYOffset==document.height-innerHeight))%20AS_speed=0;',AS_speed_pair%5B1%5D);%7D;AS_adj=function(q)%7BAS_speed+=q;if(Math.abs(AS_speed)%3E=AS_speed_pairs.length)%7BAS_speed=(AS_speed_pairs.length-1)*(AS_speed/Math.abs(AS_speed));%7D%7D;AS_pause=function()%7Bif(AS_speed!=0)%7BAS_speed_temp=AS_speed;AS_speed=0;%7Delse%7BAS_speed=AS_speed_temp;%7D%7D;document.onkeypress=function(e)%7Bif(e.charCode==113)%7BAS_stop();document.onkeypress=AS_last_onkeypress;return;%7Delse%7Bswitch(e.charCode)%7Bcase%2057:AS_speed=4;break;case%2048:AS_speed=0;break;case%2061:AS_adj(1);break;case%2045:AS_adj(-1);break;case%2032:AS_pause();break;default:break;%7D;%7D;AS_stop();AS_start();%7D;AS_stop();AS_start();");};//自动滚屏
keys['h'] = "gWHT.addWord();";//添加高亮关键词
keys['j'] = function(){var canvas=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");canvas.width=content.document.documentElement.scrollWidth;canvas.height=content.document.documentElement.scrollHeight;var ctx=canvas.getContext("2d");ctx.drawWindow(content,0,0,canvas.width,canvas.height,"rgb(255,255,255)");saveImageURL(canvas.toDataURL(),content.document.title+".png",null,null,null,null,document);};//整个页面截图
keys['l'] = "gWHT.destroyToolbar();";//取消高亮工具条
keys['o'] = "openPreferences();";//选项
keys['p'] = "OpenBrowserWindow({private: true});";//隐私窗口
keys['r'] = "undoCloseTab();";//恢复关闭的标签
keys['s'] = "snapLinks.init();";//snap links
keys['t'] = "BrowserOpenTab();";//newtab
keys['x'] = "getWebNavigation().canGoForward && getWebNavigation().goForward();";//前进
keys['z'] = "getWebNavigation().canGoBack && getWebNavigation().goBack();";//后退
//keys['x'] = function(){var nav=gBrowser.webNavigation;if(nav.canGoForward){nav.goForward();}else{var document=window._content.document;var links=document.links;for(i=0;i<links.length;i++){if((links[i].text=='下一頁')||(links[i].text=='下一页')||(links[i].text=='下一页>')||(links[i].text=='下一页 »')||(links[i].text=='下一页>>')||(links[i].text=='[下一页]')||(links[i].text=='翻下页')||(links[i].text=='【下一页】')||(links[i].text=='Next')||(links[i].text=='next')||(links[i].text=='››')||(links[i].text=='>'))document.location=links[i].href;}}};//增强型：前进|下页
//keys['z'] = function(){var nav=gBrowser.webNavigation;if(nav.canGoBack){nav.goBack();}else{var document=window._content.document;var links=document.links;for(i=0;i<links.length;i++){if((links[i].text=='上一頁')||(links[i].text=='上一页')||(links[i].text=='<上一页')||(links[i].text=='« 上一页')||(links[i].text=='<<上一页')||(links[i].text=='[上一页]')||(links[i].text=='翻上页')||(links[i].text=='【上一页】')||(links[i].text=='Previous')||(links[i].text=='Prev')||(links[i].text=='previous')||(links[i].text=='prev')||(links[i].text=='‹‹')||(links[i].text=='<'))document.location=links[i].href;}}};//增强型：后退|上页
//keys['t'] = "noscriptOverlay.allowPage();";//NoScript临时允许全部
//keys["Ctrl+Alt+R"] = "Services.appinfo.invalidateCachesOnRestart() || Application.restart();"; //重启
//keys["Shift+G"] = "var s = getMarkupDocumentViewer();s.authorStyleDisabled = !s.authorStyleDisabled;";// サイトの CSS を ON/OFF トグル
//keys["VK_F12+Ctrl"] = "openPreferences();";//firefox选项
//keys["p+alt"] = "openPreferences();";
//keys["U+Ctrl"] = "undoCloseTab();";//撤销关闭标签页

