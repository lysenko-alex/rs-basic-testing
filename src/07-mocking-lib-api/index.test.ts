import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: { key: 'value' } });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });

    (axios.create as jest.Mock) = mockCreate;

    await throttledGetDataFromApi('/posts');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: { key: 'value' } });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });

    (axios.create as jest.Mock) = mockCreate;

    const path = '/posts/1';
    await throttledGetDataFromApi(path);

    expect(mockGet).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const mockData = { userId: 1, id: 1, title: 'Test post' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    const mockCreate = jest.fn().mockReturnValue({ get: mockGet });

    (axios.create as jest.Mock) = mockCreate;

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
