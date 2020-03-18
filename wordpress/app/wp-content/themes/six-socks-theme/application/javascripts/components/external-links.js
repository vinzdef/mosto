import { qs, qsa, handleEvent } from '../base/utils'
// import Adv, { linkToAffiliate } from './adv'

export default function () {
  const content = qs('.text')

  // Adv()

  if (!content) return

  const links = qsa('a', content)
  const reg = new RegExp(`/${window.location.host}/`)

  if (!links.length) {
    return false
  }

  links.forEach((el) => {
    handleEvent('click', {
      onElement: el,
      withCallback: e => {
        if (!reg.test(el.href)) {
          e.stopImmediatePropagation()
          e.preventDefault()
          e.stopPropagation()

          ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: e.target.href
          })

          window.open(el.href, '_blank')
        }
      }
    })
  })
}