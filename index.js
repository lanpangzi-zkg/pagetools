const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');
const path = require('path');
const fs = require('fs-extra');
const createPage = require('./nodeScript/createPage');

const app = new Koa();
const router = new Router();
const staticPath = './dist';

router.get('/sourceCache/:filename', async (ctx) => {
  const filename = ctx.params.filename;
  ctx.set('Content-Type', 'text/plain;charset=utf-8');
  ctx.set('Content-Disposition', `attachment;filename=${filename}`);
  const filePath = path.resolve(__dirname, `sourceCache/${filename}`);
  const code = await fs.readFileSync(filePath);
  ctx.body = code;
  fs.remove(filePath);
});

app.use(bodyparser());

app.use(static(
  path.join( __dirname, staticPath)
));

// 跨域预检测
router.options('/generatePage', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Request-Headers', 'Content-Type');
  await next();
  ctx.body = 'ok';
});

// 生成页面请求
router.post('/generatePage', async (ctx, next) => {
  await next();
  const body = ctx.body;
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Content-Type', 'application/json');
  ctx.set('Access-Control-Request-Headers', 'Content-Type');
  const responseMsg = await createPage(body);
  ctx.body = responseMsg;
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx) => { // 解析post请求参数
    ctx.body =  ctx.request.body;
});

app.listen(process.env.PORT || 8888);