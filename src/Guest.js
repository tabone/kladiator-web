import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginContainer from './LoginContainer'
import RegisterContainer from './RegisterContainer'
import ForgotPasswordContainer from './ForgotPasswordContainer'

export default class Guest extends Component {
  render () {
    return (
      <Switch>
        <Route path='/' exact={true} component={ LoginContainer } />
        <Route path='/register' component={ RegisterContainer } />
        <Route path='/forgot-password' component={ ForgotPasswordContainer } />
      </Switch>
    )
  }
}
