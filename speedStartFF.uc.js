// ==UserScript==
// @name                 speedStartFF.uc.js
// @namespace            speedStartFF@gmail.com
// @description          加速FF启动，卡饭y大基于catcat520提出的原理写的uc脚本
// @charset              UTF-8
// @version              v2013.5.30
// ==/UserScript==
/*****========原理说明=======
最影响firefox速度的 是 adblock plus 等组件
所以，可以打开firefox前禁用对firefox启动影响速度大的组件(限制为启用|禁用无需重启的扩展)例如 abp
然后秒开firefox后，再开启禁用组件
*/
location == "chrome://browser/content/browser.xul" && (function(){

	let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
	Cu.import("resource://gre/modules/AddonManager.jsm");

	const ABP_ID = '{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}';

	function disableABP(disable){
		AddonManager.getAddonByID(ABP_ID, function(addon) {
			addon.userDisabled = disable;
		});
	}
	//  启用 ABP
	disableABP(false);
	// firefox 关闭时禁用 ABP
	window.addEventListener("unload", function(){
		disableABP(true);
	}, false);
})()