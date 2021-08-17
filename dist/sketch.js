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
  //stroke('blue')
  plot2D((x) => 2 * x + 10);
  stroke('skyBlue');
  parametric2D(
    (t) => 20 + 10 * sin(3 * t + PI / 4),
    (t) => -20 + 10 * cos(2 * t)
  );
  stroke('lime');

  polar2D(
    (t) =>
      5 * ((sin(t) * sqrt(abs(cos(t)))) / (sin(t) + 7 / 5) - 2 * sin(t) + 2),
    [0, 4 * PI]
  );

  plot2D((x) => x + 6);
  endGraph();
}
