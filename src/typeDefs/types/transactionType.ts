import { gql } from 'apollo-server-koa';

const transactionType = gql`
    type Transaction {
        tid: Int
        bid: Int
        pid: Int
        amount: Int
        createdAt: String
    }
`

export {
    transactionType,
}