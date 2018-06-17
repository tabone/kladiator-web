import { fromJS } from 'immutable'
import * as actionCreator from './notification'

describe('Notification Action Creator', () => {
  it('should create an action to push a new notification', () => {
    const notification = {
      duration: 1000,
      actions: [ {
        name: 'action-one'
      }, {
        name: 'action-two'
      } ],
      message: 'notification-message'
    }

    const action = actionCreator.addNotification(notification)
    expect(action.type).toBe(actionCreator.NOTIFICATION_ADD)
    expect(action.data.equals(fromJS(notification))).toBe(true)
  })

  it('should create an action to hide the current notification', () => {
    const action = actionCreator.removeNotification()
    expect(action.type).toBe(actionCreator.NOTIFICATION_REMOVE)
  })
})