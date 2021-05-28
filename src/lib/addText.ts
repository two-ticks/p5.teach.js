import anime from 'animejs';

//TODO : position and size
//TODO : fix 'write' animation
//TODO : fix duration and delay

export class addText {
  writeTextElement: any;
  textWrapper: any;

  constructor(sentence: string, x: number, y: number) {
    this.writeTextElement = createElement(
      'h1',
      sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    );
    this.writeTextElement.position(x, y);
  }

  play(animation_type: string = 'write', timeDuration: number = 180) {
    if (animation_type == 'write') {
      this.write(timeDuration);
    } else if (animation_type == 'all-at-once') {
      console.log('all at once');
    }
  }

  write(timeDuration: number) {
    anime.timeline({ loop: false }).add({
      targets: this.writeTextElement.elt.querySelectorAll('.letter'),
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: 950,
      delay: anime.stagger(180, { start: timeDuration })
    });
  }
}
