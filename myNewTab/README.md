###说明文档：

自用新标签、主页的本地html，包括三个文件和一个文件夹：
**index.html**、**index.js**、**style.css**以及**img文件夹**（里面放置了一些我用的图标和默认背景）
此html由我以及卡饭的 [ywzhaiqi](https://github.com/ywzhaiqi/userChromeJS) 共同完成，我提供了html、样式布局以及随机背景功能，y大完成了配置文件以及同步bing壁纸

###使用说明：
**下载以上所说三个文件和img压缩包（下载后解压），一起放到myNewTab文件夹**，或直接到[百度网盘下载](http://pan.baidu.com/s/1c0ktvSO)

**文件放置：**建议放置在firefox配置文件夹的如下路径：
`\Profiles\extensions\userChromeJS@mozdev.org\content\myNewTab`

放置在此路径是因为此路径已被userchormejs扩展注册，可以读写，当然其它扩展的content路径也可以，不过因为我放这里，所以建议此路径，免得还的修改其它文件的路径。

**设置新标签页和主页**地址为：
`chrome://userchromejs/content/myNewTab/index.html`

**站点编辑：**
看效果图中，在导航面板右上角有三个按钮，分别是定位、随机、编辑，其对应作用是打开文件放置路径、随机一个背景、编辑index.js文件。站点就保存在index.js文件中

**解释一下这个随机：**默认用的是每天微软bing（非必应中国，如果喜欢必应中国壁纸，可以自己在index.js中改一下脚本中的地址）的默认壁纸，如果当天壁纸不喜欢，那么这时候随机就有用了，点一下随机，即可随机使用过去10天内bing的壁纸（定位到bingImg文件夹会发现里面有10张壁纸），同样可以在index.js中设置这个最大历史参数，个人觉得其实有那么三五张备份就够了，如果10天内的壁纸都不能看，那微软也太失败了……

**特别注意：**这个js文件中开始的看起来是注释的部分就是站点设置，除非你要编辑站点，否则不要删除。。。设置范例如下：

    新闻资讯
    	Feedly,  http://cloud.feedly.com/
    	IT 资讯,  http://www.ithome.com/list/, img/ithome.ico
    	凤凰网,  http://www.ifeng.com/, img/ifeng.png
    	新浪网,  http://www.sina.com.cn/

最上面的**新闻资讯**是分类，其下是站点，一般来说不用设置图标，打开的时候会自动补上站点默认图标，鉴于有些站点没有图标或者图标不好看，可以自己设置为喜欢的图标，建议图标放置在img文件夹内，调用方式如上图，可以是ico、png等格式
###实际效果图
![newtab0](https://raw.githubusercontent.com/defpt/userChromeJs/master/myNewTab/newtab0.png)
![newtab1](https://raw.githubusercontent.com/defpt/userChromeJs/master/myNewTab/newtab1.png)
![newtab2](https://raw.githubusercontent.com/defpt/userChromeJs/master/myNewTab/newtab2.png)