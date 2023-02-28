const {
    createSchema,
    createYoga,
    createPubSub,
    filter,
    pipe,
  } = require("graphql-yoga");
  const { createServer } = require("node:http");
  const resolvers = require("./graphql-utils/resolvers.js");
  const typeDefs = require("./graphql-utils/typeDefs.js");
  const pubSub = createPubSub();
  const schema = createSchema({
    typeDefs: /* GraphQL */ typeDefs,
    resolvers: resolvers,
  });
  
  const yoga = createYoga({
    landingPage: false, graphqlEndpoint: '/',
    schema, context: { pubSub }
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.log("server is running on http://localhost:4000/graphql");
  });