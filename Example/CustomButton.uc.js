// ==UserScript==
// @name           CustomButton.uc.js
// @namespace      CustomButton@gmail.com
// @description    把自制按钮数组化，可批量建立按钮之用 by defpt
// @charset        UTF-8
// @compatibility  Firefox29+
// @homepageURL    https://github.com/defpt/userChromeJs/blob/master/Example/CustomButton.uc.js
(function CusBtnfunc() {
 
    var Btnid = new Array();
	Btnid[0]="UpdateLocal";
	Btnid[1]="BackupProfiles";

	var i=0;
    function createBtn() {
		var Btnimg = new Array();
		//32px for Planel UI
		Btnimg[0]="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACHSURBVFhH7ZTLCoAgFET9VH+gddCuRfv+uDCGIBtCy3tbOAcGxNecjQZRyzDOGwuW7Ull07JeIgEJSEACErAUiOnyPEyABXd8JuaFJcHZZlRJ4ExziiSw14xHCewxh0pgzY2LBObcOSQwfg97vx5BPf/ZrOMqgJqTNNeXAIsEbgJ/BPXdE8IO1PKdGPT2u5oAAAAASUVORK5CYII=)";
		Btnimg[1]="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHQSURBVFhH7VbhSsJgFPURgpCMZU2dojk1ExtGZdO2cqmrF+gNgv4F/nFB9iuxN7Yd/S5sy41900WBBw58997jvWfb3TCxhRfPr2/zOMnG+GM0+ZrHxf9hIA78PwOtjv4hHlfHWflknK/UrZvBYIr8TirVRqOiLGuIqTERuVWgemgDzqZE5PO1hoWzbpoLQ14NiLwXVON+BPRDRevNEOcqtYWBUr1pUb2lahM6gzh7QTUuA9f94czbVDWMKWKpejpGjHO33/+ks1PrBNVCG1D13tOqhkq7O0EOu4GYNKu0TlA90g4U7KtVjeUSSvZg5BqXbddtBxH7gTRrL2GuvNyBO/PRtYQ4B4F03Eu4KfwJAy+j93AGIMIzp+e8CXAboFvGUoHAXuC1LDWaFhlHjI8Wk8RngJbSj0wWnwGxKC9eSz8y2e/cAZb6gdRR1iDNxg3o9vcgSGsP71Ed3BWEDiv5g8dA0144P62QLbiG7x1m7lkpGDwG6NPs1SYPxFvKg0ImH244wGOA/h84tcm0qFMODH3lBB4DXqQlyTVcuVKHrBQeUQ3sZyTNObyunPMPB5wGorLSODNZO36sa6DUunhgraIBBqJSLNd01maLkEgkvgF6HhaHvcF79AAAAABJRU5ErkJggg==)";
		
		var Btncmd = new Array();  
		Btncmd[0]="UpdateLocal();";
		Btncmd[1]="BackupProfiles();";
		
		var Btnlabel = new Array();
		Btnlabel[0]="\u66F4\u65B0\u64AD\u653E\u5668";//更新播放器
		Btnlabel[1]="\u5907\u4EFD\u914D\u7F6E";//备份当前配置
		
		var CusButton = document.createElement("toolbarbutton");
		CusButton.id = Btnid[i]+"-button"; 
		CusButton.setAttribute("type", "button");
		CusButton.setAttribute("oncommand", Btncmd[i]);
		CusButton.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		CusButton.setAttribute("removable", "true");
		CusButton.style.listStyleImage = Btnimg[i];
		CusButton.setAttribute("label", Btnlabel[i]);
		
		document.getElementById("PanelUI-contents").appendChild(CusButton);
    }

	while (i<=Btnid.length-1){
	   createBtn();
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
	file.appendRelativePath("Local\\BackupProfiles_rar.bat");
	file.launch();
	return file;
}