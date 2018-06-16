import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { setupHandlers } from './utils/index'
import UsernameTextField from './UsernameTextField'
import PasswordTextField from './PasswordTextField'

const styles = () => {
  return {
    appLogin: {
      padding: '18px',
      minHeight: '100vh'
    },
    appLoginLogo: {
      textAlign: 'center'
    },
    appLoginForgotPassword: {
      textAlign: 'right'
    }
  }
}

const fieldValidityMapper = {
  username: 'isUsernameValid',
  password: 'isPasswordValid'
}

class Login extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      isUsernameValid: false,
      isPasswordValid: false
    }

    this.onValidityChange = setupHandlers([
      'username',
      'password'
    ], this.onValidityChange, this)

    this.handleTextFieldChange = setupHandlers([
      'username',
      'password'
    ], this.handleTextFieldChange, this)
  }

  render () {
    const { classes } = this.props

    return (
      <Grid className={classes.appLogin}
        container={true}
        direction='column'
        justify='space-between'>
        <Grid item={true} className={classes.appLoginTitle}>
          <Typography variant='display3' align='center'>Kladiator</Typography>
        </Grid>

        <Grid item={true} className={classes.appLoginLogo}>
          <img src='images/logo.png' width='150' alt='Kladiator Logo' />
        </Grid>

        <Grid container={true} item={true} spacing={16} direction='column'>
          <Grid item={true}>
            <UsernameTextField
              margin='none'
              required={true}
              fullWidth={true}
              label='Username:'
              value={this.state.username}
              className='app-login__username-textfield'
              onChange={this.handleTextFieldChange.username}
              onValidityChange={this.onValidityChange.username} />
          </Grid>

          <Grid item={true}>
            <PasswordTextField
              margin='none'
              type='password'
              required={true}
              fullWidth={true}
              label='Password:'
              value={this.state.password}
              className='app-login__password-textfield'
              onChange={this.handleTextFieldChange.password}
              onValidityChange={this.onValidityChange.password} />
          </Grid>

          <Grid item={true} className={classes.appLoginForgotPassword}>
            <Button
              component={Link}
              to='/forgot-password'
              className='app-login__to-forgot-password-button'>
              Forgot your password?
            </Button>
          </Grid>

          <Grid item={true}>
            <Button
              color='primary'
              fullWidth={true}
              variant='raised'
              onClick={this.props.login}
              className='app-login__submit-button'
              disabled={this.isFormSubmittable() === false}>
              Sign In
            </Button>
          </Grid>

          <Grid item={true}>
            <Button
              to='/register'
              fullWidth={true}
              variant='raised'
              component={Link}
              color='secondary'
              className='app-login__to-register-button' >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  handleTextFieldChange (field, e) {
    this.setState({ [ field ]: e.target.value })
  }

  onValidityChange (field, isValid) {
    this.setState({ [ fieldValidityMapper[field] ]: isValid })
  }

  isFormSubmittable () {
    return this.state.isUsernameValid && this.state.isPasswordValid
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default withStyles(styles)(Login)
