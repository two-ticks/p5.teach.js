import { TeX } from '../MObject/TeX';
import * as CONFIG from '../config.js';

export function add(_object: any) {
  if (_object instanceof TeX) {
    //tex animations
    console.log('TeX');
    _object.writeTexElement = createDiv(_object.SVGEquation);
    const svg = _object.writeTexElement.elt.querySelectorAll('svg');
    svg[0].setAttribute('width', `${_object.width_svg}px`);
    svg[0].setAttribute('height', `${_object.height_svg}px`);
    _object.writeTexElement.position(_object.x, _object.y);
    const g = _object.writeTexElement.elt.querySelectorAll('g');
    g[0].setAttribute('stroke-width', `${CONFIG.PLAY.STROKE_WIDTH}`);
    //console.log(CONFIG.PLAY.STROKE_WIDTH);
    
    //TODO : clean 
    //g[0].setAttribute('fill', 'none');
    // const pathEls = _object.writeTexElement.elt.querySelectorAll('path'); //nodelist

    //   for (var i = 0; i < pathEls.length; i++) {
    //     var pathEl = pathEls[i];
    //   }
  }
}
