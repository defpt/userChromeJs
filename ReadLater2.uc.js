// ==UserScript==
// @name           readLater2.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    稍后阅读，标记链接或当前网页以便稍后阅读
// @author         Alice0775
// @include        main
// @charset        UTF-8
// @version        v2013.3.12
// @note           LastMod 2013.03.12 by defpt
// @note           v2009.07.31 by Alice0775
// ==/UserScript==

/******外部接口列表******
readLater.addData(url, title);               添加url
readLater.openURL(readLater.getData().url);  阅读最后一项
readLater.allOpen();                         全部打开
readLater.allclear();                        全部移除
readLater.delData(url);                      移除url
readLater.getData();                         {url,title}对象从底部列表中移除
*/
readLater = {
  AUTODEL: true,
  MENUINDEX:3,
  arrTAB : [],
  arrSCX : [],
  init: function(){
    const kXULNS =
         "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
    LOCALE = (Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).getCharPref("general.useragent.locale")).indexOf("zh")==-1;
    this.TOOLTIP      = LOCALE?"Read Later":"稍后阅读";
    this.CLEARLABEL   = LOCALE?"All Remove" :"全部移除";
    this.ALLOPENLABEL = LOCALE?"All Open"  :"全部打开";
    this.ADDLABEL     = LOCALE?"Read this later!":"标记！稍后再看 ^0^";
    this.CLEARWARNING = LOCALE?"Do you want to remove all?" :"全部移除？";
    this.OPENALLWARNING = LOCALE?"Do you want to open all?" :"全部打开？";

    this.popup= function(){}
    var statusbarpanel = document.createElementNS(kXULNS,"statusbarpanel");
    statusbarpanel.setAttribute("id","readLater");
    statusbarpanel.setAttribute("class","statusbarpanel-menu-iconic");
    statusbarpanel.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANSSURBVDhPZZN5SNNhHMZfNcdci4pqrcP5R1PEY6IzEc2sRjo7LLNbTdKlZmpgl2W4yrLCI0u7aDmKDsws01oKNa1M09ZBSUmXWSZlsCz92THn03c26PrCAz94eT6/7/O8vMwy0MbyTedVod9OLMzs04Sn9xyZGd29f4qyO9d3cleOzKVd7Ti+be3wEW2xjH9uEbMbNP05P6o3+vUbNO/7Gw4M9OuzB0y69aYfFYl930ujjd9Ozu/gNMqnPYeDGj8V+F7pKnAu6dxpFwYwG6udMZNug8J87ziHu0eA+jxArwaq04FLq4CypcCpOUBJMFDsjq9FrmjL4FcbEpjAaidAZZrC3FjEoWEfULcDqNkAVK0GyqOBM/MA7QwyewDZDujbNhyta3h1LclMaLVbAAkK861cDjdzgGubAV0KUBELnIsEToYAh7zILACyGLgsIVoS/wVcjCNAHgcDRbiRBVxV0fqLaX2KqpUDe4XANjYI6N3Kx8NE238AZVHUgYZDdzvw6SXw9Ax1sAwo9aO/DwPyyJxDIkhvpj0exP8HiFSY9RkcmijCQ+rhowFouwCcdQSOkrGYlP8L0rPFFoZ4m7ravwHzFOY7+RyMrcDrSqAxEXinA5pTqQNb4JgVksvwZSvDnThWV7vICkhKihCZzioV5utpHO7vIeM14JUWuD0X+EDfl8QEIbNlk0KGz2qG+tg/AOGRs+MeH5wVb9YT4PlpugUq7kMtbaGgKDVUahBFIfNxUhEBtjPoooY8WR7mGxYcHCxmE2Wy0L2pIRrj5RQTOm/SDQQAb8sBQzjwvgxoiqAyGQZKGIz5Q6BPFSIjdFSv3MO5SiwWFzN70QTZNH/3wAKV14tHuyUDLXuEaD4aCH2hMy5r10CXJ0flJh4OrXTArihHXM90RU3y2E5ViOsqkUgUYUnBozBj3KTjotwlQ1tjlC5vLhQu76g9Nr+9WTu9y5A/qmdJAN8Y5GLfXrrFr7cl26nvRMyYZ8oAmdrJyUk82AON5YWNFggECWtTV6c36atCNdkrpham+cxJXuB2cLKbaJ2PxG6Gv+tIrdJnbLm/h0QtlTpO+mX9PTY8Hs+Z1lJ5enomeHt7p8jl8k1SqTSJz+dL6HwoSUQaSbI+acZ+AmOPCuJmaEjZAAAAAElFTkSuQmCC");
    statusbarpanel.setAttribute("tooltiptext",this.TOOLTIP+"[0]");
    //statusbarpanel.setAttribute("style","padding: 0px 2px;");
    statusbarpanel.setAttribute("onclick","if(event.button==0) readLater.popup();");
    statusbarpanel.style.opacity = '0.5';
    document.getElementById("urlbar-icons").appendChild(statusbarpanel);

    var menupopup = document.createElementNS(kXULNS,"menupopup");
    menupopup.setAttribute("id","readLater-popup");
    menupopup.setAttribute("menugenerated","true");
    menupopup.setAttribute("position","before_start");
    menupopup.setAttribute("onpopupshowing","readLater.mainPopupShowing(event)");
    statusbarpanel.appendChild(menupopup);

    var menuitem = document.createElementNS(kXULNS,"menuitem");
    menuitem.setAttribute("id","readLater-Clear");
    //menuitem.setAttribute("accesskey","c");
    menuitem.setAttribute("label",this.CLEARLABEL);
    menuitem.setAttribute("tooltiptext",this.CLEARLABEL);
    menuitem.setAttribute("oncommand","readLater.allclear(true);");
    menupopup.appendChild(menuitem);

    menuitem = document.createElementNS(kXULNS,"menuitem");
    menuitem.setAttribute("id","readLater-allOpen");
    //menuitem.setAttribute("accesskey","o");
    menuitem.setAttribute("label",this.ALLOPENLABEL);
    menuitem.setAttribute("tooltiptext",this.ALLOPENLABEL);
    menuitem.setAttribute("oncommand","readLater.allOpen()");
    menupopup.appendChild(menuitem);

    menupopup.appendChild(document.createElementNS(kXULNS,"menuseparator"));

    menuitem = document.createElementNS(kXULNS,"menuitem");
    menuitem.setAttribute("id","readLater-addList");
    //menuitem.setAttribute("accesskey","R");
	menuitem.setAttribute("class","menuitem-iconic");
    menuitem.setAttribute("label",this.ADDLABEL);
    //menuitem.setAttribute("tooltiptext",this.ADDLABEL);
    menuitem.setAttribute("oncommand","readLater.addList()");
	menuitem.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHwSURBVDhPrZPNS5RRFMZfRozUNM1qdi6ENEFCMAiJPqCopZR/Q8si3LhtEbgTzIXi5yhlk32YzUATbYJMgjBI0BApyhYKgqaB4ce5T8+554La6EovvMycee/zu895zp3oQJb0HYf0lkC6DkO6CyF9pZD+OCRxwr7v8QQ5ASp+WAZ5dQUydIawY5COGGFHDLSLWJ8gJ0BPTl+DX7IOLE7BfWmBPK0hKMcEu7gJcgK6CyDD54HfM8D6ioF0bazCfW6G9LCt3uIsSJCHDHqOQtoj+0xfh/uRApx4jvv1luKTWZAgVwfs9Vkt3EwS7mMTZLAC8oCwNw3A6rxBZl9bJnpYFqArD5K66jdyK3PYgJvqpKNc5nB2C/LpnmUSgg1yAtTao3K4D3fhvj8HNv+aYO49ITG4zE1fY20Z8qTaRs1WgjxkoJA2jq6V1kcuAX9mvcZNtvP3iOBhq8fv24gT8f8A7M+9uwU30coLlW+Q0I4MnvLB+rUwbkHvDJFjfFFnd4DLQ+jEfRuyeqzRi7QFbU+SVayLtgGU+LiStn+aYPS22R69Y/X0gB8xlr76Wl5eoMu8bYCEtSDJ07R+kfRwcWjdZW7Q3Tl/ooxchmTq7drzfZBrBpyrQnST9u9nHYLtPEQ4W9Ra32mt/x3WQb6fFUX/ABHeUN9sfufSAAAAAElFTkSuQmCC");
    //document.getElementById("contentAreaContextMenu").appendChild(menuitem);
	document.getElementById("contentAreaContextMenu").insertBefore(menuitem, document.getElementById("context-savepage"));

    statusbarpanel.setAttribute("ondraggesture","nsDragAndDrop.startDrag(event, readLater)");
    statusbarpanel.setAttribute("ondragover","nsDragAndDrop.dragOver(event, readLater)");
    statusbarpanel.setAttribute("ondragexit","nsDragAndDrop.dragExit(event, readLater)");
    statusbarpanel.setAttribute("ondragdrop","nsDragAndDrop.drop(event, readLater)");
    this.restoreForWindow();
    this.statusIcon();
    this.addPrefListener(readLater.readLaterPrefListener);
    gBrowser.addEventListener("load", readLater.loadListener, true);
  },

  uninit: function(event){
    this.removePrefListener(readLater.readLaterPrefListener);
    gBrowser.removeEventListener("load", readLater.loadListener, true);
  },

  mainPopupShowing: function(event){
    const kXULNS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
    var menupopup = document.getElementById("readLater-popup");
    for(i = this.MENUINDEX, len = menupopup.childNodes.length; i < len; i++){
      menupopup.removeChild(menupopup.lastChild)
    }
    for(var i = 0; i < this.arrURL.length; i++){
      var menuitem = document.createElementNS(kXULNS, "menuitem");
      menuitem.setAttribute("url",   this.arrURL[i]);
      menuitem.setAttribute("title", this.arrTTL[i]);
      menuitem.setAttribute("scroll", this.arrSCRL[i]);
      menuitem.setAttribute("label", this.arrTTL[i]);
      menuitem.setAttribute("tooltiptext", this.arrURL[i]);
      menuitem.setAttribute("oncommand", "readLater.openURL(this.getAttribute('url'),this.getAttribute('scroll'))");
	  menuitem.addEventListener('click',function(event){event.preventDefault();if(event.button==2){readLater.delData(this.getAttribute('url'));menupopup.removeChild(this);}},false);
      menupopup.appendChild(menuitem);
    }

    if(menupopup.childNodes.length < this.MENUINDEX + 1){
      menupopup.childNodes[0].setAttribute("disabled", true);
      menupopup.childNodes[1].setAttribute("disabled", true);
      menupopup.childNodes[2].setAttribute("hidden",   true);
    }else{
      menupopup.childNodes[0].setAttribute("disabled", false);
      menupopup.childNodes[1].setAttribute("disabled", false);
      menupopup.childNodes[2].removeAttribute("hidden");
    }
  },

  statusIcon: function(){
    var len = this.arrURL.length;
    var statusbarpanel = document.getElementById("readLater");
    statusbarpanel.setAttribute("tooltiptext", this.TOOLTIP + "[" + len + "]");
    statusbarpanel.style.opacity = ( len > 0) ? '1' : '0.5';
  },

  _getFocusedWindow: function(){
    var focusedWindow = document.commandDispatcher.focusedWindow;
    if (!focusedWindow || focusedWindow == window)
      return window._content;
    else
      return focusedWindow;
  },

  addList: function(event){
    var url   = (gContextMenu.onLink) ? gContextMenu.linkURL
                                      : this._getFocusedWindow().content.document.URL;
    var title = (gContextMenu.onLink) ? gContextMenu.linkText()
                                      : this._getFocusedWindow().content.document.title;
    var scroll = (gContextMenu.onLink) ? 0 : this._getFocusedWindow().content.scrollY;
    this.addData(url, title, scroll)
  },

  addData: function(aURL, aTitle, scroll){
    var dd = new Date();
    var lbl = dd.getHours() + ":" + dd.getMinutes();
    aURL = aURL.replace(/^\s+/,'').replace(/\s+$/,'');
    for(var i = 0; i < this.arrURL.length; i++){
      if (aURL == this.arrURL[i]) return;
    }
	aTitle = "["+lbl+"] "+aTitle;
    if (aTitle.length > 30) aTitle = aTitle.substr(0,30) + "...";
    this.arrURL.push(aURL);
    this.arrTTL.push(aTitle);
    if(!!scroll)
      this.arrSCRL.push(scroll);
    else
      this.arrSCRL.push(null);

    this.saveForWindow();
    this.statusIcon();
  },

  openURL: function(url,scroll){
    var URIFixup = Components.classes['@mozilla.org/docshell/urifixup;1']
                   .getService(Components.interfaces.nsIURIFixup);
    var uri = URIFixup.createFixupURI(
      url,
      URIFixup.FIXUP_FLAG_ALLOW_KEYWORD_LOOKUP );
    try{
      if(gBrowser.contentPrincipal)
        urlSecurityCheck(uri.spec, gBrowser.contentPrincipal,
                         Ci.nsIScriptSecurityManager.DISALLOW_SCRIPT);
      else
        urlSecurityCheck(uri.spec, gBrowser.currentURI.spec,
                         Ci.nsIScriptSecurityManager.DISALLOW_SCRIPT);
      var loadInBackground = true;
      try {
        loadInBackground = this.getPref("browser.tabs.loadInBackground",'bool',true);
      }catch(ex) {}
      var newTab = gBrowser.loadOneTab(uri.spec, null, null, null, loadInBackground, false);
      this.arrTAB.push(newTab)
      if(!scroll)
        this.arrSCX.push(0);
      else
        this.arrSCX.push(scroll);
    }catch(e){}
    if(this.AUTODEL)
        this.delData(url);
  },

  getData: function(){
    if(this.arrURL.length < 1){
      return null;
    }else{
      var url   = this.arrURL.pop();
      var title = this.arrTTL.pop();
      var scroll = this.arrSCRL.pop();
    }
    this.saveForWindow();
    this.statusIcon();
    return {url:url, title:title, scroll:scroll};
  },

  delData: function(url){
    var len =this.arrURL.length;
    if(len < 1){
      return;
    }else{
      url = url.replace(/^\s+/,'').replace(/\s+$/,'');
      var arr1 = this.arrURL;
      var arr2 = this.arrTTL;
      var arr3 = this.arrSCRL;
      this.arrURL = [];
      this.arrTTL = [];
      this.arrSCRL = [];
      for(var i = 0; i < len; i++){
        if(arr1[i] == url) continue;
        this.arrURL.push(arr1[i]);
        this.arrTTL.push(arr2[i]);
        this.arrSCRL.push(arr3[i]);
      }
      this.saveForWindow();
      this.statusIcon();
    }
  },

  allOpen: function(){
    var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                  .getService(Components.interfaces.nsIPromptService);
    var result = prompts.confirm(window, "Read Later", this.OPENALLWARNING);
    if(!result) return;
    for(var i = this.arrURL.length - 1; i > -1; i--){
      this.openURL(this.arrURL[i], this.arrSCRL[i]);
    }
  },

  allclear: function(warn){
    if(warn){
      var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                    .getService(Components.interfaces.nsIPromptService);
      var result = prompts.confirm(window, "Read Later", this.CLEARWARNING);
      if(!result) return;
    }
    this.arrURL = [];
    this.arrTTL = [];
    this.arrSCRL = [];
    this.saveForWindow();
    this.statusIcon();
  },

  restoreForWindow: function(){
    this.arrURL = [];
    this.arrTTL = [];
    this.arrSCRL = [];
    var retrievedData = this.getPref("userChrome.readLater", "str", "");
    if(retrievedData){
      var arr = retrievedData.split(" ");
      var i = 0;
      for(var k = 0; k < arr.length; k++){
        this.arrURL[i] = decodeURI(arr[k]);
        k++;
        this.arrTTL[i] = decodeURI(arr[k]);
        i++;
      }
    }
    var retrievedData = this.getPref("userChrome.readLater.scroll", "str", "");
    if(retrievedData){
      var arr = retrievedData.split(",");
      for(var i = 0; i < arr.length; i++){
        this.arrSCRL[i] = decodeURI(arr[i]);
      }
    }

  },

  saveForWindow: function (){
    var aStringValue = "";
    for(var i = 0; i < this.arrURL.length; i++){
      aStringValue = aStringValue + " " + encodeURI(this.arrURL[i]);
      aStringValue = aStringValue + " " + encodeURI(this.arrTTL[i]);
    }
    this.setPref("userChrome.readLater", "str", aStringValue.replace(/^ /, ""));
    var aStringValue = "";
    for(var i = 0; i < this.arrURL.length; i++){
      aStringValue = aStringValue + "," + encodeURI(this.arrSCRL[i]);
    }
    this.setPref("userChrome.readLater.scroll", "str", aStringValue.replace(/^,/, ""));
  },

  getPref: function(aPrefString, aPrefType, aDefault){
    var xpPref = Components.classes['@mozilla.org/preferences-service;1']
                 .getService(Components.interfaces.nsIPrefService);
    try{
      switch (aPrefType){
        case 'complex':
          return xpPref.getComplexValue(aPrefString, Components.interfaces.nsILocalFile); break;
        case 'str':
          return xpPref.getCharPref(aPrefString).toString(); break;
        case 'int':
          return xpPref.getIntPref(aPrefString); break;
        case 'bool':
        default:
          return xpPref.getBoolPref(aPrefString); break;
      }
    }catch(e){
    }
    return aDefault;
  },

  setPref: function(aPrefString, aPrefType, aValue){
    var xpPref = Components.classes['@mozilla.org/preferences-service;1']
                 .getService(Components.interfaces.nsIPrefService);
    try{
      switch (aPrefType){
        case 'complex':
          return xpPref.setComplexValue(aPrefString, Components.interfaces.nsILocalFile, aValue);
          break;
        case 'str':
          return xpPref.setCharPref(aPrefString, aValue); break;
        case 'int':
          aValue = parseInt(aValue);
          return xpPref.setIntPref(aPrefString, aValue);  break;
        case 'bool':
        default:
          return xpPref.setBoolPref(aPrefString, aValue); break;
      }
    }catch(e){
    }
    return null;
  },

  addPrefListener: function(aObserver) {
      try {
          var pbi = Components.classes['@mozilla.org/preferences;1']
                    .getService(Components.interfaces.nsIPrefBranch2);
          pbi.addObserver(aObserver.domain, aObserver, false);
      } catch(e) {}
  },

  removePrefListener: function(aObserver) {
      try {
          var pbi = Components.classes['@mozilla.org/preferences;1']
                    .getService(Components.interfaces.nsIPrefBranch2);
          pbi.removeObserver(aObserver.domain, aObserver);
      } catch(e) {}
  },

  readLaterPrefListener:{
      domain  : 'userChrome.readLater',
      observe : function(aSubject, aTopic, aPrefstring) {
          if (aTopic == 'nsPref:changed') {
              setTimeout(function(){
                readLater.restoreForWindow();
                readLater.statusIcon();
              }, 0);

          }
      }
  },
  getTransferData : function(aContentType, aDragSession){
    const Cc = Components.classes;
    const Ci = Components.interfaces;
    var transfer = Cc["@mozilla.org/widget/transferable;1"].
        createInstance(Ci.nsITransferable);
    transfer.addDataFlavor(aContentType);
    aDragSession.getData (transfer, 0);
    var Data = {};
    Data.dataObj = new Object();
    Data.len = new Object();
    try{
      transfer.getTransferData(aContentType, Data.dataObj, Data.len);
    } catch (ex) {}
    return Data;
  },

  getSupportedFlavours : function () {
    var flavours = new FlavourSet();
    flavours.appendFlavour("text/unicode");
    return flavours;
  },

  onDragStart: function (event,transferData,action){
    var tartget = event.target;
    if(/menuitem/i.test(tartget.nodeName)){
      if(!tartget.hasAttribute('url')) return;
      var url   = tartget.getAttribute('url');
      var title = tartget.getAttribute('title');
      var o ={url:url, title:title};
      readLater.delData(url);
    }else
      var o = readLater.getData();
    transferData.data=new TransferData();
    if(o){
      transferData.data.addDataForFlavour("text/x-moz-url", o.url + "\n" + o.title);
      transferData.data.addDataForFlavour("text/unicode", o.url + "\n" + o.title);
      transferData.data.addDataForFlavour("text/html", '<a href="' + o.url + '">' + o.title + '</a>');
    }
  },

  onDragExit: function (event, aDragSession){
    document.getElementById("readLater-popup").hidePopup();
  },

  onDragOver: function (event, flavour, session) {
    var transData = readLater.getTransferData(flavour.contentType, session);
    var DragData = transData.dataObj.value.
            QueryInterface(Ci.nsISupportsString).
            data.substring(0, transData.len.value);
    event.target.setAttribute("dragover", "true");
    return (session.canDrop = /(^h?.?.ps?:\/\/)|(^ftp:).+$/i.test(DragData));
  },

  onDrop: function (event, dropdata, session) {
    if (dropdata.data != "") {
      var dat = transferUtils.retrieveURLFromData(dropdata.data, dropdata.flavour.contentType).split('\n');

      if( /(^h?.?.ps?:\/\/)|(^ftp:)|(^file:\/{3}).+$/i.test(dat[0]) ){
        dat[0] = dat[0].replace(/^(ttp|tp|h..p)/i,'http');
        if(dat.length==2 && dat[1] && dat[1]!=''){
         readLater.addData(dat[0],dat[1]);
        }else if(dat.length == 1){
         readLater.addData(dat[0],dat[0]);
        }
      }
    }
    event.stopPropagation();
  },

  debug: function(aMsg){
    const Cc = Components.classes;
    const Ci = Components.interfaces;
    Cc["@mozilla.org/consoleservice;1"]
      .getService(Ci.nsIConsoleService)
      .logStringMessage(aMsg);
  },


  loadListener: function(event){
    if (event.originalTarget instanceof HTMLDocument) {
      var doc = event.originalTarget;
      if (event.originalTarget.defaultView.frameElement) return;
      var doc = event.originalTarget;
      var index = gBrowser.getBrowserIndexForDocument(doc);
      if(index < 0) return;
      var xBrowser = gBrowser.getBrowserAtIndex(index);
      for(var i=0;i<readLater.arrTAB.length;i++){
        var aTab = readLater.arrTAB[i];
        var aBrowser = gBrowser.getBrowserForTab(aTab);
        if(aBrowser == xBrowser) {
          if(readLater.arrSCX[i]>0){
            doc.defaultView.scrollTo(0, readLater.arrSCX[i]);
          }
          for(var j=i+1;j<readLater.arrTAB.length;j++){
            readLater.arrTAB[j-1] = readLater.arrTAB[j];
            readLater.arrSCX[j-1] = readLater.arrSCX[j];
          }
          readLater.arrTAB.pop();
          readLater.arrSCX.pop();
          return;
        }
      }
    }
  }

}

readLater.init();
window.addEventListener("unload", function(event){ readLater.uninit(event); }, false);
