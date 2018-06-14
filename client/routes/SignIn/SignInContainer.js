
import { graphql, compose } from 'react-apollo'

import SignIn from './SignIn'

import SIGN_IN_MUTATION from '../../ducks/signIn/mutation.graphql'

const SignInWithGraphQL = compose(
  graphql(SIGN_IN_MUTATION, {
    options: {
      fetchPolicy: 'network-only'
    },
    props: (props) => ({
      signIn: (payload) => {
        props.mutate({
          variables: payload
        }).then((resp) => {
          const { success, token, refreshToken } = resp.data.signIn
          if (success) {
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)
            props.ownProps.history.push('/')
          } else {
            // error handler
          }
        }).catch(err => {
          // TODO error handler
          console.log(err)
        })
      }
    })
  })
)(SignIn)

export default SignInWithGraphQL
