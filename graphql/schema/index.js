const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type Article {
    _id: ID!
    title: String!
    body: String!
    createdAt: String!
  }

  type User{
    id: ID!
    fullname: String!
    email: String!
    password: String!
    createdAt: String!
  }


  input ArticleInput {
    title: String!
    body: String!
  }

  input UserInput{
    fullname: String!
    email: String!
    password: String!
  }

  type Query {
    articles:[Article!]
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createArticle(article:ArticleInput): Article
    createUser(user:UserInput): User,
    deleteUser(id: ID!): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
