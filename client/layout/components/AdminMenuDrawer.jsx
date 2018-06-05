import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

// import styles from '../Layout.scss'

export class AdminMenuDrawer extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggleDrawer: PropTypes.func
  }

  render () {
    return (
      <SwipeableDrawer
        role="navigation"
        open={this.props.isOpen}
        onClose={() => this.props.toggleDrawer()}
        onOpen={() => this.props.toggleDrawer()}
      >
        DRAWER
      </SwipeableDrawer>
    )
  }
}

export default AdminMenuDrawer
