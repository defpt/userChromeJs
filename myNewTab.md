
# myNewTab.xpi使用说明： #
首发在卡饭：[一键安装myNewTab.xpi](http://bbs.kafan.cn/thread-1759418-1-1.html)

安装后新建标签即可看到效果。在导航面板右上角有三个按钮，分别是定位、切换、编辑，其对应作用分别是打开扩展路径、切换或重新下载背景图片、编辑站点。
###效果图如下：
![mynewtab](https://github.com/defpt/userChromeJs/blob/master/Picture/mynewtab.png?raw=true)
##可设置参数：
点击定位，进入js文件夹，编辑index.js，可以按需设置以下内容

    var useBingImage = 1;  // 1：使用 bing 的背景图片？ 0：不使用
    var updateImageTime = 12;  // 更新 bing 背景图片的间隔（单位：小时）
    var bingImageSize = 0;  // bing 图片的尺寸，0 为默认的 1366x768，1 为 1920x1080（大很多，可能会加载慢些）
    var bingMaxHistory = 10; // 最大历史天数，可设置[2, 16]
    var isNewTab = 0;  // 1：强制新标签页打开 0：默认
###切换按钮释疑：

- 1、用于切换背景，默认用的是每天微软bing的壁纸，如果当天壁纸不喜欢，那么这时候切换就有用了，点一下切换，即可使用过去10天内bing的壁纸（定位到bingimg文件夹会发现里面有10张壁纸），可以在index.js中设置这个最大历史参数，个人觉得其实有那么三五张备份就够了，如果10天内的壁纸都不能看，那微软也太失败了……

- 2、用于下载背景图片，有时候由于网络原因会出现下载图片失败从而导致背景为灰色的情况，这时候可通过点击切换按钮重新下载图片，然后刷新即可

###bing图片说明：

- 默认使用bing的背景图片，如果不喜欢bing背景图片，可从定位路径js文件夹内打开index.js文件，搜索 var usebingimage = 1; 把其改为 var usebingimage = 0; 同时自己选择一张图片重命名为 default.jpg 放入img文件内替换原图片。

- 默认下载的bing图片为 1366x768，适合15英寸左右笔记本，如果使用的是大显示器，请编辑 index.js 搜索 var bingimagesize = 0; 改为 var bingimagesize = 1;这样下载的是1920x1080的大图

- 使用大显示器可能背景没有拉伸到全屏，可点击定位打开以后，编辑style.css样式文件。 搜索：background-size:auto; 把其改为形如：background-size:1280px 800px;（数字设置为你的分辨率）

###搜索引擎设置：
点击定位，用编辑器（比如notepad++）打开index.html以及search.js即可随意定制自己常用的搜索引擎，照猫画虎应该不难。。。


- 在index.html中搜索引擎列表中带**class="active"**为默认激活的搜索引擎，比如安装后默认就是百度，可以自己把其添加到其它搜索引擎上，**注意只能设置一个默认搜索引擎**
- 是否开启搜索提示？默认设置为开启。在index.html中搜索 **baiduSug** 当baiduSug="1"时开启；baiduSug="2"时不开启
- 是否自动聚焦到搜索框？默认设置为自动聚焦在搜索框。在index.html中搜索 **autofocus="autofocus"** 删除即可取消自动聚焦到搜索框

###站点设置：
**通过点击编辑，可进行站点配置，设置范例如下：**

	新闻资讯
    	feedly,  http://cloud.feedly.com/, http://feedly.com/favicon.ico
    	it 资讯,  http://www.ithome.com/list/, img/ithome.ico
    	凤凰网,  http://www.ifeng.com/, img/ifeng.png
    	新浪网,  http://www.sina.com.cn/

最上面的新闻资讯是分类，其下是站点，一般来说不用设置图标，打开的时候会自动补上站点默认图标，鉴于有些站点没有图标或者图标不好看，可以自己设置为喜欢的图标，建议图标放置在img文件夹内，调用方式如上图，可以是在线或本地的ico、png等格式。

###天气预报
喜欢天气预报的还可以加上天气预报代码，[天气预报代码定制](http://www.tianqi.com/plugin/)
个人觉得加在默认左上角就不错。**点击定位编辑index.js** 把定制的代码添加到下图中所示位置，效果图如下：

![tqyb](https://github.com/defpt/userChromeJs/blob/master/Picture/tqyb.png?raw=true)
