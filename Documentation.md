
# p5.teach.js

p5.teach.js provide tools for teaching through p5.js, such as functions to animate text, TeX and shapes. Our goal is to introduce a simple, easy to use library to animate and make scenes.


## API Reference

####  createTeX(tex, x, y, width, height)

```js
 createTeX('escaped TeX equation') // returns TeX object
``` 

arg 1 : escaped TeX sequence <br/>
arg 2 : [x-coordinate] <br/>
arg 3 : [y-coordinate] <br/>
arg 4 : [width of SVG] <br/>
arg 5 : [height of SVG] <br/>

[ ] : optional arguments 

```js
let tex = createTeX('\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}');
```

`object.position(x, y)` sets position of the object to `(x, y)`

`object.size(width, height)` sets size of the object to `(width, height)`


**Example for createTeX and createText**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/1YDfYFeF9)
```js
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
  let tex = createTeX('\\oint H\\cdot dl = \\iint   {\\color\{blue\}\{(\\nabla \\times  H)\}} dS');
  tex.position(30,50);
  tex.size(350);

  let texty = createText("Ampere Circulation Law");
  texty.position(25, 50); 
  texty.size(35);
  
  play(tex, 'all-at-once'); 
  await scene.delay(4000); //waiting for 4000 ms
  play(texty);
}
```

  