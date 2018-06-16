import React from 'react'
import { shallow } from 'enzyme'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'
import {
  PASSWORD_LENGTH_ERR,
  PASSWORD_CONTENT_ERR,
  default as PasswordTextField
} from './PasswordTextField'

describe('PasswordTextField Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<PasswordTextField />)
    })

    it('should render a ValidationTextField component', () => {
      expect(wrapper.is(ValidationTextField)).toBe(true)
    })
  })

  describe('Validating a password that meets all the criteria', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<PasswordTextField />)
      wrapper.props().onValidation('p4sSw0rd!')
      wrapper.update()
    })

    it('should indicate that it is valid', () => {
      expect(wrapper.props().helperText).toBe(VALIDITY_VALID)
    })
  })

  describe('Validating a password that does not meet the length criteria', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<PasswordTextField />)
      wrapper.props().onValidation('p4sS0d!')
      wrapper.update()
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(wrapper.props().helperText).toBe(PASSWORD_LENGTH_ERR)
    })
  })

  describe('Validating a password that does not contain a lowercase letter', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<PasswordTextField />)
      wrapper.props().onValidation('P4SSW0RD!')
      wrapper.update()
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(wrapper.props().helperText).toBe(PASSWORD_CONTENT_ERR)
    })
  })

  describe('Validating a password that does not contain a uppercase letter', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<PasswordTextField />)
      wrapper.props().onValidation('p4ssw0rd!')
      wrapper.update()
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(wrapper.props().helperText).toBe(PASSWORD_CONTENT_ERR)
    })
  })

  describe('Validating a password that does not contain a number', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<PasswordTextField />)
      wrapper.props().onValidation('pAsSwOrd!')
      wrapper.update()
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(wrapper.props().helperText).toBe(PASSWORD_CONTENT_ERR)
    })
  })

  describe('Validating a password that does not contain a special character', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<PasswordTextField />)
      wrapper.props().onValidation('p4sSw0rd1')
      wrapper.update()
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(wrapper.props().helperText).toBe(PASSWORD_CONTENT_ERR)
    })
  })
})
