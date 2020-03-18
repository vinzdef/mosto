import ins from './inAnimations'
import outs from './outAnimations'

const generic = {
  async enter({ current }) {
    await ins.generic(current.container)
    window.scrollTo(0, 0)
  },

  async leave({ current }) {
    await outs.generic(current.container);
  }
}

export { generic }