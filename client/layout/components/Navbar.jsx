// @flow

import React, { PureComponent } from 'react'
import classnames from 'classnames'

import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from 'react-router-dom/Link'

import UserProfile from './UserProfile'

import logo from '../../../public/assets/TakeItEasy.jpg'
import styles from '../Layout.scss'

import type AuthUser from 'ducks/signIn'

type Props = {
  leftButtonClick: () => void;
  toShiftContent: boolean;
  user: AuthUser;
  switchTaskForm: () => void
}

class Navbar extends PureComponent<Props> {
  static propTypes = {

  }

  render () {
    return (
      <AppBar
        color="inherit"
        position="fixed"
        className={classnames(styles.appBar, { shifted: this.props.toShiftContent })}
      >
        <Toolbar>
          {
            this.props.user
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
            openTaskForm={this.props.switchTaskForm}
          />

        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar
