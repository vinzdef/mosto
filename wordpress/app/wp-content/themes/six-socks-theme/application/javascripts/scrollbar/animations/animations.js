import { TimelineMax, Expo, Power2, TweenMax } from 'gsap'

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
}

const animations = new Map()
const lerp = (a, b, n) => ((1 - n) * a) + (n * b)

animations.set('top', (el) => {
  const tl = new TimelineMax()

  tl
    .fromTo(el, 1.2, {
      yPercent: 20,
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      yPercent: 0,
      ease: Expo.easeInOut,
      clearProps: 'transform, visibility, opacity'
    })
})

animations.set('fade', (el) => {
  TweenMax.to(el, 1.4, {
    autoAlpha: 1,
    delay: 0.3,
    ease: Expo.easeInOut
  })
})

animations.set('scale', (el) => {
  TweenMax.from(el, 0.6, {
    scale: 0,
    delay: 0.2,
    ease: Power2.easeOut,
    clearProps: 'transform'
  })
})

animations.set('parallax', (el) => {
  const { top, height } = el.getBoundingClientRect()
  const wH = window.innerHeight
  const t = (top - ((wH - height) / 2))
  const transform = t.clamp(-wH, wH) / wH

  TweenMax.set(el, {
    y: el.getAttribute('data-parallax') * transform
  })
})

export default animations