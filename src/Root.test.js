import React from 'react'
import { shallow } from 'enzyme'
import { AuthError, ServerError } from './thunks/login'
import App from './App'
import Guest from './Guest'
import Loading from './Loading'
import Root from './Root'

describe('Root Component', () => {
  describe('Rendering the component when the user is authenticated', () => {
    let login = null
    let wrapper = null

    beforeEach(() => {
      login = jest.fn().mockImplementation(() => Promise.resolve())

      wrapper = shallow(<Root
        login={login}
        isLoggedIn={true}
        addNotification={()=>{}}
        removeNotification={()=>{}} />)
    })

    it('should display the App component', () => {
      expect(wrapper.find(App).length).toBe(1)
      expect(wrapper.find(Guest).length).toBe(0)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should not attempt to authenticate the user', () => {
      expect(login).not.toHaveBeenCalled()
    })
  })

  describe('Rendering the component when the user is not authenticated', () => {
    let login = null
    let wrapper = null

    beforeEach(() => {
      // Mock the login function to return an unresolved promise as if it is
      // still waiting for a response.
      login = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {})
      })

      wrapper = shallow(<Root
        login={login}
        isLoggedIn={false}
        addNotification={()=>{}}
        removeNotification={()=>{}} />)
    })

    it('should display the Loading component', () => {
      expect(wrapper.find(App).length).toBe(0)
      expect(wrapper.find(Guest).length).toBe(0)
      expect(wrapper.find(Loading).length).toBe(1)
    })

    it('should attempt to authenticate the user', () => {
      expect(login).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the user is successfully authenticated', () => {
    let wrapper = null
    let addNotification = null

    beforeEach(() => {
      addNotification = jest.fn()

      const login = jest.fn().mockImplementation(() => Promise.resolve())

      wrapper = shallow(<Root
        login={login}
        isLoggedIn={false}
        removeNotification={()=>{}}
        addNotification={addNotification} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        // Update prop that the container component should update when the user
        // is successfully authenticated.
        wrapper.setProps({ isLoggedIn: true })
      })
    })

    it('should display the App component', () => {
      expect(wrapper.find(App).length).toBe(1)
      expect(wrapper.find(Guest).length).toBe(0)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should not display a notification', () => {
      expect(addNotification).not.toHaveBeenCalled()
    })
  })

  describe('When the user fails to authenticate due to invalid HTTP Cookies', () => {
    let wrapper = null
    let addNotification = null

    beforeEach(() => {
      addNotification = jest.fn()

      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new AuthError('401'))
      })

      wrapper = shallow(<Root
        login={login}
        isLoggedIn={false}
        removeNotification={()=>{}}
        addNotification={addNotification} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
      })
    })

    it('should display the Guest Component', () => {
      expect(wrapper.find(App).length).toBe(0)
      expect(wrapper.find(Guest).length).toBe(1)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should not display a notification', () => {
      expect(addNotification).not.toHaveBeenCalled()
    })
  })

  describe('When the user fails to authenticate due to a server error', () => {
    let wrapper = null
    let addNotification = null

    beforeEach(() => {
      addNotification = jest.fn()

      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new ServerError('500'))
      })

      wrapper = shallow(<Root
        login={login}
        isLoggedIn={false}
        removeNotification={()=>{}}
        addNotification={addNotification} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
      })
    })

    it('should display the Guest component', () => {
      expect(wrapper.find(App).length).toBe(0)
      expect(wrapper.find(Guest).length).toBe(1)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should display a notification', () => {
      expect(addNotification).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the user fails to authenticate due to a client side error', () => {
    let wrapper = null
    let addNotification = null

    beforeEach(() => {
      addNotification = jest.fn()

      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('client-side-error'))
      })

      wrapper = shallow(<Root
        login={login}
        isLoggedIn={false}
        removeNotification={()=>{}}
        addNotification={addNotification} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
      })
    })

    it('should display the Guest component', () => {
      expect(wrapper.find(App).length).toBe(0)
      expect(wrapper.find(Guest).length).toBe(1)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should display a notification', () => {
      expect(addNotification).toHaveBeenCalledTimes(1)
    })
  })

  describe('Removing the notification', () => {
    let wrapper = null
    let addNotification = null
    let removeNotification = null

    beforeEach(() => {
      addNotification = jest.fn()
      removeNotification = jest.fn()

      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('woops'))
      })

      wrapper = shallow(<Root
        login={login}
        isLoggedIn={false}
        addNotification={addNotification}
        removeNotification={removeNotification} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        addNotification.mock.calls[0][0].action[0].props.onClick()
      })
    })

    it('should remove the notification', () => {
      expect(removeNotification).toHaveBeenCalledTimes(1)
    })
  })
})
