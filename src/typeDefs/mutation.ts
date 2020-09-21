import { gql } from 'apollo-server-koa';

const mutation = gql`
    type Mutation {
        createTransaction(bid: Int, amount: Int): Transaction
        Login(id: String, pw: String): Session
    }
`;


export {
    mutation,
};