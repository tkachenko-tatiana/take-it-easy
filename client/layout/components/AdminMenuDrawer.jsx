// @flow

import React, { PureComponent } from 'react'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from 'react-router-dom/Link'

import logo from '../../../public/assets/TakeItEasy.jpg'
import styles from '../Layout.scss'

type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export class AdminMenuDrawer extends PureComponent<Props> {
  render () {
    return (
      <SwipeableDrawer
        role="navigation"
        disableBackdropTransition={false}
        disableDiscovery={false}
        variant='persistent'
        open={this.props.isOpen}
        onClose={() => this.props.toggleDrawer()}
        onOpen={() => this.props.toggleDrawer()}
        classes={{ paper: styles.drawer }}
      >
        <div className={styles.header}>
          <Link
            to="/"
            onClick={() => {}}
          >
            <img width="150"
              src={logo}
              alt="logo"
            />
          </Link>

          <IconButton
            className={styles.closeDrawer}
            onClick={() => this.props.toggleDrawer()}
          >
            <Icon>chevron_left</Icon>
          </IconButton>
        </div>

        <List className={styles.list}>
          <Link to="/api/inbox" className='text-link'>
            <ListItem button>
              <Icon>inbox</Icon>
              Inbox
            </ListItem>
          </Link>
          <Link to="/api/today" className='text-link'>
            <ListItem button>
              <Icon>today</Icon>
              Today
            </ListItem>
          </Link>
        </List>
      </SwipeableDrawer>
    )
  }
}

export default AdminMenuDrawer
