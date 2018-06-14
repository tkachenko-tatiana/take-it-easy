
import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'

import Layout from 'layout/Layout'
import SignUp from 'routes/SignUp/SignUpContainer'
import SignIn from 'routes/SignIn/SignInContainer'
import SplashPage from 'routes/SplashPage/SplashPage'
import ApiRoutes from 'routes/Api/ApiLayout'

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" component={SplashPage} exact/>
        <Route path="/sign-up" title="Sign Up" component={SignUp}/>
        <Route path="/sign-in" title="Sign In" component={SignIn}/>
        <Route path="/admin" component={ApiRoutes} redirect="/"/>
      </Switch>
    </Layout>
  </BrowserRouter>
)

export default App
