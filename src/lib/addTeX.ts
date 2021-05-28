import anime from 'animejs';
import TeXToSVG from 'tex-to-svg';

//TODO : duration automation and clear
export class addTeX {
  writeTexElement: any;
  SVGEquation: any;
  timeDuration: number;
  x: number = 10;
  y: number = 10;
  width_svg: number;
  height_svg: number;
  sentence: string;
  constructor(
    sentence: string,
    timeDuration: number,
    x: number = 10,
    y: number = 10,
    width_svg: number = 300,
    height_svg: number = 300
  ) {
    this.timeDuration = timeDuration;
    this.x = x;
    this.y = y;
    this.sentence = sentence;
    this.width_svg = width_svg;
    this.height_svg = height_svg;
    this.SVGEquation = TeXToSVG(sentence);
  }

  play(animation_type : string = 'write', timeDuration: number) {
    if (timeDuration == null){
      timeDuration = 50*this.sentence.length;
    }
    if(animation_type == 'write')
    {
      this.write(timeDuration);
    }
    else if (animation_type == 'all-at-once')
    {
      this.all_at_once(timeDuration);
      
    }
    
  }

  all_at_once(timeDuration: number) {

    this.writeTexElement = createDiv(this.SVGEquation);
    let svg = this.writeTexElement.elt.querySelectorAll('svg');
    svg[0].setAttribute('width', `${this.width_svg}px`);
    svg[0].setAttribute('height', `${this.height_svg}px`);
    const g = this.writeTexElement.elt.querySelectorAll('g');

    this.writeTexElement.position(this.x, this.y);

    const pathEls = this.writeTexElement.elt.querySelectorAll('path'); //nodelist

    for (var i = 0; i < pathEls.length; i++) {
      var pathEl = pathEls[i];
      var offset: any = anime.setDashoffset(pathEl);
      pathEl.setAttribute('stroke-dashoffset', offset);
      anime({
        targets: pathEl,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutCubic',
        //easing: 'easeOutExpo',
        duration: this.timeDuration,
        //delay: i * 1000,
        delay: anime.stagger(1000, { direction: 'normal' }),
        begin: function (anim) {
          pathEl.setAttribute('stroke', 'black');
          pathEl.setAttribute('fill', 'none');
          g[0].setAttribute('fill', 'none');
          g[0].setAttribute('stroke-width', '10px');
        },
        complete: function (anim) {
          pathEl.setAttribute('fill', 'black');
          g[0].setAttribute('fill', 'black');
        },
        autoplay: true
      });
    }  
  }

  write(timeDuration: number){
    this.writeTexElement = createDiv(this.SVGEquation);
    let svg = this.writeTexElement.elt.querySelectorAll('svg');
    svg[0].setAttribute('width', `${this.width_svg}px`);
    svg[0].setAttribute('height', `${this.height_svg}px`);
    const g = this.writeTexElement.elt.querySelectorAll('g');
    // g[0].setAttribute('fill', 'none');
    // g[0].setAttribute('stroke-width', '10px');
    this.writeTexElement.position(this.x, this.y);

    //const pathEls = this.writeTexElement.elt.querySelectorAll('path'); //nodelist

    anime.timeline({ loop: false }).add({
      targets: this.writeTexElement.elt.querySelectorAll('path'),
      //scale: [4, 1],
      fill: ['rgba(0,0,0,0)', '#000000'], 
      //stroke : "black",
      //stroke-width: "10px",
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      begin: function (anim) {
              g[0].setAttribute('fill', 'none');
              g[0].setAttribute('stroke-width', '10px');
      },
      complete: function (anim) {
                 g[0].setAttribute('fill', 'black');

            },
      easing: 'easeInOutCubic',
      duration: timeDuration,
      delay: anime.stagger(400, { start: 0 })
    });
  }

}
