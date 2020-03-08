import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

const port = process.env.PORT;

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => ({ db }) 
  });

  server.applyMiddleware({app, path: '/api'});

  app.listen(port);
  console.log(`Express is running on port: ${port}`);

  const quotes = await db.quotes.find({}).toArray();
  console.log(quotes);
} 

mount(express());


