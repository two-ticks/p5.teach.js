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
  texty.play('fadeIn', 4, 1);

  let texty1 = createText('Ampere Circulation Law');
  texty1.position(25, 275);
  texty1.fill('red');
  texty1.size(35);
  texty1.play('waveOut', 4, 1);
  //play(texty); //can use this also
}
