// import React, { PureComponent } from 'react'

// class SplashPage extends PureComponent {
//   render () {
//     return (
//       <div >
//         Main page
//       </div>
//     )
//   }
// }

// export default SplashPage

import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Home = ({ data: { allUsers = [] } }) => {
  console.log('allUsers: ', allUsers)
  return allUsers.map(u => <h1 key={u.id}>{u.email}</h1>)
}

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`

export default graphql(allUsersQuery)(Home)
