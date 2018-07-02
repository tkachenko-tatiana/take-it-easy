
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import SignIn from './SignIn'

import SIGN_IN_MUTATION from '../../ducks/signIn/mutation.graphql'
import { authSuccess, authFailure } from '../../ducks/signIn'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = { authSuccess, authFailure }

const SignInWithGraphQL = compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(SIGN_IN_MUTATION, {
    props: (props) => ({
      signIn: (payload) => {
        props.mutate({
          variables: payload
        }).then((resp) => {
          const { success, errors } = resp.data.signIn
          if (success) {
            props.ownProps.authSuccess(resp.data.signIn)
            props.ownProps.history.push('/api/inbox')
          } else {
            props.ownProps.authFailure(errors)
          }
        }).catch(err => {
          props.ownProps.authFailure(err)
        })
      }
    })
  }
  )
)(SignIn)

export default SignInWithGraphQL
