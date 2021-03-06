import anime from 'animejs';
import { animationTimeline } from '../Scene/controls';
import {
  GOLD20,
  INDIGO50,
  MAGENTA50,
  ORANGE40,
  sceneContainer,
  sceneVariables,
  ULTRAMARINE40
} from '../Scene/scene';
import { transform } from '../Scene/transform';
import { GObject } from './GObject';

// color blind safe palette
// const ULTRAMARINE40 = '#648fff';
// const MAGENTA50 = '#dc267f';
// const GOLD20 = '#ffb000';
// const INDIGO50 = '#785ef0';
// const ORANGE40 = '#fe6100';

/**
 * class representing a 2-D Cartesian Graph
 */

export class Graph2D extends GObject {
  eqn: Function;
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
   * creates a graph object
   * @param {Function} eqn function to plot
   * @param {number} [x] x-coordinate of graph
   * @param {number} [y] y-coordinate of graph
   * @param {Number} [svgWidth] width of the graph
   * @param {Number} [svgHeight] height of the graph
   */

  constructor(
    eqn: Function,
    x: number = 10,
    y: number = 10,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
    super(x, y, svgWidth, svgHeight);

    this.config = {
      graphColor: sceneVariables.currentPalette[0],
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
      axisColor: sceneVariables.currentPalette[4],
      grid: 'true',
      smallGridColor: sceneVariables.currentPalette[3],
      gridColor: sceneVariables.currentPalette[2],
      stepX: 1,
      stepY: 1,
      originX: 0,
      originY: 0,
      tickX: 'true',
      tickY: 'true',
      tickColor: sceneVariables.currentPalette[1],
      tickMarginX: -0.5,
      tickMarginY: -0.5,
      pathElements: 1000,
      graphBox: 'true'
    };

    this.eqn = eqn;
    // this.x = x;
    // this.y = y;

    //this.config.minX = -this.svgWidth / 2;
    //this.config.maxX = this.svgWidth / 2;
    this.config.scaleX = abs(
      this.svgWidth / (this.config.maxX - this.config.minX)
    );
    this.config.scaleY = abs(
      this.svgHeight / (this.config.maxY - this.config.minY)
    );

    //console.log(this.config.maxX - this.config.minX);

    // this.pathData = createSVGPath(eqn, this.config);
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

  /**
   * sets position of text
   * @param {number} x-coordinate x-coordinate of text
   * @param {number} y-coordinate y-coordinate of text
   */

  position(x: number, y: number = 10) {
    this.x = x;
    this.y = y;
    this.graphContainer.position(this.x, this.y);
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
    //console.log(this.config);
  }

  /**
   * sets font-size of text
   * @param {number} font-size font-size of the text
   */

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
        { value: `${createSVGPath(finlEqn, this.config)}` }
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
    this.config.graphColor = _stroke;
    this.linePath.setAttribute('stroke', `${_stroke}`);
  }

  plot() {
    this.pathData = createSVGPath(this.eqn, this.config);
    this.plotting = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.plotting.setAttribute('id', 'plot');
    this.linePath.setAttribute('stroke', `${this.config.graphColor}`);
    this.linePath.setAttribute(
      'stroke-width',
      `${this.config.graphStrokeWidth}`
    );
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

    // let frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // frame.setAttribute('x', `${-this.svgWidth / 2}`);
    // frame.setAttribute('y', `${-this.svgHeight / 2}`);
    // frame.setAttribute('width', `${this.svgWidth}`);
    // frame.setAttribute('height', `${this.svgHeight}`);
    // frame.setAttribute('fill', `rgba(0,0,0,0)`);
    // frame.setAttribute('stroke', `white`);

    //grid
    defs.innerHTML += `<pattern id="smallGrid" width="${
      this.config.stepX * this.config.scaleX
    }" height="${
      this.config.stepY * this.config.scaleY
    }" patternUnits="userSpaceOnUse">
     <path d="M ${this.config.stepX * this.config.scaleX} 0 L 0 0 0 ${
      this.config.stepY * this.config.scaleY
    }" fill="none" stroke="${this.config.smallGridColor}" stroke-width="0.5"/>
    </pattern>
    <pattern x = ${this.config.originX * this.config.scaleX} y = ${
      this.config.originY * this.config.scaleY
    } id="grid" width="${4 * this.config.stepX * this.config.scaleX}" height="${
      4 * this.config.stepY * this.config.scaleY
    }" patternUnits="userSpaceOnUse">
     <rect width="${4 * this.config.stepX * this.config.scaleX}" height="${
      4 * this.config.stepY * this.config.scaleY
    }" fill="url(#smallGrid)"/>
     <path d="M ${4 * this.config.stepX * this.config.scaleX} 0 L 0 0 0 ${
      4 * this.config.stepY * this.config.scaleY
    }" fill="none" stroke="${this.config.gridColor}" stroke-width="1"/>
    </pattern>`;

    let grid = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    grid.setAttribute('x', `${-this.svgWidth / 2}`);
    grid.setAttribute('y', `${-this.svgHeight / 2}`);
    grid.setAttribute('width', `100%`);
    grid.setAttribute('height', `100%`);
    if (this.config.grid === 'true') {
      grid.setAttribute('fill', `url(#grid)`);
    }
    if (this.config.graphBox === 'true') {
      grid.setAttribute('stroke', `white`);
    }
    //this.coordinate.appendChild(frame);
    this.coordinate.appendChild(grid);

    //axes
    //console.log(this.config.axisX);
    // console.log(this.config.tickX);
    if (this.config.xAxis === 'true') {
      let xAxis = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      xAxis.setAttribute('x1', `${-this.svgWidth / 2}`);
      xAxis.setAttribute('y1', `${-this.config.originY * this.config.scaleY}`);
      xAxis.setAttribute('x2', `${this.svgWidth / 2}`);
      xAxis.setAttribute('y2', `${-this.config.originY * this.config.scaleY}`);
      xAxis.setAttribute('marker-start', 'url(#marker-arrow)');
      xAxis.setAttribute('marker-end', 'url(#marker-arrow)');
      xAxis.setAttribute('stroke', `${this.config.axisColor}`);
      xAxis.setAttribute('fill', `none`);
      this.coordinate.appendChild(xAxis);

      if (this.config.tickX === 'true') {
        let tick;
        //x axis
        //+ve axis
        for (
          let i = 0;
          i <
          abs(
            int(this.svgWidth / (2 * this.config.scaleX) - this.config.originX)
          ) /
            this.config.stepX;
          i++
        ) {
          let x =
            this.config.originX * this.config.scaleX +
            (i + 1) * this.config.stepX * this.config.scaleX;
          tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tick.setAttribute('x', `${x}`);
          tick.setAttribute(
            'y',
            `${
              -this.config.originY * this.config.scaleY -
              this.config.tickMarginX * this.config.scaleY
            }`
          );
          tick.innerHTML = (i + 1).toString();
          tick.style.textAnchor = 'middle';
          tick.style.alignmentBaseline = 'middle';
          tick.style.strokeOpacity = '.2';
          tick.style.fill = `${this.config.tickColor}`;
          this.coordinate.appendChild(tick);
        }

        //console.log(int(this.svgWidth / (2*this.config.scaleX)) + this.config.originX);

        //-ve axis
        for (
          let i = abs(
            int(this.svgWidth / (2 * this.config.scaleX)) + this.config.originX
          );
          i >= 0;
          i--
        ) {
          let x =
            this.config.originX * this.config.scaleX -
            (i + 1) * this.config.stepX * this.config.scaleX;
          tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tick.setAttribute('x', `${x}`);
          tick.setAttribute(
            'y',
            `${
              -this.config.originY * this.config.scaleY -
              this.config.tickMarginX * this.config.scaleY
            }`
          );
          tick.innerHTML = -(i + 1).toString();
          tick.style.textAnchor = 'middle';
          tick.style.alignmentBaseline = 'middle';
          tick.style.strokeOpacity = '.2';
          tick.style.fill = `${this.config.tickColor}`;
          this.coordinate.appendChild(tick);
        }
      }
    }

    if (this.config.yAxis === 'true') {
      let yAxis = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      yAxis.setAttribute('x1', `${this.config.originX * this.config.scaleX}`);
      yAxis.setAttribute('y1', `${-this.svgHeight / 2}`);
      yAxis.setAttribute('x2', `${this.config.originX * this.config.scaleX}`);
      yAxis.setAttribute('y2', `${this.svgHeight / 2}`);
      yAxis.setAttribute('marker-start', 'url(#marker-arrow)');
      yAxis.setAttribute('marker-end', 'url(#marker-arrow)');
      yAxis.setAttribute('stroke', `${this.config.axisColor}`);
      yAxis.setAttribute('fill', `none`);
      this.coordinate.appendChild(yAxis);
      if (this.config.tickY === 'true') {
        let tick;
        //y axis
        //+ve axis
        for (
          let i = 0;
          i <=
          abs(
            -int(this.svgHeight / (2 * this.config.scaleY)) +
              this.config.originY
          );
          i++
        ) {
          let y =
            -this.config.originY * this.config.scaleY -
            (i + 1) * this.config.stepY * this.config.scaleY;
          tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tick.setAttribute(
            'x',
            `${
              this.config.originX * this.config.scaleX +
              this.config.tickMarginY * this.config.scaleX
            }`
          );
          tick.setAttribute('y', `${y}`);
          tick.innerHTML = (i + 1).toString();
          tick.style.textAnchor = 'middle';
          tick.style.alignmentBaseline = 'middle';
          tick.style.strokeOpacity = '.2';
          tick.style.fill = `${this.config.tickColor}`;
          this.coordinate.appendChild(tick);
        }
        //-ve axis
        for (
          let i = abs(
            -int(this.svgHeight / (2 * this.config.scaleY)) -
              this.config.originY
          );
          i >= 0;
          i--
        ) {
          let y =
            -this.config.originY * this.config.scaleY +
            (i + 1) * this.config.stepY * this.config.scaleY;
          tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tick.setAttribute(
            'x',
            `${
              this.config.originX * this.config.scaleX +
              this.config.tickMarginY * this.config.scaleX
            }`
          );
          tick.setAttribute('y', `${y}`);
          tick.innerHTML = -(i + 1).toString();
          tick.style.textAnchor = 'middle';
          tick.style.alignmentBaseline = 'middle';
          tick.style.strokeOpacity = '.2';
          tick.style.fill = `${this.config.tickColor}`;
          this.coordinate.appendChild(tick);
        }
      }
    }

    //xAxis.setAttribute('stroke', color);
    //xAxis.setAttribute('stroke-width', w);

    //ticks

    //this.plotting.appendChild(this.linePath);
    this.graphObject.appendChild(this.coordinate); // <g id="coordinateSystem">
  }

  update(eqn: Function) {
    this.pathData = createSVGPath(eqn, this.config);
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

/**
 * createSVGPath function creates a graph object and returns graph object
 * @param {Function} eqn function to plot
 * @param {object} [config] config for graph
 * @returns {Graph2D} 2D Graph object
 */

export function createSVGPath(eqn: Function, config) {
  //const pathElements = 1000;
  // const scaleX = 9;
  // const scaleY = 0.5;
  // scaleX = width/(maxX - minX);
  const stepSize = (config.maxX - config.minX) / config.pathElements;

  //minX = 0;
  let SVG_path = `M${
    config.stepX *
    (config.scaleX * config.minX + config.originX * config.scaleX)
  },${
    config.stepY *
    (config.scaleY * -eqn(config.minX + config.originX * config.scaleX) -
      config.originY * config.scaleY)
  }`;
  for (let x = config.minX; x < config.maxX; x += stepSize) {
    // SVG_path = SVG_path.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    SVG_path = SVG_path.concat(
      ` L${
        config.stepX * (config.scaleX * x + config.originX * config.scaleX)
      }, ${
        config.stepY *
        (config.scaleY * -eqn(x) - config.originY * config.scaleY)
      }`
    );
  }
  return SVG_path;
}

/**
 * create2DGraph function creates a graph object and return graph object
 * @param {Function} eqn function to plot
 * @param {number} [x] x-coordinate of graph
 * @param {number} [y] y-coordinate of graph
 * @param {Number} [svgWidth] width of the graph
 * @param {Number} [svgHeight] height of the graph
 * @returns {Graph2D} 2D Graph object
 */

export function create2DGraph(
  eqn: Function,
  x: number = 10,
  y: number = 10,
  svgWidth: number = 300,
  svgHeight: number = 300
) {
  //const _object =
  return new Graph2D(eqn, x, y, svgWidth, svgHeight);
}

export function plot2D(eqn: Function) {
  //const plot2d = new Graph2D(eqn, sceneVariables.currentSVG.getBBox().x, sceneVariables.currentSVG.getBBox().y, sceneVariables.currentSVG.getBBox().width, sceneVariables.currentSVG.getBBox().height);
  if (sceneVariables.isGraph === 'true') {
    let linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    linePath.setAttribute('fill', 'none');
    linePath.setAttribute('stroke', `${sceneVariables.currStrokeColor}`);
    linePath.setAttribute('stroke-width', `${sceneVariables.currStrokeWidth}`);
    let pathData = createSVGPath(eqn, sceneVariables.graph.config);
    const plotting = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    plotting.setAttribute('id', 'plot');
    // linePath.setAttribute(
    //   'stroke',
    //   `${sceneVariables.graph.config.graphColor}`
    // );
    // linePath.setAttribute(
    //   'stroke-width',
    //   `${sceneVariables.graph.config.graphStrokeWidth}`
    // );
    linePath.setAttribute('d', pathData);

    plotting.appendChild(linePath); // <g id="plot">

    sceneVariables.graph.graphObject.appendChild(plotting);

    // attaching to graphContainer
    sceneVariables.graph.graphContainer.elt.appendChild(
      sceneVariables.graph.graphObject
    );
    // sceneVariables.currentSVG.appendChild;
  }
}

export function axis() {
  const graph = sceneVariables.graph;

  if (sceneVariables.isGraph === 'true') {
    graph.coordinate = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    graph.coordinate.setAttribute('id', 'coordinateSystem');
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML += `<marker refX="${2 * graph.config.arrowSize}" refY="${
      graph.config.arrowSize
    }" markerWidth="${2 * graph.config.arrowSize}" markerHeight="${
      2 * graph.config.arrowSize
    }" id="marker-arrow" class="marker" orient="auto-start-reverse"><path d="M 0 0 L ${
      2 * graph.config.arrowSize
    } ${graph.config.arrowSize} L 0 ${
      2 * graph.config.arrowSize
    } z" style="fill: ${graph.config.axisColor}"></path></marker>`;
    graph.graphObject.appendChild(defs);
    // graph.graphObject.appendChild(arrowPath);

    // let frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // frame.setAttribute('x', `${-graph.svgWidth / 2}`);
    // frame.setAttribute('y', `${-graph.svgHeight / 2}`);
    // frame.setAttribute('width', `${graph.svgWidth}`);
    // frame.setAttribute('height', `${graph.svgHeight}`);
    // frame.setAttribute('fill', `rgba(0,0,0,0)`);
    // frame.setAttribute('stroke', `white`);

    //grid
    defs.innerHTML += `<pattern id="smallGrid" width="${
      graph.config.stepX * graph.config.scaleX
    }" height="${
      graph.config.stepY * graph.config.scaleY
    }" patternUnits="userSpaceOnUse">
   <path d="M ${graph.config.stepX * graph.config.scaleX} 0 L 0 0 0 ${
      graph.config.stepY * graph.config.scaleY
    }" fill="none" stroke="${graph.config.smallGridColor}" stroke-width="0.5"/>
  </pattern>
  <pattern x = ${graph.config.originX * graph.config.scaleX} y = ${
      graph.config.originY * graph.config.scaleY
    } id="grid" width="${
      4 * graph.config.stepX * graph.config.scaleX
    }" height="${
      4 * graph.config.stepY * graph.config.scaleY
    }" patternUnits="userSpaceOnUse">
   <rect width="${4 * graph.config.stepX * graph.config.scaleX}" height="${
      4 * graph.config.stepY * graph.config.scaleY
    }" fill="url(#smallGrid)"/>
   <path d="M ${4 * graph.config.stepX * graph.config.scaleX} 0 L 0 0 0 ${
      4 * graph.config.stepY * graph.config.scaleY
    }" fill="none" stroke="${graph.config.gridColor}" stroke-width="1"/>
  </pattern>`;

    let grid = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    grid.setAttribute('x', `${-graph.svgWidth / 2}`);
    grid.setAttribute('y', `${-graph.svgHeight / 2}`);
    grid.setAttribute('width', `100%`);
    grid.setAttribute('height', `100%`);
    if (graph.config.grid === 'true') {
      grid.setAttribute('fill', `url(#grid)`);
    }
    if (graph.config.graphBox === 'true') {
      grid.setAttribute('stroke', `white`);
    }
    //graph.coordinate.appendChild(frame);
    graph.coordinate.appendChild(grid);

    //axes
    //console.log(graph.config.axisX);
    // console.log(graph.config.tickX);
    if (graph.config.xAxis === 'true') {
      let xAxis = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      xAxis.setAttribute('x1', `${-graph.svgWidth / 2}`);
      xAxis.setAttribute(
        'y1',
        `${-graph.config.originY * graph.config.scaleY}`
      );
      xAxis.setAttribute('x2', `${graph.svgWidth / 2}`);
      xAxis.setAttribute(
        'y2',
        `${-graph.config.originY * graph.config.scaleY}`
      );
      xAxis.setAttribute('marker-start', 'url(#marker-arrow)');
      xAxis.setAttribute('marker-end', 'url(#marker-arrow)');
      xAxis.setAttribute('stroke', `${graph.config.axisColor}`);
      xAxis.setAttribute('fill', `none`);
      graph.coordinate.appendChild(xAxis);

      if (graph.config.tickX === 'true') {
        let tick;
        //x axis
        //+ve axis
        for (
          let i = 0;
          i <
          abs(
            int(
              graph.svgWidth / (2 * graph.config.scaleX) - graph.config.originX
            )
          ) /
            graph.config.stepX;
          i++
        ) {
          let x =
            graph.config.originX * graph.config.scaleX +
            (i + 1) * graph.config.stepX * graph.config.scaleX;
          tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tick.setAttribute('x', `${x}`);
          tick.setAttribute(
            'y',
            `${
              -graph.config.originY * graph.config.scaleY -
              graph.config.tickMarginX * graph.config.scaleY
            }`
          );
          tick.innerHTML = (i + 1).toString();
          tick.style.textAnchor = 'middle';
          tick.style.alignmentBaseline = 'middle';
          tick.style.strokeOpacity = '.2';
          tick.style.fill = `${graph.config.tickColor}`;
          graph.coordinate.appendChild(tick);
        }

        //console.log(int(graph.svgWidth / (2*graph.config.scaleX)) + graph.config.originX);

        //-ve axis
        for (
          let i = abs(
            int(graph.svgWidth / (2 * graph.config.scaleX)) +
              graph.config.originX
          );
          i >= 0;
          i--
        ) {
          let x =
            graph.config.originX * graph.config.scaleX -
            (i + 1) * graph.config.stepX * graph.config.scaleX;
          tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tick.setAttribute('x', `${x}`);
          tick.setAttribute(
            'y',
            `${
              -graph.config.originY * graph.config.scaleY -
              graph.config.tickMarginX * graph.config.scaleY
            }`
          );
          tick.innerHTML = -(i + 1).toString();
          tick.style.textAnchor = 'middle';
          tick.style.alignmentBaseline = 'middle';
          tick.style.strokeOpacity = '.2';
          tick.style.fill = `${graph.config.tickColor}`;
          graph.coordinate.appendChild(tick);
        }
      }
    }

    if (graph.config.yAxis === 'true') {
      let yAxis = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      yAxis.setAttribute('x1', `${graph.config.originX * graph.config.scaleX}`);
      yAxis.setAttribute('y1', `${-graph.svgHeight / 2}`);
      yAxis.setAttribute('x2', `${graph.config.originX * graph.config.scaleX}`);
      yAxis.setAttribute('y2', `${graph.svgHeight / 2}`);
      yAxis.setAttribute('marker-start', 'url(#marker-arrow)');
      yAxis.setAttribute('marker-end', 'url(#marker-arrow)');
      yAxis.setAttribute('stroke', `${graph.config.axisColor}`);
      yAxis.setAttribute('fill', `none`);
      graph.coordinate.appendChild(yAxis);
      if (graph.config.tickY === 'true') {
        let tick;
        //y axis
        //+ve axis
        for (
          let i = 0;
          i <=
          abs(
            -int(graph.svgHeight / (2 * graph.config.scaleY)) +
              graph.config.originY
          );
          i++
        ) {
          let y =
            -graph.config.originY * graph.config.scaleY -
            (i + 1) * graph.config.stepY * graph.config.scaleY;
          tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tick.setAttribute(
            'x',
            `${
              graph.config.originX * graph.config.scaleX +
              graph.config.tickMarginY * graph.config.scaleX
            }`
          );
          tick.setAttribute('y', `${y}`);
          tick.innerHTML = (i + 1).toString();
          tick.style.textAnchor = 'middle';
          tick.style.alignmentBaseline = 'middle';
          tick.style.strokeOpacity = '.2';
          tick.style.fill = `${graph.config.tickColor}`;
          graph.coordinate.appendChild(tick);
        }
        //-ve axis
        for (
          let i = abs(
            -int(graph.svgHeight / (2 * graph.config.scaleY)) -
              graph.config.originY
          );
          i >= 0;
          i--
        ) {
          let y =
            -graph.config.originY * graph.config.scaleY +
            (i + 1) * graph.config.stepY * graph.config.scaleY;
          tick = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tick.setAttribute(
            'x',
            `${
              graph.config.originX * graph.config.scaleX +
              graph.config.tickMarginY * graph.config.scaleX
            }`
          );
          tick.setAttribute('y', `${y}`);
          tick.innerHTML = -(i + 1).toString();
          tick.style.textAnchor = 'middle';
          tick.style.alignmentBaseline = 'middle';
          tick.style.strokeOpacity = '.2';
          tick.style.fill = `${graph.config.tickColor}`;
          graph.coordinate.appendChild(tick);
        }
      }
    }

    //xAxis.setAttribute('stroke', color);
    //xAxis.setAttribute('stroke-width', w);

    //ticks

    //graph.plotting.appendChild(graph.linePath);
    graph.graphObject.appendChild(graph.coordinate); // <g id="coordinateSystem">
  }
}
