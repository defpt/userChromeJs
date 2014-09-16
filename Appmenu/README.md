###说明文档：

##特别说明：以上两脚本都已弃用，以后不在维护更新，建议使用[anoBtn.uc.js](https://github.com/feiruo/userChromeJS/blob/master/anoBtn/anoBtn.uc.js)

**Appmenufor29+.uc.js** 为FF29+提供经典版橙色菜单,在脚本中可通过设置

	isUrlbar = 0; // 0：表示标签栏； 1：表示地址栏
来确定按钮位置。**如果设置在标签栏**，建议配合以下css完善一下位置调整，**数字自己调节，直到满意为止**

	#AppMenuButton{
    	padding:0 !important;
    	margin:0 0 6px 0!important;
	}
	#AppMenuButton > dropmarker{display:none !important;}

**rebuildAppmenu.uc.xul** 为经典版FF重建橙色菜单

**ExternalAppBtn.uc.js** 这是我早期使用的适用于经典版FF的脚本，它是橙色菜单的替代品，整合了脚本 [MyMenu.uc.js](https://github.com/defpt/userChromeJs/blob/master/MyMenu.uc.js) 

###橙色菜单

![橙色菜单](https://github.com/defpt/userChromeJs/blob/master/Appmenu/Appmenu.png?raw=true)

###ExternalAppBtn
![ExternalAppBtn](https://github.com/defpt/userChromeJs/blob/master/Picture/ExternalAppBtn.png?raw=true)