// CRUD
// Create
// Read
// Update
// Delete

export default `
  type User {
    id: Int!
    userName: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    register(userName: String!, email: String!, password: String!): User!
  }
`
