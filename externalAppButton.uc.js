// ==UserScript==
// @name           externalAppButton.uc.js
// @namespace      externalAppButton@gmail.com
// @description    自用菜单，功能整理by defpt
// @include        main
// @author         lastdream2013
// @charset        UTF-8
// @version        v20130530
// ==/UserScript==

var gExternalAppbuttonMEx = {
	autohideEmptySubDirs: true,  //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom: true,  //把主菜单下的子目录移动到最下面
    subdirPopupHash: [],
    subdirMenuHash: [],
    toolbar: {
     //定义好主菜单下子目录, 可在中间加{name: 'separator'}建立分隔线
        subdirs: [
		    {name: 'separator'},
			{name: '配置文件', image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKjSURBVDhPjVJLaxNRFB4QV90KLly46MKFC7dKLUGlSFEXUopShagIKkJBpBRKrdamryRN2jzbvGaSSZNMk3TymiSTNpmaaVPbxr4LahcRBLPwJ2RxnHOdIkWRfnCY4d7zffec7xzqf1g5+HG+UNnVpIprXfLml0vq8b9R2frWIso72mBcfBniC2k7w0kjRvvG+JSrNmx2/kwUKmk19W846EiH3uI97B0YhSGDDfp1RtAZ7WCwecFBc+CLpCFRWOVz8tZFlXIcT1+8ksYmXSphDmguA3OZJRCkKhRWdqH48QAW1vZreXmHVSnHcbfzoWRy0A2Lm23giygQThaBFyuQXfpEhPC7uLoPuVL1pkr7g7b2O5LSq0KONGzeMLiDPASiWZjlCxDiFyCek0ExEjLSBiTFFUkUt5tU6m+0XmuThicchGByMGD1hMDJRMEbSgIbzxMRvIsKHyCWLUMsv3xPpVJUtVo9fflKq/RubArm88vENKPNB5MzLPl3sXHwzCbAF04RkeC8CEFerC/vfW0mAjjfq63X997oJiCSKpIkg9UDE3YaTE4/EbK4gmD3RYgQVoUtKrmK3XCKypY3NTfab9Ve971XnJeIcUgcNc+QwOnoLW4S5ukAEUNR8wxb93C5CxSXKmlud9yvPX7WDQwnkD6x78HxKcC2MN6OmEng2ZGwYjowUYGmQskFbeeDJ7XOrkekRJw/GoVJuFgYfYPjMDBsgiG9lbQ27Y8pniRkP5fVUEJpvfS8u6eBAlgmly4RM3GM+Dq2gKU7aa6h+PM9XVx3E/OOIFU/n5l0s1qlvEMsE43EUHYf/HOCslCL9ahQpmNCuYUJZ5u3t+vHd+AIhkCgqadf18tEM4dsLC8brD6tO5Q8q16fHOnFyjkynhOBon4BGyz36HJLvuYAAAAASUVORK5CYII=" },
			{name: '辅助功能', image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ0SURBVDhPjVFLbBJRFB23ummauHBhYjTRtRKNmpoajS2aRtpC1NCWWoKgdLDUUhlKy8Aw/JlCKZ+ZQikw1Eqpn5LoxpV7E+PCuNGVMSZuaGLS4obre5NpICSanuRkXs5958657xKduNin6R64Z5i8dUdv7u1VdcnywTHxeO49E8sB5n3S8VKWDw53NPNxKV+F+OomMFF+S5YPjlR+425UWIdQWoRcsXJJlv8NpXrsrHrMLAyPkxGNjmQfzno+Rfl1iPBlMM24v2jGSQ7VgmodKSjV+j7Z1oJphjZ74znwL69JxMbF7IZEfA7IOhPLwhOXf0S2tWC2e+cjmTJwwrP/0reUBzsduSbbWrDM+R3hjCj9LZQuwf65k75EHiYslPXGoO4mGuuNatRUUAwMHCYyWfGqh+N/LvKlD5uv31IJQawFkwUI42ZtDKWKQLFxmPVwwKKRF0Ip0BqsRgIADjWbzVM7OzvdOJEnkjrvjgqSoZPSeyTWIJgsSl+zzUMRV/qHjg2Omt6ptCbxcv/tM9oH0w4PJ0iX2+lbWoWYUCqUK9usl0t/Zzj+W2HzlYIYNdlsLhQHRyIpFmZcYfBy/A86kvmFo/rR7JiucBroYLwHJ0Y8sbu7e1x6RLRGF4tW5EOXMV3B5Oe9vb2TjUbjNB1Kfd3Xnf4EkE/pC5KpHY9stI1BkXETTKvT/7tHqTnaPzRybno+9Gdfnw8sg9FCKWVbCxY7o6dRPO/iCuBGlDcGxinHsNHqmHQGEpKGawvBJBim5nSyrYV0tqDIFCq1nFitrZSqpXK1ZkNbOVKv17vK1W17trRVyYkvUK3yPJrMXZdtMgjiL/o0qQAqtCMRAAAAAElFTkSuQmCC" },
            {name: 'about:Firefox', image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVDhPjZK/S8NAFMcjiOIigl0ErYM4OTooDm4uTk4urv4JglvdrElr2pomubY2ufyy9kdaiCUiinXWRaQ4iIM4iQhuilUb79KrbTXQfuDBvXvv+73H46h2RMmYZkVtlU0aa5H0wVw2mx0ipd7gpMzGThx+o3BoXnpjgZ42LMtHyt2RS6WRXaCWsUEzGAE+AM0cIy3dcRynL5YyAkFOrjdNWKAdkfJ/KpVKPzl2EOLV+9Ykcl0zj72niCQ00bbtQZK6KDnLj0RfLQPoRIC+SMqdoGINvXalF8qTOMdmYVE9aRfjEOTDeVfwF4ZXnnEDWtZLWFC3GEG5+SvGAWBunUg6iSZ14CXwCrTMiyTMzxBpg4SS8zM8vPYSeAUdlz8jST2q2fYwsaAow7B8yL2At91qhB9sQj9rF7v3vOJ+NPTokwBzs8SigWaa49GUscxJ2SX8qfBdbF/f/DUQlMdi8XQ0oRZWcI4+3aUr7AZqdE1CgnJXrVYHpEx+AefBOHwlLd0R5Pw2FtFodHpPecfnMFDPSbk3uHQmgHZTc8WidgtgcYqUegdvn5cyE42Mon4AKKVSBCWmd9wAAAAASUVORK5CYII=" },
        ],
        //定义主菜单或子菜单程序(subdir没有定义, 或定义错误就会出现在主菜单下面， 
        //可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
        apps: [
            {name: 'userChrome.css', path: '\\chrome\\userChrome.css',  subdir:'配置文件'},
            {name: 'userContent.css', path: '\\chrome\\userContent.css',  subdir:'配置文件'},
            {name: 'prefs.js', path: '\\prefs.js',  subdir:'配置文件'},
            {name: 'user.js', path: '\\user.js',  subdir:'配置文件'},
           // 建议把要放在子目录下的程序定义在上面, 下面的定义放在主菜单下的最常用的程序
		    //{name: '脚本管理', path: '\\chrome'}, 
        ],
        //   在这里定义firefox的功能按钮, command就是一小段程序, 可以从firefox api, 小书签或鼠标手势中摘取;可选自定义图标;
        //    同样, 建议先写完上面想要定义, 分类在子目录下的程序,  之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
        configs: [
		   	{
		        name: 'about:config', 
				command: "getBrowser().selectedTab = getBrowser().addTab ('about:config')", 
				subdir: 'about:Firefox' 
			},
		    {
		        name: 'about:cache', 
				command: "getBrowser().selectedTab = getBrowser().addTab ('about:cache')", 
				subdir: 'about:Firefox' 
			},
		    {
		        name: 'about:firefox', 
		        command: "openAboutDialog();", 
		        subdir: 'about:Firefox' 
		    },
            {
		        name: 'about:home', 
				command: "getBrowser().selectedTab = getBrowser().addTab ('about:home')", 
				subdir: 'about:Firefox' 
			},
            {
		        name: 'about:plugins', 
				command: "getBrowser().selectedTab = getBrowser().addTab ('about:plugins')", 
				subdir: 'about:Firefox' 
			},
            {
		        name: 'about:support', 
				command: "getBrowser().selectedTab = getBrowser().addTab ('about:support')", 
				subdir: 'about:Firefox' 
			},
			{
    			name : '清理浏览痕迹',
				subdir : '辅助功能',
    			command : "Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);",
    			image : ""
    		},
			{
    			name : '打开文件...',
				subdir : '辅助功能',
    			command : "BrowserOpenFileWindow();",
    			image : ""
    		},
			{
    			name : '网页另存为...',
				subdir : '辅助功能',
    			command : "saveDocument(window.content.document);",
    			image : ""
    		},
			{name: 'separator', subdir : '辅助功能'},
		    {
    			name : '代码片段速记',
    			subdir : '辅助功能',
    			command : "Scratchpad.openScratchpad();",
    			image : "",
    		},
			{
    			name : '安全模式重启',
    			subdir : '辅助功能',
    			command : "safeModeRestart();",
    			image : ""
    		},
            {
		        name: '错误控制台', 
				subdir: '辅助功能',
				command: "toJavaScriptConsole();", 
				image: ""
			},
           // 建议把要放在子目录下的功能按钮,定义在上面, 下面的定义放在主菜单下的最常用的功能按钮,
		    {
		        name: '重启浏览器', 
				command: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();", 
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKlSURBVDhPdZNLTBNhFIVngTuVmAgbF67cqLsmmPhqYkTRGImhhQCKtBKr8rJgabXSDoW2zLRT2tLH0DLAQLEQglJJfCQYYqIEiQutcUECCAt3rgppeCi/c8osLMGbnOTmnvPNvTNNqb1KcVGdW3ijSnW98m4ThB4z2f5/nS1S5ZVqGsMPjPaNViZEaA+f6vAJf1rZMMGsTPuQR0aOZ9flkqoTumZ6xRkQCReJk65I/Ovs5y8XHD5hiQ3FNrt6Rwk8ZJCVsZ1SXis/fN9gW3H3PCNeYZQwwb6Z7e3tfHjpdPro8vLPMwMjCYEJDa4jg2zWJbdrTSIbGiJeaQs24WS1psGvUCj2FVfci11RVVdMT0/nTLx5p5GuWEcWTAbGdqPdu+WJxsm/orkeUqN/+qGVDf5+7PCTUm3DuFJpzfFGY11uPkbAgKW09aZbDn8f4aTTdgub3Pxwpre6eKKurtdOTc0cobnoJhiwlO4RbZbejXR2iylPREw6A0LaJW3YLTY8ROpM7c9xtZnp/gEGLFXbYjMzQZE8cfgXUqlUHu0KTrGSuZeMNu4VHmC0cgtgwFLNls47dp9AWmyejYKiyoMWxt9s9/VJv4SYJczgKZXq/ciCAUsND08eM3cGttqkj1Zeozckk8lDTl90tsPbS5zd/RllemkGr7ym0UC7eQIGLC6iOjx8AqE6ky1dWHLz1Orqar44OsF4ePETNDDygsXskqqqABlk27nwywyMGp98e9LCBH7ZpCt0Tda1q2qN/rh0KiEkF0KPmU5vWUMGWTAyvlNjidfFMNo4nhja3KS61rRepqn/BqHHDB4yyMpYdn2cmzvtDgrvzU7/ltUVIlZWltRjBg8ZOb53Sf+BA/OLi+f64+PtkcGxQQj99/ml8/DkmFwU9RcBXOUTTWNTuwAAAABJRU5ErkJggg==" 
			}, 
		    {
		        name: '新建隐私窗口', 
				command: "OpenBrowserWindow({private: true});", 
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIrSURBVDhP7ZDLTxNRGMUnJCZG1ya6c60L/xmXKDEaFsZIQBNAoLevoUMf03mVwrTzno7T0lLoYHBBCSomRhYkrowbY0xYsgIRaecwHUcT49qdv+Qk93z3Ozc3h/onjI4uXxh+Yl6ObOA7lwazyP4JWVhMR0dq5Gnj6iRj7tOS6TMlC0zJ7Gcko0cLlk+LtV6mtLrPLu1dG+wSgqEkZ+9RCUFHslQ/TRSNk3SwmJddcOoK2GodRaUByfbAa63AN5CtNJHi7H6Ss45I0fyREQ1QSV7rZ9U1FPU1cGYHnLUBee0NKs0unM13aO18AKusYL7sIiG5yOke8sYGBHcLtGD4VIrXzwbhlGgiVlB78aJ6NJtb9uclM/wBW3GDRQ2T84v+NCMfTiSkszlWBV/vgub1HjW7oB2IzktMZ/WDsIgAQshQLFf9rm68B29vYoaRT6KrkFhBO85p65jJal/DQVZZRaLcACN7n1mt64nGtpPkrWNp5RUKahsJoXaUFj1njm17E7nal7jkICbWwEj67fABkiuDVVvILDqB7Egm8vLzQG7o6eAuXnJAllpBDx2MJyuHYfgXhLO+Ce42yo2tQF1kyg6UzltU13fBaB6k5g6K1gswShtjtHw6/Ei5FUV/Un/96QrJt3fjBdWnJRtpwRiU1A9K7qcEE3TJxrNs1R+Pyx9HxrTrUexvaH7rxmSqOTVB3AeEaBdHAt0bV+7febw8dfehfDNa+89vKOocv0Vm+0fY7LgAAAAASUVORK5CYII=" 
			}, 
		    {name: 'separator'},
		    {
		        name: '设置选项', 
				command: "openPreferences();", 
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI/SURBVDhPhVDda1JxGP7BuokYXXTZVXfd1u5GEEVQrBQWySKpLVltMafN1LJyfiybHj1D5/Fsx50znelxs5BidNFV3fgfRN3sSgTrSkYSw8i385wdMWjVCw8+7/Nxfi+yf83ImG0CMNb/z9AFy9HRmzOiaWzyCnbPQvInAA4NHjLYDxy7N3Q5yGfpvp/7enXinimynCMAHFowIZHjUXjEiPdneNg8ePaS5Uy9Xj8cy+Q/JySVEF5a29QBDo0T85+QQRYdo86Ydcolufwc2RyPa0+j4l5S3qKDAA8ZZK3TbsmoMyYoxbmooOxyKy+Iz6raq2XtxRItCvk9ABwaPGSQFRR1zqgzVqlUBkRFnYllCsRrp8ZXipRcK71ut9unWq3WaXBo8JBJy+osOnrZZJ0etzmfkCsQp5hYoPhqkQK82G40Gsf0gDbg0OAhgyw66LIH/qg9xEv0fHld+5MKOnzh1HeLxbL/gjbg0Ho+suigy7rd7mCn0xnKlaqeSErRTtzQzCxdu+3gtS4+MgAODR4yivrKiw66+gsXR2+Z77rmv8BcTOd0+CIpGp/1fgPAezoyU1oWHb2MsT8MFwOcqJ0m74T41R84EUAY6O37nryDLDpGnbH3tdrJcvWtUzvpuC+S/PgsKdPCUpbw+zuHh0y5uu1Ex6j3x3zjzjlPMEH+qLCrvtwOzccyBIBDg2e6PnneiP85W2/eneDS8ofMetGN3R2IdwFwaPCQwf7XaTabR4joELi0sSkA4NDggfeHsV+P37vG6ED+0QAAAABJRU5ErkJggg=="
			},
            {
		        name: '附加组件', 
				command: "getBrowser().selectedTab = getBrowser().addTab ('about:addons')", 
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ0SURBVDhPjVFLbBJRFB23ummauHBhYjTRtRKNmpoajS2aRtpC1NCWWoKgdLDUUhlKy8Aw/JlCKZ+ZQikw1Eqpn5LoxpV7E+PCuNGVMSZuaGLS4obre5NpICSanuRkXs5958657xKduNin6R64Z5i8dUdv7u1VdcnywTHxeO49E8sB5n3S8VKWDw53NPNxKV+F+OomMFF+S5YPjlR+425UWIdQWoRcsXJJlv8NpXrsrHrMLAyPkxGNjmQfzno+Rfl1iPBlMM24v2jGSQ7VgmodKSjV+j7Z1oJphjZ74znwL69JxMbF7IZEfA7IOhPLwhOXf0S2tWC2e+cjmTJwwrP/0reUBzsduSbbWrDM+R3hjCj9LZQuwf65k75EHiYslPXGoO4mGuuNatRUUAwMHCYyWfGqh+N/LvKlD5uv31IJQawFkwUI42ZtDKWKQLFxmPVwwKKRF0Ip0BqsRgIADjWbzVM7OzvdOJEnkjrvjgqSoZPSeyTWIJgsSl+zzUMRV/qHjg2Omt6ptCbxcv/tM9oH0w4PJ0iX2+lbWoWYUCqUK9usl0t/Zzj+W2HzlYIYNdlsLhQHRyIpFmZcYfBy/A86kvmFo/rR7JiucBroYLwHJ0Y8sbu7e1x6RLRGF4tW5EOXMV3B5Oe9vb2TjUbjNB1Kfd3Xnf4EkE/pC5KpHY9stI1BkXETTKvT/7tHqTnaPzRybno+9Gdfnw8sg9FCKWVbCxY7o6dRPO/iCuBGlDcGxinHsNHqmHQGEpKGawvBJBim5nSyrYV0tqDIFCq1nFitrZSqpXK1ZkNbOVKv17vK1W17trRVyYkvUK3yPJrMXZdtMgjiL/o0qQAqtCMRAAAAAElFTkSuQmCC"
			},
			{
		        name: '书签管理', 
				command: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');", 
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHoSURBVDhPY8AHnAMiLZ0C4sygXNKAh4cHe25l69PsipbHWlqhbFBh4kF0emlWx9RF/0E4Or0kHSpMHDA2NmYtqOl8OGHuyv8gXFDded/e3p4FKk0YRKWXpLZNmv9/whygAUDcCmRHphUnQqVRgZWVH697UHxCYFxmT3hKwfa43PIHFa0T//fOWva/b/ZyMAaxy1sm/E/IrrwfnpK/HaTWFahHyz6UhyE6raiosnXS/9aJ8/53TFn4v3v6kv+9M5dhxSA5kBqQWpCe6PSifIZTpy7Ltk+ed61r+uL/3TOWEIVBatsnzr1y/vx5abA3jp89q9k2ac6dzqkL/3dNW4QXg9S0TZxz6+SFC2pgzTBw+PAJ/Za+2Q9BTgQpwoZBci39sx4cPXVBB6oNFTT3Tk1u7p/9v33yfKwYJNfWNyMeqhwTpBZUlzT3zfrfNmkeVgySS82rLIQqxwRpRbUzWoC2tE6YA8YtUAznA+XSimomQ5VjguyypiMgRc39s/7Xdk392zN13rGeafNP1HZO+QcSA8kB1RyAKscEeZWtT+o6pwKjaNbFjdv3JPz//58fiAU2bNud1Dph1qW6rqn/cyuaH0KVY4Jp85a1rNy4NefTp0+iUCE4+Pfvn+iq9dtyZ8xb1ggVAgIGBgDd8HTEqKvnWQAAAABJRU5ErkJggg==" 
			},
			{
                name: "脚本管理",//
                command: "Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get('UChrm', Components.interfaces.nsILocalFile).launch();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABTSURBVDhPzYzBCcAwDMS8fgbIAJ00hXAFw1kP0zwiuI+QHUcY81nfpDbkDQrJGxSSNygkb1BI3shhZzq/4QHRiivuelBNGVMd5SljqqM8ZX+IeAGxoR/+53UAlAAAAABJRU5ErkJggg==",
            },
	    ],
    },
	_externalAppPopup: null,
	_isready: false,
    init: function() {
        this.handleRelativePath(this.toolbar.apps);
        const XULNS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var ExternalAppBtn = document.createElementNS (XULNS, 'toolbarbutton');
		ExternalAppBtn.id = "ExternalAppbtnMEx";
		ExternalAppBtn.setAttribute("label","扩展程序按钮");
	        ExternalAppBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
		ExternalAppBtn.setAttribute("tooltiptext","扩展程序按钮,可以自定义扩展程序和功能");
		ExternalAppBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		ExternalAppBtn.setAttribute("type", "menu");
		ExternalAppBtn.setAttribute("removable", "true");
	    ExternalAppBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA7SURBVDhPY6AacAqMOe8cGPufGAxSC9WGANgU4sNQbQjgHBj9HptC7Dj6PVTbYAKjgUgFMBqI5AIGBgCgVc+pltC+5AAAAABJRU5ErkJggg==)";
		navigator.palette.appendChild(ExternalAppBtn);

		var ExternalAppPopup = document.createElementNS (XULNS, 'menupopup');
	    ExternalAppPopup.setAttribute('onpopupshowing','event.stopPropagation();gExternalAppbuttonMEx.onpopupshowing();');
	    this._externalAppPopup = ExternalAppPopup;
   	    ExternalAppBtn.appendChild(ExternalAppPopup); 
    },

	onpopupshowing: function() {	   
 	   if (this._isready ) return;
 	   if ( this._externalAppPopup == null ) return;
 	   var ExternalAppPopup = this._externalAppPopup;
         for (var i=0; i<this.toolbar.subdirs.length; i++) {
          if (this.toolbar.subdirs[i].name == 'separator') {
            ExternalAppPopup.appendChild(document.createElement('menuseparator'));
          }
          else {
            var subDirItem = ExternalAppPopup.appendChild(document.createElement('menu'));
            var subDirItemPopup = subDirItem.appendChild(document.createElement('menupopup'));
            subDirItem.setAttribute('class', 'menu-iconic');
            subDirItem.setAttribute('label', this.toolbar.subdirs[i].name);
            subDirItem.setAttribute('image', this.toolbar.subdirs[i].image);
            gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
            gExternalAppbuttonMEx.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
          }
        }
 
        for (var i=0; i<this.toolbar.apps.length; i++) {
        	var appsItems;
          if (this.toolbar.apps[i].name == 'separator') {
          	  appsItems = document.createElement('menuseparator');
          }
          else {
            appsItems = document.createElement('menuitem');
            appsItems.setAttribute('class', 'menuitem-iconic');
            appsItems.setAttribute('label', this.toolbar.apps[i].name);
            appsItems.setAttribute('image', 'moz-icon:file://' + this.toolbar.apps[i].path + '?size=16;');
            appsItems.setAttribute('oncommand', "gExternalAppbuttonMEx.exec(this.path, this.args);");
            appsItems.setAttribute('tooltiptext', this.toolbar.apps[i].name);
            appsItems.path = this.toolbar.apps[i].path;
            appsItems.args = this.toolbar.apps[i].args;
          }
	  if (  this.toolbar.apps[i].subdir && gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.apps[i].subdir]  )
               gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.apps[i].subdir].appendChild(appsItems);
         else
          	  ExternalAppPopup.appendChild(appsItems);
        }

        for (var i=0; i<this.toolbar.configs.length; i++) {
        	var configItems;
          if (this.toolbar.configs[i].name == 'separator') {
            configItems = document.createElement('menuseparator');
          }
          else {
            configItems= ExternalAppPopup.appendChild(document.createElement('menuitem'));
            configItems.setAttribute('class', 'menuitem-iconic');
            configItems.setAttribute('label', this.toolbar.configs[i].name);
            configItems.setAttribute('image',this.toolbar.configs[i].image);
            configItems.setAttribute('oncommand', this.toolbar.configs[i].command );
            configItems.setAttribute('tooltiptext', this.toolbar.configs[i].name);
          }
	    if (  this.toolbar.configs[i].subdir && gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.configs[i].subdir]  )
               gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.configs[i].subdir].appendChild(configItems);
           else
          	   ExternalAppPopup.appendChild(configItems);
        }

	if ( this.autohideEmptySubDirs )
	{
		for (let [name, popup] in Iterator(gExternalAppbuttonMEx.subdirPopupHash )) {
			//Application.console.log("popup: " + popup);
			if ( popup.hasChildNodes() ) {
			   continue;
			}
			else {
			    gExternalAppbuttonMEx.subdirMenuHash[name].setAttribute("hidden", "true");	
			} 
		}
	}

	if ( this.moveSubDirstoBottom )
	{
		let i = ExternalAppPopup.childNodes.length;
		while ( ExternalAppPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && i-- != 0 )
		{
			ExternalAppPopup.appendChild(ExternalAppPopup.firstChild);
		}
	}
	this._isready = true;
	},

    handleRelativePath: function(apps) {
        for (var i=0; i<apps.length; i++) {
          if (apps[i].path) {
            apps[i].path = apps[i].path.replace(/\//g, '\\').toLocaleLowerCase();	
            var ffdir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).path;
 		 if (/^(\\)/.test(apps[i].path)) {
              apps[i].path = ffdir + apps[i].path;
            }
          }
        }
    },

    exec: function(path, args) {
            args = args || [];
            var args_t=args.slice(0);
            for (var i=0; i<args_t.length; i++) {
                args_t[i] = args_t[i].replace(/%u/g, gBrowser.currentURI.spec);
            }

            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            file.initWithPath(path);
            if (!file.exists()) {
                 Cu.reportError('File Not Found: ' + path);
                 return;
            }

            if (!file.isExecutable()) {
                file.launch();
            }
            else {
                var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
                process.init(file);
                process.run(false, args_t, args_t.length);
            }
    },
};

    function updateToolbar() {
        var toolbars = document.querySelectorAll("toolbar");
        Array.slice(toolbars).forEach(function (toolbar) {
            var currentset = toolbar.getAttribute("currentset");
            if (currentset.split(",").indexOf("ExternalAppbtnMEx") < 0) return;
            toolbar.currentSet = currentset;
            try {
                BrowserToolboxCustomizeDone(true);
            } catch (ex) {
            }
       });
    }
    gExternalAppbuttonMEx.init();
    updateToolbar();
