import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { API_HOSTNAME } from './config'
import Loading from './Loading'
import Guest from './Guest'
import App from './App'

export default class Root extends PureComponent {
  constructor (props) {
    super(props)

    this.authenticateUser = authenticateUser.bind(this)

    this.state = { showLoading: !this.props.isLoggedIn }

    this._ = {
      promises: { authenticateUser: null }
    }
  }

  componentDidMount () {
    this._.promises.authenticateUser = (this.props.isLoggedIn === true)
      ? Promise.resolve() : this.authenticateUser()

    return this._.promises.authenticateUserPromise
  }

  render () {
    if (this.state.showLoading === true) return <Loading />
    return (this.props.isLoggedIn === true) ? <App /> : <Guest />
  }
}

Root.propTypes = {
  isLoggedIn: PropTypes.bool,
  login: PropTypes.func.isRequired
}

Root.defaultProps = { isLoggedIn: false }

function authenticateUser () {
  return window.fetch(`${API_HOSTNAME}/me`).then((response) => {
    if (response.status === 200) this.props.login(response.json())
  }).catch((err) => {
    console.error(err)
  }).then(() => {
    this.setState({ showLoading: false })
  })
}
