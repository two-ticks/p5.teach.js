import { Text } from '../MObject/Text';
import { TeX } from '../MObject/TeX';
import anime from 'animejs';
import { add } from './add';
import * as CONFIG from '../config.js';

//TODO : fix relative time
//TODO : text animation for all-at-once

/**
 * Animation functions
 *
 * @param    {Object} - object of TeX or Text class
 * @param    {String} - animation type
 * @param    {number} - time duration
 *
 * @example
 * example for playing animation of type 'appear' for TeX object:
 * ```js
 * play(tex_1, 'appear', 2000);
 * ```
 * @experimental
 */

let animationTimeline = anime.timeline(); //initilising a timeline

export function play(
  //any, //TODO: use '...args'
  object: any,
  animationType: string = 'write',
  startTime: number = 0, //seconds // start time
  endTime: number = 0 //seconds // end time
) {
  if (!(typeof startTime == 'number' || typeof endTime == 'number')) {
    //size
    throw new Error('startTime and endTime must be passed as number');
  } else if (endTime - startTime < 0) {
    throw new Error('startTime must be less than endTime');
  }
  const timeDuration = (endTime - startTime) * 1000;
  const delayDuration = startTime * 1000;
  // object = object;
  // animationType = animationType;
  // timeDuration = timeDuration; //seconds
  // delayDuration = delayDuration; //seconds
  //testing for relative and absolute parameters //TODO : fix relative time

  //TODO : fix this after testing end and start parameters
  // if (typeof delayDuration === 'number') {
  //   delayDuration = 1000 * delayDuration; //sec to ms
  //   //console.log(delayDuration);
  // } else if (typeof delayDuration === 'string') {
  //   if (delayDuration.charAt(0) === '+') {
  //     delayDuration = 1000 * Number(delayDuration);
  //     delayDuration = `+=${delayDuration}`;
  //     console.log(delayDuration);
  //   } else if (delayDuration.charAt(0) === '-') {
  //     delayDuration = 1000 * Number(delayDuration);
  //     delayDuration = `-=${-delayDuration}`;
  //     console.log(delayDuration);
  //   }
  // }

  // timeDuration = 1000 * timeDuration; //sec to ms

  // if (timeDuration == 0) {
  //   timeDuration = CONFIG.PLAY.TIME_LENGHT_CHARACTER * object._text.length; //for text
  // }

  if (object instanceof TeX) {
    //adding element before animation
    if (!object.writeTexElement) {
      add(object);
    }
    //tex animations
    console.log('TeX');
    if (animationType === 'write') {
      //write(object, timeDuration);
      // object.writeTexElement = createDiv(object.SVGEquation);
      // let svg = object.writeTexElement.elt.querySelectorAll('svg');
      // svg[0].setAttribute('width', `${object.width_svg}px`);
      // svg[0].setAttribute('height', `${object.height_svg}px`);
      // const g = object.writeTexElement.elt.querySelectorAll('g');
      // // g[0].setAttribute('fill', 'none');
      // // g[0].setAttribute('stroke-width', '10px');
      // object.writeTexElement.position(object.x, object.y);
      //const pathEls = object.writeTexElement.elt.querySelectorAll('path'); //nodelist
      const g = object.writeTexElement.elt.querySelectorAll('g');
      anime.timeline({ loop: false }).add({
        targets: object.writeTexElement.elt.querySelectorAll('path'),
        //scale: [4, 1],
        fill: [color(object.fillColor).toString(), object.fillColor], //TODO : fill is black by default can be customised through config files
        //stroke : "black",     //customisable through config
        //stroke-width: "10px", //customisable through config
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        begin: function (anim) {
          g[0].setAttribute('fill', 'none');
          g[0].setAttribute('stroke-width', `${object.strokeWidth}px`);
        },
        complete: function (anim) {
          g[0].setAttribute('fill', `${object.fillColor}`);
        },
        easing: 'easeInOutCubic',
        duration: timeDuration,
        delay: anime.stagger(400, { start: 0 })
      });
    } else if (animationType === 'all-at-once') {
      //object.all_at_once(timeDuration);
      // object.writeTexElement = createDiv(object.SVGEquation);
      // let svg = object.writeTexElement.elt.querySelectorAll('svg');
      // svg[0].setAttribute('width', `${object.width_svg}px`);
      // svg[0].setAttribute('height', `${object.height_svg}px`);

      // object.writeTexElement.position(object.x, object.y);
      const g = object.writeTexElement.elt.querySelectorAll('g');
      const pathEls = object.writeTexElement.elt.querySelectorAll('path'); //nodelist

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
            pathEl.setAttribute('stroke', `${object.strokeColor}`);
            pathEl.setAttribute('fill', 'none');
            g[0].setAttribute('fill', 'none');
            g[0].setAttribute('stroke-width', `${object.strokeWidth}px`);
          },
          complete: function (anim) {
            pathEl.setAttribute('fill', `${object.fillColor}`);
            g[0].setAttribute('fill', `${object.fillColor}`);
          },
          autoplay: true
        });
      }
    } else if (animationType === 'fade-in') {
      console.log('fadeIn called');

      anime({
        targets: object.writeTexElement.elt.querySelectorAll('svg'), //simple fadeIn
        //targets: object.writeTexElement.elt.querySelectorAll('path'),
        //scale: [4, 1],
        opacity: [0, 1],
        //translateZ: 0,
        easing: 'easeOutExpo',
        complete: function (anim) {
          object.writeTexElement.style('opacity', '1'); //clear all stray elements
        },
        duration: timeDuration,
        delay: anime.stagger(180, { start: 1000 })
      });
    } else if (animationType === 'appear') {
      console.log('appear called');

      anime({
        //targets: object.writeTexElement.elt.querySelectorAll('svg'), //simple fadeIn
        targets: object.writeTexElement.elt.querySelectorAll('path'),
        //scale: [4, 1],
        opacity: [0, 1],
        //translateZ: 0,
        easing: 'easeOutExpo',
        complete: function (anim) {
          object.writeTexElement.style('opacity', '1'); //clear all stray elements
        },
        duration: timeDuration,
        delay: anime.stagger(180, { start: 1000, direction: 'normal'})
      });
    } else if (animationType === 'dissolve') {
      console.log('dissolve called');
      //add(object);
      anime({
        //targets: object.writeTexElement.elt.querySelectorAll('svg'), //simple fadeIn
        targets: object.writeTexElement.elt.querySelectorAll('path'),
        //scale: [4, 1],
        opacity: [1, 0],
        //translateZ: 0,
        easing: 'easeOutExpo',
        complete: function (anim) {
          object.writeTexElement.style('opacity', '0'); //clear all stray elements
        },
        duration: timeDuration,
        delay: anime.stagger(180, { start: 1000 })
      });
    } else if (animationType === 'fade-out') {
      console.log('fadeout called');

      anime({
        targets: object.writeTexElement.elt.querySelectorAll('svg'), //simple fadeIn
        //targets: object.writeTexElement.elt.querySelectorAll('path'),
        //scale: [4, 1],
        opacity: [1, 0],
        //translateZ: 0,
        easing: 'easeOutExpo',
        complete: function (anim) {
          object.writeTexElement.style('opacity', '0'); //clear all stray elements
        },
        duration: timeDuration,
        delay: anime.stagger(180, { start: 1000 })
      });
    } else if (animationType === 'blink') {
      console.log('blink');

      const animation: any = anime({
        targets: object.writeTexElement.elt.querySelectorAll('svg'), //simple fadeIn
        //targets: object.writeTexElement.elt.querySelectorAll('path'),
        //scale: [4, 1],
        opacity: [0, 1, 0],
        //translateZ: 0,
        easing: 'easeOutSine',
        // complete: function (anim) {
        //   animation.reverse();
        // },
        duration: timeDuration,
        delay: anime.stagger(200),
        loop: true
      });
    }
  }
  //Text animation
  else if (object instanceof Text) {
    if (!object.writeTextElement) {
      add(object);
    }

    console.log('Text');
    object.writeTextElement.style('opacity', '1'); //make it visible else it will not appear

    if (animationType == 'write') {
      console.log(object);
      writeAnimator(object, timeDuration, delayDuration);
    } else if (animationType == 'all-at-once') {
      console.log('all at once');
    } else if (animationType == 'fadeIn') {
      console.log('fadeIn');
      fadeInAnimator(object, timeDuration, delayDuration);
    } else if (animationType == 'fadeOut') {
      console.log('fadeOut');
      fadeOutAnimator(object, timeDuration, delayDuration);
    } else if (animationType == 'erase') {
      console.log('erase');
      eraseAnimator(object, timeDuration, delayDuration);
    } else if (animationType == 'dissolve') {
      console.log('dissolve');
      dissolveAnimator(object, timeDuration, delayDuration);
    } else if (animationType == 'waveIn') {
      console.log('waveIn');
      waveInAnimator(object, timeDuration, delayDuration);
    } else if (animationType == 'waveOut') {
      console.log('waveOut');
      waveOutAnimator(object, timeDuration, delayDuration);
    } else if (animationType == 'spinOut') {
      console.log('spinOut');
      spinOutAnimator(object, timeDuration, delayDuration);
    }
  }
}

function writeAnimator(
  object: any,
  timeDuration: number,
  delayDuration: number | string
) {
  // console.log(object);
  //object = object;
  // timeDuration = timeDuration; //seconds
  // delayDuration = delayDuration; //seconds

  object.writeTextElement.style('opacity', '1');
  animationTimeline.add(
    {
      targets: object.writeTextElement.elt.querySelectorAll('.letter'),
      scale: [CONFIG.PLAY.WRITE_SCALE, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: timeDuration,
      delay: anime.stagger(CONFIG.PLAY.WRITE_STAGGERING_DELAY) //time duration must be replaced with delay
    },
    delayDuration
  );
}
function eraseAnimator(
  object: any,
  timeDuration: number,
  delayDuration: number | string
) {
  animationTimeline.add(
    {
      targets: object.writeTextElement.elt.querySelectorAll('.letter'),
      scale: [CONFIG.PLAY.ERASE_SCALE, 1],
      opacity: [1, 0],
      //translateZ: 0,
      easing: 'easeInOutCubic',
      duration: timeDuration,
      //delay: anime.stagger(CONFIG.PLAY.ERASE_STAGGERING_DELAY),
      delay: anime.stagger(CONFIG.PLAY.ERASE_STAGGERING_DELAY)
      //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
    },
    delayDuration
  );
}

function dissolveAnimator(
  object: any,
  timeDuration: number,
  delayDuration: number | string
) {
  animationTimeline.add(
    {
      targets: object.writeTextElement.elt.querySelectorAll('.letter'),
      opacity: [
        1,
        random(0.5, 0.9),
        random(0.6, 0.8),
        random(0.5, 0.7),
        random(0.4, 0.6),
        random(0.6, 0.9),
        random(0, 0.4),
        random(0, 0.3),
        random(0, 0.2),
        0
      ],
      //translateZ: 0,
      easing: 'easeInExpo',
      duration: timeDuration,
      delay: anime.stagger(CONFIG.PLAY.DISSOLVE_STAGGERING_DELAY)
      //delay: anime.stagger(CONFIG.PLAY.DISSOLVE_STAGGERING_DELAY)
      //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
    },
    delayDuration
  );
}
function spinOutAnimator(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  object.writeTextElement.elt
    .querySelectorAll('.letter')
    .forEach((el: any) => (el.style.display = 'inline-block'));
  //object.writeTextElement.style('overflow', 'hidden');
  anime.timeline({ loop: false }).add({
    targets: object.writeTextElement.elt.querySelectorAll('.letter'),
    //translateY: [0,'1em'],
    rotateX: 360, //360deg
    opacity: [0.5, , 0],
    //scale :[1,0],
    duration: timeDuration,
    //delay: (el, i) => CONFIG.PLAY.SPINOUT_STAGGERING_DELAY * i,
    delay: anime.stagger(CONFIG.PLAY.SPINOUT_STAGGERING_DELAY, {
      start: delayDuration
    })
  });
}
function waveOutAnimator(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  object.writeTextElement.elt
    .querySelectorAll('.letter')
    .forEach((el: any) => (el.style.display = 'inline-block'));
  //object.writeTextElement.style('overflow', 'hidden');
  animationTimeline.add(
    {
      targets: object.writeTextElement.elt.querySelectorAll('.letter'),
      translateY: [0, CONFIG.PLAY.WAVEOUT_TRANSLATEY],
      translateZ: 0,
      opacity: [1, 0.5, 0.1, 0],
      scale: [1, 0.2, 0],
      duration: timeDuration,
      delay: anime.stagger(CONFIG.PLAY.WAVEOUT_STAGGERING_DELAY)
      //delay: (el, i) => CONFIG.PLAY.WAVEOUT_STAGGERING_DELAY * i
    },
    delayDuration
  );
}
function waveInAnimator(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      begin: function (anim) {
        object.writeTextElement.elt
          .querySelectorAll('.letter')
          .forEach((el: any) => (el.style.display = 'inline-block'));
        object.writeTextElement.style('overflow', 'hidden');
      },
      targets: object.writeTextElement.elt.querySelectorAll('.letter'),
      translateY: [CONFIG.PLAY.WAVEIN_TRANSLATEY, 0],
      translateZ: 0,

      duration: timeDuration,
      delay: anime.stagger(CONFIG.PLAY.WAVEIN_STAGGERING_DELAY)
      //delay: (el, i) => CONFIG.PLAY.WAVEIN_STAGGERING_DELAY * i
    },
    delayDuration
  );
}
function fadeOutAnimator(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      targets: object.writeTextElement.elt.querySelectorAll('.letter'),
      //scale: [4, 1],
      opacity: [1, 0],
      //translateZ: 0,
      easing: 'easeInOutCubic',
      duration: timeDuration
      //delay: delayDuration
      //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
    },
    delayDuration
  );
}
function fadeInAnimator(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      targets: object.writeTextElement.elt.querySelectorAll('.letter'),
      //scale: [4, 1],
      opacity: [0, 1],
      //translateZ: 0,
      easing: 'easeInOutCubic',
      duration: timeDuration
      //delay:
      //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
    },
    delayDuration
  );
}
