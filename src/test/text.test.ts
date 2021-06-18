// import { TeX } from '../lib/MObject/TeX';
import { Text, createText } from '../lib/MObject/Text';

it.todo('createText returns an object');
// .toReturn()

test('createText called with args', () => {
  let arg1 = 'text',
    arg2 = 50,
    arg3 = 300,
    arg4 = 300;
  const text = jest.fn((arg1, arg2, arg3, arg4) =>
    // createText('text', 50, 300, 300)
    createText(arg1, arg2, arg3, arg4)
  );
  text(arg1, arg2, arg3, arg4);
  const agr5 = (arg1: string, arg2: number, arg3: number, arg4: number) => {
    return new Text(arg1, arg2, arg3, arg4);
  };
  expect(text).toHaveBeenCalledWith(arg1, arg2, arg3, arg4);
});
