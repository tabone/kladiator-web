import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeNotification } from './actions/notification'
import Notification from './Notification'

function mapStateToProps (state) {
  const notification = state.notification.get(0) &&
    state.notification.get(0).toJS()
  return { notification: notification || null }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ removeNotification }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
