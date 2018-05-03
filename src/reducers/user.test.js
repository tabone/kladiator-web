import { Map } from 'immutable'
import * as actionCreator from '../actions/user'
import reducer from './user'

describe('User Reducer', () => {
  it('should return initial state', () => {
    const actual = reducer(undefined, {})
    const expected = Map()
    expect(actual.equals(expected)).toBe(true)
  })

  it('should handle USER_ADD actions', () => {
    const user = Map({ id: 1 })
    const state = Map()
    const action = actionCreator.addUser(user)

    const actual = reducer(state, action)
    const expected = Map([[ user.get('id'), user ]])

    expect(actual.equals(expected)).toBe(true)
  })
})
