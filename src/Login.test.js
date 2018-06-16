import React from 'react'
import { shallow } from 'enzyme'
import Login from './Login'

function getElementByClassName (wrapper, className) {
  return wrapper.find(className)
}

function getTextField (wrapper, textField) {
  return getElementByClassName(wrapper,
    `.app-login__${textField}-textfield`)
}

function getButton (wrapper, button) {
  return getElementByClassName(wrapper,
    `.app-login__${button}-button`)
}

describe('Login Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Login login={()=>{}}/>).dive()
    })

    it('should display an empty username TextField', () => {
      expect(getTextField(wrapper, 'username').props().value).toBe('')
    })

    it('should display an empty password TextField', () => {
      expect(getTextField(wrapper, 'password').props().value).toBe('')
    })

    it('should not allow the user to submit the form', () => {
      expect(getButton(wrapper, 'submit').props().disabled).toBe(true)
    })
  })

  describe('Entering a username', () => {
    let value = null
    let wrapper = null

    beforeEach(() => {
      value = 'tabone3'
      wrapper = shallow(<Login login={()=>{}} />).dive()
      getTextField(wrapper, 'username').props().onChange({ target: { value }})
      wrapper.update()
    })

    it('should store the entered username', () => {
      expect(wrapper.state('username')).toBe(value)
    })

    it('should display the entered username in the username TextField', () => {
      expect(getTextField(wrapper, 'username').props().value).toBe(value)
    })
  })

  describe('Entering a password', () => {
    let value = null
    let wrapper = null

    beforeEach(() => {
      value = 'abc123'
      wrapper = shallow(<Login login={()=>{}} />).dive()
      getTextField(wrapper, 'password').props().onChange({ target: { value }})
      wrapper.update()
    })

    it('should store the entered password', () => {
      expect(wrapper.state('password')).toBe(value)
    })

    it('should display the entered password in the password TextField', () => {
      expect(getTextField(wrapper, 'password').props().value).toBe(value)
    })
  })

  describe('Entering valid details', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<Login  login={()=>{}} />).dive()

      ;[ 'username' , 'password' ].forEach(field => {
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
      wrapper = shallow(<Login  login={()=>{}} />).dive()
    })

    describe('when one of the fields is invalid', () => {
      it('should not allow the user to submit the form', () => {
        const fields = [ 'username', 'password' ]

        fields.forEach(invalidField => {
          fields.forEach(field => {
            getTextField(wrapper, field).props()
              .onValidityChange(invalidField === field)
          })

          wrapper.update()
          expect(getButton(wrapper, 'submit').props().disabled).toBe(true)
        })
      })
    })

    describe('when all the fields are invalid', () => {
      beforeEach(() => {
        ;[ 'username' , 'password' ].forEach(field => {
          getTextField(wrapper, field).props().onValidityChange(false)
        })

        wrapper.update()
      })

      it('should not allow the user to submit the form', () => {
        expect(getButton(wrapper, 'submit').props().disabled).toBe(true)
      })
    })
  })

  describe('Submitting the form', () => {
    let login = null
    let wrapper = null

    beforeEach(() => {
      login = jest.fn()
      wrapper = shallow(<Login login={login} />).dive()
      getButton(wrapper, 'submit').props().onClick()
    })

    it('should attempt to login', () => {
      expect(login.mock.calls.length).toBe(1)
    })
  })
})
