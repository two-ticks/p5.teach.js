let ULTRAMARINE40 = '#648fff'
let MAGENTA50 = '#dc267f'
let GOLD20 = '#ffb000'

function setup() {
  createCanvas(400, 400)
  background(ULTRAMARINE40)
  drawTriangle()
  drawTitle()
  drawEquation()
}

function drawTriangle() {
  noFill()
  stroke(MAGENTA50)
  triangle(170, 205, 170, 150, 250, 205)
  square(170, 195, 10)
  let a = createTeX('a')
  a.position(205, 215)
  a.size(30)
  a.stroke(MAGENTA50)
  a.strokeWidth(20)
  a.fill(MAGENTA50)
  a.play('write', 0, 2)

  let b = createTeX('b')
  b.position(155, 175)
  b.size(30)
  b.stroke(MAGENTA50)
  b.strokeWidth(20)
  b.fill(MAGENTA50)
  b.play('write', 0, 2)

  let c = createTeX('c')
  c.position(215, 150)
  c.size(30)
  c.stroke(MAGENTA50)
  c.strokeWidth(20)
  c.fill(MAGENTA50)
  c.play('write', 0, 2)
}

function drawTitle() {
  let title = createText("Pythagoras' Theorem")
  title.position(50, 50)
  title.fill(GOLD20)
  title.size(35)
  title.play('growFromCenter', 1, 2)
}

function drawEquation() {
  let equation = createTeX('a^2 + b^2 = c^2')
  equation.position(125, 315)
  equation.size(30)
  equation.stroke(MAGENTA50)
  equation.strokeWidth(20)
  equation.fill(MAGENTA50)
  equation.play('write', 0, 2)
}
