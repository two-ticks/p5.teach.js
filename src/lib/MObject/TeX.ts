import TeXToSVG from 'tex-to-svg';
import { TexObject } from '../interfaces';
import { add } from '../Scene/add';
import { play } from '../Scene/play';

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
export class TeX {
  writeTexElement: any;
  svgEquation: any;
  //startTime: number; // left for later decision -> need not specify such details at initialisation
  x: number = 10;
  y: number = 10;
  svgWidth: number;
  svgHeight: number;
  _tex: string;
  fillColor: p5.Color;
  strokeWidth: number;
  strokeColor: p5.Color;
  constructor({
    _tex,
    x = 10,
    y = 10,
    svgWidth = 300,
    svgHeight = 300
  }: TexObject) {
    this.x = x;
    this.y = y;
    this._tex = _tex;
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.svgEquation = TeXToSVG(_tex);
    this.fillColor = color('black');
    this.strokeWidth = 0;
    this.strokeColor = color('black');
  }

  position(x: number = 10, y: number = 10) {
    this.x = x;
    this.y = y;
  }

  size(svgWidth: number = 300, svgHeight: number = 300) {
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
  }

  fill(fillColor: p5.Color) {
    if (arguments.length === 0) {
      return this.fillColor;
    } else {
      this.fillColor = fillColor;
    }
  }

  remove() {
    //TODO : should throw error if called on object which has not been added
    this.writeTexElement.remove();
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

  // _tex: string,
  // x: number = 10,
  // y: number = 10,
  // svgWidth: number = 300,
  // svgHeight: number = 300

  // const object = new TeX(_tex, x, y, svgWidth, svgHeight);
  // return object;
  return new TeX(_texArg);
}
