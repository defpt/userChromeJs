// ==UserScript==
// @name           MemoryMonitorMod.uc.js
// @description    简单的FF内存监视器
// @include        main
// @charset        UTF-8
// @note           基于原 MemoryMonitorMod.uc.js 修复后兼容FF28+
// ==/UserScript==
var ucjsMM = {
	_interval : 5000,
	//内存刷新周期, 单位 ms
	_maxMemory : 1000,
	//内存预警上限, 单位 MB
	_MemoryValue : 0,
	//内存初始值
	_prefix : 'MB',
	//内存单位
	_autoRestart : false,

	interval : null,
	init : function () {
		var memoryPanel = document.createElement('statusbarpanel');
		memoryPanel.id = 'MemoryDisplay';
		memoryPanel.setAttribute('label', ucjsMM._MemoryValue + ucjsMM._prefix);
		memoryPanel.setAttribute('tooltiptext', '内存监视器，点击打开about:memory');
		document.getElementById('urlbar-icons').insertBefore(memoryPanel, document.getElementById('uAutoPagerize-icon'));
		this.start();
		this.interval = setInterval(this.start, this._interval);
	},
	start : function () {
		try {
			const Cc = Components.classes;
			const Ci = Components.interfaces;
			var MemReporters = Cc['@mozilla.org/memory-reporter-manager;1'].getService(Ci.nsIMemoryReporterManager);
			var workingSet = MemReporters.resident;
			ucjsMM._MemoryValue = Math.round(workingSet / (1024 * 1024));
			var restartMemory = ucjsMM._MaxMemory * 1024 * 1024;
			var memoryPanel = document.getElementById('MemoryDisplay');
			memoryPanel.setAttribute('label', ucjsMM.addFigure(ucjsMM._MemoryValue) + ucjsMM._prefix);
			memoryPanel.setAttribute('onclick', "openUILinkIn('about:memory','tab')");
			if (workingSet > restartMemory) {
				if (memoryPanel.style.backgroundColor == 'red' && ucjsMM._autoRestart)
					ucjsMM.restart();
				else
					memoryPanel.style.backgroundColor = 'red';
			} else if (workingSet > restartMemory * 0.8)
				memoryPanel.style.backgroundColor = '#FF99FF';
			else if (workingSet > restartMemory * 0.6)
				memoryPanel.style.backgroundColor = '#FFFF99';
			else
				memoryPanel.style.backgroundColor = 'transparent';
		} catch (ex) {
			clearInterval(ucjsMM.interval);
		}
	},
	addFigure : function (str) {
		var num = new String(str).replace(/,/g, '');
		while (num != (num = num.replace(/^(-?\d+)(\d{3})/, '$1,$2')));
		return num;
	},
	restart : function () {
		var appStartup = Components.interfaces.nsIAppStartup;
		Components.classes['@mozilla.org/toolkit/app-startup;1'].getService(appStartup).quit(appStartup.eRestart | appStartup.eAttemptQuit);
	},
}
ucjsMM.init();
