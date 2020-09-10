import { gql } from 'apollo-server-koa';

const query = gql`
    transactionsInBooth(bid: Int): [Transaction]
    transactionsInUser: [Transaction]
`;

export {
    query,
};