import { Text } from '../MObject/Text';
import { TeX } from '../MObject/TeX';
import anime from 'animejs';
import { add } from './add';
import * as CONFIG from '../config.js';
import { animationTimeline } from './controls';

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

//let animationTimeline = anime.timeline(); //initilising a timeline

export function play(
  //any, //TODO: use '...args'
  object: any,
  animationType: string = 'write',
  startTime: number = 0, //seconds // start time
  endTime: number = 0 //seconds // end time
) {
  if (!(typeof startTime === 'number' || typeof endTime === 'number')) {
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
  //   ////console.log(delayDuration);
  // } else if (typeof delayDuration === 'string') {
  //   if (delayDuration.charAt(0) === '+') {
  //     delayDuration = 1000 * Number(delayDuration);
  //     delayDuration = `+=${delayDuration}`;
  //     //console.log(delayDuration);
  //   } else if (delayDuration.charAt(0) === '-') {
  //     delayDuration = 1000 * Number(delayDuration);
  //     delayDuration = `-=${-delayDuration}`;
  //     //console.log(delayDuration);
  //   }
  // }

  // timeDuration = 1000 * timeDuration; //sec to ms

  // if (timeDuration == 0) {
  //   timeDuration = CONFIG.PLAY.TIME_LENGHT_CHARACTER * object.sentence.length; //for text
  // }

  if (object instanceof TeX) {
    //adding element before animation
    ////console.log('TeX');
    if (!object.writeElement.elt.children.length) {
      add(object);
    }
    //tex animations
    ////console.log('TeX');
    if (animationType === 'write') {
      //console.log('writing');

      //write(object, timeDuration);
      // object.writeElement = createDiv(object.SVGEquation);
      // let svg = object.writeElement.elt.querySelectorAll('svg');
      // svg[0].setAttribute('width', `${object.width_svg}px`);
      // svg[0].setAttribute('height', `${object.height_svg}px`);
      // const g = object.writeElement.elt.querySelectorAll('g');
      // // g[0].setAttribute('fill', 'none');
      // // g[0].setAttribute('stroke-width', '10px');
      // object.writeElement.position(object.x, object.y);
      //const pathEls = object.writeElement.elt.querySelectorAll('path'); //nodelist

      writeAnimatorTeX(object, timeDuration, delayDuration);
    } else if (animationType === 'allAtOnce') {
      //object.all_at_once(timeDuration);
      // object.writeElement = createDiv(object.SVGEquation);
      // let svg = object.writeElement.elt.querySelectorAll('svg');
      // svg[0].setAttribute('width', `${object.width_svg}px`);
      // svg[0].setAttribute('height', `${object.height_svg}px`);

      // object.writeElement.position(object.x, object.y);
      allAtOnceAnimatorTeX(object, timeDuration, delayDuration);
    } else if (animationType === 'growFromCenter') {
      //console.log('growFromCenter');
      growFromCenterAnimatorTeX(object, timeDuration, delayDuration);
    } else if (animationType === 'createFill') {
      //console.log('createFill');
      createFillAnimatorTeX(object, timeDuration, delayDuration);
    } else if (animationType === 'fadeIn') {
      //console.log('fadeIn called');
      fadeInAnimatorTeX(object, timeDuration, delayDuration);
    } else if (animationType === 'appear') {
      //console.log('appear called');

      appearAnimatorTeX(object, timeDuration, delayDuration);
    } else if (animationType === 'dissolve') {
      //console.log('dissolve called');
      //add(object);
      dissolveAnimatorTeX(object, timeDuration, delayDuration);
    } else if (animationType === 'fadeOut') {
      //console.log('fadeout called');
      fadeOutAnimatorTeX(object, timeDuration, delayDuration);
    } else if (animationType === 'blink') {
      //console.log('blink');
      blinkAnimatorTeX(object, timeDuration, delayDuration);
    }
  }
  //Text animation
  else if (object instanceof Text) {
    if (!object.writeElement.elt.children.length) {
      add(object);
    }

    ////console.log('Text');
    object.writeElement.style('opacity', '1'); //make it visible else it will not appear

    if (animationType === 'write') {
      //console.log(object);
      writeAnimatorText(object, timeDuration, delayDuration);
    } else if (animationType === 'growFromCenter') {
      //console.log('growFromCenter');
      growFromCenterAnimatorText(object, timeDuration, delayDuration);
    } else if (animationType === 'allAtOnce') {
      //console.log('all at once');
    } else if (animationType === 'fadeIn') {
      //console.log('fadeIn');
      fadeInAnimatorText(object, timeDuration, delayDuration);
    } else if (animationType === 'fadeOut') {
      //console.log('fadeOut');
      fadeOutAnimatorText(object, timeDuration, delayDuration);
    } else if (animationType === 'erase') {
      //console.log('erase');
      eraseAnimatorText(object, timeDuration, delayDuration);
    } else if (animationType === 'dissolve') {
      //console.log('dissolve');
      dissolveAnimatorText(object, timeDuration, delayDuration);
    } else if (animationType === 'waveIn') {
      //console.log('waveIn');
      waveInAnimatorText(object, timeDuration, delayDuration);
    } else if (animationType === 'waveOut') {
      //console.log('waveOut');
      waveOutAnimatorText(object, timeDuration, delayDuration);
    } else if (animationType === 'spinOut') {
      //console.log('spinOut');
      spinOutAnimatorText(object, timeDuration, delayDuration);
    }
  }
}

function writeAnimatorText(
  object: any,
  timeDuration: number,
  delayDuration: number | string
) {
  // //console.log(object);
  //object = object;
  // timeDuration = timeDuration; //seconds
  // delayDuration = delayDuration; //seconds
  //
  object.writeElement.style('opacity', '1');
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('.letter'),
      scale: [CONFIG.PLAY.WRITE_SCALE, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: timeDuration,
      delay: anime.stagger(timeDuration / (object.sentence.length + 1)) //time duration must be replaced with delay
    },
    delayDuration
  );
}

function growFromCenterAnimatorText(
  object: any,
  timeDuration: number,
  delayDuration: number | string
) {
  // //console.log(object);
  //object = object;
  // timeDuration = timeDuration; //seconds
  // delayDuration = delayDuration; //seconds
  //
  object.writeElement.style('opacity', '1');
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('.letter'),
      scale: [CONFIG.PLAY.WRITE_SCALE, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: timeDuration,
      delay: anime.stagger(timeDuration / (object.sentence.length + 1), {
        from: 'center'
      }) //time duration must be replaced with delay
    },
    delayDuration
  );
}

function eraseAnimatorText(
  object: any,
  timeDuration: number,
  delayDuration: number | string
) {
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('.letter'),
      scale: [CONFIG.PLAY.ERASE_SCALE, 1],
      opacity: [1, 0],
      //translateZ: 0,
      easing: 'easeInOutCubic',
      duration: timeDuration,
      //delay: anime.stagger(CONFIG.PLAY.ERASE_STAGGERING_DELAY),
      delay: anime.stagger(timeDuration / object.sentence.length)
      //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
    },
    delayDuration
  );
}

function dissolveAnimatorText(
  object: any,
  timeDuration: number,
  delayDuration: number | string
) {
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('.letter'),
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
      delay: anime.stagger(timeDuration / object.sentence.length)
      //delay: anime.stagger(CONFIG.PLAY.DISSOLVE_STAGGERING_DELAY)
      //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
    },
    delayDuration
  );
}
function spinOutAnimatorText(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  //object.writeElement.style('overflow', 'hidden');
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('.letter'),
      //translateY: [0,'1em'],
      rotateX: 360, //360deg
      opacity: [0.5, , 0],
      begin: function (anim) {
        object.writeElement.elt
          .querySelectorAll('.letter')
          .forEach(
            (el: { style: { display: string } }) =>
              (el.style.display = 'inline-block')
          );
      },
      //scale :[1,0],
      duration: timeDuration,
      //delay: (el, i) => CONFIG.PLAY.SPINOUT_STAGGERING_DELAY * i,
      //delay: anime.stagger(CONFIG.PLAY.SPINOUT_STAGGERING_DELAY)
      delay: anime.stagger(timeDuration / object.sentence.length)
    },
    delayDuration
  );
}
function waveOutAnimatorText(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  object.writeElement.elt
    .querySelectorAll('.letter')
    .forEach((el: any) => (el.style.display = 'inline-block'));
  //object.writeElement.style('overflow', 'hidden');
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('.letter'),
      translateY: [0, CONFIG.PLAY.WAVEOUT_TRANSLATEY],
      translateZ: 0,
      opacity: [1, 0.5, 0.1, 0],
      scale: [1, 0.2, 0],
      duration: timeDuration,
      delay: anime.stagger(timeDuration / object.sentence.length)
      //delay: anime.stagger(CONFIG.PLAY.WAVEOUT_STAGGERING_DELAY)
      //delay: (el, i) => CONFIG.PLAY.WAVEOUT_STAGGERING_DELAY * i
    },
    delayDuration
  );
}
function waveInAnimatorText(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      begin: function (anim) {
        object.writeElement.elt
          .querySelectorAll('.letter')
          .forEach((el: any) => (el.style.display = 'inline-block'));
        object.writeElement.style('overflow', 'hidden');
      },
      targets: object.writeElement.elt.querySelectorAll('.letter'),
      translateY: [CONFIG.PLAY.WAVEIN_TRANSLATEY, 0],
      translateZ: 0,

      duration: timeDuration,
      delay: anime.stagger(timeDuration / object.sentence.length)
      //delay: anime.stagger(CONFIG.PLAY.WAVEIN_STAGGERING_DELAY)
      //delay: (el, i) => CONFIG.PLAY.WAVEIN_STAGGERING_DELAY * i
    },
    delayDuration
  );
}
function fadeOutAnimatorText(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('.letter'),
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
function fadeInAnimatorText(
  object: Text,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('.letter'),
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

function writeAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  const g = object.writeElement.elt.querySelectorAll('g');
  const use = object.writeElement.elt.querySelectorAll('use');
  const staggerDelay =
    timeDuration /
    (use.length +
      object.writeElement.elt.querySelectorAll('path').length +
      object.writeElement.elt.querySelectorAll('line').length +
      object.writeElement.elt.querySelectorAll('rect').length +
      1);
  animationTimeline
    .add(
      {
        targets: [
          //document.querySelectorAll(`#mobj-tex-${object.id} .mobj-tex-${object.id}`),
          object.writeElement.elt.querySelectorAll('path'),
          object.writeElement.elt.querySelectorAll('rect'),
          object.writeElement.elt.querySelectorAll('line')
        ],
        //scale: [4, 1],
        //fill: [`${object.fillColor.toString('#rgb')}0` , object.fillColor.toString()], //TODO : fill is black by default can be customised through set fill methods
        //stroke : "black",     //TODO : customisable through config
        //stroke-width: "10px", //customisable through config
        strokeDashoffset: [anime.setDashoffset, 0],
        //opacity: [0, 0.2, 1],
        // begin: function (anim) {
        //   g[0].setAttribute('fill', 'none');
        //   g[0].setAttribute('stroke-width', '10px');
        // },
        // complete: function (anim) {
        //   //g[0].setAttribute('fill', object.fillColor.toString());
        // },
        easing: 'easeOutSine',
        //duration: timeDuration,
        delay: anime.stagger(staggerDelay)
        //delay: anime.stagger(400)
      },
      delayDuration
    )
    .add(
      {
        targets: [g],
        //scale: [4, 1],
        fill: [
          `${object.fillColor.toString('#rgb')}0`,
          object.fillColor.toString()
        ], //TODO : fill is black by default can be customised through set fill methods
        //stroke : "black",     //TODO : customisable through config
        //stroke-width: "10px", //customisable through config
        //strokeDashoffset: [anime.setDashoffset, 0],
        //opacity: [0, 0.2, 1],
        // begin: function (anim) {
        //   //g[0].setAttribute('fill', 'none');
        //   //g[0].setAttribute('stroke-width', '10px');
        // },
        // complete: function (anim) {
        //   //g[0].setAttribute('fill', object.fillColor.toString());
        // },
        easing: 'easeInOutCubic',
        //duration: timeDuration,
        delay: anime.stagger(staggerDelay)
        //delay: anime.stagger(400)
      },
      delayDuration
    );
}

function growFromCenterAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  const g = object.writeElement.elt.querySelectorAll('g');
  const use = object.writeElement.elt.querySelectorAll('use');

  animationTimeline
    .add(
      {
        targets: [
          //document.querySelectorAll(`#mobj-tex-${object.id} .mobj-tex-${object.id}`),
          object.writeElement.elt.querySelectorAll('path'),
          object.writeElement.elt.querySelectorAll('rect')
        ],
        //scale: [4, 1],
        //fill: [`${object.fillColor.toString('#rgb')}0` , object.fillColor.toString()], //TODO : fill is black by default can be customised through set fill methods
        //stroke : "black",     //TODO : customisable through config
        //stroke-width: "10px", //customisable through config
        strokeDashoffset: [anime.setDashoffset, 0],
        //opacity: [0, 0.2, 1],
        // begin: function (anim) {
        //   g[0].setAttribute('fill', 'none');
        //   g[0].setAttribute('stroke-width', '10px');
        // },
        // complete: function (anim) {
        //   //g[0].setAttribute('fill', object.fillColor.toString());
        // },
        easing: 'easeOutSine',
        //duration: timeDuration
        delay: anime.stagger(
          timeDuration /
            (use.length +
              object.writeElement.elt.querySelectorAll('rect').length +
              1),
          { from: 'center' }
        )
        //delay: anime.stagger(400)
      },
      delayDuration
    )
    .add(
      {
        targets: [
          object.writeElement.elt.querySelectorAll('path'),
          object.writeElement.elt.querySelectorAll('rect')
        ],
        //scale: [4, 1],
        fill: [
          `${object.fillColor.toString('#rgb')}0`,
          object.fillColor.toString()
        ], //TODO : fill is black by default can be customised through set fill methods
        //stroke : "black",     //TODO : customisable through config
        //stroke-width: "10px", //customisable through config
        //strokeDashoffset: [anime.setDashoffset, 0],
        //opacity: [0, 0.2, 1],
        // begin: function (anim) {
        //   //g[0].setAttribute('fill', 'none');
        //   //g[0].setAttribute('stroke-width', '10px');
        // },
        complete: function (anim) {
          //g[0].setAttribute('fill', object.fillColor.toString());
        },
        easing: 'easeInOutQuad',
        //duration: timeDuration,
        delay: anime.stagger(
          timeDuration /
            (use.length +
              object.writeElement.elt.querySelectorAll('rect').length +
              1),
          { from: 'center' }
        )
        //delay: anime.stagger(400)
      },
      delayDuration
    );

  // const g = object.writeElement.elt.querySelectorAll('g');
  // animationTimeline.add(
  //   {
  //     targets: object.writeElement.elt.querySelectorAll('path'),
  //     //scale: [4, 1],
  //     fill: [object.fillColor.toString(), object.fillColor], //TODO : fill is black by default can be customised through set fill methods
  //     //stroke : "black",     //TODO : customisable through config
  //     //stroke-width: "10px", //customisable through config
  //     strokeDashoffset: [anime.setDashoffset, 0],
  //     opacity: [0, 1],
  //     begin: function (anim) {
  //       g[0].setAttribute('fill', 'none');
  //       g[0].setAttribute('stroke-width', '10px');
  //     },
  //     complete: function (anim) {
  //       g[0].setAttribute('fill', 'black');
  //     },
  //     easing: 'easeInOutCubic',
  //     duration: timeDuration,
  //     delay: anime.stagger(400, { from: 'center' })
  //   },
  //   delayDuration
  // );
}
function createFillAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  const g = object.writeElement.elt.querySelectorAll('g');
  const use = object.writeElement.elt.querySelectorAll('use');

  animationTimeline
    .add(
      {
        targets: [
          //document.querySelectorAll(`#mobj-tex-${object.id} .mobj-tex-${object.id}`),
          object.writeElement.elt.querySelectorAll('path'),
          object.writeElement.elt.querySelectorAll('rect')
        ],
        //scale: [4, 1],
        //fill: [`${object.fillColor.toString('#rgb')}0` , object.fillColor.toString()], //TODO : fill is black by default can be customised through set fill methods
        //stroke : "black",     //TODO : customisable through config
        //stroke-width: "10px", //customisable through config
        strokeDashoffset: [anime.setDashoffset, 0],
        //opacity: [0, 0.2, 1],
        // begin: function (anim) {
        //   g[0].setAttribute('fill', 'none');
        //   g[0].setAttribute('stroke-width', '10px');
        // },
        // complete: function (anim) {
        //   //g[0].setAttribute('fill', object.fillColor.toString());
        // },
        easing: 'easeOutSine',
        duration: timeDuration
        // delay: anime.stagger(
        //   timeDuration /
        //     (use.length +
        //       object.writeElement.elt.querySelectorAll('rect').length +
        //       1)
        // )
        //delay: anime.stagger(400)
      },
      delayDuration
    )
    .add(
      {
        targets: [use, g],
        //scale: [4, 1],
        fill: [
          `${object.fillColor.toString('#rgb')}0`,
          object.fillColor.toString()
        ], //TODO : fill is black by default can be customised through set fill methods
        //stroke : "black",     //TODO : customisable through config
        //stroke-width: "10px", //customisable through config
        //strokeDashoffset: [anime.setDashoffset, 0],
        //opacity: [0, 0.2, 1],
        // begin: function (anim) {
        //   //g[0].setAttribute('fill', 'none');
        //   //g[0].setAttribute('stroke-width', '10px');
        // },
        complete: function (anim) {
          //g[0].setAttribute('fill', object.fillColor.toString());
        },
        easing: 'easeInOutQuad',
        duration: timeDuration
        // delay: anime.stagger(
        //   timeDuration /
        //     (use.length +
        //       object.writeElement.elt.querySelectorAll('rect').length +
        //       1)
        // )
        //delay: anime.stagger(400)
      },
      delayDuration
    );
}
//TODO : fix timeline
function allAtOnceAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  const g = object.writeElement.elt.querySelectorAll('g');
  const pathEls = object.writeElement.elt.querySelectorAll('path'); //nodelist

  for (let pathEl of pathEls) {
    let offset: any = anime.setDashoffset(pathEl);
    pathEl.setAttribute('stroke-dashoffset', offset);
    anime({
      targets: pathEl,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutCubic',
      //easing: 'easeOutExpo', //customisable through config
      duration: timeDuration,
      delay: anime.stagger(1000, { direction: 'normal' }), //customisable through config
      begin: function (anim) {
        pathEl.setAttribute('stroke', `${object.strokeColor.toString()}`);
        pathEl.setAttribute('fill', 'none');
        g[0].setAttribute('fill', 'none');
        g[0].setAttribute('stroke-width', `${object._strokeWidth}px`);
      },
      complete: function (anim) {
        pathEl.setAttribute('fill', `${object.fillColor.toString()}`);
        g[0].setAttribute('fill', `${object.fillColor.toString()}`);
      },
      autoplay: true
    });
  }
}
function fadeInAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('svg'), //simple fadeIn
      //targets: object.writeElement.elt.querySelectorAll('path'),
      //scale: [4, 1],
      opacity: [0, 1],
      //translateZ: 0,
      easing: 'easeOutExpo',
      complete: function (anim) {
        object.writeElement.style('opacity', '1'); //clear all stray elements
      },
      duration: timeDuration,
      delay: anime.stagger(180)
    },
    delayDuration
  );
}

//TODO : how appear is different from fadeIn
function appearAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      //targets: object.writeElement.elt.querySelectorAll('svg'), //simple fadeIn
      targets: object.writeElement.elt.querySelectorAll('path'),
      //scale: [4, 1],
      opacity: [0, 1],
      //translateZ: 0,
      easing: 'easeOutExpo',
      complete: function (anim) {
        object.writeElement.style('opacity', '1'); //clear all stray elements
      },
      duration: timeDuration,
      delay: anime.stagger(180, { start: 1000, direction: 'normal' })
    },
    delayDuration
  );
}

function dissolveAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      //targets: object.writeElement.elt.querySelectorAll('svg'), //simple fadeIn
      targets: object.writeElement.elt.querySelectorAll('path'),
      //scale: [4, 1],
      opacity: [1, 0],
      //translateZ: 0,
      easing: 'easeOutExpo',
      complete: function (anim) {
        object.writeElement.style('opacity', '0'); //clear all stray elements
      },
      duration: timeDuration,
      delay: anime.stagger(180, { start: 1000 })
    },
    delayDuration
  );
}

function fadeOutAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('svg'), //simple fadeIn
      //targets: object.writeElement.elt.querySelectorAll('path'),
      //scale: [4, 1],
      opacity: [1, 0],
      //translateZ: 0,
      easing: 'easeOutExpo',
      complete: function (anim) {
        object.writeElement.style('opacity', '0'); //clear all stray elements
      },
      duration: timeDuration,
      delay: anime.stagger(180, { start: 1000 })
    },
    delayDuration
  );
}

function blinkAnimatorTeX(
  object: TeX,
  timeDuration: number,
  delayDuration: string | number
) {
  animationTimeline.add(
    {
      targets: object.writeElement.elt.querySelectorAll('svg'), //simple fadeIn
      //targets: object.writeElement.elt.querySelectorAll('path'),
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
    },
    delayDuration
  );
}
