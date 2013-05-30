// ==UserScript==
// @name           ExternalFuncButtonM.uc.js
// @description    多功能菜单，代码来自lastdream2013，功能整理by defpt
// @include        main
// @author         lastdream2013
// @charset        UTF-8
// ==/UserScript==
var gExternalFuncButtonM = {
  autohideEmptySubDirs: true,  //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom: true,  //把主菜单下的子目录移动到最下面
	moveablePositonOrInsertafter: true, //true : ToolbarPalette moveable button  false: insert appbutton in "insertafter" 
	insertafter: 'alltabs-button',  // useless if moveablePositonOrInsertafter is true;  urlbar-icons addon-bar TabsToolbar alltabs-button
	toolbar :
	{
		//在这里定义好主菜单下子目录的名字,以及图标； 可在中间加{name: 'separator'}建立一个目录与目录之间的分隔线
		subdirs : [
			{
				name : '备用功能',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANvSURBVDhPdVNtTFtlFL6bW+NU/GFiXKaYTRc1QnEbm7JkbgETWUBKOyhMGYMGWqHIR1u6Xgr1Fi79oC2XFrilG9AA7ZAN2ELqkGxE3ICwOY1LHNOILpnRxB/610R6+z7e1qtGo09y8p7znvOc95wneSmGYbZRFLVFOlMQfVnSOJ+zlQ/0HtPpdNsvqtUPSen/h0jamjQppGjasNdsNqdJIfWfTa5mFeczakY2RtuypSvK4WAyOc5b6PE4FobGh8LjlTUn/E1NT0npf2L6kLJqQpa5vPRkDtYUevpcmyXQF+xNDA750WZsQtDvwfUPZ/Hg1tL92bmp7uRqEvVv+OS5Ed8ju7+7svUlXE3LAl9dDY+7S/ix4YBwny0WxoYHE7fvrOHmmA/TnnZ1kvPXqqKTEs+sqjjgop5NjFPPbYZ37k20GN7Dt8ZXyU+cksRmJsm1lU9++8pZGf85VPyBxPujQVIYtSQOV1jhDqTtRs/RI3GtQU+UBfmgm+rR091O+ECPMOhmyJxTv5oi/hsmk+nRgXBI3tioFSy2M4KytDSRlfECKcjLQXVpIbTlb8UVbx6D2W5fStb/+Sg17+5t4XNPLHNp8u/9z7x242SZ6leTxUCspjJSV1dOjBYTXJ5u9PN9m6w4ib5W400RRaTW8KQfQmBHBtb2HMe67CDcu/ajnjbiy48HcHvBg09XFnFt/iJmL0yQC+f9ZIrT/LCSV3H3klJnTnWpT5fHJ7ZnCN+omxNfZ58ULj2RQw6/cZRMRkfJxt1bZP2zJWzcWcaD9TVsfLGKe5/HsDoTwcqLRbjxfEGUGng4k8Rkr5Dr1MtkcYsctvSDJFeRD6OxEb0+J2iXE1Y+hM7QWeIYHiFscDgRvTIjRK02YX1PAShfngofPbaf3KQySejxfVAcPkLerjkFa7sZnfY21FrbcbrLjSq2BxqHDzUujgQjo+CNreT9bU/HKW+4H/VlZWAyXkexPBunaisxOODD2ZAfk9ERBPpcsLYZYDI2iFM1wM7QCIk52tyC00oFKK+7C63W1l9UmnfuHS8tgviBEuNhHqMjPBYXLiM2N4VIZBiBfi+6nXawDgYdNgvqGt9Ff5ADVVSiQHNzA6ev03lrtdXQaKs2S8pL0Ml2YD42jcuz50WbRHTiHAJ+N7pYG0xnWqBSK8GyHfgdTD7WBNNdZK0AAAAASUVORK5CYII="
			},
			{
				name : '批处理功能',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMwSURBVDhPrVJrSFNhGD7dr0hRatq9zNS8pKUdnKaV1nTpnOHUtbaotkWBS51h3lYblShpWTpXKqVdcKURZUWtNiuhDP3VBf9YBNrm1LlcoJ3zfW/udAqDfvbAy8vD+zwP7/fxEpOhVqun6vX6GSwlZAUCL6mSv4ClhGsGAFNY+jcmD47d5ajkFXGHC5/wbytvx+kLG9NVGSVhMnY8oSX+DgHil/nIVY6w8D7/Qv77+C8nLcmQ+24HKLsjQfsuFVRt4e/L7yXVCsSceJfWta2rM5ggs9V6qV+eKapOZY2FfZ1+iLxL0NzmuSihaQ6Krycoeet6KHy5BUSqwDLNecU6uV7+56kMFMaAjlOf0ijeE7exxNYVqOR5Dj5tzJsoFS55nIUFdd4oXTdv7NybZCr7sv8Dl4fZIi0tbZosXxC+37Cxm29aBKktC2lxMwkITfwKi+8/KBBcXoel9R605IY3KC6GmGXZ/CA2IGCm7HpQs6prKwgNnpSocQEIdcHY5hwCCv1gqs/RD0mXfEBU7Q6pVR5UkTEWxBr/WmZ1V0rm8UDFwbaVSNTkRcdqZ+CY0ythcHQYaIoGRCPot1uAq/PDwoZVSHLNFx29s2E85VCIkAlIzljurW2L7lS0rkW7qrxonbkG2j8Y8ZB9CJyjTnA6nWCz2+BFjwnrOmpw5s0gusgUjTQtSSYmwAVu5pKYI43LxsJzCXygbjdyOL7DyLAdbIM2GBgcgG8jDrDaBkF5PwNlPQvDpa92jWyMWBXC2glCVbZZLKlYNBqTR4xHFhNIeUuMbQND2GL9ClarFff3W/CJpzKcZQ6ltW+3j1d27XGkiDgJjNlgMEzjcrmzyEQ3YVaLL6RXe0LKFU/q5KN8PGyxY2vfAD5jPoFzX3Ooys8CaLDsBTJmGZckyTlMgJ49iKidQZtS1IuN0to1fQVmEva2bMDV5ip0vr2cVr7mQINdAmdNvN7suuiHEVEBAYyZmHTSv09TfiGw+mDN+p5Tz6NH8zq2geZjIlR28m2lzxJ6M3OCtax2uqv/E9t55FJ3d/f5kmJ/DcnzOMbbv7ogSep73MfHxy0yMtSblf0vEMRPhbul4Mu/IqIAAAAASUVORK5CYII="
			},
		],

		//1.在这里定义好想要出现在主菜单下,或在主菜单子目录下的程序(subdir没有定义, 或在上面子目录名列表中找不到名称相匹配的[比如写错了], 就会出现在主菜单下面)；
		//2. 可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
		//    就可以了, 建议先写完上面想要定义, 分类在子目录下的程序, 之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		//   在这里定义firefox的功能按钮, command就是一小段程序, 可以从firefox api, 小书签或鼠标手势中摘取;可选自定义图标;
		//    同样, 建议先写完上面想要定义, 分类在子目录下的程序,  之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		configs : [
			{
				name : '用 IE 打开',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAODSURBVDhPjZNrTNNnFMbfLFEuAmMCc3EqMCFe0DBH4+YgFpDhug2h8icoBrkNGKFFspAscWNkunEZsZuRrUWQoGCh2BalBS1KNmCp0SIiHbagwOqkIraAWAoivM9q043t237J8+HNc55zTt7kkP/D7akiT/oim0snYoR0OKyDakOvvugKK6emQx6Okv/ixkh8Nh7t5MU1DsnP3Gy5MTdy0PC8NxzdrRmjrefT4x78wgTQ9rC0xd7ow47IMutyFQeiFY8NwoknMC8Igfs7YbiVCoGuD5zOhfn1ZQNKv/S6TS9rqTqcbQ/9zbr8y5/u+20O8qcjwLM8oH8reoZF+GEW+NoEZGufI6p9Gq+WDD6O55fswG22pyNKiGeSZPtuxaRVNn0PmE4FNNsgaK4Z2FWhKwv9UfN9SodxqGAYOKieRVDDBLYcUw2oJYyLI06I77d3JJXGIVs4DYuaHTjyc3UTSWhyc9jEPe6sV4x09EaWdgkRCjPeEAzCNUmSaTfXxp3yyrx2y7xgsa2t2YJKddsUiW1eXs/BmkxpRKpmHhzVDHyFo3DJVqrshqyEG6l79B3QGwiVToLPR+gM06CXJjTqZYxYL+Pa9Mm5ARmnTn8l+fqcrYEFb51+AFfe1SF7A6vlqAB92/FrdyF4fwCFfwLHH9lkBL4ZA74yAAX3gZzfgcTueUQqZuAnNMA5t32cUFoRRMfjdcPKSHA7TMi4CzBtxjF/njIhIL+NeSn/fAWzga9g1n4m2+eTIv7wtcP1HNfEWo5TrDCcYFGQRXu2Pc05XYPNDVbEd1nBbZ+yrGYkb9rX+xc+CRVuXslnWd5JtSEeB6pZzh+V+xI6kSei3awru0+oqrxPjCBMbgbTuYBdIn3Xaqb2nybu+4WB74t0d6IUz/BO/TjWFGuxIrYimdC7H3fQwUP8PcVyr1fy1KaNts9hX5xGzLV5sOsfjgeX3hS/XaqRssXGyUjlLHZKJuEnegiXjItdJKRyBaGa9zTUVBRtH7NfGkMK+mfXi4x4t8kMdosFe9rmENFqRWjzDEIazfCvHMMq/uU+ElW6wZ5Z0nKUdDD9mP1h48iXX4QHF8p6vMvvIfCMEUF1T+wKqB7D68X9VueUhirCLvJ2lNsOwnIueOn63vOLLaxcemETC01bV548yXciXPEHq9IuHPfIuVTlniX/ySmxhrdyb5n9iJYh5C8/3PN2tjrNDQAAAABJRU5ErkJggg==",
				command :
				function () {
					try {
						var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
						file.append("Internet Explorer");
						file.append("iexplore.exe");
						var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
						process.init(file);
						process.run(false, [content.location.href], 1);
					} catch (ex) {
						alert("\u6253\u5f00IE\u5931\u8d25!")
					}
				},
			},
			{
				name : '尚译划词',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMpSURBVDhPJZPdTxRXGMZHcGZ2ZrVeNOnXRXvZtPGiJk2t1SjsAmLRsgu7y5IQmzQNqSE1ppZlP2Fx2V3YDz4sxWIU64K2UAiiFgtpbQLGmKjhqknTi9rrJv0bfn3P4eLJycyZ3/M+73nPGN7oZZzoFN6uSdyucfZ3i7oqOOGSaBQ3XGRfpIg3nMfuyGEHL2EFs1iBIUx/BsMV2NXwBHa4ivHJKHuCYwKP4QkVqQ8WME5fwmgTSGA7OLwLt6TZ25gSAwVHx7EEfrmnSu/EdQ6dnxKjAp7OPG+cLdI+NE1A5HQOYwYGsVoyGt7r0wYTUr2KE6lKzDGurCzxbGeD97+sUPt5hZmlGi/+fsSff23zSvcge5rSmL409QKbykCBTqSCGynr+MaZHO/1VTjUV+bew2Wqt2r8+nid4xdl35/Cbc5gN6nqSS3DFdgJl6XfUd75osqV1RU+LV/FOJ7iowsV/nnxmOd/bHG0bwzj2ADGYdHROJbApjoDK1TmpWiJ0sI8D7eX+e/fHYZv1OjOfcMvW6tS/T65a3NsPVmXRKtkvv2Otq9K1DcmsfySwCPjUtXfPTfB270lrq4ucm58huL8TXryk2LwgLXNZfpGJyl9f5OZH2sEYmXqGySFNhDYkXEZZ0Y40DXC/L0fiOSmOdhb4PPCZZ7s/MZPD5Y4daFIXYPEPxKTFgbkDiTkEBPKoIgbKlDXnuOI7nmbpzvrzC7eIDk9y/bTTdY2Frl9Z467m7d4KzQkE0hIdZEvLgYyazeUx2gdInt9jo1Hd3kzkiWaHte6//sa/VOzvH46xcGzOfa3qvGpQ4zr1bA78njkipqBYV7tGeG1Tpl1g0Q7IZsffs21lQU+y8nF+uCiHJwCEzLGXQPLJy3p+92hrmgW82RKNpN4T6XwSiXbH6d2Z4H2/oqMsB+3JYFHoqv3pn8Ae9dAfo5AFs/HafadTOIK6LQktUz5MJquSN+D1DUKIJXtJlnlvSUG+gxsgZ22DK5U11JwszJIaBknYvpjT7NAAntElj8m/YuRmBqurqzgtAASXaVQUZWBQN7WuKzyrCqrBALb/n5tYvli/A/bgheQIo8aZgAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:void((function(){if(window.Como&&window.Como.someyi){Como.someyi.open()}else{var%20a=document.createElement('script');a.setAttribute('type','text/javascript');var%20b=document.charset?document.charset:document.characterSet;var%20c=b.toLowerCase()=='gb2312'?'pack-gb2312.js':'pack-utf8.js';a.setAttribute('src','http://yi.comsome.com/'+c);document.getElementsByTagName('head').item(0).appendChild(a);Text.prototype.tagName='#text'}})())")
				},
			},
			{
				name : '谷歌翻译',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFPSURBVDhPjZExS0MxFEajCOLqD9DdyT/h5q44OIiLm9BJEMRRwU0cWjoUunQQcRGpOKiD8EAfShWHakWeipRu6uBy5Vy9IXm21MAhTZrv3Js8x/h8b0tIp93yvL3ciR7qNfLhen1PSuXtSPD6fNNbQojAympBmV+YU2wN2VPjf4IwGIr6CuA8OdFA2kg0sLS+IcuJeGZORaaPPmTyQGS09qWoIHwwq0hHmxedvgKVhAIe0FrPh4+bmYKkq+Dh/jK6OyGDbuxr8NvCI8VMHH9w76FCU9+BLlhby0BlO0ehPwLCBg8I3BUQUHk3SbU6AvYIqyAMGwRMQAjh2mGqQQTIvIARhlkPzO77Nu2zEjTYm6g8yvDW1Y9gcPFMw8yAAMKKU9VrhU4QMEeCfNhAQNBaBh4bvIDRTcIBCMO2Z/zG40GYmXuOl1oRYzu3Huec+waxf3TWiFPEawAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200")
				},
			},
			{
				name : '视频下载',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIWSURBVDhPtZJdSFNxGMb/ZVEX4WKViCPTRVBeeJFIjEDMUKadwMWW1cVIqSFCGRWISGRCV7Z0yxlG5lxGVGQw6AusO8PNYDvqhDIItRL6wHU82OXT+579iRaxvOmBHzw87/O+h8M54r+o2t0R8/iewdMzkoK8crwjJsf/kNVlauh7idDkIsLvlhCe0TBInjNHY2eObGUQHai/PQZ/PInL0UUDXywJzlZ2oMRlcg9F0BXX0D7+3aArpoEzx7kVHfCYjoYi8E7oaBvXDLyqDs7sp3xbZCuD6MChgVfojOs4H9VxekxHS0TDnu4XKHJeNMtWBtEB+8BrNI8msXv4K3bc+4KDT7/BdGkEPJOtdFU4W+crzwZRfuERrO3PketPoPbxZ2wfWjBgv7l7CnltT1B85i6K63uwtcT9Xq7TQ52tTmvznR/l/RNwDM+jLvwJ+x58REH/rEHZ/Q84TFntwznsvaFCHLu+LIqO2OW6lO1Exaam4LISSqAw8AaWwFtYemdSkOesZjABM3W4K7fStErYGsrMjbeWlOAktvmnkXt1yqCA/AHKeMYdo/uHOFhNrBWldfs3nuzTFXodq1dF4RUVNTdVcMYzo5Pqph3hYA2xntggdinV2e5rWmUgiqreKNhzZsxSHe7yzi/xtSxiHZFN5Il8myurqmWBYU+ZheDPyB3u/vU1eMBP4B8mn9gpYc8Zz35bFuIncO4bfNt9aWsAAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();window.open('http://www.youtubexia.com/?url='%20+encodeURIComponent(document.location.href),'getA','toolbar=no,%20location=no,%20directories=no,%20status=no,%20menubar=no,%20scrollbars=yes,%20resizable=yes,%20copyhistory=yes,%20width=800,%20height=600');void(0);")
				},
			},
			
			
			{
				name : 'OneNote',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMMSURBVDhPJZLdT5tVHMefv8B7NTHZ3aJZFhMXr/RiN+KFN17oEpeYTJNl06ExQfdWsjedAze3gGOl0Lkx5pxDQFxg5bX05Xn6PFJoB31htKUtrOsbLVBKgaf9eHj2S745Oed3vr/v93d+R5IfqTj7VMZMj/F895hgu0LQqhHsUJm1eJhtfwm/WcF3S2bmpsK0wJPPe5FG7zsZvzjIwp8+irEiK9ECmdkMmadp8uECuUCe51qKJXmJpCtBfGKRhDOBdtWF1P/1Q5498LGeKhHq1gjcVkjPvDAuay2TKG1OYoKQdCRZHIkSHYqyOBpH/cWJJNcPUFhY4YX3Of9+cJ2uNxp4elsmoSS5tvcM5988SXAwQFpLEx2OEhmMEhuO4WkW5FCnRi6cJ6UtYztkwbrnFN111ygkV7BdtXFy/2nUe/8x/2gen8VnwP+7H7lJkINWlWwoR1JO0vtRK3cPXuHn/SbclgnUAS/H9zbg6Zki+E+Y8Ut2RhpGsJsc2BvHkALiRbPBLMvyMp3vN9H3TRcPzvxF44Fz3DE95Ojbpwl7o+xG6lmaucEQillM58IuWYwkM5cl2B/ix7fO8kf9XTJLOU4Iu5+89hVHD5gIaRFq1ZpRYDc21sqEh8NIcxaV2Fgc5ZaGad9Zbh4xGxfunOvhPekQx95tJDKbMM52KtvoOzo1vUbLl51I/jaZ+b557K1uvni9nh8OXqIqVCL+OB+/epy6V44QVBcM0uZGReSqaOM+9kl1u2QFtWMKb4+f0W4H7n5NaNSolCvGzxvoGGU1v8bmeplSccNwMGF28v07F5Gmb7jxds3gHw5QWn2Z1HXdUNC3d9gqb7FZqrBd2aKqV1nNrdHyWQdDJ2xIyhU7drOLyHTcsLYl+lpfKRnQt3Wjz0KqSDGzahTuNQ9xeM+3OM+LOatNDhIzy6QTOSNZrdXQq7pQWCebzFMWdqs14UIU3o22+nu0fmpFbfYgDR3+G1+7xpx1GvVXN+p1WawyU79pTP5k58kpG5OXHbia3WLvxH3BhXxZpvvD+/wPzzbait8wTUEAAAAASUVORK5CYII=",
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
			{name: 'separator'},
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
				name : '侧栏打开',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJDSURBVDhPY0huOuCV3HxqX3Lr6dPE4sSmkyeTmo+2hGat4mGIrNq7OLr22P/o2uMk4ajaI48C8tdpMgSXbF8dVnHwP6k4uHzPc+/0RfoM/nkbVwcW7/pPKvYv2P7cLXGuPoNXxurVvnlb/iNj/4It/0t6D/1Pqt8NF/PL3/I/pmrH//CyrWC+T+76546J0/UZ3FKXrvbIXPsfhr2y1v6vmXTo/5OXn/6fuPjkf1Lt9v8RpZv/9y48+b93wfH/QH+D1bmlrXjuGDNJn8Exfv5q5+Rl/0HYJWXZ//z2nf/PXX3y//qdF/+/fv3x/8L1Z/9PXXr8f8Oeq/+D81eD1YFx0pLn1mG9+gy2kTNW28fN/w/C0aWr/09fdvR/XvPG/yH5y/6v23Hh/9t3H//vOHTtf1DuMrAaGLaJnv3cLLBdn8EieNJqq4gZ/22iZvwPzF7w3zlh9n8QH4Q9U+b+b5u2Eyi+EC4Gw5bh056beTfpM5gE9Kw2DZ703zR4IhSD2AhsFoJd3Diw/7mBW40+g75Xy2oDv+7/pGJ93/bn2m7l+gxaLrVztT2a/+l4tvwnBWu5N9xTd8xXZ5CzSLdWsiterGpXvFnNvuKOhkvdfxBWc67+reZQcQ4krmpfugkZq9iVrFe2zsmRkQnhZAACRhkZC05BQWN+Jau8KSr2Ff+VbMo+K1rkzpLWDFIVFbXnQcfi4nrcDAz2LCDNyIBZzjynX94i75mMSUopn4ybEFScaMAkaZCQIqEXFcQgb88BFSMAGBgAAtLnCfNaxKwAAAAASUVORK5CYII=",
				command :
				function () {
					openWebPanel(content.document.title, content.location);
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
				name : '繁体转简体',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADkSURBVDhPpZOxDYQwDEVvCM+RCZDomAKJjp4NaCgY4ZoMwAxswAS3Akv4YscJCQlRTld8RRH28+cbXu/Pif+oDqBHBABU85E8ywAO7BtAaFZcqNGc/WDuBmA14hTU3wDSTIXDiB1PXfm8AICdzgKCZi+Ztq+o6E6ufL1V5GCZW9PUYr+H9xgaTidlQwwbfXAPLp5DFACLmzabRREg64LGBGggNN25ucIsbUFsqnlLXNQBxKYrDlfYaXmFGgeU9JR8PA5wbSkFSAbRqnz6rT2LAN5AXMByEFYxg5JcPvEP9QMgpxO/jDuutEa92ggAAAAASUVORK5CYII=",
				command :
				function () {
					content.document.documentElement.appendChild(content.document.createElement("script")).src = "http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_tw2.js";
				},
			},
			{name: 'separator'},
			{
				name : 'Chrome 打开',
				subdir : '备用功能',
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
				name : 'Bing网页翻译',
				subdir : '备用功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEkSURBVDhPYyAW2LZv+g9lorAJApBiELZp2wimMTTbIAnMPXwDohiI5wHZUGEwwNAIAzBTc5YcAdPzjqBqBAGYGpDBMDZUCiI54dxHsBNzlh7FqhmZBqlD5oMZAWsf/nefdx7VZCBA5sMNQBdDdhYMQ+UxDEDmgwCyYTgBzAIYGywIBDCvwIHJfI//atPcwBgqhBOguwQDEGMIXmA8z/2/2nR3FENAfBSMbgnICyCNJkActMbzvyaaASCgCtTUf6r8f+JuP1QL/Fe7/289UgcXmHCq+7/+HEwDojYEgjW6bvVENQBk64aba1AMMJqLagBYM9AF0RuDML3gv8r9f8vhWrgAyED92QgDQIpBmkCaoULgMIEyIQDsf2A4gDCMD5bACxgYACt08k6OMYLWAAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){var%20s%20=%20document.createElement('script');%20s.type%20=%20'text/javascript';%20s.src%20=%20'http://labs.microsofttranslator.com/bookmarklet/default.aspx?f=js&to=zh-chs';%20document.body.insertBefore(s,%20document.body.firstChild);})()")
				},
			},
			{
				name : 'Bing划词翻译',
				subdir : '备用功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKaSURBVDhPfVJbSBRhFP6RwohKQ9PUtqASkyRJSc1rBAZdHgwKIXq0oh56sZCM6PJQWUaQERGZD+aDWFBBQRHddt2dnRks3EjcaFctyUu5W2m2uzPzdc6/6W4Q/fDtzJzzfed8/9kjtIpl+B/0quVw5SWiO1tA5+9K2195oVdy8F+wQd+0AurGNHiP7IX/fD20soxo0TgeOciiYAzcUa+ykTAd7uJUOPPmYbK/F3x6tudBLUmDRsIZvlDLs6CWZxIoQF2VwiSJnq256N1Tgdc1BRjpuon3jXVwrpsPjYvHaYRalglNiumu65PQd2gnAo4nCH8dg2lEYFkmwhPjGH/Uib6DNcRZJLmsYa1QyYZCdh1rEuBrOiqtfvfomHA+le9GOCSffCzLgv9ig+Syhl0IpSgVenU2fOfqYYZ+MQujDzrQs6sEQzeaMHDlJAavnkGIHHEBdsVcvXo13DQP8SJT4FNrs+xgTk9J0tjDTrzdvwPG1A+YkTCG21vgPXFA5ozpn5LLGvsqAdGdvxBvaksxeq9dEizTwIT9Md4d3o3ItyAsw8BwxzX00xA5Z5mm5LLGWZAM4aZ7OAsXw56TgJG7bbI6n5H7t+Gj+w5eP0vXOEVuJqPxO7cklzVu2guh0D2U0gwaylIKJsPffIz+d48kzxyLMD30AT7KMYe5UsMzcNGmubgITdVFCXvuHHjqtsF3oQH+S40YaDktn9qWHMrNJU56lEsa1kYd8AdjQwrcm1ciQsPjEw58QSQYkO8f2y7DQVupkG3Z8A+EUrwEElygKAUKLcjnrlYElOcIaq8QVF8i4HoG7/F96M5fIF3OagjCRT+zoCJO2gvuZF+bGAN9O1jMTeL5BMGCeHBQoRVlJ/HgzpJD+Rg/Fb8BRfqae7uMECUAAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}")
				},
			},
			{
				name : 'EverNote',
				subdir : '备用功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOmSURBVDhPJZNbTNsFGMULiYrZ5KKTcckIcUNowSEQQXthQLfSwkqBAoUWeqGlpaUFWtoBA4GxAbES5hazTbMMcbhLlm1BhDGFjc1InGOGEVTAzUR98GW+GKOPP/+JD+f15HfO9x1R5HgsEWcSee6Tfbx8UcLr8zLeWVKz/6qc7KtS1PcqUC+XI7ul5I2bCpIv5fDStJjoqUwiJ+IQRZx9hegrGYhnFZR/U4N+sZaC4XxSiiWkqTIp8OcT+raD9sdOXGt2GldNKO4UI5lRsPNMGqLIyVTSZqUYVusxXDeg9iqRGrIRS7IolMqRFb2NplGFyl1CSVcR2lE15mUDB+6XEn0hC1Hspxkol1W4Vizke3LQd+spbpQhlxVQVqGmRl9Nnb6OmqpaqiqqKClSYjlnwrhWJ0ROR7TrUhrVq3oKR2VIZBLkZYXIlXJ0ZZU01Jmw2ey4XC5crU7sdgeG6nqcExZ8Gy5Sr7yJaPcNMebvzeTbcsnYm0GhTEZ5uZb6BhOuFjudne2EQkE6Otpxe9qwmK20hS30bHWQfj0HUdKNbFo3mqgdVJGblYtGo0Zfq8PusOLzB+jp72Gof5D3x0cZCQ/hsDvxjTXTt91BxpxAkDQjxrFpxH2+kbzcPMq1WhqMRjxuB0e6QwwPj3D8xDEufP4BU3MncbpaBQM7AwKBZCFXMPginaaNanoXWylQ5AlFVWK2WPF6vXQfCXFsYIhwOMzg8ACh3na8Hh9tJ+z0bXrIvLUfUfy8BN1qKeHtIFqrBoW0CH11FTZrM13BICNjQ/i7/PSE+gkGe2lpEQodtdK95SB9XowoZmEvJQ/l9D4xMbkxQvhiNz1jnXg73Zw6e5wnz+5zbek0H02P4w+0YzaaaD3VhP9nM3vnhTO+cDuZtx7k0bxRxsjvbq79NcbyP+e492yS1b8/48OZfnzvNvHwj8ucnDpKqUqNb8qE+2k9e+YEgsjbr5K6ko5m7QD2zSr6nlqZ+M3D1J9HufxrP1pjKQPnA8z/e5rAxzZkykICs2ZsWzqS5oRXFn0Vx4tfJ5H+KBPNupSmHzX4tmro+6WR935yoakupsKmRBcoRlqSzyGjnKCwiZr1Q+xeSBHGdDeOiJV4olYS2PPda2SvZXPwsRTdD0U0b1fSMm2grOUgpRYlhz0qnDMN1G0dRrEuI/bLRMFgJorIxR2Ilnb+rzuxRC3FE7eUQMzdBFIe7CNnLV9QATmPskleTiRGiL1jYRcRN5/nPyaxNBndGCsvAAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();")
				},
			}, 
			{name: 'separator', subdir : '备用功能'},
			{
				name : '宽度匹配',
				subdir : '备用功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGXSURBVDhPYxh4MHHiRPv///8zQrlEA5Ce/v5+B4aWlpZX9fX1TFBxogFIT3Nz8yu4AatWrWI+fPiwIFAOp2tAtoLUgNSiGLB//36WdevWuU2YMKEZKMECVY8BQHIgNRs2bHABscEGtLa2vt66dasrkHOdm5v77Zw5c3iBhhpkZ2ebAA0W2bZtmyiI3d7ert/Z2ckLUgNUew1kCFDda4a2trbP4uLi30RERP5zcXG9rays1BESEvouLCz8u66uLrampiYOyP8NEisrK9MGqQGpFRMT+wbSCzLgG5Dzi4+P7z8nJ+fb9PR0fUFBwV8CAgL/srKykjIyMlJAbCD+mZycrMfBwfGWl5cXZMAvoOu/gb2wePHilLS0tBcgA2bOnCkC9F8YUGPsmjVrVEE4NTU1FuiaUJAcyACgQc8XLVqUDPYCKCCAfuVYsGBBOtC50/AFItASVqA3pgPVpoH0gAMRRAA1MQEDi/3IkSPK+BIVSA6kBqQWpAfFAKgaogHcAGDUhJOblDs6OiIYQKkKKkYyoEQvFDAwAACRUudRsBI1mwAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();")
				},
			},
			{
				name : 'WOT 检测',
				subdir : '备用功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL0SURBVDhPrVJ9TE1xGH50U0KqWeFaxmQj/ogS95xbVzXfdfvQlxB9+Kots6xR02kpH5vS7bJhKVOUlEws2oipKTcz0xZjs7Gx0EZNpriP37ndxh/96dnO3vecvc/zvO97XrBkSgG/nvSX3RHBUldCQHKBVs17+pr8uvqq/Cyfqpep38eFSrZ+8T9nI30JYEvL+ftqzL4bQfNzI493yzzRbWBFbyIb32U2Vr1VJtmpo1CdbWTrPf76PUw1ZpRrGX4ODL8GxtwAo5tEXgcmNnqw2CILMaPWThcdnJpG1VEljz3qO0unMbYQ3CbIOx6A6U/ApFbQWDuZBx7MZeXrNd6jAmKEj4M9L1XnEXsH8SZRfB2Ut6LLfy2aA8JFni66qRJij0S86sakq/N6bQLD38w61THvgi/ZH8BNJ8HmV9qf6li2AjsCN2IwMAFcXypE7oNR1fO5zuTjDHXbLa0HmXVXQ3WcHS1g3HFsV/+OnWvDCiOMumhwRRoYWwtubvJgZKVvEj5/f1PU9uEY0zvEog6Au7vB7c/grihwtHacCFMUxQEGOPqtg6ckBHQpYMgRsZvbLoy+6FuEh28ails/KExpF85XhIAF3PkEy5V6ONXXx2nsDUBKQJAuBgNSKrgyB0y+48yYi4vf43R7rt/jfhMzOoXATbHtx/ix9ylyMtowFQoc/Hdhon4vPORMdErx+CnvBg2igy3NboyqWlxpUzd3plF54cq422DCLYzsseB7agf2RVyCj6EEPqGFqJFTMKBLhlXeD642T2Big7ftam2IrlhSVGhZREFiZD0YWqGxbqieMhJ73YmhpY6fpRzNkJSG31IWqC9wZFSNq3VTzcL3dvoogstm90dcnsqEZnF54gJDz2solblROuxCfaYgZoNSvgNXmd0ZX7fgr/u/CCmf80gqmcGVRa7U5TtRynWgPm8CZeEqHZ1MuWw6N5ydNz55DGEm7VJDubZBX+bVF2zyZLDJi3oRg07PHAo5M+uQvex/AfgDSpaKPlVGcgYAAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:(function%28%29%7Bvar%20f%3Ddocument.getElementById%28%27wot-bookmarklet%27%29%3Bif%28f%29%7Bf.parentNode.removeChild%28f%29%3Breturn%3B%7Dvar%20l%3Dlocation.hostname%3Bif%28l%26%26l.length%29%7Bf%3Ddocument.createElement%28%27iframe%27%29%3Bif%28f%29%7Bf.setAttribute%28%27id%27%2C%27wot-bookmarklet%27%29%3Bf.setAttribute%28%27src%27%2C%27http%3A//www.mywot.com/bookmarklet/%27+encodeURIComponent%28location.hostname%29%29%3Bf.setAttribute%28%27frameborder%27%2C0%29%3Bf.setAttribute%28%27scrolling%27%2C%27no%27%29%3Bf.setAttribute%28%27style%27%2C%27position%3Afixed%3Btop%3A10px%3Bleft%3A10px%3B%27+%27width%3A135px%3Bheight%3A235px%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bz-index%3A10487575%3B%27%29%3Bif%28document.body%29%7Bdocument.body.appendChild%28f%29%3B%7D%7D%7D%7D)()")
				},
			},
			{
				name : '右键防复制',
				subdir : '备用功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKuSURBVDhPVVNLSFRRGL6gIorixieI4mMhIpSajjPqzNy5M82M87j3zujoYrSNECIyE6KYYjQ1tRMfaVAbQYiwoHZBaS1cRA8qqKhRwVQCqaBW5fLrO9cHuvhmzj3/933n///zHykQCOAkwroOn88Hk8WCs42NONPQgCaTCR6vF+FQCMET3GAwiGMDEVBVFbLTaXxfHh7G7elp3JmZweTYGHRNg01RDJHAKYNjscuFRDyOndVVYH39AKkUsLmJn2trmJ2YgIOcgDA5aaBRbOfJt4aGgJUV/FtexqPRUSR6e5Ho68MiTX8sLRmx++PjRpbiQKGVNLo4WXOMG3/n57GbSGCABLPNBsXtRr0sI8rUd5JJ/Jmbw/7CAq53d0NmT3RqJJ1Nc1DwLBrF/sgIxim0eDyIcF+mcZzEPfbjN3GP6X+PxfChvx9ummrkSB52NmS3Y4PktzzNTYMQA3ZmdomC3Z4e/CJnqrUVDWYznra3Y48nX7Ba4RIGzq4u9LS04HNGBh5mZ8PV0QF7OIxYbS1SJSXYLi5GsqoKNmaiUHA3Lw9bmZm4yCt2dHYyA/7obW14LUl4kZ4OM9OP19XhI7+/EFdoYPX7EeY1ipIe5OQY+700OM/DJY0Bhe6Ps7LwiYHZwkK8439KiMvKYGe6nSxHYVbR5maD8zwtDV72QBUlaHR3ssZYTQ2+MigI74nB6mqcY3YeCq2Mq+zNE5a4zdhVGssU69QezAFPcPBjpqAAGyS8IW6SNFhfjwGO8o3KSrxkeTvcX8zNhZPXGzyag6NJFBsKG3ittBSvSBTkb8QWsUuIsqaKiuDizfjJPTWJR6MppstB6HxIYxUVmGZGs/n5mCwvR4QPSiYvcCg2dITkZ+rG4xDgRojwse7WSARN7EET1xauvVyLmCE+5Kqqiv8c/ONMxvueZQAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)")
				},
			},
			{
				name : '360防复制',
				subdir : '备用功能',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABfSURBVDhPxZBdCgAgCIN766AdrYMWPiyGZL9GHwxS27BCyrHcyDcAcG/UF5kBM+DpBjA85zuoWwDgswU8ouEfAKsWLQVo2LO1QU9vNtDoOXvMAK71HLXI9wkn+h0QSwVxrKcf+mxZagAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:document.body.oncopy=null;void(0);")
				},
			},
			{
				name : '短网址生成',
				subdir : '备用功能',
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMjSURBVDhPfZJdSJtnFMcfO2GFpet0rWwOF6WzoSsMh984OtRMpduKIrVRQv2mqElk1phGrW0idG5mbZkI2xi7ECxZwOHslsS4DskMik5mLgZ+wFJtZ9fRzW1Xhcb31/d92pvdeODPc87hPP9z/ocj7HY7DoeD9vZ22trapN/V1YXVasXtduPxeKTf1NREZ2cnTqeTjo4OWa+9wufzEQgEqK+vx2Qy4ff7GR0dpbe3l1gsxvz8PKurq/T09NDd3c3CwgItLS00NDTQ2NiImJqaIhwOU1lZSUVFBbOzs4yMjNDf38/y8jIFBQUyNzk5SXNzM2tra9TU1FBVVUV1dTXC6/USCoUoLi4mPz9fTjM0NCTH04o1SUtLS/T19VFXV8fKygrl5eWUlJRgNBoR4+Pjkj0rKwuDwcDExAQulwuz2czGxgZzc3NEo1EyMjKkRI2ssLCQ7OxscnJyEIODgywuLqLX69HpdEQiEbmw2tpagsEgycnJatcoFouFoqIiWZuWlkZKSgrp6emIl1JTCU6HCM38gNfrU5e2QPKLh+S4/qCfhH0CU+0Zfl5eotRYyvr6ulrnZWxsjNzcXIRq6J7dx8myYk69W0bSwf1akhd0B0g9pFf9BBXPYHj1GAefe15K0STk5eWRmJiIMJzuIvM9C68Umnn5TRNH8hpJe72VNyre4aQtkzLbMU7YMtCbkzCefR/zGTOZRzPlzmxWG+Ktz2K8fXWD0su/UvLBLxScjfBa0U+UX7zOlU0jjugJTs8d4fjNw7h/HOHBnQecazvHtaufoJno/zzMwOgsA9dvcXF4BudgkPOOABeu+PB86+LDr50M3LDT8dV5rnlvEPguTIN6QJfcHnUv64jNvx4h8XeczZ04W//EufPfLls7CrH7cPtP+E3Fzr+gPILY7S2a1Uv85maQhw/jiKSP4X/46Ck0f1jhsEfhgGuXC7fU3yhs37svCUIzM08kiAGFPXFZRbeC5fs4iqKwdXdbEgTV69ViIS6pLHsgwaW+drD6d2XHu7/fo6W1VRJoJrK/gL2Q/yUc/xSGI08Jtv+gVZMwPa1G8BiWoY1GuX/zcQAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:function%20iprl5(){var%20d=document,z=d.createElement('scr'+'ipt'),b=d.body,l=d.location;try{if(!b)throw(0);if%20(!l)%20{alert('%E8%AF%B7%E8%BE%93%E5%85%A5%E7%BD%91%E5%9D%80%EF%BC%81');return;}d.title='(Shortening...)%20'+d.title;z.setAttribute('src','http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl='+encodeURIComponent(l));b.appendChild(z);}catch(e){alert('%E8%AF%B7%E7%AD%89%E5%BE%85%E7%BD%91%E9%A1%B5%E5%8A%A0%E8%BD%BD%E5%AE%8C%E6%AF%95%EF%BC%81');}}iprl5();void(0)")
				},

			},
			//批处理功能
			{
				name : '油猴脚本更新',
				subdir : '批处理功能',
				command :
				function () {
					var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
                    file.initWithPath("D:\\Program Files\\MyFirefox\\UserJsUpdata.bat");
                    file.launch();
				},
			},
			{
				name : 'UC 脚本更新',
				subdir : '批处理功能',
				command :
				function () {
					var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
                    file.initWithPath("D:\\Program Files\\MyFirefox\\UCDownload.bat");
                    file.launch();
				},
			},
			{
				name : 'SWF 播放器更新',
				subdir : '批处理功能',
				command :
				function () {
					var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
                    file.initWithPath("D:\\Program Files\\MyFirefox\\swfUpdata.bat");
                    file.launch();
				},
			},
			{
				name : 'AdMuncher 更新',
				subdir : '批处理功能',
				command :
				function () {
					var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
                    file.initWithPath("D:\\Program Files\\MyFirefox\\AMupdata.bat");
                    file.launch();
				},
			},
		],

	},

	subdirPopupHash : [],
	subdirMenuHash : [],
	_externalFuncPopup : null,
	_isready : false,
	unescapeHTML : function(input) {
			return input.replace(/&amp;/g, '&')
		  .replace(/&quot;/g, '\"')
		  .replace(/&lt;/g, '<')
		  .replace(/&gt;/g, '>')
		  .replace(/&apos;/g, '\'');
	},
	init : function () {

		var ExternalFuncBtn = document.createElement('toolbarbutton');
		ExternalFuncBtn.id = "ExternalFuncButtonM-ID";
		ExternalFuncBtn.setAttribute("label", "扩展小功能按钮");
		ExternalFuncBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
		ExternalFuncBtn.setAttribute("tooltiptext", "扩展小功能按钮,可以自定义小函数功能");
		ExternalFuncBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		ExternalFuncBtn.setAttribute("type", "menu");
		ExternalFuncBtn.setAttribute("removable", "true");
		ExternalFuncBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJHSURBVDhPY4CB////87x8+VLl8ePHeiD8/PlzBZB4fX09E1gBPgDUzAxU6CIjI7NXT0/vnY6OzlNtbe1VCxcutAcZDFWGG9y/f5+jt7c3sKioaL+Hh8cjLy+vV46Ojl/V1NTuLF261AxoCAtUKSZYtWoVM4j+9++f0NmzZzV37txZmJycfDksLOyls7PzO19f34Vv3rzhAyvGBn78+KHR1dWVCjSI58qVK2wvXrwQj4mJ2RweHv4pODj4ZXR09KWnT59yQZVjggcPHhhJSko+8fb2ngc0yC0kJKTJ3t7+UWxs7HMg+3VaWtpxoBc4oMoxwYcPH5QjIyP3mpiY/FJXV79pYWHxGqjxbXx8/OOoqKhXwPA4tW7dOuVjx45xQrWgAlAAnTp1Khzo1ztAxZ+CgoJeA/3/Aqj5BdAVT93d3d8aGhruXrFihT7Ii1BtqODTp0+ily9fjq2qqtqYn59/vbi4+GxiYuKl0NDQl0CDnoJiREVF5fCiRYus9u/fjz1GgImIBxiAekBs+ezZM5OrV68GJCQknAQa8gYYkA+BLvmmpKR0duLEiW54oxUGzpw5wwV0FTAywi8C8Rugdx4AvflVVlb2an9/fxAw2nmhShEAaDIjDIP4R44c4QWGTxIwTK4CAxrkkvvAMPogLS197/bt20ZgTYQAyJA9e/Zk+/n53Y6Li3sOxI9sbGzeAPOLOVQJXgB2CdBFguvXry8DxtIjHx+fJ1OnTm0GikmAVRABwIYA/Sz95MmTeCBOArKVwTKUAwYGAIupKaEX0N6mAAAAAElFTkSuQmCC)";

		var ExternalFuncPopup = document.createElement('menupopup');
		ExternalFuncPopup.setAttribute('onpopupshowing', 'event.stopPropagation();gExternalFuncButtonM.onpopupshowing();');
		this._externalFuncPopup = ExternalFuncPopup;
		ExternalFuncBtn.appendChild(ExternalFuncPopup);
		setTimeout(function () { //延时加载菜单，不对启动造成影响，也不影响第一次打开菜单时的响应速度
			gExternalFuncButtonM.loadSubMenu();
		}, 3000);

    	if (this.moveablePositonOrInsertafter) {
    		var navigator = document.getElementById("navigator-toolbox");
    		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette")
    			return;
    		navigator.palette.appendChild(ExternalFuncBtn);
    		this.updateToolbar();
    	} else {
    		var navigator = document.getElementById(this.insertafter);
    		if (!navigator)
    			return;
    		navigator.parentNode.insertBefore(ExternalFuncBtn, navigator.previousSibling);
    	}
	},
	loadSubMenu : function () {
		if (this._isready)
			return;
		if (this._externalFuncPopup == null)
			return;
		var ExternalFuncPopup = this._externalFuncPopup;
		for (var i = 0; i < this.toolbar.subdirs.length; i++) {
			if (this.toolbar.subdirs[i].name == 'separator') {
				ExternalFuncPopup.appendChild(document.createElement('menuseparator'));
			} else {
				var subDirItem = ExternalFuncPopup.appendChild(document.createElement('menu'));
				var subDirItemPopup = subDirItem.appendChild(document.createElement('menupopup'));
				subDirItem.setAttribute('class', 'menu-iconic');
				subDirItem.setAttribute('label', this.toolbar.subdirs[i].name);
				subDirItem.setAttribute('image', this.toolbar.subdirs[i].image);
				gExternalFuncButtonM.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
				gExternalFuncButtonM.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
			}
		}

		for (var i = 0; i < this.toolbar.configs.length; i++) {
			var configItems;
			if (this.toolbar.configs[i].name == 'separator') {
				configItems = document.createElement('menuseparator');
			} else {
				configItems = ExternalFuncPopup.appendChild(document.createElement('menuitem'));
				configItems.setAttribute('class', 'menuitem-iconic');
				configItems.setAttribute('label', this.toolbar.configs[i].name);
				configItems.setAttribute('image', this.toolbar.configs[i].image);
				if (typeof this.toolbar.configs[i].command == 'function') {
					configItems.setAttribute('oncommand', this.unescapeHTML(this.toolbar.configs[i].command.toSource()) + '.call(this, event);');
				} else {
					configItems.setAttribute('oncommand', this.toolbar.configs[i].command);
				}
				configItems.setAttribute('tooltiptext', this.toolbar.configs[i].name);
			}
			if (this.toolbar.configs[i].subdir && gExternalFuncButtonM.subdirPopupHash[this.toolbar.configs[i].subdir])
				gExternalFuncButtonM.subdirPopupHash[this.toolbar.configs[i].subdir].appendChild(configItems);
			else
				ExternalFuncPopup.appendChild(configItems);
		}

		if (this.autohideEmptySubDirs) {
			for (let[name, popup]in Iterator(gExternalFuncButtonM.subdirPopupHash)) {
				if (popup.hasChildNodes()) {
					continue;
				} else {
					gExternalFuncButtonM.subdirMenuHash[name].setAttribute("hidden", "true");
				}
			}
		}

		if (this.moveSubDirstoBottom) {
			let i = ExternalFuncPopup.childNodes.length;
			while (ExternalFuncPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && i-- != 0) {
				ExternalFuncPopup.appendChild(ExternalFuncPopup.firstChild);
			}
		}
		this._isready = true;
	},
	onpopupshowing : function () {
		if (!this._isready)
			this.loadSubMenu();
	},
	updateToolbar: function () {
		let toolbars = Array.slice(document.querySelectorAll('#navigator-toolbox > toolbar'));
		toolbars.forEach(function (toolbar) {
			var currentset = toolbar.getAttribute("currentset");
			if (currentset.split(",").indexOf("ExternalFuncButtonM-ID") < 0)
				return;
			toolbar.currentSet = currentset;
			try {
				BrowserToolboxCustomizeDone(true);
			} catch (ex) {}
		});
	}
};

    gExternalFuncButtonM.init();
