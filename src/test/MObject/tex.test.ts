/**
 * @jest-environment jsdom
 */

import { createTeX, TeX } from '../../lib/MObject/TeX';
//import * as tex from '../../lib/MObject/TeX';

const tex = require('../../lib/MObject/TeX');
global.color = require('color');
global.createElement = jest.fn();

// let createTeXMock = jest
//   .spyOn(tex, 'createTeX')
//   .mockImplementation((...args) => 0);

it('createTeX should return a object of class TeX', () => {
  // console.log(createTeX('2^2'));
  // tex.createTeX = jest.fn(() => {
  //   return {
  //     _size: 28,
  //     x: 10,
  //     y: 10,
  //     sentence: '2^2',
  //     svgEquation:
  //       '<svg style="vertical-align: 0" xmlns="http://www.w3.org/2000/svg" width="2.119ex" height="2ex" role="img" focusable="false" viewBox="0 -883.9 936.6 883.9" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="MJX-1-TEX-N-32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><use data-c="32" xlink:href="#MJX-1-TEX-N-32"></use></g><g data-mml-node="mn" transform="translate(533,413) scale(0.707)"><use data-c="32" xlink:href="#MJX-1-TEX-N-32"></use></g></g></g></g></svg>',
  //     fillColor: { model: 'rgb', color: [0, 0, 0], valpha: 1 },
  //     _strokeWidth: 8,
  //     strokeColor: { model: 'rgb', color: [0, 0, 0], valpha: 1 }
  //   };
  // });
  expect(createTeX('2^2')).toEqual({
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

  // expect(createTeX('2^2')).toEqual({
  //   _size: 28,
  //   x: 10,
  //   y: 10,
  //   sentence: '2^2',
  //   svgEquation:
  //     '<svg style="vertical-align: 0" xmlns="http://www.w3.org/2000/svg" width="2.119ex" height="2ex" role="img" focusable="false" viewBox="0 -883.9 936.6 883.9" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="MJX-1-TEX-N-32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"></path></defs><g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="msup"><g data-mml-node="mn"><use data-c="32" xlink:href="#MJX-1-TEX-N-32"></use></g><g data-mml-node="mn" transform="translate(533,413) scale(0.707)"><use data-c="32" xlink:href="#MJX-1-TEX-N-32"></use></g></g></g></g></svg>',
  //   fillColor: { model: 'rgb', color: [0, 0, 0], valpha: 1 },
  //   _strokeWidth: 8,
  //   strokeColor: { model: 'rgb', color: [0, 0, 0], valpha: 1 }
  // });
});

it('fill without argument should return object of type p5.Color', () => {
  const tex = createTeX('2^2', 10, 20, 200, 500);
  const spy = jest.spyOn(tex, 'fill');
  tex.fill();

  expect(spy).toHaveBeenCalled();
  expect(tex.fill()).toEqual({ model: 'rgb', color: [0, 0, 0], valpha: 1 });
});

it('size without argument should return size in px', () => {
  const tex = createTeX('text', 10, 20, 20);
  const spy = jest.spyOn(tex, 'size');
  tex.size();

  expect(spy).toHaveBeenCalled();
  expect(tex.size()).toEqual(20);
});

it('position without argument should return x, y', () => {
  const tex = createTeX('text', 10, 20, 20);
  const spy = jest.spyOn(tex, 'position');
  tex.position();
  expect(spy).toHaveBeenCalled();
  expect(tex.position()).toEqual([10, 20]);
});

it('play should be called', () => {
  const tex = createTeX('2^2');
  const spy = jest.spyOn(tex, 'play').mockImplementation(() => {});
  tex.play();
  expect(spy).toHaveBeenCalled();
});

it('add should be called', () => {
  const tex = createTeX('2^2');

  //const element = createDiv();
  //global.createDiv = function(html){return element}

  const spy = jest.spyOn(tex, 'add').mockImplementation(() => {});
  tex.add();
  expect(spy).toHaveBeenCalled();
});

it('remove should be called', () => {
  const tex = createTeX('2^2');
  const spy = jest.spyOn(tex, 'remove').mockImplementation(() => {});
  tex.remove();
  expect(spy).toHaveBeenCalled();
});
