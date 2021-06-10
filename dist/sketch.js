function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  reel();
}

function draw() {
  background(220);
}

async function reel() {
  let texty = createText('Ampere Circulation Law');
  texty.position(25, 175);
  texty.fill('red');
  texty.size(35);
  //texty.play('write', 2, 0);
  //play(texty); //can use this also
  let text2 = createText('Linear Transformation');
  text2.position(25, 325);
  text2.fill('white');
  text2.size(35);
  //await scene.delay(2);
  text2.play('write', 3, 0);
  //await scene.delay(2);
  text2.play('fadeOut', 2, 3); // plays in place of waveIn
  //play(texty); //can use this also
}
