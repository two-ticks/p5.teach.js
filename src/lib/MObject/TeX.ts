import TeXToSVG from 'tex-to-svg';
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
  sentence: string;
  fillColor: p5.Color;
  strokeWidth: number;
  strokeColor: p5.Color;
  constructor(
    sentence: string,
    x: number = 10,
    y: number = 10,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
    this.x = x;
    this.y = y;
    this.sentence = sentence;
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.svgEquation = TeXToSVG(sentence);
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

  scale(scaleFactor) {
    this.writeTexElement.style('transform', `scale(${scaleFactor})`);
  }

  fill(fillColor: p5.Color) {
    if (arguments.length === 0) {
      return this.fillColor;
    } else {
      this.fillColor = fillColor;
    }
  }

  play(
    animationType: string = 'write',
    startTime: number = 0,
    endTime: number = 0
  ) {
    play(this, animationType, startTime, endTime);
  }
}

export function createTeX(
  sentence: string,
  x: number = 10,
  y: number = 10,
  svgWidth: number = 300,
  svgHeight: number = 300
) {
  const object = new TeX(sentence, x, y, svgWidth, svgHeight);
  return object;
}
