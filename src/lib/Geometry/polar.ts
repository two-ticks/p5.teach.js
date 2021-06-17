// let xArr = [];
// let yArr = [];

import anime from 'animejs';

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
    this.linePath = this.linePath = document.createElementNS(
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

  plot() {
    this.graphObject = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    //this.graphObject.setAttribute('style', `translate(-50%, -50%)`);
    this.graphObject.setAttribute('width', `${this.width_svg}`);
    this.graphObject.setAttribute('height', `${this.height_svg}`);
    this.graphObject.setAttribute('viewBox', '-8500 -2000 18000 4000');
    this.linePath.setAttribute('d', this.pathData);
    this.graphObject.appendChild(this.linePath);
    this.graphContainer.elt.appendChild(this.graphObject);
  }

  play() {
    const pathElement = this.graphContainer.elt.querySelectorAll('path');
    var lineDrawing = anime({
      targets: this.graphContainer.elt.querySelectorAll('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: 20000,
      begin: function (anim) {
        pathElement[0].setAttribute('stroke', 'black');
        pathElement[0].setAttribute('fill', 'none');
      },
      complete: function (anim) {
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      autoplay: true
    });
  }
}

function createPolarSVGPath(
  eqn: any,
  thetaRange: number[] = [0, 2 * Math.PI],
  stepSize: number = 0.0001
) {
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
