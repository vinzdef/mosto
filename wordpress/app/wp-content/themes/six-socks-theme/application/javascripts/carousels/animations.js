import { Power4, TimelineMax, Expo } from 'gsap'
import { qsa, isMobile } from '../../base/utils'

const Animations = new Map()
const getTl = (me) => new TimelineMax({
  paused: true,
  onComplete: () => {
    me.animating = false
  }
})

Animations.set('multi', (event, slider, slides) => {
  const me = slider
  const index = event.current
  const tl = getTl(me)
  const bounds = slides[index].getBoundingClientRect()

  me.animating = true

  tl
  .add('start')
  .to(slides, 1.2, {
    x: -bounds.width * index,
    ease: Expo.easeInOut
  }, 'start')

  tl.restart()
})

Animations.set('split', (event, slider, slides) => {
  const me = slider
  const index = event.current // array index
  const previous = event.previous // array index
  const tl = getTl(me)
  const images = qsa('[data-image]', me.el)
  const currentTexts = qsa('[data-enter]', slides[index])
  const oldTexts = qsa('[data-enter]', slides[previous])

  me.animating = true

  tl
  .add('start')
  .set(slides[previous], { autoAlpha: 1 })
  .set(slides[index], { autoAlpha: 1 })
  .to(oldTexts, 1, {
    autoAlpha: 0,
    ease: Power4.easeInOut
  }, 'start')
  .staggerFromTo(currentTexts, 1.4, {
    autoAlpha: 0,
    x: 10
  }, {
    autoAlpha: 1,
    x: 0,
    ease: Power4.easeInOut
  }, 0.1, 'start')
  .to(images[previous], 1, { autoAlpha: 0 }, 'start')
  .fromTo(images[index], 1, { autoAlpha: 0, zIndex: 1 }, { autoAlpha: 1 }, 'start')

  tl.restart()
})

Animations.set('fullscreen', (event, slider, slides) => {
  const me = slider
  const index = event.current // array index
  const previous = event.previous // array index
  const tl = getTl(me)
  const currentImages = qsa('[data-enter="image"]', slides[index])
  const currentTexts = qsa('[data-enter="text"]', slides[index])
  const oldTexts = qsa('[data-enter="text"]', slides[previous])

  me.animating = true

  tl
    .set(slides[index], { autoAlpha: 0, zIndex: 2, className: '+=is-active' })
    .set(slides[previous], { zIndex: 1, className: '-=is-active' })

    .to(oldTexts, 1, {
      autoAlpha: 0,
      y: 10,
      ease: Power4.easeInOut
    })

    .add('start')
    .set(slides[index], { autoAlpha: 1, zIndex: 2 }, 'start')

    .staggerFromTo(currentTexts, 1.4, {
      autoAlpha: 0,
      y: 10
    }, {
      autoAlpha: 1,
      y: 0,
      ease: Power4.easeInOut
    }, 0.1, 'start')
    .fromTo(currentImages, 1.8, {
      autoAlpha: 0,
      scale: 2
    }, {
      scale: 1,
      autoAlpha: 1,
      ease: Expo.easeInOut
    }, 'start')

    .set(slides[previous], { clearProps: 'all' })

  tl.restart()
})

Animations.set('cards', (event, slider, slides) => {
  const me = slider
  const index = event.current // array index
  const previous = event.previous // array index
  const tl = getTl(me)
  const size = isMobile() ? 10 : 20

  me.animating = true
  const init = slides.slice(0, index)
  const end = slides.slice(index, slides.length)
  const newArray = [...end, ...init]

  tl
    .to(slides[previous], 0.6, {
      autoAlpha: 0,
      ease: Power4.easeInOut
    })
    .add('end-=0.2')
    .set(newArray, { zIndex: (i) => -i }, 'end')
    .set(slides[previous], {
      zIndex: -slides.length,
      autoAlpha: 0,
      x: -size * (slides.length),
      y: size * (slides.length)
    }, 'end')
    .staggerTo(newArray, 0.6, {
      x: `+=${size}`,
      y: `-=${size}`,
      ease: Power4.easeInOut
    }, 0.03, 'end')
    .to(slides[previous], 0.6, {
      autoAlpha: 1,
      ease: Power4.easeInOut
    }, 'end')

  tl.restart()
})

export default Animations