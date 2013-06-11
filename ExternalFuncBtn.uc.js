// ==UserScript==
// @name           ExternalFuncBtn.uc.js
// @description    多功能菜单，功能整理by defpt，注意onenote以及chrome要定义在自己的本地路径
// @include        main
// @author         lastdream2013
// @charset        UTF-8
// @version        v20130606
// ==/UserScript==
var gExternalFuncButtonM = {
    autohideEmptySubDirs: true,
    //自动隐藏空子目录
    moveSubDirstoBottom: false,
    //子目录移动到最下面
    moveablePositonOrInsertafter: false,
    //可自定义按钮是否可移动
    insertafter: 'urlbar-icons',
    //不可移动时可选 urlbar-icons addon-bar TabsToolbar alltabs-button
    toolbar: {
        //定义主菜单下子目录，加{name: 'separator'}建立分隔线
        subdirs: [{
            name: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFPSURBVDhPY4iaaPmfEjxIDcibF/R/67nl/++8uPr/0es7/4/f3PO/dV0uhjoQxjCga2Px/++/vv0HgX///oExjN2/pQJFLQijGJA9x/f/t59f///5+/v/8iPT/reuzflftiQabOicvR0oGmEYbEDzmqz/p27v/3/3xTWwbWtPzP1/9MYuMBtk87qT87BqBmGwAZO21f7/8uMTHC840AfWDAMgFyVPd/4fN9kWjqMnWSEMQMcF84PhfgeBH8AwWXF0GpQHAdN2NuI2AIRXHZv1//efX/+/A8Nk+q6m/+fvHwNrvPDg+P/dl9b9r12RDFaHYUDCVMf/Oy+s/r9gf+//6uWJ/9vW5f0/CQwfEPjw9d3/lOmuKOoxDFh8aCKK82Hg07cP/+tXpaGoBWGsXgAlmiM3doBj5erjs8BYmfM/Y5YXhjoQxhkGxOKBNsDyPwCILIjw7EEqFgAAAABJRU5ErkJggg=="
        },
        {
            name: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFxSURBVDhPpZPPK4NxHMenkJKDHFyU4uDk5uDkzEE5cFTufiV/goubEkMTJiWbyO+YklGSFAeUIVtbU8pq82ObbS/f777Pnj2zYeVd78vnx+v5fD7fHhNjJv7j/AELdfCwBi47zFXp8WyAoxOcfZkxae8Bum6X9Hg2QH4l/ALmwnTM3gjxqNYtdLes57IB5mJ480MkCLEIvD9DIq4aPz/gcRvma34ByBVCXthqE4W1Yp1+BZITLNZn1gpnAwIuWG+G61nwOeGwF86GIOjOrNOcCRgXeycSYK1Wo8qYZw82W+HVl64zWAEmS2GjBY4GFGCnA86Hxdd7YL8LLkYgGoKJkh8A8m1TioldwwHR3A0rTQqUOuKNFaYrcgBkQsplE69QJCZoh6dT9QKxsMqlJCd074Kl3ACQTbYGdQONrHuqDO5XtW6DLkcNgL8sj/pdHkcylx9A2n+idWqSBxfx/AEzlXBlUf/E8aCIFSTj+QNy2sQXoRT3DbYq8pAAAAAASUVORK5CYII="
        },
        {
            name: 'separator'
        }],
        //下面定义主菜单功能
        configs: [{
            name: '尚译划词',
            subdir: '',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMpSURBVDhPJZPdTxRXGMZHcGZ2ZrVeNOnXRXvZtPGiJk2t1SjsAmLRsgu7y5IQmzQNqSE1ppZlP2Fx2V3YDz4sxWIU64K2UAiiFgtpbQLGmKjhqknTi9rrJv0bfn3P4eLJycyZ3/M+73nPGN7oZZzoFN6uSdyucfZ3i7oqOOGSaBQ3XGRfpIg3nMfuyGEHL2EFs1iBIUx/BsMV2NXwBHa4ivHJKHuCYwKP4QkVqQ8WME5fwmgTSGA7OLwLt6TZ25gSAwVHx7EEfrmnSu/EdQ6dnxKjAp7OPG+cLdI+NE1A5HQOYwYGsVoyGt7r0wYTUr2KE6lKzDGurCzxbGeD97+sUPt5hZmlGi/+fsSff23zSvcge5rSmL409QKbykCBTqSCGynr+MaZHO/1VTjUV+bew2Wqt2r8+nid4xdl35/Cbc5gN6nqSS3DFdgJl6XfUd75osqV1RU+LV/FOJ7iowsV/nnxmOd/bHG0bwzj2ADGYdHROJbApjoDK1TmpWiJ0sI8D7eX+e/fHYZv1OjOfcMvW6tS/T65a3NsPVmXRKtkvv2Otq9K1DcmsfySwCPjUtXfPTfB270lrq4ucm58huL8TXryk2LwgLXNZfpGJyl9f5OZH2sEYmXqGySFNhDYkXEZZ0Y40DXC/L0fiOSmOdhb4PPCZZ7s/MZPD5Y4daFIXYPEPxKTFgbkDiTkEBPKoIgbKlDXnuOI7nmbpzvrzC7eIDk9y/bTTdY2Frl9Z467m7d4KzQkE0hIdZEvLgYyazeUx2gdInt9jo1Hd3kzkiWaHte6//sa/VOzvH46xcGzOfa3qvGpQ4zr1bA78njkipqBYV7tGeG1Tpl1g0Q7IZsffs21lQU+y8nF+uCiHJwCEzLGXQPLJy3p+92hrmgW82RKNpN4T6XwSiXbH6d2Z4H2/oqMsB+3JYFHoqv3pn8Ae9dAfo5AFs/HafadTOIK6LQktUz5MJquSN+D1DUKIJXtJlnlvSUG+gxsgZ22DK5U11JwszJIaBknYvpjT7NAAntElj8m/YuRmBqurqzgtAASXaVQUZWBQN7WuKzyrCqrBALb/n5tYvli/A/bgheQIo8aZgAAAABJRU5ErkJggg==",
            command: function() {
                gBrowser.loadURI("javascript:void((function(){if(window.Como&&window.Como.someyi){Como.someyi.open()}else{var%20a=document.createElement('script');a.setAttribute('type','text/javascript');var%20b=document.charset?document.charset:document.characterSet;var%20c=b.toLowerCase()=='gb2312'?'pack-gb2312.js':'pack-utf8.js';a.setAttribute('src','http://yi.comsome.com/'+c);document.getElementsByTagName('head').item(0).appendChild(a);Text.prototype.tagName='#text'}})())");
            }
        },
        {
            name: '谷歌翻译',
            subdir: '',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE4SURBVDhPpZGxS0JRFIctgmjtz3Dqn2hrNxoawsUtcAqCcFRwcyocgpYGEZcIo6EahAf1UJ7goBXxKkLcrKHlxHfgXN/TF1k9+HjvHt7vO+fem1o5DOU/qOBjPHQ0m3U5qlZkNHxQ3l568vrclVTC4wQE9vbzyvbOlmJrCJ+C+QTRYFT0o4DRW96VBvzA00CuUJRdTxyZa5GNi3dZOxNZPf1UnMD2ax2ZqHQ7+r2AA7TRp8OX/VBBkii4H9zF9k7IYBq7Db5nBOx7Kd/Xc2AK1jYy0BkBdRrNCAgbHCCwV0BA55rna3cE1MglCoCACQghPDj3NYgA2bcC7ndhs+HGtGslaFBLHz9OBIvZGw3zBgQQ7bh+0lGYBAHvmGA6bCAgyH8Ghw1OwNhJkuVyW4mGrWZ1FfydUL4AShiaWN/+gVsAAAAASUVORK5CYII=",
            command: function() {
                gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200");
            }
        },
        {
            name: '用 IE 打开',
            subdir: '',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGISURBVDhPpVK7SgNBFI1o4QMLsbASSytBLWzsRLBVRARbwUb8AFGwFERrLWytfCWiqIhBhSSCEgUTTDCJiZqneZt3Nnucmewku3EFgxcO3L1zz5lz745Gs+vAv6BarAeqxRp06lyYuQ1g2RLBhMGvPFd8SGjac2D2LogzfxrWRB45QcTLVwHD+g+M3XgxcPFW7ZcTKTq0LhjDWYiiiNqwELHuYzeGLt9/F9B5U/Bli0zAnsxj0xGHOZaTJAAbqVGRCkdOHiTWqG1KpqTmfSerN5KRaJ3HpFG2h0pCQAVSxRJr0gczWLFGKqDOeFBXqgJaWRMVCucEVWy7Ej8Fek89isWt22PVJoLWAye6jl4ZWqTRGHiy+BTGljOOjFAeIUkcjF572VnPiRuP0iJL5JK+c5XfuONJop/sYOHhU+EkXhAYiceaLVolywU2iOWRq/KNq89RZCUnPNLE0RJx2cCJHDxpIzPO3YcwbQqwl9Z+6MS4wYd5cwhTJj97zgoih2qxHqgW/wwHvgGXRPAubsnA7wAAAABJRU5ErkJggg==",
            command: function() {
                try {
                    var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
                    file.append("Internet Explorer");
                    file.append("iexplore.exe");
                    var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
                    process.init(file);
                    process.run(false, [content.location.href], 1);
                } catch(ex) {
                    alert("\u6253\u5f00IE\u5931\u8d25!");
                }
            }
        },
        {
            name: 'OneNote',
            subdir: '',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMMSURBVDhPJZLdT5tVHMefv8B7NTHZ3aJZFhMXr/RiN+KFN17oEpeYTJNl06ExQfdWsjedAze3gGOl0Lkx5pxDQFxg5bX05Xn6PFJoB31htKUtrOsbLVBKgaf9eHj2S745Oed3vr/v93d+R5IfqTj7VMZMj/F895hgu0LQqhHsUJm1eJhtfwm/WcF3S2bmpsK0wJPPe5FG7zsZvzjIwp8+irEiK9ECmdkMmadp8uECuUCe51qKJXmJpCtBfGKRhDOBdtWF1P/1Q5498LGeKhHq1gjcVkjPvDAuay2TKG1OYoKQdCRZHIkSHYqyOBpH/cWJJNcPUFhY4YX3Of9+cJ2uNxp4elsmoSS5tvcM5988SXAwQFpLEx2OEhmMEhuO4WkW5FCnRi6cJ6UtYztkwbrnFN111ygkV7BdtXFy/2nUe/8x/2gen8VnwP+7H7lJkINWlWwoR1JO0vtRK3cPXuHn/SbclgnUAS/H9zbg6Zki+E+Y8Ut2RhpGsJsc2BvHkALiRbPBLMvyMp3vN9H3TRcPzvxF44Fz3DE95Ojbpwl7o+xG6lmaucEQillM58IuWYwkM5cl2B/ix7fO8kf9XTJLOU4Iu5+89hVHD5gIaRFq1ZpRYDc21sqEh8NIcxaV2Fgc5ZaGad9Zbh4xGxfunOvhPekQx95tJDKbMM52KtvoOzo1vUbLl51I/jaZ+b557K1uvni9nh8OXqIqVCL+OB+/epy6V44QVBcM0uZGReSqaOM+9kl1u2QFtWMKb4+f0W4H7n5NaNSolCvGzxvoGGU1v8bmeplSccNwMGF28v07F5Gmb7jxds3gHw5QWn2Z1HXdUNC3d9gqb7FZqrBd2aKqV1nNrdHyWQdDJ2xIyhU7drOLyHTcsLYl+lpfKRnQt3Wjz0KqSDGzahTuNQ9xeM+3OM+LOatNDhIzy6QTOSNZrdXQq7pQWCebzFMWdqs14UIU3o22+nu0fmpFbfYgDR3+G1+7xpx1GvVXN+p1WawyU79pTP5k58kpG5OXHbia3WLvxH3BhXxZpvvD+/wPzzbait8wTUEAAAAASUVORK5CYII=",
            command: function() {
                var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe"; //本地路径，要自己设置
                var focusedWindow = document.commandDispatcher.focusedWindow;
                var selection = new String(focusedWindow.getSelection());
                if (selection.length === 0) {
                    goDoCommand('cmd_selectAll');
                    var allSelection = new String(focusedWindow.getSelection());
                    if (allSelection.length === 0) return;
                    goDoCommand('cmd_copy');
                    goDoCommand('cmd_selectNone');
                } else {
                    goDoCommand('cmd_copy');
                }
                var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
                file.initWithPath(onenotePath);
                var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
                process.init(file);
                var args = ["/sidenote", "/paste"];
                process.run(false, args, args.length);
            }
        },
        {
            name: 'separator'
        },
        {
            name: '网页快照',
            subdir: '',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADdSURBVDhPY2BZd+s/JXiQGMAGxMfefPt//O23/0rb72FViAuDDai8/Po/DJx6+/3//ldfCeLqK68RBpx//wOqHQE+/Przf8Ltd//zL7z8v+Thx/+///4Di6efe/E//ewLsB6cBrz5+ee/xs77KE71P/b0/99///4fAXoVhPEaUHf1DYpmGN76/AtUxX/8BoQcf4qhGYS7b76FqiBgQD0OF2wj1gVvgWGguQs1DAKgYQADeA0AgY/AWJgEjIWCi6/+L32EiAUYQDEAFKcHgHFLCoYFNNgASvBAG3DrPwB3cwaYGdGkeAAAAABJRU5ErkJggg==",
            command: function() {
                gBrowser.loadURI("javascript:(function(){document.location.href='http://webcache.googleusercontent.com/search?q=cache:'+escape(document.location.href)})();");
            }
        },
        {
            name: '站内搜索',
            subdir: '',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJBSURBVDhPdVJfSNNRFL7btBCCXoKghx6CsGVppmXTZQlFQkT0ViyIXuyxHgILCqSnsCClqXOb+6kzTaVZFNWD+e+lUkvM1IoSM9DhDApzkQWf55yf9+dg7cJ3z/13vvPdc45ShhuCUJHY9KbDUP48qBonVHC/uU+4t9ZheluWA5NAX7Kt34PNbSfgenIBG1tKZW/Tjv+DXtjYOXgAN0fDiP3+gdlf82IvvaqCCuSZJIkqNJRRBLtxEMqXg/KhOiwux1H67CK2tBzD6Z7r+PNvGWf6KkhJrvkumYAmYk4jzCxG4em/AXV3uxmtehsqRkIYnJ8kFfnJzgyR1uBCRvMRzC0toOBxGRz+fGwIH4Xdly2En37OEGFh6i8ICUnsnRvB/S/dULVZJiiBvbNvUT3eCRutHUZxMglPNv4bScyKnEU0/h0D0VFJ5vDCR/C49sZv5iC06pRIsnZAJFT/re2ncOd9O55+e4nLg15yDgjJ7bE2ubdrR01iMdGBKKHmUXW7RL5YUuadiAjJrbFWItlLbykf2m/N2S1lSms8hHVNJdKB69nSmT1YgNoPXUJSNd4he6u5LCl0KOwcmXpC1RPE8j4bypuJSlLwOjaBdAqiGlZVcET+W+6j86h8dw/Nn5/jwXSfIDLdL+j6OoDOqR50TL2wmkq+ywQskyOc7L6Codgklv7GRWqqcXXYJ8ocmkCmkEsaZ0fEI9hJ5XSSdYrV8GD3w3PY1HpcGk/pklo54MwG95lVSIUA3bMzv6cGVIYbK+VwOrO0gpzbAAAAAElFTkSuQmCC",
            command: function() {
                gBrowser.loadURI("javascript:var%20ax=prompt('%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2%E2%80%94%E2%80%94%E8%AF%B7%E8%BE%93%E5%85%A5%E5%85%B3%E9%94%AE%E8%AF%8D','');if(ax.length%3E0)%7Bwindow.open('http://www.google.com/search?hl=zh-CN&client=opera&q=site:'+encodeURIComponent(location.hostname)+'%20'+encodeURIComponent(ax))%7D;void(0)");
            }
        },
        {
            name: '侧栏打开',
            subdir: '',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG2SURBVDhPYwirOPifEgw2ILr2GBAfJwlH1R55BDeAHBxYvus5iAYbEFi8i2Tsn78dYYBv3hYU7F+w5X9J76H/SfW74WJ++Vv+x1Tt+B9ethXM98ldjzDAI3MtHHtlrf1fM+nQ/ycvP/0/cfHJ/6Ta7f8jSjf/71148n/vguP/A/LXgdW5pixDGOCcvAyMXVKW/c9v3/n/3NUn/6/fefH/69cf/y9cf/b/1KXH/zfsufo/OH81XK1z0hKEAfZx88E4unT1/+nLjv7Pa974PyR/2f91Oy78f/vu4/8dh679D8pdBlcHwlZRsxAGWEXM+G8TNeN/YPaC/84Js8F8EPZMmfu/bdpOoPhCuBgMW4ZPQxhgGjwJiCdCMYiNwGYh2MUN/fsRBhj4dZOM9X1bEQZoezT+0/Fs+U8K1nKvvwc3QMmueLGqXfFmNduKOxoudf9BWMW58reaQ8U5kLiqfekmZKxiV7Je2TonB26AjIwFp6CgMb+SVd4UFfuK/wpWJZ8VLXJnSWsGqYqK2vOgY3FxPW4GBnsWuAEMEMAsZ57TL2+R80zGJKWUT8ZNCCqOE8ANIB8f/A8A6TwzNR33LdQAAAAASUVORK5CYII=",
            command: function() {
                openWebPanel(content.document.title, content.location);
            }
        },
        {
            name: '高亮关键词',
            subdir: '',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABDSURBVDhPY2CY/f8/RRhCkAmQDfj/ieE/MRisEQYGlwFkAdoZsOjFf6LwIDaAWEBVA7Y+k/1PDAZrhIFBZADZ+P9/AL7ukYxer5jbAAAAAElFTkSuQmCC",
            command: function() {
                gBrowser.loadURI("javascript:%20(%20function%20()%7B%20var%20count=0,%20text,%20dv;text=prompt%20(%20%22%E8%AF%B7%E8%BE%93%E5%85%A5%E9%AB%98%E4%BA%AE%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22%20)%20;if%20(%20text==null%20%20%7C%7C%20%20text.length==0%20)%20return;dv=document.defaultView;function%20searchWithinNode%20(%20node,%20te,%20len%20)%7B%20var%20pos,%20skip,%20spannode,%20middlebit,%20endbit,%20middleclone;skip=0;if%20(%20%20node.nodeType==3%20%20)%7B%20pos=node.data.toUpperCase%20()%20.indexOf%20(%20te%20)%20;if%20(%20pos%3E=0%20)%7B%20spannode=document.createElement%20(%20%22SPAN%22%20)%20;spannode.style.backgroundColor=%22yellow%22;middlebit=node.splitText%20(%20pos%20)%20;endbit=middlebit.splitText%20(%20len%20)%20;middleclone=middlebit.cloneNode%20(%20true%20)%20;spannode.appendChild%20(%20middleclone%20)%20;middlebit.parentNode.replaceChild%20(%20spannode,middlebit%20)%20;++count;skip=1;%20%7D%7D%20else%20if%20(%20%20node.nodeType==1&&%20node.childNodes%20&&%20node.tagName.toUpperCase%20()%20!=%22SCRIPT%22%20&&%20node.tagName.toUpperCase!=%22STYLE%22%20)%7B%20for%20%20(%20var%20child=0;%20child%20%3C%20%20node.childNodes.length;%20++child%20)%7B%20child=child+searchWithinNode%20(%20node.childNodes%5Bchild%5D,%20te,%20len%20)%20;%20%7D%7D%20return%20skip;%20%7D%20window.status=%22Searching%20for%20'%22+text+%22'...%22;searchWithinNode%20(%20document.body,%20text.toUpperCase%20()%20,%20text.length%20)%20;window.status=%22Found%20%22+count+%22%20occurrence%22+%20(%20count==1?%22%22:%22s%22%20)%20+%22%20of%20'%22+text+%22'.%22;%20%7D)()%20;");
            }
        },
        //下面定义子菜单功能
        //辅助浏览
        {
            name: 'Bing网页翻译',
            subdir: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFMSURBVDhPtZLNK0RhFMYvyoaU7KyUjbJTFhQLW/wDspWShbWyV0o2FmaaaaJJlGFQpkT5SD4KST6LGR+LSQljYTDzc6ZzG915r6LJrWfxvPc5v3NO72sxZpGP/hEQrIKlNgg3g7fYPSNyBxyPQjpF9kvEYLLazIlMwEKLFsV3tHt0Xv3hkDNnywT4yxSS6Rgoh70BBZz5nTlb7its9cHLtayRhtSHDfCZOZEJWOnQgvg2TFTCWpf6XwNOvVqQGT3jj4bVX4WcOVsmYLdfC17vFfaeUP+Z1Ily8t+ASDtM1YCvBM4D8HQBt8sQqoeDQVjthM1eeNiXqUZcAIEKuIlI8TjMNshZQTaEr1QeVStcBvU617uz/3JWKISNHhn/DpLP8HgitxGV8d8gtghzjTBdC56inwC2PAKaqZOusla4Sd+GW07kDviD8gRYfAGVi9oGgbdlRAAAAABJRU5ErkJggg==",
            command: function() {
                gBrowser.loadURI("javascript:(function(){var%20s%20=%20document.createElement('script');%20s.type%20=%20'text/javascript';%20s.src%20=%20'http://labs.microsofttranslator.com/bookmarklet/default.aspx?f=js&to=zh-chs';%20document.body.insertBefore(s,%20document.body.firstChild);})()");
            }
        },
        {
            name: 'Bing划词翻译',
            subdir: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKaSURBVDhPfVJbSBRhFP6RwohKQ9PUtqASkyRJSc1rBAZdHgwKIXq0oh56sZCM6PJQWUaQERGZD+aDWFBBQRHddt2dnRks3EjcaFctyUu5W2m2uzPzdc6/6W4Q/fDtzJzzfed8/9kjtIpl+B/0quVw5SWiO1tA5+9K2195oVdy8F+wQd+0AurGNHiP7IX/fD20soxo0TgeOciiYAzcUa+ykTAd7uJUOPPmYbK/F3x6tudBLUmDRsIZvlDLs6CWZxIoQF2VwiSJnq256N1Tgdc1BRjpuon3jXVwrpsPjYvHaYRalglNiumu65PQd2gnAo4nCH8dg2lEYFkmwhPjGH/Uib6DNcRZJLmsYa1QyYZCdh1rEuBrOiqtfvfomHA+le9GOCSffCzLgv9ig+Syhl0IpSgVenU2fOfqYYZ+MQujDzrQs6sEQzeaMHDlJAavnkGIHHEBdsVcvXo13DQP8SJT4FNrs+xgTk9J0tjDTrzdvwPG1A+YkTCG21vgPXFA5ozpn5LLGvsqAdGdvxBvaksxeq9dEizTwIT9Md4d3o3ItyAsw8BwxzX00xA5Z5mm5LLGWZAM4aZ7OAsXw56TgJG7bbI6n5H7t+Gj+w5eP0vXOEVuJqPxO7cklzVu2guh0D2U0gwaylIKJsPffIz+d48kzxyLMD30AT7KMYe5UsMzcNGmubgITdVFCXvuHHjqtsF3oQH+S40YaDktn9qWHMrNJU56lEsa1kYd8AdjQwrcm1ciQsPjEw58QSQYkO8f2y7DQVupkG3Z8A+EUrwEElygKAUKLcjnrlYElOcIaq8QVF8i4HoG7/F96M5fIF3OagjCRT+zoCJO2gvuZF+bGAN9O1jMTeL5BMGCeHBQoRVlJ/HgzpJD+Rg/Fb8BRfqae7uMECUAAAAASUVORK5CYII=",
            command: function() {
                gBrowser.loadURI("javascript:(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}");
            }
        },
        {
            name: '繁体转简体',
            subdir: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADkSURBVDhPpZOxDYQwDEVvCM+RCZDomAKJjp4NaCgY4ZoMwAxswAS3Akv4YscJCQlRTld8RRH28+cbXu/Pif+oDqBHBABU85E8ywAO7BtAaFZcqNGc/WDuBmA14hTU3wDSTIXDiB1PXfm8AICdzgKCZi+Ztq+o6E6ufL1V5GCZW9PUYr+H9xgaTidlQwwbfXAPLp5DFACLmzabRREg64LGBGggNN25ucIsbUFsqnlLXNQBxKYrDlfYaXmFGgeU9JR8PA5wbSkFSAbRqnz6rT2LAN5AXMByEFYxg5JcPvEP9QMgpxO/jDuutEa92ggAAAAASUVORK5CYII=",
            command: function() {
                gBrowser.loadURI("javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();");
            }
        },
        {
            name: '右键防复制',
            subdir: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKuSURBVDhPVVNLSFRRGL6gIorixieI4mMhIpSajjPqzNy5M82M87j3zujoYrSNECIyE6KYYjQ1tRMfaVAbQYiwoHZBaS1cRA8qqKhRwVQCqaBW5fLrO9cHuvhmzj3/933n///zHykQCOAkwroOn88Hk8WCs42NONPQgCaTCR6vF+FQCMET3GAwiGMDEVBVFbLTaXxfHh7G7elp3JmZweTYGHRNg01RDJHAKYNjscuFRDyOndVVYH39AKkUsLmJn2trmJ2YgIOcgDA5aaBRbOfJt4aGgJUV/FtexqPRUSR6e5Ho68MiTX8sLRmx++PjRpbiQKGVNLo4WXOMG3/n57GbSGCABLPNBsXtRr0sI8rUd5JJ/Jmbw/7CAq53d0NmT3RqJJ1Nc1DwLBrF/sgIxim0eDyIcF+mcZzEPfbjN3GP6X+PxfChvx9ummrkSB52NmS3Y4PktzzNTYMQA3ZmdomC3Z4e/CJnqrUVDWYznra3Y48nX7Ba4RIGzq4u9LS04HNGBh5mZ8PV0QF7OIxYbS1SJSXYLi5GsqoKNmaiUHA3Lw9bmZm4yCt2dHYyA/7obW14LUl4kZ4OM9OP19XhI7+/EFdoYPX7EeY1ipIe5OQY+700OM/DJY0Bhe6Ps7LwiYHZwkK8439KiMvKYGe6nSxHYVbR5maD8zwtDV72QBUlaHR3ssZYTQ2+MigI74nB6mqcY3YeCq2Mq+zNE5a4zdhVGssU69QezAFPcPBjpqAAGyS8IW6SNFhfjwGO8o3KSrxkeTvcX8zNhZPXGzyag6NJFBsKG3ittBSvSBTkb8QWsUuIsqaKiuDizfjJPTWJR6MppstB6HxIYxUVmGZGs/n5mCwvR4QPSiYvcCg2dITkZ+rG4xDgRojwse7WSARN7EET1xauvVyLmCE+5Kqqiv8c/ONMxvueZQAAAABJRU5ErkJggg==",
            command: function() {
                gBrowser.loadURI("javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)");
            }
        },
        {
            name: 'separator',
            subdir: '辅助浏览'
        },
        {
            name: '自动刷新',
            subdir: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJjSURBVDhPY5jPIPyfEgw2gAEJTL0p7T35tsynidcV/0y6rP2674LZ0Y6zdkFQaRSAYcCSZ17y8x6aTJx6Xe7bxBvS/zsvKfyvO6L2r/KwbgNQmhGiCgFQDFjyxN5g9j2dwxOvy/2ZfEvqf9812f+t55T+V+7X+FS0T9MZrAMNwA2Y/9JUYvY97b0Trkv/m3Jb6n/vFel/beelftQfU/lXulfrXPFOPTGoHjAA2si4KjSUGW7ArPs6GRNuS/7qvyYFMuDepJsyHe3nFFOqjqg+L9qjNTF0FQMzVC8YHJOR4TysrKwNN2D6HaVV/ddEv0+5IbV06l1pvVX/GZjrr2ixlezTbsvfpecO1QcHZy0sVA6qqjbCDQCG/IbJtyUrJ94S4oOqAYP6+foCi3PNUMTOu7srHNXXX7tfTm4n3IBJtySTp7wU5YGqgYPDBgb6R0xM6o9ZWHDut7dnOe3gYH1YV/fAXjm5v3ulpVfBDZjzUF1q1apQFH+CwDYVlaStCgpv9pma5h0wNW3brqj4ZIuU1P9NkpK/tklJZcINgKpHAUBBpjVyctNXiIn9XyMu/nO1pOTfVUD2MjGxf2tERfevFRGRxGvAKiUl/sUSEkfnCwOjGYgXAPFCYeG/C0VETi0VETEGqcFrwGx5ec3poqJPpwoK/p8GxNNBtJDQ9jnCwupAaXCqxGcA40RRUeVeAYH93fz8r3r5+H528vP/6+bh2Q5kC0HVIAxYvHix6cKFC90XLVoUDKSjgHTykoULU+d1d5fPLi6eND0+fvNkb+8b/VZWz6dnZlaD1IL0wA0gHwv/BwBbWkygPmBScwAAAABJRU5ErkJggg==",
            command: function() {
                gBrowser.loadURI("javascript:(function(p){open('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3EForce%3C/a%3E%3Cscript%3Efunction%20i(n){return%20d.getElementById(n)}function%20z(){c+=0.2;if(c%3E=t){c=0;e.location=u;r++}x()}function%20x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22Reloads:%20%22+r;i(3).innerHTML=%22Time:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)}c=r=0;d=document;e=opener.top;u=prompt(%22URL%22,e.location.href);t=u?prompt(%22Seconds%22,60):0;setInterval(%22z()%22,200);if(!t){window.close()}%3C/script%3E%3C/body%3E')})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')");
            }
        },
        {
            name: '宽度匹配',
            subdir: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD8SURBVDhPY2BY+eY/RRirIBbMthq7ONEG7Hr+87/85neYcsgcwXVv/9vt+4AVv/359//L73//W+/9gNsA1wMf/xMCP/78+x9/8jP5BoDA3Hvf/zNhM0Bpy7v/NZe/YsWff//7/+ffv/9F57/A1YMxCgeKVbdiBtatT3/+ex36iCGOYYA3UNHrH39RxEAYawyAMDKn4uIXsDNBuBzIxoZ1tr/HNIB51Zv/yx/+gAYRfhB3AikGYAaAcPTxT/+/AaOIEMBpAAib7Hr//9HXP/9///33XwvoVGyYH5jYkPVgBKL4xrf/97/8hSKGF2MTZAWGCTZxrBirINH4zX8AwH/p/EUYAiwAAAAASUVORK5CYII=",
            command: function() {
                gBrowser.loadURI("javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();");
            }
        },
        {
            name: '垂直分屏浏览',
            subdir: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVDhPYwgoOPAfF4YBbHIwjNOAwEKEASA2NjUgPGrAqAEgPGoALQ0AYRjAJgfBB/4DAHQGrve5Z0DHAAAAAElFTkSuQmCC",
            command: function() {
                gBrowser.loadURI("javascript:document.write('%3CHTML%3E%3CHEAD%3E%3C/HEAD%3E%3CFRAMESET%20COLS=\'50%25,*\'%3E%3CFRAME%20SRC='%20+%20location.href%20+%20'%3E%3CFRAME%20SRC='%20+%20location.href%20+%20'%3E%3C/FRAMESET%3E%3C/HTML%3E')");
            }
        },
        {
            name: '水平分屏浏览',
            subdir: '辅助浏览',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAsSURBVDhPYwgoOPCfEjxqALUMCCwkD4MN+E8hoNwAir0AIijBowZQbMCB/wB0Bq73Wt/8jwAAAABJRU5ErkJggg==",
            command: function() {
                gBrowser.loadURI("javascript:document.write('%3CHTML%3E%3CHEAD%3E%3C/HEAD%3E%3CFRAMESET%20ROWS=\'50%25,*\'%3E%3CFRAME%20SRC='%20+%20location.href%20+%20'%3E%3CFRAME%20SRC='%20+%20location.href%20+%20'%3E%3C/FRAMESET%3E%3C/HTML%3E')");
            }
        },
        //其它功能
        {
            name: 'Chrome',
            subdir: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEySURBVDhPpVLLisJAENwvDF79DC+K/+DRozdfF0X0CzwJHlxYPCzmsoYlQQXRZVfjwia1qclM0tH4AAuK9PR0F12deXm1LDzDXIG3YhEftRq8bleRMXN5tVmBQkE1BL6PczDHO9bInlQguthPp7r8OlgjRRKBRaUC33V12W2oSaQA/f0dDnBbLSAMEQYB1qMRvE4Hn40G3kslrPp9rAaDmL1eshMlwCUR3/M5vmYz1Xx0HJUjGDMnwZ5EgCMZeO023GZTn1JwGglj40Lgd7OBU6/rU4qbAsaCwXo4vLQQeZfIWOBC5L+XSyQX5TKC00nfxm8is0RS2pD4sW3sJhN9imHGzwjkPaQw+qVcKL8GVx+SEaG6sbMdj3FcLlV8/ykL0h+XZFerqomx8XzOXIHHaeEf2QskUOU72J4AAAAASUVORK5CYII=",
            command: function() {
                var chrome_PATH = "D:\\Program Files\\Mychrome\\Mychrome.exe"; //本地路径，要自己设置
                var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
                file.initWithPath(chrome_PATH);
                if (!file.exists()) {
                    alert("File does not exist: " + chrome_PATH);
                    return;
                }
                var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
                try {
                    var args = [window.content.location.href];
                    process.init(file);
                    process.run(false, args, args.length);
                } catch(ex) {
                    alert("Failed to execute: " + chrome_PATH);
                }
            }
        },
        {
            name: '视频下载',
            subdir: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIWSURBVDhPtZJdSFNxGMb/ZVEX4WKViCPTRVBeeJFIjEDMUKadwMWW1cVIqSFCGRWISGRCV7Z0yxlG5lxGVGQw6AusO8PNYDvqhDIItRL6wHU82OXT+579iRaxvOmBHzw87/O+h8M54r+o2t0R8/iewdMzkoK8crwjJsf/kNVlauh7idDkIsLvlhCe0TBInjNHY2eObGUQHai/PQZ/PInL0UUDXywJzlZ2oMRlcg9F0BXX0D7+3aArpoEzx7kVHfCYjoYi8E7oaBvXDLyqDs7sp3xbZCuD6MChgVfojOs4H9VxekxHS0TDnu4XKHJeNMtWBtEB+8BrNI8msXv4K3bc+4KDT7/BdGkEPJOtdFU4W+crzwZRfuERrO3PketPoPbxZ2wfWjBgv7l7CnltT1B85i6K63uwtcT9Xq7TQ52tTmvznR/l/RNwDM+jLvwJ+x58REH/rEHZ/Q84TFntwznsvaFCHLu+LIqO2OW6lO1Exaam4LISSqAw8AaWwFtYemdSkOesZjABM3W4K7fStErYGsrMjbeWlOAktvmnkXt1yqCA/AHKeMYdo/uHOFhNrBWldfs3nuzTFXodq1dF4RUVNTdVcMYzo5Pqph3hYA2xntggdinV2e5rWmUgiqreKNhzZsxSHe7yzi/xtSxiHZFN5Il8myurqmWBYU+ZheDPyB3u/vU1eMBP4B8mn9gpYc8Zz35bFuIncO4bfNt9aWsAAAAASUVORK5CYII=",
            command: function() {
                gBrowser.loadURI("javascript:window.open('http://www.youtubexia.com/?url='%20+encodeURIComponent(document.location.href),'getA','toolbar=no,%20location=no,%20directories=no,%20status=no,%20menubar=no,%20scrollbars=yes,%20resizable=yes,%20copyhistory=yes,%20width=800,%20height=600');void(0);");
            }
        },
        {
            name: 'WOT 检测',
            subdir: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL0SURBVDhPrVJ9TE1xGH50U0KqWeFaxmQj/ogS95xbVzXfdfvQlxB9+Kots6xR02kpH5vS7bJhKVOUlEws2oipKTcz0xZjs7Gx0EZNpriP37ndxh/96dnO3vecvc/zvO97XrBkSgG/nvSX3RHBUldCQHKBVs17+pr8uvqq/Cyfqpep38eFSrZ+8T9nI30JYEvL+ftqzL4bQfNzI493yzzRbWBFbyIb32U2Vr1VJtmpo1CdbWTrPf76PUw1ZpRrGX4ODL8GxtwAo5tEXgcmNnqw2CILMaPWThcdnJpG1VEljz3qO0unMbYQ3CbIOx6A6U/ApFbQWDuZBx7MZeXrNd6jAmKEj4M9L1XnEXsH8SZRfB2Ut6LLfy2aA8JFni66qRJij0S86sakq/N6bQLD38w61THvgi/ZH8BNJ8HmV9qf6li2AjsCN2IwMAFcXypE7oNR1fO5zuTjDHXbLa0HmXVXQ3WcHS1g3HFsV/+OnWvDCiOMumhwRRoYWwtubvJgZKVvEj5/f1PU9uEY0zvEog6Au7vB7c/grihwtHacCFMUxQEGOPqtg6ckBHQpYMgRsZvbLoy+6FuEh28ails/KExpF85XhIAF3PkEy5V6ONXXx2nsDUBKQJAuBgNSKrgyB0y+48yYi4vf43R7rt/jfhMzOoXATbHtx/ix9ylyMtowFQoc/Hdhon4vPORMdErx+CnvBg2igy3NboyqWlxpUzd3plF54cq422DCLYzsseB7agf2RVyCj6EEPqGFqJFTMKBLhlXeD642T2Big7ftam2IrlhSVGhZREFiZD0YWqGxbqieMhJ73YmhpY6fpRzNkJSG31IWqC9wZFSNq3VTzcL3dvoogstm90dcnsqEZnF54gJDz2solblROuxCfaYgZoNSvgNXmd0ZX7fgr/u/CCmf80gqmcGVRa7U5TtRynWgPm8CZeEqHZ1MuWw6N5ydNz55DGEm7VJDubZBX+bVF2zyZLDJi3oRg07PHAo5M+uQvex/AfgDSpaKPlVGcgYAAAAASUVORK5CYII=",
            command: function() {
                gBrowser.loadURI("javascript:(function%28%29%7Bvar%20f%3Ddocument.getElementById%28%27wot-bookmarklet%27%29%3Bif%28f%29%7Bf.parentNode.removeChild%28f%29%3Breturn%3B%7Dvar%20l%3Dlocation.hostname%3Bif%28l%26%26l.length%29%7Bf%3Ddocument.createElement%28%27iframe%27%29%3Bif%28f%29%7Bf.setAttribute%28%27id%27%2C%27wot-bookmarklet%27%29%3Bf.setAttribute%28%27src%27%2C%27http%3A//www.mywot.com/bookmarklet/%27+encodeURIComponent%28location.hostname%29%29%3Bf.setAttribute%28%27frameborder%27%2C0%29%3Bf.setAttribute%28%27scrolling%27%2C%27no%27%29%3Bf.setAttribute%28%27style%27%2C%27position%3Afixed%3Btop%3A10px%3Bleft%3A10px%3B%27+%27width%3A135px%3Bheight%3A235px%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bz-index%3A10487575%3B%27%29%3Bif%28document.body%29%7Bdocument.body.appendChild%28f%29%3B%7D%7D%7D%7D)()");
            }
        },
        {
            name: 'EverNote',
            subdir: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOmSURBVDhPJZNbTNsFGMULiYrZ5KKTcckIcUNowSEQQXthQLfSwkqBAoUWeqGlpaUFWtoBA4GxAbES5hazTbMMcbhLlm1BhDGFjc1InGOGEVTAzUR98GW+GKOPP/+JD+f15HfO9x1R5HgsEWcSee6Tfbx8UcLr8zLeWVKz/6qc7KtS1PcqUC+XI7ul5I2bCpIv5fDStJjoqUwiJ+IQRZx9hegrGYhnFZR/U4N+sZaC4XxSiiWkqTIp8OcT+raD9sdOXGt2GldNKO4UI5lRsPNMGqLIyVTSZqUYVusxXDeg9iqRGrIRS7IolMqRFb2NplGFyl1CSVcR2lE15mUDB+6XEn0hC1Hspxkol1W4Vizke3LQd+spbpQhlxVQVqGmRl9Nnb6OmqpaqiqqKClSYjlnwrhWJ0ROR7TrUhrVq3oKR2VIZBLkZYXIlXJ0ZZU01Jmw2ey4XC5crU7sdgeG6nqcExZ8Gy5Sr7yJaPcNMebvzeTbcsnYm0GhTEZ5uZb6BhOuFjudne2EQkE6Otpxe9qwmK20hS30bHWQfj0HUdKNbFo3mqgdVJGblYtGo0Zfq8PusOLzB+jp72Gof5D3x0cZCQ/hsDvxjTXTt91BxpxAkDQjxrFpxH2+kbzcPMq1WhqMRjxuB0e6QwwPj3D8xDEufP4BU3MncbpaBQM7AwKBZCFXMPginaaNanoXWylQ5AlFVWK2WPF6vXQfCXFsYIhwOMzg8ACh3na8Hh9tJ+z0bXrIvLUfUfy8BN1qKeHtIFqrBoW0CH11FTZrM13BICNjQ/i7/PSE+gkGe2lpEQodtdK95SB9XowoZmEvJQ/l9D4xMbkxQvhiNz1jnXg73Zw6e5wnz+5zbek0H02P4w+0YzaaaD3VhP9nM3vnhTO+cDuZtx7k0bxRxsjvbq79NcbyP+e492yS1b8/48OZfnzvNvHwj8ucnDpKqUqNb8qE+2k9e+YEgsjbr5K6ko5m7QD2zSr6nlqZ+M3D1J9HufxrP1pjKQPnA8z/e5rAxzZkykICs2ZsWzqS5oRXFn0Vx4tfJ5H+KBPNupSmHzX4tmro+6WR935yoakupsKmRBcoRlqSzyGjnKCwiZr1Q+xeSBHGdDeOiJV4olYS2PPda2SvZXPwsRTdD0U0b1fSMm2grOUgpRYlhz0qnDMN1G0dRrEuI/bLRMFgJorIxR2Ilnb+rzuxRC3FE7eUQMzdBFIe7CNnLV9QATmPskleTiRGiL1jYRcRN5/nPyaxNBndGCsvAAAAAElFTkSuQmCC",
            command: function() {
                gBrowser.loadURI("javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();");
            }
        },
        {
            name: 'separator',
            subdir: '其它功能'
        },
        {
            name: '百度站内搜',
            subdir: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADdSURBVDhPY2BZd+s/JXiQGMAGxMfefPt//O23/0rb72FViAuDDai8/Po/DJx6+/3//ldfCeLqK68RBpx//wOqHQE+/Przf8Ltd//zL7z8v+Thx/+///4Di6efe/E//ewLsB6cBrz5+ee/xs77KE71P/b0/99///4fAXoVhPEaUHf1DYpmGN76/AtUxX/8BoQcf4qhGYS7b76FqiBgQD0OF2wj1gVvgWGguQs1DAKgYQADeA0AgY/AWJgEjIWCi6/+L32EiAUYQDEAFKcHgHFLCoYFNNgASvBAG3DrPwB3cwaYGdGkeAAAAABJRU5ErkJggg==",
            command: function() {
                gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u767E\u5EA6\u7AD9\u5185\u641C\u7D22:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.baidu.com/s?&ie=UTF-8&oe=UTF-8&cl=3&rn=100&wd=%20%20'+q+'%20%20%20site:%20'+Bar+'');window.open(qlocation);}%20void%200");
            }
        },
        {
            name: '360防复制',
            subdir: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABfSURBVDhPxZBdCgAgCIN766AdrYMWPiyGZL9GHwxS27BCyrHcyDcAcG/UF5kBM+DpBjA85zuoWwDgswU8ouEfAKsWLQVo2LO1QU9vNtDoOXvMAK71HLXI9wkn+h0QSwVxrKcf+mxZagAAAABJRU5ErkJggg==",
            command: "gBrowser.loadURI('javascript:document.body.oncopy=null;void(0);');"
        },
        {
            name: '短网址生成',
            subdir: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMjSURBVDhPfZJdSJtnFMcfO2GFpet0rWwOF6WzoSsMh984OtRMpduKIrVRQv2mqElk1phGrW0idG5mbZkI2xi7ECxZwOHslsS4DskMik5mLgZ+wFJtZ9fRzW1Xhcb31/d92pvdeODPc87hPP9z/ocj7HY7DoeD9vZ22trapN/V1YXVasXtduPxeKTf1NREZ2cnTqeTjo4OWa+9wufzEQgEqK+vx2Qy4ff7GR0dpbe3l1gsxvz8PKurq/T09NDd3c3CwgItLS00NDTQ2NiImJqaIhwOU1lZSUVFBbOzs4yMjNDf38/y8jIFBQUyNzk5SXNzM2tra9TU1FBVVUV1dTXC6/USCoUoLi4mPz9fTjM0NCTH04o1SUtLS/T19VFXV8fKygrl5eWUlJRgNBoR4+Pjkj0rKwuDwcDExAQulwuz2czGxgZzc3NEo1EyMjKkRI2ssLCQ7OxscnJyEIODgywuLqLX69HpdEQiEbmw2tpagsEgycnJatcoFouFoqIiWZuWlkZKSgrp6emIl1JTCU6HCM38gNfrU5e2QPKLh+S4/qCfhH0CU+0Zfl5eotRYyvr6ulrnZWxsjNzcXIRq6J7dx8myYk69W0bSwf1akhd0B0g9pFf9BBXPYHj1GAefe15K0STk5eWRmJiIMJzuIvM9C68Umnn5TRNH8hpJe72VNyre4aQtkzLbMU7YMtCbkzCefR/zGTOZRzPlzmxWG+Ktz2K8fXWD0su/UvLBLxScjfBa0U+UX7zOlU0jjugJTs8d4fjNw7h/HOHBnQecazvHtaufoJno/zzMwOgsA9dvcXF4BudgkPOOABeu+PB86+LDr50M3LDT8dV5rnlvEPguTIN6QJfcHnUv64jNvx4h8XeczZ04W//EufPfLls7CrH7cPtP+E3Fzr+gPILY7S2a1Uv85maQhw/jiKSP4X/46Ck0f1jhsEfhgGuXC7fU3yhs37svCUIzM08kiAGFPXFZRbeC5fs4iqKwdXdbEgTV69ViIS6pLHsgwaW+drD6d2XHu7/fo6W1VRJoJrK/gL2Q/yUc/xSGI08Jtv+gVZMwPa1G8BiWoY1GuX/zcQAAAABJRU5ErkJggg==",
            command: function() {
                gBrowser.loadURI("javascript:function%20iprl5(){var%20d=document,z=d.createElement('scr'+'ipt'),b=d.body,l=d.location;try{if(!b)throw(0);if%20(!l)%20{alert('%E8%AF%B7%E8%BE%93%E5%85%A5%E7%BD%91%E5%9D%80%EF%BC%81');return;}d.title='(Shortening...)%20'+d.title;z.setAttribute('src','http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl='+encodeURIComponent(l));b.appendChild(z);}catch(e){alert('%E8%AF%B7%E7%AD%89%E5%BE%85%E7%BD%91%E9%A1%B5%E5%8A%A0%E8%BD%BD%E5%AE%8C%E6%AF%95%EF%BC%81');}}iprl5();void(0)");
            }
        },
        {
            name: '网址 IP 查询',
            subdir: '其它功能',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAnSURBVDhPY/i4guE/JXiQGwAD2ORgeNSAQW8AMXi4e4EYTKEBDP8B7O2xJ6wE86MAAAAASUVORK5CYII=",
            command: function() {
                gBrowser.loadURI("javascript:document.body.innerHTML%20+=%20'<div%20style=%22background-color:#e0e0e0;%20border:3px%20outset%20black\;width:504px\;position:fixed\;Z-index:999\;%20top:20px\;%20right:20px\;%22%20onDblClick=%22this.style.display=\'none\'\;%22><center>\u5f53\u524d\u9875\u9762\u0049\u0050\u67e5\u8be2\u3000\u002d\u3000\u53cc\u51fb\u6b64\u5904\u5173\u95ed\u6b64\u7a97\u53e3<\/center><iframe%20width=%22500%22%20height=%2240%22%20src=%22http:\/\/www.ip.cn\/getip.php?action=queryip&ip_url='+location.host+'%22><\/iframe><\/div>';%20void(0);");
            }
        }]
    },

    subdirPopupHash: [],
    subdirMenuHash: [],
    _externalFuncPopup: null,
    _isready: false,
    unescapeHTML: function(input) {
        return input.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&apos;/g, '\'').replace(/([^\\])\\([^\\])/g, '$1\\\\$2');
    },
    init: function() {

        var ExternalFuncBtn = document.createElement('toolbarbutton');
        ExternalFuncBtn.id = "assistantTools";
        ExternalFuncBtn.setAttribute("label", "辅助工具");
        ExternalFuncBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
        //ExternalFuncBtn.setAttribute("tooltiptext", "辅助工具菜单");
        ExternalFuncBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
        ExternalFuncBtn.setAttribute("type", "menu");
        ExternalFuncBtn.setAttribute("removable", "true");
        ExternalFuncBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALySURBVDhPpdBbSJNxGAbwryipyC6CIBIlKTp5SjppdECDCs0181i22lBLt5a6TTenY9MdXN/m3GduztPYnJodTMQKScvKiR1JaGokBYaXdRvkvv2fzCiIiqAunpv3gR8PL2VOTMX/ZAHw+Xz/lL8CNK0faHQ3Ot283BO/638A7UGRI8Nr4jDGESqay+VMnb020NBoRbnkIuxWGg9v9WDmyb13PX3dut8CpqgED71i/dvbi7fgbnA0bHw+DDo1OyOKZt+ok1lXS0Pg2fgYHrvMuE5XZPwCfD/UUGEBNxU251y7MVBccgGvJbvJLM0lvd3tZPDB8OcpA8//wXH8yh8BS3KOkQlej0t74/z5JULCTToCxcVC6DUVhKnVs1admvQZhKN/BL5GLM5n5aoy9hiXG4iO2ESSEuPAT0+GIOuYn3P4IEo1muFfAFvCiRFLcNR7a8ieR9mZKZ+k8hKilGaSgoIsIpFLUUPrYGFMc+r5JcI8gekngA7dBWZ5BMbCj2IiaCeM62JRqJDg1f3LeDZA46l3CIN3ruFqp5N0us2k0yKY9Sbm+G5yz5UuAPmhW/3OpdvYyVRRwBeTzV5bHUfiDx0g7a4mMjU+SiaeD2N6fAQzE2OYfjmKyRf9GL3hgXdzCh5tSOqg6pZFkt6gGHKP2kaGFkVBFbqTJHCOQCIRo9ZsgKLGAKXNAXWDjVQ1OojW3hJw3b7BupQqdiI86dsP+lfGEi8VSRyrtoMTv4+czD0NZUUpqjTlyFNW4Ey1EWe1lyDQm5GrpYnd0wZGIiPKJSF+yuSsR2FmJtQR+3E8agdO5/HQcNmMJocVXR2tYOpqoCwvgVQiml8lgkatgGO+U5QW4wyXA8pkrIZMIfuYyj81eTQ9BTKZOOB22tDWasPQQC/6+7rh8bSAqTdBZ9BAq1ejUiVHgfg86u0WUClpHBQViSzCgnOmvHw+eIKcubSsNFRpK3Gn/zp6ezrn04WO9mYwViOqtSpIy4qRmsGFVluJL5fyhkpu7HjSAAAAAElFTkSuQmCC)"; //机器人
        //ExternalFuncBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJHSURBVDhPY4CB////87x8+VLl8ePHeiD8/PlzBZB4fX09E1gBPgDUzAxU6CIjI7NXT0/vnY6OzlNtbe1VCxcutAcZDFWGG9y/f5+jt7c3sKioaL+Hh8cjLy+vV46Ojl/V1NTuLF261AxoCAtUKSZYtWoVM4j+9++f0NmzZzV37txZmJycfDksLOyls7PzO19f34Vv3rzhAyvGBn78+KHR1dWVCjSI58qVK2wvXrwQj4mJ2RweHv4pODj4ZXR09KWnT59yQZVjggcPHhhJSko+8fb2ngc0yC0kJKTJ3t7+UWxs7HMg+3VaWtpxoBc4oMoxwYcPH5QjIyP3mpiY/FJXV79pYWHxGqjxbXx8/OOoqKhXwPA4tW7dOuVjx45xQrWgAlAAnTp1Khzo1ztAxZ+CgoJeA/3/Aqj5BdAVT93d3d8aGhruXrFihT7Ii1BtqODTp0+ily9fjq2qqtqYn59/vbi4+GxiYuKl0NDQl0CDnoJiREVF5fCiRYus9u/fjz1GgImIBxiAekBs+ezZM5OrV68GJCQknAQa8gYYkA+BLvmmpKR0duLEiW54oxUGzpw5wwV0FTAywi8C8Rugdx4AvflVVlb2an9/fxAw2nmhShEAaDIjDIP4R44c4QWGTxIwTK4CAxrkkvvAMPogLS197/bt20ZgTYQAyJA9e/Zk+/n53Y6Li3sOxI9sbGzeAPOLOVQJXgB2CdBFguvXry8DxtIjHx+fJ1OnTm0GikmAVRABwIYA/Sz95MmTeCBOArKVwTKUAwYGAIupKaEX0N6mAAAAAElFTkSuQmCC)"; //扳手图标
        var ExternalFuncPopup = document.createElement('menupopup');
        ExternalFuncPopup.setAttribute('onpopupshowing', 'event.stopPropagation();gExternalFuncButtonM.onpopupshowing();');
        ExternalFuncPopup.setAttribute('position', 'after_end');
		this._externalFuncPopup = ExternalFuncPopup;
        ExternalFuncBtn.appendChild(ExternalFuncPopup);
        setTimeout(function() { //延时加载菜单，不对启动造成影响，也不影响第一次打开菜单时的响应速度
            gExternalFuncButtonM.loadSubMenu();
        },
        3000);

        if (this.moveablePositonOrInsertafter) {
            var navigator = document.getElementById("navigator-toolbox");
            if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
            navigator.palette.appendChild(ExternalFuncBtn);
            this.updateToolbar();
        } else {
            document.getElementById(this.insertafter).appendChild(ExternalFuncBtn);
        }
    },
    loadSubMenu: function() {
        if (this._isready) return;
        if (this._externalFuncPopup === null) return;
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

        for (var j = 0; j < this.toolbar.configs.length; j++) {
            var configItems;
            if (this.toolbar.configs[j].name == 'separator') {
                configItems = document.createElement('menuseparator');
            } else {
                configItems = ExternalFuncPopup.appendChild(document.createElement('menuitem'));
                configItems.setAttribute('class', 'menuitem-iconic');
                configItems.setAttribute('label', this.toolbar.configs[j].name);
                configItems.setAttribute('image', this.toolbar.configs[j].image);
                if (typeof this.toolbar.configs[j].command == 'function') {
                    configItems.setAttribute('oncommand', this.unescapeHTML(this.toolbar.configs[j].command.toSource()) + '.call(this, event);');
                } else {
                    configItems.setAttribute('oncommand', this.toolbar.configs[j].command);
                }
                configItems.setAttribute('tooltiptext', this.toolbar.configs[j].name);
            }
            if (this.toolbar.configs[j].subdir && gExternalFuncButtonM.subdirPopupHash[this.toolbar.configs[j].subdir]) gExternalFuncButtonM.subdirPopupHash[this.toolbar.configs[j].subdir].appendChild(configItems);
            else ExternalFuncPopup.appendChild(configItems);
        }

        if (this.autohideEmptySubDirs) {
            for (let[name, popup] in Iterator(gExternalFuncButtonM.subdirPopupHash)) {
                if (popup.hasChildNodes()) {
                    continue;
                } else {
                    gExternalFuncButtonM.subdirMenuHash[name].setAttribute("hidden", "true");
                }
            }
        }

        if (this.moveSubDirstoBottom) {
            var k = ExternalFuncPopup.childNodes.length;
            while (ExternalFuncPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && k--!==0) {
                ExternalFuncPopup.appendChild(ExternalFuncPopup.firstChild);
            }
        }
        this._isready = true;
    },
    onpopupshowing: function() {
        if (!this._isready) this.loadSubMenu();
    },
    updateToolbar: function() {
        let toolbars = Array.slice(document.querySelectorAll('#navigator-toolbox > toolbar'));
        toolbars.forEach(function(toolbar) {
            var currentset = toolbar.getAttribute("currentset");
            if (currentset.split(",").indexOf("assistantTools") < 0) return;
            toolbar.currentSet = currentset;
            try {
                BrowserToolboxCustomizeDone(true);
            } catch(ex) {}
        });
    }
};

gExternalFuncButtonM.init();