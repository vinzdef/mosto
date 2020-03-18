import { qs, qsa } from '../base/utils'

export default function () {
  const youtubeCards = qsa('.c-youtubeCard')
  const nextReleases = qsa('.c-small-release')
  const postShare = qsa('.stickyEl_share')
  const releaseShare = qs('.release__share')
  const stores = qsa('.c-store')
  const banner = qs('.c-articleBanner')

  if (youtubeCards) {
    youtubeCards.forEach((el) => {
      el.addEventListener('click', (e) => {
        gtag('event', 'home', {
          event_category: 'video',
          event_label: el.querySelector('h4').innerHTML
        })
      })
    })
  }

  if (nextReleases) {
    nextReleases.forEach((el) => {
      el.addEventListener('click', (e) => {
        gtag('event', 'home', {
          event_category: 'release',
          event_label: el.querySelector('.c-small-release__title').innerHTML
        })
      })
    })
  }

  if (postShare) {
    postShare.forEach((el) => {
      el.addEventListener('click', (e) => {
        gtag('event', el.getAttribute('title'), {
          event_category: 'share',
          event_label: document.querySelector('h1').innerHTML
        })
      })
    })
  }

  if (stores) {
    stores.forEach((el) => {
      const link = el.querySelector('a')
      link.addEventListener('click', (e) => {
        gtag('event', el.querySelector('.c-store__name').innerHTML, {
          event_category: 'store',
          event_label: document.querySelector('.release__title').innerHTML
        })
      })
    })
  }

  if (releaseShare) {
    const links = qsa('a', releaseShare)
    links.forEach((el) => {
      el.addEventListener('click', (e) => {
        gtag('event', el.getAttribute('title'), {
          event_category: 'share',
          event_label: document.querySelector('.release__title').innerHTML
        })
      })
    })
  }

  if (banner) {
    const link = banner.querySelector('a')
    link.addEventListener('click', (e) => {
      gtag('event', link.getAttribute('data-banner-position'), {
        event_category: 'banner',
        event_label: link.getAttribute('href')
      })
    })
  }

}

// gtag('event', 'click', 'STORE_NAME', 'NOME AZIONE', 'PRODUCT_NAME”');