import { gql } from 'apollo-server-koa';

const mutation = gql`
    type Mutation {
        refund(tid: Int): Transaction
    }
`;


export {
    mutation,
};