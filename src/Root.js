import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
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

    this._ = {
      promises: { authenticateUser: null }
    }
  }

  componentDidMount () {
    this._.promises.authenticateUser = (this.props.isLoggedIn === true)
      ? Promise.resolve() : this.login()

    return this._.promises.authenticateUser
  }

  render () {
    const component = (this.state.showLoading === true) ? <Loading />
      : (this.props.isLoggedIn === true) ? <App /> : <Guest />

    return (
      <div>
        {component}

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
      </div>
    )
  }

  login () {
    return this.props.login().then(() => {
      this.setState({ showLoading: false })
    }).catch(err => {
      this.setState({
        showLoading: false,
        authenticationError: 'An error occurred during authentication',
      })
    })
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
