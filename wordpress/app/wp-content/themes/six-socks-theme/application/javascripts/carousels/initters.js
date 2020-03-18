import { TweenMax } from 'gsap'
import { qsa, qs, isMobile } from '../../base/utils'

const Initters = new Map()

Initters.set('split', (slider, slides, currentSlideIdx) => {
  const currentSlide = slides[currentSlideIdx]
  const images = qsa('[data-image]', slider.el)
  const currentEnters = qsa('[data-enter]', currentSlide)
  const currentImage = qsa('[data-image]', slider.el)[0]

  if (!currentSlide) return

  TweenMax.set([...slides], { position: 'relative' })

  const height = [slides[0], ...slides].reduce((prev, current) => {
    return (prev.clientHeight > current.clientHeight) ?
      prev.clientHeight :
      current.clientHeight
  })


  TweenMax.set(slides[0].parentElement, { height })
  TweenMax.set([...slides], { clearProps: 'all' })

  if (slides.length <= 1) {
    TweenMax.set(qs('.c-carousel__controls', slider.el), { display: 'none' })
  }

  TweenMax.set([...images, ...slides], { autoAlpha: 0, zIndex: 0 })
  TweenMax.set([...currentEnters, currentImage, currentSlide], { autoAlpha: 1, zIndex: 2 })
})

Initters.set('multi', (slider, slides, currentSlideIdx) => {
  const currentSlide = slides[currentSlideIdx]

  if (!currentSlide) return

  if (slides.length <= 2) {
    TweenMax.set(qs('[data-controls]', slider.el), { display: 'none' })
  }

  TweenMax.set([...slides], { position: 'relative' })
})

Initters.set('fullscreen', (slider, slides, currentSlideIdx) => {
  const currentSlide = slides[currentSlideIdx]
  const images = qsa('[data-image]', slider.el)
  const currentEnters = qsa('[data-enter]', currentSlide)
  const currentImage = qsa('[data-image]', slider.el)[0]

  if (!currentSlide) return

  TweenMax.set([...images, ...slides], { autoAlpha: 0, zIndex: 0 })
  TweenMax.set([...currentEnters, currentImage, currentSlide], { autoAlpha: 1, zIndex: 2 })
})

Initters.set('cards', (slider, slides, currentSlideIdx) => {
  const currentSlide = slides[currentSlideIdx]
  const size = isMobile() ? 10 : 20

  if (!currentSlide) return

  TweenMax.set(slides, {
    x: (i) => -size * i,
    y: (i) => size * i,
    zIndex: (i) => -i
  })
  TweenMax.set([currentSlide], { autoAlpha: 1, zIndex: 2 })
})

export default Initters