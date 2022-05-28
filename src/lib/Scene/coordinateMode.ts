import { sceneVariables } from './scene';

/**
 * By default, p5 uses a left-handed coordinate system with the origin placed
 * at the top-left corner of the canvas. This library overrides p5's default
 * behavior
 *
 *  arguments: midRight, midLeft, left, right
 *  midRight: origin at middle and right
 *  midLeft: origin at middle
 *
 */
export function coordinateMode(system: string) {
  switch (system) {
    case 'right':
      sceneVariables.xMode = 1;
      sceneVariables.yMode = 1;
      break;

    case 'left':
      sceneVariables.xMode = 1;
      sceneVariables.yMode = -1;
      break;

    // TODO : change orgin to center for SVGs and all other geometrical objects
    case 'midRight':
      sceneVariables.xMode = 1;
      sceneVariables.yMode = 1;
      // TODO: sceneVariables.originX = width/2;
      // TODO: sceneVariables.originY = height/2;
      break;

    case 'midLeft':
      sceneVariables.xMode = 1;
      sceneVariables.yMode = -1;
      // TODO: sceneVariables.originX = width/2;
      // TODO: sceneVariables.originY = height/2;

      break;

    default:
      sceneVariables.xMode = 1;
      sceneVariables.yMode = 1;
      break;
  }
}
