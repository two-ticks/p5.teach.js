/**
 * @jest-environment jsdom
 */

import * as text from '../../lib/MObject/Text';
import * as Add from '../../lib/Scene/add';
import { createText, Text } from '../../lib/MObject/Text';
import { add } from '../../lib/Scene/add';
global.color = require('color');

it('check if add is called with an object of type Text', () => {
  jest.spyOn(Add, 'add').mockImplementation(() => {});
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
  add(fakeText);
  expect(add).toHaveBeenCalledWith(fakeText);
});
