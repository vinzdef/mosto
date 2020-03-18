import { Component } from 'yuzu'
import { qs, qsa } from '../base/utils';
import { TimelineMax, Expo, Power0, TweenLite } from 'gsap'

export default class Menu extends Component {
  state = {
    opened: false
  }

  listeners = {
    'click': () => {
      const { opened } = this.state
      this.setState({ opened: !opened })
    },
  }

  actions = {
    opened: 'toggle'
  }

  initialize() {
    this.$els.menu = qs('[data-menu-mobile]')
    this.$els.close = qs('[data-menu-close]')
    this.$els.items = qsa('.c-menu__item')

    TweenLite.set(this.$els.menu, { xPercent: 100 })

    this.$els.close.addEventListener('click', () => {
      this.setState({ opened: false })
    })
  }

  toggle(val, prev) {
    if (val === prev) return

    const tl = new TimelineMax()

    if (val) {

      tl
        .add('start')
        .set(this.$els.menu, {
          display: 'block'
        })
        .to(this.$els.menu, 1, {
          xPercent: 0,
          ease: Expo.easeInOut,
        })
        .staggerFromTo(this.$els.items, 1, {
          x: 40,
          autoAlpha: 0
        },{
          x: 0,
          autoAlpha: 1,
          ease: Expo.easeInOut,
        }, 0.02, 'start')

    } else {
      tl
        .add('start')
        .staggerFromTo(this.$els.items, 0.7, {
          autoAlpha: 1,
          x: 0,
        },{
          x: 40,
          autoAlpha: 0,
          ease: Expo.easeInOut,
        }, 0.02, 'start')
        .to(this.$els.menu, 1, {
          xPercent: 100,
          ease: Expo.easeInOut
        }, 'start')
        .set(this.$els.menu, {
          display: 'none'
        })
    }
  }
}