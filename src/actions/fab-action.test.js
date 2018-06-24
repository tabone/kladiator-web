import { Map } from 'immutable'
import * as actionCreator from './fab-action'

describe('FAB Action Action Creator', () => {
  it('should create an action to add a FAB Action', () => {
    const fabAction = {
      fn: () => {},
      icon: 'action-icon',
      caption: 'action-caption',
      key: 'namespace:action-key'
    }

    const action = actionCreator.addFABAction(fabAction)
    expect(action.type).toBe(actionCreator.FAB_ACTION_ADD)
    expect(action.data.equals(Map(fabAction))).toBe(true)
  })

  it('should create an action to remove a FAB Action', () => {
    const fabKey = 'namespace:action-key'
    const action = actionCreator.removeFABAction(fabKey)
    expect(action.type).toBe(actionCreator.FAB_ACTION_REMOVE)
    expect(action.data).toBe(fabKey)
  })
})
