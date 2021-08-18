import { sceneVariables } from "../Scene/scene";

export function arrow(...args) {
    if (
      typeof sceneVariables.isGraph === 'undefined' ||
      sceneVariables.isGraph === 'false'
    ) {
      //return this._line(...Array.from(arguments));
    } else if (sceneVariables.isGraph === 'true') {
      return new SVGArrow(...Array.from(arguments));
    }
  }
  
  class SVGArrow {
    svgLine: SVGLineElement;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    arrowConfig: {
      arrowHeadColor;
      arrowHeadHeight;
      arrowSize;
    };
    //arrowSize;
    arrow;
  
    defs: SVGDefsElement;
    constructor(...args: any[]) {
      this.arrowConfig = {
        arrowHeadColor: sceneVariables.currStrokeColor,
        arrowHeadHeight: float(sceneVariables.currStrokeWidth),
        arrowSize: float(sceneVariables.currStrokeWidth)
      };
      // this.arrowSize =
      // this.arrowHeadColor = ;
      this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      this.svgLine = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      this.x1 = arguments[0];
      this.y1 = arguments[1];
      this.x2 = arguments[2];
      this.y2 = arguments[3];
      const angle = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
      this.svgLine.setAttribute('x1', `${this.x1}`);
      this.svgLine.setAttribute('y1', `${-this.y1}`);
      this.svgLine.setAttribute(
        'x2',
        `${this.x2 - 1.5 * this.arrowConfig.arrowSize * Math.cos(angle)}`
      );
      this.svgLine.setAttribute(
        'y2',
        `${-(this.y2 - 6 * this.arrowConfig.arrowSize * Math.sin(angle))}`
      );
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
      this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      this.defs.innerHTML = `<marker refX="${0}" refY="${
        this.arrowConfig.arrowSize
      }" markerWidth="${2 * this.arrowConfig.arrowSize}" markerHeight="${
        2 * this.arrowConfig.arrowSize
      }" id="marker-arrow" class="marker" orient="auto-start-reverse"><path d="M 0 0 L ${
        2 * this.arrowConfig.arrowSize
      } ${this.arrowConfig.arrowSize} L 0 ${
        2 * this.arrowConfig.arrowSize
      } z" style="fill: ${this.arrowConfig.arrowHeadColor.toString()}"></path></marker>`;
      //this.svgLine.setAttribute('marker-start', 'url(#marker-arrow)');
      this.svgLine.setAttribute('marker-end', 'url(#marker-arrow)');
  
      this.arrow.appendChild(this.defs);
      this.arrow.appendChild(this.svgLine);
      sceneVariables.currentSVG.appendChild(this.arrow);
    }
  
    configure(arrowConfig) {
      this.arrowConfig = {
        arrowHeadColor: arrowConfig.arrowHeadColor
          ? arrowConfig.arrowHeadColor
          : this.arrowConfig.arrowHeadColor,
        arrowHeadHeight: arrowConfig.arrowHeadHeight
          ? arrowConfig.arrowHeadHeight
          : this.arrowConfig.arrowHeadHeight,
        arrowSize: arrowConfig.arrowSize
          ? arrowConfig.arrowSize
          : this.arrowConfig.arrowSize
      };
      this.defs.innerHTML = `<marker refX="${0}" refY="${
        this.arrowConfig.arrowSize
      }" markerWidth="${2 * this.arrowConfig.arrowSize}" markerHeight="${
        2 * this.arrowConfig.arrowSize
      }" id="marker-arrow" class="marker" orient="auto-start-reverse"><path d="M 0 0 L ${
        2 * this.arrowConfig.arrowSize
      } ${this.arrowConfig.arrowSize} L 0 ${
        2 * this.arrowConfig.arrowSize
      } z" style="fill: ${this.arrowConfig.arrowHeadColor.toString()}"></path></marker>`;
      //this.svgLine.setAttribute('marker-start', 'url(#marker-arrow)');
      this.svgLine.setAttribute('marker-end', 'url(#marker-arrow)');
    }
  
    remove() {
      sceneVariables.currentSVG.removeChild(this.arrow);
    }
  
    arrowHead(x, y) {
      this.x2 = x;
      this.y2 = y;
      const angle = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
  
      this.svgLine.setAttribute(
        'x2',
        `${this.x2 - 1.5 * this.arrowConfig.arrowSize * Math.cos(angle)}`
      );
      this.svgLine.setAttribute(
        'y2',
        `${-(this.y2 - 6 * this.arrowConfig.arrowSize * Math.sin(angle))}`
      );
    }
  
    arrowTail(x, y) {
      this.x1 = x;
      this.y1 = y;
      this.svgLine.setAttribute('x1', `${this.x1}`);
      this.svgLine.setAttribute('y1', `${-this.y1}`);
    }
  }