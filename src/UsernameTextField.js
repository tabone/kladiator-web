import React, { PureComponent } from 'react'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'

const USERNAME_PATTERN = /^[a-z0-9_-]+$/
export const USERNAME_LENGTH_ERR = 'Username must be 3 to 16 characters long'
export const USERNAME_CONTENT_ERR = 'Username may have lower case letters, ' +
  'numbers, _ and -'

export default class UsernameTextField extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { helperText: null }

    this.onValidation = this.onValidation.bind(this)
  }

  render () {
    const { helperText, onValidation, ...props } = this.props

    return <ValidationTextField {...props}
      onValidation={this.onValidation}
      helperText={this.state.helperText} />
  }

  onValidation (username) {
    if (username.length < 3 || username.length > 16) {
      return this.setState({ helperText: USERNAME_LENGTH_ERR })
    }

    if (USERNAME_PATTERN.test(username) === false) {
      return this.setState({ helperText: USERNAME_CONTENT_ERR })
    }

    return this.setState({ helperText: VALIDITY_VALID })
  }
}
