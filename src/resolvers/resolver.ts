import * as crypto from 'crypto';

import * as redis from 'redis';
import * as uuid from 'uuid';

import { user } from '../models';

const client = redis.createClient({
    host: process.env.REDIS_HOST
});

const resolver = {
    Query: {

    },
    Mutation: {
        Login: async (_: any, {id, pw}: any, ctx: any) => {
            const data = ctx.request.body;
            const hash = crypto.createHash('sha512');
            hash.update(data.pw);
            data.pw = hash.digest('hex');

            const result = await user.findOne({ where: data, attributes: ['pid'] });

            ctx.assert(result, 400);

            const session = uuid.v4();

            if (!(await client.set(session, result.pid.toString()))) {
                ctx.throw(500);
            }

            return {data: session}
        }
    }
};

export {
    resolver,
};