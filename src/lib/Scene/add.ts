import { Text } from '../MObject/Text';

export function add(object: any) {
  if (false) {
    //tex animations
  } else if (object instanceof Text) {
    const sentence = object._text;

    object.writeTextElement = createElement(
      'div',
      sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    );
    object.writeTextElement.position(object.x, object.y);
    object.writeTextElement.style('font-size', `${object._size}px`);
    object.writeTextElement.style('color', `${object.fillColor}`);
    //object.writeTextElement.style('text-stroke-width', `${object._strokeWidth}`); //TODO : not working without -webkit
    object.writeTextElement.style('opacity', '0'); //to hide text at initialisation
  }
}
