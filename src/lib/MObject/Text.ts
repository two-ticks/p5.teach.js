import { play } from '../Scene/play';

interface TextObject {
  _text: string;
  x?: number;
  y?: number;
  _size?: number;
}

export class Text {
  writeTextElement: any; //to be used by play function
  textWrapper: any; //to be used by play function
  _text: string;
  x: number;
  y: number;

  _size: number; //px
  // strokeColor: string;
  // strokeWidth: number;
  fillColor: p5.Color;

  constructor({ _text, x = 10, y = 10, _size = 28 }: TextObject) {
    this.x = x;
    this.y = y;
    this._text = _text;
    this._size = _size;
    //console.log('me', this._size);

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

export function createText(...args: any[]) {
  //TODO : convert into interface

  const _textArg: TextObject = {
    _text: args[0],
    x: args[1],
    y: args[2],
    _size: args[3]
  };
  //console.log(_textArg._size);

  if (
    !(typeof _textArg._size == 'undefined' || typeof _textArg._size == 'number')
  ) {
    //size
    throw new Error('size must be passed as number');
  } else if (!(typeof _textArg._size == 'undefined') && _textArg._size < 0) {
    //size
    throw new Error('size of text should be a whole number!');
  }
  return new Text(_textArg);
}
