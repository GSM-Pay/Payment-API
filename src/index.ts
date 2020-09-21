// import Koa.js related package
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import { ApolloServer } from 'apollo-server-koa';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const app = new Koa();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ctx}) => ({ctx})
});

server.applyMiddleware({ app });

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

export default app;