// ==UserScript==
// @name           externalFuncMenu.uc.js
// @description    多功能左键菜单，可以把小书签，鼠标手势等都放进去，自用功能by defpt
// @include        main
// @author         lastdream2013
// @charset        UTF-8
// ==/UserScript==
var gExternalSubMenu = {
  autohideEmptySubDirs : true, //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom : false, //把主菜单下的子目录移动到最下面
	insertafter : 'context-paste', //  context-paste   context-copylink context-openlinkintab
	toolbar :
	{
		//在这里定义好主菜单下子目录的名字,以及图标； 可在中间加{name: 'separator'}建立一个目录与目录之间的分隔线
		subdirs : [
			{
				name : '辅助功能',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANvSURBVDhPdVNtTFtlFL6bW+NU/GFiXKaYTRc1QnEbm7JkbgETWUBKOyhMGYMGWqHIR1u6Xgr1Fi79oC2XFrilG9AA7ZAN2ELqkGxE3ICwOY1LHNOILpnRxB/610R6+z7e1qtGo09y8p7znvOc95wneSmGYbZRFLVFOlMQfVnSOJ+zlQ/0HtPpdNsvqtUPSen/h0jamjQppGjasNdsNqdJIfWfTa5mFeczakY2RtuypSvK4WAyOc5b6PE4FobGh8LjlTUn/E1NT0npf2L6kLJqQpa5vPRkDtYUevpcmyXQF+xNDA750WZsQtDvwfUPZ/Hg1tL92bmp7uRqEvVv+OS5Ed8ju7+7svUlXE3LAl9dDY+7S/ix4YBwny0WxoYHE7fvrOHmmA/TnnZ1kvPXqqKTEs+sqjjgop5NjFPPbYZ37k20GN7Dt8ZXyU+cksRmJsm1lU9++8pZGf85VPyBxPujQVIYtSQOV1jhDqTtRs/RI3GtQU+UBfmgm+rR091O+ECPMOhmyJxTv5oi/hsmk+nRgXBI3tioFSy2M4KytDSRlfECKcjLQXVpIbTlb8UVbx6D2W5fStb/+Sg17+5t4XNPLHNp8u/9z7x242SZ6leTxUCspjJSV1dOjBYTXJ5u9PN9m6w4ib5W400RRaTW8KQfQmBHBtb2HMe67CDcu/ajnjbiy48HcHvBg09XFnFt/iJmL0yQC+f9ZIrT/LCSV3H3klJnTnWpT5fHJ7ZnCN+omxNfZ58ULj2RQw6/cZRMRkfJxt1bZP2zJWzcWcaD9TVsfLGKe5/HsDoTwcqLRbjxfEGUGng4k8Rkr5Dr1MtkcYsctvSDJFeRD6OxEb0+J2iXE1Y+hM7QWeIYHiFscDgRvTIjRK02YX1PAShfngofPbaf3KQySejxfVAcPkLerjkFa7sZnfY21FrbcbrLjSq2BxqHDzUujgQjo+CNreT9bU/HKW+4H/VlZWAyXkexPBunaisxOODD2ZAfk9ERBPpcsLYZYDI2iFM1wM7QCIk52tyC00oFKK+7C63W1l9UmnfuHS8tgviBEuNhHqMjPBYXLiM2N4VIZBiBfi+6nXawDgYdNgvqGt9Ff5ADVVSiQHNzA6ev03lrtdXQaKs2S8pL0Ml2YD42jcuz50WbRHTiHAJ+N7pYG0xnWqBSK8GyHfgdTD7WBNNdZK0AAAAASUVORK5CYII="
			},
			{name: 'separator'}

		],

		//1.在这里定义好想要出现在主菜单下,或在主菜单子目录下的程序(subdir没有定义, 或在上面子目录名列表中找不到名称相匹配的[比如写错了], 就会出现在主菜单下面)；
		//2. 可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
		//    就可以了, 建议先写完上面想要定义, 分类在子目录下的程序, 之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		//   在这里定义firefox的功能按钮, command就是一小段程序, 可以从firefox api, 小书签或鼠标手势中摘取;可选自定义图标;
		//    同样, 建议先写完上面想要定义, 分类在子目录下的程序,  之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		configs : [
			{
				name : 'View with IE',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAODSURBVDhPjZNrTNNnFMbfLFEuAmMCc3EqMCFe0DBH4+YgFpDhug2h8icoBrkNGKFFspAscWNkunEZsZuRrUWQoGCh2BalBS1KNmCp0SIiHbagwOqkIraAWAoivM9q043t237J8+HNc55zTt7kkP/D7akiT/oim0snYoR0OKyDakOvvugKK6emQx6Okv/ixkh8Nh7t5MU1DsnP3Gy5MTdy0PC8NxzdrRmjrefT4x78wgTQ9rC0xd7ow47IMutyFQeiFY8NwoknMC8Igfs7YbiVCoGuD5zOhfn1ZQNKv/S6TS9rqTqcbQ/9zbr8y5/u+20O8qcjwLM8oH8reoZF+GEW+NoEZGufI6p9Gq+WDD6O55fswG22pyNKiGeSZPtuxaRVNn0PmE4FNNsgaK4Z2FWhKwv9UfN9SodxqGAYOKieRVDDBLYcUw2oJYyLI06I77d3JJXGIVs4DYuaHTjyc3UTSWhyc9jEPe6sV4x09EaWdgkRCjPeEAzCNUmSaTfXxp3yyrx2y7xgsa2t2YJKddsUiW1eXs/BmkxpRKpmHhzVDHyFo3DJVqrshqyEG6l79B3QGwiVToLPR+gM06CXJjTqZYxYL+Pa9Mm5ARmnTn8l+fqcrYEFb51+AFfe1SF7A6vlqAB92/FrdyF4fwCFfwLHH9lkBL4ZA74yAAX3gZzfgcTueUQqZuAnNMA5t32cUFoRRMfjdcPKSHA7TMi4CzBtxjF/njIhIL+NeSn/fAWzga9g1n4m2+eTIv7wtcP1HNfEWo5TrDCcYFGQRXu2Pc05XYPNDVbEd1nBbZ+yrGYkb9rX+xc+CRVuXslnWd5JtSEeB6pZzh+V+xI6kSei3awru0+oqrxPjCBMbgbTuYBdIn3Xaqb2nybu+4WB74t0d6IUz/BO/TjWFGuxIrYimdC7H3fQwUP8PcVyr1fy1KaNts9hX5xGzLV5sOsfjgeX3hS/XaqRssXGyUjlLHZKJuEnegiXjItdJKRyBaGa9zTUVBRtH7NfGkMK+mfXi4x4t8kMdosFe9rmENFqRWjzDEIazfCvHMMq/uU+ElW6wZ5Z0nKUdDD9mP1h48iXX4QHF8p6vMvvIfCMEUF1T+wKqB7D68X9VueUhirCLvJ2lNsOwnIueOn63vOLLaxcemETC01bV548yXciXPEHq9IuHPfIuVTlniX/ySmxhrdyb5n9iJYh5C8/3PN2tjrNDQAAAABJRU5ErkJggg==",
				command :
				function () {
					const IE_PATH = "C:\\Program Files\\Internet Explorer\\iexplore.exe";
                    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
                    file.initWithPath(IE_PATH);
                    if (!file.exists()) {
                         alert("File does not exist: " + IE_PATH);
                         return;
                    }
                    var process  = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
                    try {
                         var args = [window.content.location.href];
                         process.init(file);
                         process.run(false, args, args.length);
                    }
                    catch (ex) {
                         alert("Failed to execute: " + IE_PATH);
                    }
				},
			},
			{
				name : 'In Chrome',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALqSURBVDhPjZBrSFNxGMZnKOUlK9MCNfM2dXmpnGeZUzedHjcveUnJClQs0T70IT/0oQsYQSCmOFRMpUQ0LcOplLOkLBRsXlLXStLUNsfQTMRww5rh0zlnQxBG9MDD/+X83+f3f8/LsqSFTNJJl5ceunjprFCXm8LXpMX4jHG5Nubrf0sp4LlrM+PLlvNSp1YKMo0r+RnGpWzJlCYpukzJC3Y3t1nWNDckZ0EUsb6YLMT3DBLLWWLmXEyOgS6OD/XpsPWpgIAcc/tOffL2zlWHBG8t8EKhjeRBJwiHLiaCObV8AvR36h7z/pwt5RHPXHPMJH4d36Pu4kn9nI8/1P4cqIOCoKGaNeGnoKFgGuIY1KEB+BbCZjwb7K0f5B7wYMJEE3GQ7Igtz+ogMcxhY97LD+oTBD63yCBTLKBzVIsZVTtW3nlhbcAReoU9fn2ww9rQ7nIGIGgShJFd8dMpLyUouc6D0t0T443tyK+fRMEjFePLDUp8/dKMPx9tt60f2TNNxa1YwkahSNJNGpN7JTjTI0ZHdBBKZSpIShVIrxhhnEjVFc+nsKlyZsKbSltsjNoZKYA1K7IuUiCWkcYkCkBPcaWWxM3WMRC33yKiZIAxXd95NgmjymUboFfspQE2LOI+4SdqEc0kvhAjmQLQkMr+p+AUy8C+1s2YU9yJ4dH67fDvcTv8eLN/hgLsYvmKfXcLagVSMbXEJLkJkt2XifK+xyiskqOoWg6pvAWrE+6m8AT1+vt9mJO5SCmASYFXA32EjSKDREZBqD3Q+6AnyXqVjrSuVDzo9d8OGxSOWOo9bGi76+hjjpvELeEVxj6M20poJyHpTkAS9Uv0ROdkQqyNOmBjxAE/B5yw2OO6NVTtVmiO7ZBVyA2iKKpKYBA1xoFsJUE+iUeX3A+r/YewJHfFbNtRw+sK1yK61xSxILfzHPbxW+E1xL2o2QvSCON0s7dxosFrdrDCs6ay0JltbvsvWVO2N5uuLYjF+gtKvqi9yWf7TgAAAABJRU5ErkJggg==",
				command :
				function () {
					const chrome_PATH = "D:\\Program Files\\Mychrome\\Mychrome.exe";
                    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
                    file.initWithPath(chrome_PATH);
                    if (!file.exists()) {
                         alert("File does not exist: " + chrome_PATH);
                         return;
                    }
                    var process  = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
                    try {
                         var args = [window.content.location.href];
                         process.init(file);
                         process.run(false, args, args.length);
                    }
                    catch (ex) {
                         alert("Failed to execute: " + chrome_PATH);
                    }
				},
			},
			{
				name : 'OneNote',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHeSURBVDhPpVPdbhJBGOU9GjXWaqs+QeNtn8AL72xJ6w+2+gDGG020XjSpUArcaYx3xgtgf3qBtgpaVkAT7FKwiZWmDRCo7hbWLXSXnM58tCQiNli/5CRndmfOnJnvjEMe8uN/8JuAcHoOob4nEE55EP4L6N8JT4fAeT/76MbrS8+QdEn4OB5GYkJA4loXXBeQmpIhnZ2HdM7XEgif9GBp5AXWn6dRjHxDbV2Dkdews1ohVL9u49eGTrwS30J2Zpk2FQe8cEiDPrKmPoyiHNsAr5+fizCLNeK8mns2drIV4pa5h5X7b8HXcRcO4YwX8oUAMo/fo6Ht0qTY5ZeIDD9F07JpzAUVZ5B4/YcJ9cE7On9LoH+OBNTpKBp6SyB99w0SN0SyyktLl5CclIj/ISAeOpiOtR2kbi/A+K4hPhok6wY7/z8J8E6YhSp0dmmKM4Tq2jY+3Vmgf705cMnQDy4tNxun9n25t0jjngSUq0Foapl4025SPj5ceUXjrgIS66n6KAq7btEkPVOmhYe1WzJYJwrELdPqaCPvwsUAcm6FhWQTOtvZyLPQsCNwzsGDxYPEeWV5syNITIVHMnVLgjIWgsJu/kiwOcmbIu3ejjKlkb0FejAs1kei62M6NvzYBzt1/M7hsTFvAAAAAElFTkSuQmCC",
				command :
				function () {
					var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";//onenote路径,我是office2013
                    var focusedWindow = document.commandDispatcher.focusedWindow;
                    var selection = new String(focusedWindow.getSelection());
                    if (selection.length == 0) {
                         goDoCommand('cmd_selectAll');
                         var allSelection = new String(focusedWindow.getSelection());
                         if (allSelection.length == 0)return;
                         goDoCommand('cmd_copy');
                         goDoCommand('cmd_selectNone');
                    }
                    else
                    {
                         goDoCommand('cmd_copy');
                    }
                    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
                    file.initWithPath(onenotePath);
                    var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
                    process.init(file);
                    var args = ["/sidenote", "/paste"];
                    process.run(false, args, args.length);
				},
			},
			{
				name : 'EverNote',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOmSURBVDhPJZNbTNsFGMULiYrZ5KKTcckIcUNowSEQQXthQLfSwkqBAoUWeqGlpaUFWtoBA4GxAbES5hazTbMMcbhLlm1BhDGFjc1InGOGEVTAzUR98GW+GKOPP/+JD+f15HfO9x1R5HgsEWcSee6Tfbx8UcLr8zLeWVKz/6qc7KtS1PcqUC+XI7ul5I2bCpIv5fDStJjoqUwiJ+IQRZx9hegrGYhnFZR/U4N+sZaC4XxSiiWkqTIp8OcT+raD9sdOXGt2GldNKO4UI5lRsPNMGqLIyVTSZqUYVusxXDeg9iqRGrIRS7IolMqRFb2NplGFyl1CSVcR2lE15mUDB+6XEn0hC1Hspxkol1W4Vizke3LQd+spbpQhlxVQVqGmRl9Nnb6OmqpaqiqqKClSYjlnwrhWJ0ROR7TrUhrVq3oKR2VIZBLkZYXIlXJ0ZZU01Jmw2ey4XC5crU7sdgeG6nqcExZ8Gy5Sr7yJaPcNMebvzeTbcsnYm0GhTEZ5uZb6BhOuFjudne2EQkE6Otpxe9qwmK20hS30bHWQfj0HUdKNbFo3mqgdVJGblYtGo0Zfq8PusOLzB+jp72Gof5D3x0cZCQ/hsDvxjTXTt91BxpxAkDQjxrFpxH2+kbzcPMq1WhqMRjxuB0e6QwwPj3D8xDEufP4BU3MncbpaBQM7AwKBZCFXMPginaaNanoXWylQ5AlFVWK2WPF6vXQfCXFsYIhwOMzg8ACh3na8Hh9tJ+z0bXrIvLUfUfy8BN1qKeHtIFqrBoW0CH11FTZrM13BICNjQ/i7/PSE+gkGe2lpEQodtdK95SB9XowoZmEvJQ/l9D4xMbkxQvhiNz1jnXg73Zw6e5wnz+5zbek0H02P4w+0YzaaaD3VhP9nM3vnhTO+cDuZtx7k0bxRxsjvbq79NcbyP+e492yS1b8/48OZfnzvNvHwj8ucnDpKqUqNb8qE+2k9e+YEgsjbr5K6ko5m7QD2zSr6nlqZ+M3D1J9HufxrP1pjKQPnA8z/e5rAxzZkykICs2ZsWzqS5oRXFn0Vx4tfJ5H+KBPNupSmHzX4tmro+6WR935yoakupsKmRBcoRlqSzyGjnKCwiZr1Q+xeSBHGdDeOiJV4olYS2PPda2SvZXPwsRTdD0U0b1fSMm2grOUgpRYlhz0qnDMN1G0dRrEuI/bLRMFgJorIxR2Ilnb+rzuxRC3FE7eUQMzdBFIe7CNnLV9QATmPskleTiRGiL1jYRcRN5/nPyaxNBndGCsvAAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();")
				},
			}, 
			{name: 'separator'},
			{
				name : '侧栏打开',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJDSURBVDhPY0huOuCV3HxqX3Lr6dPE4sSmkyeTmo+2hGat4mGIrNq7OLr22P/o2uMk4ajaI48C8tdpMgSXbF8dVnHwP6k4uHzPc+/0RfoM/nkbVwcW7/pPKvYv2P7cLXGuPoNXxurVvnlb/iNj/4It/0t6D/1Pqt8NF/PL3/I/pmrH//CyrWC+T+76546J0/UZ3FKXrvbIXPsfhr2y1v6vmXTo/5OXn/6fuPjkf1Lt9v8RpZv/9y48+b93wfH/QH+D1bmlrXjuGDNJn8Exfv5q5+Rl/0HYJWXZ//z2nf/PXX3y//qdF/+/fv3x/8L1Z/9PXXr8f8Oeq/+D81eD1YFx0pLn1mG9+gy2kTNW28fN/w/C0aWr/09fdvR/XvPG/yH5y/6v23Hh/9t3H//vOHTtf1DuMrAaGLaJnv3cLLBdn8EieNJqq4gZ/22iZvwPzF7w3zlh9n8QH4Q9U+b+b5u2Eyi+EC4Gw5bh056beTfpM5gE9Kw2DZ703zR4IhSD2AhsFoJd3Diw/7mBW40+g75Xy2oDv+7/pGJ93/bn2m7l+gxaLrVztT2a/+l4tvwnBWu5N9xTd8xXZ5CzSLdWsiterGpXvFnNvuKOhkvdfxBWc67+reZQcQ4krmpfugkZq9iVrFe2zsmRkQnhZAACRhkZC05BQWN+Jau8KSr2Ff+VbMo+K1rkzpLWDFIVFbXnQcfi4nrcDAz2LCDNyIBZzjynX94i75mMSUopn4ybEFScaMAkaZCQIqEXFcQgb88BFSMAGBgAAtLnCfNaxKwAAAAASUVORK5CYII=",
				command :
				function () {
					openWebPanel(content.document.title, content.location);
				},
			},
			{
				name : '宽度匹配',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGXSURBVDhPYxh4MHHiRPv///8zQrlEA5Ce/v5+B4aWlpZX9fX1TFBxogFIT3Nz8yu4AatWrWI+fPiwIFAOp2tAtoLUgNSiGLB//36WdevWuU2YMKEZKMECVY8BQHIgNRs2bHABscEGtLa2vt66dasrkHOdm5v77Zw5c3iBhhpkZ2ebAA0W2bZtmyiI3d7ert/Z2ckLUgNUew1kCFDda4a2trbP4uLi30RERP5zcXG9rays1BESEvouLCz8u66uLrampiYOyP8NEisrK9MGqQGpFRMT+wbSCzLgG5Dzi4+P7z8nJ+fb9PR0fUFBwV8CAgL/srKykjIyMlJAbCD+mZycrMfBwfGWl5cXZMAvoOu/gb2wePHilLS0tBcgA2bOnCkC9F8YUGPsmjVrVEE4NTU1FuiaUJAcyACgQc8XLVqUDPYCKCCAfuVYsGBBOtC50/AFItASVqA3pgPVpoH0gAMRRAA1MQEDi/3IkSPK+BIVSA6kBqQWpAfFAKgaogHcAGDUhJOblDs6OiIYQKkKKkYyoEQvFDAwAACRUudRsBI1mwAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();")
				},
			},
			{
				name : '站内搜索',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIOSURBVDhPtZLfa1JhGMc9x58cPXO1ZjmYHgw0EHLMYeqlTjcGccRdDXSciygo/LGrunNzxIaDHdxYti5KNliigyAiGOxqGFab0fQP8Ebv/Bu072untrJBI/rCh3Pe532e7/u8P2T/QxTQgpuAA4OABn+lAcCDVbAL8kAEc+AaIOYXigUPwKFcLj/V6XRVcKJSqb4i9gE8BgbwRxMKRdP4HjAMc+zxePLpdDqRyWQe+f3+nFar/URRVBk5YeSoexW/SYPJJfDFbre/KpVKdxqNxmC73R4oFArjMFxXKpWfNRrNc5Zlh6SaM9lsthG0ug0++ny+e7FY7Ocq3W5XEQgE7ur1+vcKheINQje+z5xTMBgchfMLmqaPOI6bdzqdSmmKiDaZTJOY38eZvDYYDNel+JmKxaLObDYvos0jsInQLUBMyPWZYJzA6kVsb8Xtdl9FrE9UNBqdMRqN+zist4Bc4yyYAQmMN3A+216vV4hEIuSN9KtWq10RBOGh1WrNq9XqPRS8BM/wL6L1NdIZxk+ROgFUvaLzwmFR5XJ5JJfL8fF4/AnP88tgMZlMLmSz2fsul2sV29hB6haYAnJS94uISavVYur1+milUrkNw7FqtWpuNptDoihOORyODVzlO5CyWCx6qaxfxAjQEr2XBzMWnUyHQqG1cDgspFIpppd8GZHuYMh1Op3hH8b/KJnsG8oVmLKVinkyAAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:var%20ax=prompt('%E8%B0%B7%E6%AD%8C%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2\n%E8%AF%B7%E8%BE%93%E5%85%A5%E6%90%9C%E7%B4%A2%E5%85%B3%E9%94%AE%E5%AD%97','');if(ax.length>0){window.open('http://www.google.com/search?hl=zh-CN&client=opera&q=site:'+encodeURIComponent(location.hostname)+'%20'+encodeURIComponent(ax))};void(0)")
				},
			},
			
			{
				name : '自动刷新',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK2SURBVDhPY0AGq/6HMs9/YFo794Hp8oUPrTIWP3Aymn/fXqC+noEJqoQwmHpT2nvybZlPU24p/pl0Tft130Xzox1n7YKg0vjBkmde8vMemkycekvu28Qb0v87Lyn8rzuu9q/ysG4DUJoRogoHWPLE3mD2PZ3DU27J/Zl8S+p/3zXZ/63nlP5XHtL4VLRP0xmqDDuY/9JUYvY97b2Tb0n/m3Jb6v+E69L/Oi/J/qg/qfKvdJ/WueKdemJQpWDwH+iaVaGhzFAuA8Os+zoZQH//mnRTCmTAvUk3ZTrazymmVB1Re160R2ti6CoGhGIgOCYjw3lYWVkbzJn535h1+h2lVZNuSnyfckNq6dS70nqr/jMw11/RYivZp92Wv0vPHawQCZy1sFA5qKraeMbYmJVh5lNJLmDIb5h8W7Jy4i0hPqgaMKifry+wONcMRey8u7vCUX39tfvl5HZukpTkYph5xph10i3J5CkvRXmgauDgsIGB/hETk/pjFhac++3tWU47OFgf1tU9sFdO7u9eaelVYBeAwJyH6lKrViEFChRsU1FJ2qqg8GafqWneAVPTtu1KSk+2SEn93ywp+WublFQmVBl2AAxppjVyctNXiIn9XyMl9XO1pOTfVUD2SjGxf2tERfevFRGRhCrFDlYpKfEvlpA4Ol9Y+D8ILwDihcLCfxeKiJxaKiJiDFWGG8yWl9ecLir6dKqg4P9pQDwdRAsJbZ8jLKwOlMafKoGAcaKoqHKvgMD+bn7+V718fD97+Pn/dfPwbAeyhaBqIGDlypWiixcvNl24cKH7okWLgoF0FJBOXrJwYeq87u7y2cXFk6bHx2+e7ONzo9/a+vn0zMxqkFqQHpBeBqBixSVLlgQB6WygYBWQ3QKkO4D0JKDYVBAGsRcvWNC5aN689oXz51eD1EL0LFIEAGnEJwptdKj6AAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(p){open('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3EForce%3C/a%3E%3Cscript%3Efunction%20i(n){return%20d.getElementById(n)}function%20z(){c+=0.2;if(c%3E=t){c=0;e.location=u;r++}x()}function%20x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22Reloads:%20%22+r;i(3).innerHTML=%22Time:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)}c=r=0;d=document;e=opener.top;u=prompt(%22URL%22,e.location.href);t=u?prompt(%22Seconds%22,60):0;setInterval(%22z()%22,200);if(!t){window.close()}%3C/script%3E%3C/body%3E')})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')")
				},
			},
			{
				name : '高亮关键词',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABKSURBVDhPzcqxDQAgCAVRFnF5d3AlY+0C2PyOI6Gw4JLrnvXJr3ll8RhhWjxGmBZv3zxeOo0wnUaY7tXawyuLxwjT4jHCtPivzB566PWhwL2sEQAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:%20(%20function%20(){%20var%20count=0,%20text,%20dv;text=prompt%20(%20%22Search%20phrase:%22,%20%22%22%20)%20;if%20(%20text==null%20%20||%20%20text.length==0%20)%20return;dv=document.defaultView;function%20searchWithinNode%20(%20node,%20te,%20len%20){%20var%20pos,%20skip,%20spannode,%20middlebit,%20endbit,%20middleclone;skip=0;if%20(%20%20node.nodeType==3%20%20){%20pos=node.data.toUpperCase%20()%20.indexOf%20(%20te%20)%20;if%20(%20pos>=0%20){%20spannode=document.createElement%20(%20%22SPAN%22%20)%20;spannode.style.backgroundColor=%22yellow%22;middlebit=node.splitText%20(%20pos%20)%20;endbit=middlebit.splitText%20(%20len%20)%20;middleclone=middlebit.cloneNode%20(%20true%20)%20;spannode.appendChild%20(%20middleclone%20)%20;middlebit.parentNode.replaceChild%20(%20spannode,middlebit%20)%20;++count;skip=1;%20}}%20else%20if%20(%20%20node.nodeType==1&&%20node.childNodes%20&&%20node.tagName.toUpperCase%20()%20!=%22SCRIPT%22%20&&%20node.tagName.toUpperCase!=%22STYLE%22%20){%20for%20%20(%20var%20child=0;%20child%20<%20%20node.childNodes.length;%20++child%20){%20child=child+searchWithinNode%20(%20node.childNodes[child],%20te,%20len%20)%20;%20}}%20return%20skip;%20}%20window.status=%22Searching%20for%20'%22+text+%22'...%22;searchWithinNode%20(%20document.body,%20text.toUpperCase%20()%20,%20text.length%20)%20;window.status=%22Found%20%22+count+%22%20occurrence%22+%20(%20count==1?%22%22:%22s%22%20)%20+%22%20of%20'%22+text+%22'.%22;%20})()%20;")
				},
			},
			{
				name : 'WOT 检测',
				subdir : '辅助功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL0SURBVDhPrVJ9TE1xGH50U0KqWeFaxmQj/ogS95xbVzXfdfvQlxB9+Kots6xR02kpH5vS7bJhKVOUlEws2oipKTcz0xZjs7Gx0EZNpriP37ndxh/96dnO3vecvc/zvO97XrBkSgG/nvSX3RHBUldCQHKBVs17+pr8uvqq/Cyfqpep38eFSrZ+8T9nI30JYEvL+ftqzL4bQfNzI493yzzRbWBFbyIb32U2Vr1VJtmpo1CdbWTrPf76PUw1ZpRrGX4ODL8GxtwAo5tEXgcmNnqw2CILMaPWThcdnJpG1VEljz3qO0unMbYQ3CbIOx6A6U/ApFbQWDuZBx7MZeXrNd6jAmKEj4M9L1XnEXsH8SZRfB2Ut6LLfy2aA8JFni66qRJij0S86sakq/N6bQLD38w61THvgi/ZH8BNJ8HmV9qf6li2AjsCN2IwMAFcXypE7oNR1fO5zuTjDHXbLa0HmXVXQ3WcHS1g3HFsV/+OnWvDCiOMumhwRRoYWwtubvJgZKVvEj5/f1PU9uEY0zvEog6Au7vB7c/grihwtHacCFMUxQEGOPqtg6ckBHQpYMgRsZvbLoy+6FuEh28ails/KExpF85XhIAF3PkEy5V6ONXXx2nsDUBKQJAuBgNSKrgyB0y+48yYi4vf43R7rt/jfhMzOoXATbHtx/ix9ylyMtowFQoc/Hdhon4vPORMdErx+CnvBg2igy3NboyqWlxpUzd3plF54cq422DCLYzsseB7agf2RVyCj6EEPqGFqJFTMKBLhlXeD642T2Big7ftam2IrlhSVGhZREFiZD0YWqGxbqieMhJ73YmhpY6fpRzNkJSG31IWqC9wZFSNq3VTzcL3dvoogstm90dcnsqEZnF54gJDz2solblROuxCfaYgZoNSvgNXmd0ZX7fgr/u/CCmf80gqmcGVRa7U5TtRynWgPm8CZeEqHZ1MuWw6N5ydNz55DGEm7VJDubZBX+bVF2zyZLDJi3oRg07PHAo5M+uQvex/AfgDSpaKPlVGcgYAAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:(function%28%29%7Bvar%20f%3Ddocument.getElementById%28%27wot-bookmarklet%27%29%3Bif%28f%29%7Bf.parentNode.removeChild%28f%29%3Breturn%3B%7Dvar%20l%3Dlocation.hostname%3Bif%28l%26%26l.length%29%7Bf%3Ddocument.createElement%28%27iframe%27%29%3Bif%28f%29%7Bf.setAttribute%28%27id%27%2C%27wot-bookmarklet%27%29%3Bf.setAttribute%28%27src%27%2C%27http%3A//www.mywot.com/bookmarklet/%27+encodeURIComponent%28location.hostname%29%29%3Bf.setAttribute%28%27frameborder%27%2C0%29%3Bf.setAttribute%28%27scrolling%27%2C%27no%27%29%3Bf.setAttribute%28%27style%27%2C%27position%3Afixed%3Btop%3A10px%3Bleft%3A10px%3B%27+%27width%3A135px%3Bheight%3A235px%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bz-index%3A10487575%3B%27%29%3Bif%28document.body%29%7Bdocument.body.appendChild%28f%29%3B%7D%7D%7D%7D)()")
				},
			},
			{
				name : '右键防复制',
				subdir : '辅助功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKuSURBVDhPVVNLSFRRGL6gIorixieI4mMhIpSajjPqzNy5M82M87j3zujoYrSNECIyE6KYYjQ1tRMfaVAbQYiwoHZBaS1cRA8qqKhRwVQCqaBW5fLrO9cHuvhmzj3/933n///zHykQCOAkwroOn88Hk8WCs42NONPQgCaTCR6vF+FQCMET3GAwiGMDEVBVFbLTaXxfHh7G7elp3JmZweTYGHRNg01RDJHAKYNjscuFRDyOndVVYH39AKkUsLmJn2trmJ2YgIOcgDA5aaBRbOfJt4aGgJUV/FtexqPRUSR6e5Ho68MiTX8sLRmx++PjRpbiQKGVNLo4WXOMG3/n57GbSGCABLPNBsXtRr0sI8rUd5JJ/Jmbw/7CAq53d0NmT3RqJJ1Nc1DwLBrF/sgIxim0eDyIcF+mcZzEPfbjN3GP6X+PxfChvx9ummrkSB52NmS3Y4PktzzNTYMQA3ZmdomC3Z4e/CJnqrUVDWYznra3Y48nX7Ba4RIGzq4u9LS04HNGBh5mZ8PV0QF7OIxYbS1SJSXYLi5GsqoKNmaiUHA3Lw9bmZm4yCt2dHYyA/7obW14LUl4kZ4OM9OP19XhI7+/EFdoYPX7EeY1ipIe5OQY+700OM/DJY0Bhe6Ps7LwiYHZwkK8439KiMvKYGe6nSxHYVbR5maD8zwtDV72QBUlaHR3ssZYTQ2+MigI74nB6mqcY3YeCq2Mq+zNE5a4zdhVGssU69QezAFPcPBjpqAAGyS8IW6SNFhfjwGO8o3KSrxkeTvcX8zNhZPXGzyag6NJFBsKG3ittBSvSBTkb8QWsUuIsqaKiuDizfjJPTWJR6MppstB6HxIYxUVmGZGs/n5mCwvR4QPSiYvcCg2dITkZ+rG4xDgRojwse7WSARN7EET1xauvVyLmCE+5Kqqiv8c/ONMxvueZQAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)")
				},
			},
			{
				name : '360防复制',
				subdir : '辅助功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABfSURBVDhPxZBdCgAgCIN766AdrYMWPiyGZL9GHwxS27BCyrHcyDcAcG/UF5kBM+DpBjA85zuoWwDgswU8ouEfAKsWLQVo2LO1QU9vNtDoOXvMAK71HLXI9wkn+h0QSwVxrKcf+mxZagAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:document.body.oncopy=null;void(0);")
				},
			},
			{
				name : '短网址生成',
				subdir : '辅助功能',
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMjSURBVDhPfZJdSJtnFMcfO2GFpet0rWwOF6WzoSsMh984OtRMpduKIrVRQv2mqElk1phGrW0idG5mbZkI2xi7ECxZwOHslsS4DskMik5mLgZ+wFJtZ9fRzW1Xhcb31/d92pvdeODPc87hPP9z/ocj7HY7DoeD9vZ22trapN/V1YXVasXtduPxeKTf1NREZ2cnTqeTjo4OWa+9wufzEQgEqK+vx2Qy4ff7GR0dpbe3l1gsxvz8PKurq/T09NDd3c3CwgItLS00NDTQ2NiImJqaIhwOU1lZSUVFBbOzs4yMjNDf38/y8jIFBQUyNzk5SXNzM2tra9TU1FBVVUV1dTXC6/USCoUoLi4mPz9fTjM0NCTH04o1SUtLS/T19VFXV8fKygrl5eWUlJRgNBoR4+Pjkj0rKwuDwcDExAQulwuz2czGxgZzc3NEo1EyMjKkRI2ssLCQ7OxscnJyEIODgywuLqLX69HpdEQiEbmw2tpagsEgycnJatcoFouFoqIiWZuWlkZKSgrp6emIl1JTCU6HCM38gNfrU5e2QPKLh+S4/qCfhH0CU+0Zfl5eotRYyvr6ulrnZWxsjNzcXIRq6J7dx8myYk69W0bSwf1akhd0B0g9pFf9BBXPYHj1GAefe15K0STk5eWRmJiIMJzuIvM9C68Umnn5TRNH8hpJe72VNyre4aQtkzLbMU7YMtCbkzCefR/zGTOZRzPlzmxWG+Ktz2K8fXWD0su/UvLBLxScjfBa0U+UX7zOlU0jjugJTs8d4fjNw7h/HOHBnQecazvHtaufoJno/zzMwOgsA9dvcXF4BudgkPOOABeu+PB86+LDr50M3LDT8dV5rnlvEPguTIN6QJfcHnUv64jNvx4h8XeczZ04W//EufPfLls7CrH7cPtP+E3Fzr+gPILY7S2a1Uv85maQhw/jiKSP4X/46Ck0f1jhsEfhgGuXC7fU3yhs37svCUIzM08kiAGFPXFZRbeC5fs4iqKwdXdbEgTV69ViIS6pLHsgwaW+drD6d2XHu7/fo6W1VRJoJrK/gL2Q/yUc/xSGI08Jtv+gVZMwPa1G8BiWoY1GuX/zcQAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:function%20iprl5(){var%20d=document,z=d.createElement('scr'+'ipt'),b=d.body,l=d.location;try{if(!b)throw(0);if%20(!l)%20{alert('%E8%AF%B7%E8%BE%93%E5%85%A5%E7%BD%91%E5%9D%80%EF%BC%81');return;}d.title='(Shortening...)%20'+d.title;z.setAttribute('src','http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl='+encodeURIComponent(l));b.appendChild(z);}catch(e){alert('%E8%AF%B7%E7%AD%89%E5%BE%85%E7%BD%91%E9%A1%B5%E5%8A%A0%E8%BD%BD%E5%AE%8C%E6%AF%95%EF%BC%81');}}iprl5();void(0)")
				},

			},
			
		],

	},
	subdirPopupHash : [],
	subdirMenuHash : [],
	_ExternalSubMenuPopup : null,
	_isready : false,
	unescapeHTML : function(input) {
			return input.replace(/&amp;/g, '&')
		  .replace(/&quot;/g, '\"')
		  .replace(/&lt;/g, '<')
		  .replace(/&gt;/g, '>')
		  .replace(/&apos;/g, '\'');
	},
	init : function () {
		var insertPos = document.getElementById(this.insertafter);
		if (!insertPos)
			return;

		extSubMenu = document.createElement("menu");
		extSubMenu.setAttribute("id", "ExternalSubMenuID");
		extSubMenu.setAttribute("label", "多功能菜单");
		extSubMenu.setAttribute("class", "menu-iconic");
		extSubMenu.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYUlEQVQ4jWNgYPj/n5GRPMzA8P8/AyPjfyj4hx3/w4H/Qw2BGPDv/7SzRVjxU1FVrPj/v3//GRj+UWYAxS4YTgb8+///f8ruD1jx369pWPH//6MGUNcAPFkJrwwkR1KYnQHdFt9E917n4QAAAABJRU5ErkJggg==");
		var contextMenu = document.getElementById("contentAreaContextMenu");
		//contextMenu.appendChild(extSubMenu);
		contextMenu.insertBefore(extSubMenu, insertPos);

		var ExternalSubMenuPopup = document.createElement('menupopup');
		ExternalSubMenuPopup.setAttribute('onpopupshowing', 'event.stopPropagation();gExternalSubMenu.onpopupshowing();');
		this._ExternalSubMenuPopup = ExternalSubMenuPopup;
		extSubMenu.appendChild(ExternalSubMenuPopup);
		setTimeout(function () { //延时加载菜单，不对启动造成影响，也不影响第一次打开菜单时的响应速度
			window.gExternalSubMenu.loadSubMenu();
		}, 2000);
	},
	loadSubMenu: function() {	   
 	   if (this._isready ) return;
 	   if ( this._ExternalSubMenuPopup == null ) return;

 	   var ExternalSubMenuPopup = this._ExternalSubMenuPopup;
         for (var i=0; i<this.toolbar.subdirs.length; i++) {
          if (this.toolbar.subdirs[i].name == 'separator') {
            ExternalSubMenuPopup.appendChild(document.createElement('menuseparator'));
          }
          else {
            var subDirItem = ExternalSubMenuPopup.appendChild(document.createElement('menu'));
            var subDirItemPopup = subDirItem.appendChild(document.createElement('menupopup'));
            subDirItem.setAttribute('class', 'menu-iconic');
            subDirItem.setAttribute('label', this.toolbar.subdirs[i].name);
            subDirItem.setAttribute('image', this.toolbar.subdirs[i].image);
            gExternalSubMenu.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
            gExternalSubMenu.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
          }
        }

        for (var i=0; i<this.toolbar.configs.length; i++) {
        	var configItems;
          if (this.toolbar.configs[i].name == 'separator') {
            configItems = document.createElement('menuseparator');
          }
          else {
            configItems= ExternalSubMenuPopup.appendChild(document.createElement('menuitem'));
            configItems.setAttribute('class', 'menuitem-iconic');
            configItems.setAttribute('label', this.toolbar.configs[i].name);
            configItems.setAttribute('image',this.toolbar.configs[i].image);
				if (typeof this.toolbar.configs[i].command == 'function') {
					configItems.setAttribute('oncommand', this.unescapeHTML(this.toolbar.configs[i].command.toSource()) + '.call(this, event);');
				} else {
					configItems.setAttribute('oncommand', this.toolbar.configs[i].command);
				}
            configItems.setAttribute('tooltiptext', this.toolbar.configs[i].name);
          }
	    if (  this.toolbar.configs[i].subdir && gExternalSubMenu.subdirPopupHash[this.toolbar.configs[i].subdir]  )
               gExternalSubMenu.subdirPopupHash[this.toolbar.configs[i].subdir].appendChild(configItems);
           else
          	   ExternalSubMenuPopup.appendChild(configItems);
        }

	if ( this.autohideEmptySubDirs )
	{
		for (let [name, popup] in Iterator(gExternalSubMenu.subdirPopupHash )) {
			if ( popup.hasChildNodes() ) {
			   continue;
			}
			else {
			    gExternalSubMenu.subdirMenuHash[name].setAttribute("hidden", "true");	
			} 
		}
	}

	if ( this.moveSubDirstoBottom )
	{
		let i = ExternalSubMenuPopup.childNodes.length;
		while ( ExternalSubMenuPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && i-- != 0 )
		{
			ExternalSubMenuPopup.appendChild(ExternalSubMenuPopup.firstChild);
		}
	}
	this._isready = true;
	},
	onpopupshowing: function() {	   
 	   if (!this._isready ) this.loadSubMenu();
	},
}
	gExternalSubMenu.init();
