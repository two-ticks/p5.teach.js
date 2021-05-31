function setup() {
  createCanvas(400, 400);
  background(220);
  scene = new Scene();
  reel();
}

function draw() {
  background(220);
}

async function reel() {
  let tex = new TeX(
    '\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}',
    50,
    175,
    300,
    50
  );

  let tex1 = new TeX(
    '\\begin{bmatrix} 1 & 2 & 2 \\\\ 2 & 3 & 4 \\\\ 4 & 4 & 2 \\end{bmatrix}',
    150,
    50,
    100,
    100
  );

  play(tex, 'all-at-once'); //play(MObject, 'animation-type', [duration])
  await scene.delay(2000);
  //add(tex1);
  //play(tex,'write', 8000); //DEFAULT ANIMATION TYPE : write
  //play(tex, 'fade-out');   //fade-out
  //play(tex, 'dissolve');
  play(tex1, 'fade-in');
  //play(tex, 'appear', 9000);
}
