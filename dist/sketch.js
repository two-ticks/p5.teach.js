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
  let tex = createTeX('\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}');
  tex.position(100,50);
  tex.size(200);
  tex.style("color","red");

  let tex1 = new TeX(
    '\\begin{array}{c|rrrr} & x^3 & x^2 & x^1 &  x^0 \\\\ & 1 & -6 & 11 & -6 \\\\ {\\color{red}1} & \\downarrow & 1 & -5 & 6 \\\\ \\hline & 1 & -5 & 6 & |\\phantom{-} {\\color{blue}0} \\end{array}',
    50,
    50,
    300,
    300
  );

  // let tex1 = new TeX(
  //   '\\begin{bmatrix} 1 & 2 & 2 \\\\ 2 & 3 & 4 \\\\ 4 & 4 & 2 \\end{bmatrix}',
  //   150,
  //   50,
  //   100,
  //   100
  // );

  play(tex, 'all-at-once'); //play(MObject, 'animation-type', [duration])
  //await scene.delay(2000);
  //add(tex1);
  //play(tex,'write', 8000); //DEFAULT ANIMATION TYPE : write
  //play(tex, 'fade-out');   //fade-out
  //play(tex, 'dissolve',100);
  //play(tex1, 'fade-in');
  //play(tex1, 'appear', 9000);
  //transform(tex,tex1);
}
