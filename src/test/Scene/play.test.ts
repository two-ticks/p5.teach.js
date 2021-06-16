/**
 * @jest-environment jsdom
 */

import module = require('p5');
import * as text from '../../lib/MObject/Text';
import * as Play from '../../lib/Scene/play';
import { createText, Text } from '../../lib/MObject/Text';
import { play } from '../../lib/Scene/play';
global.color = require('color');

it('check if play is called with an object of type Text', () => {
  jest.spyOn(Play, 'play').mockImplementation(() => {});
  jest.spyOn(text, 'createText').mockImplementation(
    (...args: any[]) =>
      new Text({
        x: 10,
        y: 10,
        _text: 'text',
        _size: 28
      })
  );
  let fakeText = createText('text');
  expect(createText).toHaveBeenCalledWith('text');
  play(fakeText);
  expect(play).toHaveBeenCalledWith(fakeText);
});
