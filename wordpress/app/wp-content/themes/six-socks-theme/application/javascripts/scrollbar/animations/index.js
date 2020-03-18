import inViewport from 'in-viewport'

import RafScroll from '../native-scroll'
import { isMobile, qsa } from '../../../base/utils'
import animations from '../animations'
import setters from '../setters'
// import AABB from './aabb'

class Smooth {
  constructor() {
    this.lastScrollY = 0
    this.ticking = false

    this.$els = []
    this.$els.animate = qsa('[data-animation]')
    this.$els.videos = qsa('[data-video]')

    RafScroll.add(this.listenScroll.bind(this))
    this.setInitialState()
  }

  listenScroll() {
    if (this.$els.hero) {
      this.heroListener()
    }

    this.$els.animate.forEach((el, i) => {
      if (isMobile() && el.getAttribute('data-animation') === 'parallax') return

      if (inViewport(el, { offset: 400 }) && el.getAttribute('data-animation') === 'parallax') {
        animations.get('parallax')(el, i)
      } else if (inViewport(el, { offset: -100 }) && !el.hasAttribute('data-animated')) {
        el.setAttribute('data-animated', '')

        const type = el.getAttribute('data-animation')
        animations.get(type)(el)
      }

      // this.videos.forEach((el) => {
      //   if (this.scrollbar.isVisible(el) && el.getAttribute('data-video') === 'paused') {
      //     el.setAttribute('data-video', 'playing')
      //     el.play()
      //   } else if (!this.scrollbar.isVisible(el) && el.getAttribute('data-video') === 'playing') {
      //     el.setAttribute('data-video', 'paused')
      //     el.pause()
      //   }
      // })

    })

    this.ticking = false
  }

  setInitialState() {
    this.$els.animate.forEach((el) => {
      if (isMobile() && el.getAttribute('data-animation') === 'parallax') return

      const type = el.getAttribute('data-animation')
      setters.get(type)(el)
    })
  }
}

export default Smooth