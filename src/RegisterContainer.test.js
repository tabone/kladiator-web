import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import RegisterContainer from './RegisterContainer'
import Register from './Register'
const mockStore = configureStore()

describe('RegisterContainer Component', () => {
  describe('Rendering the component', () => {
    it('render the Register component', () => {
      const wrapper = shallow(<RegisterContainer />, {
        context: { store: mockStore() }
      })

      expect(wrapper.is(Register)).toBe(true)
    })
  })
})
