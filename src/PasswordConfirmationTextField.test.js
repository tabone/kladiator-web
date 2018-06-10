import React from 'react'
import { shallow } from 'enzyme'
import {
  VALIDITY_VALID,
  default as ValidationTextField
} from './ValidationTextField'
import {
  PASSWORD_CONFIRMATION_MISMATCH_ERR,
  default as PasswordConfirmationTextField
} from './PasswordConfirmationTextField'

describe('PasswordConfirmationTextField Component', () => {
  describe('Rendering the component', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = shallow(<PasswordConfirmationTextField password='abc123' />)
    })

    it('should render a ValidationTextField component', () => {
      expect(wrapper.is(ValidationTextField)).toBe(true)
    })
  })

  describe('Validating a valid password confirmation value', () => {
    let wrapper = null

    beforeEach(() => {
      const password = 'abc123'
      wrapper = shallow(<PasswordConfirmationTextField password={password} />)
      wrapper.props().onValidation(password)
      wrapper.update()
    })

    it('should indicate that it is valid', () => {
      expect(wrapper.props().helperText).toBe(VALIDITY_VALID)
    })
  })

  describe('Validating an invalid password confirmation value', () => {
    let wrapper = null

    beforeEach(() => {
      const password = 'abc123'
      wrapper = shallow(<PasswordConfirmationTextField password={password} />)
      wrapper.props().onValidation(`${password}-invalid`)
      wrapper.update()
    })

    it('should indicate that it is valid', () => {
      expect(wrapper.props().helperText)
        .toBe(PASSWORD_CONFIRMATION_MISMATCH_ERR)
    })
  })

  describe('Changing the password while the password confirmation has not yet been validated', () => {
    let wrapper = null

    beforeEach(() => {
      const password = 'abc123'

      wrapper = shallow(<PasswordConfirmationTextField value=''
        password={password}/>)

      wrapper.setProps({ password: `${password}-new`})
      wrapper.update()
    })

    it('should not validate the password confirmation field', () => {
      expect(wrapper.props().helperText).toBe(null)
    })
  })

  describe('Fixing a validated invalid password', () => {
    let wrapper = null

    beforeEach(() => {
      const confirmationPassword = 'abc123'
      wrapper = shallow(<PasswordConfirmationTextField
        value={confirmationPassword}
        password={`${confirmationPassword}-invalid`} />)

      wrapper.props().onValidation(confirmationPassword)
      wrapper.update()

      wrapper.setProps({ password: confirmationPassword })
      wrapper.update()
    })

    it('should indicate that the password confirmation is now valid', () => {
      expect(wrapper.props().helperText).toBe(VALIDITY_VALID)
    })
  })

  describe('Invalidating a validated valid password', () => {
    let wrapper = null

    beforeEach(() => {
      const confirmationPassword = 'abc123'
      wrapper = shallow(<PasswordConfirmationTextField
        value={confirmationPassword}
        password={confirmationPassword}/>)

      wrapper.props().onValidation(confirmationPassword)
      wrapper.update()

      wrapper.setProps({ password: `${confirmationPassword}-invalid`})
      wrapper.update()
    })

    it('should indicate that the password confirmation is now invalid', () => {
      expect(wrapper.props().helperText)
        .toBe(PASSWORD_CONFIRMATION_MISMATCH_ERR)
    })
  })
})
