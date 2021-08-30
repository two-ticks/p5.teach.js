// color blind safe palette
// safeColor = {
//   ULTRAMARINE40: "#648fff",
//   MAGENTA50: "#dc267f",
//   GOLD20: "#ffb000",
//   INDIGO50: "#785ef0",
//   ORANGE40: "#fe6100",
// };

function setup() {
  createCanvas(640, 360);
  background('white');
  colorPalette('red-yellow-blue');

  let graph = beginGraph(0, 0, width, height);
  axis();
  plot = plot2D((x) => cos(x));

  // Original input
  let x = createTeX('x');
  x.fill(safeColor.MAGENTA50);
  x.stroke(safeColor.MAGENTA50);
  x.position(30, height / 2 - 18);
  x.play();
  stroke(safeColor.MAGENTA50);
  let a1 = arrow(-270, 0, -230, 0);
  a1.configure({ arrowSize: 5 });

  // Function f
  stroke(safeColor.ULTRAMARINE40);
  rect(-220, -28, 50, 50);
  let f = createTeX('f');
  f.position(width / 4 - 45, height / 2 - 18);
  f.fill(safeColor.ULTRAMARINE40);
  f.stroke(safeColor.ULTRAMARINE40);
  f.play();
  let a2 = arrow(-165, 0, -125, 0);
  a2.configure({
    arrowSize: 3,
    arrowHeadColor: safeColor.GOLD20
  });
  let fx = createTeX('f(x)');
  fx.position(210, height / 2 - 18);
  fx.fill(safeColor.ULTRAMARINE40);
  fx.stroke(safeColor.ULTRAMARINE40);
  fx.play();
  let a3 = arrow(-50, 0, -10, 0);
  a3.configure({
    arrowSize: 3,
    arrowHeadColor: safeColor.GOLD20
  });

  // Function g
  stroke(safeColor.ORANGE40);
  rect(5, -28, 50, 50);
  let g = createTeX('g');
  g.position(width / 2 + 22, height / 2 - 18);
  g.fill(safeColor.ORANGE40);
  g.stroke(safeColor.ORANGE40);
  g.play();
  let a4 = arrow(60, 0, 100, 0);
  a4.configure({
    arrowSize: 3.5,
    arrowHeadColor: safeColor.ORANGE40
  });
  let gx = createTeX(`g \\textcolor{${safeColor.ORANGE40}}{(f(x))}`);
  gx.position(435, height / 2 - 18);
  gx.fill(safeColor.ORANGE40);
  gx.stroke(safeColor.ORANGE40);
  gx.play();
  endGraph();
}
