import { Map } from 'immutable'
import * as actionCreator from './user'

describe('User Action Creator', () => {
  it('should create an action to add a new user', () => {
    const user = { id: '1' }
    const action = actionCreator.addUser(user)
    expect(action.type).toBe(actionCreator.USER_ADD)
    expect(action.data.equals(Map(user))).toBe(true)
  })
})
