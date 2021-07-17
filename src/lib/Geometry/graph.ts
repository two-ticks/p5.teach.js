import anime from 'animejs';
import { animationTimeline } from '../Scene/controls';
import { sceneContainer } from '../Scene/scene';
import { transform } from '../Scene/transform';
import { GObject } from './GObject';

export class Graph2D extends GObject {
  eqn: any;
  plotting: any;
  coordinate: any;
  //config
  config;
  constructor(
    eqn: any,
    x: number = 10,
    y: number = 10,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
    super(x, y, svgWidth, svgHeight);
    this.eqn = eqn;
    // this.x = x;
    // this.y = y;
    this.config = {
      arrowSize: 3,
      minX: -10,
      maxX: 10,
      minY: -10,
      maxY: 10,
      scaleX: 1.2,
      scaleY: 1,
      axisColor: 'white',
      stepX: 15,
      stepY: 5
    };

    this.config.minX = -this.svgWidth / 2;
    this.config.maxX = this.svgWidth / 2;
      console.log(this.config.minX);
      
    this.pathData = createSVGPath(
      eqn,
      this.config.minX,
      this.config.maxX,
      this.config.scaleX,
      this.config.scaleY
    );
    this.graphContainer = createElement('div'); //attaching it to sceneContainer
    this.graphContainer.parent(sceneContainer);
    this.linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    this.linePath.setAttribute('fill', 'none');
    this.linePath.setAttribute('stroke', 'black');
    this.linePath.setAttribute('stroke-width', '1');
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
  }
  position(x: number, y: number = 10) {
    this.x = x;
    this.y = y;
    this.graphContainer.position(this.x, this.y);
  }

  size(width, height) {
    if (arguments.length === 0) {
      return [this.svgWidth, this.svgHeight];
    } else {
      this.svgWidth = width;
      this.svgHeight = height;
      this.graphObject.setAttribute('width', `${this.svgWidth}`);
      this.graphObject.setAttribute('height', `${this.svgHeight}`);
      this.graphObject.setAttribute(
        'viewBox',
        `${-this.svgWidth / 2} ${-this.svgHeight / 2} ${this.svgWidth} ${
          this.svgHeight
        }`
      );
    }
  }

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
    this.plotting = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.plotting.setAttribute('id', 'plot');

    this.linePath.setAttribute('d', this.pathData);
    this.plotting.appendChild(this.linePath); // <g id="plot">
    this.graphObject.appendChild(this.plotting);

    // attaching to graphContainer
    this.graphContainer.elt.appendChild(this.graphObject);
  }

  axis() {
    // coordinate system
    this.coordinate = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    this.coordinate.setAttribute('id', 'coordinateSystem');
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML += `<marker refX="${2 * this.config.arrowSize}" refY="${
      this.config.arrowSize
    }" markerWidth="${2 * this.config.arrowSize}" markerHeight="${
      2 * this.config.arrowSize
    }" id="marker-arrow" class="marker" orient="auto-start-reverse"><path d="M 0 0 L ${
      2 * this.config.arrowSize
    } ${this.config.arrowSize} L 0 ${
      2 * this.config.arrowSize
    } z" style="fill: ${this.config.axisColor}"></path></marker>`;
    this.graphObject.appendChild(defs);
    // this.graphObject.appendChild(arrowPath);

    let frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    frame.setAttribute('x', `${-this.svgWidth / 2}`);
    frame.setAttribute('y', `${-this.svgHeight / 2}`);
    frame.setAttribute('width', `${this.svgWidth}`);
    frame.setAttribute('height', `${this.svgHeight}`);
    frame.setAttribute('fill', `rgba(0,0,0,0)`);
    frame.setAttribute('stroke', `black`);

    //grid
    defs.innerHTML += `<pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
     <path d="M 10 0 L 0 0 0 10" fill="none" stroke="darkgreen" stroke-width="0.5"/>
    </pattern>
    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
     <rect width="100" height="100" fill="url(#smallGrid)"/>
     <path d="M 100 0 L 0 0 0 100" fill="none" stroke="darkgreen" stroke-width="1"/>
    </pattern>`;

    let grid = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    grid.setAttribute('x', `${-this.svgWidth / 2}`);
    grid.setAttribute('y', `${-this.svgHeight / 2}`);
    grid.setAttribute('width', `100%`);
    grid.setAttribute('height', `100%`);
    grid.setAttribute('fill', `url(#grid)`);
    grid.setAttribute('stroke', `white`);
    this.coordinate.appendChild(frame);
    this.coordinate.appendChild(grid);

    //axes
    let xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', `${-this.svgWidth / 2}`);
    xAxis.setAttribute('y1', `0`);
    xAxis.setAttribute('x2', `${this.svgWidth / 2}`);
    xAxis.setAttribute('y2', `0`);
    xAxis.setAttribute('marker-start', 'url(#marker-arrow)');
    xAxis.setAttribute('marker-end', 'url(#marker-arrow)');
    xAxis.setAttribute('stroke', `${this.config.axisColor}`);
    xAxis.setAttribute('fill', `none`);

    let yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', `0`);
    yAxis.setAttribute('y1', `${-this.svgHeight / 2}`);
    yAxis.setAttribute('x2', `0`);
    yAxis.setAttribute('y2', `${this.svgHeight / 2}`);
    yAxis.setAttribute('marker-start', 'url(#marker-arrow)');
    yAxis.setAttribute('marker-end', 'url(#marker-arrow)');
    yAxis.setAttribute('stroke', `${this.config.axisColor}`);
    yAxis.setAttribute('fill', `none`);
    //xAxis.setAttribute('stroke', color);
    //xAxis.setAttribute('stroke-width', w);

    this.coordinate.appendChild(xAxis);
    this.coordinate.appendChild(yAxis);

    //ticks
    // let tick;
    // for (let i = -6; i <= 6; i++) {
    //   let x = i * this.config.stepX;
    //   tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    //   tick.setAttribute('x', `${x}`);
    //   tick.setAttribute('y', `${0}`);
    //   tick.innerHTML = i.toString();
    //   tick.style.textAnchor = 'middle';
    //   tick.style.alignmentBaseline = 'middle';
    //   tick.style.strokeOpacity = '.2';
    //   this.coordinate.appendChild(tick);
    // }

    //this.plotting.appendChild(this.linePath);
    this.graphObject.appendChild(this.coordinate); // <g id="coordinateSystem">
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

export function createSVGPath(
  eqn: any,
  minX: number = -13,
  maxX: number = 12,
  scaleX: number = 9,
  scaleY: number = 0.5,
  stepSize: number = 0.00001
) {
  const pathElements = 1000;
  // const scaleX = 9;
  // const scaleY = 0.5;
  stepSize = (maxX - minX) / pathElements;
  console.log((maxX - minX));
  
  //minX = 0;
  let SVG_path = `M${scaleX * minX},${scaleY * eqn(minX)}`;
  for (let x = minX; x < maxX; x += stepSize) {
    // SVG_path = SVG_path.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    SVG_path = SVG_path.concat(` L${scaleX * x}, ${scaleY * eqn(x)}`);
  }
  return SVG_path;
}

export function create2DGraph(
  eqn: any,
  x: number = 10,
  y: number = 10,
  svgWidth: number = 300,
  svgHeight: number = 300
) {
  //const _object =
  return new Graph2D(eqn, x, y, svgWidth, svgHeight);
}
