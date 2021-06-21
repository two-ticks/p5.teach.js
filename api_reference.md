# API Reference

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

| Method                                                         | Description                      |
| :------------------------------------------------------------- | :------------------------------- |
| object.position(x, y)                                          | sets position of text object     |
| object.size(font-size)                                         | sets size of text object         |
| object.fill(fillColor)                                         | sets fill of text object         |
| object.play("animation-type", [timeDuration], [delayDuration]) | play animation of specified type |

**Example**

[🔗example sketch](https://editor.p5js.org/radium.scientist/sketches/LVPT38ig-)

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

## `createTeX(tex, x, y, width, height)`

**Parameters**

| Parameter | Type        | Description          |
| :-------- | :---------- | :------------------- |
| tex       | `string`    | escaped TeX sequence |
| [x]       | `number`    | x-coordinate of tex  |
| [y]       | `number`    | y-coordinate of tex  |
| [width]   | `number` px | width of SVG         |
| [height]  | `number` px | height of SVG        |

[ ] : optional arguments

```js
let tex = createTeX('\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}');
```

**Methods**

| Method                                                         | Description                         |
| :------------------------------------------------------------- | :---------------------------------- |
| object.position(x, y)                                          | sets position of tex object         |
| object.size(width, height)                                     | sets width and height of tex object |
| object.fill(fillColor)                                         | sets fill of tex object             |
| object.stroke(strokeColor)                                     | sets stroke color of tex            |
| object.strokeWidth(strokeWidth)                                | sets stroke-width of tex            |
| object.play("animation-type", [timeDuration], [delayDuration]) | play animation of specified type    |

| **Animations** | Description                                               |
| :------------- | :-------------------------------------------------------- |
| `write`        | Writes the TeX with a blurry effect at each new character |
| `fadeOut`      | Make a fade-out effect                                    |
| `fadeIn`       | Make a fade-in effect                                     |

**Example**

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
  let tex = createTeX(
    '\\oint H\\cdot dl = \\iint   {\\color{blue}{(\\nabla \\times  H)}} dS'
  );
  tex.position(30, 50);
  tex.size(350);

  play(tex, 'all-at-once');
}
```
