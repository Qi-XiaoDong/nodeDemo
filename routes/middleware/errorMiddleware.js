const getMsg = require('../utils/getSendResult')
module.exports = (err, req, res, next) => {
  if (err) {
    const errObj = {
      code: 500,
      msg: err instanceof Error ? err.message : err,
    };
    //发生了错误
    res.status(500).send(getMsg.getErr(errObj));
  } else {
    next();
  }
};
