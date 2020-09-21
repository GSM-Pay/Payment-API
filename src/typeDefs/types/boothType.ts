import { gql } from 'apollo-server-koa';

const boothType = gql`
    type Booth {
        bid: Int
        pid: Int
        name: String
        createdAt: String
        updatedAt: String
    }
`

export {
    boothType,
}