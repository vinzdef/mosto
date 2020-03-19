/** Main Application File **/

import '../stylesheets/application.scss'
import { isTouch, addClass, isMobile } from './base/utils'

class App {
  constructor() {
    this.isMobile = isMobile()
    this.isTouch = isTouch()

    this.handleResize = this.resize()
    window.addEventListener('resize', this.handleResize)

    if (!isTouch()) {
      addClass(document.documentElement, 'no-touchevents')
    }
  }

  init() {}

  resize() {}
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App()
  app.init()

  const styleLog1 = 'padding: 0; color:#000000; line-height:30px; font-size: 16px; font-weight: 700;'
  console.log('%cDesigned and developed by sixsocks.studio\n', styleLog1)
})