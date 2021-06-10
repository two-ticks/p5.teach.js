function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  reel();
}

function draw() {
  background(150);
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
  text2.play('fadeOut', 2, 0);
  //await scene.delay(2);
  text2.play('fadeIn', 2, 3); // plays in place of waveIn
  text2.play('waveIn', 2, 6);
  //play(texty); //can use this also
}
