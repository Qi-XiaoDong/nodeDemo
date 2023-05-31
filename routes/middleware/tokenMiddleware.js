/**
 * 校验用户是否登录
 */
const getMsg = require("../utils/getSendResult");
const { pathToRegexp } = require("path-to-regexp");

const whiteApis = [
  {
    method: "get",
    path: "/api/login",
  },
  {
    method: "post",
    path: "/api/login",
  },
  {
    method: "post",
    path: "/api/whoami",
  },
];
module.exports = (req, res, next) => {
  const isWhite = whiteApis.some((api) => {
    const reg = pathToRegexp(api.path);
    return (
      api.method.toLocaleUpperCase() === req.method.toLocaleUpperCase() &&
      reg.test(req.path)
    );
  });
  if (isWhite) {
    next();
    return;
  }

  const token = req.cookies.token || req.headers.authorization;
  if (!token) {
    nonTokenHandle(req, res, next);
  } else {
    // 校验token
    // const userId = cryptor.decrypt(token);
    req.userId = token;
    next();
  }
};

function nonTokenHandle(req, res, next) {
  res
    .status(403)
    .send(getMsg.getErr("you don’t have any token to access the api", 403));
}
