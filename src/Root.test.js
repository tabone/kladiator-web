import React from 'react'
import { shallow } from 'enzyme'
import { API_HOSTNAME } from './config'
import App from './App'
import Guest from './Guest'
import Loading from './Loading'
import Root from './Root'

describe('Root Component', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch')
  })

  afterAll(() => {
    global.fetch.mockRestore()
  })

  afterEach(() => {
    global.fetch.mockReset()
  })

  describe('Rendering the Root Component when the user is authenticated', () => {
    let wrapper = null

    beforeEach(() => {
      global.fetch.mockImplementation(() => {
        return new Promise((resolve, reject) => {})
      })

      wrapper = shallow(<Root isLoggedIn={true} login={() => {}}/>)
    })

    it('should not attempt to authenticate the user', () => {
      expect(global.fetch).toHaveBeenCalledTimes(0)
    })

    it('should display the App Component', () => {
      expect(wrapper.is(App)).toBe(true)
    })
  })

  describe('Rendering the Root Component when the user is not authenticated', () => {
    let wrapper = null

    beforeEach(() => {
      global.fetch.mockImplementation(() => {
        return new Promise((resolve, reject) => {})
      })

      wrapper = shallow(<Root isLoggedIn={false} login={() => {}}/>)
    })

    it('should attempt to authenticate the user', () => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/me`)
    })

    it('should display the Loading Component', () => {
      expect(wrapper.is(Loading)).toBe(true)
    })
  })

  describe('Unsuccessful Authentication', () => {
    let login = null
    let wrapper = null

    beforeEach(() => {
      login = jest.fn()

      global.fetch.mockImplementation(() => {
        return new Promise((resolve, reject) => resolve({ status: 401 }))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
      })
    })

    it('should not invoke the login prop function', () => {
      expect(login).toHaveBeenCalledTimes(0)
    })

    it('should display the Guest Component', () => {
      expect(wrapper.is(Guest)).toBe(true)
    })
  })

  describe('Successful Authentication', () => {
    let user = null
    let login = null
    let wrapper = null

    beforeEach(() => {
      user = { id: 1 }
      const response = { status: 200, json: () => user }
      login = jest.fn()

      global.fetch.mockImplementation(() => {
        return new Promise((resolve, reject) => resolve(response))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        // Update prop that is expected to be updated by the container component
        // once the user logs in.
        wrapper.setProps({ isLoggedIn: true })
        wrapper.update()
      })
    })

    it('should invoke the login prop function with the user info', () => {
      expect(login).toHaveBeenCalledTimes(1)
      expect(login).toHaveBeenCalledWith(user)
    })

    it('should display the App Component', () => {
      expect(wrapper.is(App)).toBe(true)
    })
  })
})
