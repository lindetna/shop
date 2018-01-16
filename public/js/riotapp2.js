var App = function App(){
	var app = this;
    app.moduleLoadedTags = ['accueil-admin'];
    app.pageLoadedTags = [];    
	app.currentPage;
	riot.observable(app);
};

App.prototype.initRoutes = function initRoutes(routes) {
    var app = this;
	app.routes = routes;
    riot.route('/', function() {
        app.loadPage({ page: 'accueil' }, function() {});
    });
    riot.route('/*', function(page) {
        app.currentPageCallback = undefined;
        app.currentPageAnchor = undefined;
        app.loadPage({ page: page }, function() {});
    });
};

App.prototype.setByIds = function setByIds(obj, ids) {
    var l, i;
    l = obj.length;
    for (i = 0; i < l; i++) {
        ids[obj[i].id] = i;
    }
}

App.prototype.getPageCallback = function getPageCallback(module, page, callback) {
    return (app.routes[module] && app.routes[module][page] && app.routes[module][page].callbacks[callback] ? app.routes[module][page].callbacks[callback] : undefined);
};

App.prototype.loadPage = function loadPage({page='accueil'}, callback) {
    var app = this;
	var mountModule = false;
    var routes = app.routes;
    var base_url_tags = routes.base_url_tags;
    var i = 0;
    var l;
    var tags;
    var loadedTag;
    var css;
    var variables;

    if ( typeof routes[page] !== 'undefined') {

        // Load new page tags
        if ((page !== app.currentPage) && typeof routes[page].tags !== 'undefined' && routes[page].tags.length > 0) {
            app.trigger('unmount-page');
            l = app.pageLoadedTags.length;
            for (i = 0; i < l; i++) {
                loadedTag = app.pageLoadedTags.shift();
                app.trigger('unmount-' + loadedTag);
            }
            if (routes[app.currentPage] && routes[app.currentPage].css) {
                css = routes[app.currentPage].css;
                l = css.length;
                for (i = 0; i < l; i++) {
                    app.unloadCSS(css[i].id);
                }
            }
            app.currentPage = page;
            if (routes[page].css) {
                css = routes[page].css;
                l = css.length;
                for (i = 0; i < l; i++) {
                    app.loadCSS(css[i].url, css[i].id, function() { console.log('css loaded!!!...') });
                }
            }
            tags = routes[page].tags;
            l = tags.length;

            for (i = 0; i < l; i++) {
                app.insertTag(tags[i].name, tags[i].mountPoint, true);
                (function(num) {
                    var tagName = tags[num].name;
                    var tagUrl = base_url_tags + tags[num].url;
                    riot.compile(tagUrl, function() {
                        app.pageLoadedTags.push(tagName);
                        riot.mount(tagName, app);
                        app.trigger('mount-page', page);
						console.log('nodece trigger', 'page: ' + page);
                        tagName = null; // unlink closure
                        tagUrl = null; // unlink closure
                    });
                })(i);
            }
        }
    } else {
        // this route is an unknown one, so something bad happened ...
        console.log('App.loadPage : unknown route...');
    }
};

App.prototype.addEvent = function addEvent(obj, evt, fn) {
    if (window.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (window.attachEvent) {
        obj.attachEvent('on' + evt, fn);
    } else {
        obj['on' + evt] = fn;
    }
};

App.prototype.removeEvent = function removeEvent(obj, evt, fn) {
    if (window.removeEventListener) {
        obj.removeEventListener(evt, fn, false);
    } else if (window.detachEvent) {
        obj.detachEvent('on' + evt, fn);
    } else {
        obj['on' + evt] = null;
    }
};

App.prototype.loadCSS = function loadCSS(url, id, callback) {
    var app = this;
    var linkTag = document.getElementById(id);

    if (linkTag) {
        linkTag.parentNode.removeChild(linkTag);
    }

    var stylesheet = document.createElement('link');
    if (callback) {
        app.addEvent(stylesheet, 'load', callback);
    }
    stylesheet.rel = 'stylesheet';
    stylesheet.id = id;
    stylesheet.href = url;

    if (document.head) {
        document.head.appendChild(stylesheet);
    } else {
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    }
};

App.prototype.unloadCSS = function unloadCSS(id) {
    var app = this;
    var linkTag = document.getElementById(id);

    if (linkTag) {
        linkTag.parentNode.removeChild(linkTag);
    }
}

App.prototype.loadScript = function loadScript(url, id, callback) {
    var app = this;
	var script = document.getElementById(id);

	if( script ) {
		script.parentNode.removeChild(script);
	}

   	script = document.createElement('script');

    if (callback) {
        app.addEvent(script, 'load', callback);
    }
    script.type = 'text/javascript';
    script.async = true;
    script.id = id;
    script.src = url;

	if (document.head) {
		document.head.appendChild(script);
	} else {
		document.getElementsByTagName('head')[0].appendChild(script);
	}
};

App.prototype.insertTag = function insertTag(tagName, mountPoint, deleteMountPointContent) {
    //TODO: remove content from mountPoint if( deleteMountPointContent )
    var mountPointName = mountPoint.trim();
    var pointType = mountPointName.charAt(0);
    var tag;
    if (pointType === '.') {
        mountPointName = mountPointName.substr(1);
        mountPoint = document.getElementsByClassName(mountPointName);
        var l = mountPoint.length;
        for (var i = 0; i < l; i++) {
            tag = document.createElement(tagName);
            mountPoint.item(i).appendChild(tag);
        }
    } else if (pointType === '#') {
        tag = document.createElement(tagName);
        mountPointName = mountPointName.substr(1);
        mountPoint = document.getElementById(mountPointName);
        mountPoint.appendChild(tag);
    } else {
        tag = document.createElement(tagName);
        mountPoint = document.getElementById(mountPointName);
        mountPoint.appendChild(tag);
    }
}

App.prototype.loadTag = function loadTag(url, name, callback) {
    riot.compile(url, function() {
        app.pageLoadedTags.push(name);
        riot.mount(name, app);
        app.trigger('mount-tag', name);
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
}
