import { transaction, user } from '../models';

const resolver = {
    Query: {

    },
    Mutation: {
        createTransaction: async (_: any, { bid, amount }: any) => {
            const pid = 0

            const createdTransaction = await transaction.create({
                bid: bid,
                pid: pid,
                amount: amount
            })

            const updatedUser = await user.update({ amount: amount }, { where: { pid: pid } })
            if (!updatedUser.length) throw new ForbiddenError()
            return createdTransaction
        }
    }
};

export {
    resolver,
};