##这里是翻译脚本

* [gTranslator](https://github.com/defpt/userChromeJs/blob/master/Translator/gTranslator.uc.js) 谷歌翻译脚本，修改自*Dannylee* 大大的翻译脚本，借鉴了一些其它脚本的代码，是我最喜欢的脚本之一：**左键点击按钮**直接翻译，如果有选中文字就翻译文字，没有就翻译网页。
**右键点击**弹出设置菜单，包括：3中语言选择，**默认翻译为中文**，这是我常用的（这个可随便打开脚本自己添加和修改的）
**对于选中文本**，不勾选弹窗显示则直接替换原文本，否则弹窗显示翻译结果；
 不勾选对比显示则只显示翻译结果，否则对比显示翻译结果。

* [JsTranslator.uc.js](https://github.com/defpt/userChromeJs/blob/master/Translator/JsTranslator.uc.js)  翻译按钮合集，都是调用小书签包括尚译、谷歌、有道、Dict、Bing、QQ云等划词以及网页翻译

###手势或拖拽调用翻译选中文本
	gTranslator.selectionTranslation();

###效果图：
![gTranslator.png](https://github.com/defpt/userChromeJs/blob/master/Translator/gTranslator.png?raw=true)