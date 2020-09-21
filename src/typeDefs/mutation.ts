import { gql } from 'apollo-server-koa';

const mutation = gql`
    type Mutation {
        Login(id: String, pw: String): Session
    }
`;


export {
    mutation,
};