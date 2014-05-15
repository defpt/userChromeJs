##说明文档：
基于没有了状态栏，地址栏图标太多，所以才有了标签栏隐藏不常用按钮的想法~~~
所以写了个单独脚本，姑且命名为000-AidBar.uc.js，把它当作一个按钮容器（位于标签栏）和000-windowhook.uc 一样最先加载（放chrome路径）

- 容器 id为：TabsToolbar_aidBar

- **带按钮的uc脚本**可以直接把按钮设置在此容器，常见的脚本基本默认把按钮设置在 urlbar-icons ,当然也有设置在 nav-bar 等，不过大多在地址栏，所以拿重定向脚本为例：打开脚本搜索 ***urlbar-icons*** 把这个改为 ***TabsToolbar_aidBar*** 重启FF即可，这里要注意一下的是，各种脚本使用image、statusbarpanel-iconic等，这样转移后可能有些图标放大或缩小（各脚本内部设置不统一）这时候可以自己用css调节一下padding、margin属性，我默认统一设置了padding:5px 2px !important;（见下面样式）

- **至于扩展按钮，**需要先把按钮拖到FF默认的一些工具栏，比如，拖到隐藏的菜单栏， 这样在y大原版脚本 [movebutton](https://github.com/ywzhaiqi/userChromeJS/tree/master/moveButton) 中设置转移到此id即可，比如：

		buttons:[
		{ id: "scriptish-button", bar: "TabsToolbar_aidBar", pos: 1 },//scriptish扩展
		{ id: "stylish-toolbar-button", bar: "TabsToolbar_aidBar", pos: 2 },//stylish 扩展
		{ id: "masonTbButton", bar: "TabsToolbar_aidBar", pos: 3 },// Mason扩展
		{ id: "abp-toolbarbutton", bar: "TabsToolbar_aidBar", pos: 4 },// ABP、ABE扩展
		{ id: "lpt_lastpass-compact-btn", bar: "TabsToolbar_aidBar", pos: 5 },// Lastpass 扩展
		],


- 容器设置了最大宽度300px，可放置十几个按钮了，应该足够了，触发区设置了一个按钮图标大小16px

这样直接使用，有点小问题，启动FF的时候，会有一个按钮显示大概1秒才会隐藏，目前没有找到完美的在脚本直接解决的方法，可把样式用stylish加载达到完美效果，样式如下：

	#TabsToolbar_aidBar{
	    overflow:hidden !important;
	    max-width:16px !important;/*设置触发区宽度*/
	    opacity:0 !important;
	    transition: 0.8s !important;
		transition-delay:1s !important;
	}
	#TabsToolbar_aidBar:hover{
   		max-width:300px !important;
    	opacity:1 !important;
		transition-delay:.2s !important;
	}
	#TabsToolbar_aidBar > image, .statusbarpanel-iconic{
		padding:5px 2px !important;
	}

###autohidden
![autohidden](https://github.com/defpt/userChromeJs/blob/master/AidBar/autohidden.gif?raw=true)