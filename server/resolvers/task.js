export default {
  Query: {
    getTask: (parent, { id }, { models }) => models.Task.findOne({ where: { id } }),
    allTasks: (parent, args, { models }) => models.Task.findAll()
  },

  Mutation: {
    createTask: (parent, args, { models }) => models.Task.create(args)
  }
}
