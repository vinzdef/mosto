import { Component } from 'yuzu'

export default class RafflePick extends Component {
  state = {
    url: '',
    toggle: false
  }

  listeners = {
    'click': e => {
      e.preventDefault()
      e.stopPropagation()

      this.setState({ toggle: !this.getState('toggle') })
    }
  }

  actions = {
    toggle: 'toggle',
  }

  ready() {
    this.setState({ url: this.$el.getAttribute('data-raffle-pick') })

    if (!JSON.parse(localStorage.getItem('raffles'))) {
      localStorage.setItem('raffles', JSON.stringify({}))
    }

    const rafflePick = JSON.parse(localStorage.getItem('raffles'))
    const bool = rafflePick[this.getState('url')]

    this.setState({ toggle: bool })
    this.$el.innerHTML = bool ? 'iscritto' : 'non iscritto'
  }

  setItem(key, value) {
    const store = localStorage.getItem('raffles')
    const existing = store ? JSON.parse(store) : {}
	  existing[key] = value
    localStorage.setItem('raffles', JSON.stringify(existing))
  }

  toggle(val, prev) {
    if (val === prev) return

    this.setItem(this.getState('url'), val)

    this.$el.innerHTML = val ? 'iscritto' : 'non iscritto'
  }
}

