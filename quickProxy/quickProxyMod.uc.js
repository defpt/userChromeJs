// ==UserScript==
// @name           quickProxyMod.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    快速代理设置，自用修改版 
// @include        main
// @compatibility  Firefox 3.0 3.5 3.6 3.7a1pre  WinXP
// @charset        UTF-8
// @author         Alice0775
// @version        v2014.04.26 by defpt
// @note           2014.04.26 左键：开关代理+首次点击启动GAE 中键：启动GAE 右键：代理设置UI
// @note           2012/01/31 11:00 by Alice0775
// @homepageURL    https://github.com/defpt/userChromeJs/blob/master/quickProxy/quickProxyMod.uc.js
// @reviewURL      http://bbs.kafan.cn/thread-1724548-1-1.html
// ==/UserScript==
/*******===代理相关说明=====
    请配合goagent启动器 startgoa使用
		0: 表示不使用代理
		1：表示手动设置代理
		2：表示自动代理配置
		4：自动检测此网络代理配置
		5：表示使用系统代理设置
*/
(function (css) {
	var Proxytye_startFF = 0; //0 1 2 4 5 设置FF启动时代理状态
	var goagentPath = "D:\\Program Files (x86)\\GoAgent\\startgoa.exe";
	var GAE_on = false;
	
	if (window.quickProxy) {
		window.quickProxy.destroy();
		delete window.quickProxy;
	}

	//-- config end--
	var quickProxy = {
		_init : function () {
			var overlay = '\
						<overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" \
							xmlns:html="http://www.w3.org/1999/xhtml"> \
						 <toolbarpalette id="urlbar-icons">\
							<image id="quickproxy-status" label="quickproxySwitch" \
									onclick="quickProxy._click(event);" \
									tooltiptext="" >\
				                 </image>\
				            </toolbarpalette>\
				        </overlay>';
			overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8," + encodeURI(overlay);
			window.userChrome_js.loadOverlay(overlay, quickProxy);
			addStyle(css);

			quickProxy.addPrefListener(quickProxy.buttonPrefListener); // 登録処理
			window.addEventListener('unload', function () {
				quickProxy.removePrefListener(quickProxy.buttonPrefListener);
			}, false);
		},

		observe : function (subject, topic, data) {
			if (topic == "xul-overlay-merged") {
				var icon = document.getElementById("quickproxy-status");
				var Is_Proxy_On = quickProxy.getPref("network.proxy.type", 'int', 0);
				quickProxy.addPrefListener(quickProxy.buttonPrefListener); // 登録処理
				window.addEventListener('unload', function () {
					quickProxy.removePrefListener(quickProxy.buttonPrefListener);
				}, false);
				quickProxy.setPref("network.proxy.type", 'int', Proxytye_startFF);
				quickProxy._updateUI();
			}
		},

		_switch : function () {
			var Is_Proxy_On = this.getPref("network.proxy.type", 'int', 0);
			var Proxy_Type = this.getPref("quickproxy.type", 'int', 1); //初始代理设置
			if (Is_Proxy_On == 0) {
				Is_Proxy_On = Proxy_Type;
			} else {
				Is_Proxy_On = 0;
			}
			this.setPref("network.proxy.type", 'int', Is_Proxy_On);
			this._updateUI();
		},
		
		_goagent:function(e){
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
		    file.initWithPath(goagentPath);
			file.launch();
		},
		
		_click : function (e) {
			if (e.button == 0) {
				if(GAE_on == false){
					this._goagent();
					GAE_on = true;
				}
				this._switch();
			}
			if (e.button == 1) {
				this._goagent();
			}
			if (e.button == 2) {
				gBrowser.selectedTab = gBrowser.addTab("chrome://browser/content/preferences/connection.xul");
			}
			e.preventDefault();
		},

		_updateUI : function () {
			var Is_Proxy_On = this.getPref("network.proxy.type", 'int', 0);
			var icon = document.getElementById("quickproxy-status");
			var text1 = "";
			var Src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJOSURBVDhPrVLPS6JRFP2MIG2wQkxo1YAlGalgRmGSCuaPlMofpYyClgi1aKsriUARXQxBTBhEhjoUIYgKSqthwr/B3eBiFsPMevZn3rvJyMw0uy4c7uN975zvnXOf8Op1c3PTS6VSSKfTOD09RTabRT6fRy6Xo57JZGjv6ekJA8qfdX193bNarXC5XLDb7dQ9Hg92d3fh9/vh9Xqpt9vtlwWKxWJvZWUFa2trWF1dxfr6OmFjYwObm5sk6nA40Ol0/i+gVquxuLgIjUaDpaUl6HQ6GAwGcGG9Xg+tVotarTYUCIVCyZ2dneT+/n6yUql8j0ajSCQSOD4+xsnJCY6OjgjxeBwKhQIzMzNoNBpDgYeHB2xvbxN8Ph/5DAaDhL29PQQCAVo3m01MTU1BLpeDcwZ0Qbi7u4PJZILFYoHZbCavTqeT+tbWFtxuNwXJry2RSCCVSnF/fz8UuL29JV/c6/LyMvnlARqNRgqQT4WLd7vdn/V6vXN5edkpl8vtAV0QSqUSZmdnMT8/T5ibm8PCwgJ4mCqVisC/Pz4+fotEIjE2BQejiZ/ZrC4uLvh1MDo6CrFYTNccHx/HxMTEb8/T09Ngf/+qVCotk5OTb9n5ocDV1RUJcIhEIhIaGRnB2NgYiTECZDIZqtVqjwh/F8+AJx0Oh3F4eEg4ODig0fFR8nUsFuPJvyzAXp2ZgwVFKBQK7/v9Ps7Pz0s2m83MwffZQzIMKP/UGzbGQDab+8DsfGIj+tJoNn+0Wq1+ufzx89lZpmh3ud6xc0Pfr1OC8AvFIEBlyUrnYAAAAABJRU5ErkJggg==";
			switch (Is_Proxy_On) {
			case 0:
			case 3:
				icon.setAttribute("state", "disable");
				icon.setAttribute("tooltiptext", "代理已关闭\n左键：打开代理\n中键：启动 GAE\n右键：代理设置 UI");
				icon.setAttribute("src", Src);
				return;
			case 1:
				var ip = this.getPref("network.proxy.http", "str", "");
				var port = this.getPref("network.proxy.http_port", "int", 0);
				text1 = "\n当前代理：" + ip + ":" + port;
				Src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKiSURBVDhPrZBvS5NhGMX3MuiFXyHwG5TSAtMFI5OggqJEJhqiNCmzF02xTbE5sxU6CE0xJ7jn0eka+2fO6dCmmzpb1uacrIiRilO3PXNublOJ070arMjeeeBwwcV9flznZp245BTl6ZxdQ++iH32OLVBuBkpvBEOrDIbJpNwB0Csh2Je9SEf+llxBeWqNITTMJlE3HUGDNQrRwj6eLh1A4jqC2JlAq/sQFteX4wHd8gFPlZoB3xDBPX0INaY9PDCF8WhqD/XzB3iymITQkcDM8tf/A0oUDHiDDMrfRojDqNBFwB9PoHoiBv5EFFWTURjt7gyguIQnuF1WKeBV8AVKg3m7SbsGiXETUvMOOixhvJjawUtLEK2Tm7hOB3BzJAjz0h8XjFo/QWRLonFuH2LHAZoXY3ju/oE29xFaXQlInHG0rRxi2vkdRfIQrlG7eGdbzgB0liXcHyU9yXm1JgZ1M3E0zCdRb92D6EMcjY4Ymj7GMG73Ir99HdxOP/SWzxnAyMQCyocZ3FUFUandRZU+jGpjBDXmGB5ORSGYS0Iwn4BtYTGm0WiMXV1dRpqmx9JxFmt43I4bvQHcUeyimGKIAyglH1imjaJUS+ZYHMWaACatVj+PxysvJCKxU7/TRH3q9zjXsgG21I+LHdvgvNrGJXJm4Zsg6RwgnUlvhR86vWk9Ozubk5WVdYbEMgCF3oacli2cFW8iR+LHBWkA59s2kC9LwbZwpS+Mq/0hUCqNJx35W7TaiJrXdjyWOyEc9EJELKRXIVb7INH6IBpyQzjkgkqlPR7AZrMLUuZwOL8slUrbfT4fZDJZP5fLLUg5tc/Nzc1JR/7R6by8vFsSybPOnp6eaaVS+U2n1+8YDAbfwABtaW5u6b5cVFRC3mV6n4xYrJ+2/NuIuEWWzAAAAABJRU5ErkJggg==";
				break;
			case 2:
				text1 = "\n当前状态：自动代理配置(PAC)";
				Src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKUSURBVDhPrZJdSJNRHMa3IbgZqIi7NvCDeaMXTpQpbcJWfrGhTR26i2kgW1DUjZUVZDUjL2QgihJtMt+3rVGZG7ZmkkwXpYiZLs0+GBhhZZtNDbUuns57EtaH3fnAwzmcc57fOed/Dm/fZWWYhe6JZdyYWsHN6Y9gghE4l6JwLEZwm7RMcBXsyzAm55ewG/lT1gFm4ZQ3jNaJbZwZi6I1sIGLz77h8swOzHM/cOXFFtqD3+Gfe703oNdqX2i+G4HJE4XRHcZJ3zpO+NZw+vE6zj7dwfmpbVyY3sL4/Jv/A+oHItDfisBwJ0q8hmNDUZgebuH4yCZMIxtofrQB72QwBtDpdC0ajaaltra2hXU4P52zz+KSMwjzvVe47nkL8/1FtHuW0D7yARp2FUddXzA689sJXC4X1Go1dXV1NaqqqlBXpyOuQ01NDbRaLe2PTi2izBqGmvmK4SfzMYDD4UBxcTEUCgXkcjlUKhVKS0tpW15ejoqKClRWVmLY/xyHOpeh7F6B2z8bA/T39yMnJwe5ubnIy8uDVCpFQUEBZDIZioqKUFJSQuGBQGBzcHDQ29PT42VZ9sFunMez2WxIS0tDZmYmdUZGBiQSCbKzs5GVlUXNzft8vhW9Xm84QkRiwl9poq6uLu44iIuLg1AohEgkQkJCAhITE5GcnIzU1FSIxWKQ3d+np6crkpKSDpL1MUBfXx8FcObz+RQkEAgQHx9PYSSAlJQUMOSX0sDf4mrAVbqhoQFNTU3UjY2NMBqNMJlMtG8wGEBea29AYWGhnDMpFHVHR0dnKBSCxWKxKZVKOWduPD8/X7ob+UcHyDNqzeZr3eQ6Y06n892Q2/3Z4/GE7HbW39Z2tfdwWVk9WRe79/6Ix/sJqC2AUq/gThQAAAAASUVORK5CYII=";
				break;
			case 4:
				text1 = "\n当前状态：自动检测此网络的代理设置";
				break;
			case 5:
				text1 = "\n当前状态：使用系统代理设置";
				break;
			}
			icon.setAttribute("state", "enable");
			icon.setAttribute("tooltiptext", "代理已打开" + text1 + "\n左键：关闭代理\n中键：启动 GAE\n右键：代理设置 UI");
			icon.setAttribute("src", Src);
		},

		getPref : function (aPrefString, aPrefType, aDefault) {
			var xpPref = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefBranch);
			try {
				switch (aPrefType) {
				case "str":
					return xpPref.getCharPref(aPrefString).toString();
					break;
				case "int":
					return xpPref.getIntPref(aPrefString);
					break;
				case "bool":
				default:
					return xpPref.getBoolPref(aPrefString);
					break;
				}
			} catch (e) {}
			return aDefault;
		},

		setPref : function (aPrefString, aPrefType, aValue) {
			var xpPref = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefBranch);
			try {
				switch (aPrefType) {
				case "str":
					return xpPref.setCharPref(aPrefString, aValue);
					break;
				case "int":
					aValue = parseInt(aValue);
					return xpPref.setIntPref(aPrefString, aValue);
					break;
				case "bool":
				default:
					return xpPref.setBoolPref(aPrefString, aValue);
					break;
				}
			} catch (e) {}
			return null;
		},
		// 开始监测
		addPrefListener : function (aObserver) {
			try {
				var pbi = Components.classes['@mozilla.org/preferences;1'].getService(Components.interfaces.nsIPrefBranch2);
				pbi.addObserver(aObserver.domain, aObserver, false);
			} catch (e) {}
		},

		// 监测结束
		removePrefListener : function (aObserver) {
			try {
				var pbi = Components.classes['@mozilla.org/preferences;1'].getService(Components.interfaces.nsIPrefBranch2);
				pbi.removeObserver(aObserver.domain, aObserver);
			} catch (e) {}
		},

		buttonPrefListener : {
			domain : 'network.proxy.type',
			observe : function (aSubject, aTopic, aPrefstring) {
				if (aTopic == 'nsPref:changed') {
					var type = quickProxy.getPref(aPrefstring, 'int', 0);
					if (type != 0)
						quickProxy.setPref("quickproxy.type", 'int', type);
					quickProxy._updateUI();
				}
			}
		}
	}
	
	quickProxy._init();
	window.quickProxy = quickProxy;

	function addStyle(css) {
		var pi = document.createProcessingInstruction(
				'xml-stylesheet',
				'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"');
		return document.insertBefore(pi, document.documentElement);
	}
})('\
	#quickproxy-status {\
		list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKXSURBVDhPpdJbSNNhGMfxP3Qf5F0XkcfUbW4epssDas5c06nz1GYq6jxtUwzRCElXmApdhIpmkHURmqXpzdQwpBMoeQANnSVJkOYhu8iLoqyLvs1FG2Te1AM/3ufqw/s8PEJBcT7/Ewcg/FHpuWnITnsTVSMm2iImslqMokREqN6f0AwxIVo//JSe+wP5xmxU3YEYXsVTuaGhwKYkczwKrfU4STfC0HSGEV7nvz+QbcxA6PMl80Ms59FS8SkRw1Y8qkUF8kkZ7mMihOveLmBtdZWNdxusr6zz+eNXUvTJCPVHEQ+JSJxWoJmNJG4ihOS1KGJscqQzUg70+7qAlFw1GeWnyKtLIueCBtOlbMrPGTCbSzCaDZzJy6Te1IxsKYgwWzBuUxKE3mMu4GS1nISBQLLmY0ibiUA1Ekx8j4y4lgBiGyVEWPyoqjWhfqxA+VBO6ZAMaYuPCwi2+BAxF0TtThp1XzIwb6rRLcWimgwlfDQArwFfTFf0tF3usI+5zY97I0wMjbkASY0Xh5+KSV+PIX87Ht1mLGlr0SQsKwieDUSYDuDstVxKDAaKivMYn3zmWLwTEOW443bVE89HIuJeylG/CUe5GIrqtYKQGRnCpMQBFBft7qSMqupKtt5vuH5w5MRBhJxDCM0eCFZ/vBZl+NpkeMxLEZ7bFzYuwdSuJzUpifRMDYkaFQWFOS6gvbWNnq5uhvse0H9rkNbGDlrt81rvjDI78ITlqgbqGhqw2V6wuDDHwvwsM1PjLsBxPfbqu3ubxkYLRmOhI01NF7k/2Lvn0H6XE/j2fYebXZ2UmksxVRgxVpQ5XrM9xcYihq0Df0WcQEdHC8mparJ0qZzWa9Fl/8pun6VLIVmbyOrK2z2IE/j35PMT5aYBki4iccEAAAAASUVORK5CYII=");\
	}\
	#quickproxy-status[state="disable"] {\
	  list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKZSURBVDhPpZJdSNNRGMZ3G3VREHVjGeYa+3C6Tc2pM7fpNnXO6fw7Z+LXPpwfg7yIIDAr9KIuMmoryCQiKqPChCyjUKJAKPKqi4i6CBQlkrpRMshfx7/kKPCmDjy8hwPnd57zvK+iJdTM/0gGKP5aXqmaNJUKTZYBndGExmBEnWkQyhTKQpWhJzVduTmgviWAMb8AX6COtkiQmnoJZ6WbYoeDQrudopJStNnZmwOkw3Vs35uK21dNpCtKS7iNQEujDMmz2VBnGUlRpicBc7OfWFiYY35+lqXlJdw1XralpKLPzcNeXo7TU4nV5aJCnNtEzS22otRnJAFOdxkudwUen1dWU1sT4WiQSDREMNJGrb+WvlPHKRD2LaWlZOQXkqZRJwHZhRYMBRZc4qWS8jLMwqapoIisg2YMefnoTDl0xtpxiC9YhaMGAVFn6pOAAzodZquNaHcHnUditIo/V4vg7MKuyXIIpXbdbiI+yPziZ3j0gOmpiSRAqdWh0mdSXu1Fagzg9Ut4JJ/84pptrXAQ7g7TEG5GCjUyOf1cDn4DkK7WsDttv5zuWkiuKs96eAJgttlRGXMIdoWYOdrDu54Y8d5jfJyfSzrYsS8VxZatbNm5iz1iQNZsmyzFci4qMUB64YCABE4HuJxyHY6J9v4GJBLnuXXzGk8mxrg/OsLFxCDx+DnGH4/x5sUkNPr52R5kdSjB6uULcKafL1ZrEiBPj1h3bl+nv/8E0WirrIGBPu4+ewhnB/ha52Pl6Tgr46MsX0nIlzcAKz++c3XoEpHOCB3dUdGNdrl2CoXEJE7dGOatQsEroddCL4W+ne5NAuKiPZVVZUj+KurqvfgD61rbS34PlU0SH+6N8F5kNSMuLw6c/LML/65mfgEPKwDLJzdfwgAAAABJRU5ErkJggg==");\
	}\
	');