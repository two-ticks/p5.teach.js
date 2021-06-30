import anime from 'animejs';
import { transform } from '../Scene/transform';

export class GraphPolar2D {
  eqn: any;
  thetaRange: number[];
  pathData: any;
  graphObject: any;
  graphContainer: any;
  x: number;
  y: number;
  width_svg: number;
  height_svg: number;
  linePath: SVGPathElement;

  constructor(
    eqn: any,
    thetaRange: number[] = [0, 2 * Math.PI],
    x: number = 10,
    y: number = 10,
    width_svg: number = 300,
    height_svg: number = 300
  ) {
    this.eqn = eqn;
    this.thetaRange = thetaRange;
    this.x = x;
    this.y = y;
    this.width_svg = width_svg;
    this.height_svg = height_svg;
    this.pathData = createPolarSVGPath(eqn, thetaRange);
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
  size(sizePx: number) {}
  stroke(_stroke: any) {
    this.linePath.setAttribute('stroke', `${_stroke}`);
  }
  plot() {
    this.graphObject = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    //this.graphObject.setAttribute('style', `translate(-50%, -50%)`);
    this.graphObject.setAttribute('width', `${this.width_svg}`);
    this.graphObject.setAttribute('height', `${this.height_svg}`);
    this.graphObject.setAttribute('viewBox', '-8500 -2000 18000 4000');
    this.graphObject.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    this.linePath.setAttribute('d', this.pathData);
    this.graphObject.appendChild(this.linePath);
    this.graphContainer.elt.appendChild(this.graphObject);
  }

  remove() {
    this.graphContainer.elt.removeChild(this.graphObject);
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

export function createPolarSVGPath(
  eqn: any,
  thetaRange: number[] = [0, 2 * Math.PI],
  stepSize: number = 0.001
) {
  const pathElements = 1000;
  stepSize = (thetaRange[1]-thetaRange[0])/pathElements; 

  let minX = 0;
  let scaleX = 100;
  let scaleY = 100;
  let SVG_path = `M${scaleX * eqn(minX) * Math.cos(0)},${
    scaleY * eqn(minX) * Math.sin(0)
  }`;
  for (let theta = thetaRange[0]; theta < thetaRange[1]; theta += stepSize) {
    // SVG_path = SVG_path.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    SVG_path = SVG_path.concat(
      ` L${scaleX * eqn(theta) * Math.cos(theta)},${
        scaleY * eqn(theta) * Math.sin(theta)
      }`
    );
  }
  return SVG_path;
}

export function create2DPolarGraph(
  eqn: any,
  thetaRange: number[] = [0, 2 * Math.PI],
  x: number = 10,
  y: number = 10,
  width_svg: number = 300,
  height_svg: number = 300
) {
  const _object = new GraphPolar2D(
    eqn,
    thetaRange,
    x,
    y,
    width_svg,
    height_svg
  );
  return _object;
}
