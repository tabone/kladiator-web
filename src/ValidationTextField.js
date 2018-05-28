import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

export const VALIDITY_VALID = Symbol('VALIDITY_VALID')

export default class ValidationTextField extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { didBlur: false }

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  get helperText () {
    const { helperText } = this.props
    return this.isHelperTextValid(helperText) === true ? null : helperText
  }

  componentDidUpdate (...args) {
    this.onHelperTextChange(...args)
  }

  render () {
    const {
      error,
      onBlur,
      onChange,
      helperText,
      onValidation,
      onValidityChange,
      ...props
    } = this.props

    return (
      <TextField {...props}
        onBlur={this.onBlur}
        onChange={this.onChange}
        helperText={this.helperText}
        error={this.isTextFieldValid() === false} />
    )
  }

  onBlur (...args) {
    if (this.state.didBlur === false) {
      this.props.onValidation(this.props.value)
      this.setState({ didBlur: true })
    }

    if (this.props.onBlur != null) this.props.onBlur(...args)
  }

  onChange (e, ...args) {
    if (this.state.didBlur === true) this.props.onValidation(e.target.value)
    if (this.props.onChange != null) this.props.onChange(e, ...args)
  }

  onHelperTextChange (prevProps, prevState) {
    if (this.props.onValidityChange == null) return
    if (prevProps.helperText === this.props.helperText) return

    const wasTextFieldValid = this.isHelperTextValid(prevProps.helperText)
    const isTextFieldValid = this.isHelperTextValid(this.props.helperText)

    if (wasTextFieldValid || isTextFieldValid) {
      this.props.onValidityChange(isTextFieldValid)
    }
  }

  isTextFieldValid () {
    return this.isHelperTextValid(this.props.helperText)
  }

  isHelperTextValid (helperText) {
    return helperText === VALIDITY_VALID || helperText === null
  }
}

ValidationTextField.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onValidityChange: PropTypes.func,
  onValidation: PropTypes.func.isRequired,
  helperText: PropTypes.oneOfType([ PropTypes.string, PropTypes.symbol ])
}

ValidationTextField.defaultProps = {
  helperText: null
}
