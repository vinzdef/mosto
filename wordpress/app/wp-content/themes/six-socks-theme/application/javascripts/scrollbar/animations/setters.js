import { TweenMax, TimelineMax, Power2 } from 'gsap'
import SplitText from '../../../vendors/gsap/commonjs-flat/SplitText'

const setters = new Map()

setters.set('image', (el) => {
  const tl = new TimelineMax()

  tl
  .set(el, {
    scale: 1,
    autoAlpha: 0
  })
})

setters.set('top', (el) => {
  TweenMax.set(el, { autoAlpha: 0 })
})

setters.set('tag', (el) => {
  TweenMax.set(el, {
    webkitClipPath: 'inset(0% 100% 0.02% 0%)',
    clipPath: 'inset(0% 100% 0.02% 0%)'
  })
})

setters.set('text', (el) => {
  const tl = new TimelineMax()

  tl.set(el, { autoAlpha: 0 })
})

setters.set('skew', () => {})

setters.set('fade', (el) => {
  TweenMax.set(el, { autoAlpha: 0 })
})

setters.set('scale', (el) => {
  TweenMax.from(el, 0.6, {
    scale: 0,
    delay: 0.2,
    ease: Power2.easeOut,
    clearProps: 'transform'
  })
})

setters.set('blur', (el) => {
  TweenMax.set(el, { autoAlpha: 0 })
})

setters.set('polaroid', (el) => {
  TweenMax.set(el, { autoAlpha: 0 })
})

setters.set('parallax', () => {})

export default setters