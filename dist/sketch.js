// color blind safe palette
const ULTRAMARINE40 = '#648fff';
const MAGENTA50 = '#dc267f';
const GOLD20 = '#ffb000';
const INDIGO50 = '#785ef0';
const ORANGE40 = '#fe6100';

function setup() {
  createCanvas(400, 400);
  // overflow('hidden') //if you want to stop DOM p5 teach elements from overflowing
  background(50);
  drawGraph();
}

function drawGraph() {
  const tex = createTeX('y = 2x + 10', 250, 50);
  tex.size(20);
  tex.fill(GOLD20);
  tex.stroke(GOLD20);
  tex.add();
  tex.moveTo(25, 50, 1, 2);
  stroke(GOLD20);

  const graph = beginGraph(0, 0); // begin(x, y, width, height)
  graph.configure({
    scaleX: 5,
    maxX: 10,
    minX: -12,
    scaleY: 5,
    maxY: 10,
    minY: -10,
    stepX: 3,
    stepY: 3,
    tickX: 'false',
    tickY: 'false'
  });

  axis();
  graph.defs(`<marker id="dot" 
  refX="5" 
  refY="5"
   markerWidth="15" 
  markerHeight="15">
<rect width="5"
  height="5" 
  x="2" 
  y="4" 
  fill="white" />
</marker>`);
  //stroke('blue')
  //plot2D((x) => 2 * x + 10);
  stroke('skyBlue');
  // parametric2D(
  //   (t) => 20 + 10 * sin(3 * t + PI / 4),
  //   (t) => -20 + 10 * cos(2 * t)
  // );
  //stroke('lime');

  // polar2D(
  //   (t) =>
  //     5 * ((sin(t) * sqrt(abs(cos(t)))) / (sin(t) + 7 / 5) - 2 * sin(t) + 2),
  //   [0, 4 * PI]
  // );
  //  circle(-50, -50, 100 )
  //  play(2020)
  //plot2D((x) => x + 6);
  //fill('red')
  // beginShape();
  // vertex(0, -5);
  // vertex(1.4, -2);
  // vertex(4.7, -1.5);
  // vertex(2.3, 0.7);
  // vertex(2.9, 4.0);
  // vertex(0, 2.5);
  // vertex(-2.9, 4.0);
  // vertex(-2.3, 0.7);
  // vertex(-4.7, -1.5);
  // vertex(-1.4, -2.0);

  // endShape();

  // rotate (45)
  // r = beginShape();
  // vertex(0, -5);
  // vertex(1.4, -2);
  // vertex(4.7, -1.5);
  // vertex(2.3, 0.7);
  // vertex(2.9, 4.0);
  // vertex(0, 2.5);
  // vertex(-2.9, 4.0);
  // vertex(-2.3, 0.7);
  // vertex(-4.7, -1.5);
  // vertex(-1.4, -2.0);

  // endShape();
  // r.play(2200)
  let n = 15;
  let data = [];
  for (i = -15; i < n; i += 1) {
    data.push(i, 5 * sin(i * i * i) * (1 + random(1)));
  }
  console.log(data);
  p = polyline(data);
  p.shape.setAttribute('marker-mid', 'url(#dot)');
  p.play(12200);
  endGraph();
}
