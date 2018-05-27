// CRUD
// Create
// Read
// Update
// Delete

export default `
  type Project {
    id: Int!
    name: String!
    owner: User!
    tasks: [Task!]!
  }

  type Query {
    getProject(id: Int!): Project!
    allProjects: [Project!]!
  }

  type Mutation {
    createProject(name: String!, ownerId: Int!): Project!
  }
`
