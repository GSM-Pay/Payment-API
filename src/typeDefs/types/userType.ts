import { gql } from 'apollo-server-koa';

const userType = gql`
    type User {
        pid: Int
        id: String
        pw: String
        name: String
        grade: Int
        class: Int
        number: Int
        amount: Int
        created_at: String
        updated_at: String
    }
`

export {
    userType,
}