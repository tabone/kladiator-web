import React from 'react'
import { shallow } from 'enzyme'
import Snackbar from 'material-ui/Snackbar'
import { AuthError, ServerError } from './thunks/login'
import App from './App'
import Guest from './Guest'
import Loading from './Loading'
import Root from './Root'

describe('Root Component', () => {
  describe('Rendering the component when the user is authenticated', () => {
    let wrapper = null
    let login = null

    beforeEach(() => {
      login = jest.fn().mockImplementation(() => Promise.resolve())
      wrapper = shallow(<Root isLoggedIn={true} login={login} />)
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
    let wrapper = null
    let login = null

    beforeEach(() => {
      // Mock the login function to return an unresolved promise as if it is
      // still waiting for a response.
      login = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {})
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login} />)
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

    beforeEach(() => {
      const login = jest.fn().mockImplementation(() => Promise.resolve())
      wrapper = shallow(<Root isLoggedIn={false} login={login} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        // Update prop that the container component should update when the user
        // is successfully authenticated.
        wrapper.setProps({ isLoggedIn: true })
        wrapper.update()
      })
    })

    it('should display the App component', () => {
      expect(wrapper.find(App).length).toBe(1)
      expect(wrapper.find(Guest).length).toBe(0)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should not render the Snackbar', () => {
      expect(wrapper.find(Snackbar).length).toBe(0)
    })
  })

  describe('When the user fails to authenticate due to invalid HTTP Cookies', () => {
    let wrapper = null

    beforeEach(() => {
      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new AuthError('401'))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login}/>)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
      })
    })

    it('should display the Guest Component', () => {
      expect(wrapper.find(App).length).toBe(0)
      expect(wrapper.find(Guest).length).toBe(1)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should not display the Snackbar', () => {
      expect(wrapper.find(Snackbar).props().open).toBe(false)
    })
  })

  describe('When the user fails to authenticate due to a server error', () => {
    let wrapper = null

    beforeEach(() => {
      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new ServerError('500'))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login}/>)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
      })
    })

    it('should display the Guest component', () => {
      expect(wrapper.find(App).length).toBe(0)
      expect(wrapper.find(Guest).length).toBe(1)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should display the Snackbar informing the user what went wrong', () => {
      const snackbarWrapper = wrapper.find(Snackbar)
      expect(snackbarWrapper.props().open).toBe(true)
      expect(snackbarWrapper.props().message)
        .toBe(wrapper.state('authenticationError'))
    })
  })

  describe('When the user fails to authenticate due to a client side error', () => {
    let wrapper = null

    beforeEach(() => {
      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('client-side-error'))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login}/>)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
      })
    })

    it('should display the Guest component', () => {
      expect(wrapper.find(App).length).toBe(0)
      expect(wrapper.find(Guest).length).toBe(1)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should display the Snackbar informing the user what went wrong', () => {
      const snackbarWrapper = wrapper.find(Snackbar)
      expect(snackbarWrapper.props().open).toBe(true)
      expect(snackbarWrapper.props().message)
        .toBe(wrapper.state('authenticationError'))
    })
  })

  describe('When clicking on the Snackbar close action button', () => {
    let wrapper = null

    beforeEach(() => {
      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('woops'))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
        wrapper.find(Snackbar).props().action[0].props.onClick()
        wrapper.update()
      })
    })

    it('should hide the Snackbar', () => {
      expect(wrapper.find(Snackbar).props().open).toBe(false)
    })

    it('should clear the state storing the authentication error', () => {
      expect(wrapper.state('authenticationError')).toBe(null )
    })
  })

  describe('When the Snackbar is closed automatically', () => {
    let wrapper = null

    beforeEach(() => {
      const login = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('woops'))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.update()
        wrapper.find(Snackbar).props().onClose()
        wrapper.update()
      })
    })

    it('should hide the Snackbar', () => {
      expect(wrapper.find(Snackbar).props().open).toBe(false)
    })

    it('should clear the state storing the authentication error', () => {
      expect(wrapper.state('authenticationError')).toBe(null)
    })
  })
})
