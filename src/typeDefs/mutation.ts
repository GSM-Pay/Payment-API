import { gql } from 'apollo-server-koa';

const mutation = gql`
    type Mutation {
        createTransaction(bid: Int, amount: Int): Transaction
    }
`;


export {
    mutation,
};