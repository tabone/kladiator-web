import { Map } from 'immutable'

export const SESSION_LOGIN = 'SESSION_LOGIN'
export const SESSION_LOGOUT = 'SESSION_LOGOUT'

export function loginSession (user) {
  return { type: SESSION_LOGIN, data: Map(user) }
}

export function logoutSession () {
  return { type: SESSION_LOGOUT }
}
