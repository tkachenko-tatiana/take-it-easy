
import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'

import Layout from './layout/Layout'
import Registration from './routes/Registration/Registration'
import SplashPage from './routes/SplashPage/SplashPage'

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" component={SplashPage} exact/>
        <Route path="/registration" title="Registration" component={Registration}/>
      </Switch>
    </Layout>
  </BrowserRouter>
)

export default App
