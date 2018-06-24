import { Map } from 'immutable'

export const FAB_ACTION_ADD = 'FAB_ACTION_ADD'
export const FAB_ACTION_REMOVE = 'FAB_ACTION_REMOVE'

export function addFABAction (fabAction) {
  return { type: FAB_ACTION_ADD, data: Map(fabAction) }
}

export function removeFABAction (fabActionKey) {
  return { type: FAB_ACTION_REMOVE, data: fabActionKey }
}
