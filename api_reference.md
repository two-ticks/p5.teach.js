# API Reference

## Index

- MObject
  - [`createText(text, x, y, font-size)`](#createtexttext-x-y-font-size)
  - [`createTeX(tex, x, y, font-size)`](#createtextex-x-y-font-size)
- GObject
  - [`create2DGraph(equation, x, y, width, height)`](#create2dgraphequation-x-y-width-height)
  - [`create2DPolarGraph(equation, theta-range, x, y, width, height)`](#create2dpolargraphequation-theta-range-x-y-width-height)
  - [`create2DParametricGraph(x, y, [range])`](#create2dparametricgraphx-y-range)
  - [`.axes()`]()
  - [`.configure()`]()
- Scene
  - [`Scene()`](#scene)
  - [`createControls()`](#createcontrols)
  - [`clock()`](#clock)
  - [`addDuration(timeDuration)`](#adddurationtimeduration)
  - [`.add()`](#add)
  - [`.remove()`](#remove)
  - [`.play()`](#playanimationtype)
  - [`transform()`](#transformobject1-object2)
  - [`group()`](#groupobjects)

## `createText(text, x, y, font-size)`

**Parameters**

| Parameter   | Type        | Description                              |
| :---------- | :---------- | :--------------------------------------- |
| text        | `string`    | the alphanumeric symbols to be displayed |
| [x]         | `number`    | x-coordinate of text                     |
| [y]         | `number`    | y-coordinate of text                     |
| [font-size] | `number` px | font-size of text                        |

[ ] : optional arguments

```js
let myText = createText('Cat and Dogs');
```

**Methods**

| Method                                                | Description                                                             |
| :---------------------------------------------------- | :---------------------------------------------------------------------- |
| object.position(x, y)                                 | sets position of text object                                            |
| object.size(font-size)                                | sets size of text object                                                |
| object.fill(fillColor)                                | sets fill of text object                                                |
| object.play("animation-type", [startTime], [endTime]) | play animation of specified type (startTime and endTime are in seconds) |
| object.add()                                          | adds object to scene without animation                                  |
| object.remove()                                       | removes object from scene without animation                             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/LVPT38ig-)

<details>
  <summary>Code</summary>

```js
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  reel();
}

function draw() {
  background(150);
}
function reel() {
  let text1 = createText('Linear Transformation');
  text1.position(30, 175);
  text1.fill('white');
  text1.size(35);

  text1.play('fadeOut', 2);
  text1.play('fadeIn', 2, 3);
  text1.play('waveIn', 2, 6);
}
```

</details>

| **Animations** | Description                                                   |
| :------------- | :------------------------------------------------------------ |
| `write`        | Writes the text with a blurry effect at each new character    |
| `fadeOut`      | Make a fade-out effect                                        |
| `fadeIn`       | Make a fade-in effect                                         |
| `waveIn`       | Make a wave in effect: appears on the screen with a wave      |
| `waveOut`      | Make a wave out effect: disappear from the screen with a wave |
| `erase`        | Make an eraser effect and make text disappear from the screen |
| `dissolve`     | Dissolves the text and make it disappear from the screen      |
| `spinOut`      | Spins the text and make it disappear from the screen          |

## `createTeX(tex, x, y, font-size)`

**Parameters**

| Parameter   | Type        | Description          |
| :---------- | :---------- | :------------------- |
| tex         | `string`    | escaped TeX sequence |
| [x]         | `number`    | x-coordinate of tex  |
| [y]         | `number`    | y-coordinate of tex  |
| [font-size] | `number` px | font-size of text    |

[ ] : optional arguments

```js
let tex = createTeX('\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}');
```

**Methods**

| Method                                                | Description                                 |
| :---------------------------------------------------- | :------------------------------------------ |
| object.position(x, y)                                 | sets position of tex object                 |
| object.size(width, height)                            | sets width and height of tex object         |
| object.fill(fillColor)                                | sets fill of tex object                     |
| object.stroke(strokeColor)                            | sets stroke color of tex                    |
| object.strokeWidth(strokeWidth)                       | sets stroke-width of tex                    |
| object.play("animation-type", [startTime], [endTime]) | play animation of specified type            |
| object.add()                                          | adds object to scene without animation      |
| object.remove()                                       | removes object from scene without animation |

| **Animations** | Description                                               |
| :------------- | :-------------------------------------------------------- |
| `write`        | Writes the TeX with a blurry effect at each new character |
| `fadeOut`      | Make a fade-out effect                                    |
| `fadeIn`       | Make a fade-in effect                                     |
| `dissolve`     | Dissolves the tex and make it disappear from the screen   |
| `appear`       | make it appear from the screen character by character     |
| `blink`        | blinking tex                                              |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/1YDfYFeF9)

<details>
  <summary>Code</summary>

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
  let tex = createTeX(
    '\\oint H\\cdot dl = \\iint   {\\color{blue}{(\\nabla \\times  H)}} dS'
  );
  tex.position(30, 50);
  tex.size(350);

  play(tex, 'all-at-once');
}
```

</details>

## `create2DGraph(equation, x, y, width, height)`

**Parameters**

| Parameter | Type        | Description            |
| :-------- | :---------- | :--------------------- |
| equation  | `function`  | function to be plotted |
| [x]       | `number`    | x-coordinate of graph  |
| [y]       | `number`    | y-coordinate of graph  |
| [width]   | `number` px | width of SVG           |
| [height]  | `number` px | height of SVG          |

[ ] : optional arguments

```js
curve = create2DGraph((t) => 400 + 1500 * Math.cos(2 * t));
);
```

| Method                     | Description                           |
| :------------------------- | :------------------------------------ |
| object.plot()              | plots the graph                       |
| object.position(x, y)      | sets position of graph object         |
| object.size(width, height) | sets width and height of graph object |
| object.stroke(strokeColor) | sets stroke color of graph object     |
| object.play()              | play animation of creation            |
| object1.transform(object2) | transforms object1 into object2       |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/Nl55ATBHk)

<details>
  <summary>Code</summary>

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

function reel() {
  grp = create2DGraph(
    (t) =>
      800 * Math.cos(2 * t) + 1000 * Math.sin(4 * t) + 800 * Math.sin(6 * t)
  );

  grp.plot();
  grp.position(10, 200);
  grp.play();

  grp1 = create2DGraph((t) => 800 * Math.cos(2 * t));
  grp1.plot();
  grp1.position(10, 0);
  grp1.play();

  grp2 = create2DGraph((t) => 1000 * Math.sin(4 * t));
  grp2.plot();
  grp2.position(10, 50);
  grp2.play();

  grp3 = create2DGraph((t) => 800 * Math.sin(6 * t));
  grp3.plot();
  grp3.position(10, 100);
  grp3.play();
}
```

</details>

## `create2DPolarGraph(equation, theta-range, x, y, width, height)`

**Parameters**

| Parameter   | Type           | Description            |
| :---------- | :------------- | :--------------------- |
| equation    | `function`     | function to be plotted |
| theta-range | `number array` | range of theta         |
| [x]         | `number`       | x-coordinate of graph  |
| [y]         | `number`       | y-coordinate of graph  |
| [width]     | `number` px    | width of SVG           |
| [height]    | `number` px    | height of SVG          |

[ ] : optional arguments

```js
curve = create2DPolarGraph(
  (t) =>
    15 *
    (Math.pow(Math.E, Math.cos(t)) -
      2 * Math.cos(4 * t) -
      Math.pow(Math.sin(t / 12), 5)),
  [0, 12 * Math.PI]
);
```

| Method                     | Description                           |
| :------------------------- | :------------------------------------ |
| object.plot()              | plots the graph                       |
| object.position(x, y)      | sets position of graph object         |
| object.size(width, height) | sets width and height of graph object |
| object.stroke(strokeColor) | sets stroke color of graph object     |
| object.play()              | play animation of creation            |
| object1.transform(object2) | transforms object1 into object2       |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/am40f47oTj)

<details>
  <summary>Code</summary>

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

function reel() {
  grp1 = create2DPolarGraph(
    (t) =>
      15 *
      (Math.pow(Math.E, Math.cos(t)) -
        2 * Math.cos(4 * t) -
        Math.pow(Math.sin(t / 12), 5)),
    [0, 12 * Math.PI]
  );
  grp1.plot();
  grp1.size(400, 400);
  grp1.position(50, 50);
  grp1.play();
}
```

</details>

## `create2DParametricGraph(x, y, [range])`

**Parameters**

| Parameter    | Type           | Description        |
| :----------- | :------------- | :----------------- |
| x expression | `function`     | x expression       |
| y expression | `function`     | y expression       |
| [range]      | `number array` | range of parameter |

[ ] : optional arguments

```js
curve = create2DParametricGraph(
  (t) => 40 * Math.sin(4 * t + Math.PI / 4),
  (t) => 40 * Math.cos(5 * t)
);
```

| Method                     | Description                           |
| :------------------------- | :------------------------------------ |
| object.plot()              | plots the graph                       |
| object.position(x, y)      | sets position of graph object         |
| object.size(width, height) | sets width and height of graph object |
| object.stroke(strokeColor) | sets stroke color of graph object     |
| object.play()              | play animation of creation            |
| object1.transform(object2) | transforms object1 into object2       |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/_CHFblWtj)

<details>
  <summary>Code</summary>

```js
let button;
let A = 40;
let B = 40;
let a = 3;
let b = 2;
let d = Math.PI / 4;

function setup() {
createCanvas(400, 400);
background(0);
scene = new Scene();
createControls();
reel();
}

function reel() {
curve1 = create2DParametricGraph(
(t) => A _ Math.sin(a _ t + d),
(t) => B _ Math.cos(b _ t)
);

curve1.plot();
curve1.stroke('blue');
curve1.position(50, 50);
a = 5;
b = 4;
d = Math.PI / 8;

curve2 = create2DParametricGraph(
(t) => A _ Math.sin(a _ t + d),
(t) => B _ Math.cos(b _ t)
);
curve2.stroke('blue');
// curve2.plot();
curve2.size(400, 400);
curve2.position(50, 150);
curve1.transform(curve2, 0, 10);
}

```

</details>

## `createControls()`

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
createControls();
```

| Method | Description |
| :----- | :---------- |
|        |             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
let MAGENTA50 = '#dc267f';
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  createControls();
  reel();
}

let t = 0;
let i = 0;
function draw() {
  background(220);
  t = clock(); //sets t = time of animation timeline

  if (t < 1000) i = t;

  fill(255, 0, 0);

  rect(30 + 0.25 * i, 20, 75, 10);
}

function reel() {
  let title = createText('Lorentz Transformation', 30, 75, 35);
  title.fill('red');
  title.play('growFromCenter', 1, 4);
  let equation = createTeX(
    '\\gamma = \\dfrac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}'
  );
  equation.position(45, 175);
  equation.size(50);
  equation.stroke(MAGENTA50);
  equation.strokeWidth(20);
  equation.fill(MAGENTA50);
  equation.play('createFill', 1, 6);
}
```

</details>

## `Scene()`

**Description**
A class to describe a `Scene`. A scene contains all of the objects (such as MObjects and GObjects) created by p5.teach. All the objects exist inside a div element of the `sceneContainer` class.

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
scene = new Scene();
```

| Method              | Description                                        |
| :------------------ | :------------------------------------------------- |
| remove()            | removes `sceneContainer`                           |
| delay(timeDuration) | provide async delay of `timeDuration` milliseconds |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
}
```

</details>

## `clock()`

**Description**
`clock()` returns the current time of the p5.teach animation timeline(anime.js). It is used to synchronise p5.js elements with p5.teach animation timeline.

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
clock();
```

| Method | Description |
| :----- | :---------- |
|        |             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
let MAGENTA50 = '#dc267f';
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  createControls();
  reel();
}

let t = 0;
let i = 0;
function draw() {
  background(220);
  t = clock(); //sets t = time of animation timeline

  if (t < 1000) i = t;

  fill(255, 0, 0);

  rect(30 + 0.25 * i, 20, 75, 10);
}

function reel() {
  let title = createText('Lorentz Transformation', 30, 75, 35);
  title.fill('red');
  title.play('growFromCenter', 1, 4);
  let equation = createTeX(
    '\\gamma = \\dfrac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}'
  );
  equation.position(45, 175);
  equation.size(50);
  equation.stroke(MAGENTA50);
  equation.strokeWidth(20);
  equation.fill(MAGENTA50);
  equation.play('createFill', 1, 6);
}
```

</details>

## `addDuration(timeDuration)`

**Description**
`addDuration(timeDuration)` adds `timeDuration` to the animation timeline.

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
addDuration(timeDuration);
```

| Method | Description |
| :----- | :---------- |
|        |             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
let MAGENTA50 = '#dc267f';
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  createControls();
  reel();
}

let t = 0;
let i = 0;
function draw() {
background(220);
t = clock(); //sets t = time of animation timeline

if (t < 1000) i = t;

fill(255, 0, 0);

rect(30 + 0.25 \* i, 20, 75, 10);
}

function reel() {
let title = createText('Lorentz Transformation', 30, 75, 35);
title.fill('red');
title.play('growFromCenter', 1, 4);
let equation = createTeX(
'\\gamma = \\dfrac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}'
);
equation.position(45, 175);
equation.size(50);
equation.stroke(MAGENTA50);
equation.strokeWidth(20);
equation.fill(MAGENTA50);
equation.play('createFill', 1, 6);
}

```

</details>

## `.add()`

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
add();
```

| Method | Description |
| :----- | :---------- |
|        |             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
let MAGENTA50 = '#dc267f';
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  createControls();
  reel();
}

let t = 0;
let i = 0;
function draw() {
background(220);
t = clock(); //sets t = time of animation timeline

if (t < 1000) i = t;

fill(255, 0, 0);

rect(30 + 0.25 \* i, 20, 75, 10);
}

function reel() {
let title = createText('Lorentz Transformation', 30, 75, 35);
title.fill('red');
title.play('growFromCenter', 1, 4);
let equation = createTeX(
'\\gamma = \\dfrac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}'
);
equation.position(45, 175);
equation.size(50);
equation.stroke(MAGENTA50);
equation.strokeWidth(20);
equation.fill(MAGENTA50);
equation.play('createFill', 1, 6);
}

```

</details>

## `.remove()`

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
remove();
```

| Method | Description |
| :----- | :---------- |
|        |             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
let MAGENTA50 = '#dc267f';
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  createControls();
  reel();
}

let t = 0;
let i = 0;
function draw() {
background(220);
t = clock(); //sets t = time of animation timeline

if (t < 1000) i = t;

fill(255, 0, 0);

rect(30 + 0.25 \* i, 20, 75, 10);
}

function reel() {
let title = createText('Lorentz Transformation', 30, 75, 35);
title.fill('red');
title.play('growFromCenter', 1, 4);
let equation = createTeX(
'\\gamma = \\dfrac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}'
);
equation.position(45, 175);
equation.size(50);
equation.stroke(MAGENTA50);
equation.strokeWidth(20);
equation.fill(MAGENTA50);
equation.play('createFill', 1, 6);
}

```

</details>

## `.play(animationType)`

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
.play(animationType)
```

| Method | Description |
| :----- | :---------- |
|        |             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
let MAGENTA50 = '#dc267f';
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  createControls();
  reel();
}

let t = 0;
let i = 0;
function draw() {
background(220);
t = clock(); //sets t = time of animation timeline

if (t < 1000) i = t;

fill(255, 0, 0);

rect(30 + 0.25 \* i, 20, 75, 10);
}

function reel() {
let title = createText('Lorentz Transformation', 30, 75, 35);
title.fill('red');
title.play('growFromCenter', 1, 4);
let equation = createTeX(
'\\gamma = \\dfrac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}'
);
equation.position(45, 175);
equation.size(50);
equation.stroke(MAGENTA50);
equation.strokeWidth(20);
equation.fill(MAGENTA50);
equation.play('createFill', 1, 6);
}

```

</details>

## `transform(object1, object2)`

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
transform(object1, object2);
```

| Method | Description |
| :----- | :---------- |
|        |             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
let MAGENTA50 = '#dc267f';
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  createControls();
  reel();
}

let t = 0;
let i = 0;
function draw() {
background(220);
t = clock(); //sets t = time of animation timeline

if (t < 1000) i = t;

fill(255, 0, 0);

rect(30 + 0.25 \* i, 20, 75, 10);
}

function reel() {
let title = createText('Lorentz Transformation', 30, 75, 35);
title.fill('red');
title.play('growFromCenter', 1, 4);
let equation = createTeX(
'\\gamma = \\dfrac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}'
);
equation.position(45, 175);
equation.size(50);
equation.stroke(MAGENTA50);
equation.strokeWidth(20);
equation.fill(MAGENTA50);
equation.play('createFill', 1, 6);
}

```

</details>

## `group([objects])`

**Parameters**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
|           |      |             |

[ ] : optional arguments

```js
group([objects]);
```

| Method | Description |
| :----- | :---------- |
|        |             |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/PpfDceZsi)

<details>
  <summary>Code</summary>

```js
let MAGENTA50 = '#dc267f';
function setup() {
  createCanvas(400, 400);
  scene = new Scene();
  createControls();
  reel();
}

let t = 0;
let i = 0;
function draw() {
background(220);
t = clock(); //sets t = time of animation timeline

if (t < 1000) i = t;

fill(255, 0, 0);

rect(30 + 0.25 \* i, 20, 75, 10);
}

function reel() {
let title = createText('Lorentz Transformation', 30, 75, 35);
title.fill('red');
title.play('growFromCenter', 1, 4);
let equation = createTeX(
'\\gamma = \\dfrac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}'
);
equation.position(45, 175);
equation.size(50);
equation.stroke(MAGENTA50);
equation.strokeWidth(20);
equation.fill(MAGENTA50);
equation.play('createFill', 1, 6);
}

```

</details>
