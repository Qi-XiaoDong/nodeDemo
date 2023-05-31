/**
 * 校验用户是否登录
 */
const getMsg = require("../utils/getSendResult");

const whiteObj = [
  {
    method: "post",
    path: "api/login",
  },
  {
    method: "post",
    path: "api/login",
  },
  {
    method: "post",
    path: "api/login",
  },
];
module.exports = (req, res, next) => {
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
