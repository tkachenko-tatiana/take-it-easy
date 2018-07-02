import UserManager from '../managers/user'
import withAuth from 'graphql-auth'

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: withAuth((parent, args, { models, user }) => {
      return models.User.findAll()
    })
  },
  Mutation: {
    register: (parent, args) => UserManager.register(args),
    signIn: (parent, args) => UserManager.signIn(args)
  }
}
