const {
  createSchema,
  createYoga,
  createPubSub,
  filter,
  pipe,
} = require("graphql-yoga");
const { createServer } = require("node:http");
require('dotenv').config();
const resolvers = require("./graphql-utils/resolvers.js");
const typeDefs = require("./graphql-utils/typeDefs.js");

const schema = createSchema({
  typeDefs: /* GraphQL */ typeDefs,
  resolvers: resolvers,
});

const pubSub = createPubSub();

const yoga = createYoga({
  landingPage: false, graphqlEndpoint: '/',
  schema, context: { pubSub }
});

const server = createServer(yoga);
server.listen(4000, () => {
  console.log("server is running on http://localhost:4000/graphql");
});