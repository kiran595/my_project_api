const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);
app.use(cors());

const credent = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g6u5e.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(credent, options)
  .then(() => app.listen(4000, console.log('Server is running')))
  .catch((error) => {
    throw error;
  });
