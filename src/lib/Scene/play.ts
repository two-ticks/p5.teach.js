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
export function play(
  this: any, //TODO: use '...args'
  _object: any,
  animation_type: string = 'write',
  timeDuration: number, //seconds
  delayDuration: number | string = 0 //seconds
) {
  this.animation_type = animation_type;
  this.timeDuration = timeDuration; //seconds
  this.delayDuration = delayDuration; //seconds
  //testing for relative and absolute parameters //TODO : fix relative time
  if (typeof this.delayDuration === 'number') {
    this.delayDuration = 1000 * this.delayDuration; //sec to ms
    //console.log(this.delayDuration);
  } else if (typeof this.delayDuration === 'string') {
    if (this.delayDuration.charAt(0) === '+') {
      this.delayDuration = 1000 * Number(this.delayDuration);
      this.delayDuration = `+=${this.delayDuration}`;
      console.log(this.delayDuration);
    } else if (this.delayDuration.charAt(0) === '-') {
      this.delayDuration = 1000 * Number(this.delayDuration);
      this.delayDuration = `-=${-this.delayDuration}`;
      console.log(this.delayDuration);
    }
  }

  this.timeDuration = 1000 * this.timeDuration; //sec to ms

  if (this.timeDuration == null) {
    this.timeDuration =
      CONFIG.PLAY.TIME_LENGHT_CHARACTER * _object.sentence.length;
  }
  let animationTimeline = anime.timeline(); //initilising a timeline

  if (false) {
    //TeX animation
  }
  //Text animation
  else if (_object instanceof Text) {
    if (!_object.writeTextElement) {
      add(_object);
    }
    console.log('Text');
    _object.writeTextElement.style('opacity', '1'); //make it visible else it will not appear

    if (this.animation_type == 'write') {
      animationTimeline.add(
        {
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          scale: [CONFIG.PLAY.WRITE_SCALE, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: this.timeDuration,
          delay: anime.stagger(CONFIG.PLAY.WRITE_STAGGERING_DELAY) //time duration must be replaced with delay
        },
        this.delayDuration
      );
    } else if (this.animation_type == 'all-at-once') {
      console.log('all at once');
    } else if (this.animation_type == 'fadeIn') {
      console.log('fadeIn');
      animationTimeline.add(
        {
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          //scale: [4, 1],
          opacity: [0, 1],
          //translateZ: 0,
          easing: 'easeInOutCubic',
          duration: this.timeDuration
          //delay:
          //delay: anime.stagger(180, { start: this.timeDuration }) //time duration must be replaced with delay
        },
        this.delayDuration
      );
    } else if (this.animation_type == 'fadeOut') {
      console.log('fadeOut');
      animationTimeline.add(
        {
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          //scale: [4, 1],
          opacity: [1, 0],
          //translateZ: 0,
          easing: 'easeInOutCubic',
          duration: this.timeDuration
          //delay: this.delayDuration
          //delay: anime.stagger(180, { start: this.timeDuration }) //time duration must be replaced with delay
        },
        this.delayDuration
      );
    } else if (this.animation_type == 'erase') {
      console.log('erase');
      animationTimeline.add(
        {
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          scale: [CONFIG.PLAY.ERASE_SCALE, 1],
          opacity: [1, 0],
          //translateZ: 0,
          easing: 'easeInOutCubic',
          duration: this.timeDuration,
          //delay: anime.stagger(CONFIG.PLAY.ERASE_STAGGERING_DELAY),
          delay: anime.stagger(CONFIG.PLAY.ERASE_STAGGERING_DELAY)
          //delay: anime.stagger(180, { start: this.timeDuration }) //time duration must be replaced with delay
        },
        this.delayDuration
      );
    } else if (this.animation_type == 'dissolve') {
      console.log('dissolve');

      animationTimeline.add(
        {
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
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
          duration: this.timeDuration,
          delay: anime.stagger(CONFIG.PLAY.DISSOLVE_STAGGERING_DELAY)
          //delay: anime.stagger(CONFIG.PLAY.DISSOLVE_STAGGERING_DELAY)
          //delay: anime.stagger(180, { start: this.timeDuration }) //time duration must be replaced with delay
        },
        this.delayDuration
      );
    } else if (this.animation_type == 'waveIn') {
      console.log('waveIn');

      animationTimeline.add(
        {
          begin: function (anim) {
            _object.writeTextElement.elt
              .querySelectorAll('.letter')
              .forEach((el: any) => (el.style.display = 'inline-block'));
            _object.writeTextElement.style('overflow', 'hidden');
          },
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          translateY: [CONFIG.PLAY.WAVEIN_TRANSLATEY, 0],
          translateZ: 0,

          duration: this.timeDuration,
          delay: anime.stagger(CONFIG.PLAY.WAVEIN_STAGGERING_DELAY)
          //delay: (el, i) => CONFIG.PLAY.WAVEIN_STAGGERING_DELAY * i
        },
        this.delayDuration
      );
    } else if (this.animation_type == 'waveOut') {
      //console.log('waveOut');
      _object.writeTextElement.elt
        .querySelectorAll('.letter')
        .forEach((el: any) => (el.style.display = 'inline-block'));
      //_object.writeTextElement.style('overflow', 'hidden');
      animationTimeline.add(
        {
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          translateY: [0, CONFIG.PLAY.WAVEOUT_TRANSLATEY],
          translateZ: 0,
          opacity: [1, 0.5, 0.1, 0],
          scale: [1, 0.2, 0],
          duration: this.timeDuration,
          delay: anime.stagger(CONFIG.PLAY.WAVEOUT_STAGGERING_DELAY)
          //delay: (el, i) => CONFIG.PLAY.WAVEOUT_STAGGERING_DELAY * i
        },
        this.delayDuration
      );
    } else if (this.animation_type == 'spinOut') {
      console.log('spinOut');
      _object.writeTextElement.elt
        .querySelectorAll('.letter')
        .forEach((el: any) => (el.style.display = 'inline-block'));
      //_object.writeTextElement.style('overflow', 'hidden');
      anime.timeline({ loop: false }).add({
        targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
        //translateY: [0,'1em'],
        rotateX: 360, //360deg
        opacity: [0.5, , 0],
        //scale :[1,0],
        duration: this.timeDuration,
        //delay: (el, i) => CONFIG.PLAY.SPINOUT_STAGGERING_DELAY * i,
        delay: anime.stagger(CONFIG.PLAY.SPINOUT_STAGGERING_DELAY, {
          start: this.delayDuration
        })
      });
    }
  }
}
