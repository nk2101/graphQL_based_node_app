require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const { typeDefs, resolvers } = require('./graphql/schema');

async function startServer() {
  await connectDB();

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.get('/', (req, res) => {
    res.send('Student Management GraphQL API is running');
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
