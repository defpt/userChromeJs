// ==UserScript==
// @name                 JsTranslator.uc.js
// @namespace            JsTranslator@gmail.com
// @description          翻译合集，注释了一些我不常用的，可通过注释自行选择，
//                       默认图标设在了地址栏，取消13、14、23行注释符号//，
//                       注释掉25行可变为可移动按钮
// @charset              UTF-8
// @author               defpt
// @version             1.0.0  2013.02.25 
// ==/UserScript==
(function ToolsBtn() {
    function createBtn() {
      //var navigator = document.getElementById("navigator-toolbox");
		//if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "JsTranslator";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMpSURBVDhPJZPdTxRXGMZHcGZ2ZrVeNOnXRXvZtPGiJk2t1SjsAmLRsgu7y5IQmzQNqSE1ppZlP2Fx2V3YDz4sxWIU64K2UAiiFgtpbQLGmKjhqknTi9rrJv0bfn3P4eLJycyZ3/M+73nPGN7oZZzoFN6uSdyucfZ3i7oqOOGSaBQ3XGRfpIg3nMfuyGEHL2EFs1iBIUx/BsMV2NXwBHa4ivHJKHuCYwKP4QkVqQ8WME5fwmgTSGA7OLwLt6TZ25gSAwVHx7EEfrmnSu/EdQ6dnxKjAp7OPG+cLdI+NE1A5HQOYwYGsVoyGt7r0wYTUr2KE6lKzDGurCzxbGeD97+sUPt5hZmlGi/+fsSff23zSvcge5rSmL409QKbykCBTqSCGynr+MaZHO/1VTjUV+bew2Wqt2r8+nid4xdl35/Cbc5gN6nqSS3DFdgJl6XfUd75osqV1RU+LV/FOJ7iowsV/nnxmOd/bHG0bwzj2ADGYdHROJbApjoDK1TmpWiJ0sI8D7eX+e/fHYZv1OjOfcMvW6tS/T65a3NsPVmXRKtkvv2Otq9K1DcmsfySwCPjUtXfPTfB270lrq4ucm58huL8TXryk2LwgLXNZfpGJyl9f5OZH2sEYmXqGySFNhDYkXEZZ0Y40DXC/L0fiOSmOdhb4PPCZZ7s/MZPD5Y4daFIXYPEPxKTFgbkDiTkEBPKoIgbKlDXnuOI7nmbpzvrzC7eIDk9y/bTTdY2Frl9Z467m7d4KzQkE0hIdZEvLgYyazeUx2gdInt9jo1Hd3kzkiWaHte6//sa/VOzvH46xcGzOfa3qvGpQ4zr1bA78njkipqBYV7tGeG1Tpl1g0Q7IZsffs21lQU+y8nF+uCiHJwCEzLGXQPLJy3p+92hrmgW82RKNpN4T6XwSiXbH6d2Z4H2/oqMsB+3JYFHoqv3pn8Ae9dAfo5AFs/HafadTOIK6LQktUz5MJquSN+D1DUKIJXtJlnlvSUG+gxsgZ22DK5U11JwszJIaBknYvpjT7NAAntElj8m/YuRmBqurqzgtAASXaVQUZWBQN7WuKzyrCqrBALb/n5tYvli/A/bgheQIo8aZgAAAABJRU5ErkJggg==)";
		Btn.setAttribute("label","JsTranslator");
		//Btn.setAttribute("tooltiptext","JsTranslator");
		//navigator.palette.appendChild(Btn);
		//status-bar  urlbar-icons addon-bar alltabs-button TabsToolbar go-button
        document.getElementById("urlbar-icons").appendChild(Btn);//地址栏
		
		Popup = document.createElement("menupopup");
		//Popup.setAttribute("position", "after_end");//适合放右边
        Btn.appendChild(Popup);
        
        for (let i = 0, menu; menu = mMenus[i]; i++) {
            let menuItem;
            if (menu.label == "-") {
                menuItem = document.createElement("menuseparator");
            } else {
            menuItem = document.createElement("menuitem");
            menuItem.setAttribute("label", menu.label);
            menuItem.setAttribute('class', 'menuitem-iconic');
            menuItem.setAttribute("oncommand", menu.command);
            menuItem.setAttribute("image", menu.image);
        }
        Popup.appendChild(menuItem);
        }
    }

    var mMenus = [
	    {
            label: "S-划词翻译", 
            command: "shangyi();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMpSURBVDhPJZPdTxRXGMZHcGZ2ZrVeNOnXRXvZtPGiJk2t1SjsAmLRsgu7y5IQmzQNqSE1ppZlP2Fx2V3YDz4sxWIU64K2UAiiFgtpbQLGmKjhqknTi9rrJv0bfn3P4eLJycyZ3/M+73nPGN7oZZzoFN6uSdyucfZ3i7oqOOGSaBQ3XGRfpIg3nMfuyGEHL2EFs1iBIUx/BsMV2NXwBHa4ivHJKHuCYwKP4QkVqQ8WME5fwmgTSGA7OLwLt6TZ25gSAwVHx7EEfrmnSu/EdQ6dnxKjAp7OPG+cLdI+NE1A5HQOYwYGsVoyGt7r0wYTUr2KE6lKzDGurCzxbGeD97+sUPt5hZmlGi/+fsSff23zSvcge5rSmL409QKbykCBTqSCGynr+MaZHO/1VTjUV+bew2Wqt2r8+nid4xdl35/Cbc5gN6nqSS3DFdgJl6XfUd75osqV1RU+LV/FOJ7iowsV/nnxmOd/bHG0bwzj2ADGYdHROJbApjoDK1TmpWiJ0sI8D7eX+e/fHYZv1OjOfcMvW6tS/T65a3NsPVmXRKtkvv2Otq9K1DcmsfySwCPjUtXfPTfB270lrq4ucm58huL8TXryk2LwgLXNZfpGJyl9f5OZH2sEYmXqGySFNhDYkXEZZ0Y40DXC/L0fiOSmOdhb4PPCZZ7s/MZPD5Y4daFIXYPEPxKTFgbkDiTkEBPKoIgbKlDXnuOI7nmbpzvrzC7eIDk9y/bTTdY2Frl9Z467m7d4KzQkE0hIdZEvLgYyazeUx2gdInt9jo1Hd3kzkiWaHte6//sa/VOzvH46xcGzOfa3qvGpQ4zr1bA78njkipqBYV7tGeG1Tpl1g0Q7IZsffs21lQU+y8nF+uCiHJwCEzLGXQPLJy3p+92hrmgW82RKNpN4T6XwSiXbH6d2Z4H2/oqMsB+3JYFHoqv3pn8Ae9dAfo5AFs/HafadTOIK6LQktUz5MJquSN+D1DUKIJXtJlnlvSUG+gxsgZ22DK5U11JwszJIaBknYvpjT7NAAntElj8m/YuRmBqurqzgtAASXaVQUZWBQN7WuKzyrCqrBALb/n5tYvli/A/bgheQIo8aZgAAAABJRU5ErkJggg==",
        },
		{
            label: "B-划词翻译", 
            command: "bingwordtran();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKaSURBVDhPfVJbSBRhFP6RwohKQ9PUtqASkyRJSc1rBAZdHgwKIXq0oh56sZCM6PJQWUaQERGZD+aDWFBBQRHddt2dnRks3EjcaFctyUu5W2m2uzPzdc6/6W4Q/fDtzJzzfed8/9kjtIpl+B/0quVw5SWiO1tA5+9K2195oVdy8F+wQd+0AurGNHiP7IX/fD20soxo0TgeOciiYAzcUa+ykTAd7uJUOPPmYbK/F3x6tudBLUmDRsIZvlDLs6CWZxIoQF2VwiSJnq256N1Tgdc1BRjpuon3jXVwrpsPjYvHaYRalglNiumu65PQd2gnAo4nCH8dg2lEYFkmwhPjGH/Uib6DNcRZJLmsYa1QyYZCdh1rEuBrOiqtfvfomHA+le9GOCSffCzLgv9ig+Syhl0IpSgVenU2fOfqYYZ+MQujDzrQs6sEQzeaMHDlJAavnkGIHHEBdsVcvXo13DQP8SJT4FNrs+xgTk9J0tjDTrzdvwPG1A+YkTCG21vgPXFA5ozpn5LLGvsqAdGdvxBvaksxeq9dEizTwIT9Md4d3o3ItyAsw8BwxzX00xA5Z5mm5LLGWZAM4aZ7OAsXw56TgJG7bbI6n5H7t+Gj+w5eP0vXOEVuJqPxO7cklzVu2guh0D2U0gwaylIKJsPffIz+d48kzxyLMD30AT7KMYe5UsMzcNGmubgITdVFCXvuHHjqtsF3oQH+S40YaDktn9qWHMrNJU56lEsa1kYd8AdjQwrcm1ciQsPjEw58QSQYkO8f2y7DQVupkG3Z8A+EUrwEElygKAUKLcjnrlYElOcIaq8QVF8i4HoG7/F96M5fIF3OagjCRT+zoCJO2gvuZF+bGAN9O1jMTeL5BMGCeHBQoRVlJ/HgzpJD+Rg/Fb8BRfqae7uMECUAAAAASUVORK5CYII=",
        },
		{
            label: "繁体转简体",
            command: "Fan2Jian();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADkSURBVDhPpZOxDYQwDEVvCM+RCZDomAKJjp4NaCgY4ZoMwAxswAS3Akv4YscJCQlRTld8RRH28+cbXu/Pif+oDqBHBABU85E8ywAO7BtAaFZcqNGc/WDuBmA14hTU3wDSTIXDiB1PXfm8AICdzgKCZi+Ztq+o6E6ufL1V5GCZW9PUYr+H9xgaTidlQwwbfXAPLp5DFACLmzabRREg64LGBGggNN25ucIsbUFsqnlLXNQBxKYrDlfYaXmFGgeU9JR8PA5wbSkFSAbRqnz6rT2LAN5AXMByEFYxg5JcPvEP9QMgpxO/jDuutEa92ggAAAAASUVORK5CYII=",
        },
		{
            label: "G-网页翻译",
            command: "googlewebtran();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFPSURBVDhPjZExS0MxFEajCOLqD9DdyT/h5q44OIiLm9BJEMRRwU0cWjoUunQQcRGpOKiD8EAfShWHakWeipRu6uBy5Vy9IXm21MAhTZrv3Js8x/h8b0tIp93yvL3ciR7qNfLhen1PSuXtSPD6fNNbQojAympBmV+YU2wN2VPjf4IwGIr6CuA8OdFA2kg0sLS+IcuJeGZORaaPPmTyQGS09qWoIHwwq0hHmxedvgKVhAIe0FrPh4+bmYKkq+Dh/jK6OyGDbuxr8NvCI8VMHH9w76FCU9+BLlhby0BlO0ehPwLCBg8I3BUQUHk3SbU6AvYIqyAMGwRMQAjh2mGqQQTIvIARhlkPzO77Nu2zEjTYm6g8yvDW1Y9gcPFMw8yAAMKKU9VrhU4QMEeCfNhAQNBaBh4bvIDRTcIBCMO2Z/zG40GYmXuOl1oRYzu3Huec+waxf3TWiFPEawAAAABJRU5ErkJggg==",
        },
        {
            label: "B-网页翻译",
            command: "bingwebtran();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEkSURBVDhPYyAW2LZv+g9lorAJApBiELZp2wimMTTbIAnMPXwDohiI5wHZUGEwwNAIAzBTc5YcAdPzjqBqBAGYGpDBMDZUCiI54dxHsBNzlh7FqhmZBqlD5oMZAWsf/nefdx7VZCBA5sMNQBdDdhYMQ+UxDEDmgwCyYTgBzAIYGywIBDCvwIHJfI//atPcwBgqhBOguwQDEGMIXmA8z/2/2nR3FENAfBSMbgnICyCNJkActMbzvyaaASCgCtTUf6r8f+JuP1QL/Fe7/289UgcXmHCq+7/+HEwDojYEgjW6bvVENQBk64aba1AMMJqLagBYM9AF0RuDML3gv8r9f8vhWrgAyED92QgDQIpBmkCaoULgMIEyIQDsf2A4gDCMD5bACxgYACt08k6OMYLWAAAAAElFTkSuQmCC",
        },
        /*
		{
            label: "D-划词翻译",
            command: "dict();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALlSURBVDhPbZJrSFNhGMdPKAhCg0gqU8ya7tLc1KnTuZ29WiF9iMRI0jQINEmXQUSNorSCMi9EltnSgUKGWzueM0XBPiQFpWBgYqXrtrxkmdvOLuaFIJ7OtlfT8gfPl/f//P/Py/u8xCqCiVvj4bzWCb643bVX1u44lGiyH4s3OXKIqolNuGd9hEZXpoLyXlBRbLOKZs1qhn1CMu4+snNuUGPxDqtpT6+wzZ7JtYYGHP+Q/tBmkOjHQNZuB6mRhTiuxC2TEFXTDzF3RyD5sQM0FredZFzPNLRjWFL/OgtbVwhSGUbMce0OkJlc/qDIs22Ais7NI+3V+e3nzSBotkEK5YZYwziQt/tGsO8vYqN7XwbjWkw0e0Bs+Aw7juggQqKI92nxBbocTW0PiFqmwDdE0mQF+Z2B437jMjz9BB/RrEdOeUDQ8AZSy2sAS354Na/4ySY7yLlbiFq+gvgyBYQ8JxzLvoAffMQ4Z1M6lgNqfQHBAdXPRpJmh9IZLwibPkJs0Q0ISc2OxhoHtyrUwU6quIb1AkJavkdzjzigoLkB995CUln1mhv6QYxrWkGvCQgKKAQhNbEHScb5yfdGwqYPoNTp/w9IoZyl8VyD6P4oF1C3JiCJchWhDpfXtyVJ2wwIKiwgKLmpxvIKPNTltSW0foFUXfPaCXXTYYhhv8nN3Jq5f7KlvBXQyUtLWMXUWcPITk9fsnEGYio6QXTmAcKKf0sk7RlKMDkh6iIDWzPzITm3WIvlAInG2TzEuG0yEwu7Gt6BunGA5o43EPVTkekWjx51Ly75fqbo8CmISN0jC7gwUno+W9290KW0/ASpeQ5k1Byg7gWvsvd3dXrPr9YM2rkobByF0NwrgPJLJrEtgPzRdDFpGAFB9XOIrn4BO/31EgS1/SCsegoRWj1syz4NqoJyUOfkWzYrkQhbMQcqw9JKr18jC7WDmqNlVk1B2Zi/CrVWTd6J92lZ+yt5uxNjcPcqCOIP0FCDg77I/8oAAAAASUVORK5CYII=",
        },
		{
            label: "Y-网页翻译",
            command: "youdao();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAN5SURBVDhPJZNZT1sHEIXvv+lrpf6BSn1tJdSqVdIFNU0jFDYREjCYi9lCFmwXcAoJJbRNIDZgIGFrKOCUPSwNBGOMjVd8vYJtjA0ECPbXGzrSPMwZnZmjWYS94wze2DucHoloNEYodkDi4JBUbA/nTohgKk049f5/P8oQeQfBgzNCchxKnSO44yfYXRLe4B72QIJ1X5wJe4w16YBIKMK2fw/P/jm+xHs5H8fiCRM4BJ/MkxJnCCsbNhxONxaZ6IwkZXKUzpUwrTN+lt0ytu2U8RTR1CnB3RiTEybe2P24k2CLHCNYLWYWLF5ervvpXJT4ZdJDs8lL0z9ufp0LYJeLB30+Mpk08UQKt1dC/0zPq3Unlv0Mgt28Rv/0JqLRTHWfmdpRG5ppD01LO9TPS1i9fhxbVj7Y4dEx/kiCNbMVrVrDxJoLYen1a4ZnzGTr5inpWqVm0kHHepgBa4R2Z4KV9bc4bHbSGUin08TiCSwOicGXJq5c/gZB1zfB0sIitd1rfN4whWLMxogtylzwkOndY0aH/iIW2+fk5Izz8/TFtqZWnbT89oTC0kqEqgkXYmsnxp5+mkc3Uc5JdEnHmEKn9He1stxbR+okTTJ5SDC0i3F0iu6RWbKyvrpQK5TKQ7s7aeN2XT31ohJtYyO372tozP2CGfUneB5+jPmVEYcURd/7gqY/hii6KfJlYQV1bw4QSsZd9M9vEg6FmZ2bx9jdwxPDIB3V19i+8xGutk+xaC+zsb6JRteOtu05l769Qv7TSVRTPoSfKxvoMAxh9/jlKR8RiETZckqMTL9l+M53BLSf4crNYtrQi0rdRtXddr7+8TrKcQdKkxvhmuZ3quruM7tqI7K7R0g+FrvDw9LaFgbjc14oLzFwIw99zyCK6mZuljXww61qKhf3qJjaQVC9SZJbXkv/4JjceYctu5OR8Vn0A3/zqHOYet1TlPdaUKjUlNc/Jq+wlmxRjWo1hXI2gFBrzZDbYkSj1mJatmIcW0Q/OMvjZ0PoHhnQPuji3gMDVeouipXNZH9/laI/xxCX96n4UEBcilNmclFQrKCp+SGisoqCG6XkFJeRU1JJzi2RvCIF+QXlXL1ehMI4h2olQcVcCHEhjFBhclIpy8mv1/FTfjElA8uo5oPUbZxQYzmjZuMUlfwTJe19qKZ3EP9NXkgX58NULOzyH7U7LAdvsKXgAAAAAElFTkSuQmCC",
        },
		{label: "-",},//我是分割线
        {
            label: "QQ-云词典",
            command: "qqdictionary();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMJSURBVDhPjZNrSNRZGIf/G26atJVlZas1QbFUtlS7pWRZYZRFF8ztpgVBUjabO6VmpSba3W6W5CWUdHPcUZupNBRCl8KxyEvp2I42pjPjehknR3G8ZFEfnpwpGoOifvB8OO8578N7DhzBEnf/OOlPy+IY55f0XThtTWdKglpqbbbEdcNp7H8PYbrkDm5iORNDi3GRFOG8f4iQIlzECtz+lDNT8g9LQ86wZYe/RcDHdkGY6BuH3cJwZu65weSgXCZI7uG6T878gxlEXDxO3q1IqkvD6KgOYrD+D3oLZ1vpUUw7/UkgzD7AHLGUSXtzWXMkkevZ0XRojvCmJRxzcwx5BZFITsWyUhyPs3cECSnB9OSLPkwh8o1irNdRdh2LpfRBDO/aJLxrFXO/NJakwmL84guZESTj58BsxvulICyKtl7BrBCprIIFW6KQ3Y7mdeM2unQhVFeexGw24nWxilGBmWy/nM/DhkaU6mYy7lXwg8dh2xt0V/wWqC3zp0/lw/Xbkcgf1ZKl1NM98Ja1N//H9dhR9srOE5xcxLqTeTxpNGLnc9Ym6K3xLulU+bEpOo6oHBV3NWZE55TI1F109L3GI6MRnwv5yGs70RnNtHX1Yx+QZRMMqFbjHZaIsF6OutXMY62RMp2JypZu9KZXNJgG8M3WYuodZG5CzVCtn0mHiodNULnwiePmTApqDJTUGXEKL2HUQSWOoeXMS9bQYOwn7z8Tj5t7MfQMonnZh+JZp01gKvtlv+OmVMZISliaUs+sS2oWXa3DM/k57kkaPDOaWHJDh0eWnuW5zcxI01qbPwkssfdPY3RElVXgnlDPvEQN81Oa+DVdj6e0hcU5bXgp2vEp6GCurB1Rmu5zwYi1qYwIVuIU9RS7AxWMPFSFY0wt4+Kf43xFi8s1PW5/tyLKNjBN2s7kofXUS3XDBKvicdhwGYfNqTgEZNrYKf0yu2SM/uvfYYKN5yivKkf1TMWLphcYjIavYtm3nLuamWMTCCtCT1gk38IuIJ0fd+cwct9dhBVhQ99ZEN4DVHlSaAB4iaAAAAAASUVORK5CYII=",
        },
		*/

	];
    function updateToolbar() {
        var toolbars = document.querySelectorAll("toolbar");
        Array.slice(toolbars).forEach(function (toolbar) {
            var currentset = toolbar.getAttribute("currentset");
            if (currentset.split(",").indexOf("JsTools-menu") < 0) return;
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
/*=================::::::::::::::::::::::::::::::::功用函数列表::::::::::::::::::::::::::::==================*/
//尚译
function shangyi(){
loadURI("javascript:void((function(){if(window.Como&&window.Como.someyi){Como.someyi.open()}else{var%20a=document.createElement('script');a.setAttribute('type','text/javascript');var%20b=document.charset?document.charset:document.characterSet;var%20c=b.toLowerCase()=='gb2312'?'pack-gb2312.js':'pack-utf8.js';a.setAttribute('src','http://yi.comsome.com/'+c);document.getElementsByTagName('head').item(0).appendChild(a);Text.prototype.tagName='#text'}})())");}
//Dict
function dict(){
loadURI("javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://dict.cn/hc/init.php');%20document.body.appendChild(element);})())");}
//Bing划词
function bingwordtran(){
loadURI("javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}");}
//Bing网页翻译
function bingwebtran(){
loadURI("javascript:(function(){var%20s%20=%20document.createElement('script');%20s.type%20=%20'text/javascript';%20s.src%20=%20'http://labs.microsofttranslator.com/bookmarklet/default.aspx?f=js&to=zh-chs';%20document.body.insertBefore(s,%20document.body.firstChild);})()");}
//繁体转简体
function Fan2Jian(){
	content.document.documentElement.appendChild(content.document.createElement("script")).src = "http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn2.js";}
//谷歌网页翻译
function googlewebtran() {
loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200");}
/*/有道网页
function youdao() {
loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())")}
//QQ云词典
function qqdictionary(){
loadURI("javascript:void((function(d){if(!!d){d.toggle();return;};var%20src='http://dict.qq.com/cloudgetjs';var%20e=document.createElement('script');e.setAttribute('src',src);document.getElementsByTagName('head')[0].appendChild(e);})(window.QQCloudDict))");}*/
