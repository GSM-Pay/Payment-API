import { query } from './query';
import { mutation } from './mutation';
import { userType, boothType, transactionType } from './types';

const typeDefs = [query, mutation, userType, boothType, transactionType];

export {
    typeDefs,
};