import p5 from 'p5';
import { animationTimeline } from '../Scene/controls';

export class GObject {
  pathData!: string;
  graphObject!: SVGSVGElement;
  graphContainer!: p5.Element;
  linePath!: SVGPathElement;
  x: number;
  y: number;
  svgWidth: number;
  svgHeight: number;

  constructor(
    x: number = 10,
    y: number = 10,
    svgWidth: number = 300,
    svgHeight: number = 300
  ) {
    this.x = x;
    this.y = y;
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
  }

  moveTo(newX, newY, startTime, endTime) {
    const object = this.graphContainer;
    const timeDuration = (endTime - startTime) * 1000;
    const delayDuration = startTime * 1000;
    const currCoord = {
      currX: this.x,
      currY: this.y
    };
    animationTimeline.add(
      {
        targets: currCoord, //[this.x, this.y],
        currX: newX,
        currY: newY,

        //translateZ: 0,
        easing: 'easeInOutCubic',
        duration: timeDuration,
        update: function (anim) {
          this.x = currCoord.currX;
          this.y = currCoord.currY;
          object.position(this.x, this.y);
        }
        //delay: anime.stagger(CONFIG.PLAY.DISSOLVE_STAGGERING_DELAY)
        //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
      },
      delayDuration
    );
  }
}
