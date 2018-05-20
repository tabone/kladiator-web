import { Map } from 'immutable'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import configureStore from 'redux-mock-store'
import { API_HOSTNAME } from '../config'
import { USER_ADD } from '../actions/user'
import { SESSION_LOGIN } from '../actions/session'
import { AuthError, ServerError, default as login } from './login'

jest.mock('../actions/user', () => mockActionCreators('addUser'))
jest.mock('../actions/session', () => mockActionCreators('loginSession'))

function mockActionCreators (...actionCreators) {
  return actionCreators.reduce((module, actionCreator) => {
    module[actionCreator] = (...args) => ({ type: actionCreator, args })
    return module
  }, {})
}

const mockStore = configureStore([ thunk ])

describe('Login Thunk', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  describe('Authenticating the user with credentials', () => {
    let credentials = null

    beforeEach(() => {
      credentials = { username: 'tabone', password: 'abc123' }

      fetchMock.mock('*', { status: 200, user: { id: 1 } })
      const store = mockStore({})
      store.dispatch(login(credentials))
    })

    it('should make an HTTP POST Request with the credentials in the Request Body', () => {
      const calls = fetchMock.calls()
      expect(calls.length).toBe(1)
      expect(calls[0][0]).toBe(`${API_HOSTNAME}/login`)
      expect(calls[0][1].data).toEqual(credentials)
    })
  })

  describe('Authenticating the user with cookies', () => {
    beforeEach(() => {
      fetchMock.mock('*', { status: 200, user: { id: 1 }})
      const store = mockStore({})
      store.dispatch(login())
    })

    it('should make an HTTP POST Request with HTTP Cookies & an empty Request Body', () => {
      const calls = fetchMock.calls()
      expect(calls.length).toBe(1)
      expect(calls[0][0]).toBe(`${API_HOSTNAME}/login`)
      expect(calls[0][1].data).toEqual({})
      expect(calls[0][1].credentials).toEqual('include')
    })
  })

  describe('Successful authentication', () => {
    let store = null
    let user = null

    beforeEach(() => {
      user = { id: '1', username: 'tabone' }

      fetchMock.mock('*', { status: 200, body: user })
      store = mockStore({})
      return store.dispatch(login())
    })

    it('should dispatch two actions', () => {
      expect(store.getActions().length).toBe(2)
    })

    it('should dispatch a USER_ADD action to store the user info', () => {
      const action = store.getActions()[0]
      expect(action.type).toBe('addUser')
      expect(action.args).toEqual([ user ])
    })

    it('should dispatch a SESSION_LOGIN action to authenticate the user', () => {
      const action = store.getActions()[1]
      expect(action.type).toBe('loginSession')
      expect(action.args).toEqual([ user ])
    })
  })

  describe('Unsuccessful authentication', () => {
    let status = null
    let error = null
    let store = null

    beforeEach(() => {
      status = 401
      fetchMock.mock('*', { status })

      store = mockStore({})
      return store.dispatch(login()).then(() => {
        throw new Error('Expected a rejected promise')
      }).catch(err => {
        error = err
      })
    })

    it('should return a promise rejected the authentication error object containing info about the HTTP Status', () => {
      expect(error instanceof AuthError).toBe(true)
      expect(error.message).toBe(String(status))
    })

    it('should not dispatch any actions', () => {
      expect(store.getActions().length).toBe(0)
    })
  })

  describe('Server error', () => {
    let status = null
    let error = null
    let store = null

    beforeEach(() => {
      status = 500
      fetchMock.mock('*', { status })

      store = mockStore({})
      return store.dispatch(login()).then(() => {
        throw new Error('Expected a rejected promise')
      }).catch(err => {
        error = err
      })
    })

    it('should return a promise rejected the server error object containing info about the HTTP Status', () => {
      expect(error instanceof ServerError).toBe(true)
      expect(error.message).toBe(String(status))
    })

    it('should not dispatch any actions', () => {
      expect(store.getActions().length).toBe(0)
    })
  })
})
