// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../stylesheets/application.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/gt-america-black.woff":[["gt-america-black.ab15dda8.woff","../fonts/gt-america-black.woff"],"../fonts/gt-america-black.woff"],"./../fonts/gt-america-bold.woff":[["gt-america-bold.8a248388.woff","../fonts/gt-america-bold.woff"],"../fonts/gt-america-bold.woff"],"./../fonts/gt-america-medium.woff":[["gt-america-medium.2757d7bf.woff","../fonts/gt-america-medium.woff"],"../fonts/gt-america-medium.woff"],"./../fonts/gt-america-regular.woff":[["gt-america-regular.6dc37f92.woff","../fonts/gt-america-regular.woff"],"../fonts/gt-america-regular.woff"],"./../fonts/gt-america-light.woff":[["gt-america-light.de1da197.woff","../fonts/gt-america-light.woff"],"../fonts/gt-america-light.woff"],"./../fonts/gt-america-ultralight.woff":[["gt-america-ultralight.8496900c.woff","../fonts/gt-america-ultralight.woff"],"../fonts/gt-america-ultralight.woff"],"./../fonts/gt-america-thin.woff":[["gt-america-thin.df5542ab.woff","../fonts/gt-america-thin.woff"],"../fonts/gt-america-thin.woff"],"./../fonts/gt-america-extended-bold.woff":[["gt-america-extended-bold.f6bb4f89.woff","../fonts/gt-america-extended-bold.woff"],"../fonts/gt-america-extended-bold.woff"],"./../fonts/GTAmerica-ExpandedBlack.woff2":[["GTAmerica-ExpandedBlack.61c43ae4.woff2","../fonts/GTAmerica-ExpandedBlack.woff2"],"../fonts/GTAmerica-ExpandedBlack.woff2"],"./../fonts/GTAmerica-ExpandedBlack.woff":[["GTAmerica-ExpandedBlack.16abf3e6.woff","../fonts/GTAmerica-ExpandedBlack.woff"],"../fonts/GTAmerica-ExpandedBlack.woff"],"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../node_modules/prevent-scroll/dist/prevent-scroll.js":[function(require,module,exports) {
var define;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["preventScroll"] = factory();
	else
		root["preventScroll"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var disabled = false;
	var currentPosition = void 0,
	    currentOverflow = void 0,
	    currentWidth = void 0;
	
	exports.default = {
	  on: function on() {
	    if (disabled) {
	      return;
	    }
	
	    disabled = true;
	
	    var htmlEl = document.querySelector('html');
	    var body = document.body;
	
	    // Determine the `scrollTop` to use. Some browsers require checking the
	    // `body`, others use `html`.
	    var bodyScrollTop = body.scrollTop;
	    var htmlScrollTop = htmlEl.scrollTop;
	    var scrollTop = bodyScrollTop ? bodyScrollTop : htmlScrollTop;
	
	    // Store the current value of the htmlEl's styles – we're about to override
	    // them.
	    currentPosition = htmlEl.style.position;
	    currentOverflow = htmlEl.style.overflowY;
	    currentWidth = htmlEl.style.width;
	
	    // Fixing the position of the `htmlEl` prevents the page from scrolling
	    // at all.
	    htmlEl.style.position = 'fixed';
	    // Setting `overflowY` to `scroll` ensures that any scrollbars that are
	    // around stick around. Otherwise, there would be a "jump" when the page
	    // becomes unscrollable as the bar would vanish.
	    htmlEl.style.overflowY = 'scroll';
	    // This makes sure that the page doesn't collapse (usually your CSS will
	    // prevent this, but it's best to be safe)
	    htmlEl.style.width = '100%';
	    // Scoot down the `htmlEl` to be in the same place that the user had
	    // scrolled to.
	    htmlEl.style.top = '-' + scrollTop + 'px';
	  },
	  off: function off() {
	    if (!disabled) {
	      return;
	    }
	
	    disabled = false;
	
	    var htmlEl = document.querySelector('html');
	    var body = document.body;
	
	    // Reset `htmlEl` to the original styles.
	    htmlEl.style.position = currentPosition;
	    htmlEl.style.overflowY = currentOverflow;
	    htmlEl.style.width = currentWidth;
	
	    // Retrieve our original scrollTop from the htmlEl's top
	    var scrollTop = -parseInt(htmlEl.style.top);
	    // Return us to the original scroll position. Once again, we set this on
	    // both the `body` and the `htmlEl` to be safe.
	    htmlEl.scrollTop = scrollTop;
	    body.scrollTop = scrollTop;
	  }
	};

/***/ }
/******/ ])
});
;

},{}],"base/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleEvent = handleEvent;
exports.createconfig = createconfig;
exports.index = index;
exports.eq = eq;
exports.getDevice = getDevice;
exports.isMobile = isMobile;
exports.calculateRatio = calculateRatio;
exports.lerp = lerp;
exports.viewportSize = viewportSize;
exports.roundNumber = roundNumber;
exports.inViewport = inViewport;
exports.degrees = degrees;
exports.radians = radians;
exports.getQueryParams = getQueryParams;
exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.loadImage = loadImage;
exports.setBodyFixed = exports.groupBy = exports.isTouch = exports.stringToDOM = exports.hasClass = exports.removeClass = exports.addClass = exports.toggleClass = exports.qsa = exports.qs = exports.byClassName = exports.byId = void 0;

var _preventScroll = _interopRequireDefault(require("prevent-scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var camelCaseRegExp = /-([a-z])/ig;

var toCamelCase = function toCamelCase(str) {
  return str.replace(camelCaseRegExp, function (match) {
    return match[1].toUpperCase();
  });
};

var byId = function byId(id) {
  return document.getElementById(id);
};

exports.byId = byId;

var byClassName = function byClassName(selector) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  Array.toArray(ctx.getElementsByClassName(selector));
};

exports.byClassName = byClassName;

var qs = function qs(selector) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return ctx.querySelector(selector);
};

exports.qs = qs;

var qsa = function qsa(selector) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(ctx.querySelectorAll(selector));
};

exports.qsa = qsa;

var toggleClass = function toggleClass(el, className) {
  el.classList.toggle(className);
};

exports.toggleClass = toggleClass;

var addClass = function addClass(el, className) {
  el.classList.add(className);
};

exports.addClass = addClass;

var removeClass = function removeClass(el, className) {
  el.classList.remove(className);
};

exports.removeClass = removeClass;

var hasClass = function hasClass(el, className) {
  return el.classList.contains(className);
};

exports.hasClass = hasClass;

function handleEvent(eventName) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      onElement = _ref.onElement,
      withCallback = _ref.withCallback,
      _ref$useCapture = _ref.useCapture,
      useCapture = _ref$useCapture === void 0 ? false : _ref$useCapture;

  var thisArg = arguments.length > 2 ? arguments[2] : undefined;
  var element = onElement || document.documentElement;

  function handler(event) {
    if (typeof withCallback === 'function') {
      withCallback.call(thisArg, event);
    }
  }

  handler.destroy = function destroy() {
    return element.removeEventListener(eventName, handler, useCapture);
  };

  element.addEventListener(eventName, handler, useCapture);
  return handler;
}

function createconfig() {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 ? arguments[1] : undefined;
  return Object.assign({}, config, o);
}

var stringToDOM = function stringToDOM() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var fragment = document.createDocumentFragment();
  var wrapper = fragment.appendChild(document.createElement('div'));
  wrapper.innerHTML = string.trim();
  return wrapper.children[0];
};

exports.stringToDOM = stringToDOM;

function index(element) {
  var sib = element.parentNode.childNodes;
  var n = 0;

  for (var i = 0; i < sib.length; i += 1) {
    if (sib[i] === element) return n;
    if (sib[i].nodeType === 1) n += 1;
  }

  return -1;
}

function eq(parent, i) {
  return i >= 0 && i < parent.length ? parent[i] : -1;
}

function getDevice() {
  var device = window.getComputedStyle(document.body, '::after').getPropertyValue('content');
  device = device.replace(/('|")/g, '');
  return device;
}

function isMobile() {
  return !(getDevice() !== 'xs' && getDevice() !== 'sm' && getDevice() !== 's-tablet');
}

function calculateRatio(width, height) {
  return width / height;
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function viewportSize() {
  return {
    w: window.innerWidth,
    h: window.innerHeight,
    ratio: window.innerWidth / window.innerHeight
  };
}

function roundNumber(n, p) {
  var p = p !== undefined ? Math.pow(10, p) : 1000;
  return Math.round(n * p) / p;
}

function inViewport(e) {
  var _e$getBoundingClientR = e.getBoundingClientRect(),
      height = _e$getBoundingClientR.height,
      bottom = _e$getBoundingClientR.bottom,
      top = _e$getBoundingClientR.top,
      left = _e$getBoundingClientR.left,
      right = _e$getBoundingClientR.right,
      width = _e$getBoundingClientR.width;

  var h = height || bottom - top;
  var w = width || right - left;
  var viewport = viewportSize();
  if (!h || !w) return false;
  if (top > viewport.h || bottom < 0) return false;
  if (right < 0 || left > viewport.w) return false;
  return true;
}

var isTouch = function isTouch() {
  return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

exports.isTouch = isTouch;

function degrees(radians) {
  return radians * 180 / Math.PI;
}

function radians(degrees) {
  return degrees * Math.PI / 180;
}

function getQueryParams(str) {
  var qss = str.split('+').join(' ');
  var params = {};
  var tokens;
  var re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qss)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

var groupBy = function groupBy(array, fn) {
  return array.reduce(function (result, item) {
    var key = fn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
    return result;
  }, {});
};

exports.groupBy = groupBy;

var setBodyFixed = function setBodyFixed(val) {
  if (val) {
    _preventScroll.default.on();

    addClass(document.body, 'is-fixed');
  } else {
    _preventScroll.default.off();

    removeClass(document.body, 'is-fixed');
  }
};

exports.setBodyFixed = setBodyFixed;

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function loadImage(url) {
  return new Promise(function (resolve) {
    var img = new Image();

    img.onload = function () {
      return resolve({
        url: url,
        ratio: img.naturalWidth / img.naturalHeight
      });
    };

    img.src = url;
  });
}
},{"prevent-scroll":"../../node_modules/prevent-scroll/dist/prevent-scroll.js"}],"application.js":[function(require,module,exports) {
"use strict";

require("../stylesheets/application.scss");

var _utils = require("./base/utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.isMobile = (0, _utils.isMobile)();
    this.isTouch = (0, _utils.isTouch)();
    this.handleResize = this.resize();
    window.addEventListener('resize', this.handleResize);

    if (!(0, _utils.isTouch)()) {
      (0, _utils.addClass)(document.documentElement, 'no-touchevents');
    }
  }

  _createClass(App, [{
    key: "init",
    value: function init() {}
  }, {
    key: "resize",
    value: function resize() {}
  }]);

  return App;
}();

document.addEventListener('DOMContentLoaded', function () {
  var app = new App();
  app.init();
  var styleLog1 = 'padding: 0; color:#000000; line-height:30px; font-size: 16px; font-weight: 700;';
  console.log('%cDesigned and developed by sixsocks.studio\n', styleLog1);
});
},{"../stylesheets/application.scss":"../stylesheets/application.scss","./base/utils":"base/utils.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "localhost" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50564" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","application.js"], null)
//# sourceMappingURL=/application.js.map