import express = require('express');
import { ApolloServer } from 'apollo-server-express';
import path = require('path');
import { authMiddleware } from './util/auth';
import { typeDefs, resolvers } from './schema';
import connection from './config/connection';
import { DocumentNode } from 'graphql';

// changing the reference for ease of remembering
const db = connection;

// the port we will be on will be 3001 or whatever the service we use has
const PORT = process.env.Port || 3001;

// create the express server
const app = express();

// create the graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// basic middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// redirect all gets in production to be handled by react router
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

/**
 * The start function for the server
 * @param typedefs
 * @param resolvers
 */
const start = async (typedefs: DocumentNode, resolvers: any) => {
  // start the graphql server
  await server.start();

  // allow our app to be added
  server.applyMiddleware({ app });

  // start listening on the connection
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// set up complete time to run the server
start(typeDefs, resolvers);
