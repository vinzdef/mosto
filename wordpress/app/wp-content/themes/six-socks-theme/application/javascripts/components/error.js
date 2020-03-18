class Line {
  constructor(points, canvas) {
    this.canvas = canvas
    this.points = points || []
    this.dist = 0
  }

  update() {
    for (let p = 0; p < this.points.length; p += 1) {
      this.points[p].rotateX(this.canvas.settings.xRotation)
      this.points[p].rotateY(this.canvas.settings.yRotation)
      this.points[p].rotateZ(this.canvas.settings.zRotation)
      this.points[p].map2D()
    }
  }

  render() {
    this.canvas.ctx.strokeStyle = 'rgb(77,7,255)'

    for (let p = 1; p < this.points.length; p += 1) {
      if (this.points[p].z > -(this.canvas.focal - 50)) {
        this.canvas.ctx.beginPath()
        this.canvas.ctx.moveTo(this.points[p - 1].xPos, this.points[p - 1].yPos)
        this.canvas.ctx.lineTo(this.points[p].xPos, this.points[p].yPos)
        this.canvas.ctx.stroke()
      }
    }

    this.dist = this.points[this.points.length - 1].z
  }
}

class Point {
  constructor(pos, canvas) {
    this.canvas = canvas
    this.x = pos.x - (this.canvas.canvas.width / 2) || 0
    this.y = pos.y - (this.canvas.canvas.height / 2) || 0
    this.z = pos.z || 0

    this.cX = 0
    this.cY = 0
    this.cZ = 0

    this.xPos = 0
    this.yPos = 0
    this.map2D()
  }

  rotateX(angleX) {
    const cosX = Math.cos(angleX)
    const sinX = Math.sin(angleX)
    const y1 = this.y * cosX - this.z * sinX
    const z1 = this.z * cosX + this.y * sinX

    this.y = y1
    this.z = z1
  }

  rotateY(angleY) {
    const cosY = Math.cos(angleY)
    const sinY = Math.sin(angleY)
    const x1 = this.x * cosY - this.z * sinY
    const z1 = this.z * cosY + this.x * sinY

    this.x = x1
    this.z = z1
  }

  rotateZ(angleZ) {
    const cosZ = Math.cos(angleZ)
    const sinZ = Math.sin(angleZ)
    const x1 = this.x * cosZ - this.y * sinZ
    const y1 = this.y * cosZ + this.x * sinZ

    this.x = x1
    this.y = y1
  }

  map2D() {
    const scaleX = this.canvas.focal / (this.canvas.focal + this.z + this.cZ)
    const scaleY = this.canvas.focal / (this.canvas.focal + this.z + this.cZ)

    this.xPos = this.canvas.vpx + (this.cX + this.x) * scaleX
    this.yPos = this.canvas.vpy + (this.cY + this.y) * scaleY
  }
}

export default class Canvas {
  constructor() {
    this.canvas = document.getElementById('error-canvas')
    this.ctx = this.canvas.getContext('2d')

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.lines = []
    this.focal = this.canvas.width / 2
    this.vpx = this.canvas.width / 2
    this.vpy = this.canvas.height / 2
    this.settings = {
      xRotation: 0.01,
      yRotation: 0.01,
      zRotation: 0,
      rotateWhileDrawing: true,
      demoMode: true,
      clearScreen() {
        this.lines = []
      }
    }
    this.painting = false
    this.lastX = 0
    this.lastY = 0
    this.points = []
    this.line = null
    this.mouseX = 0
    this.mouseY = 0

    this.loop = this.loop.bind(this)
    this.setEvents()
  }

  loop() {
    if (this.settings.demoMode) {
      if (Math.random() > 0.985) {
        this.line = null
        this.points = []
      }

      if (!this.line) {
        this.line = new Line(this.points, this)
        this.lines.push(this.line)

        this.line.points.push(new Point({
          x: (this.canvas.width / 4) + (Math.random() * (this.canvas.width / 2)),
          y: (this.canvas.height / 4) + (Math.random() * (this.canvas.height / 2))
        }, this))
      }

      const lastPoint = this.line.points[this.line.points.length - 1]

      this.line.points.push(new Point({
        x: (lastPoint.x + this.canvas.width / 2) + 50 - (Math.random() * 100), // eslint-disable-line no-mixed-operators
        y: (lastPoint.y + this.canvas.height / 2) + 50 - (Math.random() * 100) // eslint-disable-line no-mixed-operators
      }, this))
    }

    if (!this.painting || this.settings.rotateWhileDrawing) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.lines.sort((a, b) => b.dist - a.dist)

      this.lines.forEach(line => {
        line.update()
        line.render()
      })
    }

    requestAnimationFrame(this.loop)
  }

  setEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.settings.demoMode = false

      if (!this.painting) {
        this.points = []
        this.painting = true
      } else {
        this.painting = false
      }

      this.startX = e.pageX
      this.startY = e.pageY

      this.lastX = this.startX
      this.lastY = this.startY
      this.line = new Line(this.points, this)
      this.lines.push(this.line)

      this.line.points.push(new Point({
        x: this.lastX,
        y: this.lastY
      }, this))
    })

    this.canvas.addEventListener('mouseup', () => {
      this.painting = false
      this.line = null
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.painting) {
        this.mouseX = e.pageX
        this.mouseY = e.pageY

        this.ctx.beginPath()
        this.ctx.moveTo(this.lastX, this.lastY)
        this.ctx.lineTo(this.mouseX, this.mouseY)
        this.ctx.strokeStyle = 'rgb(77,7,255)'
        this.ctx.stroke()

        this.lastX = this.mouseX
        this.lastY = this.mouseY

        this.line.points.push(new Point({
          x: this.mouseX,
          y: this.mouseY,
          z: 0
        }, this))
      }
    })
  }
}