//TODO : transform function : use morphing

//import anime from 'animejs';
import * as config from '../config.js';
import { createSVGPath } from '../Geometry/graph';
import { createParametricSVGPath } from '../Geometry/parametric';
import { createPolarSVGPath } from '../Geometry/polar';
import { animationTimeline } from './controls';

export function transform(
  objectInit: any,
  objectFinl: any,
  startTime: number = 0,
  endTime = 2
) {
  //console.log(config.hello[0]);
  const timeDuration = (endTime - startTime) * 1000;
  const delayDuration = startTime * 1000;

  if (objectInit.writeTexElement && objectFinl.writeTexElement) {
    //TeX transformation
  } else if (objectInit.writeTextElement && objectFinl.writeTextElement) {
  } else if (objectInit.graphObject && objectFinl.graphContainer) {
    if (objectFinl.thetaRange) {
      //console.log('polar');

      let svgPath = createPolarSVGPath(objectFinl.eqn, objectFinl.thetaRange);

      animationTimeline.add(
        {
          targets: objectInit.graphContainer.elt.querySelectorAll('path'),
          d: [
            //{value: shapes[0].d},
            { value: `${svgPath}` }
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
    } else if (objectFinl.parameterRange) {
      //console.log('parametric');

      let svgPath = createParametricSVGPath(
        objectFinl.xeqn,
        objectFinl.yeqn,
        objectFinl.parameterRange
      );

      animationTimeline.add(
        {
          targets: objectInit.graphContainer.elt.querySelectorAll('path'),
          d: [
            //{value: shapes[0].d},
            { value: `${svgPath}` }
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
    } else if (!objectFinl.thetaRange && !objectFinl.parameterRange) {
      //console.log('non-polar');

      animationTimeline.add(
        {
          targets: objectInit.graphContainer.elt.querySelectorAll('path'),
          d: [
            //{value: shapes[0].d},
            { value: `${createSVGPath(objectFinl.eqn)}` }
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
    //console.log('inside transform');
    //console.log(`${objectFinl.eqn}`);
  }
}
