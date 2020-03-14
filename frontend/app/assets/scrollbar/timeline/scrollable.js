import { TimelineMax } from 'gsap'
import { Component } from 'yuzu'
import { inViewport } from '../base/utils'
import Scroller from './scroller'

const getOffset = (el) => {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }
}

class Scrollable extends Component {
  init () {
    this.offset = 0
    this.bounds = {
      top: 0,
      height: 0,
      bottom: 0
    }
    this.active = false
    this.perc = 0
    this.progress = 0
    this.isResized = false

    this.scroller = new Scroller({
      el: this.$el
    })

    this.bind()
  }

  beforeDestroy () {
    this.off()
  }

  initTimeline () {
    this.tl = new TimelineMax({ paused: true })
    this.tl.time(this.progress)
    this.tl.progress(0)

    this.tlAppear = new TimelineMax({ paused: true })
  }

  bind () {
    this.init = this.init.bind(this)
    this.resize = this.resize.bind(this)
  }

  start () {
    this.scroller.register(this)
  }

  raf (y) {
    this.isInViewport = inViewport(this.$el)

    if ((!this.isInViewport && (this.perc >= 1 || this.perc <= 0))) {
      return
    }

    this.perc = this.boundsAnim ? this.scroller.getPerc(this.boundsAnim, y) : 0

    if (this.tl) {
      this.tl.progress(this.perc)
    }
  }

  off () {
    this.scroller.unRegister(this)
  }

  resize () {
    this.bounds.top = Math.floor(getOffset(this.$el).top - window.scrollY)
    this.bounds.height = this.$el.getBoundingClientRect().height
    this.bounds.width = this.$el.getBoundingClientRect().width
    this.bounds.bottom = this.bounds.top + this.bounds.height

    if (this.tl) {
      this.progress = this.tl.time()
      this.tl.kill()
    }

    if (this.tlAppear) {
      this.tlAppear.kill()
    }

    this.isResized = false
  }
}

export default Scrollable
