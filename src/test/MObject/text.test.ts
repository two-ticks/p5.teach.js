import { createText } from '../../lib/MObject/Text';

it.todo('shift should not accept the wrong argument type');

it('createText should return a object of class Text', () => {
  expect(createText('text')).toEqual({
    _fill: 'black',
    sentence: 'text',
    sizePx: 28,
    x: 10,
    y: 10
  });
});

it('createText should throw error if size < 0', () => {
  expect(() => {
    createText('sentence', 10, 20, -500);
  }).toThrow('Size should be a whole number');
});
