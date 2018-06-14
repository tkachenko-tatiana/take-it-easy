// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Formik, Field } from 'formik'

import TextFieldRow from '_shared/Form/TextFieldRow'

import Button from '@material-ui/core/Button'

import styles from '../SignIn.scss'

import type { Form } from './types'

type Props = {
  handleSubmit: (payload: Form) => void;
  pushToSignUp: () => void;
};

export class SignInForm extends PureComponent<Props> {
  static propTypes = {
    handleSubmit: PropTypes.func
  }

  render () {
    return (
      <Formik
        initialValues={{ userName: '', password: '' }}
        onSubmit={this.props.handleSubmit}
      >
        {({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className={styles.signInForm}
          >
            <h2> Sign In </h2>

            <div className={styles.textField}>
              <Field
                component={TextFieldRow}
                label="Username"
                name="userName"
              />
            </div>

            <div className={styles.textField}>
              <Field
                component={TextFieldRow}
                type="password"
                label="Password"
                name="password"
              />
            </div>

            <div>
              <Button
                color="primary"
                className={styles.singUpBtn}
                onClick={this.props.pushToSignUp}
              >
                Need account?
              </Button>
              <Button
                color="primary"
                variant="raised"
                className={styles.singInBtn}
                type='submit'
              >
                Sing In
              </Button>
            </div>
          </form>
        )}
      </Formik>

    )
  }
}

export default SignInForm
