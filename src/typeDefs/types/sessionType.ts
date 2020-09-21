import { gql } from 'apollo-server-koa';

const sessionType = gql`
    type Session {
        data: String
    }
`

export {
  sessionType,
};