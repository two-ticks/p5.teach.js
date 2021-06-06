//TODO : insure Text is not reserved by any other dependecies
//TODO : position and size
//TODO : fix 'write' animation
//TODO : fix duration and delay
//TODO : clean stray after porting write and all-at-once animations
//TODO : fix size function

export class Text {
  writeTextElement: any;
  textWrapper: any;
  x: number;
  y: number;
  sentence: string;
  sizePx: number; //px

  constructor(
    sentence: string,
    x: number = 10,
    y: number = 10,
    sizePx: number = 28
  ) {
    this.x = x;
    this.y = y;
    this.sentence = sentence;
    this.sizePx = sizePx;

    // this.writeTextElement = createElement(
    //   'h1',
    //   sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    // );
    // this.writeTextElement.position(x, y);
    // this.writeTextElement.style('font-size', `${this.size}px`);
    // this.writeTextElement.style('opacity', '0'); //to hide text at initialisation
  }

  // play(animation_type: string = 'write', timeDuration: number = 180) {
  //   this.writeTextElement.style("opacity", '1');
  //   if (animation_type == 'write') {
  //     this.write(timeDuration);
  //   } else if (animation_type == 'all-at-once') {
  //     console.log('all at once');
  //   }
  // }

  // write(timeDuration: number) {

  // }
  position(x: number, y: number = 10) {
    this.x = x;
    this.y = y;
    //this.writeTextElement.position(this.x, this.y);
  }
  size(sizePx: number) {
    this.sizePx = sizePx;
  }
}

export function createText(
  sentence: string,
  x: number = 10,
  y: number = 10,
  sizePx: number = 28
) {
  const _object = new Text(sentence, x, y, sizePx);
  return _object;
}
