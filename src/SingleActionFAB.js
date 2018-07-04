import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

export default class SingleActionFAB extends PureComponent {
  render () {
    const { icon, fn } = this.props

    return (
      <Button variant='fab' color='secondary' onClick={fn}>
        <Icon>{ icon }</Icon>
      </Button>
    )
  }
}

SingleActionFAB.propTypes = {
  fn: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
}
