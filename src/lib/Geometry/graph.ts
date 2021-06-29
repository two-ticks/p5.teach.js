import anime from 'animejs';
import { animationTimeline, sceneTime } from '../Scene/controls';
import { sceneContainer } from '../Scene/scene';
import { transform } from '../Scene/transform';

export class Graph2D {
  eqn: any;
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
    x: number = 10,
    y: number = 10,
    width_svg: number = 300,
    height_svg: number = 300
  ) {
    this.eqn = eqn;
    this.x = x;
    this.y = y;
    this.width_svg = width_svg;
    this.height_svg = height_svg;
    this.pathData = createSVGPath(eqn);
    this.graphContainer = createElement('div'); //attaching it to sceneContainer
    this.graphContainer.parent(sceneContainer);
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

  scale(scaleFactor) {
    this.graphContainer.style('transform', `scale(${scaleFactor})`);
  }

  transform(object_finl: any, startTime: number = 0, endTime: number = 2) {
    transform(this, object_finl, startTime, endTime);
  }
  loop(finlEqn, timeDuration: number = 2, startTime: number = 0) {
    timeDuration = timeDuration * 1000;
    startTime = startTime * 1000; //s to ms
    anime({
      loop: true,
      targets: this.graphContainer.elt.querySelectorAll('path')[0],
      d: [
        //{value: shapes[0].d},
        { value: `${createSVGPath(finlEqn)}` }
      ],
      duration: timeDuration,
      direction: 'alternate',
      autoplay: true,
      easing: 'easeInOutCubic',

      delay: startTime
      // complete: function(anim) {
      //   looper.restart;
      // }
      //elasticity: 1
    });
  }
  stroke(_stroke: any) {
    this.linePath.setAttribute('stroke', `${_stroke}`);
  }
  plot() {
    this.graphObject = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    this.graphObject.setAttribute('width', `${this.width_svg}`);
    this.graphObject.setAttribute('height', `${this.height_svg}`);
    this.graphObject.setAttribute('viewBox', '-100 -100 18000 4000');
    this.linePath.setAttribute('d', this.pathData);
    this.graphObject.appendChild(this.linePath);
    this.graphContainer.elt.appendChild(this.graphObject);
  }
  update(eqn: any) {
    this.pathData = createSVGPath(eqn);
    this.linePath.setAttribute('d', this.pathData);
  }

  play(timeDuration: number = 5, startTime: number = 0) {
    timeDuration = timeDuration * 1000;
    startTime = startTime * 1000; //s to ms
    const pathElement = this.graphContainer.elt.querySelectorAll('path');
    animationTimeline.add(
      {
        targets: this.graphContainer.elt.querySelectorAll('path'),
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutSine',
        duration: timeDuration,
        begin: function (anim) {
          //pathElement[0].setAttribute('stroke', 'black');
          pathElement[0].setAttribute('fill', 'none');
        },
        complete: function (anim) {
          //document.querySelector('path').setAttribute("fill", "yellow");
        }
        //autoplay: true
      },
      startTime
    );
  }
}

export function createSVGPath(eqn: any, stepSize: number = 0.001) {
  let minX = 0;
  let SVG_path = `M${1000 * minX},${eqn(minX)}`;
  for (let x = 0.001; x < 20; x += stepSize) {
    // SVG_path = SVG_path.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    SVG_path = SVG_path.concat(` L${1000 * x},${eqn(x)}`);
  }
  return SVG_path;
}

export function create2DGraph(
  eqn: any,
  x: number = 10,
  y: number = 10,
  width_svg: number = 300,
  height_svg: number = 300
) {
  const _object = new Graph2D(eqn, x, y, width_svg, height_svg);
  return _object;
}
