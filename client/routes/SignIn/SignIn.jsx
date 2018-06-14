// @flow

import React, { PureComponent } from 'react'

import Paper from '@material-ui/core/Paper'
import SignInForm from './components/SignInForm'

import type { Form } from './components/types'
import type { RouterHistory } from 'react-router-dom'

import styles from './SignIn.scss'

type Props = {
  signIn: (payload: Form) => void;
  history: RouterHistory;
}

class SignIn extends PureComponent<Props> {
  render () {
    return (
      <div className={styles.singInPage}>
        <Paper className={styles.container}>
          <SignInForm
            handleSubmit={this.props.signIn}
            pushToSignUp={() => this.props.history.push('/sign-up')}
          />
        </Paper>
      </div>
    )
  }
}

export default SignIn
