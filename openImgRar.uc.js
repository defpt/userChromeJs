// ==UserScript==
// @include        chrome://browser/content/browser.xul
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function () {
	(function (m) {
		m.id = "openImgRar";
		m.addEventListener("command", function () {
			var imageUrl = (gContextMenu.mediaURL || gContextMenu.imageURL);
			imageUrl = imageUrl.replace(/\.jpg\.thumb\.jpg$/, '.jpg');

			var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("TmpD", Ci.nsILocalFile);
			file.append(new Date().getTime() + ".rar");

			Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist)
				.saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService)
					.newURI(imageUrl, null, null), null, null, null, null, file, null);
			setTimeout(function() {
				file.launch();
			}, 100);
		}, false);
		m.setAttribute("label", "\u6253\u5F00\u56FE\u7247rar");
	})(document.getElementById("contentAreaContextMenu").insertBefore(document.createElement("menuitem"), document.getElementById("context-openlinkintab")));
	document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function () {
		gContextMenu.showItem("openImgRar", gContextMenu.onImage);
	}, false);
})()