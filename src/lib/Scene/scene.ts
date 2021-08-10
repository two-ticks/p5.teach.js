export let sceneContainer: HTMLDivElement;
export let sceneVariables = {
  isGraph: 'false',
  currentSVG: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  currStrokeColor: 'black',
  currStrokeWidth: '1'
};
//export

export class Scene {
  constructor() {
    let p5Canvas = document
      .getElementsByClassName('p5Canvas')[0]
      .getBoundingClientRect();
    //console.log(p5Canvas);
    sceneContainer = document.createElement('div');
    //sceneContainer.setAttribute('overflow', 'hidden');
    sceneContainer.setAttribute('class', 'sceneContainer');

    sceneContainer.setAttribute(
      'style',
      `overflow: hidden; position: absolute; left: ${p5Canvas.x}px; top: ${p5Canvas.y}px; width: ${p5Canvas.width}px; height : ${p5Canvas.height}px`
    );
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
