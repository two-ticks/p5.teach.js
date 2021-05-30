import TeXToSVG from 'tex-to-svg';

//TODO : duration automation and clear

export class TeX {
  writeTexElement: any;
  SVGEquation: any;
  //timeDuration: number; // left for later decision -> need not specify such details at initialisation
  x: number = 10;
  y: number = 10;
  width_svg: number;
  height_svg: number;
  sentence: string;
  constructor(
    sentence: string,
    //timeDuration: number,
    x: number = 10,
    y: number = 10,
    width_svg: number = 300,
    height_svg: number = 300
  ) {
    //this.timeDuration = timeDuration;
    this.x = x;
    this.y = y;
    this.sentence = sentence;
    this.width_svg = width_svg;
    this.height_svg = height_svg;
    this.SVGEquation = TeXToSVG(sentence);
  }

  

  // all_at_once(timeDuration: number) {
    
  // }

  // write(timeDuration: number) {
    
  // }

  // position and scaling methods

}
