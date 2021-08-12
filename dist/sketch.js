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
  createCanvas(400, 400);
  // overflow('hidden'); //if you want to stop DOM p5 teach elements from overflowing
  background(220);
  drawBoxes();
}

function drawBoxes() {
  rect(0, 0, 100, 100);
  beginGraph();
  rect(0, 0, 100, 100);
  endGraph();
}
