import inViewport from 'in-viewport'
import RafScroll from './native-scroll'
import animations from './animations/animations'
import { isMobile, qsa } from '../base/utils'

export default class EnterAnimations {
  constructor() {
    this.ticking = false

    this.$els = []
    this.$els.animate = qsa('[data-animation]')

    RafScroll.add(this.listenScroll.bind(this))
    this.listenScroll()
  }

  listenScroll() {
    this.$els.animate.forEach((el, i) => {
      if (isMobile() && el.getAttribute('data-animation') === 'parallax') return

      if (inViewport(el, { offset: 400 }) && el.getAttribute('data-animation') === 'parallax') {
        animations.get('parallax')(el, i)
      } else if (inViewport(el, { offset: -100 }) && !el.hasAttribute('data-animated')) {
        el.setAttribute('data-animated', '')

        const type = el.getAttribute('data-animation')
        animations.get(type)(el)
      }
    })

    this.ticking = false
  }
}