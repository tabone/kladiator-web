import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '@material-ui/core/Icon'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import {
  default as BottomNavigationMaterialUI
} from '@material-ui/core/BottomNavigation'

const validPathnames = [ 'messages', 'calendar', 'alerts' ]

export default class BottomNavigation extends PureComponent {
  constructor (props) {
    super(props)
    this.onActionChange = this.onActionChange.bind(this)
  }

  render () {
    return (
      <BottomNavigationMaterialUI
        onChange={this.onActionChange}
        value={this.bottomNavigationValue}>
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
      </BottomNavigationMaterialUI>
    )
  }

  get bottomNavigationValue () {
    const { pathname } = this.props
    if (pathname === '/') return '/'
    const rootPathname = pathname.split('/')[1]
    if (validPathnames.indexOf(rootPathname) === -1) return null
    return `/${rootPathname}`
  }

  onActionChange (ev, path) {
    this.props.history.push(path)
  }
}

BottomNavigation.propTypes = {
  pathname: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}
