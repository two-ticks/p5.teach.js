import TeXToSVG from 'tex-to-svg';
import { TexObject } from '../interfaces';
import { add } from '../Scene/add';
import { play } from '../Scene/play';
import { MObject } from './MObject';

//TODO : add test cases

/**
 * TeX class
 *
 * @param    {String} - escaped TeX input
 * @param    {number} - x
 * @param    {number} - y
 * @param    {number} - width
 * @param    {number} - height
 *
 * @example
 *
 * example for playing animation of type 'appear' for TeX object:
 * ```js
 * let tex_1 = new TeX(
 *  '\\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}\\overrightarrow{F}_{12} = k_e \\frac{q_1 q_2}{r^2}',
 *   200,
 *   300,
 *   200,
 *   100
 * );
 * ```
 * @experimental
 */
export class TeX extends MObject {
  svgEquation: string;
  //startTime: number; // left for later decision -> need not specify such details at initialisation
  //_tex: string;
  
  svgWidth: number;
  svgHeight: number;
  _strokeWidth: number;
  strokeColor: p5.Color;
  constructor({
    _tex,
    x = 10,
    y = 10,
    svgWidth = 300,
    svgHeight = 300
  }: TexObject) {
    super(_tex, x, y);
    //this._tex = _tex;
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.svgEquation = TeXToSVG(_tex);
    this._strokeWidth = 8;
    this.strokeColor = color('black');
  }

  position(x: number = 10, y: number = 10) {
    if (arguments.length === 0) {
      return [this.x, this.y];
    } else {
      this.x = x;
      this.y = y;
    }
  }

  size(svgWidth: number = 300, svgHeight: number = 300) {
    if (arguments.length === 0) {
      return [this.svgWidth, this.svgHeight];
    } else {
      this.svgWidth = svgWidth;
      this.svgHeight = svgHeight;
    }
  }

  stroke(strokeColor: p5.Color = color('black')) {
    if (arguments.length === 0) {
      return this.strokeColor;
    } else {
      this.strokeColor = strokeColor;
    }
  }
  strokeWidth(_strokeWidth: number = 8) {
    if (arguments.length === 0) {
      return this._strokeWidth;
    } else {
      this._strokeWidth = _strokeWidth;
    }
  }

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
    //this.writeTexElement.style('opacity', '1');
  }

  play(
    animationType: string = 'write',
    startTime: number = 0,
    endTime: number = 0
  ) {
    play(this, animationType, startTime, endTime);
  }
}

export function createTeX(...args: any[]) {
  const _texArg: TexObject = {
    _tex: args[0],
    x: args[1],
    y: args[2],
    svgWidth: args[3],
    svgHeight: args[4]
  };
  if (
    !(
      typeof _texArg.svgWidth == 'undefined' ||
      typeof _texArg.svgWidth == 'number'
    )
  ) {
    //size
    throw new Error('size must be passed as number');
  } else if (
    !(typeof _texArg.svgWidth == 'undefined') &&
    _texArg.svgWidth < 0
  ) {
    //size
    throw new Error('width of tex should be greater than zero!');
  }

  if (
    !(
      typeof _texArg.svgHeight == 'undefined' ||
      typeof _texArg.svgHeight == 'number'
    )
  ) {
    //size
    throw new Error('size must be passed as number');
  } else if (
    !(typeof _texArg.svgHeight == 'undefined') &&
    _texArg.svgHeight < 0
  ) {
    //size
    throw new Error('height of tex should be greater than zero!');
  }
  return new TeX(_texArg);
}
