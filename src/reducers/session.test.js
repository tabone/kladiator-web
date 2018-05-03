import { Map } from 'immutable'
import * as actionCreator from '../actions/session'
import reducer from './session'

describe('Session Reducer', () => {
  it('should return initial state', () => {
    const actual = reducer(undefined, {})
    const expected = Map({ userID: null })
    expect(actual.equals(expected)).toBe(true)
  })

  it('should handle SESSION_LOGIN actions', () => {
    const user = Map({ id: 1 })
    const state = Map({ userID: null })
    const action = actionCreator.loginSession(user)

    const actual = reducer(state, action)
    const expected = Map({ userID: user.get('id') })

    expect(actual.equals(expected)).toBe(true)
  })

  it('should handle SESSION_LOGOUT actions', () => {
    const action = actionCreator.logoutSession()
    const state = Map({ userID: 1 })

    const actual = reducer(state, action)
    const expected = Map({ userID: null })

    expect(actual.equals(expected)).toBe(true)
  })
})
