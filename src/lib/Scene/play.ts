import { Text } from '../MObject/Text';
import anime from 'animejs';
import { add } from './add';

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
    _object.writeTextElement.style('opacity', '1');
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
    }
  }
}
