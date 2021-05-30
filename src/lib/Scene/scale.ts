import { TeX } from '../MObject/TeX';
import { Text } from '../MObject/Text';

//TODO : clean and comment
//TODO : test

export function T_scale(_object: any, scale_to: number) {
  _object.width_svg = scale_to * _object.width_svg;
  _object.height_svg = scale_to * _object.height_svg;
  if (
    _object instanceof TeX &&
    _object.writeTexElement.elt.querySelectorAll('svg')
  ) {
    let svg = _object.writeTexElement.elt.querySelectorAll('svg');
    svg[0].setAttribute('width', `${_object.width_svg}px`);
    svg[0].setAttribute('height', `${_object.height_svg}px`);
  } else if (
    _object instanceof Text &&
    _object.writeTextElement.elt.querySelectorAll('svg')
  ) {
    _object.writeTextElement.style('font-size', `${_object.size * scale_to}px`);
  }
}
