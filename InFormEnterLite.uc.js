// ==UserScript==
// @name           InFormEnter Lite
// @include        chrome://browser/content/browser.xul
// @charset        UTF-8
// ==/UserScript==
(function(){
  var mMenus = [
    { label: "outlook",text: ""},
	{ label: "Gmail",text: ""}, 	
	{ label: "sep"},
	{ label: "谢谢", text: "亲，非常感谢你的无私帮助！！！"},
	{ label: "顶起", text: "谢谢楼主的分享!这个绝对要顶！！！"},
	{ label: "楼上", text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283"},
	{ label: "楼下", text: "坐等楼下高手解答……⊙_⊙"},
	{ label: "围观", text: "不明真相的围观群众……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283"},
	{ label: "嘿嘿", text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606"},
	{ label: "我哭", text: "\uFF5E\u003E\u005F\u003C\uFF5E\u0022\u002C\u0020\u0022\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D"},
	{ label: "纯支持", text: "纯支持下……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283"},
	{ label: "不客气", text: "不客气，大家互相帮助……\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D"}
  ];

  init: {
    var contextMenu = document.getElementById("contentAreaContextMenu");
    var separator = document.getElementById("context-sep-undo");
    
    var menu = document.createElement("menu");
    menu.id = "ife-context-menu";
    menu.setAttribute("label", "InFormEnter");

    contextMenu.insertBefore(menu, separator);
    var menuPopup = document.createElement("menupopup");
    menu.appendChild(menuPopup);
    
    for(var i = 0, menu; menu = mMenus[i]; i++){
      var menuItem;
      if(menu.label == "sep"){
        menuItem = document.createElement("menuseparator");
      }else{
        menuItem = document.createElement("menuitem");
        menuItem.setAttribute("label", menu.label);
        menuItem.culMenu = menu;
        menuItem.addEventListener("command", pasteText, false);
      }
      menuItem.id = "ife-context-menu-" + i;
      menuPopup.appendChild(menuItem);
    }
    contextMenu.addEventListener("popupshowing", setMenuDisplay, false);
  }

  function pasteText(aEvent){
    var text = aEvent.target.culMenu.text;
    if (text!="undefined"){
      //goDoCommand('cmd_selectAll');
      //goDoCommand('cmd_delete');
      Cc["@mozilla.org/widget/clipboardhelper;1"]
        .getService(Ci.nsIClipboardHelper).copyString(text);
      goDoCommand("cmd_paste");
    }
  }

  function setMenuDisplay(){
    if (gContextMenu != null && gContextMenu.onTextInput){
      document.getElementById("ife-context-menu").hidden = false;
        for (var i = 0, menu; menu = mMenus[i]; i++)
          document.getElementById("ife-context-menu-" + i).hidden = false;
    }else{
      document.getElementById("ife-context-menu").hidden = true;
    }
  }
})();