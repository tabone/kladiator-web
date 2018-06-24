import { Map } from 'immutable'
import { FAB_ACTION_ADD, FAB_ACTION_REMOVE } from '../actions/fab-action'

export default function fabActionReducer (state = Map(), action) {
  switch (action.type) {
    case FAB_ACTION_ADD: {
      const fabActionKey = action.data.get('key')

      if (fabActionKey == null) {
        throw new Error('FAB Actions must have a `key` attribute')
      }

      return state.set(fabActionKey, action.data)
    }
    case FAB_ACTION_REMOVE: return state.delete(action.data)
    default: return state
  }
}
