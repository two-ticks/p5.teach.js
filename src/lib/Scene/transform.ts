//TODO : transform function : use morphing

//import anime from 'animejs';
import * as config from '../config.js';
import { createSVGPath } from '../Geometry/graph';
import { animationTimeline } from './controls';

export function transform(
  object_init: any,
  object_finl: any,
  startTime: number = 0,
  endTime = 2
) {
  //console.log(config.hello[0]);
  const timeDuration = (endTime - startTime) * 1000;
  const delayDuration = startTime * 1000;

  if (object_init.writeTexElement && object_finl.writeTexElement) {
    //TeX transformation
  } else if (object_init.writeTextElement && object_finl.writeTextElement) {
  } else if (object_init.graphObject && object_finl.graphContainer) {
    console.log('inside transform');
    console.log(`${object_finl.eqn}`);

    animationTimeline.add(
      {
        targets: object_init.graphContainer.elt.querySelectorAll('path')[0],
        d: [
          //{value: shapes[0].d},
          { value: `${createSVGPath(object_finl.eqn)}` }
        ],
        duration: timeDuration,
        //direction: 'alternate',
        autoplay: true,
        easing: 'easeInOutCubic'
        //elasticity: 1
        //loop: true
      },
      delayDuration
    );
  }
}
