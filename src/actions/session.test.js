import { Map } from 'immutable'
import * as actionCreator from './session'

describe('Session Action Creator', () => {
  it('should create an action to log the user in', () => {
    const user = { id: '1' }
    const action = actionCreator.loginSession(user)
    expect(action.type).toBe(actionCreator.SESSION_LOGIN)
    expect(action.data.equals(Map(user))).toBe(true)
  })

  it('should create an action to log the user out', () => {
    expect(actionCreator.logoutSession()).toEqual({
      type: actionCreator.SESSION_LOGOUT
    })
  })
})
