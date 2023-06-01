const Koa = require("koa");
const app = new Koa();

// 静态资源

const compose = require("koa-compose");
const middlewareList = require("./middleware");

app.use(async (ctx, next) => {
  ctx.body = "hello world";
  await next();
});
app.use(compose(middlewareList));

app.listen(3000,() => {
  console.log("启动了")
});
