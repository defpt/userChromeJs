##说明文档：
基于没有了状态栏，地址栏图标太多，所以才有了标签栏隐藏不常用按钮的想法~~~
所以写了个单独脚本，姑且命名为000-AidBar.uc.js，把它当作一个按钮容器（位于标签栏）和000-windowhook.uc 一样最先加载（放chrome路径）

- 容器 id为：TabsToolbar_aidBar

- 带按钮的uc脚本可以直接把按钮设置在此容器，省去加载完毕后又用movebutton转移一步
容器设置了最大宽度300px，可放置十几个按钮了，应该足够了，触发区设置了一个按钮图标大小16px

- 至于扩展按钮，需要先把按钮拖到FF默认的一些工具栏，比如，拖到隐藏的菜单栏， 这样在y大原版脚本 movebutton 中设置转移到此id即可，欢迎试用反馈~~~

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
![autohidden](https://github.com/defpt/userChromeJs/blob/master/AidBar/autohidden.png?raw=true)