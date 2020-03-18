import { qsa, addClass } from './utils'

export default function lazyLoad() {
  let observer
  const options = {
    rootMargin: '0px',
    threshold: 0.1
  }

  const images = qsa('img.lazy')
  const fetchImage = (url) => new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = resolve
    image.onerror = reject
  })

  const loadImage = (image) => {
    const { src } = image.dataset

    fetchImage(src).then(() => {
      image.src = src
      addClass(image, 'lazy-loaded')
    })
  }

  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry && entry.isIntersecting) {
        loadImage(entry.target, entry.target.localName)
      }
    })
  }

  if ('IntersectionObserver' in window) {
    observer = new window.IntersectionObserver(handleIntersection, options)
  } else {
    Array.from(images).forEach(image => loadImage(image))
  }

  images.forEach(img => {
    observer.observe(img)
  })
}