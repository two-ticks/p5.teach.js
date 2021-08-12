// Parameters for graph of cosine
let amp = 4;
let freq = 2;

// Color blind safe palette
let ULTRAMARINE40 = '#648fff';
let MAGENTA50 = '#dc267f';
let GOLD20 = '#ffb000';
let INDIGO50 = '#785ef0';
let ORANGE40 = '#fe6100';

function setup() {
  canvas = createCanvas(400, 400);
  //overflow('hidden'); //if you want to stop DOM p5 teach elements from overflowing
  background(20);
  drawGraph();
}

function drawGraph() {
  let graph = create2DGraph((t) => amp * cos(freq * t));
  graph.size(width, height);
  let config = {
    stepX: 1,
    stepY: 1,
    minX: -10,
    maxX: 10,
    graphColor: GOLD20,
    graphStrokeWidth: 2,
    tickX: 'true',
    tickY: 'true',
    tickColor: INDIGO50,
    smallGridColor: ULTRAMARINE40,
    gridColor: MAGENTA50,
    originX: 0,
    originY: 0
  };
  graph.configure(config);
  graph.axis();
  graph.plot();
  graph.position(0, 0);
  let label = createTeX(`f(t)=${amp}\\cos{${freq}t}`);
  label.position(width / 2, height / 12);
  label.fill(GOLD20);
  label.play();
}
