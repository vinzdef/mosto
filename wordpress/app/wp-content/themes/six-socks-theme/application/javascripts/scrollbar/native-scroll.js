import { EventEmitter } from 'events'

class RafScroll {

  constructor() {
    this.emitter = new EventEmitter()
    this.rafId = -1
    this.scrollY = 0
    this.deltaY = 0
    this.direction = null
    this.ticking = false

    this.eventType = 'scroll'

    const events = ['update', 'getEvent']
    events.map(val => this[val] = this[val].bind(this))
  }

  static getScrollTop() {
    if (window.pageYOffset) return window.pageYOffset
    return document.documentElement.clientHeight
      ? document.documentElement.scrollTop
      : document.body.scrollTop
  }

  getEvent() {
    const scroll = RafScroll.getScrollTop()
    const oldDirection = this.direction

    if (this.ticking) {
      this.deltaY = scroll - this.scrollY

      if (scroll > this.scrollY) {
        this.direction = 'down'
      } else if (scroll < this.scrollY) {
        this.direction = 'up'
      }
    }

    this.scrollY = scroll

    return {
      scrollY: this.scrollY,
      deltaY: this.deltaY,
      direction: this.direction,
      oldDirection
    }
  }

  update() {
    this.rafId = window.requestAnimationFrame(this.update)

    this.ticking = true
    this.emitter.emit(this.eventType, this.getEvent())
    this.ticking = false
  }

  add(fn) {
    this.emitter.on(this.eventType, fn)

    // Start raf on first callback
    if (this.emitter.listenerCount(this.eventType) === 1) {
      this.rafId = window.requestAnimationFrame(this.update)
    }
  }

  addOnce(fn) {
    this.emitter.once(this.eventType, fn)

    // Start raf on first callback
    if (this.emitter.listenerCount(this.eventType) === 1) {
      this.rafId = window.requestAnimationFrame(this.update)
    }
  }

  remove(fn) {
    this.emitter.removeListener(this.eventType, fn)

    // Stop raf if there is no more callbacks
    if (!this.emitter.listenerCount(this.eventType) || this.emitter.listenerCount(this.eventType) < 1) {
      this.raf.cancel(this.rafId)
    }
  }

  getCurrent() {
    return this.getEvent()
  }

  destroy() {
    window.cancelAnimationFrame(this.rafId)
    this.emitter = new EventEmitter()
    this.scrollY = 0
    this.deltaY = 0
  }
}

export default new RafScroll()