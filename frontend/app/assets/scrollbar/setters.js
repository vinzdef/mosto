import { TweenMax } from 'gsap'

const setters = new Map()

setters.set('stagger', (el) => {
  TweenMax.set(el, { autoAlpha: 0 })
})

setters.set('title', (el) => {
  TweenMax.set(el, { autoAlpha: 0 })
})

setters.set('fade', (el) => {
  TweenMax.set(el, { autoAlpha: 0 })
})

setters.set('paint', (el) => {
  TweenMax.set(el, { autoAlpha: 0 })
})

export default setters
