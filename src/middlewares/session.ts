import { Context, Next } from 'koa';

import * as redis from 'redis';

import { user } from '../models';

const client = redis.createClient({
  host: process.env.REDIS_HOST
});

const sessionCreator = async (ctx: Context, next: Next) => {
  if (ctx.request.headers.authorization) {
    await new Promise(resolve => {
      client.get(ctx.request.headers.authorization, async (err, pid) => {
        if (err) ctx.throw(500);
        ctx.user = pid ? await user.findByPk(pid) : null;
        await next();
        resolve();
      });
    });
  } else {
    ctx.user = null;
    await next();
  }
};

export default sessionCreator;