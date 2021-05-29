import { TeX } from './TeX';
import { Text } from './Text';
import anime from 'animejs';

export function play(
  _object: any,
  animation_type: string = 'write',
  timeDuration: number
) {
  if (timeDuration == null) {
    timeDuration = 50 * _object.sentence.length;
  }
  if (_object instanceof TeX) {
    //tex animations
    console.log('TeX');
    if (animation_type == 'write') {
      //write(_object, timeDuration);
      _object.writeTexElement = createDiv(_object.SVGEquation);
      let svg = _object.writeTexElement.elt.querySelectorAll('svg');
      svg[0].setAttribute('width', `${_object.width_svg}px`);
      svg[0].setAttribute('height', `${_object.height_svg}px`);
      const g = _object.writeTexElement.elt.querySelectorAll('g');
      // g[0].setAttribute('fill', 'none');
      // g[0].setAttribute('stroke-width', '10px');
      _object.writeTexElement.position(_object.x, _object.y);

      //const pathEls = _object.writeTexElement.elt.querySelectorAll('path'); //nodelist

      anime.timeline({ loop: false }).add({
        targets: _object.writeTexElement.elt.querySelectorAll('path'),
        //scale: [4, 1],
        fill: ['rgba(0,0,0,0)', '#000000'], //TODO : fill is black by default can be customised through config files
        //stroke : "black",     //customisable through config
        //stroke-width: "10px", //customisable through config
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
    } else if (animation_type == 'all-at-once') {
      //_object.all_at_once(timeDuration);
      _object.writeTexElement = createDiv(_object.SVGEquation);
    let svg = _object.writeTexElement.elt.querySelectorAll('svg');
    svg[0].setAttribute('width', `${_object.width_svg}px`);
    svg[0].setAttribute('height', `${_object.height_svg}px`);
    const g = _object.writeTexElement.elt.querySelectorAll('g');

    _object.writeTexElement.position(_object.x, _object.y);

    const pathEls = _object.writeTexElement.elt.querySelectorAll('path'); //nodelist

    for (var i = 0; i < pathEls.length; i++) {
      var pathEl = pathEls[i];
      var offset: any = anime.setDashoffset(pathEl);
      pathEl.setAttribute('stroke-dashoffset', offset);
      anime({
        targets: pathEl,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutCubic',
        //easing: 'easeOutExpo', //customisable through config
        duration: timeDuration,
        delay: anime.stagger(1000, { direction: 'normal' }), //customisable through config
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
  //Text animation
  else if (_object instanceof Text) {
    console.log('Text');
    _object.writeTextElement.style('opacity', '1');
    if (animation_type == 'write') {
      anime.timeline({ loop: false }).add({
        targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: 'easeOutExpo',
        duration: 950,
        delay: anime.stagger(180, { start: timeDuration })
      });
    } else if (animation_type == 'all-at-once') {
      console.log('all at once');
    }
  }
}
