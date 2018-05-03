import { Map } from 'immutable'
import { USER_ADD } from '../actions/user'

export default function userReducer (users = Map(), action) {
  switch (action.type) {
    case USER_ADD: return users.set(action.data.get('id'), action.data)
    default: return users
  }
}
