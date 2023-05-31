const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// 拦截静态资源
const staticRoot = path.resolve(__dirname, "../public");
app.use("/static", express.static(staticRoot));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(require(path.resolve(__dirname,"./middleware/tokenMiddleware")))

// 请求类型
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require(path.resolve(__dirname, "./api/admin")));

app.use(require(path.resolve(__dirname, "./middleware/errorMiddleware")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
