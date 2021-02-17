import request from '../utils/fetcher';

export const getUser = () => {
  return request('/api/user');
};

export const getBin = () => {
  return request('https://httpbin.org/get');
};
