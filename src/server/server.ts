import express = require('express');
import { ApolloServer } from 'apollo-server-express';
import path = require('path');
import { authMiddleware } from './util/auth'; // TODO: make this stop crashing the server
import typeDefs from 'graphql/typeDefs';
import resolvers from 'graphql/resolvers';
import { connect, connection, Connection } from 'mongoose';

const PORT = process.env.Port || 3001;
const app = express();
const db: Connection = connection;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const start = async (typedefs: any, resolvers: any) => {
  // start the server
  await server.start();
  // allow our app to be added
  server.applyMiddleware({ app });

  // connect to the database
  await connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/miseEnPlace'
  );

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

start(typeDefs, resolvers);
