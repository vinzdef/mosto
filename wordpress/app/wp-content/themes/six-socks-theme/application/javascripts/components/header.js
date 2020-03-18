import { Component } from 'yuzu'
import { addClass, removeClass, hasClass, qs } from '../base/utils'
import Dropdown from './dropdown'
import RafScroll from '../scrollbar/native-scroll'

export default class Hamburger extends Component {
  options = {
    backgroundClass: 'is-backgrounded'
  }

  listeners = {
    'click': () => {
      const { opened } = this.state
      this.setState({ opened: !opened })
    }
  }

  state = {
    isDropdownOpen: false
  }

  actions = {
    opened: 'toggle'
  }

  init(val) {
    const socialDropdown = qs('#social-dropdown')

    this.setRef({
      id: 'dropdown',
      component: Dropdown,
      el: Dropdown.root
    })

    TweenMax.set(socialDropdown, { autoAlpha: 1 })

    this.$refs.dropdown.on('dropdown:opening', () => {
      this.setState({ isDropdownOpen: true })
      addClass(this.$el, this.options.backgroundClass)
    })

    this.$refs.dropdown.on('dropdown:closing', () => {
      this.setState({ isDropdownOpen: false })
    })

    RafScroll.add(e => {
      const { top, height } = this.$el.getBoundingClientRect()
      socialDropdown.style.top = `${top + height}px`

      if (e.deltaY !== 0 && this.getState('isDropdownOpen')) {
        this.$refs.dropdown.setState({ isOpen: false })
        this.$refs.dropdown.toggleDropdown(true)
      }

      if (this.getState('isDropdownOpen')) return

      if (
        e.scrollY > 100 &&
        !hasClass(this.$el, this.options.backgroundClass)
      ) {
        addClass(this.$el, this.options.backgroundClass)
      } else if (
        e.scrollY <= 100 &&
        hasClass(this.$el, this.options.backgroundClass)
      ) {
        removeClass(this.$el, this.options.backgroundClass)
      }
    })
  }
}