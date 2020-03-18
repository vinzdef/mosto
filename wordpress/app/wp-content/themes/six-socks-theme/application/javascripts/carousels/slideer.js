import Hammer from 'hammerjs'
import { Component } from 'yuzu'

import { qs, stringToDOM } from '../../base/utils'
import Counter from './counter'
import Dots from './dots'

class Slideer extends Component {
  mounted() {
    if (!this.$el) {
      console.error('You need to provide an element in costructor')
    }

    if (!this.options.callback) {
      console.error('You need to provide a callback function in the options')
    }

    this.animating = false

    this.index = this.getState('currentIndex')
    this.length = this.options.length - 1

    this.hammer = null
    this.onSwipe = this.onSwipe.bind(this)

    this.$els.counterContainer = qs(this.options.counterContainer, this.$el)
  }

  state = {
    currentCount: 1,
    currentIndex: this.options.startIndex || 0,
    totalCount: this.options.length
  };

  static defaultOptions = () => ({
    length: 0,
    counter: false,
    dots: false,
    callback: () => {},
    loop: false,
    delta: 1,
    startIndex: 0,
    clickOnParent: false,
    counterContainer: '[data-counter]',
    nextSelector: '[data-next]',
    prevSelector: '[data-prev]'
  });

  initialize() {
    this.setEvents()

    if (this.options.counter) {
      this.setCounter()
    }

    if (this.options.dots) {
      this.setDots()
    }
  }

  setEvents() {
    this.hammer = new Hammer.Manager(this.$el)
    this.hammer.add(new Hammer.Swipe({
      direction: Hammer.DIRECTION_HORIZONTAL
    }))
    this.hammer.on('swipe', this.onSwipe.bind(this))

    this.$els.prevControl = this.$el.querySelector(this.options.prevSelector)
    this.$els.nextControl = this.$el.querySelector(this.options.nextSelector)

    this.nextHandler = () => { this.goTo.call(this, this.getCurrentSlide() + 1) }
    this.prevHandler = () => { this.goTo.call(this, this.getCurrentSlide() - 1) }

    if (this.$els.prevControl && this.$els.nextControl) {
      this.setListener('click @prevControl', this.prevHandler)
      this.setListener('click @nextControl', this.nextHandler)
    }

    if (this.options.clickOnParent) {
      this.setListener('click', this.nextHandler)
    }
  }

  setCounter() {
    this.$els.counter = stringToDOM(`
      <div class="c-counter">
        <span data-counter="count"></span>
        <span class="divider">/</span>
        <span data-counter="total"></span>
      </div>
    `)

    if (this.$els.counterContainer) {
      this.$els.counterContainer.appendChild(this.$els.counter)
    } else {
      this.$el.appendChild(this.$els.counter)
    }

    this.setRef({
      id: 'counter',
      component: Counter,
      el: this.$els.counter,
    }, {
      count: ({ currentIndex }) => currentIndex,
      total: ({ totalCount }) => totalCount
    })
  }

  setDots() {
    this.$els.dots = qs('[data-dots]', this.$el)

    if (!this.$els.dots) {
      this.$els.dots = stringToDOM('<div class="c-dots"></div>')
      this.$el.appendChild(this.$els.dots)
    }

    this.setRef({
      id: 'dots',
      component: Dots,
      el: this.$els.dots
    }, {
      index: ({ currentIndex }) => currentIndex,
      length: this.options.length
    })
  }

  beforeDestroy() {
    this.hammer.off('swipe', this.onSwipe)
    this.hammer.destroy()
    this.hammer = null

    if (this.$els.prevControl && this.$els.nextControl) {
      this.$els.prevControl.removeEventListener('click', this.prevHandler)
      this.$els.nextControl.removeEventListener('click', this.nextHandler)
    }
  }

  getNext(delta) {
    const next = delta >= this.options.delta ? this.index - 1 : this.index + 1

    return this.checkLoop(next)
  }

  checkLoop(next) {
    if (next < 0) {
      return this.options.loop ? this.length : 0
    }

    if (next > this.length) {
      return this.options.loop ? 0 : this.length
    }

    return next
  }

  getEvent(index) {
    return {
      current: index,
      previous: this.index,
      direction: index >= this.index ? 1 : -1
    }
  }

  getCurrentSlide() {
    return this.index
  }

  onSwipe(e) {
    const delta = e.deltaX

    if (this.animating || delta > -this.options.delta && delta < this.options.delta) return
    this.animating = true

    this.callback(delta)
  }

  goTo(index) {
    const check = this.checkLoop(index)
    const event = this.getEvent(check)

    if (this.animating) return
    this.animating = true

    this.index = check

    this.options.callback(event)

    this.setState({ currentIndex: check })
    this.setState({ currentCount: check + 1 })
  }

  callback(delta) {

    const index = this.getNext(delta)
    const event = this.getEvent(index)

    this.setState({ currentIndex: index })
    this.setState({ currentCount: index + 1 })

    this.index = index
    this.options.callback(event)
  }
}

export default Slideer