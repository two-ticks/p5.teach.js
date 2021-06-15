/**
 * @jest-environment jsdom
 */

import { play } from '../../lib/Scene/play';
import { Text, createText } from '../../lib/MObject/Text';
import p5 from 'p5';
global.color = require('color');

it.todo('shift should not accept the wrong argument type');

it.skip('check if play is called with an object', () => {
  //Text.mockFn();
  const fakeText = createText('fake text');

  console.log(play(fakeText, 'write'));
});
