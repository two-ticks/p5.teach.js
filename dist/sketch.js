let ULTRAMARINE40 = '#648fff';
let MAGENTA50 = '#dc267f';
let GOLD20 = '#ffb000';
let n1 = 0;
let n2 = 7 / 2;

function setup() {
  createCanvas(600, 600);
  createControls();
  //frameRate(2);
  scene = new Scene();
  background(20);
  drawGraph();
}

let g = 0;
function draw() {
  n2 += 0.1;
  n1 += 0.01;
  // if (n2 > 40 && n2 < 41) {
  //   grp1.update((t) => 1 + 2 * Math.cos(t), [0, 2 * Math.PI]);
  //   grp1.arrow(60000);
  // }
  //console.log(n2);
  //equation.update(`\\cos(x + \\textcolor{green}{${g.toFixed(2)}}) - \\frac{x^2}{3!} + \\frac{x^4}{4!} + \\frac{x^6}{5!}`)
}

function drawGraph() {
  grp1 = create2DPolarGraph(
    (t) =>
      3*((Math.sin(t) * Math.sqrt(Math.abs(Math.cos(t)))) / (Math.sin(t) + 7 / 5) -
      2 * Math.sin(t) +
      2),
    [0, 4 * Math.PI]
  );
  grp1.size(500, 500);
  grp1.stroke(color('#00f'));

  config = {
    graphColor : `#ed225d`,
    //xAxis: 'false',
    //yAxis: 'false',
    tickX: 'false',
    tickY: 'false',
    //tickColor: "yellow",
    smallGridColor: ULTRAMARINE40,
    gridColor: MAGENTA50,
    originX: 0,
    originY: 4.5,
    arrowFollowerColor: 'green'
    // maxX: 2,
    // minX: -2,
    // minY: -2,
    // maxY: 2
  };
  grp1.configure(config);
  grp1.axis();
  grp1.plot();
  //grp1.size(400, 400);
  grp1.position(50, 50);
  grp1.arrow(10000);
  // grp = create2DGraph(
  //   (t) =>
  //     Math.cos(t) -
  //     Math.pow(t, 2) / 6 +
  //     Math.pow(t, 4) / 24 +
  //     Math.pow(t, 6) / 720
  // );
  // grp.size(380, 380);
  // //grp.stroke(GOLD20);
  // config = {
  //   //graphColor : GOLD20,
  //   //xAxis :'false',
  //   //yAxis : 'false',
  //   tickX : 'false',
  //   tickY : 'true',
  //   //tickColor: "yellow",
  //   //smallGridColor: ULTRAMARINE40,
  //   //gridColor: MAGENTA50,
  //   originX: 0,
  //   originY: -4,
  // };
  // grp.configure(config);
  // grp.axis();
  // grp.plot();
  // grp.position(10, 10);

  // equation = createTeX(
  //   `\\cos(x + 0) - \\frac{x^2}{3!} + \\frac{x^4}{4!} + \\frac{x^6}{5!}`
  // );
  // equation.stroke('white')
  // equation.fill('white')
  // equation.position(75, 165);
  // equation.size(20);
  // equation.add();
  //grp.play();
}
