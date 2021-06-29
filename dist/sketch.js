let button;
function setup() {
  createCanvas(400, 400);
  button = createButton('click me');
  button.position(20, 20);
  button.mousePressed(changeBG);

  scene = new Scene();
  createControls();
  reel();
}

let i = 0;
function draw() {
  i += 0.05;
  //amp = amp + 10*Math.sin(amp+0.01);
  background(220);
  //console.log(sceneTime);
  grp.update((t) => 1500 * Math.sin(i) * sin(2 * t - i));
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
  pythag.size(320, 320);
  pythag.play('write', 0, 2.5);

  //await scene.delay(10);
  //scene.remove();
  // text1 = createText ("text");
  // text1.position(200,100);
  // play(text1);

  grp = create2DGraph((t) => 1500 * Math.sin(t) * sin(2 * t));

  grp.plot();
  grp.stroke('blue');
  grp.position(30, 200);
  //grp.loop((t) => 1500 * Math.sin(t-50) * sin(2 * (t-50)), 1 , 0); //timeDuration and startTime
  //await scene.delay(2);

  let group = createGroup(texty, grp, pythag);
  
  group.scale(0.5);
  

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
  console.log("heyBG");
  group.remove();
}