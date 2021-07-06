import { TeX } from '../MObject/TeX';
import { Text } from '../MObject/Text';

export function add(object: Text | TeX) {
  if (object instanceof TeX) {
    //tex animations
    object.writeElement = createDiv(object.svgEquation);
    let svg = object.writeElement.elt.querySelectorAll('svg');
    svg[0].setAttribute('width', `${object.svgWidth}px`);
    svg[0].setAttribute('height', `${object.svgHeight}px`);
    svg[0].setAttribute('stroke', object.strokeColor);
    svg[0].setAttribute('stroke-width', object.strokeWidth);
    svg[0].setAttribute('fill', object.fillColor.toString());

    // g[0].setAttribute('fill', 'none');
    // g[0].setAttribute('stroke-width', '10px');
    object.writeElement.position(object.x, object.y);
  } else if (object instanceof Text) {
    const sentence = object._text;

    object.writeElement = createElement(
      'div',
      sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    );
    object.writeElement.position(object.x, object.y);
    object.writeElement.style('font-size', `${object._size}px`);
    object.writeElement.style('color', `${object.fillColor}`);
    //object.writeElement.style('text-stroke-width', `${object._strokeWidth}`); //TODO : not working without -webkit
    object.writeElement.style('opacity', '0'); //to hide text at initialisation
  }
}
