import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

// import styles from '../Layout.scss'

class Navbar extends Component {
  static propTypes = {
    leftButtonClick: PropTypes.func
  }

  render () {
    return (
      <AppBar
        color="inherit"
        position="fixed"

      >
        <Toolbar>
          <IconButton
            aria-label="Drawer"
            onClick={() => this.props.leftButtonClick()}
          >
            <Icon>menu</Icon>
          </IconButton>

          <Button
            onClick={() => {}}
          >
            Registration
          </Button>

        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar
