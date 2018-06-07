// @flow

import React, { PureComponent } from 'react'

import Paper from '@material-ui/core/Paper'
import SignUpForm from './components/SignUpForm'

import type { Form } from './components/types'

import styles from './SignUp.scss'

type Props = {
  signUp: (payload: Form) => void
}

class SignUp extends PureComponent<Props> {
  render () {
    return (
      <div className={styles.singUpPage}>
        <Paper className={styles.container}>
          <SignUpForm
            handleSubmit={this.props.signUp}
          />
        </Paper>
      </div>
    )
  }
}

export default SignUp
