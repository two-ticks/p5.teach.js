import p5 from 'p5';
import { play } from '../Scene/play';

export class Text {
  x: number;
  y: number;
  sentence: string;
  _size: number; //px
  // strokeColor: string;
  // strokeWidth: number;
  fillColor: p5.Color;

  writeTextElement: any; //to be used by play function
  textWrapper: any; //to be used by play function

  constructor(
    sentence: string,
    x: number = 10,
    y: number = 10,
    _size: number = 28
  ) {
    this.x = x;
    this.y = y;
    this.sentence = sentence;
    this._size = _size;
    // this.strokeColor = 'black';
    // this._strokeWidth = 10;
    this.fillColor = color('black');
  }

  position(x: number, y: number = 10) {
    this.x = x;
    this.y = y;
    //this.writeTextElement.position(this.x, this.y);
  }
  size(_size: number) {
    this._size = _size; //font-size
  }

  //TODO : fix stroke - currently only -webkit supported

  // stroke(strokeColor: string) {
  //   if (arguments.length === 0) {
  //     return this.strokeColor;
  //   } else {
  //     this.strokeColor = strokeColor;
  //   }
  // }

  // strokeWidth(w: number) {
  //   if (arguments.length === 0) {
  //     return this._strokeWidth;
  //   } else {
  //     this._strokeWidth = w;
  //   }
  // }

  fill(fillColor: p5.Color) {
    if (arguments.length === 0) {
      return this.fillColor;
    } else {
      this.fillColor = fillColor;
    }
  }

  play(
    animationType: string = 'write',
    timeDuration: number = 0,
    delayDuration: number = 0
  ) {
    play(this, animationType, timeDuration, delayDuration);
  }
}

export function createText(
  sentence: string,
  x: number = 10,
  y: number = 10,
  sizePx: number = 28 //px
) {
  if (sizePx < 0) {
    throw new Error('Size should be a whole number');
  }
  return new Text(sentence, x, y, sizePx);
}
