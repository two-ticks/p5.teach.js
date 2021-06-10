import { play } from '../Scene/play';

export class Text {
  writeTextElement: any;
  textWrapper: any;
  x: number;
  y: number;
  sentence: string;
  sizePx: number; //px
  _stroke: string;
  _strokeWidth: number;
  _fill: string;

  constructor(
    sentence: string,
    x: number = 10,
    y: number = 10,
    sizePx: number = 28
  ) {
    this.x = x;
    this.y = y;
    this.sentence = sentence;
    this.sizePx = sizePx;
    this._stroke = 'black';
    this._strokeWidth = 10;
    this._fill = 'black';
  }

  position(x: number, y: number = 10) {
    this.x = x;
    this.y = y;
    //this.writeTextElement.position(this.x, this.y);
  }
  size(sizePx: number) {
    this.sizePx = sizePx;
  }

  //TODO : fix stroke - currently only -webkit supported

  // stroke(strokeColor: string) {
  //   if (arguments.length === 0) {
  //     return this._stroke;
  //   } else {
  //     this._stroke = strokeColor;
  //   }
  // }

  // strokeWidth(w: number) {
  //   if (arguments.length === 0) {
  //     return this._strokeWidth;
  //   } else {
  //     this._strokeWidth = w;
  //   }
  // }

  fill(fillColor: string) {
    if (arguments.length === 0) {
      return this._fill;
    } else {
      this._fill = fillColor;
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
  return new Text(sentence, x, y, sizePx);
}
