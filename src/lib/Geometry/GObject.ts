import { sceneContainer } from '../Scene/scene';
import { createSVGPath } from './graph';

export class GObject {
  pathData: any;
  graphObject: any;
  graphContainer: any;
  linePath!: SVGPathElement;
  x: number;
  y: number;
  svgWidth: number;
  svgHeight: number;

  constructor(
    x: number = 10,
    y: number = 10,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
    this.x = x;
    this.y = y;
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
  }
}
