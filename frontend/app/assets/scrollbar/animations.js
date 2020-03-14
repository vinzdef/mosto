import { TimelineMax, TweenMax, Power2 } from 'gsap'
import { round } from 'lodash'
let SplitText

if (process.client) {
  SplitText = require('../gsap/bonus-files-for-npm-users/SplitText').SplitText
}

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max)
}

const animations = new Map()
const lerp = (a, b, n) => ((1 - n) * a) + (n * b)

animations.set('stagger', (el) => {
  const splits = new SplitText(el, { type: 'lines' })

  TweenMax.set(el, { autoAlpha: 1 })
  TweenMax.staggerFrom(splits.lines, 1.2, {
    yPercent: 30,
    autoAlpha: 0,
    ease: Power2.easeOut,
    delay: 0.5
  }, 0.05)
})

animations.set('title', (el) => {
  const splits = new SplitText(el, { type: 'chars' })

  TweenMax.set(el, { autoAlpha: 1 })
  TweenMax.staggerFrom(splits.chars, 0.7, {
    xPercent: 10,
    autoAlpha: 0,
    ease: Power2.easeOut,
    delay: 0.5
  }, 0.05)
})

animations.set('fade', (el) => {
  TweenMax.set(el, { clearProps: 'all' })
  TweenMax.from(el, 1.2, {
    autoAlpha: 0,
    delay: 0.2,
    yPercent: 2,
    ease: Expo.easeInOut,
    clearProps: 'all'
  })
})

animations.set('paint', (el) => {
  TweenMax.set(el, { clearProps: 'all' })
  TweenMax.from(el, 1.2, {
    autoAlpha: 0,
    delay: 0.2,
    ease: Power2.easeOut,
    clearProps: 'all'
  })
})

animations.set('parallax', (el) => {
  const { top, width } = el.getBoundingClientRect()
  const wW = window.innerHeight
  const t =  round(top - ((wW - width) / 2), 2)
  const transform = t.clamp(-wW, wW) / wW

  TweenMax.set(el, {
    y: el.getAttribute('data-parallax') * transform * -100
  })
})

export default animations
