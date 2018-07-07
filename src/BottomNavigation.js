import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import {
  default as BottomNavigationUI
} from '@material-ui/core/BottomNavigation'

export default class BottomNavigation extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { route: '/' }

    this.onRouteChange = this.onRouteChange.bind(this)
  }

  render () {
    const { route } = this.state

    return (
      <React.Fragment>
        <Redirect to={route} />

        <BottomNavigationUI value={route} onChange={this.onRouteChange}>
          <BottomNavigationAction
            label='Profile'
            value='/'
            icon={<Icon>person</Icon>} />

          <BottomNavigationAction
            label='Calendar'
            value='/calendar'
            icon={<Icon>calendar_today</Icon>} />

          <BottomNavigationAction
            label='Messages'
            value='/messages'
            icon={<Icon>message</Icon>} />

          <BottomNavigationAction
            label='Alerts'
            value='/alerts'
            icon={<Icon>notification_important</Icon>} />
        </BottomNavigationUI>
      </React.Fragment>
    )
  }

  onRouteChange (ev, route) {
    this.setState({ route })
  }
}
