export class Text {
  writeTextElement: any;
  textWrapper: any;
  x: number;
  y: number;
  sentence: string;
  sizePx: number; //px

  constructor(
    sentence: string,
    x: number = 10,
    y: number = 10,
    sizePx: number = 28
  ) {
    this.x = x;
    this.y = y;
    this.sentence = sentence;
    this.sizePx = sizePx;
  }

  position(x: number, y: number = 10) {
    this.x = x;
    this.y = y;
    //this.writeTextElement.position(this.x, this.y);
  }
  size(sizePx: number) {
    this.sizePx = sizePx;
  }
}

export function createText(
  sentence: string,
  x: number = 10,
  y: number = 10,
  sizePx: number = 28 //px
) {
  const _object = new Text(sentence, x, y, sizePx);
  return _object;
}
