const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../utils/getSendResult");
const { delay } = require("../utils/delay");
const jwt = require("../utils/jwt");
// middleware that is specific to this router
router.use(
  "/login",
  asyncHandler(async (req, res, next) => {
    const result = { value: "23" };
    await delay(2000);
    if (result) {
      let value = result.value;
      jwt.publish(res, 3600 * 24, { id: "23" });
    }
    return result;
  })
);
// define the home page route
router.get("/loginOut", (req, res) => {
  res.send("登出接口");
});
// define the about route
router.get("/whoamI", (req, res) => {
  res.send("兑换用户信息");
});

module.exports = router;
