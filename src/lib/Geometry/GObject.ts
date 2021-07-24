import p5 from 'p5';

export class GObject {
  pathData!: string;
  graphObject!: SVGSVGElement;
  graphContainer!: p5.Element;
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
