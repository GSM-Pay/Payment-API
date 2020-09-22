import { gql } from 'apollo-server-koa';

const query = gql`
    type Query {
        me: User
        users: [User]
        booth(bid: Int!): Booth
        booths: [Booth]
        transactionsInBooth(bid: Int): [Transaction]
        transactionsInUser: [Transaction]
        transactions: [Transaction]
    }
`;

export {
    query,
};