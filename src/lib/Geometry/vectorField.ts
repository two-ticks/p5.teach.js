import anime from 'animejs';

export class Vector2DField {
  eqn: any;
  thetaRange: number[];
  pathData: any;
  graphObject: any;
  graphContainer: any;
  x: number;
  y: number;
  width_svg: number;
  height_svg: number;
  linePath: SVGPathElement;

  constructor(
    eqn: any,
    thetaRange: number[] = [0, 2 * Math.PI],
    x: number = 10,
    y: number = 10,
    width_svg: number = 300,
    height_svg: number = 300
  ) {
    this.eqn = eqn;
    this.thetaRange = thetaRange;
    this.x = x;
    this.y = y;
    this.width_svg = width_svg;
    this.height_svg = height_svg;
    this.pathData = createPolarSVGPath(eqn, thetaRange);
    this.graphContainer = createElement('div');
    this.linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    this.linePath.setAttribute('fill', 'none');
    this.linePath.setAttribute('stroke', 'black');
    this.linePath.setAttribute('stroke-width', '40');
    this.graphContainer.position(this.x, this.y);
  }
  position(x: number, y: number = 10) {
    this.x = x;
    this.y = y;
    this.graphContainer.position(this.x, this.y);
  }
  size(sizePx: number) {}
  stroke(_stroke: any) {
    this.linePath.setAttribute('stroke', `${_stroke}`);
  }
  plot() {
    this.graphObject = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    //this.graphObject.setAttribute('style', `translate(-50%, -50%)`);
    this.graphObject.setAttribute('width', `${this.width_svg}`);
    this.graphObject.setAttribute('height', `${this.height_svg}`);
    this.graphObject.setAttribute('viewBox', '-8500 -2000 18000 4000');
    this.linePath.setAttribute('d', this.pathData);
    this.graphObject.appendChild(this.linePath);
    this.graphContainer.elt.appendChild(this.graphObject);
  }

  remove() {
    this.graphContainer.elt.removeChild(this.graphObject);
  }

  play(eqn: any) {
    let arrowPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    arrowPath.setAttribute('fill', 'black');
    arrowPath.setAttribute('stroke', 'black');
    arrowPath.setAttribute('stroke-width', '40');
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = '<path transform = "scale(20)" id="arrowhead" d="M7,0 L-7,-5 L-7,5 Z" />';
    this.graphObject.appendChild(defs);
    this.graphObject.appendChild(arrowPath);
    let path = this.linePath;

    // function pointAtLength(l) {
    //   let xy = path.getPointAtLength(l);
    //   return [xy.x, xy.y];
    // }

    // // Approximate tangent
    // function angleAtLength(l) {
    //   var a = pointAtLength(Math.max(l - 0.01, 0)), // this could be slightly negative
    //     b = pointAtLength(l + 0.01); // browsers cap at total length

    //   return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    // }

    //let update = 0;

    let totalLength = this.linePath.getTotalLength();
    let group = totalLength / 200;
    path.style.strokeDasharray = `1500` + (group - 50);
    let start = 0;
    //let arrowheads = this.linePath.querySelectorAll('path');
    let pathObj = this.graphObject;

    let numberArray :number[] = [];

    for (let i :number = 1; i <= 20; i++) {
      numberArray.push(i);
    }

    let counter =0;
    console.log(numberArray);
    numberArray.forEach((element) => {
      counter++;
      let d = counter;
      
      var l = d - offset;

        if (l < 0) {
          l = totalLength + l;
        } else if (l > totalLength) {
          l -= totalLength;
        }
      let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      arrow.setAttribute('href', '#arrowhead');
      arrow.setAttribute(
        'x',
        `${pointAtLength(counter*1000)[1]}`
      );
      arrow.setAttribute(
        'y',
        `${pointAtLength(counter*1000)[2]}`
      );
      console.log(element);
      this.graphObject.appendChild(arrow);
    });
    let arrowheads = pathObj.querySelectorAll('use');
    console.log(arrowheads);
    path.style.strokeDasharray = '500,' + (group - 50);

    requestAnimationFrame(update);

    function update(t) {
      if (!start) {
        start = t;
      }

      var offset = (-group * ((t - start) % 900)) / 900;

      path.style.strokeDashoffset = `${offset}`;

      function transformer(d) {
        var l = d - offset;

        if (l < 0) {
          l = totalLength + l;
        } else if (l > totalLength) {
          l -= totalLength;
        }

        var p = pointAtLength(l);
        return 'translate(' + p + ') rotate( ' + angleAtLength(l) + ')';
      }
      let count = 1;
      arrowheads.forEach((element) => {
        
        element.setAttribute('transform',`${transformer(count)}`);
        console.log('transform', transformer(count));
        
        count++;
      });

      requestAnimationFrame(update);
    }

    function pointAtLength(l) {
      var xy = path.getPointAtLength(l);
      return [xy.x, xy.y];
    }

    // Approximate tangent
    function angleAtLength(l) {
      var a = pointAtLength(Math.max(l - 0.01, 0)), // this could be slightly negative
        b = pointAtLength(l + 0.01); // browsers cap at total length

      return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    }

    //let myPath = anime.path('svg');
    //this.graphObject.appendChild(arrowPath);

    // const arrowDrawing = anime({
    //   targets: '#arrowhead',
    //   //strokeDashoffset: [anime.setDashoffset, 0],
    //   easing: 'easeOutSine',
    //   //duration: 1000,
    //   // translateX: myPath('x'),
    //   // translateY: myPath('y'),
    //   // rotate: myPath('angle'),
    //   begin: function (anim) {
    //     //pathElement[0].setAttribute('stroke', 'black');
    //     //pathElement[0].setAttribute('fill', 'none');
    //   },
    //   complete: function (anim) {
    //     //document.querySelector('path').setAttribute("fill", "yellow");
    //   },
    //   update: function (anim) {
    //     update += 1;

    //     [1, 2, 3].forEach((element) => {
    //       let l = element;
    //       //let arrow = document.createElementNS('', 'use');
    //       arrow.setAttribute('href', '#arrowhead');
    //       arrow.setAttribute(
    //         'transform',
    //         `translate(${pointAtLength(update / 10000)}) rotate(${angleAtLength(
    //           update / 100
    //         )})`
    //       );
    //       //pathObj.appendChild(arrow);
    //     });

    //     let offset = (-group * (update % 900)) / 900;

    //     path.style.strokeDashoffset = `${offset - 10 * update}`;
    //     arrowheads.forEach((element) =>
    //       path.setAttribute('transform', `${tranformer(element)}`)
    //     );
    //     function tranformer(d: number | SVGPathElement) {
    //       var l = d - offset;

    //       if (l < 0) {
    //         l = totalLength + l;
    //       } else if (l > totalLength) {
    //         l -= totalLength;
    //       }

    //       var p = pointAtLength(l);
    //       return 'translate(' + p + ') rotate( ' + angleAtLength(l) + ')';
    //     }
    //   },
    //   autoplay: true,
    //   loop: true
    // });
  }
  //TODO : arrow follower
  arrow(eqn: any) {}
}

function createPolarSVGPath(
  eqn: any,
  thetaRange: number[] = [0, 2 * Math.PI],
  stepSize: number = 0.001
) {
  let minX = 0;
  let scaleX = 100;
  let scaleY = 100;
  let SVG_path = `M${scaleX * eqn(minX) * Math.cos(0)},${
    scaleY * eqn(minX) * Math.sin(0)
  }`;
  for (let theta = thetaRange[0]; theta < thetaRange[1]; theta += stepSize) {
    // SVG_path = SVG_path.concat(` L${1000*i},${1000*Math.sin(Math.PI / 2 * Math.pow(i, 1.5))/i}`);
    SVG_path = SVG_path.concat(
      ` L${scaleX * eqn(theta) * Math.cos(theta)},${
        scaleY * eqn(theta) * Math.sin(theta)
      }`
    );
  }
  return SVG_path;
}

export function create2DVectorField(
  eqn: any,
  thetaRange: number[] = [0, 2 * Math.PI],
  x: number = 10,
  y: number = 10,
  width_svg: number = 300,
  height_svg: number = 300
) {
  const _object = new Vector2DField(
    eqn,
    thetaRange,
    x,
    y,
    width_svg,
    height_svg
  );
  return _object;
}
