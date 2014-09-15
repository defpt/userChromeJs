// ==UserScript==
// @name                 UndoCloseTabBtn.uc.js
// @namespace            UndoCloseTab@gmail.com
// @description          恢复已关闭标签de可移动按钮
// @author               defpt
// @charset              UTF-8
// @Compatibility        FF29+
// @version              v2014.9.15
// ==/UserScript==
(function() {
	var buttonAttrs = {
		id: "undoclosetab-button",
		label: "恢复已关闭的标签",
		tooltiptext: "左键：已关闭标签列表\n右键：恢复最后一次关闭的标签",
		class: "toolbarbutton-1 chromeclass-toolbar-additional",
		type: "menu",
		removable: "true",
		context: "_child",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmElEQVQ4jaXSIQ7CQBRF0SMqKlgAghAEEtFFIBEsAYFENGyBFSBYAYtDIhDIQVCSSdOh7fQm38zLu+L/IU39J+ulRphazhLE5YAlytxyPA/cUeWU23OZKggSFxojeWI2RFJghS1ueEfZfsg+2mx8FxpwTgliSRfHJjv9E/wkXSwawa5PkKLEy4gP1qbCNbcMB8xzywXW8cMHRHtGPjrrfUUAAAAASUVORK5CYII=",
		onclick: "if(event.button == 2) undoCloseTab();"
	};
	
	var uCTBtn = $C('toolbarbutton', buttonAttrs);

	var popup = uCTBtn.appendChild($C("menupopup", {
		onpopupshowing: "this.parentNode.populateUndoSubmenu();",
		tooltip: "bhTooltip",
		popupsinherittooltip: "true"
	}));

	uCTBtn.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace(/._rootElt.*/, "") + ")");
	
	// 来自 User Agent Overrider 扩展
    const log = function() { dump(Array.slice(arguments).join(' ') + '\n'); };
    const trace = function(error) { log(error); log(error.stack); };
    const ToolbarManager = (function() {

        /**
         * Remember the button position.
         * This function Modity from addon-sdk file lib/sdk/widget.js, and
         * function BrowserWindow.prototype._insertNodeInToolbar
         */
        let layoutWidget = function(document, button, isFirstRun) {

            // Add to the customization palette
            let toolbox = document.getElementById('navigator-toolbox');
            toolbox.palette.appendChild(button);

            // Search for widget toolbar by reading toolbar's currentset attribute
            let container = null;
            let toolbars = document.getElementsByTagName('toolbar');
            let id = button.getAttribute('id');
            for (let i = 0; i < toolbars.length; i += 1) {
                let toolbar = toolbars[i];
                if (toolbar.getAttribute('currentset').indexOf(id) !== -1) {
                    container = toolbar;
                }
            }

            // if widget isn't in any toolbar, default add it next to searchbar
            if (!container) {
                if (isFirstRun) {
                    container = document.getElementById('nav-bar');
                } else {
                    return;
                }
            }

            // Now retrieve a reference to the next toolbar item
            // by reading currentset attribute on the toolbar
            let nextNode = null;
            let currentSet = container.getAttribute('currentset');
            let ids = (currentSet === '__empty') ? [] : currentSet.split(',');
            let idx = ids.indexOf(id);
            if (idx !== -1) {
                for (let i = idx; i < ids.length; i += 1) {
                    nextNode = document.getElementById(ids[i]);
                    if (nextNode) {
                        break;
                    }
                }
            }

            // Finally insert our widget in the right toolbar and in the right position
            container.insertItem(id, nextNode, null, false);

            // Update DOM in order to save position
            // in this toolbar. But only do this the first time we add it to the toolbar
            if (ids.indexOf(id) === -1) {
                container.setAttribute('currentset', container.currentSet);
                document.persist(container.id, 'currentset');
            }
        };

        let addWidget = function(window, widget, isFirstRun) {
            try {
                layoutWidget(window.document, widget, isFirstRun);
            } catch(error) {
                trace(error);
            }
        };

        let removeWidget = function(window, widgetId) {
            try {
                let widget = window.document.getElementById(widgetId);
                widget.parentNode.removeChild(widget);
            } catch (error) {
                trace(error);
            }
        };

        let exports = {
            addWidget: addWidget,
            removeWidget: removeWidget,
        };
        return exports;
    })();
	
    ToolbarManager.addWidget(window, uCTBtn, false);
	document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent('\
		#undoclosetab-button menuitem {max-width: 240px;}\
		') + '"'), document.documentElement);
		
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
