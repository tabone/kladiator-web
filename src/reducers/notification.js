import { List } from 'immutable'
import { NOTIFICATION_ADD, NOTIFICATION_REMOVE } from '../actions/notification'

export default function notificationReducer (notifications = List(), action) {
  switch (action.type) {
    case NOTIFICATION_ADD: return notifications.push(action.data)
    case NOTIFICATION_REMOVE: return notifications.shift()
    default: return notifications
  }
}