import { Component } from 'yuzu'
import { qsa, qs, addClass, removeClass, getQueryParams } from '../base/utils'

export default class Filters extends Component {
  state = {
    filter: '*'
  }

  defaultOptions() {
    return {
      buttonSelector: 'data-filter',
      elementSelector: 'data-kind',
      containerSelector: 'data-filter-container'
    }
  }

  listeners = {
    'click @filters': (e, i) => {
      const id = this.$els.filters[i].getAttribute('data-filter')
      const filter = id === this.getState('filter') ? '*' : id
      this.setState({ filter })
      this.doFilter()
    }
  }

  selectors = {
    'filters[]': `[${this.options.buttonSelector}]`,
  }

  init() {
    this.$els.container = qs(`[${this.options.containerSelector}]`)
    this.$els.els = qsa(`[${this.options.elementSelector}]`, this.$els.container)

    this.setState('currentCount', this.$els.els.length)
    this.setState('totalCount', this.$els.els.length)

    if (getQueryParams(document.location.search).filter) {
      this.setState('filter', getQueryParams(document.location.search).filter.replace(/"+/g, ''))
    }

    this.even = this.$els.els.filter(a => this.$els.els.indexOf(a) % 2 === 1)
  }

  doFilter() {
    const tl = new TimelineMax()
    const els = {
      in: [],
      out: []
    }

    this.$els.els.forEach(el => {
      let bool = el.getAttribute(this.options.elementSelector) === this.getState('filter') ? 'in' : 'out'
      if (this.getState('filter') === '*') bool = 'in'
      els[bool].push(el)
    })

    this.setState('currentCount', els.in.length)

    this.$els.filters.forEach(el => {
      if (el.getAttribute(this.options.buttonSelector) === this.getState('filter')) {
        addClass(el, 'is-active')
      } else {
        removeClass(el, 'is-active')
      }
    })

    tl
      .to([...els.out, ...els.in], 0.5, { autoAlpha: 0 })
      .set(els.in, { clearProps: 'all' })
      .set(els.out, { display: 'none' })
      .set(els.in, { autoAlpha: 0 })
      .staggerTo(els.in, 0.4, {
        autoAlpha: 1,
        delay: 0.1,
      }, 0.03)
  }
}