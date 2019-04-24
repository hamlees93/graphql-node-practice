/* *****GENERAL NOTES******

source: https://www.howtographql.com/graphql-js/2-a-simple-query/

Every graphQL schema has three special root types: Query, Mutation and Subscription. The fields on these roots types are called root fields.

i.e. 
type Query {
    info: String!
}

In the above example, the schema only has a single root field called 'info'
*/

const { GraphQLServer } = require('graphql-yoga')

// typeDefs defines our GraphQL schema. The exclamation mark means it cannot be null
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`

// The resolvers is the actual implemetation of the GraphQL schema. Its structure has to be identical to the typeDefs variable
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
    // feed: 
  },
  Link: {
      id: 
  }
}

// The schema and resolvers are bundled and passed to the GraphQLServer (which comes from 'graphql-yoga'). It tells the server what API operations are accepted, and how they should be resolved
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))