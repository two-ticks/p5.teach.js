function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let texx = new writeTex(
    '\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}',
    4000
  );
  let texxx = new writeTex(
    '\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}',
    2000,
    width/2,
    height/2
  );
  noLoop();
}
