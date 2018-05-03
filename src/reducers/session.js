import { Map } from 'immutable'
import { SESSION_LOGIN, SESSION_LOGOUT } from '../actions/session'

const defaultSession = Map({ userID: null })

export default function sessionReducer (session = defaultSession, action) {
  switch (action.type) {
    case SESSION_LOGIN: return session.set('userID', action.data.get('id'))
    case SESSION_LOGOUT: return session.set('userID', null)
    default: return session
  }
}
