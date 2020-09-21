import { query } from './query';
import { mutation } from './mutation';
import { userType, boothType, transactionType, sessionType } from './types';

const typeDefs = [query, mutation, userType, boothType, transactionType, sessionType];

export {
    typeDefs,
};