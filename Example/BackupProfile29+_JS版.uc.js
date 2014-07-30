// ==UserScript==
// @name           BackupProfile29+_JS版.uc.js
// @namespace      BackupProfile29+_JS版@github.com
// @description    备份配置按钮，更适合配置较小情况
// @charset        UTF-8
// @author         ywzhaiqi、defpt
// @version        v2014.07.26
// @note           打包代码来自 ywzhaiqi
// @reviewURL      http://bbs.kafan.cn/thread-1758785-1-1.html
(function () {
	CustomizableUI.createWidget({
		id : "Backup-button",
		defaultArea : CustomizableUI.AREA_NAVBAR,
		label : "备份配置",
		tooltiptext : "备份当前配置",
		onClick: function(){
			// 预设备份路径，否则出现选择框选择路径
			var path = "E:\\OneDrive\\Firefox";
			// var path = "";
			// 排除列表
			var excludes = 'bookmarkbackups *cache* crashes fftmp *healthreport* minidumps safebrowsing *webapps* saved-telemetry-pings *thumbnails* *session* *Telemetry* *hotfix* *.sqlite-shm *.sqlite-wal *.bak parent.lock blocklist.xml *content* directoryLinks.json mimeTypes.rdf compatibility.ini parent.lock formhistory.sqlite';

			if (!path) {
				var nsIFilePicker = Ci.nsIFilePicker;
				var FP = Cc['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);
				FP.init(window, '请选择备份保存路径', nsIFilePicker.modeGetFolder);

				if (FP.show() == nsIFilePicker.returnOK) {
					path = FP.file.path;
				} else {
					return false;
				}
			}

			excludes = excludes.replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/\s+/g, '|');
			excludes = new RegExp(excludes, 'i');

			var zw = Cc['@mozilla.org/zipwriter;1'].createInstance(Ci.nsIZipWriter);
			var pr = {PR_RDONLY: 0x01, PR_WRONLY: 0x02, PR_RDWR: 0x04, PR_CREATE_FILE: 0x08, PR_APPEND: 0x10, PR_TRUNCATE: 0x20, PR_SYNC: 0x40, PR_EXCL: 0x80};
			var fu = Cu.import('resource://gre/modules/FileUtils.jsm').FileUtils;
			var dir = fu.getFile('ProfD', []);
			var localnow = new Date().toLocaleFormat("%Y%m%d");
			var archiveName = 'Profiles_' + localnow + '.zip';
			var xpi = fu.File(path + '\\' + archiveName);
			
			zw.open(xpi, pr.PR_RDWR | pr.PR_CREATE_FILE | pr.PR_TRUNCATE);
			var dirArr = [dir];
			for (var i=0; i<dirArr.length; i++) {
				var dirEntries = dirArr[i].directoryEntries;
				while (dirEntries.hasMoreElements()) {
					var entry = dirEntries.getNext().QueryInterface(Ci.nsIFile);         
					if (entry.path == xpi.path) {
						continue;
					}
		   
					if (entry.isDirectory()) {
					   dirArr.push(entry);
					}

					var relPath = entry.path.replace(dirArr[0].path, '');
					if (relPath.match(excludes)) {
						continue;
					}

					var saveInZipAs = relPath.substr(1);
					saveInZipAs = saveInZipAs.replace(/\\/g,'/'); 
					// 配置文件可能被锁住
					try {
						zw.addEntryFile(saveInZipAs, Ci.nsIZipWriter.COMPRESSION_FASTEST, entry, false);
					} catch (e) {}
				}
			}
			zw.close();
			alert('当前配置已备份到  ' + path);

			function alert(aString, aTitle) {
				Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle, aString, false, "", null);
			}
		},
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#Backup-button .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHQSURBVFhH7VbhSsJgFPURgpCMZU2dojk1ExtGZdO2cqmrF+gNgv4F/nFB9iuxN7Yd/S5sy41900WBBw58997jvWfb3TCxhRfPr2/zOMnG+GM0+ZrHxf9hIA78PwOtjv4hHlfHWflknK/UrZvBYIr8TirVRqOiLGuIqTERuVWgemgDzqZE5PO1hoWzbpoLQ14NiLwXVON+BPRDRevNEOcqtYWBUr1pUb2lahM6gzh7QTUuA9f94czbVDWMKWKpejpGjHO33/+ks1PrBNVCG1D13tOqhkq7O0EOu4GYNKu0TlA90g4U7KtVjeUSSvZg5BqXbddtBxH7gTRrL2GuvNyBO/PRtYQ4B4F03Eu4KfwJAy+j93AGIMIzp+e8CXAboFvGUoHAXuC1LDWaFhlHjI8Wk8RngJbSj0wWnwGxKC9eSz8y2e/cAZb6gdRR1iDNxg3o9vcgSGsP71Ed3BWEDiv5g8dA0144P62QLbiG7x1m7lkpGDwG6NPs1SYPxFvKg0ImH244wGOA/h84tcm0qFMODH3lBB4DXqQlyTVcuVKHrBQeUQ3sZyTNObyunPMPB5wGorLSODNZO36sa6DUunhgraIBBqJSLNd01maLkEgkvgF6HhaHvcF79AAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();
