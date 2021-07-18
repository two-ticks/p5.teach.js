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
    svgHeight: number = 300,
    config?
  ) {
    super(x, y, svgWidth, svgHeight);

    this.config = {
      graphColor: 'blue',
      arrowSize: 3,
      xAxis: 'true',
      yAxis: 'true',
      minX: -5,
      maxX: 5.5,
      minY: -5,
      maxY: 5,
      scaleX: 1.2,
      scaleY: 1,
      axisColor: 'white',
      smallGridColor: 'white',
      gridColor: 'white',
      stepX: 1,
      stepY: 1,
      originX: 0,
      originY: 0,
      tickX: 'true',
      tickY: 'true',
      tickColor: 'white',
      tickMarginX: -0.5,
      tickMarginY: -0.5
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
        : this.config.tickMarginY
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

  update(eqn: any) {
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

export function createSVGPath(eqn: any, config) {
  const pathElements = 1000;
  // const scaleX = 9;
  // const scaleY = 0.5;
  // scaleX = width/(maxX - minX);
  const stepSize = (config.maxX - config.minX) / pathElements;

  //minX = 0;
  let SVG_path = `M${
    config.scaleX * config.minX + config.originX * config.scaleX
  },${
    config.scaleY * -eqn(config.minX + config.originX * config.scaleX) -
    config.originY * config.scaleY
  }`;
  for (let x = config.minX; x < config.maxX; x += stepSize) {
    // SVG_path = SVG_path.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    SVG_path = SVG_path.concat(
      ` L${config.scaleX * x + config.originX * config.scaleX}, ${
        config.scaleY * -eqn(x) - config.originY * config.scaleY
      }`
    );
  }
  return SVG_path;
}

export function create2DGraph(
  eqn: any,
  x: number = 10,
  y: number = 10,
  svgWidth: number = 300,
  svgHeight: number = 300,
  config
) {
  //const _object =
  return new Graph2D(eqn, x, y, svgWidth, svgHeight, config);
}
