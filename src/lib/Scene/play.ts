import { Text } from '../MObject/Text';
import anime from 'animejs';
import { add } from './add';

//TODO : text animation for all-at-once
//TODO : add delays and timeDuration methods

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
export function play( //TODO: use '...args'
  _object: any,
  animation_type: string = 'write',
  timeDuration: number
) {
  if (timeDuration == null) {
    timeDuration = 50 * _object.sentence.length;
  }

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

    if (animation_type == 'write') {
      anime.timeline({ loop: false }).add({
        targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: 'easeOutExpo',
        duration: 950,
        delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
      });
    } else if (animation_type == 'all-at-once') {
      //console.log('all at once');
    } else if (animation_type == 'fadeIn') {
      console.log('fadeIn');
      anime({
        targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
        //scale: [4, 1],
        opacity: [0, 1],
        //translateZ: 0,
        easing: 'easeInOutCubic',
        duration: 4000
        //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
      });
    } else if (animation_type == 'fadeOut') {
      console.log('fadeOut');

      anime({
        targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
        //scale: [4, 1],
        opacity: [1, 0],
        //translateZ: 0,
        easing: 'easeInOutCubic',
        duration: 4000
        //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
      });
    } else if (animation_type == 'erase') {
      console.log('erase');

      anime({
        targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
        scale: [4, 1],
        opacity: [1, 0],
        //translateZ: 0,
        easing: 'easeInOutCubic',
        duration: 1000,
        delay: anime.stagger(180)
        //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
      });
    } else if (animation_type == 'dissolve') {
      console.log('dissolve');

      anime({
        targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
        //scale: [1, 20],
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
        duration: 4000,
        delay: anime.stagger(10)
        //delay: anime.stagger(180, { start: timeDuration }) //time duration must be replaced with delay
      });
    } else if (animation_type == 'waveIn') {
      console.log('waveIn');
      _object.writeTextElement.elt
        .querySelectorAll('.letter')
        .forEach((el: any) => (el.style.display = 'inline-block'));
      _object.writeTextElement.style('overflow', 'hidden');
      anime
        .timeline({ loop: false })
        .add({
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          translateY: ['1.1em', 0],
          translateZ: 0,
          duration: 750,
          delay: (el, i) => 50 * i
        })
        .add({
          targets: _object.writeTextElement.elt,
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000
        });
    } else if (animation_type == 'waveOut') {
      console.log('waveOut');
      _object.writeTextElement.elt
        .querySelectorAll('.letter')
        .forEach((el: any) => (el.style.display = 'inline-block'));
      //_object.writeTextElement.style('overflow', 'hidden');
      anime
        .timeline({ loop: false })
        .add({
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          translateY: [0, '1em'],
          translateZ: 0,
          opacity: [1, 0.5, 0.1, 0],
          scale: [1, 0.2, 0],
          duration: 2000,
          delay: (el, i) => 100 * i
        })
        .add({
          targets: _object.writeTextElement.elt,
          opacity: 0,

          duration: 1000,
          easing: 'easeInOutCubic',
          delay: 1000
        });
    } else if (animation_type == 'spinOut') {
      console.log('spinOut');
      _object.writeTextElement.elt
        .querySelectorAll('.letter')
        .forEach((el: any) => (el.style.display = 'inline-block'));
      //_object.writeTextElement.style('overflow', 'hidden');
      anime
        .timeline({ loop: false })
        .add({
          targets: _object.writeTextElement.elt.querySelectorAll('.letter'),
          //translateY: [0,'1em'],
          rotateX: 360,
          opacity: [1, , 0.5, 0],
          //scale :[1,0],
          duration: 2500,
          delay: (el, i) => 150 * i
        })
        .add({
          targets: _object.writeTextElement.elt,
          opacity: 0,

          duration: 1000,
          easing: 'easeInOutCubic',
          delay: 1000
        });
    }
  }
}
