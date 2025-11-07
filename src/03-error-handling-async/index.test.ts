import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test value';
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });

  test('should resolve with different types of values', async () => {
    await expect(resolveValue(42)).resolves.toBe(42);
    await expect(resolveValue(null)).resolves.toBeNull();
    await expect(resolveValue({ key: 'value' })).resolves.toEqual({
      key: 'value',
    });
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Custom error message';
    expect(() => throwError(errorMessage)).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });

  test('should throw an Error instance', () => {
    expect(() => throwError('test')).toThrow(Error);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });

  test('should throw error with custom message', () => {
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });

  test('should throw instance of Error', () => {
    expect(() => throwCustomError()).toThrow(Error);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });

  test('should reject with custom error message', async () => {
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });

  test('should reject with Error instance', async () => {
    await expect(rejectCustomError()).rejects.toThrow(Error);
  });
});
