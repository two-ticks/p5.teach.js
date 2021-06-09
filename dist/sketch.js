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
  texty.play('spinOut');
  //play(texty); //can use this also
}
