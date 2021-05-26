function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let a = new writeText('Circle : x² + y² = 4²', width / 4, height / 3);
  let b = new writeText('Circle : (x-1)² + y² = 4²', width / 5, height / 2);

  a.play(); //default duration = 180
  b.play(3600);
  noLoop();
}
