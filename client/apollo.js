import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { defaults, resolvers } from './ducks'

const cache = new InMemoryCache()

const stateLink = withClientState({ resolvers, cache, defaults })

const httpLink = new HttpLink({ uri: '/graphql' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')

  operation.setContext({
    headers: {
      'x-token': token ? `Bearer ${token}` : null,
      'x-refresh-token': refreshToken ? `Bearer ${token}` : null
    }
  })
  return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext()
    if (headers) {
      const token = headers.get('x-token')
      const refreshToken = headers.get('x-refresh-token')

      if (token) {
        localStorage.setItem('token', token)
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
    }

    return response
  }))

export default new ApolloClient({
  link: ApolloLink.from([stateLink, afterwareLink, middlewareAuthLink, httpLink]),
  cache
})
