import anime from 'animejs';
import { transform } from '../Scene/transform';

export class GraphParametric2D {
  xeqn: any;
  yeqn: any;
  parameterRange: number[];
  pathData: any;
  graphObject: any;
  graphContainer: any;
  x: number;
  y: number;
  svgWidth: number;
  svgHeight: number;
  linePath: SVGPathElement;

  constructor(
    xeqn: any,
    yeqn: any,
    parameterRange: number[] = [0, 2 * Math.PI],
    x: number = 10,
    y: number = 10,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
    this.xeqn = xeqn;
    this.yeqn = yeqn;
    this.parameterRange = parameterRange;
    this.x = x;
    this.y = y;
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
    this.pathData = createParametricSVGPath(xeqn, yeqn, parameterRange);
    this.graphContainer = createElement('div');
    this.linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    this.linePath.setAttribute('fill', 'none');
    this.linePath.setAttribute('stroke', 'black');
    this.linePath.setAttribute('stroke-width', '40');
    this.graphContainer.position(this.x, this.y);
  }
  position(x: number, y: number = 10) {
    this.x = x;
    this.y = y;
    this.graphContainer.position(this.x, this.y);
  }
  size(svgWidth: number = 300, svgHeight: number = 300) {
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
  }
  stroke(_stroke: any) {
    this.linePath.setAttribute('stroke', `${_stroke}`);
  }
  plot() {
    this.graphObject = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    //this.graphObject.setAttribute('style', `translate(-50%, -50%)`);
    this.graphObject.setAttribute('width', `${this.svgWidth}`);
    this.graphObject.setAttribute('height', `${this.svgHeight}`);
    this.graphObject.setAttribute('viewBox', '-8500 -2000 18000 4000');
    this.graphObject.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    this.linePath.setAttribute('d', this.pathData);
    this.graphObject.appendChild(this.linePath);
    this.graphContainer.elt.appendChild(this.graphObject);
  }

  remove() {
    this.graphContainer.elt.removeChild(this.graphObject);
  }
  update(xeqn: any, yeqn: any) {
    this.pathData = createParametricSVGPath(xeqn, yeqn);
    this.linePath.setAttribute('d', this.pathData);
  }
  transform(object_finl: any, startTime: number = 0, endTime: number = 2) {
    transform(this, object_finl, startTime, endTime);
  }
  play() {
    const pathElement = this.graphContainer.elt.querySelectorAll('path');
    const lineDrawing = anime({
      targets: this.graphContainer.elt.querySelectorAll('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: 50000,
      begin: function (anim) {
        //pathElement[0].setAttribute('stroke', 'black');
        pathElement[0].setAttribute('fill', 'none');
      },
      complete: function (anim) {
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      autoplay: true
    });
  }
  //TODO : arrow follower
  arrow(eqn: any) {
    let arrowPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    arrowPath.setAttribute('fill', 'none');
    arrowPath.setAttribute('stroke', 'black');
    arrowPath.setAttribute('stroke-width', '40');
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML =
      '<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="7.5" refY="3.5" orient="auto">  <polygon points="0 0, 10 3.5, 0 7" /></marker>';
    this.graphObject.appendChild(defs);
    this.graphObject.appendChild(arrowPath);
    let update = 0;
    //this.graphObject.appendChild(arrowPath);
    const arrowDrawing = anime({
      targets: arrowPath,
      //strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: 50000,
      begin: function (anim) {
        //pathElement[0].setAttribute('stroke', 'black');
        //pathElement[0].setAttribute('fill', 'none');
      },
      complete: function (anim) {
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      update: function (anim) {
        update += 0.01;

        let scaleX = 100;
        let scaleY = 100;
        arrowPath.setAttribute('x1', `${0}`);

        arrowPath.setAttribute(
          'x2',
          `${scaleX * eqn(update) * Math.cos(update)}`
        );
        arrowPath.setAttribute('y1', `${0}`);
        arrowPath.setAttribute(
          'y2',
          `${scaleY * eqn(update) * Math.sin(update)}`
        );
        arrowPath.setAttribute('marker-end', 'url(#arrowhead)');
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      autoplay: true
    });
  }
}

export function createParametricSVGPath(
  xeqn: any,
  yeqn: any,
  parameterRange: number[] = [0, 2 * Math.PI],
  stepSize: number = 0.001
) {
  const pathElements = 1000;
  stepSize = (parameterRange[1] - parameterRange[0]) / pathElements;

  let minX = parameterRange[0];
  let scaleX = 100;
  let scaleY = 100;
  let SVG_path = `M${scaleX * xeqn(minX)},${scaleY * yeqn(minX)}`;
  for (
    let parameter = parameterRange[0];
    parameter < parameterRange[1];
    parameter += stepSize
  ) {
    // SVG_path = SVG_path.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    SVG_path = SVG_path.concat(
      ` L${scaleX * xeqn(parameter)},${scaleY * yeqn(parameter)}`
    );
  }
  return SVG_path;
}

export function create2DParametricGraph(
  xeqn: any,
  yeqn: any,
  parameterRange: number[] = [0, 2 * Math.PI],
  x: number = 10,
  y: number = 10,
  svgWidth: number = 300,
  svgHeight: number = 300
) {
  const _object = new GraphParametric2D(
    xeqn,
    yeqn,
    parameterRange,
    x,
    y,
    svgWidth,
    svgHeight
  );
  return _object;
}
