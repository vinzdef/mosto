import preventScroll from 'prevent-scroll'

const camelCaseRegExp = /-([a-z])/ig
const toCamelCase = str => str.replace(camelCaseRegExp, match => match[1].toUpperCase())

export const byId = id => document.getElementById(id)

export const byClassName = (selector, ctx = document) => {
  Array.toArray(ctx.getElementsByClassName(selector))
}

export const qs = (selector, ctx = document) => ctx.querySelector(selector)

export const qsa = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector))

export const toggleClass = (el, className) => {
  el.classList.toggle(className)
}

export const addClass = (el, className) => {
  el.classList.add(className)
}

export const removeClass = (el, className) => {
  el.classList.remove(className)
}

export const hasClass = (el, className) => el.classList.contains(className)

export function handleEvent(eventName, {
  onElement,
  withCallback,
  useCapture = false
} = {}, thisArg) {
  const element = onElement || document.documentElement

  function handler(event) {
    if (typeof withCallback === 'function') {
      withCallback.call(thisArg, event)
    }
  }

  handler.destroy = function destroy() {
    return element.removeEventListener(eventName, handler, useCapture)
  }

  element.addEventListener(eventName, handler, useCapture)
  return handler
}

export function createconfig(o = {}, config) {
  return Object.assign({}, config, o)
}

export const stringToDOM = (string = '') => {
  const fragment = document.createDocumentFragment()
  const wrapper = fragment.appendChild(document.createElement('div'))

  wrapper.innerHTML = string.trim()
  return wrapper.children[0]
}

export function index(element) {
  const sib = element.parentNode.childNodes
  let n = 0

  for (let i = 0; i < sib.length; i += 1) {
    if (sib[i] === element) return n
    if (sib[i].nodeType === 1) n += 1
  }

  return -1
}

export function eq(parent, i) {
  return (i >= 0 && i < parent.length) ? parent[i] : -1
}

export function getDevice() {
  let device = window.getComputedStyle(document.body, '::after').getPropertyValue('content')
  device = device.replace(/('|")/g, '')

  return device
}

export function isMobile() {
  return !(getDevice() !== 'xs' && getDevice() !== 'sm' && getDevice() !== 's-tablet')
}

export function calculateRatio(width, height) {
  return width / height
}

export function lerp(a, b, n) {
  return ((1 - n) * a) + (n * b)
}

export function viewportSize() {
  return {
    w: window.innerWidth,
    h: window.innerHeight,
    ratio: window.innerWidth / window.innerHeight
  }
}

export function roundNumber(n, p) {
	var p = p !== undefined ? Math.pow(10, p) : 1000
	return Math.round(n * p) / p
}

export function inViewport(e) {
  const { height, bottom, top, left, right, width } = e.getBoundingClientRect()
  const h = height || (bottom - top)
  const w = width || (right - left)
  const viewport = viewportSize()

  if (!h || !w) return false
  if (top > viewport.h || bottom < 0) return false
  if (right < 0 || left > viewport.w) return false

  return true
}

export const isTouch = () => (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))

export function degrees(radians) {
  return (radians * 180) / Math.PI
}

export function radians(degrees) {
  return (degrees * Math.PI) / 180
}

export function getQueryParams(str) {
  const qss = str.split('+').join(' ')
  const params = {}
  let tokens
  const re = /[?&]?([^=]+)=([^&]*)/g

  while (tokens = re.exec(qss)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
  }

  return params
}

export const groupBy = (array, fn) => array.reduce((result, item) => {
  const key = fn(item)
  if (!result[key]) result[key] = []
  result[key].push(item)
  return result
}, {})


export const setBodyFixed = (val) => {
  if (val) {
    preventScroll.on()
    addClass(document.body, 'is-fixed')
  } else {
    preventScroll.off()
    removeClass(document.body, 'is-fixed')
  }
}

export function getCookie(name) {
  let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

export function setCookie(name, value, days) {
  let d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days)
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString()
}

export function loadImage(url) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve({ url, ratio: img.naturalWidth / img.naturalHeight })
    img.src = url
  })
}