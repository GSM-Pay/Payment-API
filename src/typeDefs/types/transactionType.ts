import { gql } from 'apollo-server-koa';

const transactionType = gql`
    type Transaction {
        tid: Int
        booth: Booth
        user: User
        amount: Int
        createdAt: String
        updatedAt: String
    }
`

export {
    transactionType,
}