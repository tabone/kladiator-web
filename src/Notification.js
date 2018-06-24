import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

export const DELAY_LONG = 3500
export const DELAY_SHORT = 2000

export default class Notification extends PureComponent {
  constructor (props) {
    super(props)

    this.onClose = this.onClose.bind(this)
  }

  render () {
    const { open, onClose, ...props } = this.props.notification || {}

    return <Snackbar
      {...props}
      onClose={this.onClose}
      open={this.props.notification !== null} />
  }

  onClose (...args) {
    const { onClose } = this.props.notification || {}
    if (onClose != null) onClose(...args)
    this.props.removeNotification()
  }
}

Notification.propTypes = {
  removeNotification: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    onClose: PropTypes.func
  })
}
