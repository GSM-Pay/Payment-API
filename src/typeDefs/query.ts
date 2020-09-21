import { gql } from 'apollo-server-koa';

const query = gql`
    type Query {
        transactionsInBooth(bid: Int): [Transaction]
        transactionsInUser: [Transaction]
    }
`;

export {
    query,
};