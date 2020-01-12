import React, { Component } from 'react'
import './App.css'
import Layout from './component/layout/layout'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from './component/auth/login';
import { PrivateRoute, fakeAuth } from './component/auth/private-route';
import { PageNotFound } from './component/page-not-found';
import { navService } from "./service/nav-service"
import { getCookiesLoginedUser } from "./utils/cookies"

class App extends Component {

  componentWillMount() {
    if (getCookiesLoginedUser()) {
      fakeAuth.authenticate()
      navService.setLoginStatus(true)
      console.log("fakeAuth.isAuthenticated  Layout")
      console.log(fakeAuth.isAuthenticated)
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <PrivateRoute path={"/module"} component={Layout} />
          <Route path="**" component={PageNotFound} />
        </Switch>
      </Router >
    )
  }
}

export default App
