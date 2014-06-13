// ==UserScript==
// @name            HomeBtnSidebar.uc.js
// @description     侧边栏按钮以及功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// @author          defpt 
// @version         LastMod 2013.07.30 添加几个小书签脚本
// @note            v2013.07.26 添加侧栏前进、后退、刷新按钮
// @note            v2013.07.15 侧栏激活挂在主页按钮
// ==/UserScript==
/* *********************使用说明*********************
	此脚本从lastdream2013的SidebarMod.uc.js修改而来，原作者是NightsoN，感谢他们
	去除了某些我用不到的站点以及Splitter，开关设置在了主页按钮右键
	添加侧栏前进、后退以及刷新的3合1按钮
*/
(function() {

    if (!document.getElementById('sidebar-box')) return;
	if (!window.SidebarMod) {
		window.SidebarMod = {
			sitelist:[
			{
				name: '书签',
				url: 'chrome://browser/content/bookmarks/bookmarksPanel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVDhPlZE/SBxBFMY/olHEgFUStNVODKSSIAiBFJKApZAiYqWNWGqhYCPEO+90V43cYlC880BPFOz8U9hZKSEkpLFJYhEQNIfnzs4bYSZvLmNEPPTywQ/evPd9j9lZ3CXaQBfz1h3/T3oVNWoDOWbN1q5dvjj4Qq3jqAjXrl2eTICHKocRsQZlsbXtufH90hnU0wr21AqMxda258Y3pfOHTbTf06KW0SYz6KQsupmYWAKpLC9gRAaSlvGeeXeZxWu13dqqTz816/yXRtASfJHGuUqzuUzEAnSUxm/OetDfxuppAX44D0GLfN0ycN4ZfRhrKH6GMaMPonn0yxRO6COb7sB65GLtgM0Uw1cqvnyAPgrwkzEl+YAfKoVecxCU/iMXKX79WezSHJtLs12YwxNnvy3y8Vz4+EozbC6BmMZnvsUzZ78tOYVO4SFPHgeYMIFC6OHi6hx5OJWTeOPsN2VGUSmTGAnj0BwMKYktNYX2KImXNIkd27MzXjBojKlwsWuZWTyiODYpge9yAkPax2M3QsHDU5nAMM+OaQI5rX/VutG1zDjqZAypKI5XfJsq1/4nXljNsw4ZR2DOzur+doE/oEdo9V5pyj4AAAAASUVORK5CYII='
			},
			{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH7SURBVDhPhVI9a9tQFBUeO4YOwZTSH+Ch1I2esIdi10jvPYsMmTLkH5Sm9lI8FIsOHUsU+gOMKSGEBNwiB5K9xJbdQJYQYtWIYEonL82HBhNe7316LnbT2AcOsu5759xzr6zdB+FoibPlTPL6OJMUQkuo8nwEtvGsx/TtgOuXASci6hripkMuoy7ZufaXnqtr/0eP69UeI7coDBjpH7JseLKXDW+6RhgbGbdg9F5dj3FeNAryyck7KeR6GHCDYs2y6JZpss/4O+rq5oRRFWsS0PEXRD4G4QjFOLc6mjJAXPlLi2iCSa78zFNZhK6tuDMRMELwo0hWcYF49q8BIvINiimAcR2EW2MDxcO+nX5sWdYT06TnlsXOKKWP5GWFeBQylC89Tj6gEEa5gD2syCIAujdALJCQ4hRYi8lp1CENTPH7e/ohGqyhyU87/UBpJUC4O2mA4yAhDc81aSPfhPqBuaCu3wXGHu+Ac76oyhJ5j4U5j8UjIF59+pYsua2N8uaR/Hyz8HKf2dg936R1VdK0dbeTeuO2R6WN1uD1ZntqYZMofCkkofsAOHrhFVOqHKPktt8CBZqsu77tOOLv/99xnETOo1yKoTvsoKKOpgFjVGQSZQT0QPAVBBcyNnS+VzwGjgNGdTAaopHsCAsD1u7Enofyx6OFmZ9K07Q/7iAmIuxhVMIAAAAASUVORK5CYII='
			},
 			{
				name: '附加组件',
				url: 'about:addons',
				favicon: "chrome://mozapps/skin/extensions/extensionGeneric-16.png#-moz-resolution=16,16"
			},
			{
				name: '谷歌翻译',
				url: 'http://translate.google.de/#auto/zh-CN/',
				favicon: 'http://translate.google.de/favicon.ico'
			},
			{
				name: '侧栏站点',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANHSURBVDhPhZJdSJNRGMdXCQVFH0QGUURg1kWQNxFGF3VVVARRRnVRkJQxdTan++qdQ9MlxsCkbei2nHNbzNTmx2uzNd61MdP5tensY27vnKum7f3aNIlsvp2JmVTSH87NOf/nd57znD/jf6Jpeh3lNaZhA8oSvFfai1uKB0j45rsYwnfPRDxlS7a/BQrXzPidqZhHL8T6ZAjWr6zD3for08O6DGysOZtqz/LGXdXji2YEQVL8fn8qKEqhafHaBffDo3Tw+QlyrFUXHVCrp98jp6cCgZ2LZqAkPGpm3acsd9Bk8SaFQlEpk8k6DAbDrgXTqQMJ/f6xBHzePTvZkz001H8DnHe3tbU99vl8638BcAu7gkIEKEMikWwvKChws9lsv9FoTPvR/+BaQrs7nmg9Hlr4CKfr9fpCFotFNzQ0IJFIZGMSQJLBrdQrNkK46/uXARwOJ/DW2cQk3na4Yn0PmwhnFZ8MBrc2NjYuArRabZ/Vaj0Mw3B62GO6RL3MDZITzoplQMk97myoRzXcpK/DhEJhpLy83A2K0n4BxGLxNz6f/xmsT7D8NjZhFtriZPjSbwCfNedzdZSDtz7l8XgU2IvU1NQcTALy8/NpkQiiamtr+55Ul1AGYSZddV8wPv7By1k5AxTcuM9ut+8QCASOlYBkBxqNxj49bj8dtfLQxuqimby8vITD8drFsLTWpXOL7qLJIYKf2AMgG0EHtj8BxqcNPtwGIVGbSKnRqJtzc5k0DHegjLBDViXhZc+zCwtXBbBZTNosz/lOOiVvPgdcR6RSaQuTyUwgiKWX8ckm8VeKOTSXy412dXUdXwmQy+WH2puelKmFp2iT9HLUajYp6+vrlWCQsxAEEaOjg2UMrJsVUClqvhYXF//Q6XRSANlcWlqKiCCIfOcwSAOm3EkldGH+noA7B8AJDqcwIRKJpkDoBDgePsug2i94R3vhShCUWyCVGaFQaNugo7PC21k5+cXCiU0gjzR6rfq62Wy+qFKpbiV9IA/HgHcDSYZPMmIt50Yoc84I6dGWYS5FCYHwjcQL5hRpKbDhI8+yCCKwJZm+f2kREB/RCmbar/jjLWfQWOdVlLKJ3YTHABHo4N4l36rC8Y+ZPwEZMzc3tRZqkgAAAABJRU5ErkJggg==',
				childs: [
					{
						name: '屏幕取词',
						url: "javascript:(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}",
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIgSURBVDhPfZM7aBRRFIb/+CiMxBc+CgVBBUlhJVgYsBEFQUs7jaax8QGieew8MrVIipQRXEXQQuwEV1AJaCG+WNRCCxESze7MzrgbfKBIkvG7d2eiq1kP/Mydc///P+eeO6O/I03VUR/UytjXztjVydhTseboTCp1ZJR/Iw20KCxoA6K9iathcL3m6ooRJo52YbK9EWiV4ZkCmex3TDraWPN0C+EYOFbx1D0VqNPsmcrxBXVFvnro6DxFBuZGtMwK84hcbY0cPUXclwRakd7U4kpB6+hiD8Z+5OkBXYQ8Z8AT000mbYY18DQZO/qC4B6VLrN+Tm6avTnEaY7/G/xBbIfcYDrQmuo5LbcGFVebaf8+hHemKl3MgJAhfudos+TqFJmiq2/kXnG0w3CP2Fl8DrQ28XQW0jPIb2m/zHocHEdwG+IlMAqngMlpjF8nvk5VA6231UnuZ7KHEH8wLRpQpcGzSKVhDO9iZDppYNpL/kbLDOykfR1g82NuYIaJ8CjVHvP+HpRBCfSb7loMzH3zEe1DVLViA1c/6KwP8iDrh+SK9uNqGpY+8U1EgbalY1pqTcIhbUEwMW/QhKk8gsEoz0fga5Z/GXraEfery4pNtDFohxfmCjNpM5IBbcLgzQLkeTDYWY5Q5zauVS9m95/HeKAlzOAEpLhF5OlnNtyS+QcosntiSKszWWuYgSA4CPkOKLO+SrVe0M1f2Lnw7yz9AiGQnSrJ4PUtAAAAAElFTkSuQmCC'
					},
					{
						name: '自动刷新',
						url: "javascript:(function(p){open('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3EForce%3C/a%3E%3Cscript%3Efunction%20i(n){return%20d.getElementById(n)}function%20z(){c+=0.2;if(c%3E=t){c=0;e.location=u;r++}x()}function%20x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22Reloads:%20%22+r;i(3).innerHTML=%22Time:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)}c=r=0;d=document;e=opener.top;u=prompt(%22URL%22,e.location.href);t=u?prompt(%22Seconds%22,60):0;setInterval(%22z()%22,200);if(!t){window.close()}%3C/script%3E%3C/body%3E')})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')",
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALUSURBVDhPfVNJTFNRFAWNJsa4EqMxoII4hEGgtDKkEw0tnX4HPhR+S/s70Q+lUOgkImlLrSERAhpYGhMWXZi40ZV7FyQoIUaBDUk1sDHRje1CaeD63muLJkRvcv7Lu/fcc+/9770SbABw6vDw8PJ/cI4Q/2WYVNfSuXClphWqG4RQ3ZhH+W0B4JjKxNJFMVTsdCHtjxU6aNL0OVaVNAsak5NAINMRgYr65h+Vd4TfagXSpc3NzavId76QmjdMEil7J2U6MzDucRjgggRSiiEC/HYqK6PMwJdq4QZP/P7x4nIjKlpWTD4TiSVba0Sqfb3FA4xnAkwuP/S5/SDR5gXCsdmkjhn6omXcIFL3wi2edGNv73sFEikl1fkSakVB28CMko02dy46uzjnDcdTLXKaCCDc3Envqg1236dumxeEyl4QKekQ6QITBHLd53zVCeBC08+RrxahaYALpHAcd4rJz1ZeOA1WLxitwyCQ6NdJDH+kGibHjkwCZRmGj9vb7Yh8EoH8WLySWZGh/XUNPZgdGIrAXZnp55GA2GjPOsamobPf8wvtywt8XBULXSqsJ96urVXJDNYDp38aJBrm4EiAsnAbWEDLcODyhpTIdwEL4Fhju+IhXjHEalNMbx0BdyAGapPzK/aR2UYj8UdmLgz9ngDwO6itwllfxITK5o4MT6xeUhjMg0KVYd/muw92VKzHMfqmKFCayWTqafv4Fjv2ALQWDhpE6h253mzHhDYtnZXTdujsZoHhQsBFktDDjuRSL1/j23m2OGvZ6voHXb8rmLb6psDI+qBBrCFHqKa5rCc0A1w4Ab6pWXCMR+FeYv4pyrlGkouGyen0rgqRXzHuQE5qsBEBnW0oOxFfgGDiCfij82j++Dvkr0MCx98EbgmBjy5N98zcchILKIzurDMwA65gAlh/FLpMHmjropdwrJB23LA6QhUmIcgR8Mn8DV6+g5KS30xbDS0pNUvaAAAAAElFTkSuQmCC'
					},
					{
						name: '高亮关键词',
						url: "javascript:%20(%20function%20()%7B%20var%20count=0,%20text,%20dv;text=prompt%20(%20%22%E8%AF%B7%E8%BE%93%E5%85%A5%E9%AB%98%E4%BA%AE%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22%20)%20;if%20(%20text==null%20%20%7C%7C%20%20text.length==0%20)%20return;dv=document.defaultView;function%20searchWithinNode%20(%20node,%20te,%20len%20)%7B%20var%20pos,%20skip,%20spannode,%20middlebit,%20endbit,%20middleclone;skip=0;if%20(%20%20node.nodeType==3%20%20)%7B%20pos=node.data.toUpperCase%20()%20.indexOf%20(%20te%20)%20;if%20(%20pos%3E=0%20)%7B%20spannode=document.createElement%20(%20%22SPAN%22%20)%20;spannode.style.backgroundColor=%22yellow%22;middlebit=node.splitText%20(%20pos%20)%20;endbit=middlebit.splitText%20(%20len%20)%20;middleclone=middlebit.cloneNode%20(%20true%20)%20;spannode.appendChild%20(%20middleclone%20)%20;middlebit.parentNode.replaceChild%20(%20spannode,middlebit%20)%20;++count;skip=1;%20%7D%7D%20else%20if%20(%20%20node.nodeType==1&&%20node.childNodes%20&&%20node.tagName.toUpperCase%20()%20!=%22SCRIPT%22%20&&%20node.tagName.toUpperCase!=%22STYLE%22%20)%7B%20for%20%20(%20var%20child=0;%20child%20%3C%20%20node.childNodes.length;%20++child%20)%7B%20child=child+searchWithinNode%20(%20node.childNodes%5Bchild%5D,%20te,%20len%20)%20;%20%7D%7D%20return%20skip;%20%7D%20window.status=%22Searching%20for%20'%22+text+%22'...%22;searchWithinNode%20(%20document.body,%20text.toUpperCase%20()%20,%20text.length%20)%20;window.status=%22Found%20%22+count+%22%20occurrence%22+%20(%20count==1?%22%22:%22s%22%20)%20+%22%20of%20'%22+text+%22'.%22;%20%7D)()%20;",
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABDSURBVDhPY2CY/f8/RRhCkAmQDfj/ieE/MRisEQYGlwFkAdoZsOjFf6LwIDaAWEBVA7Y+k/1PDAZrhIFBZADZ+P9/AL7ukYxer5jbAAAAAElFTkSuQmCC'
					},
					{name: 'separator'},
					{
						name: '豆瓣电台',
						url: 'http://douban.fm/partner/sidebar',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKySURBVDhPpVJNSBtBFN7WQ6FQKIReemhBKCL04qFUFDFas5pkk12TXTc21p80qQaTCv4RazWbxEOoUBPjGlc02BA1teaQUlJEivRSL948lJyL50KhaBMzr7PrVmmt9NAPPt43s/O+efP2ERcBAC6p8t8YGhq6PTY29qC/v1+jbp3C7/df5jiuDMuLDb1e742mpiZPO8/HR0dHQ5OTk/zAwMB9n8/3m+HGxkaZbChT3TqP8vLyWxUVFXatVjvudDoHXS6Xc3h4mMSG19Uj55FOp+/m8/nura2tDlEU+flYjEomk9bt7e2JXC63ub6+9ml5eXkvlUoldnY+uHd3dy2SJF1V0wkiGAyuZbNvQVqQjl9n38Grj3uwlkrBykryaHFx5Ws8Lh1K0iLMzYkwMxOFXO596eDgy4toNHpFMXC73Zse71NEUVTB1N0L956/RBaTGbg2G3AcDyzLg8FAHet05LFW21j0+wXY39/PV1VV3VQM+vr63jwbn0CP7B2F7kEfosJLyNXjQE963ain5zHi+XbEcTZksz1EFgtXFIQgymTSn3GvTgw8Hs8m7gNEItGiKM6DGF8AEZeL+4HLnoMYphwjkQjCZZdWV1dRIpFYwgbXFAO73Z7BVYDZbC5arVZgrRaQ4xlZhTRDl0wmE0xPTxe6urpalGQZeFAUg9ZWpog1fvcfZE9iG8chhqFROBwudnZ2tqrpBEHTdMbhcCAjZSwwDINoWiaNDzNKgryWNW5yyWA0IkEQiizLnhno9fqszWaD+vr6EkmSQDbrQI46WZPNiiZ1siahoaEBRkZGEH4uq6YTBH5XanZ29kcgEPg+NTV1KASEI3yLysCpDoVCh3iMj2Kx2Dc8+gY1nSAqKyvv4Nup2tpafXV1dUtNTY3hb/z1ra6urlGj0Zz8gf8DQfwE+1lqxfLEhu8AAAAASUVORK5CYII='
					},
					{
						name: '维基百科',
						url: 'http://zh.m.wikipedia.org/',
						favicon: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9%2FAAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB%2FWvXoYiIiIfEZfWBSIiIEGi%2FfoqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF%2BiDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
					},
					{
						name: '百度百科',
						url: 'http://wapbaike.baidu.com/',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKWSURBVDhPnZPrS5RBFMbPX1BCUGolmVrRBYVMTW2xFC018wamkillFhkhmd0zKepDH6KiiG50wRDtAlJQkRgRamplWuHuuqvvqrttaBqSq+bO05nZ3bToUw8c3nNm3vObOTNniE5+hrKKT6ATHaDjbEfaQIfeg8regkpbQCVNoD0NoN2vQTtfgQrrQQV1oLxnUID/FeU8ZQCv/Lf0nQ5xqtwu2j+MChkb9A7RZRhT/nRR1mMGlHe4Q5fGxwUOltqxNMgo8nP7hMk4jpjIbpEcryl/uiizlgHH2t0hMPRtUn3LSuxYHdKNHVutaGkaRViwGQlrNeVPF6U+YsDhNhVoPRPYntcnious4uH97yr58oVBNSe/0iTAok2oMSna+IABB96poLpyGP7eeqELN6ta5XbHHFNlyzg7ow/Z6RZhs/5UY7ShmgH7W1XQzPTo0G6kJ/fiSe2ISti1zYqSYpvyz54ZQHiIGYG+RjQ3/lBkSqhiwL43CjDJ5ddUDYtL5wfUYW1K0MRiP4NYHmjClqxeNZaRYkFaoibMJteNUGwlA/Y2KoCUw+FUq6Wut2AJJy/0NsJjm1MtCvKybkTAXRnF3GUAd5dHH9vHkBRnwaJ5Xb8TPRYcZEJBTj9MXVNXSWtuMYBbU0owteKoXSyYbRD+c/5MlibHVwSYUP+Cd+AWRd1kAPe1lAScLv8qfGbqha+XAXO99MJnRifHBvjN0ov5bAE+RlTeHpoCRNxgAD8Kj2QvFBfaEK/TkJnUi4vnBpXFRvUgdJkZRfn9sH9xXaEUhV1jQN5zdyh3IfeBVqfT2fAvk3PqR7do1VUG5PKLko9C9nUat2YKd1dijeuO4+6B1vFJ6+6AovnAIrnmiOuulUM5eeUV/AKnyQMkiOUnhAAAAABJRU5ErkJggg=='
					},
					{
						name: '互动百科',
						url: 'http://3g.baike.com/',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFBSURBVDhPpZJNK8RRGMWfTyBJpIiIvOQlaVZ2lr6ArYWV8gGkIRONougvI0ppkiwsKLKxk40NO0uZhWZnZDHMjOM+L7fbUGYyp37d55z/PXfx9Ccc16EWCEf1qAVCugFVUXiH6Kugp+WEw0b8yc2sFor5kLFsJhw0QWn+zV1CL/PpMy/rEfZbIOz94GRcL55OqL+cUs9ibz3CbiuEVFs5rKfrMLOuZsJ36xG22yFEHYGSLYrnzK1bXAnIPQP5VyD7oLn1CFudEDa7lKhfy6nRkHlyGf3Gs/UIG90Q1nsUL+89by+an8+ptx5hrRdCsk9hRW6B3mcfNWP5jLEeYXUAwsog8GE/C8+e9DSwM1meMdYjJIYgLA9r+f5M50pYj7A0AuEiqQ8suuVVg/UIcWeY4qc+sDBWmXhMOw7CvDP/JoZvVo/pTzX7tjsAAAAASUVORK5CYII='
					},
					{
						name: '糗事百科',
						url: 'http://wap2.qiushibaike.com/',
						favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD9SURBVDhPpZM7DsJADET3VjRchYLLIGpOwXVoKBPnewRao2c0kbUkCEQx8sYej2c3u2UYBm/b1s3Mp2nycRy973snfz7uIq8a+aZpgtN1XeQKRQpEkhAAzY/7JSJ5htAIqMNnXfhQIwlNptmuh8UFQ4AE5KagjAAFYm4WyMkJwDqDEFnOgMikNYEsJC5xnueXAylqEgK30/4NqsOlORxob2oEItbIThCJM5AdklvWa8BlKOcRAprwjUDeStyDbJ9Y77sGHImxLmrOyU8Qb1PgF/wloO3EW2ChPa6RBXHUHPdA15NEFlqDOIAefn/hV+BCDyaTavBe4OjRmZk/AatB9hwTzzBfAAAAAElFTkSuQmCC'
					}
				]
			}],

			makeButton: function (sitelist, parent) {
				var i,
					len = sitelist.length,
					item,
					btn,
					menu,
					menupopup,
					menuitem,
					frag = document.createDocumentFragment();
					insertpoint = document.querySelector('#sidebar-header .close-icon');
				for (i = 0; i < len; i++) {
					item = sitelist[i];
					if (item.childs) {
						if (!parent) {
							btn = frag.appendChild(document.createElement('toolbarbutton'));
							btn.setAttribute('tooltiptext', item.name);
							btn.setAttribute('type', 'menu');
							btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
							menupopup = btn.appendChild(document.createElement('menupopup'));
							SidebarMod.makeButton(item.childs, menupopup);
						} else {
							if (item.name == 'separator') {
								parent.appendChild(document.createElement('menuseparator'));
							} else {
								menu = parent.appendChild(document.createElement('menu'));
								menu.setAttribute('label', item.name);
								menu.setAttribute('class', 'menu-iconic');
								menu.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
								menupopup = menu.appendChild(document.createElement('menupopup'));
								SidebarMod.makeButton(item.childs, menupopup);
							}
						}
					} else if (parent) {
						if (item.name == 'separator') {
							parent.appendChild(document.createElement('menuseparator'));
						} else {
							menuitem = parent.appendChild(document.createElement('menuitem'));
							menuitem.setAttribute('label', item.name);
							menuitem.setAttribute('tooltiptext', item.name);
							menuitem.setAttribute('url', item.url);
							menuitem.setAttribute('class', 'menuitem-iconic');
							menuitem.setAttribute('src', item.favicon);
							menuitem.setAttribute('oncommand', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
						}
					} else {
						btn = frag.appendChild(document.createElement('toolbarbutton'));
						btn.setAttribute('tooltiptext', item.name);
						btn.setAttribute('style', 'list-style-image: url("' + item.favicon + '")');
						btn.setAttribute('url', item.url);
						btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
					}
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

			//给主页按钮添加右键打开附加组件栏
			addtoHomeBtn: function () {
				var HomeBtn = document.getElementById("home-button");
				if(HomeBtn) {
					HomeBtn.setAttribute("tooltiptext","左键：我的主页\n右键：开关侧栏");
					HomeBtn.addEventListener("click",
						function(e) {
							if (e.button == 2) {
								e.preventDefault();
								e.stopPropagation();
								toggleSidebar();
							} 
						},
						false);
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
				this.addtoHomeBtn();
				this.modifySidebarClickBehaviour();
			}
		};
		
		SidebarMod.init();
	}
})();
