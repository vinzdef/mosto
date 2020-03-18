import Slideer from './slideer'
import Animations from './animations'
import Initters from './initters'

class SlideshowManager {
  constructor(el, opts) {
    const slides = Array.from(el.querySelectorAll('[data-slide]'))
    const callback = Animations.get(opts.type)
    const dots = opts.dots !== undefined ? opts.dots : true
    const clickOnParent = opts.clickOnParent

    this.slider = new Slideer({
      length: slides.length,
      loop: true,
      counter: true,
      dots,
      clickOnParent,
      callback: (event) => callback(event, this.slider, slides)
    }).mount(el)

    Initters.get(opts.type)(this.slider, slides, 0)

    if (slides.length <= 1) {
      this.slider.destroy()
      return false
    }
  }

  removeSlideshow() {
    this.slider.destroy()
  }
}

export default SlideshowManager