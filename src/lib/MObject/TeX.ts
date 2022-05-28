import TeXToSVG from 'tex-to-svg';
import { TexObject } from '../interfaces';
import { add } from '../Scene/add';
//import { animationTimeline } from '../Scene/controls';
import { play, overwriteAnimatorTeX } from '../Scene/play';
import { MObject } from './MObject';

//TODO : add test cases

/**
 * class representing a tex
 */

export class TeX extends MObject {
  svgEquation: string;
  //startTime: number; // left for later decision -> need not specify such details at initialisation
  //_tex: string;

  //_size: number; //px -> font size
  // svgWidth: number;
  // svgHeight: number;
  _strokeWidth: number;
  strokeColor: p5.Color;
  id: number;

  /**
   * creates a tex object
   *
   * <iframe src="../../assets/examples/tex.html" scrolling="no" width="400" height="400" allowfullscreen frameborder="0" marginwidth="0" marginheight="0"></iframe>
   *
   * @param    {String} - escaped TeX input
   * @param    {number} - x
   * @param    {number} - y
   * @param    {number} - font-size
   *
   * @example
   *
   * example for creating TeX object:
   * ```js
   * let tex = new TeX(
   *  '\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}', 200, 300, 28);
   * ```
   */

  constructor({ _tex, x = 10, y = 10, _size = 28 }: TexObject) {
    super(_tex, x, y, _size);
    //this._tex = _tex;
    // this._size = _size; //px
    // this.svgWidth = svgWidth;
    // this.svgHeight = svgHeight;

    //generate unique id and attach it to tex div
    let uniqueId = 0;
    while (document.getElementById(`mobj-tex-${uniqueId}`)) {
      uniqueId++;
    }
    this.id = uniqueId;

    this.writeElement = createElement('div');
    this.writeElement.id(`mobj-tex-${this.id}`);
    this.svgEquation = TeXToSVG(_tex);
    this._strokeWidth = 8;
    this.strokeColor = color('black');
  }

  /**
   * sets position of tex
   * @param {number} x-coordinate x-coordinate of tex
   * @param {number} y-coordinate y-coordinate of tex
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
   * sets font-size of tex
   * @param {number} font-size font-size of the tex
   */

  size(_size: number = 28) {
    if (arguments.length === 0) {
      return this._size;
    } else {
      this._size = _size;
    }
  }

  /**
   * sets stroke-color of tex
   * @param {p5.Color} stroke-color stroke-color of tex
   */

  stroke(strokeColor: any = 'black') {
    if (arguments.length === 0) {
      return this.strokeColor;
    } else {
      this.strokeColor = strokeColor;
    }
  }

  /**
   * sets stroke-width of tex
   * @param {number} strokeWidth stroke-width of the tex
   */

  strokeWidth(_strokeWidth: number = 8) {
    if (arguments.length === 0) {
      return this._strokeWidth;
    } else {
      this._strokeWidth = _strokeWidth;
    }
  }

  /**
   * sets fill-color of text
   * @param {p5.Color} fill-color fill-color of text
   */

  fill(fillColor: any = 'black') {
    if (arguments.length === 0) {
      return this.fillColor;
    } else {
      this.fillColor = fillColor;
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
    //this.writeTexElement.style('opacity', '1');
  }

  /**
   * Sets the given style (css) property (1st arg) of the element with the
   * given value (2nd arg). If the single argument
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
   * updates the tex
   */
  update(_tex) {
    this.svgEquation = TeXToSVG(_tex);
    this.writeElement.html(this.svgEquation);
    let svg = this.writeElement.elt.querySelectorAll('svg');
    let g = this.writeElement.elt.querySelectorAll('g');
    //svg[0].setAttribute('width', `${object.svgWidth}px`);
    //svg[0].setAttribute('height', `${object.svgHeight}px`);
    g[0].setAttribute('stroke', this.strokeColor);
    g[0].setAttribute('stroke-width', this._strokeWidth);
    g[0].setAttribute('fill', this.fillColor);
    svg[0].setAttribute('fill', this.fillColor);
    this.writeElement.position(this.x, this.y);
  }

  /**
   * play text animation
   * @param {String} animationType type of animation to be played
   * @param {Number} timeDuration duration of animation
   * @param {Number} delayDuration delay
   */

  play(
    animationType: string = 'write',
    startTime: number = 0,
    endTime: number = 0
  ) {
    play(this, animationType, startTime, endTime);
  }

  //TODO : extend write to continue writing equation after pause 
  overwrite(_tex, timeDuration: number, delayDuration: string | number) {
    overwriteAnimatorTeX(this, _tex, timeDuration, delayDuration);
  }
}

/**
 * createTeX
 *
 * @param args
 *
 * ```js
 * let tex = createTeX(
 *  '\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}',
 *   200,
 *   300,
 *   20,
 * );
 * ```
 * <br/>
 * <iframe src="../../assets/examples/tex.html" scrolling="no" width="650" height="550" allowfullscreen frameborder="0" marginwidth="0" marginheight="0"></iframe>
 *
 * @returns
 */
export function createTeX(...args: any[]) {
  const _texArg: TexObject = {
    _tex: args[0],
    x: args[1],
    y: args[2],
    _size: args[3]
  };
  if (
    !(typeof _texArg._size == 'undefined' || typeof _texArg._size == 'number')
  ) {
    //size
    throw new Error('size must be passed as number');
  } else if (!(typeof _texArg._size == 'undefined') && _texArg._size < 0) {
    //size
    throw new Error('size of text should be a whole number!');
  }
  return new TeX(_texArg);
}
