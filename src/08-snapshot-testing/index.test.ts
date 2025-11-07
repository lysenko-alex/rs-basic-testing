import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const result = generateLinkedList(values);

    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from empty array', () => {
    const values: number[] = [];
    const result = generateLinkedList(values);

    expect(result).toStrictEqual({
      value: null,
      next: null,
    });
  });

  test('should generate linked list with single element', () => {
    const values = [42];
    const result = generateLinkedList(values);

    expect(result).toStrictEqual({
      value: 42,
      next: {
        value: null,
        next: null,
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = ['a', 'b', 'c', 'd'];
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });

  test('should generate linked list from numbers with snapshot', () => {
    const values = [10, 20, 30, 40, 50];
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });

  test('should generate linked list from empty array with snapshot', () => {
    const values: string[] = [];
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
