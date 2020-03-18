import { Component } from 'yuzu'
import { TimelineMax, TweenMax } from 'gsap'

import { qs, stringToDOM } from '../../base/utils'

class Counter extends Component {
  mounted() {
    this.$els.count = qs('[data-counter="count"]', this.$el)
    this.$els.total = qs('[data-counter="total"]', this.$el)

    this.count = stringToDOM('<span></span>')
    this.total = stringToDOM('<span></span>')

    this.$els.count.appendChild(this.count)
    this.$els.total.appendChild(this.total)

    TweenMax.set([this.$els.count, this.$els.total], {
      overflow: 'hidden'
    })
  }

  state = {
    count: '0',
    total: '0'
  }

  actions = {
    count(text) {
      const tl = new TimelineMax()

      tl
      .to(this.count, 0.5, {
        yPercent: 100
      })
      .add(() => {
        this.count.innerHTML = text + 1
      })
      .to(this.count, 0.5, {
        yPercent: 0
      })
    },

    total(text) {
      const tl = new TimelineMax()

      tl
      .to(this.total, 0.5, {
        yPercent: 100
      })
      .add(() => {
        this.total.innerHTML = text
      })
      .to(this.total, 0.5, {
        yPercent: 0
      })
    }
  }
}

export default Counter