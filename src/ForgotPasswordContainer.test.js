import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordContainer from './ForgotPasswordContainer'

const mockStore = configureStore()

describe('ForgotPasswordContainer Component', () => {
  describe('Rendering the component', () => {
    it('should render the ForgotPassword component', () => {
      const wrapper = shallow(<ForgotPasswordContainer />, {
        context: { store: mockStore() }
      })

      expect(wrapper.is(ForgotPassword)).toBe(true)
    })
  })
})
