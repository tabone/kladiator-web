import React from 'react'
import { shallow } from 'enzyme'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'
import {
  USERNAME_LENGTH_ERR,
  USERNAME_CONTENT_ERR,
  default as UsernameTextField
} from './UsernameTextField'

describe('UsernameTextField Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<UsernameTextField />)
    })

    it('should render a ValidationTextField component', () => {
      expect(wrapper.is(ValidationTextField)).toBe(true)
    })
  })

  describe('Validating a username that meets all criteria', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<UsernameTextField />)
      wrapper.props().onValidation('tabo_ne-3')
      wrapper.update()
    })

    it('should indicate that it is valid', () => {
      expect(wrapper.props().helperText).toBe(VALIDITY_VALID)
    })
  })

  describe('Validating a username that does not meet the length criteria', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<UsernameTextField />)
      wrapper.props().onValidation('ta')
      wrapper.update()
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(wrapper.props().helperText).toBe(USERNAME_LENGTH_ERR)
    })
  })

  describe('Validating a username that has an unaccepted character', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<UsernameTextField />)
      wrapper.props().onValidation('tabone^')
      wrapper.update()
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(wrapper.props().helperText).toBe(USERNAME_CONTENT_ERR)
    })
  })
})
