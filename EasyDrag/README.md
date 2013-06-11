EasyDrag说明文档
=====

[EasyDrag.uc.js](https://github.com/defpt/userChromeJs/blob/master/EasyDrag/EasyDrag.uc.js)  是从紫大博客定制的自用修改版拖拽脚本，包括

**对文字进行搜索、站内搜索、复制以及google翻译；对图片进行百度|谷歌搜索、下载图片以及新标签打开图片；对链接不同方式打开以及复制链接文本、地址。** 此外，增加了几个功能，代码如下：

####1. IE 打开链接

    if (direction == "X") {
                        //用 IE 打开此页面
                        try {
                            var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
                            file.append("Internet Explorer");
                            file.append("iexplore.exe");
                            var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
                            process.init(file);
                            process.run(false, [event.dataTransfer.getData("text/x-moz-url").split("\n")[0]], 1);
                        } catch(ex) {
                            alert("\u6253\u5f00IE\u5931\u8d25!")
                        }
                        return;
                    }

####2. 隐私窗口打开链接

    if (direction == "X") {
                        //隐私窗口打开此链接
                        openLinkIn(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], "window", {private:true});
                        return;
                    }
    
####3. 复制链接文字 + 地址
    if (direction == "X") {
                        //复制链接地址+文本
                        Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url"));
                        return;
                    }
    