import anime from 'animejs';
import { GOLD20, INDIGO50, MAGENTA50, ORANGE40, sceneContainer, sceneVariables, ULTRAMARINE40 } from '../Scene/scene';
import { GObject } from './GObject';

const global: any = globalThis;
// const ULTRAMARINE40 = '#648fff';
// const MAGENTA50 = '#dc267f';
// const GOLD20 = '#ffb000';
// const INDIGO50 = '#785ef0';
// const ORANGE40 = '#fe6100';

/**
 * Graph
 * <h1> functions available in Graph </h1>
 * @function beginShape begins recording vertices for a shape
 * @function endShape   stops recording vertices for a shape
 * @function controlPoint
 * @function polyline
 * @function fill
 * @function stroke
 * @function strokeWeight
 * @function rotate
 * @function point
 * @function circle
 * @function ellipse
 * @function rect
 * @function line
 */
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
    grid: any;
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
    pathElements: any;
    graphBox: any;
  };

  /**
   *
   * @param x
   * @param y
   * @param svgWidth
   * @param svgHeight
   * @returns {Graph}
   */
  constructor(
    x: number = 0,
    y: number = 0,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
    sceneVariables.isGraph = 'true';
    //window.isGraph = 'true';
    super(x, y, svgWidth, svgHeight);
    this.config = {
      graphColor: sceneVariables.currentPalette[0],
      graphStrokeWidth: 1,
      arrowSize: 3,
      xAxis: 'true',
      yAxis: 'true',
      minX: -12,
      maxX: 10,
      minY: -10,
      maxY: 10,
      scaleX: 1,
      scaleY: 1,
      axisColor: sceneVariables.currentPalette[1],
      grid: 'true',
      smallGridColor: sceneVariables.currentPalette[3],
      gridColor: sceneVariables.currentPalette[4],
      stepX: 1,
      stepY: 1,
      originX: 0,
      originY: 0,
      tickX: 'false',
      tickY: 'false',
      tickColor: sceneVariables.currentPalette[1],
      tickMarginX: -0.5,
      tickMarginY: -0.5,
      pathElements: 1000,
      graphBox: 'true'
    };

    this.config.scaleX = abs(
      this.svgWidth / (this.config.maxX - this.config.minX)
    );
    this.config.scaleY = abs(
      this.svgHeight / (this.config.maxY - this.config.minY)
    );

    this.graphContainer = createElement('div');
    this.graphContainer.parent(sceneContainer);
    this.linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    this.linePath.setAttribute('fill', 'none');
    this.linePath.setAttribute('stroke', `${this.config.graphColor}`);
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

    return this;
  }

  configure(config) {
    this.config = {
      graphColor: config.graphColor
        ? config.graphColor
        : this.config.graphColor,
      graphStrokeWidth: config.graphStrokeWidth
        ? config.graphStrokeWidth
        : this.config.graphStrokeWidth,
      arrowSize: config.arrowSize ? config.arrowSize : this.config.arrowSize,
      xAxis: config.xAxis ? config.xAxis : this.config.xAxis,
      yAxis: config.yAxis ? config.yAxis : this.config.yAxis,
      minX: config.minX ? config.minX : this.config.minX,
      maxX: config.maxX ? config.maxX : this.config.maxX,
      minY: config.minY ? config.minY : this.config.minY,
      maxY: config.maxY ? config.maxY : this.config.maxY,
      scaleX: config.scaleX ? config.scaleX : this.config.scaleX,
      scaleY: config.scaleY ? config.scaleY : this.config.scaleY,
      axisColor: config.axisColor ? config.axisColor : this.config.axisColor,
      smallGridColor: config.smallGridColor
        ? config.smallGridColor
        : this.config.smallGridColor,
      gridColor: config.gridColor ? config.gridColor : this.config.gridColor,
      stepX: config.stepX ? config.stepX : this.config.stepX,
      stepY: config.stepY ? config.stepY : this.config.stepY,
      originX: config.originX ? config.originX : this.config.originX,
      originY: config.originY ? config.originY : this.config.originY,
      grid: config.grid ? config.grid : this.config.grid,
      tickX: config.tickX ? config.tickX : this.config.tickX,
      tickY: config.tickY ? config.tickY : this.config.tickY,
      tickColor: config.tickColor ? config.tickColor : this.config.tickColor,
      tickMarginX: config.tickMarginX
        ? config.tickMarginX
        : this.config.tickMarginX,
      tickMarginY: config.tickMarginY
        ? config.tickMarginY
        : this.config.tickMarginY,
      pathElements: config.pathElements
        ? config.pathElements
        : this.config.pathElements,
      graphBox: config.graphBox ? config.graphBox : this.config.graphBox
    };
    ////console.log(this.config);
  }

  defs(content) {
    let defines = this.graphObject.getElementsByTagName('defs');
    defines[0].innerHTML += content;
    //this.graphObject.appendChild(defines);
  }
}

/**
 * beginGraph() begins a SVG graph
 *
 * @remarks
 * This function is part of {@link Graph}
 * @returns {Graph}
 */

export function beginGraph(
  x: number = 0,
  y: number = 0,
  svgWidth: number = width,
  svgHeight: number = height
) {
  const graphTemperoryObject = new Graph(x, y, svgWidth, svgHeight);
  sceneVariables.graph = graphTemperoryObject;
  sceneVariables.currentSVG = graphTemperoryObject.graphObject;
  return graphTemperoryObject;
}
/**
 * endGraph() ends a SVG graph
 */
export function endGraph() {
  sceneVariables.isGraph = 'false';
}

global.p5.prototype._rect = global.p5.prototype.rect;
global.p5.prototype.rect = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    //console.log('Canvas rect() called');
    return this._rect(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    //console.log('SVG rect() called');
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
  play(timeDuration) {
    //const pathElement = this.graphContainer.elt.querySelectorAll('path');
    const lineDrawing = anime({
      targets: this.shape, //this.graphContainer.elt.querySelectorAll('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: timeDuration,
      begin: function (anim) {
        //pathElement[0].setAttribute('stroke', 'black');
        //pathElement[0].setAttribute('fill', 'none');
        //this.shape.setAttribute('fill', 'none');
      },
      complete: function (anim) {
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      autoplay: true
    });
  }
}

global.p5.prototype._ellipse = global.p5.prototype.ellipse;
global.p5.prototype.ellipse = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    //console.log('Canvas ellipse() called');
    return this._ellipse(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    //console.log('SVG ellipse() called');
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
    this.shape.setAttribute(
      'style',
      `transform : rotate(${sceneVariables.currAngle.toString()}deg);`
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
  play(timeDuration) {
    //const pathElement = this.graphContainer.elt.querySelectorAll('path');
    const lineDrawing = anime({
      targets: this.shape, //this.graphContainer.elt.querySelectorAll('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: timeDuration,
      begin: function (anim) {
        //pathElement[0].setAttribute('stroke', 'black');
        //pathElement[0].setAttribute('fill', 'none');
        //this.shape.setAttribute('fill', 'none');
      },
      complete: function (anim) {
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      autoplay: true
    });
  }
}

global.p5.prototype._circle = global.p5.prototype.circle;
global.p5.prototype.circle = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    //console.log('Canvas circle() called');
    return this._circle(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    //console.log('SVG circle() called');
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
    //console.log('Canvas point() called');
    return this._point(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    //console.log('SVG point() called');

    return new SVGPoint(...Array.from(arguments));
  }
};

class SVGPoint extends SVGEllipse {
  //rectangle: SVGRectElement;
  constructor(...args: any[]) {
    super(
      arguments[0],
      arguments[1],
      sceneVariables.currStrokeWidth,
      sceneVariables.currStrokeWidth
    );

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

/**
 * controlPoint(x, y) creates a draggable point at (x,y)
 * @param x
 * @param y
 * @returns co-ordinates of current position
 */
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
  //   //console.log(this.xco);
  // }
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
    this.svgLine.setAttribute(
      'style',
      `transform : rotate(${sceneVariables.currAngle.toString()}deg);`
    );
    sceneVariables.currentSVG.appendChild(this.svgLine);
  }

  remove() {
    sceneVariables.currentSVG.removeChild(this.svgLine);
  }
}

global.p5.prototype._fill = global.p5.prototype.fill;
global.p5.prototype.fill = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    sceneVariables.currFillColor = arguments[0].toString();
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
    sceneVariables.currStrokeColor = arguments[0].toString();
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
    sceneVariables.currStrokeWidth = arguments[0];
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
    sceneVariables.currAngle += arguments[0];
    this._rotate(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    sceneVariables.currAngle += arguments[0];
    ////console.log(sceneVariables.currAngle);
    //TODO : rotate currently takes only angles in degree
  }
};

global.p5.prototype._beginShape = global.p5.prototype.beginShape;
global.p5.prototype.beginShape = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    //console.log('Canvas beginShape() called');
    return this._beginShape(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    //console.log('SVG beginShape() called');
    return new SVGPolygon(...Array.from(arguments));
  }
};

/**
 * beginShape() begins recording vertices for a shape and endShape() stops recording.
 */

class SVGPolygon {
  vertices;
  shape: SVGPolygonElement;
  //rectangle: SVGRectElement;
  constructor(...args: any[]) {
    this.vertices = [];
    this.shape = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );
    sceneVariables.currentPolygon = this;
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
    sceneVariables.currentSVG.appendChild(this.shape);
    return this;
  }
  // position(cx: any, cy: any) {
  //   this.cx = cx;
  //   this.cy = cy;
  //   this.shape.setAttribute('cx', `${this.cx}`);
  //   this.shape.setAttribute('cy', `${this.cy}`);
  // }
  remove() {
    sceneVariables.currentSVG.removeChild(this.shape);
  }

  play(timeDuration) {
    //const pathElement = this.graphContainer.elt.querySelectorAll('path');
    const lineDrawing = anime({
      targets: this.shape, //this.graphContainer.elt.querySelectorAll('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: timeDuration,
      begin: function (anim) {
        //pathElement[0].setAttribute('stroke', 'black');
        //pathElement[0].setAttribute('fill', 'none');
        //this.shape.setAttribute('fill', 'none');
      },
      complete: function (anim) {
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      autoplay: true
    });
  }
}

global.p5.prototype._vertex = global.p5.prototype.vertex;
global.p5.prototype.vertex = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    //console.log('Canvas beginShape() called');
    return this._vertex(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    //console.log('SVG beginShape() called');
    return new SVGVertex(...Array.from(arguments));
  }
};

class SVGVertex {
  //vertices;
  //rectangle: SVGRectElement;
  constructor(...args: any[]) {
    if (sceneVariables.currentPolygon != null) {
      sceneVariables.currentPolygon.vertices.push(
        args[0] *
          sceneVariables.graph.config.stepX *
          sceneVariables.graph.config.scaleX
      );
      sceneVariables.currentPolygon.vertices.push(
        -args[1] *
          sceneVariables.graph.config.stepY *
          sceneVariables.graph.config.scaleY
      );
    }
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

global.p5.prototype._endShape = global.p5.prototype.endShape;
global.p5.prototype.endShape = function () {
  if (
    typeof sceneVariables.isGraph === 'undefined' ||
    sceneVariables.isGraph === 'false'
  ) {
    //console.log('Canvas endShape() called');
    return this._endShape(...Array.from(arguments));
  } else if (sceneVariables.isGraph === 'true') {
    //console.log('SVG endShape() called');
    return SVGEndShape(...Array.from(arguments));
  }
};

function SVGEndShape(...args) {
  sceneVariables.currentPolygon.shape.setAttribute(
    'points',
    sceneVariables.currentPolygon.vertices.toString()
  );
  sceneVariables.currentPolygon = null;
}

/**
 * polyline is used to create any shape that consists of only straight lines
 * @param vertices points attribute defines the list of points (pairs of x and y coordinates) required to draw the polyline
 */
export function polyline(arr) {
  return new Polyline(arr);
}
class Polyline {
  shape;
  constructor(arr) {
    let vertices = arr;
    let shape = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polyline'
    );
    shape.setAttribute('fill', `${sceneVariables.currFillColor.toString()}`);
    shape.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    shape.setAttribute('stroke-width', `${sceneVariables.currStrokeWidth}`);
    shape.setAttribute(
      'style',
      `transform : rotate(${sceneVariables.currAngle.toString()}deg);`
    );
    let scaledVertices = vertices.map((elt, i) => {
      if (i % 2 === 0) {
        return (
          elt *
          sceneVariables.graph.config.stepX *
          sceneVariables.graph.config.scaleX
        );
      } else if (i % 2 === 1) {
        return (
          -elt *
          sceneVariables.graph.config.stepY *
          sceneVariables.graph.config.scaleY
        );
      }
    });
    console.log(scaledVertices);

    shape.setAttribute('points', scaledVertices.toString());
    sceneVariables.currentSVG.appendChild(shape);
    this.shape = shape;
    return this;
  }
  
  play(timeDuration) {
    //const pathElement = this.graphContainer.elt.querySelectorAll('path');
    const lineDrawing = anime({
      targets: this.shape, //this.graphContainer.elt.querySelectorAll('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: timeDuration,
      begin: function (anim) {
        //pathElement[0].setAttribute('stroke', 'black');
        //pathElement[0].setAttribute('fill', 'none');
        //this.shape.setAttribute('fill', 'none');
      },
      complete: function (anim) {
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      autoplay: true
    });
  }
}

/**
 * SVGControlPointPosition
 * @param event
 * @internal
 */

global.p5.prototype.SVGControlPointPosition = function (event) {
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
      ////console.log(sceneVariables.selectedPoint.x);

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
};