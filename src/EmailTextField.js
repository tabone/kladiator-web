import React, { PureComponent } from 'react'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'

const EMAIL_PATTERN = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/
export const EMAIL_VALIDATION_ERR = 'Invalid email address'

export default class EmailTextField extends PureComponent {
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

  onValidation (email) {
    const helperText = EMAIL_PATTERN.test(email) === true
      ? VALIDITY_VALID : EMAIL_VALIDATION_ERR

    return this.setState({ helperText })
  }
}
