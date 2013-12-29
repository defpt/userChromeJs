// ==UserScript==
// @name           KeyChanger.uc.js
// @namespace      http://d.hatena.ne.jp/Griever/
// @include        main
// @description    keyconfig の代わり
// @license        MIT License
// @compatibility  Firefox 16
// @charset        UTF-8
// @version        0.0.2
// @note           0.0.2 メニューを右クリックで設定ファイルを開けるようにした
// @note           0.0.2 Meta キーを装飾キーに使えるようになったかもしれない（未テスト）
// @note           0.0.2 Windows キーを装飾キーに使えるようになったかもしれない（未テスト Firefox 17 以降）
// ==/UserScript==

var KeyChanger = {
	get file() {
		var aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
		aFile.appendRelativePath("Local\\_keychanger.js");
		delete this.file;
		return this.file = aFile;
	},
	makeKeyset : function(isAlert){
		var s = new Date();
		var keys = this.makeKeys();
		if (!keys)
			return this.alert('KeyChanger', 'Load error.');

		var keyset = document.getElementById('keychanger-keyset');
		if (keyset)
			keyset.parentNode.removeChild(keyset);
		keyset = document.createElement('keyset');
		keyset.setAttribute('id', 'keychanger-keyset');
		keyset.appendChild(keys);

		var df = document.createDocumentFragment();
		Array.slice(document.getElementsByTagName('keyset')).forEach(function(elem){
			df.appendChild(elem);
		});
		var insPos = document.getElementById('mainPopupSet');
		insPos.parentNode.insertBefore(keyset, insPos);
		insPos.parentNode.insertBefore(df, insPos);
		var e = new Date() - s;

		if (isAlert){
			this.alert('KeyChanger: Loaded', e + 'ms');
		}
	},
	makeKeys : function(){
		var str = this.loadText(this.file);
		if (!str)
			return null;

		var sandbox = new Components.utils.Sandbox( new XPCNativeWrapper(window) );
		var keys = Components.utils.evalInSandbox('var keys = {};\n' + str + ';\nkeys;', sandbox);
		if (!keys)
			return null;
		var dFrag = document.createDocumentFragment();

		Object.keys(keys).forEach(function(n) {
			let keyString = n.toUpperCase().split("+");
			let modifiers = "", key, keycode, k;
			
			for (let i = 0, l = keyString.length; i < l ; i++) {
				k = keyString[i];
				switch(k) {
					case "CTRL":
					case "CONTROL":
					case "ACCEL":
						modifiers += "accel,";
						break;
					case "SHIFT":
						modifiers += "shift,";
						break;
					case "ALT":
					case "OPTION":
						modifiers += "alt,";
						break;
					case "META":
					case "COMMAND":
						modifiers += "meta,";
						break;
					case "OS":
					case "WIN":
					case "WINDOWS":
					case "HYPER":
					case "SUPER":
						modifiers += "os,";
						break;
					case "":
						key = "+";
						break;
					case "BACKSPACE":
					case "BKSP":
					case "BS":
						keycode = "VK_BACK";
						break;
					case "RET":
					case "ENTER":
						keycode = "VK_RETURN";
						break;
					case "ESC":
						keycode = "VK_ESCAPE";
						break;
					case "PAGEUP":
					case "PAGE UP":
					case "PGUP":
					case "PUP":
						keycode = "VK_PAGE_UP";
						break;
					case "PAGEDOWN":
					case "PAGE DOWN":
					case "PGDN":
					case "PDN":
						keycode = "VK_PAGE_DOWN";
						break;
					case "TOP":
						keycode = "VK_UP";
						break;
					case "BOTTOM":
						keycode = "VK_DOWN";
						break;
					case "INS":
						keycode = "VK_INSERT";
						break;
					case "DEL":
						keycode = "VK_DELETE";
						break;
					default:
						if (k.length === 1) {
							key = k;
						} else if (k.indexOf("VK_") === -1) {
							keycode = "VK_" + k;
						} else {
							keycode = k;
						}
						break;
				}
			}
			let elem = document.createElement('key');
			if (modifiers !== '')
				elem.setAttribute('modifiers', modifiers.slice(0, -1));
			if (key)
				elem.setAttribute('key', key);
			else if (keycode)
				elem.setAttribute('keycode', keycode);

			let cmd = keys[n];
			switch(typeof cmd) {
				case 'function':
					elem.setAttribute('oncommand', '(' + cmd.toSource() + ').call(this, event);');
					break;
				case 'object':
					Object.keys(cmd).forEach(function(a){
						elem.setAttribute(a, cmd[a]);
					}, this);
					break;
				default:
					elem.setAttribute('oncommand', cmd);
			}
			dFrag.appendChild(elem);
		}, this);
		return dFrag;
	},
	createMenuitem : function(){
		var menuitem = document.createElement('menuitem');
		menuitem.setAttribute('id', 'toolsbar_KeyChanger_rebuild');
		menuitem.setAttribute('label', 'KeyChanger重载/配置');
		menuitem.setAttribute('oncommand', 'KeyChanger.makeKeyset(true);');
		menuitem.setAttribute('onclick', 'if (event.button == 2) { event.preventDefault(); KeyChanger.edit(KeyChanger.file); }');
		var insPos = document.getElementById('devToolsSeparator');
		insPos.parentNode.insertBefore(menuitem, insPos);
	},
	loadText: function(aFile) {
		var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
		var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
		fstream.init(aFile, -1, 0, 0);
		sstream.init(fstream);

		var data = sstream.read(sstream.available());
		try { data = decodeURIComponent(escape(data)); } catch(e) {}
		sstream.close();
		fstream.close();
		return data;
	},
	alert : function(aTitle, aString){
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService)
			.showAlertNotification('', aTitle, aString, false, "", null);
	},
	edit: function(aFile) {
		if (!aFile || !aFile.exists() || !aFile.isFile()) return;
		var editor = Services.prefs.getCharPref("view_source.editor.path");
		if (!editor)
			return this.log("エディタのパスが未設定です。\n view_source.editor.path を設定してください");

		try {
			var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0? "Shift_JIS": "UTF-8";
			var path = UI.ConvertFromUnicode(aFile.path);
			this.exec(editor, path);
		} catch (e) {}
	},
	exec: function(path, arg){
		var file    = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
		try {
			var a = (typeof arg == 'string' || arg instanceof String) ? arg.split(/\s+/) : [arg];
			file.initWithPath(path);
			process.init(file);
			process.run(false, a, a.length);
		} catch(e) {
			this.log(e);
		}
	},
	log: function() {
		Services.console.logStringMessage("[KeyChanger] " + Array.slice(arguments));
	},
};

KeyChanger.createMenuitem();
KeyChanger.makeKeyset();



/* ********** KeyChanger について **********

***** 使い方 *****
_keychanger.js ファイルを chrome フォルダにおいてください。
.uc.js の方はどこでも構いません。


***** 書式について *****
keys["Ctrl+Shift+A"] = "alert(this)"; のように + で区切って記述。
不要なスペースは入れないでください。
Ctrl 等を使用しない場合は keys.VK_F1 でも可。

キーは大文字小文字区別せず、多少柔軟性を持たせてあります。
例：
	f1 → VK_F1
	Esc → VK_ESCAPE
	backspace, bksp → VK_BACK

正確に書くならこちらを参考に。
・https://developer.mozilla.org/ja/XUL_Tutorial/Keyboard_Shortcuts


***** 代入できるもの *****
string はそのまま oncommand 属性に。

object は for in でそのまま属性に。
	例：keys.f1 = { id : 'test', oncommand : 'alert(this.id)' };
	
function は "(" + func.toSource() + ").call(this, event);" で oncommand 属性に。


スクリプトはこの辺を参考に調達してください。
・http://www.xuldev.org/blog/?p=76
・http://www.xuldev.org/firegestures/getscripts.php



*/
