EasyDrag说明文档
=====

[EasyDrag.uc.js]()  是从紫大博客定制的自用修改版拖拽脚本，包括

**对文字进行搜索、站内搜索、复制以及google翻译；对图片进行百度|谷歌搜索、下载图片以及新标签打开图片；此外，我在对链接处理的开头给链接设置了个参数** *link_*，可以更方便的对功能进行处理，代码如下：

    var link_ = event.dataTransfer.getData("text/x-moz-url").split("\n");
这样一来所有对链接的处理就可以使用这个参数，其实就是为了试代码看起来小一点，其它都没变，原功能也可使用这个参数，也可直接原代码运行

**链接的文本和地址分别为：**
link_[1] 和 link_[0], **下面代码 if (direction == "X") 中的 X** 就是代表原脚本的U|D|L|R 四个方向

####1. IE 打开链接

    if (direction == "X") {
                        //用 IE 打开此页面
                        try {
                            var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
                            file.append("Internet Explorer");
                            file.append("iexplore.exe");
                            var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
                            process.init(file);
                            process.run(false, [link_[0]], 1);
                        } catch(ex) {
                            alert("\u6253\u5f00IE\u5931\u8d25!")
                        }
                        return;
                    }

####2. 隐私窗口打开链接

    if (direction == "X") {
                        //隐私窗口打开此链接
                        openLinkIn(link_[0], "window", {private:true});
                        return;
                    }
    
####3. 复制链接文字 + 地址
    if (direction == "X") {
                        //复制链接文字 + 地址
                        Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(link_[1] + '\n' + link_[0]);
                        return;
                    }
    