import inViewport from 'in-viewport'
import { isMobile, qsa } from '../scripts/utils'
import animations from './animations'
import setters from './setters'
import Scrollbar from '.'
import scrollbar from '.'

export default class EnterAnimations {
  constructor () {
    this.ticking = false

    this.$els = []
    this.$els.animate = qsa('[data-animation]')
    this.$els.parallax = qsa('[data-parallax]')

    this.setInitialState()
    Scrollbar.add(this.listenScroll.bind(this))

    this.listenScroll()
  }

  enterAnim (el) {
    el.setAttribute('data-animated', '')
    const type = el.getAttribute('data-animation')
    animations.get(type)(el)
  }

  listenScroll (el) {
    this.$els.parallax.forEach((el, i) => {
      if (inViewport(el, { offset: 400 })) {
        animations.get('parallax')(el)
      }
    })

    this.$els.animate.forEach((el, i) => {
      if (!el.hasAttribute('data-animated') && inViewport(el)) {
        this.enterAnim(el)
      }
    })

    this.ticking = false
  }

  setInitialState () {
    this.$els.animate.forEach((el) => {
      if (isMobile() && el.getAttribute('data-animation') === 'parallax') { return }

      const type = el.getAttribute('data-animation')
      setters.get(type)(el)
    })
  }
}
