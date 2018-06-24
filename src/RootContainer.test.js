import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Map } from 'immutable'
import Root from './Root'
import RootContainer from './RootContainer'
import { NOTIFICATION_ADD, NOTIFICATION_REMOVE } from './actions/notification'

const mockStore = configureStore()

jest.mock('./thunks/login', () => {
  return jest.fn().mockImplementation((...args) => {
    return { type: 'loginThunk', args }
  })
})

describe('Root Container Component', () => {
  describe('Rendering component when user is not logged in', () => {
    let wrapper = null

    beforeEach(() => {
      const store = mockStore({ session: Map({ userID: null }) })
      wrapper = shallow(<RootContainer />, { context: { store } })
    })

    it('should set the isLoggedIn prop to false', () => {
      expect(wrapper.props().isLoggedIn).toBe(false)
    })

    it('should render the Root component', () => {
      expect(wrapper.is(Root)).toBe(true)
    })
  })

  describe('Rendering component when user is logged in', () => {
    let wrapper = null

    beforeEach(() => {
      const store = mockStore({ session: Map({ userID: 1 }) })
      wrapper = shallow(<RootContainer />, { context: { store } })
    })

    it('should set the isLoggedIn prop to true', () => {
      expect(wrapper.props().isLoggedIn).toBe(true)
    })

    it('should render the Root component', () => {
      expect(wrapper.is(Root)).toBe(true)
    })
  })

  describe('Authenticating the user', () => {
    let store = null
    let wrapper = null

    beforeEach(() => {
      store = mockStore({ session: Map({ userID: 1 }) })
      wrapper = shallow(<RootContainer />, { context: { store } })
      wrapper.props().login()
    })

    it('should invoke the login thunk', () => {
      expect(store.getActions().length).toBe(1)

      const action = store.getActions()[0]
      expect(action.type).toBe('loginThunk')
      expect(action.args.length).toBe(0)
    })
  })

  describe('Showing a notification', () => {
    let store = null
    let wrapper = null

    beforeEach(() => {
      store = mockStore({ session: Map() })
      wrapper = shallow(<RootContainer />, { context: { store } })
      wrapper.props().addNotification()
    })

    it('should dispatch an NOTIFICATION_ADD action to the store', () => {
      expect(store.getActions().length).toBe(1)
      expect(store.getActions()[0].type).toBe(NOTIFICATION_ADD)
    })
  })

  describe('Removing a notification', () => {
    let store = null
    let wrapper = null

    beforeEach(() => {
      store = mockStore({ session: Map() })
      wrapper = shallow(<RootContainer />, { context: { store } })
      wrapper.props().removeNotification()
    })

    it('should dispatch a NOTIFICATION_REMOVE action to the store', () => {
      expect(store.getActions().length).toBe(1)
      expect(store.getActions()[0].type).toBe(NOTIFICATION_REMOVE)
    })
  })
})
