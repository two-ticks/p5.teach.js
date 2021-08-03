let freq = 10;
let amp = 4;

let ULTRAMARINE40 = '#648fff';
let MAGENTA50 = '#dc267f';
let GOLD20 = '#ffb000';
let parentDiv;
function setup() {
  canvas = createCanvas(600, 600);
  //canvas.style("z-index", 100)
  scene = new Scene();
  background(20);
  drawGraph();
}

let g = 0;
function draw() {
  // g += 0.2;
  // sampler(g);
}

function drawGraph() {
  grp = create2DGraph((t) => amp * Math.cos(freq * t));
  grp.size(490, 490);
  config = {
    stepX: 1.5,
    stepY: 0.75,
    minX: -5,
    maxX: 5,

    graphColor: GOLD20,
    graphStrokeWidth: 1,
    tickX: 'false',
    tickY: 'false',
    tickColor: 'yellow',
    smallGridColor: ULTRAMARINE40,
    gridColor: MAGENTA50,
    originX: 0,
    originY: 0
    //pathElements: 3000
  };
  grp.configure(config);
  grp.axis();
  grp.plot();
  //grp.position(5, 5);
}

function sampler(time) {
  const gap = 0.5;
  const gapWidth = 16;
  fill(255, 0, 0);
  if (parentDiv) {
    parentDiv.remove();
  }
  parentDiv = createDiv();
  parentDiv.position(0, 0);
  parentDiv.size(width, height);
  parentDiv.style('overflow: hidden');
  for (i = 0; i < 10; i++) {
    div = createDiv();
    div.position(time + (gap + gapWidth) * i, 0);
    div.style('width', gapWidth + 'px');
    div.style('height', height + 'px');
    div.style('background-color: black');
    div.style('z-index : 10');
    div.parent(parentDiv);
  }
}
