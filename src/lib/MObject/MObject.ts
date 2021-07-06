export class MObject {
  writeElement!: p5.Element; // <div> for animation 
  sentence: string; //input string as tex or text
  x: number = 10;
  y: number = 10;
  fillColor: p5.Color;
  constructor(sentence: string, x: number, y: number) {
    this.sentence = sentence;
    this.x = x;
    this.y = y;
    this.fillColor = color('black');
  }
}
