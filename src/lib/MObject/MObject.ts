export class MObject {
  writeElement!: p5.Element;
  x: number = 10;
  y: number = 10;
  fillColor: p5.Color;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.fillColor = color('black');
  }
}
