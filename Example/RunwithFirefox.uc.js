// ==UserScript==
// @Name             ExeAutorun.uc.js
// @namespace        ExeAutorun.uc.js
// @description        程序自动随Firefox启动
// @include            main
// @compatibility      Firefox 4.0+
// @author             xcffl
// @version           1.0.5.2+0.0.2
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function () {
		var exeFilePath = [      
		//".\\Chrome\\Tools\\firemin\\Firemin.exe",  //启动Firemin
		//"D:\\Program Files (x86)\\Firefox\\Goagent\\local\\goagent.exe",  //启动goagent
		];
		//点.开头的是profile目录
		var WM = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getXULWindowEnumerator(null);
		WM.getNext();
		if (!WM.hasMoreElements()) {
				var killProcess = [];
				exeFilePath.forEach(function (path) {
						var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
						file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
						var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
						process.init(file);
						process.run(false, null, null);
						killProcess.push(process.kill);
				});
				Application.storage.set("killProcess", killProcess);
		}
		window.addEventListener("unload", function () {
				var WW = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher).getWindowEnumerator();
				if (!WW.hasMoreElements()) {
						[i() for each(i in Application.storage.get("killProcess", null))];
					   // killProcess("goagent.exe");
						//killProcess("python27.exe");  //杀掉GoAgent的进程                       
						//killProcess("iexplore.exe");  //杀掉IE的进程
						//killProcess("chrome.exe");    //杀掉chrome的进程
						//killProcess("Firemin.exe");    //杀掉Firemin的进程
				}
		}, false);

		function killProcess(name) {
				var taskkill = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsILocalFile);
				taskkill.append("taskkill.exe");
				var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
				process.init(taskkill);
				process.run(false, ["/im", name, "/f"], 3);
		}
})()