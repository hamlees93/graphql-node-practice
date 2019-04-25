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

// Dummy data
let links = [{
  id: 'link_0',
  url: 'www.howtograqhql.com',
  description: 'Fullstack tutorial for graphql'
}]

let idCount = links.length

// The resolvers is the actual implemetation of the GraphQL schema. Its structure has to be identical to the typeDefs variable
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: () => Link
  },
  // 'parent' is one of the 4 arguments we can pass to a resolver, and it refers to the result of the previous resolver execution level. So, here the parent refers to the element inside the links list
  // Link: {
    // id: (parent) => parent.id,
    // description: (parent) => parent.description,
    // url: (parent) => parent.url,
  // }

  // This replaces the Link above and allows us to add new links. It uses args to return description and url entered in, as well as adding an id through the idCount
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updatePost: (parent, args) => {
      
    }
  }
}

post(
  url: String!,
  description: String!
): Link!,
updatePost(
    id: ID!,
    url: String!
    description: String!
): Link,
deletePost(
    id: ID!
): Link
// The schema and resolvers are bundled and passed to the GraphQLServer (which comes from 'graphql-yoga'). It tells the server what API operations are accepted, and how they should be resolved
const server = new GraphQLServer({
  // typeDefs can either be a string in this file, or exported from another file
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))