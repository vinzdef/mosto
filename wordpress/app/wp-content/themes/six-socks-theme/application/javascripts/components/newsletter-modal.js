import { Component } from 'yuzu'
import { TimelineMax } from 'gsap'
import RafScroll from '../scrollbar/native-scroll'
import { setBodyFixed, setCookie, getCookie } from '../base/utils'

export default class Newsletter extends Component {
  state = {
    opened: false,
  }

  listeners = {
  }

  actions = {
    opened: 'toggle',
  }

  selectors = {
    wrapper: '[data-newsletter-wrapper]',
    close: '[data-newsletter-close]'
  }

  initialize() {
    this.$els.trigger = document.body.getBoundingClientRect().height / 3

    TweenLite.set(this.$el, { autoAlpha: 0 })

    RafScroll.add(e => {
      if(e.scrollY >= this.$els.trigger) {

        this.setState({ opened: true})
      }
    })

    this.$el.addEventListener('click', (e) => {
      e.stopPropagation()
      if(e.target === e.currentTarget) {
        this.setState({ opened: false})
      }
    })

    this.$els.close.addEventListener('click', () => {
      this.setState({ opened: false})
    })

    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.setState({opened: false})
      }
    })
  }

  toggle(val, prev) {
    if (val === prev) return

    if(val) {
      if(getCookie('newsletterOpened') === 'true') return
      this.show()
    }else {
      this.hide()
    }
  }

  show() {
    setCookie('newsletterOpened', true, 5)
    const tl = new TimelineMax()
    setBodyFixed(true)

    tl
      .set(this.$els.wrapper, {
        autoAlpha: 0,
        rotationY: -20,
        rotationX: -20
      })
      .to(this.$el, 0.6, {
        autoAlpha: 1
      })
      .to(this.$els.wrapper, 0.8, {
        rotationX: 0,
        rotationY: 0,
        autoAlpha: 1
      }, '-=.2')
      .add(() => {
        this.$els.wrapper.setAttribute('tabindex', '0')
        this.$els.wrapper.setAttribute('aria-hidden', 'false')
        this.$els.wrapper.focus()
      })
  }

  hide() {
    const tl = new TimelineMax()
    setBodyFixed(false)

    tl
      .to(this.$els.wrapper, 0.4, {
        rotationX: -20,
        rotationY: -20,
        autoAlpha: 0
      })
      .to(this.$el, 0.2, {
        autoAlpha: 0
      }, '-=.2')
      .set(this.$el, {
        display: 'none'
      })
  }
}
