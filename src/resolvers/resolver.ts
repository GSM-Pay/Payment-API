import { transaction, user } from '../models';
import { IResolvers } from 'apollo-server-koa';

const resolver: IResolvers = {
    Query: {

    },
    Mutation: {
        createTransaction: async (_: any, { bid, amount }: any, { ctx }) => {
            const pid = ctx.user.pid;

            const createdTransaction = await transaction.create({
                bid: bid,
                pid: pid,
                amount: amount
            });

            const updatedUser = await user.update({ amount: amount }, { where: { pid: pid } });
            if (!updatedUser.length) return null;
            return createdTransaction;
        }
    }
};

export {
    resolver,
};