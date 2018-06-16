// @flow

import React, { Fragment, PureComponent } from 'react'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import Link from 'react-router-dom/Link'

import styles from '../Layout.scss'

type Props = {
  user: any; // add correct type
  addTask: () => void;
  authLogout: () => void;
};

export class UserProfile extends PureComponent<Props> {
  render () {
    return (
      <Fragment>
        {
          this.props.user
            ? (
              <span className={styles.rightDropdown}>
                <IconButton
                  onClick={this.props.addTask}
                >
                  <Icon> add </Icon>
                </IconButton>

                <Button
                  variant="raised"
                  className={styles.profileBtn}
                  // onClick={this.props.openProfile}
                >
                  <Icon> person </Icon> { this.props.user.userName }
                </Button>

                <Button id="logout-btn" onClick={this.props.authLogout}> Logout </Button>
              </span>
            )
            : (
              <Link
                to='/sign-In'
                label='Sign In'
                className={classnames('no-decoration', styles.signIn)}
              >
                <Button> Sing In </Button>
              </Link>
            )
        }

      </Fragment>

    )
  }
}

export default UserProfile
