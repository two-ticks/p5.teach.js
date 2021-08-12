import anime from 'animejs';
import { animationTimeline } from '../Scene/controls';
import { sceneContainer, sceneVariables } from '../Scene/scene';
import { transform } from '../Scene/transform';
import { GObject } from './GObject';

const global: any = globalThis;
const ULTRAMARINE40 = '#648fff';
const MAGENTA50 = '#dc267f';
const GOLD20 = '#ffb000';
const INDIGO50 = '#785ef0';
const ORANGE40 = '#fe6100';

export class Graph extends GObject {
  plotting!: SVGGElement;
  coordinate!: SVGGElement;
  config: {
    //configuration for graph
    scaleX: any;
    maxX: any;
    minX: any;
    scaleY: any;
    maxY: any;
    minY: any;
    graphColor: any;
    graphStrokeWidth: any;
    arrowSize: any;
    xAxis: any;
    yAxis: any;
    axisColor: any;
    smallGridColor: any;
    gridColor: any;
    stepX: any;
    stepY: any;
    originX: any;
    originY: any;
    tickX: any;
    tickY: any;
    tickColor: any;
    tickMarginX: any;
    tickMarginY: any;
    arrowFollowerColor: any;
  };
  // pathData: any;
  // graphObject: any;
  // graphContainer: any;
  // x: number;
  // y: number;
  // svgWidth: number;
  // svgHeight: number;
  // linePath: SVGPathElement;

  constructor(
    x: number = 10,
    y: number = 10,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
    sceneVariables.isGraph = 'true';
    //window.isGraph = 'true';
    super(x, y, svgWidth, svgHeight);
    this.config = {
      graphColor: GOLD20,
      graphStrokeWidth: 1,
      arrowSize: 3,
      xAxis: 'true',
      yAxis: 'true',
      minX: -5,
      maxX: 5,
      minY: -5,
      maxY: 5,
      scaleX: 1,
      scaleY: 1,
      axisColor: INDIGO50,
      smallGridColor: MAGENTA50,
      gridColor: ORANGE40,
      stepX: 1,
      stepY: 1,
      originX: 0,
      originY: 0,
      tickX: 'true',
      tickY: 'true',
      tickColor: ULTRAMARINE40,
      tickMarginX: -0.5,
      tickMarginY: -0.5,
      arrowFollowerColor: MAGENTA50
    };

    this.config.scaleX = abs(
      this.svgWidth / (this.config.maxX - this.config.minX)
    );
    this.config.scaleY = abs(
      this.svgHeight / (this.config.maxY - this.config.minY)
    );
    // this.x = x;
    // this.y = y;
    // this.svgWidth = svgWidth;
    // this.svgHeight = svgHeight;
    //this.pathData = createParametricSVGPath(this.xeqn, this.yeqn, this.parameterRange, this.config);
    this.graphContainer = createElement('div');
    this.graphContainer.parent(sceneContainer);
    this.linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    this.linePath.setAttribute('fill', 'none');
    this.linePath.setAttribute('stroke', 'black');
    this.linePath.setAttribute(
      'stroke-width',
      `${this.config.graphStrokeWidth}`
    );
    this.graphContainer.position(this.x, this.y);
    this.graphObject = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    this.graphObject.setAttribute('width', `${this.svgWidth}`);
    this.graphObject.setAttribute('height', `${this.svgHeight}`);
    this.graphObject.setAttribute(
      'viewBox',
      `${-this.svgWidth / 2} ${-this.svgHeight / 2} ${this.svgWidth} ${
        this.svgHeight
      }`
    );
    this.graphObject.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    this.graphContainer.elt.appendChild(this.graphObject);
    sceneVariables.currentSVG = this.graphObject;
    //return this;
  }
}

export function beginGraph(
  x: number = 10,
  y: number = 10,
  svgWidth: number = 300,
  svgHeight: number = 300
) {
  const graphTemperoryObject = new Graph(x, y, svgWidth, svgHeight);
  return graphTemperoryObject;
}

export function endGraph() {
  sceneVariables.isGraph = 'false';
}

global.p5.prototype._rect = global.p5.prototype.rect;
global.p5.prototype.rect = function() {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    console.log("Canvas rect() called");
    this._rect(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    console.log('SVG rect() called');
    const rectangle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    );
    const x = arguments[0];
    const y = arguments[1];
    const w = arguments[2];
    const h = arguments[3];
    rectangle.setAttribute('x', `${x}`);
    rectangle.setAttribute('y', `${y}`);
    rectangle.setAttribute('width', `${w}`);
    rectangle.setAttribute('height', `${h}`);
    rectangle.setAttribute('fill', `${'none'}`);
    rectangle.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    rectangle.setAttribute('stroke-width', `${sceneVariables.currStrokeWidth}`);
    sceneVariables.currentSVG.appendChild(rectangle);
  }
};

// p5.prototype._line = p5.prototype.line
// p5.prototype.line  = function() {
//   if (typeof isGraph === "undefined" || isGraph === "false") {
//     this._line(...arguments)
//   } else if (isGraph === "true") {
//     const svgLine = document.createElementNS(
//       "http://www.w3.org/2000/svg",
//       "line"
//     )
//     const x1 = arguments[0]
//     const y1 = arguments[1]
//     const x2 = arguments[2]
//     const y2 = arguments[3]
//     svgLine.setAttribute("x1", `${x1}`)
//     svgLine.setAttribute("y1", `${y1}`)
//     svgLine.setAttribute("x2", `${x2}`)
//     svgLine.setAttribute("y2", `${-y2}`)
//     svgLine.setAttribute("fill", `${currFill.toString()}`)
//     svgLine.setAttribute("stroke", `${currStrokeColor.toString()}`)
//     svgLine.setAttribute('stroke-width', `${currStrokeWidth}`)
//     globalThis.graphObject.appendChild(svgLine)
//   }
// }

// p5.prototype._fill = p5.prototype.fill
// p5.prototype.fill = function() {
//   if (typeof isGraph === "undefined" || isGraph === "false") {
//     this._fill(...arguments)
//   } else if (isGraph === "true") {
//     currFill = arguments[0]
//   }
// }

// p5.prototype._stroke = p5.prototype.stroke
// p5.prototype.stroke = function() {
//   if (typeof isGraph === "undefined" || isGraph === "false") {
//     this._stroke(...arguments)
//   } else if (isGraph === "true") {
//     currStrokeColor = arguments[0]
//   }
// }

// p5.prototype._strokeWeight = p5.prototype.strokeWeight
// p5.prototype.strokeWeight = function() {
//   if (typeof isGraph === "undefined" || isGraph === "false") {
//     this._strokeWeight(...arguments)
//   } else if (isGraph === "true") {
//     currStrokeWidth = arguments[0]
//   }
// }
