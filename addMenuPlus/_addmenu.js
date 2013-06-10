// ===================== 橙色按钮菜单 ======================
css('    /*=====橙色菜单定制=========*/\
            #appmenu_newTab,\
            #appmenu_newPrivateWindow,\
            #appmenuPrimaryPane > hbox,\
            #appmenu_find,\
            #appmenu_find+menuseparator,\
            #appmenu_savePage,\
            #appmenu_sendLink,\
            #appmenu_print,\
            #tiletabs-appmenu+menuseparator,\
            #tiletabs-appmenu,\
            #appmenu_webDeveloper+menuseparator,\
            #appmenu_fullScreen,\
            #sync-setup-appmenu,\
            #sync-syncnowitem-appmenu,\
            #appmenu-quit,\
            #appmenuSecondaryPane{display: none !important;}');
app([{
            label : "重启浏览器",
            oncommand : "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
            insertBefore : "appmenu_newPrivateWindow",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKlSURBVDhPdZNLTBNhFIVngTuVmAgbF67cqLsmmPhqYkTRGImhhQCKtBKr8rJgabXSDoW2zLRT2tLH0DLAQLEQglJJfCQYYqIEiQutcUECCAt3rgppeCi/c8osLMGbnOTmnvPNvTNNqb1KcVGdW3ijSnW98m4ThB4z2f5/nS1S5ZVqGsMPjPaNViZEaA+f6vAJf1rZMMGsTPuQR0aOZ9flkqoTumZ6xRkQCReJk65I/Ovs5y8XHD5hiQ3FNrt6Rwk8ZJCVsZ1SXis/fN9gW3H3PCNeYZQwwb6Z7e3tfHjpdPro8vLPMwMjCYEJDa4jg2zWJbdrTSIbGiJeaQs24WS1psGvUCj2FVfci11RVVdMT0/nTLx5p5GuWEcWTAbGdqPdu+WJxsm/orkeUqN/+qGVDf5+7PCTUm3DuFJpzfFGY11uPkbAgKW09aZbDn8f4aTTdgub3Pxwpre6eKKurtdOTc0cobnoJhiwlO4RbZbejXR2iylPREw6A0LaJW3YLTY8ROpM7c9xtZnp/gEGLFXbYjMzQZE8cfgXUqlUHu0KTrGSuZeMNu4VHmC0cgtgwFLNls47dp9AWmyejYKiyoMWxt9s9/VJv4SYJczgKZXq/ciCAUsND08eM3cGttqkj1Zeozckk8lDTl90tsPbS5zd/RllemkGr7ym0UC7eQIGLC6iOjx8AqE6ky1dWHLz1Orqar44OsF4ePETNDDygsXskqqqABlk27nwywyMGp98e9LCBH7ZpCt0Tda1q2qN/rh0KiEkF0KPmU5vWUMGWTAyvlNjidfFMNo4nhja3KS61rRepqn/BqHHDB4yyMpYdn2cmzvtDgrvzU7/ltUVIlZWltRjBg8ZOb53Sf+BA/OLi+f64+PtkcGxQQj99/ml8/DkmFwU9RcBXOUTTWNTuwAAAABJRU5ErkJggg=="
        }, {
            label : "打开隐私窗口",
            oncommand : "OpenBrowserWindow({private: true});",
            insertBefore : "appmenu_newPrivateWindow",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIrSURBVDhP7ZDLTxNRGMUnJCZG1ya6c60L/xmXKDEaFsZIQBNAoLevoUMf03mVwrTzno7T0lLoYHBBCSomRhYkrowbY0xYsgIRaecwHUcT49qdv+Qk93z3Ozc3h/onjI4uXxh+Yl6ObOA7lwazyP4JWVhMR0dq5Gnj6iRj7tOS6TMlC0zJ7Gcko0cLlk+LtV6mtLrPLu1dG+wSgqEkZ+9RCUFHslQ/TRSNk3SwmJddcOoK2GodRaUByfbAa63AN5CtNJHi7H6Ss45I0fyREQ1QSV7rZ9U1FPU1cGYHnLUBee0NKs0unM13aO18AKusYL7sIiG5yOke8sYGBHcLtGD4VIrXzwbhlGgiVlB78aJ6NJtb9uclM/wBW3GDRQ2T84v+NCMfTiSkszlWBV/vgub1HjW7oB2IzktMZ/WDsIgAQshQLFf9rm68B29vYoaRT6KrkFhBO85p65jJal/DQVZZRaLcACN7n1mt64nGtpPkrWNp5RUKahsJoXaUFj1njm17E7nal7jkICbWwEj67fABkiuDVVvILDqB7Egm8vLzQG7o6eAuXnJAllpBDx2MJyuHYfgXhLO+Ce42yo2tQF1kyg6UzltU13fBaB6k5g6K1gswShtjtHw6/Ei5FUV/Un/96QrJt3fjBdWnJRtpwRiU1A9K7qcEE3TJxrNs1R+Pyx9HxrTrUexvaH7rxmSqOTVB3AeEaBdHAt0bV+7febw8dfehfDNa+89vKOocv0Vm+0fY7LgAAAAASUVORK5CYII="
        }, {
            label : "选项设置",
            oncommand : "openPreferences();",
            insertBefore : "appmenu_find",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI/SURBVDhPhVDda1JxGP7BuokYXXTZVXfd1u5GEEVQrBQWySKpLVltMafN1LJyfiybHj1D5/Fsx50znelxs5BidNFV3fgfRN3sSgTrSkYSw8i385wdMWjVCw8+7/Nxfi+yf83ImG0CMNb/z9AFy9HRmzOiaWzyCnbPQvInAA4NHjLYDxy7N3Q5yGfpvp/7enXinimynCMAHFowIZHjUXjEiPdneNg8ePaS5Uy9Xj8cy+Q/JySVEF5a29QBDo0T85+QQRYdo86Ydcolufwc2RyPa0+j4l5S3qKDAA8ZZK3TbsmoMyYoxbmooOxyKy+Iz6raq2XtxRItCvk9ABwaPGSQFRR1zqgzVqlUBkRFnYllCsRrp8ZXipRcK71ut9unWq3WaXBo8JBJy+osOnrZZJ0etzmfkCsQp5hYoPhqkQK82G40Gsf0gDbg0OAhgyw66LIH/qg9xEv0fHld+5MKOnzh1HeLxbL/gjbg0Ho+suigy7rd7mCn0xnKlaqeSErRTtzQzCxdu+3gtS4+MgAODR4yivrKiw66+gsXR2+Z77rmv8BcTOd0+CIpGp/1fgPAezoyU1oWHb2MsT8MFwOcqJ0m74T41R84EUAY6O37nryDLDpGnbH3tdrJcvWtUzvpuC+S/PgsKdPCUpbw+zuHh0y5uu1Ex6j3x3zjzjlPMEH+qLCrvtwOzccyBIBDg2e6PnneiP85W2/eneDS8ofMetGN3R2IdwFwaPCQwf7XaTabR4joELi0sSkA4NDggfeHsV+P37vG6ED+0QAAAABJRU5ErkJggg=="
        }, {
            label : "附加组件",
            oncommand : "BrowserOpenAddonsMgr();",
            insertBefore : "appmenu_find",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ0SURBVDhPjVFLbBJRFB23ummauHBhYjTRtRKNmpoajS2aRtpC1NCWWoKgdLDUUhlKy8Aw/JlCKZ+ZQikw1Eqpn5LoxpV7E+PCuNGVMSZuaGLS4obre5NpICSanuRkXs5958657xKduNin6R64Z5i8dUdv7u1VdcnywTHxeO49E8sB5n3S8VKWDw53NPNxKV+F+OomMFF+S5YPjlR+425UWIdQWoRcsXJJlv8NpXrsrHrMLAyPkxGNjmQfzno+Rfl1iPBlMM24v2jGSQ7VgmodKSjV+j7Z1oJphjZ74znwL69JxMbF7IZEfA7IOhPLwhOXf0S2tWC2e+cjmTJwwrP/0reUBzsduSbbWrDM+R3hjCj9LZQuwf65k75EHiYslPXGoO4mGuuNatRUUAwMHCYyWfGqh+N/LvKlD5uv31IJQawFkwUI42ZtDKWKQLFxmPVwwKKRF0Ip0BqsRgIADjWbzVM7OzvdOJEnkjrvjgqSoZPSeyTWIJgsSl+zzUMRV/qHjg2Omt6ptCbxcv/tM9oH0w4PJ0iX2+lbWoWYUCqUK9usl0t/Zzj+W2HzlYIYNdlsLhQHRyIpFmZcYfBy/A86kvmFo/rR7JiucBroYLwHJ0Y8sbu7e1x6RLRGF4tW5EOXMV3B5Oe9vb2TjUbjNB1Kfd3Xnf4EkE/pC5KpHY9stI1BkXETTKvT/7tHqTnaPzRybno+9Gdfnw8sg9FCKWVbCxY7o6dRPO/iCuBGlDcGxinHsNHqmHQGEpKGawvBJBim5nSyrYV0tqDIFCq1nFitrZSqpXK1ZkNbOVKv17vK1W17trRVyYkvUK3yPJrMXZdtMgjiL/o0qQAqtCMRAAAAAElFTkSuQmCC"
        }, {
            label : '书签管理',
            oncommand : "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
            insertBefore : "appmenu_find",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHoSURBVDhPY8AHnAMiLZ0C4sygXNKAh4cHe25l69PsipbHWlqhbFBh4kF0emlWx9RF/0E4Or0kHSpMHDA2NmYtqOl8OGHuyv8gXFDded/e3p4FKk0YRKWXpLZNmv9/whygAUDcCmRHphUnQqVRgZWVH697UHxCYFxmT3hKwfa43PIHFa0T//fOWva/b/ZyMAaxy1sm/E/IrrwfnpK/HaTWFahHyz6UhyE6raiosnXS/9aJ8/53TFn4v3v6kv+9M5dhxSA5kBqQWpCe6PSifIZTpy7Ltk+ed61r+uL/3TOWEIVBatsnzr1y/vx5abA3jp89q9k2ac6dzqkL/3dNW4QXg9S0TZxz6+SFC2pgzTBw+PAJ/Za+2Q9BTgQpwoZBci39sx4cPXVBB6oNFTT3Tk1u7p/9v33yfKwYJNfWNyMeqhwTpBZUlzT3zfrfNmkeVgySS82rLIQqxwRpRbUzWoC2tE6YA8YtUAznA+XSimomQ5VjguyypiMgRc39s/7Xdk392zN13rGeafNP1HZO+QcSA8kB1RyAKscEeZWtT+o6pwKjaNbFjdv3JPz//58fiAU2bNud1Dph1qW6rqn/cyuaH0KVY4Jp85a1rNy4NefTp0+iUCE4+Pfvn+iq9dtyZ8xb1ggVAgIGBgDd8HTEqKvnWQAAAABJRU5ErkJggg=="
        }, {
            label : '脚本管理',
            exec : "\\Chrome",
            insertBefore : "appmenu_find",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABTSURBVDhPzYzBCcAwDMS8fgbIAJ00hXAFw1kP0zwiuI+QHUcY81nfpDbkDQrJGxSSNygkb1BI3shhZzq/4QHRiivuelBNGVMd5SljqqM8ZX+IeAGxoR/+53UAlAAAAABJRU5ErkJggg=="
        }
    ]);
//创建子菜单
var configssub = AppMenu({
        label : "本地文件",
        insertBefore : "appmenu_webDeveloper",
        image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABvSURBVDhPzZMxDoBACAR5v35AW/2C/9Ms2QIvC5ydk0zDQKLF2T9YtuNa9/OOYsbcMx5HuVKjDjtfX6gWZuR5/wtqDv0YqAiZnbKXMZDupEEg9+IwyuyUXUXI7JRdRcjslF3FGXmu30Lnp7eSY/YAKguIXvpmB7QAAAAASUVORK5CYII="
    });
configssub([{
            label : 'userChrome.css',
            image : "a",
            exec : '\\chrome\\userChrome.css'
        }, {
            label : 'userContent.css',
            image : "a",
            exec : '\\chrome\\userContent.css'
        }, {
            label : '编辑 prefs.js',
            image : "a",
            exec : '\\prefs.js'
        }, {
            label : '编辑 user.js',
            image : "a",
            exec : '\\user.js'
        }, {},
        //下面四个子菜单项为本地批处理，可换为任意本地程序或路径
        {
            label : '更新奶牛规则.bat',
            image : "a",
            exec : '\\chrome\\Batch\\ADMuncher.bat'
        }, {
            label : '更新油猴脚本.bat',
            image : "a",
            exec : '\\chrome\\Batch\\UpdataUserJs.bat'
        }, {
            label : '同步UC脚本.bat',
            image : "a",
            exec : '\\chrome\\Batch\\SyncChrome.bat'
        }, {
            label : '备份本地配置.bat',
            image : "a",
            exec : '\\chrome\\Batch\\BackupProfiles.bat'
        }
    ]);
var addFuncsub = AppMenu({
        label : "辅助功能",
        insertBefore : "appmenu_webDeveloper",
        image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ0SURBVDhPjVFLbBJRFB23ummauHBhYjTRtRKNmpoajS2aRtpC1NCWWoKgdLDUUhlKy8Aw/JlCKZ+ZQikw1Eqpn5LoxpV7E+PCuNGVMSZuaGLS4obre5NpICSanuRkXs5958657xKduNin6R64Z5i8dUdv7u1VdcnywTHxeO49E8sB5n3S8VKWDw53NPNxKV+F+OomMFF+S5YPjlR+425UWIdQWoRcsXJJlv8NpXrsrHrMLAyPkxGNjmQfzno+Rfl1iPBlMM24v2jGSQ7VgmodKSjV+j7Z1oJphjZ74znwL69JxMbF7IZEfA7IOhPLwhOXf0S2tWC2e+cjmTJwwrP/0reUBzsduSbbWrDM+R3hjCj9LZQuwf65k75EHiYslPXGoO4mGuuNatRUUAwMHCYyWfGqh+N/LvKlD5uv31IJQawFkwUI42ZtDKWKQLFxmPVwwKKRF0Ip0BqsRgIADjWbzVM7OzvdOJEnkjrvjgqSoZPSeyTWIJgsSl+zzUMRV/qHjg2Omt6ptCbxcv/tM9oH0w4PJ0iX2+lbWoWYUCqUK9usl0t/Zzj+W2HzlYIYNdlsLhQHRyIpFmZcYfBy/A86kvmFo/rR7JiucBroYLwHJ0Y8sbu7e1x6RLRGF4tW5EOXMV3B5Oe9vb2TjUbjNB1Kfd3Xnf4EkE/pC5KpHY9stI1BkXETTKvT/7tHqTnaPzRybno+9Gdfnw8sg9FCKWVbCxY7o6dRPO/iCuBGlDcGxinHsNHqmHQGEpKGawvBJBim5nSyrYV0tqDIFCq1nFitrZSqpXK1ZkNbOVKv17vK1W17trRVyYkvUK3yPJrMXZdtMgjiL/o0qQAqtCMRAAAAAElFTkSuQmCC"
    });
addFuncsub([{
            label : 'about:config',
            image : "a",
            url : "about:config"
        }, {
            label : '打开文件...',
            command : "BrowserOpenFileWindow();"
        }, {
            label : '网页另存为...',
            command : "saveDocument(window.content.document);"
        }, {}, {
            label : '清理浏览痕迹',
            command : "Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);"
        }, {
            label : '安全模式重启',
            command : "safeModeRestart();"
        }, {
            label : "重新加载配置",
            oncommand : "setTimeout(function(){ addMenu.rebuild(true); }, 10);"
        }
    ]);
//===================== 标签右键菜单 ======================
tab([{
            label : "复制 Favicon 的 URL",
            text : "%FAVICON%"
        }, {
            label : "复制 Favicon 的 base64",
            text : "%FAVICON_BASE64%"
        }
    ]);
// ===================== 页面右键菜单 ======================
page([{
            label : "复制链接文本",
            text : "%LINK_TEXT%",
            condition : "link",
            insertBefore : "context-copylink"
        }, {
            label : "复制链接文本+URL",
            text : "%LINK_TEXT%\n%URL%",
            condition : "link",
            insertBefore : "context-copylink"
        }, {
            label : "复制网页标题+URL",
            text : "%TITLES%\n%URL%",
            insertAfter : "xThunderDownloadAll"
        }, {
            label : "打开图像rar",
            position : 1,
            condition : 'image',
            oncommand : function () {
                var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
                try {
                    var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
                    file.initWithPath(path);
                } catch (e) {
                    var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
                }
                file.initWithPath(path);
                Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
                setTimeout(function () {
                    file.launch();
                },
                    100);
            }
        }, {
            label : '复制图像base64',
            text : "%IMAGE_BASE64%",
            insertAfter : "context-copyimage",
            condition : "image"
        }
        
    ]);
//打开链接
var openlinksub = PageMenu({
        label : "链接在...",
        condition : "link",
        insertBefore : "context-savelink"
    });
openlinksub([{
            label : "新标签页打开",
            oncommand : "gContextMenu.openLinkInTab();",
            image : "chrome://browser/skin/tabbrowser/newtab.png"
        }, {
            label : "隐私窗口打开",
            oncommand : "gContextMenu.openLinkInPrivateWindow();",
            image : "chrome://browser/skin/Privacy-16.png"
        }, {
            label : "IE 中打开",
            text : "%l",
            exec : "C:\\Program Files\\Internet Explorer\\iexplore.exe"
        }, {
            label : "快照中打开",
            url : "http://webcache.googleusercontent.com/search?q=cache:%l"
        }, {
            label : "侧边栏打开",
            condition : "noselect nomedia noinput nomailto",
            oncommand : function () {
                var title = gContextMenu.onLink ? gContextMenu.linkText() : gContextMenu.target.ownerDocument.title;
                var url = gContextMenu.linkURL || gContextMenu.target.ownerDocument.location.href;
                openWebPanel(title, url);
            },
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG2SURBVDhPYwirOPifEgw2ILr2GBAfJwlH1R55BDeAHBxYvus5iAYbEFi8i2Tsn78dYYBv3hYU7F+w5X9J76H/SfW74WJ++Vv+x1Tt+B9ethXM98ldjzDAI3MtHHtlrf1fM+nQ/ycvP/0/cfHJ/6Ta7f8jSjf/71148n/vguP/A/LXgdW5pixDGOCcvAyMXVKW/c9v3/n/3NUn/6/fefH/69cf/y9cf/b/1KXH/zfsufo/OH81XK1z0hKEAfZx88E4unT1/+nLjv7Pa974PyR/2f91Oy78f/vu4/8dh679D8pdBlcHwlZRsxAGWEXM+G8TNeN/YPaC/84Js8F8EPZMmfu/bdpOoPhCuBgMW4ZPQxhgGjwJiCdCMYiNwGYh2MUN/fsRBhj4dZOM9X1bEQZoezT+0/Fs+U8K1nKvvwc3QMmueLGqXfFmNduKOxoudf9BWMW58reaQ8U5kLiqfekmZKxiV7Je2TonB26AjIwFp6CgMb+SVd4UFfuK/wpWJZ8VLXJnSWsGqYqK2vOgY3FxPW4GBnsWuAEMEMAsZ57TL2+R80zGJKWUT8ZNCCqOE8ANIB8f/A8A6TwzNR33LdQAAAAASUVORK5CYII="
        }, {
            label : "GDocs 中打开",
            url : "http://docs.google.com/viewer?url=%l",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADrSURBVDhPnZO9CsIwFEb7cLY11fcxf66Ckz6FiIubiOKg0tzEQXFwVRCdfAARFU2kCvWKLf3gQIab890U6vksnpdYvCtETc08dwgYPApRi7cfAeF6GXHdJtK0/uFmQgErJIikHng5QwQMkSAQ+kCEmuWhzOGIBBVpOklBZuy2XbwBUyci9DoPbhYJnDUpyExFQg8JQqr2IVOTXNhZJCgLPUoKMkOkHiOBfZuJBDQyqUODcFggQcDVJilA8am6v2a+SX3Euun/aqxK0/QZ3NBlR2oDCteQwvkb235BF9+kBEV4Cewv6Q6FoDB9ApgI8l6APDOdAAAAAElFTkSuQmCC"
        }
    ]);
//当前页面
var openpageinsub = PageMenu({
        label : "当前页面在...",
        condition : "nolink",
        insertBefore : "context-savelink"
    });
openpageinsub([{
            label : "IE 中打开",
            text : "%u",
            exec : "C:\\Program Files\\Internet Explorer\\iexplore.exe",
            condition : "nolink"
        }, {
            label : "快照中打开",
            url : "http://webcache.googleusercontent.com/search?q=cache:%u",
            condition : "nolink"
        }, {
            label : "侧边栏打开",
            condition : "noselect nolink nomedia noinput nomailto",
            oncommand : function () {
                openWebPanel(content.document.title, content.location);
            },
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG2SURBVDhPYwirOPifEgw2ILr2GBAfJwlH1R55BDeAHBxYvus5iAYbEFi8i2Tsn78dYYBv3hYU7F+w5X9J76H/SfW74WJ++Vv+x1Tt+B9ethXM98ldjzDAI3MtHHtlrf1fM+nQ/ycvP/0/cfHJ/6Ta7f8jSjf/71148n/vguP/A/LXgdW5pixDGOCcvAyMXVKW/c9v3/n/3NUn/6/fefH/69cf/y9cf/b/1KXH/zfsufo/OH81XK1z0hKEAfZx88E4unT1/+nLjv7Pa974PyR/2f91Oy78f/vu4/8dh679D8pdBlcHwlZRsxAGWEXM+G8TNeN/YPaC/84Js8F8EPZMmfu/bdpOoPhCuBgMW4ZPQxhgGjwJiCdCMYiNwGYh2MUN/fsRBhj4dZOM9X1bEQZoezT+0/Fs+U8K1nKvvwc3QMmueLGqXfFmNduKOxoudf9BWMW58reaQ8U5kLiqfekmZKxiV7Je2TonB26AjIwFp6CgMb+SVd4UFfuK/wpWJZ8VLXJnSWsGqYqK2vOgY3FxPW4GBnsWuAEMEMAsZ57TL2+R80zGJKWUT8ZNCCqOE8ANIB8f/A8A6TwzNR33LdQAAAAASUVORK5CYII="
        },
		{
            label : "GDocs 中打开",
            condition : "nolink",
            url : "http://docs.google.com/viewer?url=%u",
            image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADrSURBVDhPnZO9CsIwFEb7cLY11fcxf66Ckz6FiIubiOKg0tzEQXFwVRCdfAARFU2kCvWKLf3gQIab890U6vksnpdYvCtETc08dwgYPApRi7cfAeF6GXHdJtK0/uFmQgErJIikHng5QwQMkSAQ+kCEmuWhzOGIBBVpOklBZuy2XbwBUyci9DoPbhYJnDUpyExFQg8JQqr2IVOTXNhZJCgLPUoKMkOkHiOBfZuJBDQyqUODcFggQcDVJilA8am6v2a+SX3Euun/aqxK0/QZ3NBlR2oDCteQwvkb235BF9+kBEV4Cewv6Q6FoDB9ApgI8l6APDOdAAAAAElFTkSuQmCC"
        }
    ]);
