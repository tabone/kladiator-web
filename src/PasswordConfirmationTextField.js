import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'

export const PASSWORD_CONFIRMATION_MISMATCH_ERR = 'Password mismatch'

export default class PasswordConfirmationTextField extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { helperText: null }

    this.onValidation = this.onValidation.bind(this)
  }

  componentDidUpdate (...args) {
    this.onPasswordChange(...args)
  }

  render () {
    const { password, helperText, onValidation, ...props } = this.props

    return <ValidationTextField {...props}
      onValidation={this.onValidation}
      helperText={this.state.helperText} />
  }

  onValidation (passwordConfirmation) {
    const helperText = this.props.password === passwordConfirmation
      ? VALIDITY_VALID : PASSWORD_CONFIRMATION_MISMATCH_ERR

    return this.setState({ helperText })
  }

  onPasswordChange (prevProps) {
    if (prevProps.password === this.props.password) return

    // Condition for not marking the password confirmation as wrong before the
    // user tries to enter the password confirmation.
    if (this.state.helperText === null) return

    this.onValidation(this.props.value)
  }
}

PasswordConfirmationTextField.propTypes = {
  password: PropTypes.string.isRequired
}
