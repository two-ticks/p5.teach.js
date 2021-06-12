/**
 * @jest-environment jsdom
 */

import { createText } from '../../lib/MObject/Text';
import { play } from '../../lib/Scene/play';

// it.only('play must be running',() => {
//     const mockFn = jest.fn().mockReturnValue({
//         _fill: 'black',
//         sentence: 'text',
//         sizePx: 28,
//         x: 10,
//         y: 10
//       });
//     expect(mockFn()).toEqual({
//         _fill: 'black',
//         sentence: 'text',
//         sizePx: 28,
//         x: 10,
//         y: 10
//       });
// });

test('check if play is called with an object', () => {
  const fakeText = createText('fake text');
  expect(fakeText.play('write')).toBeCalledWith(
    expect.objectContaining({
      sentence: expect.any(String)
    })
  );
});
