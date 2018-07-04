import { combineReducers } from 'redux'

import user from './user'
import session from './session'
import notification from './notification'
import fabAction from './fab-action'

export default combineReducers({
  user,
  session,
  notification,
  'fab-action': fabAction
})
