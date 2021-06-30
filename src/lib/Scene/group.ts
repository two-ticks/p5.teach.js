import p5 from 'p5';
import { sceneContainer } from './scene';
import { Text } from '../MObject/Text';
import { TeX } from '../MObject/TeX';
import { Graph2D } from '../Geometry/graph';

export class Group {
  group;

  constructor(...args: any[]) {
    //console.log(args[0]);
    let p5Canvas = document
      .getElementsByClassName('p5Canvas')[0]
      .getBoundingClientRect();
    //console.log(p5Canvas);
    //sceneContainer.setAttribute('overflow', 'hidden');

    const groupDiv = (this.group = createElement('div'));
    this.group.parent(sceneContainer);
    let i = 0;
    while (document.getElementById(`group${i}`)) {
      i++;
    }
    this.group.id(`group${i}`);
    groupDiv.elt.setAttribute(
      'style',
      `overflow: hidden; position: absolute; left: ${p5Canvas.x}px; top: ${p5Canvas.y}px; width: ${p5Canvas.width}px; height : ${p5Canvas.height}px`
    );

    function parentDiv(element) {
      console.log('element', element + 1);
      console.log('gap');

      if (element instanceof Text) {
        console.log('text foreach');
        element.writeTextElement.parent(groupDiv);
      } else if (element instanceof TeX) {
        element.writeTexElement.parent(groupDiv);
      } else if (element instanceof Graph2D) {
        element.graphContainer.parent(groupDiv);
      } else {
        console.log('foreach');
      }
    }



    args[0].forEach(parentDiv);
  }
  scale(scaleFactor) {
    this.group.style('transform', `scale(${scaleFactor})`);
  }
  remove() {
    this.group.remove();

    //document.body.removeChild(this.group.elt);
  }
  //console.log(args[0]);
}

export function createGroup(...args) {
  //TODO : convert into interface
  return new Group(args);
}
