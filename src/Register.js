import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EmailTextField from './EmailTextField'
import UsernameTextField from './UsernameTextField'
import PasswordTextField from './PasswordTextField'
import PasswordConfirmationTextField from './PasswordConfirmationTextField'

const styles = () => {
  return {
    appRegister: {
      padding: '18px',
      minHeight: '100vh'
    },
    appRegisterAvatar: {
      textAlign: 'center'
    }
  }
}

const fieldValidityMapper = {
  email: 'isEmailValid',
  username: 'isUsernameValid',
  password: 'isPasswordValid',
  passwordConfirmation: 'isPasswordConfirmationValid'
}

class Register extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      isEmailValid: false,
      isUsernameValid: false,
      isPasswordValid: false,
      isPasswordConfirmationValid: false
    }

    this.onValidityChange = [
      'email',
      'username',
      'password',
      'passwordConfirmation'
    ].reduce((handlers, field) => {
      handlers[field] = this.onValidityChange.bind(this, field)
      return handlers
    }, {})

    this.handleTextFieldChange = [
      'email',
      'username',
      'password',
      'passwordConfirmation'
    ].reduce((handlers, field) => {
      handlers[field] = this.handleTextFieldChange.bind(this, field)
      return handlers
    }, {})
  }

  render () {
    const { classes } = this.props

    return (
      <Grid container={true}
        direction='column'
        justify='space-between'
        className={classes.appRegister}>
        <Grid item={true} className={classes.appRegisterAvatar}>
          <img src='images/happy.png' width='200' alt='Happy Kladiator' />
        </Grid>

        <Grid item={true}>
          <Typography variant='title' align='center'>Join Our Community!</Typography>
        </Grid>

        <Grid container={true} item={true} direction='column' spacing={16}>
          <Grid item={true}>
            <UsernameTextField
              margin='none'
              required={true}
              fullWidth={true}
              autoFocus={true}
              label='Username'
              value={this.state.username}
              className='app-register__username-textfield'
              onChange={this.handleTextFieldChange.username}
              onValidityChange={this.onValidityChange.username} />
          </Grid>

          <Grid item={true}>
            <EmailTextField
              margin='none'
              required={true}
              fullWidth={true}
              label='Email'
              value={this.state.email}
              className='app-register__email-textfield'
              onChange={this.handleTextFieldChange.email}
              onValidityChange={this.onValidityChange.email} />
          </Grid>

          <Grid item={true}>
            <PasswordTextField
              margin='none'
              required={true}
              fullWidth={true}
              label='Password'
              value={this.state.password}
              className='app-register__password-textfield'
              onChange={this.handleTextFieldChange.password}
              onValidityChange={this.onValidityChange.password} />
          </Grid>

          <Grid item={true}>
            <PasswordConfirmationTextField
              margin='none'
              required={true}
              fullWidth={true}
              label='Retype password'
              password={this.state.password}
              value={this.state.passwordConfirmation}
              className='app-register__password-confirmation-textfield'
              onChange={this.handleTextFieldChange.passwordConfirmation}
              onValidityChange={this.onValidityChange.passwordConfirmation} />
          </Grid>

          <Grid item={true}>
            <Button
              variant='raised'
              color='primary'
              fullWidth={true}
              className='app-register__submit-button'
              disabled={this.isFormSubmittable() === false}>
              Register
            </Button>
          </Grid>

          <Grid item={true}>
            <Button
              to='/'
              fullWidth={true}
              component={Link}
              className='app-register__to-login-button'>
              Back to login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  handleTextFieldChange (field, e) {
    this.setState({ [field]: e.target.value })
  }

  onValidityChange (field, isValid) {
    this.setState({ [ fieldValidityMapper[field] ]: isValid })
  }

  isFormSubmittable () {
    return this.state.isEmailValid &&
      this.state.isUsernameValid &&
      this.state.isPasswordValid &&
      this.state.isPasswordConfirmationValid
  }
}


export default withStyles(styles)(Register)
