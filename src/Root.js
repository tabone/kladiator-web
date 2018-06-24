import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { AuthError } from './thunks/login'
import NotificationContainer from './NotificationContainer'
import { DELAY_LONG } from './Notification'
import Loading from './Loading'
import Guest from './Guest'
import App from './App'

export default class Root extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { showLoading: !this.props.isLoggedIn }

    this._ = { promises: { authenticateUser: null } }
  }

  componentDidMount () {
    this._.promises.authenticateUser = (this.props.isLoggedIn === true)
      ? Promise.resolve() : this.login()

    return this._.promises.authenticateUser
  }

  render () {
    if (this.state.showLoading === true) return <div><Loading /></div>

    return (
      <BrowserRouter>
        <Fragment>
          { this.props.isLoggedIn === true ? <App /> : <Guest /> }

          <NotificationContainer />
        </Fragment>
      </BrowserRouter>
    )
  }

  login () {
    return this.props.login().catch(err => {
      if (err instanceof AuthError) return

      this.props.addNotification({
        autoHideDuration: DELAY_LONG,
        message: 'An error occurred during authentication',
        action: [
          <Button
            key='close'
            color='secondary'
            size='small'
            onClick={this.props.removeNotification}>
            Close
          </Button>
        ]
      })
    }).then(() => this.setState({ showLoading: false }))
  }
}

Root.propTypes = {
  isLoggedIn: PropTypes.bool,
  login: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired
}

Root.defaultProps = { isLoggedIn: false }
