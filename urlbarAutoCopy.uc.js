// ==UserScript==
// @name                  urlbarautocopy.uc.js
// @namespace             urlbarautocopy@gmail.com
// @description           地址栏自动复制网址
// ==/UserScript==
//中键点击地址栏自动复制网址
document.getElementById('urlbar').addEventListener('click', function(e){
	if(e.button == 1) goDoCommand('cmd_copy');
}, false);