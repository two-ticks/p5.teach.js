import { TeX } from '../MObject/TeX';

export function add(_object: any) {
  if (_object instanceof TeX) {
    //tex animations
    console.log('TeX');
    _object.writeTexElement = createDiv(_object.SVGEquation);
    let svg = _object.writeTexElement.elt.querySelectorAll('svg');
    svg[0].setAttribute('width', `${_object.width_svg}px`);
    svg[0].setAttribute('height', `${_object.height_svg}px`);

    // g[0].setAttribute('fill', 'none');
    // g[0].setAttribute('stroke-width', '10px');
    _object.writeTexElement.position(_object.x, _object.y);
  }
}
