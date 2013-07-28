// ==UserScript==
// @name            youkuantiads.uc.js
// @namespace       YoukuAntiADs@harv.c
// @description     视频网站去黑屏
// @include         chrome://browser/content/browser.xul
// @author          harv.c
// @version         1.4.1.15
// ==/UserScript==
(function() {
    function YoukuAntiADs() {};
    var refD = 'file:///' + Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).path + '/chrome/swf/';
    YoukuAntiADs.prototype = {
        SITES: {
			'youku_loader': {
				'player': refD + 'loader.swf',
				're': /http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/loader\.swf/i
			},
			'youku_player': {
				'player': refD + 'player.swf',
				're': /http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/q?player[^\.]*\.swf/i
			},
			'tudou': {
				'player': refD + 'tudou.swf',
				're': /http:\/\/js\.tudouui\.com\/.*\/portalplayer[^\.]*\.swf/i
			},
			'tudou_olc': {
				'player': refD + 'olc_8.swf',
				're': /http:\/\/js\.tudouui\.com\/.*\/olc[^\.]*\.swf/i
			},
			'tudou_social': {
				'player': refD + 'sp.swf',
				're': /http:\/\/js\.tudouui\.com\/.*\/socialplayer[^\.]*\.swf/i
			},
			'iqiyi': {
				'player0': refD + 'iqiyi_out.swf',
				'player1': refD + 'iqiyi5.swf',
				'player2': refD + 'iqiyi.swf',
				're': /http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf/i
			},
			'ku6': {
				'player': refD + 'ku6.swf',
				're': /http:\/\/player\.ku6cdn\.com\/.*\/\d+\/player\.swf/i
			},
			'letv': {
				'player': refD + 'letv.swf',
				're': /http:\/\/.*letv[\w]*\.com\/(.*\/(?!Live)[\w]{4}Player[^\.]*|[\w]*cloud)\.swf/i
			},
			'pptv': {
				'player': refD + 'pptv.swf',
				're': /http:\/\/player.pplive.cn\/.*\/player4player2\.swf/i
			},
			'pplive': {
				'player': refD + 'pplive.swf',
				're': /http:\/\/player.pplive.cn\/.*\/player4live2\.swf/i
			},
			'swfempty': {
				'player': refD + 'empty.swf',
				're': /http:\/\/player.pplive.cn\/.*\/PPLivePlugin\.swf/i
			}
        },
        os: Cc['@mozilla.org/observer-service;1']
                .getService(Ci.nsIObserverService),
        init: function() {
            var site = this.SITES['iqiyi'];
            site['preHandle'] = function(aSubject) {
                var wnd = this.getWindowForRequest(aSubject);
                if(wnd) {
                    site['cond'] = [
                        /bilibili/i.test(wnd.top.location.host),
                        !/^((?!baidu).)*\.iqiyi\.com/i.test(wnd.top.location.host)
                            || wnd.top.document.querySelector('span[data-flashplayerparam-flashurl]'),
                        true
                    ];
                    if(!site['cond']) return;
                    
                    for(var i = 0; i < site['cond'].length; i++) {
                        if(site['cond'][i]) {
                            if(site['player'] != site['player' + i]) {
                                site['player'] = site['player' + i];
                                site['storageStream'] = site['storageStream' + i] ? site['storageStream' + i] : null;
                                site['count'] = site['count' + i] ? site['count' + i] : null;
                            }
                            break;
                        }
                    }
                }
            };
            site['callback'] = function() {
                if(!site['cond']) return;

                for(var i = 0; i < site['cond'].length; i++) {
                    if(site['player' + i] == site['player']) {
                        site['storageStream' + i] = site['storageStream'];
                        site['count' + i] = site['count'];
                        break;
                    }
                }
            };
        },
        // getPlayer, get modified player
        getPlayer: function(site, callback) {
            NetUtil.asyncFetch(site['player'], function(inputStream, status) {
                var binaryOutputStream = Cc['@mozilla.org/binaryoutputstream;1']
                                            .createInstance(Ci['nsIBinaryOutputStream']);
                var storageStream = Cc['@mozilla.org/storagestream;1']
                                        .createInstance(Ci['nsIStorageStream']);
                var count = inputStream.available();
                var data = NetUtil.readInputStreamToString(inputStream, count);

                storageStream.init(512, count, null);
                binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
                binaryOutputStream.writeBytes(data, count);

                site['storageStream'] = storageStream;
                site['count'] = count;

                if(typeof callback === 'function') {
                    callback();
                }
            });
        },
        getWindowForRequest: function(request){
            if(request instanceof Ci.nsIRequest){
                try{
                    if(request.notificationCallbacks){
                        return request.notificationCallbacks
                                    .getInterface(Ci.nsILoadContext)
                                    .associatedWindow;
                    }
                } catch(e) {}
                try{
                    if(request.loadGroup && request.loadGroup.notificationCallbacks){
                        return request.loadGroup.notificationCallbacks
                                    .getInterface(Ci.nsILoadContext)
                                    .associatedWindow;
                    }
                } catch(e) {}
            }
            return null;
        },
        observe: function(aSubject, aTopic, aData) {
            if(aTopic != 'http-on-examine-response') return;

            var http = aSubject.QueryInterface(Ci.nsIHttpChannel);
            for(var i in this.SITES) {
                var site = this.SITES[i];
                if(site['re'].test(http.URI.spec)) {
                    var fn = this, args = Array.prototype.slice.call(arguments);

                    if(typeof site['preHandle'] === 'function')
                        site['preHandle'].apply(fn, args);

                    if(!site['storageStream'] || !site['count']) {
                        http.suspend();
                        this.getPlayer(site, function() {
                            http.resume();
                            if(typeof site['callback'] === 'function')
                                site['callback'].apply(fn, args);
                        });
                    }

                    var newListener = new TrackingListener();
                    aSubject.QueryInterface(Ci.nsITraceableChannel);
                    newListener.originalListener = aSubject.setNewListener(newListener);
                    newListener.site = site;

                    break;
                }
            }
        },
        QueryInterface: function(aIID) {
            if(aIID.equals(Ci.nsISupports) || aIID.equals(Ci.nsIObserver))
                return this;

            return Cr.NS_ERROR_NO_INTERFACE;
        },
        register: function() {
            this.init();
            this.os.addObserver(this, 'http-on-examine-response', false);
        },
        unregister: function() {
            this.os.removeObserver(this, 'http-on-examine-response', false);
        }
    };

    // TrackingListener, redirect youku player to modified player
    function TrackingListener() {
        this.originalListener = null;
        this.site = null;
    }
    TrackingListener.prototype = {
        onStartRequest: function(request, context) {
            this.originalListener.onStartRequest(request, context);
        },
        onStopRequest: function(request, context) {
            this.originalListener.onStopRequest(request, context, Cr.NS_OK);
        },
        onDataAvailable: function(request, context) {
            this.originalListener.onDataAvailable(request, context, this.site['storageStream'].newInputStream(0), 0, this.site['count']);
        }
    };

    // register observer
    var y = new YoukuAntiADs();
    if(location == 'chrome://browser/content/browser.xul') {
        y.register();
    }

    // unregister observer
    window.addEventListener('unload', function() {
        if(location == 'chrome://browser/content/browser.xul') {
            y.unregister();
        }
    });
})();