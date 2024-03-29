import { List, fromJS } from 'immutable'
import * as actionCreator from '../actions/notification'
import reducer from './notification'

describe('Notification Reducer', () => {
  it('should return initial state', () => {
    const actual = reducer(undefined, {})
    const expected = List()
    expect(actual.equals(expected)).toBe(true)
  })

  it('should handle NOTIFICATION_ADD actions', () => {
    const noteOne = {
      autoHideDuration: 2000,
      message: 'message-one',
      actions: [ { name: 'action-one-one' }, { name: 'action-one-two' } ]
    }

    const noteTwo = {
      autoHideDuration: 1000,
      message: 'message-two',
      actions: [ { name: 'action-two-one' }, { name: 'action-two-two' } ]
    }

    let state = reducer(undefined, actionCreator.addNotification(noteOne))
    state = reducer(state, actionCreator.addNotification(noteTwo))

    expect(state.equals(fromJS([ noteOne, noteTwo ]))).toBe(true)
  })

  it('should handle NOTIFICATION_REMOVE actions', () => {
    const noteOne = {
      autoHideDuration: 2000,
      message: 'message-one',
      actions: [ { name: 'action-one-one' }, { name: 'action-one-two' } ]
    }

    const noteTwo = {
      autoHideDuration: 1000,
      message: 'message-two',
      actions: [ { name: 'action-two-one' }, { name: 'action-two-two' } ]
    }

    let state = reducer(undefined, actionCreator.addNotification(noteOne))
    state = reducer(state, actionCreator.addNotification(noteTwo))

    state = reducer(state, actionCreator.removeNotification())

    expect(state.equals(fromJS([ noteTwo ]))).toBe(true)
  })
})
