import Scrollable from '../scrollbar/scrollable'
import { qs, qsa } from '../base/utils'

export default class AppPageScroll extends Scrollable {
  name = 'app-page-scroll'

  init() {
    super.init()

    // this.$els.slideshow = qs('.slider', this.$el)
    // this.$els.title = qs('[data-title]', this.$el)
    // this.$els.layer = qs('[data-layer]', this.$el)
    this.$els.phones = qs('[data-phones]', this.$el)
    // this.$els.background = qs('[data-background]', this.$el)
    // this.$els.hero = qs('.c-stage-hero', this.$el)

    // const { height } = this.$els.phones.getBoundingClientRect()

    this.resize()
    this.start()
  }

  initTimeline() {
    super.initTimeline()

    const images = qsa('[data-phone]', this.$els.phones)
    const soon = qs('[data-soon]', this.$els.phones)

    this.tl
      .add('start')
      .to(images, 1, {
        y: window.innerHeight,
      }, 'start')
      .fromTo(images[0], 1, {
        x: 60,
      },{
        x: -window.innerWidth / 4
      }, 'start')
      .fromTo(images[1], 1, {
        x: -60
      },{
        x: window.innerWidth / 4
      }, 'start')
      .to(soon, 0.4, {
        scale: 1
      }, 'start+=0.6')

  }

  resize() {
    super.resize()

    const { height } = this.$el.getBoundingClientRect()
    this.boundsAnim = {
      top: 0,
      bottom: this.bounds.top + height - window.innerHeight
    }

    this.initTimeline()
  }
}