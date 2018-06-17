import { fromJS } from 'immutable'

export const NOTIFICATION_ADD = 'NOTIFICATION_ADD'
export const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE'

export function addNotification (notification) {
  return { type: NOTIFICATION_ADD, data: fromJS(notification)}
}

export function removeNotification () {
  return { type: NOTIFICATION_REMOVE }
}
