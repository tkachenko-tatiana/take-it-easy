// @flow
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import AdminMenuDrawer from './components/AdminMenuDrawer'
import TaskForm from '_shared/TaskForm'

import authInfo from 'utils/auth'
import styles from './Layout.scss'

import type { Node } from 'react'
import type AuthUser from 'ducks/signIn'

type Props = {
  children: Node;
  user: AuthUser;
};

type State = {
  isDrawerOpen: boolean;
  isTaskFormOpen: boolean;
};

export class Layout extends PureComponent<Props, State> {
  state = {
    isDrawerOpen: false,
    isTaskFormOpen: false
  }

  toggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  switchTaskForm = () => {
    this.setState({ isTaskFormOpen: !this.state.isTaskFormOpen })
  }

  render () {
    return (
      <div className={styles.app}>
        <Navbar
          leftButtonClick={this.toggleDrawer}
          toShiftContent={this.state.isDrawerOpen}
          user={this.props.user}
          switchTaskForm={this.switchTaskForm}
        />

        <AdminMenuDrawer
          isOpen={this.state.isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
        />

        <main role="main" className={classnames({ shifted: this.state.isDrawerOpen })}>
          { this.props.children }
        </main>

        <TaskForm
          open={this.state.isTaskFormOpen}
          onClose={this.switchTaskForm}
        />

      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  user: authInfo.getAuthUserInfo(auth)
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Layout)
