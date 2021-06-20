function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  reel();
}

function draw() {
  background(150);
  
  noFill();
  stroke('black');
  triangle(200, 110, 260, 110, 260, 30);
}

function reel() {
  let texty = createText('Ampere Circulation Law', 25, 175, 35);
  texty.position(25, 175);
  texty.fill('red');
  texty.size(35);
  texty.play('write', 0, 4); //Start = 0 sec and End = 4 sec

  let text2 = createText('Linear Transformation');
  text2.position(25, 325);
  text2.fill('white');
  text2.size(35);

  //text2.play('dissolve', 0, 4);

  text2.play('fadeIn', 0.001, 1); // plays in place of waveIn
  text2.play('waveIn', 0, 4);
  //play(texty); //can use this also

  let pythag = createTeX('a^2 + b^2 = c^2');
  pythag.position(50, 15);
  pythag.size(120, 120);
  pythag.play('all-at-once');

  let a = createTeX('a');
  a.position(235, 125);
  a.size(12, 12);
  a.play('all-at-once');

  let b = createTeX('b');
  b.position(270, 70);
  b.size(16, 16);
  b.play('all-at-once');

  let c = createTeX('c');
  c.position(215, 70);
  c.size(10, 10);
  c.play('all-at-once');
}
