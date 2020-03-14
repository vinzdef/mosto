import { EventEmitter } from 'events'

class Scrollbar {
  constructor (options = {}) {
    this.emitter = new EventEmitter()
    this.rafId = -1
    this.scrollY = 0
    this.deltaY = 0
    this.direction = null
    this.ticking = false

    this.options = {
      virtual: options.virtual || true
    }

    this.eventType = 'scroll'

    const events = ['update', 'calc', 'appendScroll']
    events.map(val => this[val] = this[val].bind(this))
  }

  calc (min = 0) {
    return (virtual) => {
      const totalScroll = document.body.scrollHeight - window.innerHeight
      this.scrollY = Math.max(min, Math.min(totalScroll, this.scrollY - virtual.deltaY))
    }
  }

  static getScrollTop () {
    if (window.pageYOffset) { return window.pageYOffset }
    return document.documentElement.clientHeight
      ? document.documentElement.scrollTop
      : document.body.scrollTop
  }

  update () {
    this.rafId = window.requestAnimationFrame(this.update)

    this.ticking = true
    this.emitter.emit(this.eventType)
    this.ticking = false
  }

  add (fn) {
    this.emitter.on(this.eventType, fn)

    // Start raf on first callback
    if (this.emitter.listenerCount(this.eventType) === 1) {
      this.rafId = window.requestAnimationFrame(this.update)
    }
  }

  addOnce (fn) {
    this.emitter.once(this.eventType, fn)

    // Start raf on first callback
    if (this.emitter.listenerCount(this.eventType) === 1) {
      this.rafId = window.requestAnimationFrame(this.update)
    }
  }

  remove (fn) {
    this.emitter.removeListener(this.eventType, fn)

    // Stop raf if there is no more callbacks
    if (!this.emitter.listenerCount(this.eventType) || this.emitter.listenerCount(this.eventType) < 1) {
      this.raf.cancel(this.rafId)
    }
  }

  getCurrent () {
    return this.getEvent()
  }

  destroy () {
    window.cancelAnimationFrame(this.rafId)
    this.emitter = new EventEmitter()
    this.scrollY = 0
    this.deltaY = 0
  }

  initScroll () {
    this.timeTest = 0
    if (this.options.virtual && process.client) {
      this.virtual = new require('virtual-scroll')
      this.virtual.on(this.calc(0))
      this.add(this.appendScroll)
    }
  }

  appendScroll () {
    this.timeTest += 0.1 * (this.scrollY - this.timeTest)
    window.scrollTo(0, this.timeTest)
  }
}

export default new Scrollbar()
