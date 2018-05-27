// CRUD
// Create
// Read
// Update
// Delete

export default `
  type Task {
   id: Int!
    name: String!
    status: Int!
    project: Project!
  }

  type Query {
    getTask(id: Int!): Task!
    allTasks: [Task!]!
  }

  type Mutation {
    createTask(name: String!, projectId: Int!): Task!
  }
`
