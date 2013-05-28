// ==UserScript==
// @name                  MyMenu.uc.js
// @namespace             MyMenu@gmail.com
// @description           菜单按钮
// @author                defpt
// @charset               UTF-8
// @compatibility         Firefox 20+
// @version               1.0.7 2013.4.21
// ==/UserScript==
(function MyMenuBtn() {
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "MyMenu";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA7SURBVDhPY6AacAqMOe8cGPufGAxSC9WGANgU4sNQbQjgHBj9HptC7Dj6PVTbYAKjgUgFMBqI5AIGBgCgVc+pltC+5AAAAABJRU5ErkJggg==)";
		Btn.setAttribute("label","MyMenu");
		Btn.setAttribute("tooltiptext","MyMenu");
		navigator.palette.appendChild(Btn);
		
		Popup = document.createElement("menupopup");
		//Popup.setAttribute("position", "after_end");//适合放右边,注释后适合左边
        Btn.appendChild(Popup);
        for (let i = 0, menu; menu = mMenus[i]; i++) {
            let menuItem;
            if (menu.label == "-") {
                menuItem = document.createElement("menuseparator");
            } else {
            menuItem = document.createElement("menuitem");
            menuItem.setAttribute("id", menu.id);
            menuItem.setAttribute("label", menu.label);
            menuItem.setAttribute('class', 'menuitem-iconic');
            menuItem.setAttribute("oncommand", menu.command);
            menuItem.setAttribute("image", menu.image);
            }
        Popup.appendChild(menuItem);
        }
    }

	//菜单列表
    var mMenus = [
		{
            label: "重启浏览器",
            command: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKlSURBVDhPdZNLTBNhFIVngTuVmAgbF67cqLsmmPhqYkTRGImhhQCKtBKr8rJgabXSDoW2zLRT2tLH0DLAQLEQglJJfCQYYqIEiQutcUECCAt3rgppeCi/c8osLMGbnOTmnvPNvTNNqb1KcVGdW3ijSnW98m4ThB4z2f5/nS1S5ZVqGsMPjPaNViZEaA+f6vAJf1rZMMGsTPuQR0aOZ9flkqoTumZ6xRkQCReJk65I/Ovs5y8XHD5hiQ3FNrt6Rwk8ZJCVsZ1SXis/fN9gW3H3PCNeYZQwwb6Z7e3tfHjpdPro8vLPMwMjCYEJDa4jg2zWJbdrTSIbGiJeaQs24WS1psGvUCj2FVfci11RVVdMT0/nTLx5p5GuWEcWTAbGdqPdu+WJxsm/orkeUqN/+qGVDf5+7PCTUm3DuFJpzfFGY11uPkbAgKW09aZbDn8f4aTTdgub3Pxwpre6eKKurtdOTc0cobnoJhiwlO4RbZbejXR2iylPREw6A0LaJW3YLTY8ROpM7c9xtZnp/gEGLFXbYjMzQZE8cfgXUqlUHu0KTrGSuZeMNu4VHmC0cgtgwFLNls47dp9AWmyejYKiyoMWxt9s9/VJv4SYJczgKZXq/ciCAUsND08eM3cGttqkj1Zeozckk8lDTl90tsPbS5zd/RllemkGr7ym0UC7eQIGLC6iOjx8AqE6ky1dWHLz1Orqar44OsF4ePETNDDygsXskqqqABlk27nwywyMGp98e9LCBH7ZpCt0Tda1q2qN/rh0KiEkF0KPmU5vWUMGWTAyvlNjidfFMNo4nhja3KS61rRepqn/BqHHDB4yyMpYdn2cmzvtDgrvzU7/ltUVIlZWltRjBg8ZOb53Sf+BA/OLi+f64+PtkcGxQQj99/ml8/DkmFwU9RcBXOUTTWNTuwAAAABJRU5ErkJggg==",
        },
		{
            label: "新建隐私窗口",
            command: "OpenBrowserWindow({private: true});",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIrSURBVDhP7ZDLTxNRGMUnJCZG1ya6c60L/xmXKDEaFsZIQBNAoLevoUMf03mVwrTzno7T0lLoYHBBCSomRhYkrowbY0xYsgIRaecwHUcT49qdv+Qk93z3Ozc3h/onjI4uXxh+Yl6ObOA7lwazyP4JWVhMR0dq5Gnj6iRj7tOS6TMlC0zJ7Gcko0cLlk+LtV6mtLrPLu1dG+wSgqEkZ+9RCUFHslQ/TRSNk3SwmJddcOoK2GodRaUByfbAa63AN5CtNJHi7H6Ss45I0fyREQ1QSV7rZ9U1FPU1cGYHnLUBee0NKs0unM13aO18AKusYL7sIiG5yOke8sYGBHcLtGD4VIrXzwbhlGgiVlB78aJ6NJtb9uclM/wBW3GDRQ2T84v+NCMfTiSkszlWBV/vgub1HjW7oB2IzktMZ/WDsIgAQshQLFf9rm68B29vYoaRT6KrkFhBO85p65jJal/DQVZZRaLcACN7n1mt64nGtpPkrWNp5RUKahsJoXaUFj1njm17E7nal7jkICbWwEj67fABkiuDVVvILDqB7Egm8vLzQG7o6eAuXnJAllpBDx2MJyuHYfgXhLO+Ce42yo2tQF1kyg6UzltU13fBaB6k5g6K1gswShtjtHw6/Ei5FUV/Un/96QrJt3fjBdWnJRtpwRiU1A9K7qcEE3TJxrNs1R+Pyx9HxrTrUexvaH7rxmSqOTVB3AeEaBdHAt0bV+7febw8dfehfDNa+89vKOocv0Vm+0fY7LgAAAAASUVORK5CYII=",
        },
		{
            label: "清理浏览痕迹", 
            command: "Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB2SURBVDhP1ZDRDYAgDES7fgdwAaeAiTqGWtJikRNjDB9ecumVvJYATRUv66a29r1+uMAHnmx4LwQjGz5B6DZkw1vlnCGMnFLqlzAzhKEP1sZO+YKSDUQ51ioRqdu1H2WvOqO5KL5f+1H22vyDQxG4y9ezjyLaAWyfFc3OVpTLAAAAAElFTkSuQmCC",
        },
		{label: "-",},//我是分割线
		{
            label: "设置选项",
            command: "openPreferences();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI/SURBVDhPhVDda1JxGP7BuokYXXTZVXfd1u5GEEVQrBQWySKpLVltMafN1LJyfiybHj1D5/Fsx50znelxs5BidNFV3fgfRN3sSgTrSkYSw8i385wdMWjVCw8+7/Nxfi+yf83ImG0CMNb/z9AFy9HRmzOiaWzyCnbPQvInAA4NHjLYDxy7N3Q5yGfpvp/7enXinimynCMAHFowIZHjUXjEiPdneNg8ePaS5Uy9Xj8cy+Q/JySVEF5a29QBDo0T85+QQRYdo86Ydcolufwc2RyPa0+j4l5S3qKDAA8ZZK3TbsmoMyYoxbmooOxyKy+Iz6raq2XtxRItCvk9ABwaPGSQFRR1zqgzVqlUBkRFnYllCsRrp8ZXipRcK71ut9unWq3WaXBo8JBJy+osOnrZZJ0etzmfkCsQp5hYoPhqkQK82G40Gsf0gDbg0OAhgyw66LIH/qg9xEv0fHld+5MKOnzh1HeLxbL/gjbg0Ho+suigy7rd7mCn0xnKlaqeSErRTtzQzCxdu+3gtS4+MgAODR4yivrKiw66+gsXR2+Z77rmv8BcTOd0+CIpGp/1fgPAezoyU1oWHb2MsT8MFwOcqJ0m74T41R84EUAY6O37nryDLDpGnbH3tdrJcvWtUzvpuC+S/PgsKdPCUpbw+zuHh0y5uu1Ex6j3x3zjzjlPMEH+qLCrvtwOzccyBIBDg2e6PnneiP85W2/eneDS8ofMetGN3R2IdwFwaPCQwf7XaTabR4joELi0sSkA4NDggfeHsV+P37vG6ED+0QAAAABJRU5ErkJggg==",
        },
		{
            label: "附加组件",
            command: "BrowserOpenAddonsMgr();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ0SURBVDhPjVFLbBJRFB23ummauHBhYjTRtRKNmpoajS2aRtpC1NCWWoKgdLDUUhlKy8Aw/JlCKZ+ZQikw1Eqpn5LoxpV7E+PCuNGVMSZuaGLS4obre5NpICSanuRkXs5958657xKduNin6R64Z5i8dUdv7u1VdcnywTHxeO49E8sB5n3S8VKWDw53NPNxKV+F+OomMFF+S5YPjlR+425UWIdQWoRcsXJJlv8NpXrsrHrMLAyPkxGNjmQfzno+Rfl1iPBlMM24v2jGSQ7VgmodKSjV+j7Z1oJphjZ74znwL69JxMbF7IZEfA7IOhPLwhOXf0S2tWC2e+cjmTJwwrP/0reUBzsduSbbWrDM+R3hjCj9LZQuwf65k75EHiYslPXGoO4mGuuNatRUUAwMHCYyWfGqh+N/LvKlD5uv31IJQawFkwUI42ZtDKWKQLFxmPVwwKKRF0Ip0BqsRgIADjWbzVM7OzvdOJEnkjrvjgqSoZPSeyTWIJgsSl+zzUMRV/qHjg2Omt6ptCbxcv/tM9oH0w4PJ0iX2+lbWoWYUCqUK9usl0t/Zzj+W2HzlYIYNdlsLhQHRyIpFmZcYfBy/A86kvmFo/rR7JiucBroYLwHJ0Y8sbu7e1x6RLRGF4tW5EOXMV3B5Oe9vb2TjUbjNB1Kfd3Xnf4EkE/pC5KpHY9stI1BkXETTKvT/7tHqTnaPzRybno+9Gdfnw8sg9FCKWVbCxY7o6dRPO/iCuBGlDcGxinHsNHqmHQGEpKGawvBJBim5nSyrYV0tqDIFCq1nFitrZSqpXK1ZkNbOVKv17vK1W17trRVyYkvUK3yPJrMXZdtMgjiL/o0qQAqtCMRAAAAAElFTkSuQmCC",
        },
		{
            label: "书签管理",//书签管理器
            command: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHoSURBVDhPY8AHnAMiLZ0C4sygXNKAh4cHe25l69PsipbHWlqhbFBh4kF0emlWx9RF/0E4Or0kHSpMHDA2NmYtqOl8OGHuyv8gXFDded/e3p4FKk0YRKWXpLZNmv9/whygAUDcCmRHphUnQqVRgZWVH697UHxCYFxmT3hKwfa43PIHFa0T//fOWva/b/ZyMAaxy1sm/E/IrrwfnpK/HaTWFahHyz6UhyE6raiosnXS/9aJ8/53TFn4v3v6kv+9M5dhxSA5kBqQWpCe6PSifIZTpy7Ltk+ed61r+uL/3TOWEIVBatsnzr1y/vx5abA3jp89q9k2ac6dzqkL/3dNW4QXg9S0TZxz6+SFC2pgzTBw+PAJ/Za+2Q9BTgQpwoZBci39sx4cPXVBB6oNFTT3Tk1u7p/9v33yfKwYJNfWNyMeqhwTpBZUlzT3zfrfNmkeVgySS82rLIQqxwRpRbUzWoC2tE6YA8YtUAznA+XSimomQ5VjguyypiMgRc39s/7Xdk392zN13rGeafNP1HZO+QcSA8kB1RyAKscEeZWtT+o6pwKjaNbFjdv3JPz//58fiAU2bNud1Dph1qW6rqn/cyuaH0KVY4Jp85a1rNy4NefTp0+iUCE4+Pfvn+iq9dtyZ8xb1ggVAgIGBgDd8HTEqKvnWQAAAABJRU5ErkJggg==",
        },
		{
            label: "脚本管理",//
            command: "Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get('UChrm', Components.interfaces.nsILocalFile).launch();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABTSURBVDhPzYzBCcAwDMS8fgbIAJ00hXAFw1kP0zwiuI+QHUcY81nfpDbkDQrJGxSSNygkb1BI3shhZzq/4QHRiivuelBNGVMd5SljqqM8ZX+IeAGxoR/+53UAlAAAAABJRU5ErkJggg==",
        },
		{label: "-",},//我是分割线
		{
            label: "userChrome.css",//编辑userChrome.css 
            command: "edituserchrome();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKjSURBVDhPjVJLaxNRFB4QV90KLly46MKFC7dKLUGlSFEXUopShagIKkJBpBRKrdamryRN2jzbvGaSSZNMk3TymiSTNpmaaVPbxr4LahcRBLPwJ2RxnHOdIkWRfnCY4d7zffec7xzqf1g5+HG+UNnVpIprXfLml0vq8b9R2frWIso72mBcfBniC2k7w0kjRvvG+JSrNmx2/kwUKmk19W846EiH3uI97B0YhSGDDfp1RtAZ7WCwecFBc+CLpCFRWOVz8tZFlXIcT1+8ksYmXSphDmguA3OZJRCkKhRWdqH48QAW1vZreXmHVSnHcbfzoWRy0A2Lm23giygQThaBFyuQXfpEhPC7uLoPuVL1pkr7g7b2O5LSq0KONGzeMLiDPASiWZjlCxDiFyCek0ExEjLSBiTFFUkUt5tU6m+0XmuThicchGByMGD1hMDJRMEbSgIbzxMRvIsKHyCWLUMsv3xPpVJUtVo9fflKq/RubArm88vENKPNB5MzLPl3sXHwzCbAF04RkeC8CEFerC/vfW0mAjjfq63X997oJiCSKpIkg9UDE3YaTE4/EbK4gmD3RYgQVoUtKrmK3XCKypY3NTfab9Ve971XnJeIcUgcNc+QwOnoLW4S5ukAEUNR8wxb93C5CxSXKmlud9yvPX7WDQwnkD6x78HxKcC2MN6OmEng2ZGwYjowUYGmQskFbeeDJ7XOrkekRJw/GoVJuFgYfYPjMDBsgiG9lbQ27Y8pniRkP5fVUEJpvfS8u6eBAlgmly4RM3GM+Dq2gKU7aa6h+PM9XVx3E/OOIFU/n5l0s1qlvEMsE43EUHYf/HOCslCL9ahQpmNCuYUJZ5u3t+vHd+AIhkCgqadf18tEM4dsLC8brD6tO5Q8q16fHOnFyjkynhOBon4BGyz36HJLvuYAAAAASUVORK5CYII=",
        },
		{
            label: "about:config",//
            command: "gBrowser.selectedTab = gBrowser.addTab('about:config');",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVDhPjZK/S8NAFMcjiOIigl0ErYM4OTooDm4uTk4urv4JglvdrElr2pomubY2ufyy9kdaiCUiinXWRaQ4iIM4iQhuilUb79KrbTXQfuDBvXvv+73H46h2RMmYZkVtlU0aa5H0wVw2mx0ipd7gpMzGThx+o3BoXnpjgZ42LMtHyt2RS6WRXaCWsUEzGAE+AM0cIy3dcRynL5YyAkFOrjdNWKAdkfJ/KpVKPzl2EOLV+9Ykcl0zj72niCQ00bbtQZK6KDnLj0RfLQPoRIC+SMqdoGINvXalF8qTOMdmYVE9aRfjEOTDeVfwF4ZXnnEDWtZLWFC3GEG5+SvGAWBunUg6iSZ14CXwCrTMiyTMzxBpg4SS8zM8vPYSeAUdlz8jST2q2fYwsaAow7B8yL2At91qhB9sQj9rF7v3vOJ+NPTokwBzs8SigWaa49GUscxJ2SX8qfBdbF/f/DUQlMdi8XQ0oRZWcI4+3aUr7AZqdE1CgnJXrVYHpEx+AefBOHwlLd0R5Pw2FtFodHpPecfnMFDPSbk3uHQmgHZTc8WidgtgcYqUegdvn5cyE42Mon4AKKVSBCWmd9wAAAAASUVORK5CYII=",
        },
		{
            label: "代码片段速记器",
            command: "Scratchpad.openScratchpad();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHdSURBVDhPjY7PS9twGMYrDHH05sFj8eBtt+0oHtfhVRRkpG5QSivbWtOMRaMxrDUmja01if21NtZflRY8CbsNIgiih6mH6cEd+hcI66XzoO3ydF/IJq36gRdenufzfhNHJ8bGhO6Rt+9eYbCT+LE0uyY+TLvDvPITgx0ZKR+GCjB99HxsT05tNjDYkZH6Qbr8jDDKK+mrlXz5RyJXvuCVzBUydH+Ve6AoxknPK0ZkxfiVSG8Gl9JFRkwWasjQEa0zXloY4Bb186haqAfnpO8hPnYiqoXfnKSde+npAaK1xz3q7fVN8fLnZL4ez5aacmqjNdiRoYND9P95SVHOiUk2wopaTclstY7+HWTo4MAlZzaeIOsKC/FLeXWjJbcbdHDgkjObECv1z8b0asz65fsGDlxyZtN6QNarsl5siqpxI2rGdTSZb1j7raitXSNDB6ftA35W6OcWtGok8eVG0Yv7ufWyoq9t76wWS6WMtSNDBwcuObMJsoLLKk9k1TDLu18Hfe+5YR89M27Na1+IG0aGDg5ccmZTOTx8+m3/aOjg4PiZaZpPAlOzHs/kp+03gY872JGhgwOXnHVmYTn7PDwnnTK8fCbF0y9I/HisL/ZkjQqVXa9QplntIfEdHI4/Azg0LrM9+vsAAAAASUVORK5CYII=",
        },
		
		{
            label: "Firefox备份文件夹",
            command: "Firefoxbackup();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACYSURBVDhPYxg8IDc3l71jyvy8numLyiB4SUJ9fT0bVBo/ACnsmLLgKhD/65y68D8Id01b9Kdt8oISqBLcoL5rvgRQwzSYRmQMNORf97TFS/pmLZuKjHtmLu1v75+vADagecoc+fbJ8/ZhMwAf7pi6cBlFBrRNmbd41IBBY0D9lPkS7ZPnr2ifsuAhKbh18ryJYAMGGDAwAABwCaOsaCZu9QAAAABJRU5ErkJggg==",
        },
		/*
		{
            label: "关于火狐",
            command: "openAboutDialog();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKjSURBVDhPjVJLaxNRFB4QV90KLly46MKFC7dKLUGlSFEXUopShagIKkJBpBRKrdamryRN2jzbvGaSSZNMk3TymiSTNpmaaVPbxr4LahcRBLPwJ2RxnHOdIkWRfnCY4d7zffec7xzqf1g5+HG+UNnVpIprXfLml0vq8b9R2frWIso72mBcfBniC2k7w0kjRvvG+JSrNmx2/kwUKmk19W846EiH3uI97B0YhSGDDfp1RtAZ7WCwecFBc+CLpCFRWOVz8tZFlXIcT1+8ksYmXSphDmguA3OZJRCkKhRWdqH48QAW1vZreXmHVSnHcbfzoWRy0A2Lm23giygQThaBFyuQXfpEhPC7uLoPuVL1pkr7g7b2O5LSq0KONGzeMLiDPASiWZjlCxDiFyCek0ExEjLSBiTFFUkUt5tU6m+0XmuThicchGByMGD1hMDJRMEbSgIbzxMRvIsKHyCWLUMsv3xPpVJUtVo9fflKq/RubArm88vENKPNB5MzLPl3sXHwzCbAF04RkeC8CEFerC/vfW0mAjjfq63X997oJiCSKpIkg9UDE3YaTE4/EbK4gmD3RYgQVoUtKrmK3XCKypY3NTfab9Ve971XnJeIcUgcNc+QwOnoLW4S5ukAEUNR8wxb93C5CxSXKmlud9yvPX7WDQwnkD6x78HxKcC2MN6OmEng2ZGwYjowUYGmQskFbeeDJ7XOrkekRJw/GoVJuFgYfYPjMDBsgiG9lbQ27Y8pniRkP5fVUEJpvfS8u6eBAlgmly4RM3GM+Dq2gKU7aa6h+PM9XVx3E/OOIFU/n5l0s1qlvEMsE43EUHYf/HOCslCL9ahQpmNCuYUJZ5u3t+vHd+AIhkCgqadf18tEM4dsLC8brD6tO5Q8q16fHOnFyjkynhOBon4BGyz36HJLvuYAAAAASUVORK5CYII=",
        },*/

    ];
    //更新按钮
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("MyMenu") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
	createBtn();
	updateToolbar();
})();
//编辑userchrome.css
function edituserchrome() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile);
    file.append("userChrome.css");file.launch();
}
//打开备份文件夹,这个是绝对路径，请自行设置
function Firefoxbackup() {
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("D:\\SkyDrive\\Firefox");file.launch();
}
