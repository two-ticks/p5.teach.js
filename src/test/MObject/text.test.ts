/**
 * @jest-environment jsdom
 */
import { createText } from '../../lib/MObject/Text';
import { Color } from 'p5';
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
  }).toThrow('Size should be a whole number');
});

it('createText should throw error if size < 0', () => {
  expect(() => {
    createText('sentence', 10, 20, -500);
  }).toThrow('Size should be a whole number');
});
