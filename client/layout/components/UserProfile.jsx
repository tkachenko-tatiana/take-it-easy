// @flow

import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import Link from 'react-router-dom/Link'

import authInfo from 'utils/auth'
import { authLogout } from 'ducks/signIn'
import styles from '../Layout.scss'

import type AuthUser from 'ducks/signIn'

type Props = {
  user: AuthUser;
  openTaskForm: () => void;
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
                  onClick={this.props.openTaskForm}
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

const mapStateToProps = ({ auth }) => ({
  user: authInfo.getAuthUserInfo(auth)
})

const mapDispatchToProps = { authLogout }

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
