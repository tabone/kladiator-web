import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import login from './thunks/login'
import { addNotification, removeNotification } from './actions/notification'
import Root from './Root'

function mapStateToProps (state) {
  return { isLoggedIn: state.session.get('userID') !== null }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    login, addNotification, removeNotification
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
