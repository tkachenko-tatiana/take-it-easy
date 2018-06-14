
import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'

import InboxContainer from 'routes/Api/Inbox/InboxContainer'
import TodayTasksContainer from 'routes/Api/TodayTasks/TodayTasksContainer'

import styles from './ApiLayout.scss'

export default class ApiLayout extends React.PureComponent {
  render () {
    return (
      <div className={styles.adminMain}>
        <div className={styles.adminContent}>
          <Switch>
            <Route path="/api/inbox" component={InboxContainer}/>
            <Route path="/api/today" component={TodayTasksContainer}/>
          </Switch>
        </div>
      </div>
    )
  }
}
