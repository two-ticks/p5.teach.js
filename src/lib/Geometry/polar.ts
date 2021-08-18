import anime from 'animejs';
import { animationTimeline } from '../Scene/controls';
import { sceneContainer, sceneVariables } from '../Scene/scene';
import { transform } from '../Scene/transform';
import { GObject } from './GObject';

// color blind safe palette
const ULTRAMARINE40 = '#648fff';
const MAGENTA50 = '#dc267f';
const GOLD20 = '#ffb000';
const INDIGO50 = '#785ef0';
const ORANGE40 = '#fe6100';

export class GraphPolar2D extends GObject {
  eqn: Function;
  plotting!: SVGGElement;
  coordinate!: SVGGElement;
  thetaRange: number[];
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
  // width_svg: number;
  // height_svg: number;
  // linePath: SVGPathElement;

  constructor(
    eqn: Function,
    thetaRange: number[] = [0, 2 * Math.PI],
    x: number = 10,
    y: number = 10,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
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

    this.eqn = eqn;
    this.thetaRange = thetaRange;

    this.config.scaleX = abs(
      this.svgWidth / (this.config.maxX - this.config.minX)
    );
    this.config.scaleY = abs(
      this.svgHeight / (this.config.maxY - this.config.minY)
    );

    // this.x = x;
    // this.y = y;
    // this.width_svg = width_svg;
    // this.height_svg = height_svg;

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
  }

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
      tickX: config.tickX ? config.tickX : this.config.tickX,
      tickY: config.tickY ? config.tickY : this.config.tickY,
      tickColor: config.tickColor ? config.tickColor : this.config.tickColor,
      tickMarginX: config.tickMarginX
        ? config.tickMarginX
        : this.config.tickMarginX,
      tickMarginY: config.tickMarginY
        ? config.tickMarginY
        : this.config.tickMarginY,
      arrowFollowerColor: config.arrowFollowerColor
        ? config.arrowFollowerColor
        : this.config.arrowFollowerColor
    };
    //console.log(this.config);
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

  stroke(_stroke: any) {
    this.config.graphColor = _stroke;
    this.linePath.setAttribute('stroke', `${_stroke}`);
  }

  plot() {
    this.pathData = createPolarSVGPath(this.eqn, this.thetaRange, this.config);
    //this.graphObject.setAttribute('style', `translate(-50%, -50%)`);
    this.graphObject.setAttribute('width', `${this.svgWidth}`);
    this.graphObject.setAttribute('height', `${this.svgHeight}`);
    this.linePath.setAttribute('stroke', `${this.config.graphColor}`);
    //this.graphObject.setAttribute('viewBox', '-8500 -2000 18000 4000');
    //this.graphObject.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    this.linePath.setAttribute('d', this.pathData);
    this.graphObject.appendChild(this.linePath);
    this.graphContainer.elt.appendChild(this.graphObject);
  }

  remove() {
    this.graphContainer.elt.removeChild(this.graphObject);
  }

  update(eqn: any, thetaRange?) {
    if (!(thetaRange.length === 0)) {
      this.thetaRange = thetaRange;
    }
    this.eqn = eqn;
    this.pathData = createPolarSVGPath(eqn, this.thetaRange, this.config);
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

    this.coordinate.style.transform += `scaleX(${1})`;
    this.coordinate.style.transform += `scaleY(${1})`;

    this.graphObject.appendChild(defs);
    // this.graphObject.appendChild(arrowPath);

    // let frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // frame.setAttribute('x', `${-this.svgWidth / 2}`);
    // frame.setAttribute('y', `${-this.svgHeight / 2}`);
    // frame.setAttribute('width', `${this.svgWidth}`);
    // frame.setAttribute('height', `${this.svgHeight}`);
    // frame.setAttribute('fill', `rgba(0,0,0,0)`);
    // frame.setAttribute('stroke', `white`);

    //polar grid
    let grid = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    grid.setAttribute('x', `${-this.svgWidth / 2}`);
    grid.setAttribute('y', `${-this.svgHeight / 2}`);
    grid.setAttribute('width', `100%`);
    grid.setAttribute('height', `100%`);
    //grid.setAttribute('fill', `url(#grid)`);
    grid.setAttribute('stroke', `white`);
    //this.coordinate.appendChild(frame);
    this.coordinate.appendChild(grid);

    const radialLineMax = Math.max(
      dist(
        this.config.originX * this.config.scaleX,
        this.config.originY * this.config.scaleY,
        this.svgWidth / 2,
        this.svgHeight / 2
      ),
      dist(
        this.config.originX * this.config.scaleX,
        this.config.originY * this.config.scaleY,
        -this.svgWidth / 2,
        -this.svgHeight / 2
      ),
      dist(
        this.config.originX * this.config.scaleX,
        this.config.originY * this.config.scaleY,
        this.svgWidth / 2,
        -this.svgHeight / 2
      ),
      dist(
        this.config.originX * this.config.scaleX,
        this.config.originY * this.config.scaleY,
        -this.svgWidth / 2,
        this.svgHeight / 2
      )
    );

    //console.log(radialLineMax);

    let polarGrid: SVGCircleElement;
    //Math.max(this.config.originX,this.svgWidth-this.originX)
    let dr =
      Math.max(this.config.scaleX, this.config.scaleY) *
      Math.floor(
        radialLineMax / (5 * Math.max(this.config.scaleX, this.config.scaleY))
      );
    for (let i = 0; i <= radialLineMax; i += dr) {
      polarGrid = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      polarGrid.setAttribute(
        'cx',
        `${this.config.originX * this.config.scaleX}`
      );
      polarGrid.setAttribute(
        'cy',
        `${-this.config.originY * this.config.scaleY}`
      );
      polarGrid.setAttribute('r', `${i}`);

      polarGrid.setAttribute('fill', `none`);
      polarGrid.setAttribute('stroke', `${this.config.gridColor}`);
      polarGrid.setAttribute('stroke-opacity', `0.5`);
      this.coordinate.appendChild(polarGrid);
    }

    let smallPolarGrid: SVGCircleElement;
    dr =
      (Math.max(this.config.scaleX, this.config.scaleY) *
        Math.floor(
          radialLineMax / (5 * Math.max(this.config.scaleX, this.config.scaleY))
        )) /
      5;
    for (let i = 0; i <= radialLineMax; i += dr) {
      smallPolarGrid = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      smallPolarGrid.setAttribute(
        'cx',
        `${this.config.originX * this.config.scaleX}`
      );
      smallPolarGrid.setAttribute(
        'cy',
        `${-this.config.originY * this.config.scaleY}`
      );
      smallPolarGrid.setAttribute('r', `${i}`);

      smallPolarGrid.setAttribute('fill', `none`);
      smallPolarGrid.setAttribute('stroke', `${this.config.smallGridColor}`);
      smallPolarGrid.setAttribute('stroke-opacity', `0.25`);
      this.coordinate.appendChild(smallPolarGrid);
    }

    let radialLine;

    for (let i = 1; i <= 12; i += 1) {
      radialLine = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      radialLine.setAttribute(
        'x1',
        `${
          radialLineMax * Math.cos((i * PI) / 12) +
          this.config.originX * this.config.scaleX
        }`
      );
      radialLine.setAttribute(
        'y1',
        `${
          radialLineMax * Math.sin((i * PI) / 12) -
          this.config.originY * this.config.scaleY
        }`
      );
      radialLine.setAttribute(
        'x2',
        `${
          -radialLineMax * Math.cos((i * PI) / 12) +
          this.config.originX * this.config.scaleX
        }`
      );
      radialLine.setAttribute(
        'y2',
        `${
          -radialLineMax * Math.sin((i * PI) / 12) -
          this.config.originY * this.config.scaleY
        }`
      );

      radialLine.setAttribute('fill', `none`);
      radialLine.setAttribute('stroke', `${this.config.gridColor}`);
      radialLine.setAttribute('stroke-opacity', `0.25`);
      this.coordinate.appendChild(radialLine);
    }

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
        let veEnd =
          abs(
            int(this.svgWidth / (2 * this.config.scaleX) - this.config.originX)
          ) / this.config.stepX;
        for (let i = 0; i < veEnd; i += 1) {
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
        veEnd = abs(
          int(this.svgWidth / (2 * this.config.scaleX)) + this.config.originX
        );
        for (let i = veEnd; i >= 0; i -= 1) {
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
        let veEnd = abs(
          -int(this.svgHeight / (2 * this.config.scaleY)) + this.config.originY
        );
        for (let i = 0; i <= veEnd; i += 1) {
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
        veEnd = abs(
          -int(this.svgHeight / (2 * this.config.scaleY)) - this.config.originY
        );
        for (let i = veEnd; i >= 0; i -= 1) {
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

  //TODO : arrow follower
  arrow(timeDuration) {
    let eqn = this.eqn;
    let config = this.config;
    // const scaleX = this.config.scaleX;
    // const scaleY = this.config.scaleY;
    // if(this.graphObject.elt.arrowPath){

    // }
    if (this.graphObject.getElementById('arrow')) {
      this.graphObject.removeChild(this.graphObject.getElementById('arrow'));
    }

    let arrowPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    arrowPath.setAttribute('id', 'arrow');
    arrowPath.setAttribute('fill', 'none');
    arrowPath.setAttribute('stroke', `${this.config.arrowFollowerColor}`);
    arrowPath.setAttribute('stroke-width', '1');
    // let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    // defs.innerHTML =
    //   '<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="7.5" refY="3.5" orient="auto">  <polygon points="0 0, 10 3.5, 0 7" /></marker>';
    // this.graphObject.appendChild(defs);
    this.graphObject.appendChild(arrowPath);
    let update = 0;
    //this.graphObject.appendChild(arrowPath);
    animationTimeline.add({
      targets: arrowPath,
      //strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeOutSine',
      duration: timeDuration,
      // begin: function (anim) {
      //   //pathElement[0].setAttribute('stroke', 'black');
      //   //pathElement[0].setAttribute('fill', 'none');
      // },
      // complete: function (anim) {
      //   //document.querySelector('path').setAttribute("fill", "yellow");
      // },
      update: function (anim) {
        update += 0.01;

        //let scaleX = 100;
        //let scaleY = 100;
        arrowPath.setAttribute('x1', `${config.originX * config.scaleX}`);

        arrowPath.setAttribute(
          'x2',
          `${
            config.scaleX * eqn(update) * Math.cos(update) +
            config.originX * config.scaleX
          }`
        );
        arrowPath.setAttribute('y1', `${-config.originY * config.scaleY}`);
        arrowPath.setAttribute(
          'y2',
          `${
            -config.scaleY * eqn(update) * Math.sin(update) -
            config.originY * config.scaleY
          }`
        );
        arrowPath.setAttribute('marker-end', 'url(#marker-arrow)');
        //document.querySelector('path').setAttribute("fill", "yellow");
      },
      autoplay: true
    });
  }
}

export function createPolarSVGPath(
  eqn: any,
  thetaRange: number[] = [0, 2 * Math.PI],
  config
  //stepSize: number = 0.001
) {
  const pathElements = 1000;
  const stepSize = (thetaRange[1] - thetaRange[0]) / pathElements;

  //let minX = 0;
  //let scaleX = 100;
  //let scaleY = 100;
  //console.log(config.scaleX);

  let svgPath = `M${
    config.scaleX * eqn(thetaRange[0]) * Math.cos(0) +
    config.originX * config.scaleX
  },${
    -config.scaleY * eqn(thetaRange[0]) * Math.sin(0) -
    config.originY * config.scaleY
  }`;
  for (let theta = thetaRange[0]; theta <= thetaRange[1]; theta += stepSize) {
    // SVG_path = SVG_path.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    svgPath = svgPath.concat(
      ` L${
        config.scaleX * eqn(theta) * Math.cos(theta) +
        config.originX * config.scaleX
      },${
        -config.scaleY * eqn(theta) * Math.sin(theta) -
        config.originY * config.scaleY
      }`
    );
  }
  return svgPath;
}

export function create2DPolarGraph(
  eqn: Function,
  thetaRange: number[] = [0, 2 * Math.PI],
  x: number = 10,
  y: number = 10,
  svgWidth: number = 300,
  svgHeight: number = 300
) {
  return new GraphPolar2D(eqn, thetaRange, x, y, svgWidth, svgHeight);
}

export function polar2D(eqn, thetaRange: number[] = [0, 2 * Math.PI]) {
  // sceneVariables.graph.xeqn = xeqn;
  // sceneVariables.graph.yeqn = yeqn;
  // sceneVariables.graph.parameterRange = parameterRange;
  if (sceneVariables.isGraph === 'true') {
    let linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    linePath.setAttribute('fill', 'none');
    linePath.setAttribute(
      'stroke',
      `${sceneVariables.currStrokeColor.toString()}`
    );
    linePath.setAttribute('stroke-width', `${sceneVariables.currStrokeWidth}`);
    let pathData = createPolarSVGPath(
      eqn,
      thetaRange,
      sceneVariables.graph.config
    );

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
  }
}
