import { gql } from 'apollo-server-koa';

const mutation = gql`
    type Mutation {
        refund(tid: Int!): Transaction
        createTransaction(bid: Int!, amount: Int!): Transaction
        addAmount(pid: Int!, amount: Int!): User
        Login(id: String!, pw: String!): Session
    }
`;


export {
    mutation,
};