import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { AuthError } from './thunks/login'
import Loading from './Loading'
import Guest from './Guest'
import App from './App'

export default class Root extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      authenticationError: null,
      showLoading: !this.props.isLoggedIn
    }

    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)

    this._ = { promises: { authenticateUser: null } }
  }

  componentDidMount () {
    this._.promises.authenticateUser = (this.props.isLoggedIn === true)
      ? Promise.resolve() : this.login()

    return this._.promises.authenticateUser
  }

  render () {
    if (this.state.showLoading === true) return <div><Loading /></div>

    if (this.props.isLoggedIn === true) {
      return <BrowserRouter><App /></BrowserRouter>
    }

    return (
      <BrowserRouter>
        <Fragment>
          <Guest />

          <Snackbar
            open={this.state.authenticationError !== null}
            message={this.state.authenticationError}
            autoHideDuration={3500}
            onClose={this.handleSnackBarClose}
            action={[
              <Button
                key='close'
                color='secondary'
                size='small'
                onClick={this.handleSnackBarClose}>
                Close
              </Button>
            ]}
          />
        </Fragment>
      </BrowserRouter>
    )
  }

  login () {
    const newState = { showLoading: false }

    return this.props.login().catch(err => {
      if (err instanceof AuthError) return
      newState.authenticationError = 'An error occurred during authentication'
    }).then(() => this.setState(newState))
  }

  handleSnackBarClose () {
    this.setState({ authenticationError: null })
  }
}

Root.propTypes = {
  isLoggedIn: PropTypes.bool,
  login: PropTypes.func.isRequired
}

Root.defaultProps = { isLoggedIn: false }
