//TODO : insure Text is not reserved by any other dependecies
//TODO : position and size
//TODO : fix 'write' animation
//TODO : fix duration and delay
//TODO : clean stray after porting write and all-at-once animations

export class Text {
  writeTextElement: any;
  textWrapper: any;
  x: number = 10;
  y: number = 10;
  sentence: string;
  size: number = 28; //px

  constructor(sentence: string, x: number, y: number, size: number) {
    this.sentence = sentence;
    this.writeTextElement = createElement(
      'h1',
      sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    );
    this.writeTextElement.position(x, y);
    this.writeTextElement.style('font-size', `${this.size}px`);
    this.writeTextElement.style('opacity', '0'); //to hide text at initialisation
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
  shiftTo(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.writeTextElement.position(this.x, this.y);
  }
}
