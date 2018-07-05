import { Map } from 'immutable'
import * as actionCreator from '../actions/fab-action'
import reducer from './fab-action'

describe('FAB Action Reducer', () => {
  it('should return initial state', () => {
    const actual = reducer(undefined, {})
    const expected = Map()
    expect(actual.equals(expected)).toBe(true)
  })

  it('should handle FAB_ACTION_ADD actions', () => {
    const fabAction = {
      fn: () => {},
      icon: 'action-icon',
      caption: 'action-caption',
      key: 'namespace:action-key'
    }

    const state = reducer(undefined, actionCreator.addFABAction(fabAction))
    expect(state.get(fabAction.key).equals(Map(fabAction))).toBe(true)
  })

  it('should throw an error if FAB Action does not have a valid key', () => {
    expect(() => {
      reducer(undefined, actionCreator.addFABAction({
        fn: () => {},
        icon: 'action-icon',
        caption: 'action-caption',
      }))
    }).toThrow()
  })

  it('should handle FAB_ACTION_REMOVE actions', () => {
    const fabActionOne = {
      fn: () => {},
      icon: 'action-icon-one',
      caption: 'action-caption-one',
      key: 'namespace:action-key-one'
    }

    const fabActionTwo = {
      fn: () => {},
      icon: 'action-icon-two',
      caption: 'action-caption-two',
      key: 'namespace:action-key-two'
    }

    const fabActionThree = {
      fn: () => {},
      icon: 'action-icon-three',
      caption: 'action-caption-three',
      key: 'namespace:action-key-three'
    }

    let state = reducer(undefined, actionCreator.addFABAction(fabActionOne))
    state = reducer(state, actionCreator.addFABAction(fabActionTwo))
    state = reducer(state, actionCreator.addFABAction(fabActionThree))

    state = reducer(state, actionCreator.removeFABAction(fabActionTwo.key))

    expect(state.get(fabActionOne.key)).not.toBe(undefined)
    expect(state.get(fabActionTwo.key)).toBe(undefined)
    expect(state.get(fabActionThree.key)).not.toBe(undefined)
  })
})
