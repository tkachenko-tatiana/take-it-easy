// @flow

import React from 'react'

import { isAuthorisedUser } from 'utils/auth'

type Props = {
  children: Node;
}

export default class Guard extends React.PureComponent<Props> {
  render () {
    return isAuthorisedUser()
      ? this.props.children
      : null
  }
}
