import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from 'react-router-dom/Link'

import UserProfile from './UserProfile'

import { isAuthorisedUser, getAuthInfo } from 'utils/auth'

import logo from '../../../public/assets/TakeItEasy.jpg'
import styles from '../Layout.scss'

class Navbar extends Component {
  static propTypes = {
    leftButtonClick: PropTypes.func,
    toShiftContent: PropTypes.bool
  }

  render () {
    const isAuthorised = isAuthorisedUser()
    const user = getAuthInfo()

    return (
      <AppBar
        color="inherit"
        position="fixed"
        className={classnames(styles.appBar, { shifted: this.props.toShiftContent })}
      >
        <Toolbar>
          {
            isAuthorised
              ? (
                <IconButton
                  aria-label="Drawer"
                  onClick={() => this.props.leftButtonClick()}
                  className={classnames(this.props.toShiftContent && styles.hidden)}
                >
                  <Icon>menu</Icon>
                </IconButton>
              )
              : (
                <Link
                  to='/'
                  label='Logo'
                >
                  <img width="150"
                    src={logo}
                    alt="Logo"
                  />
                </Link>
              )

          }

          <UserProfile
            className={styles.rightDropdown}
            user={user}
          />

        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar
