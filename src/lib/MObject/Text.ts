import { TextObject } from '../interfaces';
import { add } from '../Scene/add';
import { play } from '../Scene/play';
import { MObject } from './MObject';

export class Text extends MObject {
  //writeElement!: p5.Element; //to be used by play function
  //to be used by play function
  //textWrapper: any; //to be used by play function
  //sentence: string;
  // x: number;
  // y: number;

  
  // strokeColor: string;
  // strokeWidth: number;
  //fillColor: p5.Color;

  constructor({ _text, x = 10, y = 10, _size = 28 }: TextObject) {
    super(_text, x, y, _size);
    //this._text = _text;
    
    //console.log('me', this._size);

    // this.strokeColor = 'black';
    // this._strokeWidth = 10;
    //this.fillColor = color('black');
  }

  position(x: number = 10, y: number = 10) {
    if (arguments.length === 0) {
      return [this.x, this.y];
    } else {
      this.x = x;
      this.y = y;
    }
  }
  size(_size: number = 28) {
    if (arguments.length === 0) {
      return this._size; //font-size
    } else {
      this._size = _size; //font-size
    }
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

  fill(fillColor: p5.Color = color('black')) {
    if (arguments.length === 0) {
      return this.fillColor;
    } else {
      this.fillColor = fillColor;
    }
  }

  remove() {
    //TODO : should throw error if called on object which has not been added
    this.writeElement.remove();
  }
  add() {
    add(this);
    this.writeElement.style('opacity', '1');
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
