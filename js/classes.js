class Circle {
  constructor (radius, x, y, dx, dy, red, green, blue, alpha) {
    this.radius = radius
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.color = [red, green, blue, alpha]
    this._radius = this.radius
  }

  draw (getBoundingClientRect, mouseX, mouseY, context) {
    if (Math.abs(getBoundingClientRect.x + this.x - mouseX) < 100 && Math.abs(getBoundingClientRect.y + this.y - mouseY) < 100 && this.radius < this._radius * 7) {
      this.radius += 2
    } else if ((Math.abs(getBoundingClientRect.x + this.x - mouseX) >= 100 || Math.abs(getBoundingClientRect.y + this.y - mouseY) >= 100) && this.radius > this._radius) {
      this.radius -= 1
    }

    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]})`
    context.lineWidth = 10
    context.stroke()
  }

  update (getBoundingClientRect, context, canvasWidth, canvasHeight, mouseX, mouseY) {
    this.draw(getBoundingClientRect, mouseX, mouseY, context)
    
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) this.dx *= (-1)
    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) this.dy *= (-1)
    
    this.x += this.dx
    this.y += this.dy
  }
}

export { Circle }