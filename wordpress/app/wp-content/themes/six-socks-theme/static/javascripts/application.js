/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "//";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascripts/application.js":
/*!************************************!*\
  !*** ./javascripts/application.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
* Main Application File
*
* Use for bootstrapping large application
* or just fill it with JS on small projects
*
*/
// import debounce from 'lodash.debounce'
// // import mediumZoom from 'medium-zoom'
// import lazyLoad from './base/lazy-load'
// import { isTouch, addClass, qsa, qs, hasClass, isMobile, loadImage } from './base/utils'
// import Menu from './components/menu'
// import Newsletter from './components/newsletter-modal'
// import Header from './components/header'
// import Filters from './components/filters'
// import Gallery from './components/gallery'
// import LiveSearch from './components/live-search'
// import ExternalLinks from './components/external-links'
// import AppPageScroll from './components/app-page'
// import EnterAnimations from './scrollbar/enter-animations'
// import CookieBar from './components/cookie-bar'
// import RafflePick from './components/raffle-pick'
// import ErrorPage from './components/error'
// import TrackingEvents from './components/tracking-events'
// import { TweenMax } from 'gsap/all';
class App {
  constructor() {} // this.isMobile = isMobile()
  // this.isTouch = isTouch()
  // // const vh = window.innerHeight * 0.01
  // // document.documentElement.style.setProperty('--vh', `${vh}px`)
  // this.handleResize = debounce(() => this.resize(), 200)
  // window.addEventListener('resize', this.handleResize)
  // if (!isTouch()) {
  //   addClass(document.documentElement, 'no-touchevents')
  // }
  // init() {
  //   App.setBannerFixed()
  //   this.header = new Header().mount('[data-header]')
  //   this.menu = new Menu().mount('#menu-toggle')
  //   this.newsletter = new Newsletter().mount('[data-newsletter-bg]')
  //   this.cookieBanner = new CookieBar().mount('[data-cookie-banner]')
  //   // // init of live search
  //   new LiveSearch().mount('#live-search')
  //   if (qs('#release-filters')) {
  //     new Filters({ elementSelector: 'data-kind' }).mount('#release-filters')
  //   }
  //   qsa('[data-carousel]').forEach(el => {
  //     const carousel = new window.Glide(el).mount()
  //     el.setAttribute('data-current-index', carousel.index)
  //     carousel.on('run', () => {
  //       el.setAttribute('data-current-index', carousel.index)
  //     })
  //   })
  //   qsa('[data-trigger-gallery]').forEach(el => {
  //     new Gallery().mount(el, { gap: 0 })
  //   })
  //   qsa('[data-raffle-pick]').forEach(el => {
  //     new RafflePick().mount(el)
  //   })
  //   if (hasClass(document.body, 'page-template-page-app') && !isTouch()) {
  //     new AppPageScroll().mount('.page-template-page-app')
  //   }
  //   this.animations = new EnterAnimations()
  //   if (qs('#error-canvas')) {
  //     const errorPage = new ErrorPage()
  //     errorPage.loop()
  //   }
  //   ExternalLinks()
  //   TrackingEvents()
  //   lazyLoad()
  // }
  // resize() {
  //   // const vh = window.innerHeight * 0.01
  //   // document.documentElement.style.setProperty('--vh', `${vh}px`)
  //   this.isMobile = isMobile()
  //   this.isTouch = isTouch()
  //   App.setBannerFixed()
  // }


}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
  const styleLog1 = 'padding: 0; color:#000000; line-height:30px; font-size: 16px; font-weight: 700;';
  console.log('%cDesigned and developed by sixsocks.studio\n', styleLog1);
});

/***/ }),

/***/ 0:
/*!******************************************!*\
  !*** multi ./javascripts/application.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./javascripts/application.js */"./javascripts/application.js");


/***/ })

/******/ });
//# sourceMappingURL=application.js.map