// ==UserScript==
// @name                  urlbarautocopy.uc.js
// @namespace             urlbarautocopy@gmail.com
// @description           地址栏自动复制网址
// ==/UserScript==

//左键点击地址栏自动复制网址，ctrl按下时恢复默认左键点击效果
document.getElementById('urlbar').addEventListener('click',
	function(e){
		if(e.button===0 && !e.ctrlKey){
			goDoCommand('cmd_copy');
		}
	},
	false
);