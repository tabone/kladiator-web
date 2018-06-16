import React from 'react'
import { shallow } from 'enzyme'
import Register from './Register'

function getElementByClassName (wrapper, className) {
  return wrapper.find(className)
}

function getTextField (wrapper, textField) {
  return getElementByClassName(wrapper,
    `.app-register__${textField}-textfield`)
}

function getButton (wrapper, button) {
  return getElementByClassName(wrapper,
    `.app-register__${button}-button`)
}

describe('Register Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Register />).dive()
    })

    it('should display an empty username TextField', () => {
      expect(getTextField(wrapper, 'username').props().value).toBe('')
    })

    it('should display an empty email TextField', () => {
      expect(getTextField(wrapper, 'email').props().value).toBe('')
    })

    it('should display an empty password TextField', () => {
      expect(getTextField(wrapper, 'password').props().value).toBe('')
    })

    it('should display an empty password confirmation TextField', () => {
      expect(getTextField(wrapper, 'password-confirmation').props().value)
        .toBe('')
    })

    it('should not allow the user to submit the form', () => {
      expect(getButton(wrapper, 'submit').props().disabled).toBe(true)
    })
  })

  describe('Entering a username', () => {
    let value = null
    let wrapper = null

    beforeEach(() => {
      value = 'username-value'
      wrapper = shallow(<Register />).dive()
      getTextField(wrapper, 'username').props().onChange({ target: { value } })
      wrapper.update()
    })

    it('should store the entered username', () => {
      expect(wrapper.state('username')).toBe(value)
    })

    it('should display the entered username in the username TextField', () => {
      expect(getTextField(wrapper, 'username').props().value).toBe(value)
    })
  })

  describe('Entering a email', () => {
    let value = null
    let wrapper = null

    beforeEach(() => {
      value = 'email-value'
      wrapper = shallow(<Register />).dive()
      getTextField(wrapper, 'email').props().onChange({ target: { value } })
      wrapper.update()
    })

    it('should store the entered email', () => {
      expect(wrapper.state('email')).toBe(value)
    })

    it('should display the entered email in the email TextField', () => {
      expect(getTextField(wrapper, 'email').props().value).toBe(value)
    })
  })

  describe('Entering a password', () => {
    let value = null
    let wrapper = null

    beforeEach(() => {
      value = 'password-value'
      wrapper = shallow(<Register />).dive()
      getTextField(wrapper, 'password').props().onChange({ target: { value } })
      wrapper.update()
    })

    it('should store the entered password', () => {
      expect(wrapper.state('password')).toBe(value)
    })

    it('should provide the entered password to the password confirmation TextField', () => {
      expect(getTextField(wrapper, 'password-confirmation').props().password)
        .toBe(value)
    })

    it('should display the entered password in the password TextField', () => {
      expect(getTextField(wrapper, 'password').props().value).toBe(value)
    })
  })

  describe('Entering a password confirmation', () => {
    let value = null
    let wrapper = null

    beforeEach(() => {
      value = 'password-confirmation-value'
      wrapper = shallow(<Register />).dive()
      getTextField(wrapper, 'password-confirmation').props().onChange({
        target: { value }
      })
      wrapper.update()
    })

    it('should store the entered password confirmation', () => {
      expect(wrapper.state('passwordConfirmation')).toBe(value)
    })

    it('should display the entered password in the password TextField', () => {
      expect(getTextField(wrapper, 'password-confirmation').props().value)
        .toBe(value)
    })
  })

  describe('Entering valid details', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Register />).dive()

      ;[
        'email',
        'username',
        'password',
        'password-confirmation'
      ].forEach(field => {
        getTextField(wrapper, field).props().onValidityChange(true)
      })

      wrapper.update()
    })

    it('should allow the user to submit the form', () => {
      expect(getButton(wrapper, 'submit').props().disabled).toBe(false)
    })
  })

  describe('Entering invalid details', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Register />).dive()
    })

    describe('when one of the fields is invalid', () => {
      it('should not allow the user to submit the form', () => {
        const fields = [
          'email',
          'username',
          'password',
          'password-confirmation'
        ]

        fields.forEach(invalidField => {
          fields.forEach(field => {
            getTextField(wrapper, field).props()
              .onValidityChange(field === invalidField)
          })

          wrapper.update()

          expect(getButton(wrapper, 'submit').props().disabled).toBe(true)
        })
      })
    })

    describe('when all the fields are invalid', () => {
      beforeEach(() => {
        ;[
          'email',
          'username',
          'password',
          'password-confirmation'
        ].forEach(field => {
          getTextField(wrapper, field).props().onValidityChange(false)
        })

        wrapper.update()
      })

      it('should not allow the user to submit the form', () => {
        expect(getButton(wrapper, 'submit').props().disabled).toBe(true)
      })
    })
  })
})
