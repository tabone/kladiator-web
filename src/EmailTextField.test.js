import React from 'react'
import { shallow } from 'enzyme'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'
import {
  EMAIL_VALIDATION_ERR,
  default as EmailTextField
} from './EmailTextField'

describe('EmailTextField Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<EmailTextField />)
    })

    it('should render a ValidationTextField component', () => {
      expect(wrapper.is(ValidationTextField)).toBe(true)
    })
  })

  describe('Validating a valid email', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<EmailTextField/>)
      wrapper.props().onValidation('taboneluca3@gmail.com')
      wrapper.update()
    })

    it('should indicate that it is valid', () => {
      expect(wrapper.props().helperText).toBe(VALIDITY_VALID)
    })
  })

  describe('Validating an invalid email', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<EmailTextField/>)
      wrapper.props().onValidation('taboneluca3com')
      wrapper.update()
    })

    it('should return a message informing the user that the email is invalid', () => {
      expect(wrapper.props().helperText).toBe(EMAIL_VALIDATION_ERR)
    })
  })
})
