import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EmailTextField from './EmailTextField'

const styles = () => {
  return {
    appForgotPassword: {
      padding: '18px',
      minHeight: '100vh'
    },
    appForgotPasswordAvatar: {
      textAlign: 'center'
    }
  }
}

class ForgotPassword extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      isEmailValid: false
    }

    this.onEmailValidityChange = this.onEmailValidityChange.bind(this)
    this.handleEmailTextFieldChange = this.handleEmailTextFieldChange.bind(this)
  }

  render () {
    const { classes } = this.props

    return (
      <Grid container={true}
        className={classes.appForgotPassword}
        direction='column'
        justify='flex-start'>
        <Grid item={true} className={classes.appForgotPasswordAvatar}>
          <img src='images/surprised.png' width='200' alt='Surprised Kladiator' />
        </Grid>

        <Grid container={true} item={true} direction='column' spacing={16}>
          <Grid item={true}>
            <Typography variant='title' align='center'>
              Forgot your password?
            </Typography>
          </Grid>

          <Grid item={true}>
            <Typography align='center'>
              Enter your email below to receive your password reset instructions.
            </Typography>
          </Grid>

          <Grid item={true}>
            <EmailTextField
              margin='none'
              label='Email'
              required={true}
              autoFocus={true}
              fullWidth={true}
              value={this.state.email}
              onChange={this.handleEmailTextFieldChange}
              onValidityChange={this.onEmailValidityChange}
              className='app-forgot-password__email-textfield' />
          </Grid>

          <Grid item={true}>
            <Button
              color='primary'
              fullWidth={true}
              variant='raised'
              disabled={this.isFormSubmittable() === false}
              className='app-forgot-password__submit-button'>
              Send Instructions
            </Button>
          </Grid>

          <Grid item={true}>
            <Button
              to='/'
              fullWidth={true}
              component={Link}>
              Back to login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  handleEmailTextFieldChange (e) {
    this.setState({ email: e.target.value })
  }

  isFormSubmittable () {
    return this.state.isEmailValid === true
  }

  onEmailValidityChange (isEmailValid) {
    this.setState({ isEmailValid })
  }
}

export default withStyles(styles)(ForgotPassword)
