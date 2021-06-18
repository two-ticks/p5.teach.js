function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  reel();
}

function draw() {
  background(220);
}

async function reel() {
  // text1 = createText ("text");
  // text1.position(200,100);
  // play(text1);

  // grp = create2DGraph((t) => 800 * Math.cos(2 * t) + 1000 * Math.sin(4 * t) + 800 * Math.sin(6*t));

  // grp.plot();
  // grp.position(10, 200);
  // grp.play();

  // grp1 = create2DPolarGraph(
  //   (t) => 20 * (2 + Math.cos(10 * t ) + 2*Math.sin(5 * t)),
  //   [0, 2 * Math.PI]
  // );
  grp1 = create2DPolarGraph(
    (t) =>
      15 *
      (Math.pow(Math.E, Math.cos(t) + 0.25 * noise(25 * Math.cos(0.6 * t))) -
        2 * Math.cos(4 * t) -
        Math.pow(Math.sin(t / 12), 5)),
    [0, 12 * Math.PI]
  );
  grp1.stroke('red');
  //grp1.plot();
  grp1.size(400, 400);
  grp1.position(50, 110);
  //grp1.arrow()
  //grp1.play();

  // grp2 = create2DPolarGraph(
  //   (t) =>
  //     15 *
  //     (Math.pow(Math.E, Math.cos(t)) -
  //       2 * Math.cos(4 * t) -
  //       Math.pow(Math.sin(t / 12), 5)),
  //   [0, 12 * Math.PI]
  // );
  signalAmp = 2;
  let signalFreq = 2;
  grp2 = create2DPolarGraph(
    (t) => 15 * (signalAmp * Math.sin(signalFreq * t) + signalAmp),
    [0, 2 * Math.PI]
  );
  grp2.stroke('blue');
  grp2.plot();
  grp2.position(50, -10);
  //grp2.play();
  grp2.arrow((t) => 15 * (signalAmp * Math.sin(signalFreq * t) + signalAmp));
  grp2.remove();
  // grp3 = create2DGraph((t) => 800 * Math.sin(6 * t));
  // grp3.plot();
  // grp3.position(10, 100);
  // grp3.play();

  // let tex = createTeX('\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}');
  // tex.position(100, 50);
  // tex.size(200);

  // let texty = createText('playing with p5!');
  // texty.position(50, 50);
  // texty.size(40);
  // play(texty);

  // let tex1 = new TeX(
  //   '\\begin{array}{c|rrrr} & x^3 & x^2 & x^1 &  x^0 \\\\ & 1 & -6 & 11 & -6 \\\\ {\\color{red}1} & \\downarrow & 1 & -5 & 6 \\\\ \\hline & 1 & -5 & 6 & |\\phantom{-} {\\color{blue}0} \\end{array}',
  //   50,
  //   50,
  //   300,
  //   300
  // );

  // // let tex1 = new TeX(
  // //   '\\begin{bmatrix} 1 & 2 & 2 \\\\ 2 & 3 & 4 \\\\ 4 & 4 & 2 \\end{bmatrix}',
  // //   150,
  // //   50,
  // //   100,
  // //   100
  // // );

  // play(tex, 'all-at-once'); //play(MObject, 'animation-type', [duration])
  // //await scene.delay(2000);
  // //add(tex1);
  // //play(tex,'write', 8000); //DEFAULT ANIMATION TYPE : write
  // //play(tex, 'fade-out');   //fade-out
  // //play(tex, 'dissolve',100);
  // //play(tex1, 'fade-in');
  // //play(tex1, 'appear', 9000);
  // //transform(tex,tex1);
}
