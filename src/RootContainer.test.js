import React from 'react'
import { createStore } from 'redux'
import { shallow } from 'enzyme'
import { Map } from 'immutable'
import RootContainer from './RootContainer'
import reducers from './reducers/index'
import { loginSession } from './actions/session'

describe('RootContainer Component', () => {
  let store = null

  beforeEach(() => {
    store = createStore(reducers)
  })

  describe('Rendering Component when user is logged out', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<RootContainer />, { context: { store } })
    })

    it('should set the isLoggedIn prop to false', () => {
      expect(wrapper.props().isLoggedIn).toBe(false)
    })
  })

  describe('Rendering Component when user is logged in', () => {
    let user = null
    let wrapper = null

    beforeEach(() => {
      user = { id: 1, username: 'lucat' }
      store.dispatch(loginSession(user))
      wrapper = shallow(<RootContainer />, { context: { store } })
    })

    it('should set the isLoggedIn prop to true', () => {
      expect(wrapper.props().isLoggedIn).toBe(true)
    })
  })

  describe('Logging in the user', () => {
    let user = null
    let wrapper = null

    beforeEach(() => {
      user = { id: 1, username: 'lucat'}
      wrapper = shallow(<RootContainer />, { context: { store } })
      wrapper.props().login(user)
    })

    it('should store the user ID in the session namespace in the store', () => {
      expect(store.getState().session.get('userID')).toBe(user.id)
    })

    it('should add the user in the user namespace in the store', () => {
      expect(store.getState().user.get(user.id).equals(Map(user))).toBe(true)
    })
  })
})
