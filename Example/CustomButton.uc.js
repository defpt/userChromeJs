// ==UserScript==
// @name           CustomButton.uc.js
// @namespace      CustomButton@gmail.com
// @description    把自制按钮数组化，可批量建立按钮之用 by defpt
// @charset        UTF-8

(function CusBtnfunc() {
 
    var Btnid = new Array();
	Btnid[0]="UpdateLocal";
	Btnid[1]="BackupProfiles";

	var i=0;
    function createBtn() {
		var Btnimg = new Array();
		Btnimg[0]="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7Y9bCoQwAAN71L2J/3sBj6tkGaRiEB9NWdCBAWmqieXlLMN3nJzEeVy5JM7jyiVxHlcuifO4ckmcx5VL4jyuXBLnceWSOI8rl8R5XLkkzuPKJXEeVy6Jm/NxZUflG7e5NIJ3m3FqBO8059AI7sbYHcGdOHYEWTdWIzjrzm8Ez9ep/6Sn1D9gADULm/P6ckJqFjbn9eWeUv8O+IMBD6eUGZgZx77lnyuBAAAAAElFTkSuQmCC)";
		Btnimg[1]="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ8SURBVFhH7ZfbbtpAEIZ5hEptVCqaBAiHUCCEEmLRNHWNY3MIp75AX8VcQC8KUS7zuO3+ZgYNrtfYUcpVPmkk77+z/27W482SeiWI9/vpT8d2l/lPF172vOadVRtzZzxZXd2aixPVziq9WG9uNT9PBfK6g/vVjd1blC4+e4XapVdptee92Wx1bVqLYqM1f5dOmzSNHizgf4VhWkuaRk/YwJcKqz98oGkOCy8Ar4mkw8ILQF2QFE2n6/5CYeXVABTc3Xjsb90bVUQwOq/VHLTZmANaGNxfUMVJUjTSlAM6KhnP7nTqLyiYg4AehPs6trO/CCU80HAGj2if1Rv+AirNtv8ufVNrY8q5eA7CfdYwQRF+H00eg6YwQJu3Es/2aLTmZ5kr4b5ysxWvCC138DPM0DDtJTTUBtqcE5Yr4X4etxdpilPNGm6KEFUMrXVr7mw7Am0dnBP7K5DGHNDxHeO5P/2xU4R4joLzsIMkHRZewB3t5MHhBeBMIUkPEvHO+T2/BLyA0uXV/hrgZARJkaAu8FniXy8vHG0cWpSy9Yz1FSRZABelLiht6xmrCMMMdODCIvODQWlbT/56Igkz0CF3gKR/SJ/mh5xTFq9FCydHmTKu+ouictXkA+n3NpPpUpceOYAkLW1VcLrcTL60M/n7k9w9dUUjB5GkhY/mYO7Rx2xP+mRyxXiTAzmQJC18P5C5R8dZV3rE/ssZOZik2BwXCjuTG9+sCXXFRxqQFIsPuYIjxzaNL8knB9LkuVFvXU/JLjlhhkmi0vk6I6vnAZPTcnV+o36e9WezNe5/ONtxS8ZPNnUtW+Nq5WvqJDQse6OpgsxWGy7ZvBKTVOov88LjvT+2dmQAAAAASUVORK5CYII=)";
		
		var Btncmd = new Array();  
		Btncmd[0]="UpdateLocal();";
		Btncmd[1]="BackupProfiles();";
		
		var Btnlabel = new Array();
		Btnlabel[0]="\u66F4\u65B0\u811A\u672C";//更新脚本
		Btnlabel[1]="\u5907\u4EFD\u914D\u7F6E";//备份配置
		
		//Btnlabel[0]="UpdateLocal";
		//Btnlabel[1]="BackupProfiles";
		
		var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var CusButton = document.createElement("toolbarbutton");
		CusButton.id = Btnid[i]+"-button"; 
		CusButton.setAttribute("type", "button");
		CusButton.setAttribute("oncommand", Btncmd[i]);
		CusButton.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		CusButton.setAttribute("removable", "true");
		CusButton.style.listStyleImage = Btnimg[i];
		CusButton.setAttribute("label", Btnlabel[i]);
		navigator.palette.appendChild(CusButton);
    }

    function updateToolbar() {
		var toolbars = document.querySelectorAll("toolbar");
		Array.slice(toolbars).forEach(function (toolbar) { 
			var currentset = toolbar.getAttribute("currentset");
			if (currentset.split(",").indexOf(Btnid[i]+"-button") < 0) return;
				toolbar.currentSet = currentset;
			try {
				BrowserToolboxCustomizeDone(true);
			} catch (ex) {
			}
		});
    }
	while (i<=Btnid.length-1){
	   createBtn();
	   updateToolbar();
	   var i=i+1;
	}
})();
//本地程序
function UpdateLocal() {
    var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
	file.appendRelativePath("Local\\UpdateLocal.bat");
	file.launch();
	return file;
}
function BackupProfiles() {
    var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
	file.appendRelativePath("Local\\BackupProfiles.bat");
	file.launch();
	return file;
}