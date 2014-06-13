// ==UserScript==
// @name            Sidebar.uc.js
// @description     侧边栏功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// ==/UserScript==
(function() {
    if (!document.getElementById('sidebar-box')) return;
	if (!window.SidebarMod) {
		window.SidebarMod = {
			sitelist:[{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH7SURBVDhPhVI9a9tQFBUeO4YOwZTSH+Ch1I2esIdi10jvPYsMmTLkH5Sm9lI8FIsOHUsU+gOMKSGEBNwiB5K9xJbdQJYQYtWIYEonL82HBhNe7316LnbT2AcOsu5759xzr6zdB+FoibPlTPL6OJMUQkuo8nwEtvGsx/TtgOuXASci6hripkMuoy7ZufaXnqtr/0eP69UeI7coDBjpH7JseLKXDW+6RhgbGbdg9F5dj3FeNAryyck7KeR6GHCDYs2y6JZpss/4O+rq5oRRFWsS0PEXRD4G4QjFOLc6mjJAXPlLi2iCSa78zFNZhK6tuDMRMELwo0hWcYF49q8BIvINiimAcR2EW2MDxcO+nX5sWdYT06TnlsXOKKWP5GWFeBQylC89Tj6gEEa5gD2syCIAujdALJCQ4hRYi8lp1CENTPH7e/ohGqyhyU87/UBpJUC4O2mA4yAhDc81aSPfhPqBuaCu3wXGHu+Ac76oyhJ5j4U5j8UjIF59+pYsua2N8uaR/Hyz8HKf2dg936R1VdK0dbeTeuO2R6WN1uD1ZntqYZMofCkkofsAOHrhFVOqHKPktt8CBZqsu77tOOLv/99xnETOo1yKoTvsoKKOpgFjVGQSZQT0QPAVBBcyNnS+VzwGjgNGdTAaopHsCAsD1u7Enofyx6OFmZ9K07Q/7iAmIuxhVMIAAAAASUVORK5CYII='
			},{
				name: '附加组件',
				url: 'chrome://mozapps/content/extensions/extensions.xul',
				favicon: "chrome://mozapps/skin/extensions/extensionGeneric-16.png#-moz-resolution=16,16"
			},{
				name: '侧栏翻译',
				url: 'http://translate.google.de/#auto/zh-CN/',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAElSURBVDhPrZE/awJBEEevEOz9JPkS6dIHLCzSpQtYBQIhpYF0dmJnkyKkE1FSaCMcxCNBwcI/ICYhiF20sBl5w82y4U4NwYUHe8f+3szsBkdZ65+FGM3ms1SqZVkupsr351C+PgYSH01fBK5vikrhIq/YN8xn/b8J/KAvOiig9W7Y1kDUDzVweVeSq1Ac5x2Rs9ZKTuoiuceN4kazea0iHbE/JIBfAi7QWmfvh19GcwVJqmAy7iVmJwj3r0v3GuwTAubOFEd6D1TmG6gGVDYB+4SAsKE/4sW8CAg+hZFWZ++PoQf3CQjxKreNyMn8LvTgLgEH7Fm5I0DAv50CHyoSov3T2rsG6MTuxwmwpgkAgYUNLhucgJUmyT68KX7Yh0wc/+8Kgi1VwxKf8jOsdgAAAABJRU5ErkJggg=='
			},{
				name: '豆瓣电台',
				url: 'http://douban.fm/partner/sidebar',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKySURBVDhPpVJNSBtBFN7WQ6FQKIReemhBKCL04qFUFDFas5pkk12TXTc21p80qQaTCv4RazWbxEOoUBPjGlc02BA1teaQUlJEivRSL948lJyL50KhaBMzr7PrVmmt9NAPPt43s/O+efP2ERcBAC6p8t8YGhq6PTY29qC/v1+jbp3C7/df5jiuDMuLDb1e742mpiZPO8/HR0dHQ5OTk/zAwMB9n8/3m+HGxkaZbChT3TqP8vLyWxUVFXatVjvudDoHXS6Xc3h4mMSG19Uj55FOp+/m8/nura2tDlEU+flYjEomk9bt7e2JXC63ub6+9ml5eXkvlUoldnY+uHd3dy2SJF1V0wkiGAyuZbNvQVqQjl9n38Grj3uwlkrBykryaHFx5Ws8Lh1K0iLMzYkwMxOFXO596eDgy4toNHpFMXC73Zse71NEUVTB1N0L956/RBaTGbg2G3AcDyzLg8FAHet05LFW21j0+wXY39/PV1VV3VQM+vr63jwbn0CP7B2F7kEfosJLyNXjQE963ain5zHi+XbEcTZksz1EFgtXFIQgymTSn3GvTgw8Hs8m7gNEItGiKM6DGF8AEZeL+4HLnoMYphwjkQjCZZdWV1dRIpFYwgbXFAO73Z7BVYDZbC5arVZgrRaQ4xlZhTRDl0wmE0xPTxe6urpalGQZeFAUg9ZWpog1fvcfZE9iG8chhqFROBwudnZ2tqrpBEHTdMbhcCAjZSwwDINoWiaNDzNKgryWNW5yyWA0IkEQiizLnhno9fqszWaD+vr6EkmSQDbrQI46WZPNiiZ1siahoaEBRkZGEH4uq6YTBH5XanZ29kcgEPg+NTV1KASEI3yLysCpDoVCh3iMj2Kx2Dc8+gY1nSAqKyvv4Nup2tpafXV1dUtNTY3hb/z1ra6urlGj0Zz8gf8DQfwE+1lqxfLEhu8AAAAASUVORK5CYII='
			}],

			makeButton: function (sitelist) {
				var i,
					len = sitelist.length,
					item,
					btn,
					frag = document.createDocumentFragment();
					insertpoint = document.querySelector('#sidebar-header .close-icon');
				for (i = 0; i < len; i++) {
					item = sitelist[i];
					btn = frag.appendChild(document.createElement('toolbarbutton'));
					btn.setAttribute('tooltiptext', item.name);
					btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
					btn.setAttribute('url', item.url);
					btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
				}
				insertpoint.parentNode.insertBefore(frag, insertpoint);
			},

			//添加侧栏前进、后退、刷新按钮
			addControlBtn: function(){
					var SHBtn = document.getElementById("sidebar-header");
					if(SHBtn) {
							var _sidebarBtn = document.createElement('toolbarbutton');
							_sidebarBtn.setAttribute('type', 'button');
							_sidebarBtn.setAttribute("tooltiptext","左键：后退\n中键：刷新\n右键：前进");
							_sidebarBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
							_sidebarBtn.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABaSURBVDhPzYzJEcAwCAPpJ62kaHfmHCMzJEbi4Y/3BSuNbE/OdnScTuZSniIbKEdGSQ1k2UtZuKEdFijnfhIgepWtD6QCKPf3PAiUHVVQ2YdqAK+GDeDcCrMLOe2fMX6PACcAAAAASUVORK5CYII=");
							_sidebarBtn.addEventListener("click",
							function(event) {
									var webPanel = document.getElementById('sidebar').contentDocument.getElementById("web-panels-browser");
									if (event.button == 2) {
											event.preventDefault();
											event.stopPropagation();
											webPanel.contentWindow.history.forward();
									} else if (event.button == 1){
											webPanel.contentWindow.location.reload();
									} else {
											webPanel.contentWindow.history.back();
									}
							},
							false);
							SHBtn.insertBefore(_sidebarBtn, SHBtn.childNodes[2]);
					}
			},

			toggleSidebar: function (commandID, forceOpen) {
				var sidebarBox = document.getElementById("sidebar-box"),
				sidebar = document.getElementById("sidebar"),
				sidebarTitle = document.getElementById("sidebar-title"),
				sidebarBoxArrow = document.getElementById('sidebar-box-arrow'),
				lastcommand = commandID || sidebarBox.getAttribute('sidebarcommand') || sidebarBox.getAttribute('sidebarlastcommand') || 'viewHistorySidebar';
				
				if (!commandID && sidebarBox.hidden) {
					if (sidebarBox.getAttribute('sidebarcommand') === '') {
						toggleSidebar(lastcommand, true);
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
					} else {
						sidebarBox.hidden = false;
						if (sidebarBoxArrow) sidebarBoxArrow.className = '';
					}
					return;
				}
				
				if (!commandID) commandID = sidebarBox.getAttribute("sidebarcommand");
				let sidebarBroadcaster = document.getElementById(commandID);
				
				if (sidebarBroadcaster.getAttribute("checked") == "true") {
					if (!forceOpen) {
						if (sidebarBox.getAttribute('sidebarcommand') !== 'viewWebPanelsSidebar') {
							sidebar.setAttribute("src", "about:blank");
							sidebar.docShell.createAboutBlankContentViewer(null);
							sidebarBox.setAttribute("sidebarcommand", "");
							sidebarTitle.value = "";
							sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						}
						sidebarBox.setAttribute("sidebarcommand", "");
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						sidebarBroadcaster.removeAttribute("checked");
						sidebarBox.hidden = true;
						if (sidebarBoxArrow) sidebarBoxArrow.className = 'right';
						gBrowser.selectedBrowser.focus();
					} else {
						fireSidebarFocusedEvent();
					}
					return;
				}
				
				var broadcasters = document.getElementsByAttribute("group", "sidebar");
				for (let broadcaster of broadcasters) {
					if (broadcaster.localName != "broadcaster") continue;
					if (broadcaster != sidebarBroadcaster) broadcaster.removeAttribute("checked");
					else sidebarBroadcaster.setAttribute("checked", "true");
				}
				
				sidebarBox.hidden = false;
				if (sidebarBoxArrow)sidebarBoxArrow.className = '';
				
				var url = sidebarBroadcaster.getAttribute("sidebarurl");
				var title = sidebarBroadcaster.getAttribute("sidebartitle");
				if (!title) title = sidebarBroadcaster.getAttribute("label");
				sidebar.setAttribute("src", url);
				sidebarBox.setAttribute("sidebarcommand", sidebarBroadcaster.id);
				if ( title &&  title !== '') sidebarTitle.value = title;
				sidebarBox.setAttribute("src", url);
				sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
				
				if (sidebar.contentDocument.location.href != url) sidebar.addEventListener("load", sidebarOnLoad, true);
				else fireSidebarFocusedEvent();
			},

			modifySidebarClickBehaviour: function () {
				var sidebar = document.getElementById('sidebar');
				sidebar.addEventListener('DOMContentLoaded', function(){
					if (sidebar.contentDocument){
						sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
						var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
						if (wpb) {
							wpb.onclick = null;
						}
					}
				}, false);
				
				eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
				
				eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
			},

			init: function() {
				window.toggleSidebar = this.toggleSidebar;
				this.makeButton(this.sitelist);
				this.addControlBtn();
				this.modifySidebarClickBehaviour();
			}
		};
		
		SidebarMod.init();
	}
})();
