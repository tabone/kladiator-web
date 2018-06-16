import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import loginThunk from './thunks/login'
import Login from './Login'
import LoginContainer from './LoginContainer'

const mockStore = configureStore()

jest.mock('./thunks/login', () => {
  return jest.fn().mockImplementation((...args) => {
    return { type: 'loginThunk', args }
  })
})

describe('LoginContainer Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      const store = mockStore()
      wrapper = shallow(<LoginContainer />, { context: { store }})
    })

    it('should render the Login Component', () => {
      expect(wrapper.is(Login)).toBe(true)
    })
  })

  describe('Authenticating the user', () => {
    let store = null
    let wrapper = null

    beforeEach(() => {
      store = mockStore()
      wrapper = shallow(<LoginContainer />, { context: { store }})
      wrapper.props().login()
    })

    it('should invoke the login thunk', () => {
      expect(store.getActions().length).toBe(1)

      const action = store.getActions()[0]
      expect(action.type).toBe('loginThunk')
      expect(action.args.length).toBe(0)
    })
  })
})
