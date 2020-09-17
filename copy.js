const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/my_project_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect('mongodb://localhost:27017/UserApp');

const User = mongoose.model('User', {
  fullname: String,
  username: String,
  phone_number: String,
  city: String,
});

const typeDefs = `type Query {
  getUser(id: ID!): User
  getUsers: [User]
}
type User {
    id: ID!
    fullname: String!
    email: String!
    password: String!
}
type Mutation {
    addUser(fullname: String!, email: String!, password: String!): User!,
    deleteUser(id: ID!): String
}`;

const resolvers = {
  Query: {
    getUsers: () => User.find(),
    getUser: async (_, { id }) => {
      console.log('inside getUser query<<<<<<<<<<<<');
      var result = await User.findById(id);
      return result;
    },
  },
  Mutation: {
    addUser: async (_, { fullname, email, password }) => {
      console.log('inside of mutation >>>>>>>>>>>>>');
      const user = new User({ fullname, email, password });
      await user.save();
      return user;
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndRemove(id);
      return 'User deleted';
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

mongoose.connection.once('open', function () {
  server.start(() => console.log('Server is running on localhost:4000'));
});
