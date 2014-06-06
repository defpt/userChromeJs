var Config = getMStr(function(){
	var sites;
/*
新闻资讯
	Feedly,  http://cloud.feedly.com/
	IT 资讯,  http://www.ithome.com/list/
	凤凰网,  http://www.ifeng.com/
	新浪网,  http://www.sina.com.cn/
在线应用
	谷歌翻译, https://translate.google.de/#auto/zh-CN/
	谷歌地图, https://www.google.de/maps/, img/gmaps.ico
	站长工具, http://tool.oschina.net/
	百度云, http://pan.baidu.com/disk/home?
火狐专区
	卡饭火狐, http://bbs.kafan.cn/forum-215-1.html
	Mozest, https://g.mozest.com/
	火狐吧, http://tieba.baidu.com/f?ie=utf-8&kw=firefox
	官方 FTP, http://ftp.mozilla.org/pub/mozilla.org/firefox/
	Greasyfork, https://greasyfork.org/scripts, img/userscript.png
	MDN 库, https://developer.mozilla.org/en-US/
影音娱乐
	Youtube, https://www.youtube.com/
	优酷视频, http://www.youku.com/
	起点中文, http://www.qidian.com/Default.aspx
	豆瓣电台, http://douban.fm/
	落网电台, http://www.luoo.net/
	BookLink, http://booklink.me/
资源收藏
	ZD423, http://www.zdfans.com/
	软件阁, http://www.lite6.com/
	便携绿软, http://www.portablesoft.org/
社区交流
	百度空间, http://hi.baidu.com/home
	豆瓣, http://www.douban.com/
	贴吧, http://tieba.baidu.com/, img/tieba.png
	远景论坛, http://bbs.pcbeta.com/
	开元论坛, http://www.kaiyuan.de/
综合辅助
	谷歌首页, https://www.google.de/
	百度首页, http://www.baidu.com/
	必应首页, http://www.bing.com/
	维基百科, https://de.wikipedia.org/wiki/Wikipedia:Hauptseite
	网盘搜索, http://so.baiduyun.me/
	搜索图标, http://findicons.com/
*/
});

// myNewTab 文件夹的相对于配置文件的路径
var newTabDirPath = "extensions\\userChromeJS@mozdev.org\\content\\myNewTab";
// 图片存储的文件夹名字，相对于上面的路径
var bingImageDir = "bingImg";

var useBingImage = 1;  // 1：使用 bing 的背景图片？ 0：不使用
var updateImageTime = 8;  // 更新 bing 背景图片的间隔（单位：小时）
var bingImageSize = 0;  // bing 图片的尺寸，0 为默认的 1366x768，1 为 1920x1080（大很多，可能会加载慢些）
var bingMaxHistory = 10; // 最大历史天数，可设置[2, 16]

var isNewTab = 0;  // 1：强制新标签页打开 0：默认

/*
  以下不要修改
 */

// 解析后的数据结构，开发时查看用
// var data = {
// 	"新闻资讯": [
// 		{ name: "Feedly", url: "http://cloud.feedly.com/", imgSrc: "img/feedly.ico" },
// 	],
// 	"在线应用": [
// 		{ name: "翻译", url: "https://translate.google.de/#auto/zh-CN/", imgSrc: "img/gtrans.ico" },
// 	],
// };

"use strict";

var Ci = Components.interfaces;
var Cc = Components.classes;
var Cu = Components.utils;
 
Cu.import("resource://gre/modules/PlacesUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");

var NewTab = {
	localLinkRegExp: /^[a-z]:\\[^ ]+$/i,  // windows 路径
	get prefs() {
	    delete this.prefs;
	    return this.prefs = Services.prefs.getBranch("myNewTab.");
	},

	init: function() {
		var table = document.getElementById("navtable");
		if (table.children.lenth > 0) {
			return;
		}

		// 获取 bing 中国主页的背景图片
		var data = this.loadSetting();
		var todayImg = 'chrome://userchromejs/content/myNewTab/bingImg/bingImg_0.jpg';
		if (useBingImage) {
			if (data.backgroundImage && (new Date().getTime() - data.lastCheckTime) < updateImageTime * 3600 * 1000) {
				document.body.style.backgroundImage = 'url(' + data.backgroundImage + ')';
			} else {
				this.setAndSave(todayImg);
				for (var n=0; n < bingMaxHistory; n++){
					this.getBingImage(n);
				}
			}
		}

		var siteData = this.parseDataText(Config.sites);
		// console.log(siteData);
		var tr, type;
		for(type in siteData) {
			tr = this.buildTr(type, siteData[type]);
			table.appendChild(tr);
		}
	},
	//加载设置
	loadSetting: function() {
		var jsonData;
		try {
			jsonData = this.prefs.getCharPref("jsonData");
			jsonData = JSON.parse(jsonData);
		} catch(e) {
			jsonData = {}
		}
		return jsonData;
	},
	// 设置背景图片并保存设置
	setAndSave: function(ImgPath) {
		document.body.style.backgroundImage = 'url(' + ImgPath + ')';
		var Jsondata = {lastCheckTime: new Date().getTime(),backgroundImage: ImgPath};
		try {
			this.prefs.setCharPref("jsonData", JSON.stringify(Jsondata));
		} catch(e) {}
	},
	getBingImage: function(idx) {
		var self = this;
		var url = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=' + idx + '&n=1&nc=' + new Date().getTime();
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onload = function() {
			var data = JSON.parse(xhr.responseText);
			var imageUrl = data.images[0].url;

			// 处理图片地址
			if (bingImageSize) {
				imageUrl = imageUrl.replace('1366x768', '1920x1080');
			}
			if (!imageUrl.startsWith('http')) {
				imageUrl = 'http://www.bing.com' + imageUrl;
			}

			// 本地图片路径
			var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile);
			file.appendRelativePath(newTabDirPath);
			file.appendRelativePath(bingImageDir)
			file.appendRelativePath("BingImg_" + idx + ".jpg")

			// 清楚旧图片
			if (file.exists()) {
 				file.remove(false);
 			}

			//下载图片
			var t = new Image();
			t.src = imageUrl;
			t.onload = function() {
				try {
					file.create(Ci.nsIFile.NOMAL_FILE_TYPE, 0777)
					Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist)
						.saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI(imageUrl, null, null), null, null, null, null, file, null);
				} catch (err) {}
			}
		};
		xhr.send(null);
	},
	parseDataText: function (text) {
		var data = [],
			lines, line, arr, type;

		// 处理下
		text = text.replace(/，/g, ',');

		lines = text.split('\n');
		for (var i = 0, l = lines.length; i < l; i++) {
			line = lines[i].trim();
			if (!line) continue;
			arr = line.split(',');
			if (arr.length == 1) {
				type = arr[0];
				data[type] = [];
			} else {
				data[type].push({
					name: arr[0].trim(),
					url: arr[1] ? arr[1].trim() : null,
					imgSrc: arr[2] ? arr[2].trim() : null
				});
			}
		}
		return data;
	},
	buildTr: function (type, sites) {
		var tr = document.createElement('tr'),
			th = document.createElement('th'),
			span = document.createElement('span'),
			site, td, a, img, textNode, path;
		
		// 添加分类
		span.innerHTML = type;
		th.appendChild(span);
		tr.appendChild(th);

		// 添加站点
		for (var i = 0, l = sites.length; i < l; i++) {
			site = sites[i];

			td = document.createElement('td');
			a = document.createElement('a');
			img = document.createElement('img');
			textNode = document.createTextNode(site.name);

			a.setAttribute('title', site.name);
			path = this.handleUrl(site.url);
			if (path) {
				a.setAttribute('href', 'javascript:;');
				a.setAttribute('localpath', path);
				a.addEventListener('click', function(e){
					var fullpath = e.target.getAttribute('localpath');
					NewTab.exec(fullpath);
				}, false);

				site.exec = path;
			} else {
				a.setAttribute('href', site.url);
			}

			if (isNewTab) {
				a.setAttribute('target', '_blank');
			}
			
			// 设置图片的属性
			img.width = 16;
			img.height = 16;
			if (site.imgSrc) {
				img.src = site.imgSrc;
			} else {
				this.setIcon(img, site);
			}

			a.appendChild(img);
			a.appendChild(textNode);
			td.appendChild(a);
			tr.appendChild(td);
		}
		return tr;
	},
	handleUrl: function (urlOrPath) {
		if (urlOrPath.indexOf('\\') == 0) {  // 相对 firefox 路径文件
			urlOrPath = urlOrPath.replace(/\//g, '\\').toLocaleLowerCase();
			var profileDir = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties)
					.get("ProfD", Ci.nsILocalFile).path;
			return profileDir + urlOrPath;
		} else if (this.localLinkRegExp.test(urlOrPath)) {
			return urlOrPath;
		}

		return false;
	},
	exec: function (path) {
		var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		file.initWithPath(path);
		if (!file.exists()) {
		    alert('路径并不存在：' + path);
		    return;
		}
		file.launch();
	},
	setIcon: function (img, obj) {
		if (obj.exec) {
		    var aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
		    try {
		        aFile.initWithPath(obj.exec);
		    } catch (e) {
		        return;
		    }
		    if (!aFile.exists()) {
		        img.setAttribute("disabled", "true");
		    } else {
		        var fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(aFile);
		        img.setAttribute("src", "moz-icon://" + fileURL + "?size=16");
		    }
		    return;
		}

		var uri, iconURI;
		try {
		    uri = Services.io.newURI(obj.url, null, null);
		} catch (e) { }
		if (!uri) return;

		PlacesUtils.favicons.getFaviconDataForPage(uri, {
		    onComplete: function(aURI, aDataLen, aData, aMimeType) {
		        try {
    			    // javascript: URI の host にアクセスするとエラー
    			    img.setAttribute("src", aURI && aURI.spec?
    			        "moz-anno:favicon:" + aURI.spec:
    			        "moz-anno:favicon:" + uri.scheme + "://" + uri.host + "/favicon.ico");
    			} catch (e) { }
		    }
		});
	}
};

window.addEventListener('load', function(){
	NewTab.init();
}, false);

//随机背景
function randomImage(){
	var n = Math.floor(Math.random() * bingMaxHistory);
	var randomImg = 'chrome://userchromejs/content/myNewTab/bingImg/BingImg_' + n + '.jpg';
	NewTab.setAndSave(randomImg);
}

//定位文件目录
function openDir() {
	var dsFile = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile);
	dsFile.appendRelativePath(newTabDirPath);
	dsFile.reveal();
}

//编辑配置
function edit() {
	var dsFile = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile);
	dsFile.appendRelativePath(newTabDirPath);
	dsFile.append('index.js');
	var cPath = dsFile.path;

	var editor;
	try {
	    editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
	} catch(e) {}
	
	if (!editor || !editor.exists()) {
	    if (showError) {
	        alert("编辑器的路径未设置!!!\n请设置 view_source.editor.path");
	        var url = "about:config?filter=view_source.editor.path";
	        openLinkIn(url, "tab", { inBackground: false});
	    }
	    return;
	}

	var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
	try {
		process.init(editor);
		process.run(false, [cPath], 1);
	} catch(e) {}
}


// 从函数中获取多行注释的字符串
function getMStr(fn) {
    var fnSource = fn.toString();
    var ret = {};
    fnSource = fnSource.replace(/^[^{]+/, '');
    // console.log(fnSource);
    var matched;
    var reg = /var\s+([$\w]+)[\s\S]*?\/\*([\s\S]+?)\*\//g;
    while (matched = reg.exec(fnSource)) {
        // console.log(matched);
        ret[matched[1]] = matched[2];
    };
    
    return ret;
}