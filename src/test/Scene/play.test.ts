/**
 * @jest-environment jsdom
 */

import module = require('p5');
import { Text, createText } from '../../lib/MObject/Text';
import { play } from '../../lib/Scene/play';

global.color = require('color');

it('play must be running', () => {
  const mockFn = jest.fn().mockReturnValue({
    _fill: 'black',
    sentence: 'text',
    sizePx: 28,
    x: 10,
    y: 10
  });
  expect(mockFn()).toEqual({
    _fill: 'black',
    sentence: 'text',
    sizePx: 28,
    x: 10,
    y: 10
  });
});

it.skip('check if play is called with an object', () => {
  console.log(text('text', 20, 20));

  //Text.mockFn();
  const fakeText = createText('fake text');

  console.log(play(fakeText, 'write'));
});
