const { log } = require('console')
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use("/login",(req, res, next) => {
    console.log(req.userId)
    res.send("登录接口")
})
// define the home page route
router.get('/loginOut', (req, res) => {
  res.send('登出接口')
})
// define the about route
router.get('/whoamI', (req, res) => {
  res.send('兑换用户信息')
})

module.exports = router