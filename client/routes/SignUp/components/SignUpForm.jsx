// @flow

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Formik, Field } from 'formik'

import TextFieldRow from '_shared/Form/TextFieldRow'

import Button from '@material-ui/core/Button'

import styles from '../SignUp.scss'

import type { Form } from './types'

type Props = {
  handleSubmit: (payload: Form) => void;
};

export class SignUpForm extends PureComponent<Props> {
  static propTypes = {
    handleSubmit: PropTypes.func
  }

  render () {
    return (
      <Formik
        initialValues={{ userName: '', email: '', password: '' }}
        onSubmit={this.props.handleSubmit}
      >
        {({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className={styles.signUpForm}
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
                label="Email"
                name="email"
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

            <Button
              color="primary"
              variant="raised"
              className={styles.singUpBtn}
              type='submit'
              // onClick={this.props.handleSubmit}
            >
            Sing Up
            </Button>
          </form>
        )}
      </Formik>

    )
  }
}

export default SignUpForm
