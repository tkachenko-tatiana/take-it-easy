import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import authInfo from 'utils/auth'
import fetch from 'services/fetch'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: '/graphql',
  fetch
})

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const { token } = authInfo.getTokens()

  operation.setContext({
    headers: {
      'authorization': token && `Bearer ${token}`
    }
  })
  return forward(operation)
})

export default new ApolloClient({
  link: ApolloLink.from([middlewareAuthLink, httpLink]),
  cache
})
