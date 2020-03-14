// import Webgl from '../webgl'
import { loaderIn, loaderOut } from './Loader'

const asyncFunc = time => new Promise((resolve) => { setTimeout(() => resolve(), time) })
const animations = new Map()

animations.set('loader-in', loaderIn)
animations.set('loader-out', loaderOut)

export default animations
