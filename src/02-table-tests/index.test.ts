import { Action, simpleCalculator } from './index';

describe('simpleCalculator', () => {
  const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 10, b: 4, action: Action.Subtract, expected: 6 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 0, b: 5, action: Action.Subtract, expected: -5 },
    { a: 6, b: 7, action: Action.Multiply, expected: 42 },
    { a: 5, b: 5, action: Action.Multiply, expected: 25 },
    { a: 3, b: 4, action: Action.Multiply, expected: 12 },
    { a: 20, b: 4, action: Action.Divide, expected: 5 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 9, b: 3, action: Action.Divide, expected: 3 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  ];

  test.each(testCases)(
    'should return $expected when $a $action $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  const invalidActionCases = [
    { a: 5, b: 3, action: 'invalid' },
    { a: 10, b: 2, action: '%' },
    { a: 1, b: 1, action: null },
    { a: 1, b: 1, action: undefined },
  ];

  test.each(invalidActionCases)(
    'should return null for invalid action: $action',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    },
  );

  const invalidArgumentsCases = [
    { a: 'string', b: 3, action: Action.Add },
    { a: 5, b: null, action: Action.Add },
    { a: undefined, b: 3, action: Action.Add },
    { a: null, b: null, action: Action.Subtract },
    { a: {}, b: 5, action: Action.Multiply },
    { a: 5, b: [], action: Action.Divide },
  ];

  test.each(invalidArgumentsCases)(
    'should return null for invalid arguments: a=$a, b=$b',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    },
  );
});
