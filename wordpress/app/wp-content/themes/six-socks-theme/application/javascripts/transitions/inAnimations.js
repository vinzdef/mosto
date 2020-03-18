// import gsap from 'gsap'
import { qsa } from '../base/utils'

const transitions = {
  generic() {
    console.log('in generic')
  },

  fade() {
    // gsap.fromTo(this.newContainer, 0.1, {
    //     autoAlpha: 0
    // }, {
    //     autoAlpha: 1,
    //     onComplete: () => { this.done(); }
    // }, 'start');
  }
}

export default transitions