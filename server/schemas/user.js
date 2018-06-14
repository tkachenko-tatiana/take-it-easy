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

  type RegisterResponse {
    success: Boolean!
    user: User
    errors: [Error!]
  }

  type SignInResponse {
    success: Boolean!
    user: User
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    register(userName: String!, email: String!, password: String!): RegisterResponse!
    signIn(userName: String!, password: String!): SignInResponse!
  }
`
