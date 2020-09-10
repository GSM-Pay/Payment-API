import { gql } from 'apollo-server-koa';

const boothType = gql`
    type Booth {
        bid: Int
        pid: Int
        name: String
        created_at: String
        updated_at: String
    }
`

export {
    boothType,
}