import { Text } from '../MObject/Text';
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
  animation_type: string = 'write',
  timeDuration: number = 0, //seconds
  delayDuration: number | string = 0 //seconds
) {
  // object = object;
  // animation_type = animation_type;
  // timeDuration = timeDuration; //seconds
  // delayDuration = delayDuration; //seconds
  //testing for relative and absolute parameters //TODO : fix relative time
  if (typeof delayDuration === 'number') {
    delayDuration = 1000 * delayDuration; //sec to ms
    //console.log(delayDuration);
  } else if (typeof delayDuration === 'string') {
    if (delayDuration.charAt(0) === '+') {
      delayDuration = 1000 * Number(delayDuration);
      delayDuration = `+=${delayDuration}`;
      console.log(delayDuration);
    } else if (delayDuration.charAt(0) === '-') {
      delayDuration = 1000 * Number(delayDuration);
      delayDuration = `-=${-delayDuration}`;
      console.log(delayDuration);
    }
  }

  timeDuration = 1000 * timeDuration; //sec to ms

  if (timeDuration == 0) {
    timeDuration = CONFIG.PLAY.TIME_LENGHT_CHARACTER * object._text.length; //for text
  }

  if (false) {
    //TeX animation
  }
  //Text animation
  else if (object instanceof Text) {
    if (!object.writeTextElement) {
      add(object);
    }

    console.log('Text');
    object.writeTextElement.style('opacity', '1'); //make it visible else it will not appear

    if (animation_type == 'write') {
      console.log(object);
      writeAnimator(object, timeDuration, delayDuration);
    } else if (animation_type == 'all-at-once') {
      console.log('all at once');
    } else if (animation_type == 'fadeIn') {
      console.log('fadeIn');
      fadeInAnimator(object, timeDuration, delayDuration);
    } else if (animation_type == 'fadeOut') {
      console.log('fadeOut');
      fadeOutAnimator(object, timeDuration, delayDuration);
    } else if (animation_type == 'erase') {
      console.log('erase');
      eraseAnimator(object, timeDuration, delayDuration);
    } else if (animation_type == 'dissolve') {
      console.log('dissolve');
      dissolveAnimator(object, timeDuration, delayDuration);
    } else if (animation_type == 'waveIn') {
      console.log('waveIn');
      waveInAnimator(object, timeDuration, delayDuration);
    } else if (animation_type == 'waveOut') {
      console.log('waveOut');
      waveOutAnimator(object, timeDuration, delayDuration);
    } else if (animation_type == 'spinOut') {
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
