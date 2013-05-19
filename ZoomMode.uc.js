// ==UserScript==
// @name                 ZoomMode.uc.js
// @namespace            ZoomMode@gmail.com
// @description          左键点击切换缩放模式，右键垂置
// @charset              UTF-8
// @author               defpt
// @version             1.0.0  2013.04.25 
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function (){
  var statusbarpanel = document.createElement("statusbarpanel");
	statusbarpanel.setAttribute("id", "ZoomMode");
	statusbarpanel.setAttribute("class", "statusbarpanel-iconic");
	statusbarpanel.setAttribute("label","ZoomMode");
	statusbarpanel.setAttribute("tooltiptext","左键切换缩放模式|右键垂置");
	statusbarpanel.setAttribute("onclick", "ZoomManager.toggleZoom();"); 
	statusbarpanel.addEventListener("click",function(event){event.preventDefault();event.stopPropagation();if(event.button==2) FullZoom.reset();}, false);
	statusbarpanel.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALHSURBVDhPjZNbTJJhGMfJSmet5pUX3XTVhd41bszNeZHNA+Us4So3muZmZRFhLKcMD1hKSYkKKcuz5CBPwJyhoDBLP5d4yJQKUczMQyrMOU3h+wfzM+dmq9/2XLx7nt//2ftuL20PlWrcX9NLXND2WvJb9IS6UWdSlTdo8oTF1WEsodCfGjuc1taeoLfvxkTdxMSivt9Kdg3YoDVPoqatj3wiVy9wc0vz2GxOEDV+kJKOjgCdefixgZjcGv6yAtv8DuwLHnydd2PUvgFl5ziyihu30gUSUUzM3QBK26de2xuhM40sj9lW4ViCt0jUd7mg7HZixnsed2xD0TYGvrhm6cZ9QQSl7VPTbCjq7Bsn53564FiGdzMJvnwWAsUMZhZJTHvLNLYO0UsteeeRWOxV/HZNCmlNu8Y8NIVFJ9BkdCGnag6JmaNIyCDALbagsmUKFrsbcjUBTk6JNiyMGUipu+RI6rRGYhKr6yQa9CvIlNtxhduPuPQe3Cp4jxdKK0ZnPKjVDuNhQVkHnX75BKXuwhXJJK91ZqxverCxRWJt3Q2OeBAZkkHMr7hh917ho8ON2nYC2YUyKS0y8hil7nJb8Oxigbxp1T67AI8H2NomoWi24lWrFcsu3xsA/Z9WUKnqWuNmF8VR2j5MLjfwQV5pSXmjZtvxfRE7bg82f5FwbZD4sUpixOaEWv8BzxWqrqtJacGUdpCkNF7wvVxpWZFM6dQZCVgmpjE08Q0G4jPUnQNOoaTKIpYp59nJqUomkxlKaQe5lJR0MpUvYmSJKyqeVqqMpXUao7T6jUJYVJ6QwuGHlMgqh1JSbpIMBsP01xAfdDr9eHx88qmYmOunQ0NDfX/gCIvFOsrj8a4VFhbOstnsf4cchi+Ew+H8CYmOjjaEh4efodr/x15Ifn7+VGxsrDkkJOQs1fp/fCGJiYnno6KiztFoNL/frxywq3uzEe4AAAAASUVORK5CYII=)";
		//status-bar  urlbar-icons addon-bar alltabs-button TabsToolbar go-button toolbar-menubar
    document.getElementById("urlbar").appendChild(statusbarpanel);
})();
