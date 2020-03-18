import { Component } from 'yuzu'
import { TimelineMax, Expo, TweenMax } from 'gsap/all'
import { qs, qsa, hasClass, removeClass, stringToDOM } from '../base/utils'

class Dropdown extends Component {
  static root = '[data-dropdown="social"]';

  options = {
    withController: false
  }

  state = {
    isOpen: false,
    isAnimating: false,
    dropdown: '',
    height: 0
  }

  listeners = {
    'click': (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.toggleDropdown()
    }
  }

  selectors = {
    arrow: '[dropdown-arrow]'
  }

  init() {
    this.setState({ dropdown: this.$el.getAttribute('data-dropdown') })
    this.$els.container = qs(`[data-dropdown-container=${this.getState('dropdown')}]`)

    // set sub dropdowns
    qsa('[data-dropdown]', this.$el).forEach((el, i) => {
      this.setRef({
        id: `dropdown${i}`,
        component: Dropdown,
        el,
        opts: {
          $toggle: 'a',
          $menu: 'div'
        }
      })
    })

    if (hasClass(this.$el, 'not-clickable')) {
      removeClass(this.$el, 'not-clickable')
    }

    if (!this.options.withController) {
      this.setEvents()
    }

    if (!this.$els.arrow) {
      this.setArrow()
    }

    this.setState({ height: this.$els.container.clientHeight })
    TweenMax.set(this.$els.container, { height: 0, autoAlpha: 1 })
  }

  setArrow() {
    this.$els.arrow = stringToDOM('<svg class="dropdown-arrow o-icon o-icon--arrow"><use xlink:href="#arrow-down"/></svg>')
    this.$el.appendChild(this.$els.arrow)
  }

  setEvents() {
    Object.values(this.$refs).forEach(listener => {
      listener.on('dropdown:opening', (current) => {
        const others = Object.values(this.$refs).filter(filter => current.el !== filter.el)
        others.forEach(child => child.toggleDropdown(false, true))
      })
    })

    this.on('dropdown:closing', () => {
      Object.values(this.$refs).forEach(current => current.toggleDropdown(false, true))
    })
  }

  toggleDropdown(force = false) {
    if (this.getState('isAnimating') && !force) return

    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
    this.setState({ isAnimating: true })
    const val = this.state.isOpen

    const { height } = this.state
    const tl = new TimelineMax({ onComplete: () => { this.setState({ isAnimating: false }) } })

    if (val) {
      tl
        .addLabel('start')
        .to(this.$els.container.children, 0.4, { autoAlpha: 0 }, 'start')
        .to(this.$els.container, 0.7, { height: 0, ease: Expo.easeInOut }, 'start')
        .set(this.$els.container.children, { clearProps: 'all' })
        .set([this.$el, this.$els.arrow], { className: '-=is-open' })
        .add(() => {
          this.emit('dropdown:closing', this)
        })
    } else {
      tl
      .addLabel('start', '+=0.2')
      .set([this.$el, this.$els.arrow], { className: '+=is-open' }, 'start')
      .set(this.$els.container, { autoAlpha: 1 }, 'start')
      .to(this.$els.container, 0.7, { height, ease: Expo.easeInOut, clearProps: 'all' }, 'start')
      .fromTo(this.$els.container.children, 0.6, { autoAlpha: 0 }, { autoAlpha: 1 }, 'start')

      this.emit('dropdown:opening', this)
    }
  }
}

export default Dropdown