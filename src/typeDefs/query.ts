import { gql } from 'apollo-server-koa';

const query = gql`
    type Query {
        Something: Session
    }
`;

export {
    query,
};