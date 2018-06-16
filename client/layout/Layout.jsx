// @flow
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import AdminMenuDrawer from './components/AdminMenuDrawer'
import { getAuthUserInfo } from 'utils/auth'
import styles from './Layout.scss'
import { authLogout } from 'ducks/signIn'

import type { Node } from 'react'

type Props = {
  children: Node;
  user: any; // add correct type
  authLogout: () => void;
};

type State = {
  isDrawerOpen: boolean
};

export class Layout extends PureComponent<Props, State> {
  state = {
    isDrawerOpen: false
  }

  toggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  render () {
    return (
      <div className={styles.app}>
        <Navbar
          leftButtonClick={this.toggleDrawer}
          toShiftContent={this.state.isDrawerOpen}
          user={this.props.user}
          authLogout={this.props.authLogout}
        />

        <AdminMenuDrawer
          isOpen={this.state.isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
        />

        <main role="main" className={classnames({ shifted: this.state.isDrawerOpen })}>
          { this.props.children }
        </main>

      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  user: getAuthUserInfo(auth)
})

const mapDispatchToProps = { authLogout }

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Layout)
