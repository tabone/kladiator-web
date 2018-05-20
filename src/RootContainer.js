import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import login from './thunks/login'
import Root from './Root'

function mapStateToProps (state) {
  return { isLoggedIn: state.session.get('userID') !== null }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
