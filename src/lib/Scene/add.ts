import { Text } from '../MObject/Text';

export function add(_object: any) {
  if (false) {
    //tex animations
  } else if (_object instanceof Text) {
    const sentence = _object.sentence;

    _object.writeTextElement = createElement(
      'div',
      sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    );
    _object.writeTextElement.position(_object.x, _object.y);
    _object.writeTextElement.style('font-size', `${_object.sizePx}px`);
    _object.writeTextElement.style('color', `${_object._fill}`);
    _object.writeTextElement.style('text-stroke-width', `${_object._strokeWidth}`); //TODO : not working without -webkit
    _object.writeTextElement.style('opacity', '0'); //to hide text at initialisation
  }
}
