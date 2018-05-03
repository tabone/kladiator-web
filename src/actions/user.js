import { Map } from 'immutable'

export const USER_ADD = 'USER_ADD'

export function addUser (user) {
  return { type: USER_ADD, data: Map(user) }
}
