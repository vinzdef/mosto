
import _ from 'lodash'
import { TweenMax } from 'gsap'

// import Ticker from './ticker.js'
import Raf from 'quark-raf'
import VirtualScroll from 'virtual-scroll'


const CONFIG = {
	min: 0,
	max: 1000,
	ease: 0.2
}

class Scroller {
	static instance
	static delta = 0
	static position = 0

	constructor(config) {
		// Instance
		if (Scroller.instance) {
			return Scroller.instance
		} else {
			Scroller.instance = this
		}

		// Config
		this.config = {}
		_.extend(this.config, CONFIG, config)

		// Properties
		this.is = {
			active: false,
			waiting: false,
			animating: false,
			scrolling: true
		}

		this.timer = null

		this.components = []

		this.last = Date.now()

		this.intervals = []
		this.points = []

		this.scroll = {
			position: window.scrollY,
			previous: window.scrollY,
			direction: 1,
			delta: 0,
			lerped: 0,
		}

		// Prevent natural mobile scroll behavior
		document.addEventListener('touchmove', (e) => { e.preventDefault() }, { passive: false })

		this.height = Math.abs(this.config.el.getBoundingClientRect().height - this.config.el.getBoundingClientRect().top) - window.innerHeight

		this.virtualScroll = new VirtualScroll({
			mouseMultiplier: .45,
			firefoxMultiplier: 50,
			// passive: true
		})

		this.virtualScroll.on(this._onScroll.bind(this))

		this.raf = this.raf.bind(this)
		Raf.add(this.raf)

		// Launch
		this.play()

		return this
	}

	reload(config) {
		this.config = {}
		_.extend(this.config, CONFIG, config)
		$(document.body).height(Math.abs(this.config.max - this.config.min))

		return this
	}

	play(position = null) {
		this.is.active = true
		if (position != null) { this.scroll.position = position }

		return this
	}

	raf() {
		if (!this.is.scrolling && !this.is.animating) return

		for (let key in this.intervals) {
			this.checkInterval(this.intervals[key])
		}

		this.components.forEach(w => {
			w.raf && w.raf(window.scrollY)
		})
	}

	getPerc(bounds, y) {
		const h = bounds.bottom - bounds.top
		const pct = _.round(_.clamp((y - bounds.top) / h, 0, 1), 3)

		return pct
	}

	register(component) {
		if (this.components.indexOf(component) === -1){
			this.components.push(component)
		}
	}

	unRegister(component) {
		if (this.components.indexOf(component) >= 0) {
			this.components.filter(item => item != component)
		}
	}

	isInViewport(elOffset, height, start = window.innerHeight) {
		return this.scroll.lerped + elOffset < start &&
				this.scroll.lerped + elOffset + height > 0
	}

	pause() {
		this.is.active = false
		return this
	}

	wait() {
		this.is.waiting = true
		return this
	}

	to(target, duration = 1000) {
		this.is.animating = true
		let scroll = { position: Math.abs(this.scroll.position), }

		TweenMax.to(scroll, duration / 1000, {
			position: target,
			ease: Strong.easeOut,
			onUpdate: () => {

				this.scroll.delta = scroll.position + this.scroll.position
				this.scroll.direction = (this.scroll.delta > 0) ? 1 : -1
				this.scroll.previous = this.scroll.position
				this.scroll.position = -scroll.position

				for (let key in this.points) { this.checkPoint(this.points[key]) }
			}
		})

		return this
	}

	_onScroll(e) {
		if (!this.is.active) {
			return false
		}

		this.scroll.position = window.scrollY
		this.scroll.direction = (-e.deltaY > 0) ? 1 : -1

		if (this.is.waiting) {
			if (e.delta == 0) {
				this.is.waiting = false
			}

			return false
		}

		// Statics
		Scroller.position = this.scroll.position
		Scroller.delta = e.deltaY

		this.timer && clearInterval(this.timer)
		this.timer = window.setInterval(()=>{
			if (Math.round(this.scroll.position * 100) / 100 === Math.round(this.scroll.lerped * 100) / 100) {
				this.is.scrolling = false
				this.timer && clearInterval(this.timer)
			}
		},500)

		if (!this.is.scrolling) this.is.scrolling = true

		// Points
		for (let key in this.points) {
			this.checkPoint(this.points[key])
		}
	}

	resize() {
		if (!this.is.scrolling) {
			this.is.scrolling = true
		}

		this.height = Math.abs(this.config.el.getBoundingClientRect().height - (this.config.el.getBoundingClientRect().top - this.scroll.position)) - window.innerHeight

		for (let key in this.points) {
			this.checkPoint(this.points[key])
		}
	}

	interval(name, config) {
		if (this.intervals[name]) delete this.intervals[name]

		config.distance = Math.abs(config.end - config.start)
		config.position = this.scroll.position
		this.intervals[name] = config

		return true
	}

	point(name, config) {
		if(this.points[name]) delete this.points[name]

		let point = {
			position: 0,
			direction: false,
			onAnimation: true,
		}
		_.extend(point, config)

		this.points[name] = point

		return true
	}

	checkInterval(i) {
		if (!this.is.active) { return false }

		const scrollStart = -this.scroll.lerped - i.start
		const perc = Math.min(Math.max(0, scrollStart / Math.abs(i.distance)), 1)

		// Data
		let event = {
			scroll: this.scroll.lerped,
			offset: _.clamp(scrollStart, 0, i.distance),
			direction: this.direction,
			base: i,
			delta: this.scroll.delta
		}

		event.ratio = perc
		event.isInside = _.inRange(-event.scroll, i.start - window.innerHeight, i.end + window.innerHeight)

		if (event.isInside) {
			i.exec(event)
		}
	}

	checkPoint(p) {
		// Data
		if (this.is.animating && !p.onAnimation) { return false }
		if (!_.inRange(p.position, -this.scroll.previousLerped, -this.scroll.lerped)) { return false }
		if (_.isFinite(p.direction) && p.direction != this.scroll.direction) { return false }

		// Execute callback
		p.exec({
			scroll: this.scroll.lerped,
			direction: this.direction,
			delta: this.scroll.delta,
		})
	}

	removePoint(name) {
		delete this.points[name]
		return true
	}
}

export default Scroller