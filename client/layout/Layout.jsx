// @flow
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import Navbar from './components/Navbar'
import AdminMenuDrawer from './components/AdminMenuDrawer'
import styles from './Layout.scss'

import type { Node } from 'react'

type Props = {
  children: Node;
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
      <div>
        <Navbar
          leftButtonClick={() => {}}
        />

        <AdminMenuDrawer
          isOpen={this.state.isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
        />

        <main role="main">
          { this.props.children }
        </main>

      </div>
    )
  }
}

export default withRouter(Layout)
