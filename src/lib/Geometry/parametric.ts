import anime from 'animejs';
import { animationTimeline } from '../Scene/controls';
import { sceneContainer, sceneVariables } from '../Scene/scene';
import { transform } from '../Scene/transform';
import { GObject } from './GObject';

const ULTRAMARINE40 = '#648fff';
const MAGENTA50 = '#dc267f';
const GOLD20 = '#ffb000';
const INDIGO50 = '#785ef0';
const ORANGE40 = '#fe6100';

export class GraphParametric2D extends GObject {
  xeqn: Function;
  yeqn: Function;
  plotting!: SVGGElement;
  coordinate!: SVGGElement;
  parameterRange: number[];
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
    xeqn: any,
    yeqn: any,
    parameterRange: number[] = [0, 2 * Math.PI],
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
    this.xeqn = xeqn;
    this.yeqn = yeqn;
    this.parameterRange = parameterRange;
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
    this.pathData = createParametricSVGPath(
      this.xeqn,
      this.yeqn,
      this.parameterRange,
      this.config
    );

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

  remove() {
    this.graphContainer.elt.removeChild(this.graphObject);
  }

  //TODO : only update linePath to increase performance
  update(xeqn: any, yeqn: any) {
    const plot = this.graphObject.getElementById('plot');

    this.xeqn = xeqn;
    this.yeqn = yeqn;
    this.pathData = createParametricSVGPath(
      this.xeqn,
      this.yeqn,
      this.parameterRange,
      this.config
    );
    plot.getElementsByTagName('path')[0].setAttribute('d', this.pathData);

    //this.plotting = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    //this.plotting.setAttribute('id', 'plot');
    //console.log(this.plotting);

    //this.linePath.setAttribute('stroke', `${this.config.graphColor}`);
    // this.linePath.setAttribute(
    //   'stroke-width',
    //   `${this.config.graphStrokeWidth}`
    // );
    //this.plotting.appendChild(this.linePath); // <g id="plot">
    //this.graphObject.appendChild(this.plotting);
  }

  transform(object_finl: any, startTime: number = 0, endTime: number = 2) {
    transform(this, object_finl, startTime, endTime);
  }

  axis() {
    // coordinate system

    if (this.coordinate) {
      this.coordinate.remove();
    }
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
    this.coordinate.appendChild(defs);
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
    grid.setAttribute('fill', `url(#grid)`);
    grid.setAttribute('stroke', `white`);
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

  play(timeDuration, delayDuration = 0, element = 'coordinateSystem') {
    const elementToAnimate = this.graphContainer.elt.querySelectorAll(
      `${element}`
    );
    let pathElement: Array<string> = [];
    let it = elementToAnimate;
    //console.log(it);

    it.forEach((currentElement) => {
      //console.log(currentElement);
      pathElement.push(
        currentElement.querySelectorAll('path, line, rect, circle, marker')
      );
    });
    //console.log(pathElement);

    animationTimeline.add(
      {
        targets: pathElement,
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        // fill : ['currentColor'],
        easing: 'easeInOutCubic',
        duration: timeDuration,
        autoplay: true
      },
      delayDuration
    );
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
  config
) {
  const pathElements = 1000;
  const stepSize = (parameterRange[1] - parameterRange[0]) / pathElements;

  //let minX = parameterRange[0];
  // let scaleX = 100;
  // let scaleY = 100;
  let svgPath = `M${
    config.scaleX * xeqn(parameterRange[0]) + config.originX * config.scaleX
  },${
    -config.scaleY * yeqn(parameterRange[0]) - config.originY * config.scaleY
  }`;
  for (let p = parameterRange[0]; p <= parameterRange[1]; p += stepSize) {
    // svgPath = svgPath.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    svgPath = svgPath.concat(
      ` L${config.scaleX * xeqn(p) + config.originX * config.scaleX},${
        -config.scaleY * yeqn(p) - config.originY * config.scaleY
      }`
    );
  }
  return svgPath;
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
  return new GraphParametric2D(
    xeqn,
    yeqn,
    parameterRange,
    x,
    y,
    svgWidth,
    svgHeight
  );
}

export function parametric2D(xeqn, yeqn, parameterRange : number[] = [0, 2 * Math.PI]) {
  // sceneVariables.graph.xeqn = xeqn;
  // sceneVariables.graph.yeqn = yeqn;
  // sceneVariables.graph.parameterRange = parameterRange;
  if (sceneVariables.isGraph === 'true') {
    let linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    linePath.setAttribute('fill', 'none');
    linePath.setAttribute('stroke', `${sceneVariables.currStrokeColor.toString()}`);
    linePath.setAttribute('stroke-width', `${sceneVariables.currStrokeWidth}`);
    let pathData = createParametricSVGPath(
      xeqn,
      yeqn,
      parameterRange,
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
    linePath.setAttribute(
      'd',
      pathData
    );

    plotting.appendChild(linePath); // <g id="plot">

    sceneVariables.graph.graphObject.appendChild(plotting);

    // attaching to graphContainer
    sceneVariables.graph.graphContainer.elt.appendChild(
      sceneVariables.graph.graphObject
    );
  }
}
