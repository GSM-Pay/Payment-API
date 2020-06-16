// import Koa.js related package
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import router from './router';

const app = new Koa();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

export default app;