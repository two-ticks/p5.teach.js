import p5 from "p5";

export let sceneContainer: HTMLDivElement;
interface ISceneVariables {
  isGraph: any,
  graph : any,
  currentSVG: SVGSVGElement,
  currStrokeColor: p5.Color | string,
  currStrokeWidth: string,
  currFillColor: p5.Color | string,
  currAngle: number,
  selectedPoint: any,
  currentPolygon
};
export let sceneVariables : ISceneVariables = {
  isGraph: 'false',
  graph : 'false',
  currentSVG: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  currStrokeColor: 'black',
  currStrokeWidth: '1',
  currFillColor: 'none',
  currAngle: 0,
  selectedPoint : document.createElementNS('http://www.w3.org/2000/svg', 'circle'), 
  currentPolygon : 'false'
};
//export

export class Scene {
  constructor() {
    //console.log(p5Canvas);
    sceneContainer = document.createElement('div');
    //sceneContainer.setAttribute('overflow', 'hidden');
    sceneContainer.setAttribute('class', 'p5teach');
    // sceneContainer.style.overflow = value;
    sceneContainer.style.left = 0 + 'px';
    sceneContainer.style.top = 0 + 'px';
    sceneContainer.style.position = 'absolute';
    sceneContainer.style.fill = 'none';
    // sceneContainer.style.width = 0 + 'px';
    // sceneContainer.style.height = 0 + 'px';
    // sceneContainer.setAttribute(
    //   'style',
    //   `position: absolute; left: 0 px; top: 0 px; `
    // );
    // sceneContainer.setAttribute('height', `${p5Canvas.height}px`);
    // sceneContainer.setAttribute('left', `${p5Canvas.x}px`);
    // sceneContainer.setAttribute('top', `${p5Canvas.y}px`);
    document.body.appendChild(sceneContainer);
  }

  remove() {
    document.body.removeChild(sceneContainer);
  } //TODO : remove scene

  async delay(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * sec)); //sec to ms
  }
}

export function overflow(value) {
  if (value === 'visible') {
    sceneContainer.style.overflow = value;
  } else if (value === 'hidden') {
    let p5Canvas = document
      .getElementsByClassName('p5Canvas')[0]
      .getBoundingClientRect();

    sceneContainer.style.overflow = value;
    sceneContainer.style.left = p5Canvas.x + 'px';
    sceneContainer.style.top = p5Canvas.y + 'px';
    sceneContainer.style.width = p5Canvas.width + 'px';
    sceneContainer.style.height = p5Canvas.height + 'px';
  }
}
