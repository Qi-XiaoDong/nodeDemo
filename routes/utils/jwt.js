// 提供 颁发jwt和 校验jwt有效性的工具
const secret = "qiXiaoDong";
const cookieKey = "token";
const headerKey = "authorization";
var jwt = require("jsonwebtoken");
/**
 *
 * @param {*} info  jwt payload
 */
exports.publish = (res, maxAge = 36000 * 24, info = {}) => {
  var token = jwt.sign(info, secret, {
    expiresIn: maxAge,
  });
  //token 设置在cookie
  res.cookie(cookieKey, token, {
    maxAge: maxAge,
    path: "/",
  });
  //token 添加在header中
  res.header(headerKey, token);
};
/**
 * 校验jwt
 * @param {*} req 请求对象
 * @returns
 */
exports.verify = (req) => {
  let token = req.cookies[cookieKey] || req.header[headerKey];

  if (!token) {
    return null;
  } else {
    // authorization: bearer token
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];
  }

  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (error) {
    return null;
  }
};
