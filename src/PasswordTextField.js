import React, { PureComponent } from 'react'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'

const PASSWORD_PATTERN = /(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).*$/
export const PASSWORD_LENGTH_ERR = 'Password must be at least 8 characters long'
export const PASSWORD_CONTENT_ERR = 'Password should contain at least one ' +
  'number, one special character and have a mixture of uppercase and ' +
  ' lowercase letters'

export default class PasswordTextField extends PureComponent {
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

  onValidation (password) {
    if (password.length < 8) {
      return this.setState({ helperText: PASSWORD_LENGTH_ERR })
    }

    if (PASSWORD_PATTERN.test(password) === false) {
      return this.setState({ helperText: PASSWORD_CONTENT_ERR })
    }

    return this.setState({ helperText: VALIDITY_VALID })
  }
}
