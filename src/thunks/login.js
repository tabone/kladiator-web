import { addUser } from '../actions/user'
import { loginSession } from '../actions/session'
import { API_HOSTNAME } from '../config'

export default function loginThunk (credentials = {}) {
  return dispatch => {
    const url = `${API_HOSTNAME}/login`

    return fetch(url, {
      method: 'POST',
      data: credentials,
      credentials: 'include',
      headers: { 'content-type': 'application/json' }
    }).then(response => {
      switch (response.status) {
        case 200: return response.json()
        case 401: throw new AuthError(response.status)
        default: throw new ServerError(response.status)
      }
    }).then(user => {
      dispatch(addUser(user))
      dispatch(loginSession(user))
    })
  }
}

export class AuthError extends Error {}
export class ServerError extends Error {}
