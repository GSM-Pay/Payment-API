// import Koa.js related package
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import { ApolloServer } from 'apollo-server-koa';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

import sessionCreator from './middlewares/session';

const app = new Koa();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ctx}) => ({ctx})
});

app.use(bodyParser());
app.use(sessionCreator);

server.applyMiddleware({ app });

export default app;