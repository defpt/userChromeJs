// ==UserScript==
// @name                  urlbarautocopy.uc.js
// @namespace             urlbarautocopy@gmail.com
// @description           左键点击地址栏自动复制当前页面地址
// ==/UserScript==

document.getElementById('urlbar').addEventListener('click',
   function(e){
      if(e.button===0 )
         goDoCommand('cmd_copy');
   },
   false
);