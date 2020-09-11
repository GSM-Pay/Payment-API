import { IResolvers } from "apollo-server-koa";
import { transaction } from "../models";

const resolver: IResolvers = {
    Query: {
        // TO-DO: context 파라미터에서 인증 여부 검증
        transactionsInBooth: async (_, { bid }, ctx) => {
            const transactions = await transaction.findAll({
                where: {
                    bid: bid
                }
            });

            return transactions;
        },
        transactionsInUser: async (_, __, ctx) => {
            // TO-DO: context 파라미터에서 인증된 유저의 PK 불러오기
            const mockPid = 0;

            const transcations = await transaction.findAll({
                where: {
                    pid: mockPid
                }
            });

            return transcations;
        }
    },
    Mutation: {

    }
};

export {
    resolver,
};