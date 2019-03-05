const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();
const staticPath = './dist';

app.use(static(
  path.join( __dirname, staticPath)
))

router.options('/generatePage', async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Request-Headers', 'Content-Type');
  ctx.body = 'ok';
});
router.post('/generatePage', async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Content-Type', 'application/json');
  ctx.set('Access-Control-Request-Headers', 'Content-Type');
  ctx.body = {
    code: 0,
    message: 'success',
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 8888);