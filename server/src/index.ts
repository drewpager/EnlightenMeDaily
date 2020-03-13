import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

const port = process.env.PORT;

// create a mount function to await MongoClient connect, ApolloServer, middleware, and port. 

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => ({ db }) 
  });

  server.applyMiddleware({app, path: '/api'});
  app.use(compression());
  app.use(express.static(`${__dirname}/client`));
  app.get('/*', (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

  app.listen(port);
  console.log(`Express is running on port: ${port}`);

  const quotes = await db.quotes.find({}).toArray();
  console.log(quotes);
} 

// invoke the mount function calling an instantiation of Express
mount(express());


