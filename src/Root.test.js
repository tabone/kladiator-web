import React from 'react'
import { shallow } from 'enzyme'
import Snackbar from 'material-ui/Snackbar'
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
      // Mock the login function to return a unresolved promise.
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

  describe('Successful authentication', () => {
    let wrapper = null
    let login = null

    beforeEach(() => {
      login = jest.fn().mockImplementation(() => Promise.resolve())
      wrapper = shallow(<Root isLoggedIn={false} login={login} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        // Update prop that the container component should update when the user
        // is successfully authenticated.
        wrapper.setProps({ isLoggedIn: true })
        wrapper.update()
      })
    })

    it('should display the App Component', () => {
      expect(wrapper.find(App).length).toBe(1)
      expect(wrapper.find(Guest).length).toBe(0)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should not display the Snackbar', () => {
      expect(wrapper.find(Snackbar).props().open).toBe(false)
    })
  })

  describe('Unsuccessful authentication', () => {
    let wrapper = null
    let login = null

    beforeEach(() => {
      login = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('woops'))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        // Unlike the successful authentication test case the prop that should
        // be updated when the user is successfully authenticate, is not
        // updated.
        wrapper.update()
      })
    })

    it('should display the Guest Component', () => {
      expect(wrapper.find(App).length).toBe(0)
      expect(wrapper.find(Guest).length).toBe(1)
      expect(wrapper.find(Loading).length).toBe(0)
    })

    it('should display the Snackbar informing the user about the error', () => {
      expect(wrapper.find(Snackbar).props().open).toBe(true)
    })
  })

  describe('Closing the Snackbar displaying the error', () => {
    let wrapper = null
    let login = null

    beforeEach(() => {
      login = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('woops'))
      })

      wrapper = shallow(<Root isLoggedIn={false} login={login} />)

      return wrapper.instance()._.promises.authenticateUser.then(() => {
        wrapper.instance().handleSnackBarClose()
        wrapper.update()
      })
    })

    it('should hide the Snackbar', () => {
      expect(wrapper.find(Snackbar).props().open).toBe(false)
    })
  })
})
