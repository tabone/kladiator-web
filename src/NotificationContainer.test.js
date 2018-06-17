import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Map, List } from 'immutable'
import { NOTIFICATION_REMOVE } from './actions/notification'
import Notification from './Notification'
import NotificationContainer from './NotificationContainer'

const mockStore = configureStore()

describe('NotificationContainer component', () => {
  describe('Rendering the component while there are no notifications', () => {
    let store = null
    let wrapper = null

    beforeEach(() => {
      store = mockStore({ notification: List() })
      wrapper = shallow(<NotificationContainer />, { context: { store } })
    })

    it('should render the Notification component', () => {
      expect(wrapper.is(Notification)).toBe(true)
    })

    it('should not provide any notification to the Notification component', () => {
      expect(wrapper.props().notification).toBe(null)
    })
  })

  describe('Rendering the component while there are notifications', () => {
    let store = null
    let noteOne = null
    let noteTwo = null
    let wrapper = null

    beforeEach(() => {
      noteOne = Map({ message: 'message-one' })
      noteTwo = Map({ message: 'message-two' })
      store = mockStore({ notification: List([ noteOne, noteTwo ]) })
      wrapper = shallow(<NotificationContainer />, { context: { store } })
    })

    it('should render the Notification component', () => {
      expect(wrapper.is(Notification)).toBe(true)
    })

    it('should provide the first notification added to the Notification component', () => {
      expect(noteOne.equals(Map(wrapper.props().notification))).toBe(true)
    })
  })

  describe('Removing a notification', () => {
    let store = null
    let wrapper = null

    beforeEach(() => {
      store = mockStore({ notification: List([]) })
      wrapper = shallow(<NotificationContainer />, { context: { store } })
      wrapper.props().removeNotification()
    })

    it('should dispatch an action to the store to remove the current visible notification', () => {
      const actions = store.getActions()
      expect(actions.length).toBe(1)
      expect(actions[0].type).toBe(NOTIFICATION_REMOVE)
    })
  })
})
