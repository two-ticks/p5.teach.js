let sqr; //svg square
let ctrA, ctrB; //control points

function setup() {
  createCanvas(400, 400);
  //translate (width/2, height/2);
  overflow('hidden'); //if you want to stop DOM p5 teach elements from overflowing
  background(220);
  drawBoxes();
}

t = 0;
function draw() {
  background(220);
  t+=0.01;
  translate(width / 2, height / 2);
  strokeWeight(1);
  sqr.rotate(15*t,'absolute') //svg rotate for rectangle, modes = absolute and relative 
  fill(color(10, 140, 10, 120));
  tangent.arrowHead(50+abs(50*cos(t)),abs(50*sin(t))+30*sin(t));
  circle(ctrA.position()[0], ctrA.position()[1], 50, 50);
}
function drawBoxes() {
  fill('red');

  tex = createTeX ('2^2 + x^2 = x \\gamma', 150, 50)
  tex.size(18)
  tex.add()
  tex.resizeTo(35, 1 , 2)
  tex.moveTo(110, 150, 1,2)

  beginGraph(0, 0); // begin(x, y, width, height)

  strokeWeight(2);
  fill(color(150, 240, 110, 120));
  stroke('black');
  ellipse(0, 0, 35, 25);

  fill(color(130, 0, 110, 120));
  stroke('green');
  circle(0, 0, 10);

  stroke('purple');
  strokeWeight(1);
  fill(color(240, 140, 180, 50));
  circle(0, 0, 50);

  stroke('black');
  fill('none');
  rotate(40);
  sqr = rect(-100, -100, 200, 200); //origin is at center by default
  rotate(-40);
  strokeWeight(1.5);
  stroke(color(0, 140, 180, 220));
  tangent = arrow(-20, -100, 150, 100);
  tangent.configure({
    arrowSize: 3,
    arrowHeadColor: color(40, 140, 10, 150)
    // arrowHeadHeight : 4, this is currently not available
  });

  strokeWeight(5);
  stroke('blue');
  fill('none');
  point(-100, -100);
  ctrA = controlPoint(100, 100);
  ctrB = controlPoint(-100, 100);

  endGraph();
}
