/**
 * @jest-environment jsdom
 */
import { createText } from '../../lib/MObject/Text';
global.color = require('color');

it.todo('shift should not accept the wrong argument type');

it('createText should return a object of class Text', () => {
  expect(createText('text')).toEqual({
    x: 10,
    y: 10,
    _text: 'text',
    _size: 28,
    fillColor: { model: 'rgb', color: [0, 0, 0], valpha: 1 }
  });
});

it('createText should throw error if size < 0', () => {
  expect(() => {
    createText('sentence', 10, 20, -500);
  }).toThrow('size of text should be a whole number!');
});

it('createText should throw error if size < 0', () => {
  expect(() => {
    createText('sentence', 10, 20, -500);
  }).toThrow('size of text should be a whole number!');
});

it('fill without argument should return object of type p5.Color', () => {
  const tex = createText('2^2', 10, 20, 200, 500);
  const spy = jest.spyOn(tex, 'fill');
  tex.fill();

  expect(spy).toHaveBeenCalled();
  expect(tex.fill()).toEqual({ model: 'rgb', color: [0, 0, 0], valpha: 1 });
});

it('size without argument should return size in px', () => {
  const tex = createText('text', 10, 20, 200, 500);
  const spy = jest.spyOn(tex, 'size');
  tex.size();

  expect(spy).toHaveBeenCalled();
  expect(tex.size()).toEqual(200);
});

it('position without argument should return width, height', () => {
  const tex = createText('2^2', 10, 20, 200, 500);
  const spy = jest.spyOn(tex, 'position');
  tex.position();
  expect(spy).toHaveBeenCalled();
  expect(tex.position()).toEqual([10, 20]);
});
