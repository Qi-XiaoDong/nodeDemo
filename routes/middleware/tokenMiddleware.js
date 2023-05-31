/**
 * 校验用户是否登录
 */
const getMsg = require("../utils/getSendResult");
const { pathToRegexp } = require("path-to-regexp");
const jwt = require("../utils/jwt");
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

  // 校验token
  const result = jwt.verify(req);
  if (result) {
    req.userId = result.id;
    next();
  } else {
    //认证失败
    nonTokenHandle(req, res, next);
  }
};

function nonTokenHandle(req, res, next) {
  res
    .status(403)
    .send(getMsg.getErr("you don’t have any token to access the api", 403));
}
