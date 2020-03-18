import { Component } from 'yuzu'
import { TweenMax } from 'gsap'
import { setCookie, getCookie } from '../base/utils'
import { Expo } from 'gsap/all';

export default class CookieBar extends Component {
  state = {
    opened: false,
  }

  listeners = {
    'click @close': () => {
      this.setState({ opened: false})
      setCookie('cookieBannerAccepted', true, 90)
    }
  }

  actions = {
    opened: 'toggle',
  }

  selectors = {
    close: '[data-cookie-close]'
  }

  ready() {
    if (getCookie('cookieBannerAccepted')) {
      this.setState({ opened: false})
    } else {
      this.setState({  opened: true })
    }
  }

  toggle(val, prev) {
    if (val === prev) return

    if (val) {
      if (getCookie('cookieBannerAccepted') === 'true') return
      this.$el.style.display = 'flex'
      TweenMax.to(this.$el, .6, {
        y: 0,
        ease: Expo.easeInOut
      })
    } else {
      TweenMax.to(this.$el, .6, {
        yPercent: 100,
        ease: Expo.easeInOut,
        onComplete: () => {
          this.$el.style.display = 'none'
          this.$el.parentNode.removeChild(this.$el)
        }
      })
    }
  }
}

