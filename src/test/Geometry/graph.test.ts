/**
 * @jest-environment jsdom
 */

// // const p5Mock = p5 as jest.MockedClass<typeof p5>;

//import p5 from 'p5';

import p5 from 'p5';
import { create2DGraph, Graph2D } from '../../lib/Geometry/graph';

// const graph = require('../../lib/Geometry/graph');
global.createElement = jest.fn();
global.abs = jest.fn((...args) => {
  return Math.abs(...args);
});

it.skip('create2DGraph should return a object of class GObject', () => {
  // console.log(
  //   create2DGraph(
  //     (t) =>
  //       Math.cos(t) -
  //       Math.pow(t, 2) / 6 +
  //       Math.pow(t, 4) / 24 +
  //       Math.pow(t, 6) / 720
  //   )
  // );
  expect(
    create2DGraph(
      (t) =>
        Math.cos(t) -
        Math.pow(t, 2) / 6 +
        Math.pow(t, 4) / 24 +
        Math.pow(t, 6) / 720
    )
  ).toEqual({
    _size: 28,
    x: 10,
    y: 10,
    sentence: '2^2',
    svgEquation:
      '<svg style="vertical-align: 0" xmlns="http://www.w3.org/2000/svg" width="2.119ex" height="2ex" role="img" focusable="false" viewBox="0 -883.9 936.6 883.9" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="MJX-1-TEX-N-32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><use data-c="32" xlink:href="#MJX-1-TEX-N-32"></use></g><g data-mml-node="mn" transform="translate(533,413) scale(0.707)"><use data-c="32" xlink:href="#MJX-1-TEX-N-32"></use></g></g></g></g></svg>',
    fillColor: { model: 'rgb', color: [0, 0, 0], valpha: 1 },
    _strokeWidth: 8,
    strokeColor: { model: 'rgb', color: [0, 0, 0], valpha: 1 }
  });
});
