import anime from 'animejs';

//TODO : add methods to call different animations by 'animation-type' argument
export class writeText {
  writeTextElement: any;
  textWrapper: any;

  constructor(sentence: string, x: number, y: number) {
    this.writeTextElement = createElement(
      'h1',
      sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    );
    this.writeTextElement.position(x, y);
  }

  play(timeDuration: number = 180) {
    anime
      .timeline({ loop: false })
      .add({
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
