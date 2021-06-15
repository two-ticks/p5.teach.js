function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  reel();
}

function draw() {
  background(150);
}

async function reel() {
  let texty = createText('Ampere Circulation Law', 25, 175, 35);
  texty.position(25, 175);
  texty.fill('red');
  texty.size(35);
  texty.play('write', 0, 2); //Start = 0 sec and End = 2 sec

  let text2 = createText('Linear Transformation');
  text2.position(25, 325);
  text2.fill('white');
  text2.size(35);

  text2.play('dissolve', 0, 4);

  text2.play('fadeIn', 5, 6); // plays in place of waveIn
  text2.play('waveIn', 6, 7);
  //play(texty); //can use this also
}
