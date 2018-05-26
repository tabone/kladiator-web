import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

export const VALIDITY_VALID = Symbol('VALIDITY_VALID')
const VALIDITY_UNKNOWN = Symbol('VALIDITY_UNKNOWN')

export default class ValidationTextField extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      didBlur: false,
      errorMessage: VALIDITY_UNKNOWN
    }

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  render () {
    const {
      error,
      onBlur,
      onChange,
      helperText,
      validation,
      onValidityChange,
      ...props
    } = this.props

    return (
      <TextField {...props}
        onBlur={this.onBlur}
        onChange={this.onChange}
        error={this.isTextFieldInvalid()}
        helperText={this.getErrorMessage()} />
    )
  }

  onBlur (...args) {
    if (this.state.didBlur === false) {
      this.validate(this.props.value)
      this.setState({ didBlur: true })
    }

    if (this.props.onBlur != null) this.props.onBlur(...args)
  }

  onChange (e, ...args) {
    if (this.state.didBlur === true) this.validate(e.target.value)
    if (this.props.onChange != null) this.props.onChange(e, ...args)
  }

  isTextFieldInvalid () {
    return this.isErrorMessageInvalid(this.state.errorMessage)
  }

  isErrorMessageInvalid (message) {
    return message !== VALIDITY_VALID && message !== VALIDITY_UNKNOWN
  }

  getErrorMessage () {
    const { errorMessage } = this.state
    return this.isErrorMessageInvalid(errorMessage) === false
      ? null
      : errorMessage
  }

  validate (value) {
    const { errorMessage } = this.state
    const newErrorMessage = this.props.validation(value)

    if (this.props.onValidityChange != null) {
      const isErrorMessageChanging = errorMessage !== newErrorMessage
      const wasTextFieldValid = this.isTextFieldInvalid() === false
      const isTextFieldValid =
        this.isErrorMessageInvalid(newErrorMessage) === false

      if (isErrorMessageChanging && (isTextFieldValid || wasTextFieldValid)) {
        this.props.onValidityChange(isTextFieldValid)
      }
    }

    this.setState({ errorMessage: newErrorMessage })
  }
}

ValidationTextField.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onValidityChange: PropTypes.func,
  validation: PropTypes.func.isRequired
}
