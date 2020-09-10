import { transaction } from "../models";

const resolver = {
    Query: {
        // TO-DO: context 파라미터에서 인증 여부 검증
        transactionsInBooth: (_: any, { bid }: any) => {
            const transactions = transaction.findAll({
                where: {
                    bid: bid
                }
            });

            return transactions;
        },
        transactionsInUser: () => {
            // TO-DO: context 파라미터에서 인증된 유저의 PK 불러오기
            const mockPid = 0;

            const transcations = transaction.findAll({
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