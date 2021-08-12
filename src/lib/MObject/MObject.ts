import { animationTimeline } from '../Scene/controls';

export class MObject {
  writeElement!: p5.Element; // <div> for animation
  sentence: string; //input string as tex or text
  x: number = 10;
  y: number = 10;
  fillColor: p5.Color;
  _size: number; //px -> font size
  constructor(sentence: string, x: number, y: number, _size: number) {
    this.sentence = sentence;
    this.x = x;
    this.y = y;
    this.fillColor = color('black');
    this._size = _size;
  }

  moveTo(newX, newY, startTime, endTime) {
    const object = this.writeElement;
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
