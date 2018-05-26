import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

export default class ValidationTextField extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      didBlur: false,
      errorMessage: null
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
        helperText={this.state.errorMessage}
        error={this.isTextFieldValid() === false} />
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

  isTextFieldValid () {
    return this.isErrorMessageValid(this.state.errorMessage)
  }

  isErrorMessageValid (message) {
    return message === null
  }

  validate (value) {
    const currentErrorMessage = this.state.errorMessage
    const newErrorMessage = this.props.validation(value)

    if (this.props.onValidityChange != null) {
      const isFirstBlur = this.state.didBlur === false

      const isErrorMessageChanging = currentErrorMessage !== newErrorMessage
      const isTextFieldValid = this.isErrorMessageValid(currentErrorMessage)
      const willTextFieldBeValid = this.isErrorMessageValid(newErrorMessage)
      const willValidityChange = isErrorMessageChanging &&
        (isTextFieldValid || willTextFieldBeValid)

      if (isFirstBlur || willValidityChange) {
        this.props.onValidityChange(willTextFieldBeValid)
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
