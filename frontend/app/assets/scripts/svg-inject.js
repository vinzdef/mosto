import SVGInjector from 'svg-injector'
import { qsa } from './utils'

export default function SvgInject () {
  const svgs = qsa('[data-svg-inject]')
  const count = svgs.length

  return new Promise((resolve) => {
    SVGInjector(svgs, {}, (svg) => {
      if (svg === count) {
        resolve()
      }
    })
  })
}
