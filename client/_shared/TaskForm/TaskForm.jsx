// @flow

import React, { PureComponent } from 'react'
import { Formik, Field } from 'formik'
import Modal from '_shared/ModalDialog'
import { OK_CLOSE } from '_shared/ModalDialog/dialogActions'
import TextFieldRow from '_shared/Form/TextFieldRow'

import styles from './TaskForm.scss'

type Props = {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

class TaskForm extends PureComponent<Props> {
  render () {
    return (
      <Modal open={this.props.open}
        title="Add new task"
        dialogType={OK_CLOSE}
        handleOk={() => {}}
        onClose={this.props.onClose}
      >
        <Formik
          initialValues={{ userName: '', password: '' }}
          onSubmit={this.props.handleSubmit}
        >
          {({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className={styles.signInForm}
            >
              <div className={styles.textField}>
                <Field
                  component={TextFieldRow}
                  label="Task"
                  name="name"
                />
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    )
  }
}

export default TaskForm
