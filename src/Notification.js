import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const DELAY_LONG = 3500
export const DELAY_SHORT = 2000

export default class Notification extends PureComponent {
  render () {
    return <div>Notification Component</div>
  }
}

Notification.propTypes = {
  removeNotification: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    duration: PropTypes.number,
    message: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.object)
  })
}
