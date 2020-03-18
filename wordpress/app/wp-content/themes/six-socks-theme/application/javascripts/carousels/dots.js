import { Component } from 'yuzu'

import { qsa, stringToDOM } from '../../base/utils'

class Dots extends Component {

  mounted() {
    for (let i = 0; i < this.getState('lenght'); i += 1) {
      const dot = stringToDOM('<span data-dot></span>')
      this.$el.appendChild(dot)
    }

    this.$els.dots = qsa('[data-dot]', this.$el)
  }

  state = {
    length: 0
  }

  actions = {
    index(index, old) {

      if (this.$els.dots.length) {
        this.$els.dots[old || 0].removeAttribute('data-active')
        this.$els.dots[index].setAttribute('data-active', '')
      }
    }
  }
}

export default Dots