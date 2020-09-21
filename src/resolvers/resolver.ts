import * as crypto from 'crypto';

import * as redis from 'redis';
import * as uuid from 'uuid';

import { transaction, user } from '../models'

const client = redis.createClient({
    host: process.env.REDIS_HOST
});

const resolver = {
    Query: {

    },
    Mutation: {
        refund: async(_:any, { tid }: any) => {
            const destroyId = await transaction.findOne({ where: {
                tid:tid
            }
                
            })
            await transaction.destroy({ where: {
                tid : tid
            }
            })

            return destroyId
        },
        Login: async (_: any, {id, pw}: any, { ctx }: any) => {
            const hash = crypto.createHash('sha512');
            hash.update(pw);
            pw = hash.digest('hex');

            const result = await user.findOne({ where: { id: id, pw: pw }, attributes: ['pid'] });
            if (!result) return {data: null}

            const session = uuid.v4();

            if (!(await client.set(session, result.pid.toString()))) {
                return {data: null}
            }

            return { data: session }
        }
    }
};

export {
    resolver,
};