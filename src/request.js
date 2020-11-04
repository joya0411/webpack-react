import axios from 'axios';

const ajax = (request) => {
  const _req = {
    baseURL: request.gateway || __GATEWAY__,
    url: request.url,
    method: request.method || 'GET',
    headers: {},
  };

  request.data && (_req.data = request.data);
  return axios(_req);
};

export default ajax;
