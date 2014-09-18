// ==UserScript==
// @name           MemoryMonitorMod.uc.js
// @description    简单的FF内存监视器
// @include        main
// @charset        UTF-8
// @note           2014.09.18 设置其位置在地址栏地址前
// @note           2014.05.09 修复内存超过1G时候的颜色显示错误问题
// @note           2014.02.10 删除自动重启功能，修复分级颜色显示：正常显示为绿色，超过预警值的0.6倍为蓝色，超出预警值显示为红色
// @note           2014.02.08 基于原MemoryMonitorMod.uc.js修改，兼容FF28+
// @homepageURL    https://github.com/defpt/userChromeJs/blob/master/MemoryMonitor.uc.js
// @reviewURL      http://bbs.kafan.cn/thread-1685929-1-1.html
// ==/UserScript==
var ucjsMM = {
	_interval : 5000,
	//内存刷新周期, 单位 ms
	_Warningvalue : 1000,
	//内存预警值, 单位 MB
	_MemoryValue : 0,
	//内存初始值
	_prefix : 'MB',
	//内存单位

	interval : null,
	init : function () {
		var toolbar = document.getElementById('identity-box').parentNode;
		var memoryPanel = document.createElement('statusbarpanel');
		memoryPanel.id = 'MemoryDisplay';
		memoryPanel.setAttribute('label', ucjsMM._MemoryValue + ucjsMM._prefix);
		memoryPanel.setAttribute('tooltiptext', '内存监视器，点击打开about:memory');
		toolbar.insertBefore(memoryPanel, toolbar.childNodes[3]);
		document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent('\
			#MemoryDisplay{\
				padding-left:0;\
				font-size:12px;\
			}\
			#MemoryDisplay .statusbarpanel-text{margin:0;}\
		') + '"'), document.documentElement);
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
			var displayValue = ucjsMM.addFigure(ucjsMM._MemoryValue);
			var memoryPanel = document.getElementById('MemoryDisplay');
			memoryPanel.setAttribute('label', displayValue + ucjsMM._prefix);
			memoryPanel.setAttribute('onclick', "if(event.button==0)openUILinkIn('about:memory','tab');"); 
			if (ucjsMM._MemoryValue <= ucjsMM._Warningvalue * 0.6){
				memoryPanel.style.color = 'green';
			}
			else if (ucjsMM._MemoryValue >= ucjsMM._Warningvalue) {
				memoryPanel.style.color = 'red';
			}
			else {
				memoryPanel.style.color = 'blue';
			}
		} catch (ex) {
			clearInterval(ucjsMM.interval);
		}
	},
	addFigure : function (str) {
		var num = new String(str).replace(/,/g, '');
		while (num != (num = num.replace(/^(-?\d+)(\d{3})/, '$1,$2')));
		return num;
	}
}
ucjsMM.init();
