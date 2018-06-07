import { graphql, compose } from 'react-apollo'

import SignUp from './SignUp'

import SIGN_UP_MUTATION from '../../mutations/signup.graphql'

const SignUpWithGraphQL = compose(
  graphql(SIGN_UP_MUTATION, {
    name: 'signUp',
    options: {
      fetchPolicy: 'network-only'
    },
    props: (props) => ({
      signUp: (payload) => {
        props.signUp({
          variables: payload
        })
      }
    })
  })
)(SignUp)

export default SignUpWithGraphQL

// export { default } from './SignUp'
