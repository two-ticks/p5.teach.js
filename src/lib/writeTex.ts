import anime from 'animejs';
import TeXToSVG from 'tex-to-svg';

//TODO : duration automation and clear 
export class writeTex {
  writeTexElement: any;
  SVGEquation: any;
  constructor(
    sentence: string,
    timeDuration :number,
    x: number = 10,
    y: number = 10,
    width_svg: number = 300,
    height_svg: number = 300
  ) {
    this.SVGEquation = TeXToSVG(sentence);
    this.writeTexElement = createDiv(this.SVGEquation);
    let svg = document.querySelectorAll('svg');
    svg[0].setAttribute('width', `${width_svg}px`);
    svg[0].setAttribute('height', `${height_svg}px`);

    const g = this.writeTexElement.elt.querySelectorAll('g');
    
    

    this.writeTexElement.position(x, y);

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
        duration: timeDuration,
        //delay: i * 1000,
        delay : anime.stagger(500),
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
}
