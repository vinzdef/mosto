import { Component } from 'yuzu'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import { qs } from '../base/utils'

export default class Gallery extends Component {
  listeners = {
    'click': () => {
      this.openPhotoSwipe()
    }
  }

  openPhotoSwipe() {
    const index = parseInt(this.$el.parentElement.getAttribute('data-current-index')) || 0
    const body = qs('[data-post-title]')
    let title = ''

    if (body) {
      title = body.getAttribute('data-post-title') || ''
    }

    this.slides = JSON.parse(this.$el.getAttribute('data-trigger-gallery'))
    this.slides.map(slide => Object.assign(slide, { title }))

    this.gallery = new PhotoSwipe(qs('.pswp'), PhotoSwipeUI_Default, this.slides, {
      preload: [1,2],
      index,
      pinchToClose: true,
      closeOnScroll: true,
      closeOnVerticalDrag: true,
      showHideOpacity: true
    })

    this.gallery.listen('gettingData', (index, item) => {
      if (item.w < 2 || item.h < 2) {
        const img = new Image()
        img.onload = () => {
            item.w = this.width
            item.h = this.height
            this.gallery.updateSize(true)
        }

        img.src = item.src
      }
    })

    this.gallery.init()
  }
}