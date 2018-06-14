import { graphql, compose } from 'react-apollo'

import SignUp from './SignUp'

import SIGN_UP_MUTATION from '../../ducks/signUp/mutation.graphql'

const SignUpWithGraphQL = compose(
  graphql(SIGN_UP_MUTATION, {
    options: {
      fetchPolicy: 'network-only'
    },
    props: (props) => ({
      signUp: (payload) => {
        props.mutate({
          variables: payload
        }).then((resp) => {
          const { success } = resp.data.register
          if (success) {
            props.ownProps.history.push('/')
          } else {
            // error handler
          }
        }).catch(err => console.log('Error: ', err))
      }
    })
  })
)(SignUp)

export default SignUpWithGraphQL
