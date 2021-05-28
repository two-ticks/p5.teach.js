function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let tex_1 = new addTeX(
    '\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}',
    4000
  );
  let tex_2 = new addTeX(
    '\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}',
    2000,
    width/2,
    height/2
  );
  let text_1 = new addText('p5-teach is a superb library!!', 200, 200);
  
  tex_1.play(); //DEFAULT: write 
  //tex_2.play('all-at-once');
  //text_1.play('all-at-once');
  noLoop();
}
