import { TextObject } from '../interfaces';
import { add } from '../Scene/add';
import { play } from '../Scene/play';
import { MObject } from './MObject';

/**
 * class representing a text
 * <iframe src="https://editor.p5js.org/radium.scientist/full/7ucXgK3Vz"
width="70%" height="510" allowfullscreen frameborder="0"
marginwidth="0" marginheight="0"></iframe>
 */

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

  /**
   * creates a text object
   * 
   * @param {string} text text content
   * @param {number} x-coordinate x-coordinate of text
   * @param {number} y-coordinate y-coordinate of text
   * @param {number} font-size font-size of the text
   */

  constructor({ _text, x = 10, y = 10, _size = 28 }: TextObject) {
    super(_text, x, y, _size);
    this.writeElement = createElement('div');

    //this._text = _text;

    //console.log('me', this._size);

    // this.strokeColor = 'black';
    // this._strokeWidth = 10;
    //this.fillColor = color('black');
  }

  /**
   * sets position of text
   * @param {number} x-coordinate x-coordinate of text
   * @param {number} y-coordinate y-coordinate of text
   */

  position(x: number = 10, y: number = 10) {
    if (arguments.length === 0) {
      return [this.x, this.y];
    } else {
      this.x = x;
      this.y = y;
    }
  }

  /**
   * sets font-size of text
   * @param {number} font-size font-size of the text
   */

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

  /**
   * sets fill-color of text
   * @param {p5.Color} fill-color fill-color of text
   */

  fill(fillColor: any = color('black')) {
    if (arguments.length === 0) {
      return this.fillColor;
    } else {
      this.fillColor = color(fillColor);
    }
  }

  /**
   * removes text object
   */

  remove() {
    //TODO : should throw error if called on object which has not been added
    this.writeElement.remove();
  }

  /**
   * adds text object
   */

  add() {
    add(this);
    this.writeElement.style('opacity', '1');
  }

  /**
   * Sets the given style (css) property (1st arg) of the element with the
   * given value (2nd arg). If a single argument is given, .style()
   * returns the value of the given property; however, if the single argument
   * is given in css syntax ('text-align:center'), .style() sets the css
   * appropriately.
   *
   * @param  {String} property   property to be set
   * @param {String} value value
   */

  style(property, value) {
    this.writeElement.style(property, value);
  }

  /**
   * play text animation
   * @param {String} animationType type of animation to be played
   * @param {Number} timeDuration duration of animation
   * @param {Number} delayDuration delay
   */

  play(
    animationType: string = 'write',
    timeDuration: number = 0,
    delayDuration: number = 0
  ) {
    play(this, animationType, timeDuration, delayDuration);
  }
}

/**
 * createText function creates a text object and return text object
 * @param {string} text text content
 * @param {number} x-coordinate x-coordinate of text
 * @param {number} y-coordinate y-coordinate of text
 * @param {number} font-size font-size of the text
 * @returns {Text} MObject of type Text
 */

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
