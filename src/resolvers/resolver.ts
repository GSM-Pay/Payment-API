import * as crypto from 'crypto';

import { IResolvers } from 'apollo-server-koa';
import * as redis from 'redis';
import * as uuid from 'uuid';

import { transaction, user, booth } from '../models';
import * as sequelize from 'sequelize';

const client = redis.createClient({
  host: process.env.REDIS_HOST
});

const resolver: IResolvers = {
    Query: {
        me: async (_, __, { ctx }) => ctx.user,
        users: async (_, __, { ctx }) => {
            if (!ctx.user) return null;

            const users = await user.findAll();

            return users;
        },
        booth: async (_, { bid }, { ctx }) => {
            if (!ctx.user) return null;

            const _booth = await booth.findOne({
                where: {
                    bid: bid,
                },
            });

            return _booth;
        },
        booths: async (_, __, { ctx }) => {
            if (!ctx.user) return null;

            const booths = await booth.findAll();

            return booths;
        },
        myBooths: async (_, __, { ctx }) => {
            if (!ctx.user) return null;

            const booths = await booth.findAll({
                where: {
                    pid: ctx.user.pid,
                }
            });

            return booths;
        },
        transactions: async (_, __, { ctx }) => {
            if (!ctx.user) return null;

            const transactions = await transaction.findAll();

            const result = await Promise.all(
                transactions.map(async (value, index) => {
                    let _user = await user.findOne({
                        where: {
                            pid: parseInt(value.pid.toString())
                        }
                    });
    
                    let _booth = await booth.findOne({
                        where: {
                            bid: parseInt(value.bid.toString()),
                        },
                    });
    
                    let transaction = {
                        tid: value.tid,
                        user: _user,
                        booth: _booth,
                        amount: value.amount,
                        createdAt: value.createdAt,
                        updatedAt: value.updatedAt,
                    }
    
                    return transaction;
                }),
            );

            return result;
        },
        transactionsInBooth: async (_, { bid }, { ctx }) => {
            if (!ctx.user) return null;

            const transactions = await transaction.findAll({
                where: {
                    bid: bid
                }
            });

            return transactions;
        },
        transactionsInUser: async (_, __, { ctx }) => {
            if (!ctx.user) return null;

            const user = ctx.user;

            const transactions = await transaction.findAll({
                where: {
                    pid: user.pid,
                }
            });

            return transactions;
        }
    },
    Mutation: {
        refund: async(_:any, { tid }: any, { ctx }) => {
            if (!ctx.user) return null

            const user = await transaction.findOne({ where: {
                tid: tid
            }})
            if (!user) return null

            await transaction.destroy({ where: {
                tid : tid
            }
            })

            return user
        },
        createTransaction: async (_: any, { bid, amount }: any, { ctx }) => {
            const pid = ctx.user.pid;

            let _user = await user.findOne({
                where: {
                    pid: parseInt(ctx.user.pid.toString())
                }
            });

            let _booth = await booth.findOne({
                where: {
                    bid: parseInt(bid.toString()),
                },
            });
            
            const createdTransaction = await transaction.create({
                booth: _booth,
                user: _user,
                amount: -amount
            });

            const updatedUser = await user.update({ amount: sequelize.literal(`amount - ${amount}`) }, { where: { pid: pid } });
            if (!updatedUser.length) return null;
            return createdTransaction;
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