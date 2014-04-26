// ==UserScript==
// @name           simpleAppButton.uc.js
// @namespace      ywzhaiqi@gmail.com
// @description    快捷启用程序按钮，可添加三个，鼠标左右键中键
// @note           第一次启动需从定制窗口中拖出按钮
// @include        main
// @charset        UTF-8
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function () {

	// 依次为鼠标左键、中键、右键点击路径。支持相对和绝对路径
	var left_click_path = "\\Chrome\\Local\\exe\\FSCapture.exe";
	var middle_click_path = "\\Chrome\\Local\\EXE\\goagent\\local\\startgoa.exe";
	var right_click_path = "\\Chrome\\Local\\exe\\Ad Muncher\\AdMunch.exe";

	// 图标

	var image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB90lEQVQ4ja2TT0gUURzHH8mAs2DLwhKFpB5iEw8GIYFm0MWgjlGIQdChQwfp0qkQgtaFdRNnQIxeiGRhlKgY2aWDLM5Qo+2hZihhBp2BkDexTOOQ5JTCt5OPHrNBkD/4Xt6P74ffn/cjZD9C1/WOWsopzcgpzfhbXgAYhgFKKSilGBotYs/8cPIRf6eUQlVVGIaBBMAyTcRxjJ8P+nHzWSvanh/CenUNURQJ2gxDqKoqAsrl8pk4jhFFEdrKKcwNpLHbl8XOtSZsLb7g5iAIuIrF4qII2N5GaXUAx9/IuD5/Crt9Wfy6mMbWhTS+Td7HZhgKgHw+/04AWF8/Ijd3EC3TMsY+jODHvcv4fq4B1a4UNk7IYHSYm33GkhVcXbiExnEZjeMy3ro6ooXHqHal8KVdhn1UgpWp42afsWQF2ZKMbEnG4ZEGBEGA0HO42UwfQEUi2Pj8qTbg5FgnMoP1yAzWo320lU97vfsYrEwdKhLBMiGwrvTCc114risCCk+Glvpf3kDL8BH0TJzlva71nkdFIhywTAis16/g2DYKhcKS0EKtVTl3bgmAldkZaJoGyzSTM/hzTT5jcGwbq3dvoyIRrJzuxPupp9A0DZqmwbFtEaDregelVAD4jMGbnoI3P8OBjm3DZyz5E/eOQ1GU2X9R4pj+J34D38QjMJa6hxMAAAAASUVORK5CYII=";
/* 	var navigator = document.getElementById("navigator-toolbox");
	if (!navigator || navigator.palette.id !== "BrowserToolbarPalette")
		return;
 */
	var appButton = document.createElement('toolbarbutton');
	appButton.id = "mAppButton-1";
	appButton.setAttribute("label", "快捷程序启动按钮");
	appButton.setAttribute("tooltiptext", "左键启动Screener截图，中键启动Goagent，右键启动Ad Muncher");
	appButton.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
	appButton.setAttribute("removable", "true");
	appButton.setAttribute("image", image);

	appButton.addEventListener("click", function(event){
		if(event.button == 0){
			exec(handlePath(left_click_path));
		}else if(event.button == 1){ 
			exec(handlePath(middle_click_path));
		}else if(event.button == 2){  
			exec(handlePath(right_click_path));
		}

	}, false);

	//navigator.palette.appendChild(appButton);
	document.getElementById("urlbar-icons").appendChild(appButton);
	//updateToolbar("mAppButton-1");

	var FF_PATH = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).path;

	function handlePath(path){
		path = path.replace(/\//g, '\\').toLocaleLowerCase();
		if (/^(\\)/.test(path)) {
			return FF_PATH + path;
		}

		return path;
	}

	function exec(path, args) {
		args = args || [];
		var args_t = args.slice(0);
		for (var i = 0; i < args_t.length; i++) {
			args_t[i] = args_t[i].replace(/%u/g, gBrowser.currentURI.spec);
		}

		var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		file.initWithPath(path);
		if (!file.exists()) {
			Cu.reportError('File Not Found: ' + path);
			return;
		}

		if (!file.isExecutable()) {
			file.launch();
		} else {
			var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
			process.init(file);
			process.run(false, args_t, args_t.length);
		}
	}

/* 	 function updateToolbar(buttonId) {
		let toolbars = Array.slice(document.querySelectorAll('#navigator-toolbox > toolbar'));
		toolbars.forEach(function (toolbar) {
			var currentset = toolbar.getAttribute("currentset");
			if (currentset.split(",").indexOf(buttonId) < 0)
				return;
			toolbar.currentSet = currentset;
			try {
				BrowserToolboxCustomizeDone(true);
			} catch (ex) {}
		});
	} */

})()
