/**
 * @jest-environment jsdom
 */
import { createText } from '../../lib/MObject/Text';
global.color = require('color');
global.createElement = jest.fn();

it('createText should return a object of class Text', () => {
  expect(createText('text')).toEqual({
    x: 10,
    y: 10,
    sentence: 'text',
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
  const text = createText('text', 10, 20, 200, 500);
  const spy = jest.spyOn(text, 'fill');
  text.fill();

  expect(spy).toHaveBeenCalled();
  expect(text.fill()).toEqual({ model: 'rgb', color: [0, 0, 0], valpha: 1 });
});

it('size without argument should return size in px', () => {
  const text = createText('text', 10, 20, 200, 500);
  const spy = jest.spyOn(text, 'size');
  text.size();

  expect(spy).toHaveBeenCalled();
  expect(text.size()).toEqual(200);
});

it('position without argument should return x, y', () => {
  const text = createText('text', 10, 20, 200, 500);
  const spy = jest.spyOn(text, 'position');
  text.position();
  expect(spy).toHaveBeenCalled();
  expect(text.position()).toEqual([10, 20]);
});

it('play should be called', () => {
  const text = createText('2^2');
  const spy = jest.spyOn(text, 'play').mockImplementation(() => {});
  text.play();
  expect(spy).toHaveBeenCalled();
});

it('add should be called', () => {
  const text = createText('text');
  const spy = jest.spyOn(text, 'add').mockImplementation(() => {});
  text.add();
  expect(spy).toHaveBeenCalled();
});

it('remove should be called', () => {
  const text = createText('text');
  const spy = jest.spyOn(text, 'remove').mockImplementation(() => {});
  text.remove();
  expect(spy).toHaveBeenCalled();
});
