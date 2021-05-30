import { add } from '../lib/Scene/add';
import { TeX } from '../lib/MObject/TeX';
import { shift } from '../lib/Scene/shift';

it('sample test', () => {
  //expect(add(2, 3)).toBe(5);
});

it('should not accept the wrong argument type', () => {
  const arg1 = new TeX('abc');
  const arg2 = 234;
  const arg3 = 123;

  const testSomeFunction = () => {
    shift(arg1, arg2, arg3);
  };
  expect(testSomeFunction);
});

