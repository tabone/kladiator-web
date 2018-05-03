import { connect } from 'react-redux'
import { addUser } from './actions/user'
import { loginSession } from './actions/session'
import Root from './Root'

function mapStateToProps (state) {
  return { isLoggedIn: state.session.get('userID') !== null }
}

function mapDispatchToProps (dispatch) {
  return {
    login (user) {
      dispatch(addUser(user))
      dispatch(loginSession(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
