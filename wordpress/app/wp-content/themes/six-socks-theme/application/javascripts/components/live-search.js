import { Component } from 'yuzu'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { qsa, stringToDOM, setBodyFixed, addClass, qs } from '../base/utils'
import { TweenMax } from 'gsap';

export default class LiveSearch extends Component {
  state = {
    page: 1,
    lastDone: false,
    isOpened: false,
    value: ''
  }

  listeners = {
    'click @open': e => {
      this.$els.input.focus()
      e.preventDefault()
      this.setState({ isOpened: true })
    },

    'click @close': () => {
      this.setState({ isOpened: false })
    },

    'click @bottom': () => {
      this.setState({ page: this.getState('page') + 1 })
      this.debounceSearch()
    },

    'input @input': (e) => {
      e.preventDefault()
      this.setState({ page: 1 })
      this.setState({ value: e.target.value })
      this.$els.results.parentElement.scrollTop = 0
      this.debounceSearch()
    }
  }

  actions = {
    isOpened: (val) => {
      if (val) {
        this.open()
      } else {
        this.close()
      }
    }
  }

  selectors = {
    modal: '[data-search-modal]',
    open: () => qs('[data-search-open]'),
    close: '[data-search-close]',
    input: '#live-search-input',
    bottom: '[data-search-bottom]',
    results: '[data-search-results]',
    form: '.c-live-search__form'
  }

  mounted() {
    this.search = this.search.bind(this)
    this.debounceSearch = debounce(this.search, 300);


    qs('#live-search-form').addEventListener('submit', e => {
      e.preventDefault()
      return false
    })
  }

  open() {
    const tl = new TimelineMax({
      onComplete: () => {
        setBodyFixed(true)
        this.$els.input.focus()
      }
    })

    tl
      .fromTo(this.$els.modal, 0.6, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        ease: Expo.easeInOut
      })
      .fromTo(this.$els.form, 0.6, {
        yPercent: -100,
      }, {
        yPercent: 0,
        ease: Expo.easeInOut,
        onComplete: () => {
          this.$els.input.focus()
        }
      })
  }

  close() {
    const tl = new TimelineMax({
      onComplete: () => {
        setBodyFixed(false)
        this.deleteAll().play()
      }
    })

    //tracking fb
    fbq('track', 'Search', {
      search_string: this.getState('value'),
    });


    tl.to(this.$els.modal, 0.4, {
        autoAlpha: 0,
      }, 'start')
      .to(this.$els.form, 0.6, {
        yPercent: -100,
        ease: Expo.easeInOut,
      }, 'start')
  }

  async search() {
    const { value, page } = this.state

    if (!this.getState('lastDone') && this.cancelToken) {
      this.cancelToken.cancel('Operation canceled by the user.')
    }

    if (value.length < 3) {
      this.deleteAll().play()
      return false
    }

    console.log(page, this.$els.results)
    if (page === 1) {
      TweenMax.set('.c-live-search__bottom', { display: 'none' })
      this.$els.results.innerHTML = ''
    }

    this.setState({ lastDone: false })
    this.cancelToken = axios.CancelToken.source()
    const request = await axios.post(live_search.ajax_url,`action=live_search&keyword=${value}&page=${this.getState('page')}`, {
      url: live_search.ajax_url,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      credentials: 'same-origin',
      cancelToken: this.cancelToken.token
    })

    this.setState({ lastDone: true })
    const response = await request.data
    this.timelineEntries(response).play()
  }

  timelineEntries(response) {
    const tl = new TimelineMax({ paused: true })
    const els = qsa('article', stringToDOM(response))

    els.forEach(el => {
      const image = qs('img.lazy', el)
      const { src } = image.dataset
      image.src = src
      image.classList.add('lazy-loaded')
    })

    // if (value === this.getState('oldValue')) {
    //   this.setState({ page: this.getState('page') + 1 })
    // } else {
    //   this.$els.results.innerHTML = ''
    // }

    if (els.length >= 16) {
      tl.set('.c-live-search__bottom', { display: 'block' }, 'finish')
    } else {
      tl.set('.c-live-search__bottom', { display: 'none' }, 'finish')
    }

    return tl
      .set(els, {
        autoAlpha: 0,
        y: 30
      })
      .add(() => {
        els.forEach(el => { this.$els.results.appendChild(el)  })
      })
      .add('start')
      .to('.c-live-search__results', 0.3, {
        autoAlpha: 1
      }, 'start')
      .staggerTo(els, 0.5, {
        autoAlpha: 1,
        y: 0,
        clearProps: 'all'
      }, 0.08, 'start')
      .add('finish')
  }

  deleteAll() {
    const tl = new TimelineMax({ paused: true })

    return tl
      .set('.c-live-search__bottom', { display: 'none' })
      .to('.c-live-search__results', 0.5, {
        autoAlpha: 0,
        onComplete: () => {
          this.$els.results.innerHTML = ''
        }
    })
  }
}