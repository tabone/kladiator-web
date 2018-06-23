import { combineReducers } from 'redux'

import user from './user'
import session from './session'
import notification from './notification'

export default combineReducers({
  user, session, notification
})
