import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import login from './thunks/login'
import Login from './Login'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
