import { TimelineMax, Expo } from 'gsap'
import { qs, qsa } from '~/assets/scripts/utils'

const loaderIn = (element, callback) => {
  const tl = new TimelineMax({ paused: true, onComplete: callback })

  tl.addLabel('start')
    .fromTo(element, 0.8, {
      yPercent: 100
    }, {
      yPercent: 0,
      ease: Expo.easeOut
    })

  return tl
}

const loaderOut = (element, callback) => {
  const tl = new TimelineMax({ paused: true, onComplete: callback })

  tl
    .addLabel('start')
    .to(element, 1, {
      yPercent: -100,
      ease: Expo.easeIn
    })

  return tl
}

export { loaderIn, loaderOut }
