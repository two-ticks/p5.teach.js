// import p5 from 'p5';

//IBM's color blind safe palette https://github.com/IBM-Design/colors
export const ULTRAMARINE40 = '#648fff';
export const MAGENTA50 = '#dc267f';
export const GOLD20 = '#ffb000';
export const INDIGO50 = '#785ef0';
export const ORANGE40 = '#fe6100';

export const safeColor = {
  ULTRAMARINE40: '#648fff',
  MAGENTA50: '#dc267f',
  GOLD20: '#ffb000',
  INDIGO50: '#785ef0',
  ORANGE40: '#fe6100'
};

export let sceneContainer: HTMLDivElement;
interface ISceneVariables {
  isGraph: any;
  graph: any;
  currentSVG: SVGSVGElement;
  currStrokeColor: p5.Color | string;
  currStrokeWidth: string;
  currFillColor: p5.Color | string;
  currAngle: number;
  selectedPoint: any;
  currentPolygon;
  currentPalette: string[];
}
export let sceneVariables: ISceneVariables = {
  isGraph: 'false',
  graph: 'false',
  currentSVG: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  currStrokeColor: 'black',
  currStrokeWidth: '1',
  currFillColor: 'none',
  currAngle: 0,
  selectedPoint: document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  ),
  currentPolygon: 'false',
  currentPalette: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0']
};
//export

export function colorPalette(palette: string) {
  switch (palette) {
    case 'red-blue':
      sceneVariables.currentPalette = [
        '#ca0020',
        '#f4a582',
        '#f7f7f7',
        '#92c5de',
        '#0571b0'
      ];
      break;

    case 'red-yellow-blue':
      sceneVariables.currentPalette = [
        '#d7191c',
        '#fdae61',
        '#ffffbf',
        '#abd9e9',
        '#2c7bb6'
      ];
      break;

    case 'purple-red-green':
      sceneVariables.currentPalette = [
        '#7b3294',
        '#c2a5cf',
        '#f7f7f7',
        '#a6dba0',
        '#008837'
      ];
      break;

    default:
      sceneVariables.currentPalette = [
        '#ca0020',
        '#f4a582',
        '#f7f7f7',
        '#92c5de',
        '#0571b0'
      ];
  }

  sceneVariables.currStrokeColor = sceneVariables.currentPalette[0];

  //sceneVariables.currFillColor = sceneVariables.currentPalette[0];
}

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
