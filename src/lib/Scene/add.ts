import { Text } from '../MObject/Text';

export function add(_object: any) {
  if (false) {
    //tex animations
  } else if (_object instanceof Text) {
    const sentence = _object.sentence;
    //const x = _object.x;
    //const y = _object.y;
    _object.writeTextElement = createElement(
      'div',
      sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    );

    _object.writeTextElement.position(_object.x, _object.y);
    //_object.writeTextElement.position(_object.x, _object.x);

    _object.writeTextElement.style('font-size', `${_object.sizePx}px`);
    console.log(_object.sizePx);

    _object.writeTextElement.style('opacity', '0'); //to hide text at initialisation
  }
}
