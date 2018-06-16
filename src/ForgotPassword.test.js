import React from 'react'
import { shallow } from 'enzyme'
import EmailTextField from './EmailTextField'
import ForgotPassword from './ForgotPassword'

function getElementByClassName (wrapper, className) {
  return wrapper.find(className)
}

function getTextField (wrapper, textField) {
  return getElementByClassName(wrapper,
    `.app-forgot-password__${textField}-textfield`)
}

function getButton (wrapper, button) {
  return getElementByClassName(wrapper,
    `.app-forgot-password__${button}-button`)
}

describe('ForgotPassword Component', () => {
  describe('Rending the component', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<ForgotPassword />).dive()
    })

    it('should display an empty email TextField', () => {
      expect(getTextField(wrapper, 'email').props().value).toBe('')
    })

    it('should not allow the user to submit the form', () => {
      expect(getButton(wrapper, 'submit').props().disabled).toBe(true)
    })
  })

  describe('Entering an email', () => {
    let value = null
    let wrapper = null

    beforeEach(() => {
      value = 'taboneluca3@gmail.com'
      wrapper = shallow(<ForgotPassword />).dive()
      getTextField(wrapper, 'email').props().onChange({ target: { value } })
      wrapper.update()
    })

    it('should store the entered email', () => {
      expect(wrapper.state('email')).toBe(value)
    })

    it('should display the entered email inside the email TextField', () => {
      expect(getTextField(wrapper, 'email').props().value).toBe(value)
    })
  })

  describe('Entering a valid email', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<ForgotPassword />).dive()
      getTextField(wrapper, 'email').props().onValidityChange(true)
      wrapper.update()
    })

    it('should allow the user to submit the form', () => {
      expect(getButton(wrapper, 'submit').props().disabled).toBe(false)
    })
  })

  describe('Entering an invalid email', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<ForgotPassword />).dive()
      getTextField(wrapper, 'email').props().onValidityChange(false)
      wrapper.update()
    })

    it('should not allow the user to submit the form', () => {
      expect(getButton(wrapper, 'submit').props().disabled).toBe(true)
    })
  })
})
