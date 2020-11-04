import ajax from 'src/request';

function LoginAPI() {}

// 登录
LoginAPI.prototype.login = function (reqBody) {
  const _req = {
    url: '/user/v1/login',
    method: 'POST',
    data: reqBody,
  };
  return ajax(_req);
};

// 检测token
LoginAPI.prototype.checkToken = function (reqBody) {
  const _req = {
    url: '/oauth/check_token',
    method: 'POST',
    data: reqBody,
  };
  return ajax(_req);
};

export default new LoginAPI();
