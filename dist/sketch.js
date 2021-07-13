let button;
let A = 40;
let B = 40;
let a = 3;
let b = 2;
let d = Math.PI / 4;
function setup() {
  createCanvas(400, 400);
  button = createButton('click me');
  button.position(20, 20);
  button.mousePressed(changeBG);

  scene = new Scene();
  createControls();
  //reel();
}

let t;
function draw() {
  background(220);
  t = clock();
  //console.log(i);
  fill(255, 0, 0);
  rect(30+ 0.25 * t, 20 , 55, 10);
  //i += 0.005;
  //amp = amp + 10*Math.sin(amp+0.01);

  //console.log(sceneTime);
  //a+=0.01;

  // d += 0.005;
  // grp.update(
  //   (t) => A * sin(a * t + d),
  //   (t) => B * cos(b * t)
  // );
}

async function reel() {
  let texty = createText('Wave Equation', 75, 75, 35);
  //texty.position(150, 175);
  texty.fill('red');
  texty.play('write', 2.8, 8);
  let pythag = createTeX(
    '{\\displaystyle {\\frac {\\partial ^{2}u}{\\partial t^{2}}}=c^{2}{\\frac {\\partial ^{2}u}{\\partial x^{2}}}}'
  );
  pythag.position(25, 50);
  pythag.add();
  pythag.fill(color('rgba(255,0,0,255)'));
  pythag.size(320, 320);
  pythag.play('write', 0, 6.5);

  //await scene.delay(10);
  //scene.remove();
  // text1 = createText ("text");
  // text1.position(200,100);
  // play(text1);

  grp = create2DParametricGraph(
    (t) => A * Math.sin(a * t + d),
    (t) => B * Math.cos(b * t)
  );

  grp.plot();
  grp.stroke('blue');
  grp.position(50, 50);
  //grp.loop((t) => 1500 * Math.sin(t-50) * sin(2 * (t-50)), 1 , 0); //timeDuration and startTime
  //await scene.delay(2);
  a = 5;
  b = 4;
  d = Math.PI / 8;

  grp1 = create2DParametricGraph(
    (t) => A * Math.sin(a * t + d),
    (t) => B * Math.cos(b * t)
  );
  grp1.stroke('blue');
  //grp1.plot();
  grp1.size(400, 400);
  grp1.position(50, 150);

  grp.transform(grp1, 0, 10);

  //let group = createGroup(texty, grp, pythag);

  //group.scale(0.5);

  // //grp.play();
  // group.forEach(element => element.scale(0.5));

  // grp1 = create2DGraph((t) => 400 + 1500 * Math.cos(2 * t));

  // grp2 = create2DGraph(
  //   (t) =>
  //     400 * Math.cos(5 * t) + 500 * Math.cos(5 * t) + 1000 * Math.cos(2 * t)
  // );

  //grp1.plot();
  //grp1.position(10, 100);

  //grp1.play();
}
function changeBG() {
  console.log('heyBG');
  group.remove();
}
