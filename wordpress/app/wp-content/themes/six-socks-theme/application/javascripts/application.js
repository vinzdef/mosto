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
  constructor() {
    // this.isMobile = isMobile()
    // this.isTouch = isTouch()
    // // const vh = window.innerHeight * 0.01
    // // document.documentElement.style.setProperty('--vh', `${vh}px`)

    // this.handleResize = debounce(() => this.resize(), 200)
    // window.addEventListener('resize', this.handleResize)

    // if (!isTouch()) {
    //   addClass(document.documentElement, 'no-touchevents')
    // }
  }

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
  const app = new App()
  app.init()

  const styleLog1 = 'padding: 0; color:#000000; line-height:30px; font-size: 16px; font-weight: 700;'
  console.log('%cDesigned and developed by sixsocks.studio\n', styleLog1)
})