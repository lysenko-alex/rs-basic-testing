import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

jest.mock('fs');
jest.mock('fs/promises');

jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(callback, interval);
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const mockJoin = join as jest.MockedFunction<typeof join>;
    const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;

    mockJoin.mockReturnValue('/mocked/path/test.txt');
    mockExistsSync.mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistent.txt';
    const mockJoin = join as jest.MockedFunction<typeof join>;
    const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;

    mockJoin.mockReturnValue('/mocked/path/nonexistent.txt');
    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(mockExistsSync).toHaveBeenCalledWith('/mocked/path/nonexistent.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'existing.txt';
    const fileContent = 'File content';
    const mockJoin = join as jest.MockedFunction<typeof join>;
    const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
    const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;

    mockJoin.mockReturnValue('/mocked/path/existing.txt');
    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(mockExistsSync).toHaveBeenCalledWith('/mocked/path/existing.txt');
    expect(mockReadFile).toHaveBeenCalledWith('/mocked/path/existing.txt');
    expect(result).toBe(fileContent);
  });
});
