import { TeX } from '../MObject/TeX';
import { Text } from '../MObject/Text';
import { sceneContainer } from './scene';

export function add(object: Text | TeX) {
  if (object instanceof TeX) {
    //tex animations
    object.writeElement.html(object.svgEquation);
    object.writeElement.parent(sceneContainer);
    let svg = object.writeElement.elt.querySelectorAll('svg');
    let g = object.writeElement.elt.querySelectorAll('g');
    //svg[0].setAttribute('width', `${object.svgWidth}px`);
    //svg[0].setAttribute('height', `${object.svgHeight}px`);
    g[0].setAttribute('stroke', object.strokeColor.toString());
    g[0].setAttribute('stroke-width', object._strokeWidth);
    g[0].setAttribute('fill', object.fillColor.toString());
    svg[0].setAttribute('fill', object.fillColor.toString());
    // svg[0].style.fontSize = `${object._size}px`;
    object.writeElement.style('font-size', `${object._size}px`);

    // g[0].setAttribute('fill', 'none');
    // g[0].setAttribute('stroke-width', '10px');
    object.writeElement.position(object.x, object.y);

    //console.log();
    // set unique id for every <path> and <use>
    const use = object.writeElement.elt.querySelectorAll('use');

    use.forEach(
      (
        element: {
          getAttribute: (arg0: string) => any;
          setAttribute: (arg0: string, arg1: string) => void;
        },
        index: string | number
      ) => {
        let temp = object.writeElement.elt.querySelector(
          element.getAttribute('xlink:href')
        );
        let tempId = temp.getAttribute('id'); //id of <path>
        //giving unique id to the found <use>
        element.setAttribute('xlink:href', `#mobj-tex-${object.id}-${tempId}`);
        temp.setAttribute('id', `mobj-tex-${object.id}-${tempId}`);

        //giving unique id to other <use> which were using same <path> id
        let idCount = 0;
        use.forEach((ele) => {
          if (ele.getAttribute('xlink:href') == `#${tempId}`) {
            idCount++;
            let cln = temp.cloneNode(true);
            cln.setAttribute('id', `mobj-tex-${object.id}${idCount}-${tempId}`);
            ele.setAttribute(
              'xlink:href',
              `#mobj-tex-${object.id}${idCount}-${tempId}`
            );
            let defs = svg[0].querySelector('defs');
            defs.appendChild(cln);
          }
        });
      }
    );
  } else if (object instanceof Text) {
    const sentence = object.sentence;

    object.writeElement.html(
      sentence.replace(/\S/g, "<span class='letter'>$&</span>")
    );
    object.writeElement.parent(sceneContainer);
    object.writeElement.position(object.x, object.y);
    object.writeElement.style('font-size', `${object._size}px`);
    object.writeElement.style('color', `${object.fillColor}`);
    //object.writeElement.style('text-stroke-width', `${object._strokeWidth}`); //TODO : not working without -webkit
    object.writeElement.style('opacity', '0'); //to hide text at initialisation
    object.writeElement.style('white-space', 'nowrap'); //TODO : check for animations if breaking
  }
}
