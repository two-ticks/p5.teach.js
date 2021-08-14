import anime from 'animejs';
import p5 from 'p5';
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
    //this.graphObject.setAttribute('onload', 'SVGControlPointPosition(evt)');
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
  svgWidth: number = width,
  svgHeight: number = height
) {
  const graphTemperoryObject = new Graph(x, y, svgWidth, svgHeight);
  return graphTemperoryObject;
}

export function endGraph() {
  sceneVariables.isGraph = 'false';
}

global.p5.prototype._rect = global.p5.prototype.rect;
global.p5.prototype.rect = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    console.log('Canvas rect() called');
    return this._rect(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    console.log('SVG rect() called');
    return new Rectangle(...Array.from(arguments));
  }
};

class Rectangle {
  x: number;
  y: number;
  shape: SVGRectElement;
  w: number;
  h: number;
  shapeAngle: number;
  //rectangle: SVGRectElement;
  constructor(...args: any[]) {
    // super(arguments[0], arguments[1]);
    this.shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.x = arguments[0];
    this.y = arguments[1];
    this.w = arguments[2];
    this.h = arguments[3];
    this.shapeAngle = 0;
    this.shape.setAttribute('x', `${this.x}`);
    this.shape.setAttribute('y', `${this.y}`);
    this.shape.setAttribute('width', `${this.w}`);
    this.shape.setAttribute('height', `${this.h}`);
    this.shape.setAttribute(
      'fill',
      `${sceneVariables.currFillColor.toString()}`
    );
    this.shape.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    this.shape.setAttribute(
      'stroke-width',
      `${sceneVariables.currStrokeWidth}`
    );
    this.shape.setAttribute(
      'style',
      `transform : rotate(${sceneVariables.currAngle.toString()}deg);`
    );
    //this.shape.style.transform = `rotate(${sceneVariables.currAngle.toString()})deg;` //rotation
    sceneVariables.currentSVG.appendChild(this.shape);
    return this;
  }
  position(x: any, y: any) {
    this.x = x;
    this.y = y;
    this.shape.setAttribute('x', `${this.x}`);
    this.shape.setAttribute('y', `${this.y}`);
  }
  remove() {
    sceneVariables.currentSVG.removeChild(this.shape);
  }
  rotate(angle: number, mode: string = 'relative') {
    if (angle) {
      if (mode === 'relative') {
        this.shapeAngle += angle;
      } else if (mode === 'absolute') {
        this.shapeAngle = angle;
      }
    }
    this.shape.setAttribute(
      'style',
      `transform : rotate(${sceneVariables.currAngle + this.shapeAngle}deg);`
    );
  }
}

global.p5.prototype._ellipse = global.p5.prototype.ellipse;
global.p5.prototype.ellipse = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    console.log('Canvas ellipse() called');
    return this._ellipse(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    console.log('SVG ellipse() called');
    return new SVGEllipse(...Array.from(arguments));
  }
};

class SVGEllipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  shape: SVGEllipseElement | SVGCircleElement;
  //rectangle: SVGRectElement;
  constructor(...args: any[]) {
    this.shape = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'ellipse'
    );
    this.cx = arguments[0];
    this.cy = arguments[1];
    this.rx = arguments[2];
    this.ry = arguments[3];
    this.shape.setAttribute('cx', `${this.cx}`);
    this.shape.setAttribute('cy', `${this.cy}`);
    this.shape.setAttribute('rx', `${this.rx}`);
    this.shape.setAttribute('ry', `${this.ry}`);
    this.shape.setAttribute(
      'fill',
      `${sceneVariables.currFillColor.toString()}`
    );
    this.shape.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    this.shape.setAttribute(
      'stroke-width',
      `${sceneVariables.currStrokeWidth}`
    );
    sceneVariables.currentSVG.appendChild(this.shape);
    return this;
  }
  position(cx: any, cy: any) {
    this.cx = cx;
    this.cy = cy;
    this.shape.setAttribute('cx', `${this.cx}`);
    this.shape.setAttribute('cy', `${this.cy}`);
  }
  remove() {
    sceneVariables.currentSVG.removeChild(this.shape);
  }
}

global.p5.prototype._circle = global.p5.prototype.circle;
global.p5.prototype.circle = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    console.log('Canvas circle() called');
    return this._circle(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    console.log('SVG circle() called');
    return new SVGCircle(...Array.from(arguments));
  }
};

class SVGCircle extends SVGEllipse {
  //rectangle: SVGRectElement;
  constructor(...args: any[]) {
    super(arguments[0], arguments[1], arguments[2], arguments[2]);
    if (this.shape) {
      sceneVariables.currentSVG.removeChild(this.shape); //removes ellipse if formed by super
    }
    this.shape = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.cx = arguments[0];
    this.cy = arguments[1];
    this.rx = arguments[2];
    this.shape.setAttribute('cx', `${this.cx}`);
    this.shape.setAttribute('cy', `${this.cy}`);
    this.shape.setAttribute('r', `${this.rx}`);
    this.shape.setAttribute(
      'fill',
      `${sceneVariables.currFillColor.toString()}`
    );
    this.shape.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    this.shape.setAttribute(
      'stroke-width',
      `${sceneVariables.currStrokeWidth}`
    );
    sceneVariables.currentSVG.appendChild(this.shape);
    return this;
  }
  // position(cx: any, cy: any) {
  //   this.cx = cx;
  //   this.cy = cy;
  //   this.shape.setAttribute('cx', `${this.cx}`);
  //   this.shape.setAttribute('cy', `${this.cy}`);
  // }
  // remove() {
  //   sceneVariables.currentSVG.removeChild(this.shape);
  // }
}

global.p5.prototype._point = global.p5.prototype.point;
global.p5.prototype.point = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    console.log('Canvas point() called');
    return this._point(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    console.log('SVG point() called');
    return new SVGPoint(...Array.from(arguments));
  }
};

class SVGPoint extends SVGEllipse {
  //rectangle: SVGRectElement;
  constructor(...args: any[]) {
    if (arguments[0] instanceof p5.Vector) {
      super(
        arguments[0].x,
        arguments[0].y,
        sceneVariables.currStrokeWidth,
        sceneVariables.currStrokeWidth
      );
    } else {
      super(
        arguments[0],
        arguments[1],
        sceneVariables.currStrokeWidth,
        sceneVariables.currStrokeWidth
      );
    }
    if (this.shape) {
      sceneVariables.currentSVG.removeChild(this.shape); //removes ellipse if formed by super
    }
    this.shape = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.cx = arguments[0];
    this.cy = arguments[1];
    this.rx = float(sceneVariables.currStrokeWidth);
    this.shape.setAttribute('cx', `${this.cx}`);
    this.shape.setAttribute('cy', `${this.cy}`);
    this.shape.setAttribute('r', `${this.rx / 2}`);
    this.shape.setAttribute(
      'fill',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    this.shape.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    this.shape.setAttribute('stroke-width', `${0}`);
    sceneVariables.currentSVG.appendChild(this.shape);
    return this;
  }
  // position(cx: any, cy: any) {
  //   this.cx = cx;
  //   this.cy = cy;
  //   this.shape.setAttribute('cx', `${this.cx}`);
  //   this.shape.setAttribute('cy', `${this.cy}`);
  // }
  // remove() {
  //   sceneVariables.currentSVG.removeChild(this.shape);
  // }
}

export function controlPoint(...args) {
  if (sceneVariables.isGraph === 'true') {
    return new SVGControlPoint(...args);
  }
}
class SVGControlPoint extends SVGPoint {
  x;
  y;
  constructor(...args: any[]) {
    super(arguments[0], arguments[1]);
    // this.xco = 0;
    // this.yco = 0;

    this.shape.setAttribute('onmousedown', 'SVGControlPointPosition(evt)');

    this.shape.setAttribute('class', 'controlPoint');
    this.shape.setAttribute('posX', `${this.cx}`);
    this.shape.setAttribute('posY', `${this.cy}`);

    return this;
  }

  position() {
    this.x = this.shape.getAttributeNS(null, 'posX');
    this.y = this.shape.getAttributeNS(null, 'posY');
    return [this.x, this.y];
  }
  // setX(x) {
  //   this.xco = x;
  //   // this.x = this.shape.getScreenCTM().e/ this.shape.getScreenCTM().a;
  //   // this.y = this.shape.getScreenCTM().f/ this.shape.getScreenCTM().d;
  //   console.log(this.xco);
  // }
}

export function SVGControlPointPosition(event) {
  let svg = sceneVariables.currentSVG;
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  let offset, transform;
  function getMousePosition(event) {
    let CTM: any = svg.getScreenCTM();
    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d
    };
  }
  function startDrag(event) {
    if (event.target.classList.contains('controlPoint')) {
      sceneVariables.selectedPoint = event.target;
      //console.log(sceneVariables.selectedPoint.x);

      offset = getMousePosition(event);
      // Get all the transforms currently on this element
      var transforms = sceneVariables.selectedPoint.transform.baseVal;
      // Ensure the first transform is a translate transform
      if (
        transforms.length === 0 ||
        transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
      ) {
        // Create an transform that translates by (0, 0)
        var translate = svg.createSVGTransform();
        translate.setTranslate(0, 0);
        // Add the translation to the front of the transforms list
        sceneVariables.selectedPoint.transform.baseVal.insertItemBefore(
          translate,
          0
        );
      }
      // Get initial translation amount
      transform = transforms.getItem(0);
      offset.x -= transform.matrix.e;
      offset.y -= transform.matrix.f;
    }
  }

  function drag(event) {
    if (sceneVariables.selectedPoint) {
      event.preventDefault();
      var coord = getMousePosition(event);
      transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
      sceneVariables.selectedPoint.setAttribute('posX', `${coord.x}`);
      sceneVariables.selectedPoint.setAttribute('posY', `${coord.y}`);
    }
  }
  function endDrag(event) {
    sceneVariables.selectedPoint = null;
  }
}
global.p5.prototype._line = global.p5.prototype.line;
global.p5.prototype.line = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    return this._line(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    return new SVGLine(...Array.from(arguments));
  }
};

class SVGLine {
  svgLine: SVGLineElement;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  constructor(...args: any[]) {
    this.svgLine = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    this.x1 = arguments[0];
    this.y1 = arguments[1];
    this.x2 = arguments[2];
    this.y2 = arguments[3];
    this.svgLine.setAttribute('x1', `${this.x1}`);
    this.svgLine.setAttribute('y1', `${this.y1}`);
    this.svgLine.setAttribute('x2', `${this.x2}`);
    this.svgLine.setAttribute('y2', `${-this.y2}`);
    this.svgLine.setAttribute(
      'fill',
      `${sceneVariables.currFillColor.toString()}`
    );
    this.svgLine.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    this.svgLine.setAttribute(
      'stroke-width',
      `${sceneVariables.currStrokeWidth}`
    );
    sceneVariables.currentSVG.appendChild(this.svgLine);
  }

  remove() {
    sceneVariables.currentSVG.removeChild(this.svgLine);
  }
}

export function arrow(...args) {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    //return this._line(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    return new SVGArrow(...Array.from(arguments));
  }
}

class SVGArrow {
  svgLine: SVGLineElement;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  arrowConfig: {
    arrowHeadColor;
    arrowHeadHeight;
    arrowSize;
  };
  //arrowSize;
  arrow;

  defs: SVGDefsElement;
  constructor(...args: any[]) {
    this.arrowConfig = {
      arrowHeadColor: sceneVariables.currStrokeColor,
      arrowHeadHeight: float(sceneVariables.currStrokeWidth),
      arrowSize: float(sceneVariables.currStrokeWidth)
    };
    // this.arrowSize =
    // this.arrowHeadColor = ;
    this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.svgLine = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    this.x1 = arguments[0];
    this.y1 = arguments[1];
    this.x2 = arguments[2];
    this.y2 = arguments[3];
    const angle = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
    this.svgLine.setAttribute('x1', `${this.x1}`);
    this.svgLine.setAttribute('y1', `${-this.y1}`);
    this.svgLine.setAttribute(
      'x2',
      `${this.x2 - 1.5 * this.arrowConfig.arrowSize * Math.cos(angle)}`
    );
    this.svgLine.setAttribute(
      'y2',
      `${-(this.y2 - 6 * this.arrowConfig.arrowSize * Math.sin(angle))}`
    );
    this.svgLine.setAttribute(
      'fill',
      `${sceneVariables.currFillColor.toString()}`
    );
    this.svgLine.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    this.svgLine.setAttribute(
      'stroke-width',
      `${sceneVariables.currStrokeWidth}`
    );
    this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    this.defs.innerHTML = `<marker refX="${0}" refY="${
      this.arrowConfig.arrowSize
    }" markerWidth="${2 * this.arrowConfig.arrowSize}" markerHeight="${
      2 * this.arrowConfig.arrowSize
    }" id="marker-arrow" class="marker" orient="auto-start-reverse"><path d="M 0 0 L ${
      2 * this.arrowConfig.arrowSize
    } ${this.arrowConfig.arrowSize} L 0 ${
      2 * this.arrowConfig.arrowSize
    } z" style="fill: ${this.arrowConfig.arrowHeadColor.toString()}"></path></marker>`;
    //this.svgLine.setAttribute('marker-start', 'url(#marker-arrow)');
    this.svgLine.setAttribute('marker-end', 'url(#marker-arrow)');

    this.arrow.appendChild(this.defs);
    this.arrow.appendChild(this.svgLine);
    sceneVariables.currentSVG.appendChild(this.arrow);
  }

  configure(arrowConfig) {
    this.arrowConfig = {
      arrowHeadColor: arrowConfig.arrowHeadColor
        ? arrowConfig.arrowHeadColor
        : this.arrowConfig.arrowHeadColor,
      arrowHeadHeight: arrowConfig.arrowHeadHeight
        ? arrowConfig.arrowHeadHeight
        : this.arrowConfig.arrowHeadHeight,
      arrowSize: arrowConfig.arrowSize
        ? arrowConfig.arrowSize
        : this.arrowConfig.arrowSize
    };
    this.defs.innerHTML = `<marker refX="${0}" refY="${
      this.arrowConfig.arrowSize
    }" markerWidth="${2 * this.arrowConfig.arrowSize}" markerHeight="${
      2 * this.arrowConfig.arrowSize
    }" id="marker-arrow" class="marker" orient="auto-start-reverse"><path d="M 0 0 L ${
      2 * this.arrowConfig.arrowSize
    } ${this.arrowConfig.arrowSize} L 0 ${
      2 * this.arrowConfig.arrowSize
    } z" style="fill: ${this.arrowConfig.arrowHeadColor.toString()}"></path></marker>`;
    //this.svgLine.setAttribute('marker-start', 'url(#marker-arrow)');
    this.svgLine.setAttribute('marker-end', 'url(#marker-arrow)');
  }

  remove() {
    sceneVariables.currentSVG.removeChild(this.arrow);
  }

  arrowHead(x, y){

  }
}

global.p5.prototype._fill = global.p5.prototype.fill;
global.p5.prototype.fill = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    this._fill(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    sceneVariables.currFillColor = arguments[0].toString();
  }
};

global.p5.prototype._stroke = global.p5.prototype.stroke;
global.p5.prototype.stroke = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    this._stroke(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    sceneVariables.currStrokeColor = arguments[0].toString();
  }
};

global.p5.prototype._strokeWeight = global.p5.prototype.strokeWeight;
global.p5.prototype.strokeWeight = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    this._strokeWeight(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    sceneVariables.currStrokeWidth = arguments[0];
  }
};

global.p5.prototype._rotate = global.p5.prototype.rotate;
global.p5.prototype.rotate = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    this._rotate(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    sceneVariables.currAngle += arguments[0];
    //console.log(sceneVariables.currAngle);
    //TODO : rotate currently takes only angles in degree
  }
};
