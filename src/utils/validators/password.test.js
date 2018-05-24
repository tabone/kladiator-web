import {
  PASSWORD_LENGTH_ERR,
  PASSWORD_CONTENT_ERR,
  default as validatePassword
} from './password'

describe('Password Validator', () => {
  describe('Validating a password that meets all the criteria', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validatePassword('p4sSw0rd!')
    })

    it('should indicate that it is valid', () => {
      expect(errorMessage).toBe('')
    })
  })

  describe('Validating a password that does not meet the length criteria', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validatePassword('p4sS0d!')
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(errorMessage).toBe(PASSWORD_LENGTH_ERR)
    })
  })

  describe('Validating a password that does not contain a lowercase letter', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validatePassword('P4SSW0RD!')
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(errorMessage).toBe(PASSWORD_CONTENT_ERR)
    })
  })

  describe('Validating a password that does not contain a uppercase letter', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validatePassword('p4ssw0rd!')
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(errorMessage).toBe(PASSWORD_CONTENT_ERR)
    })
  })

  describe('Validating a password that does not contain a number', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validatePassword('pAsSwOrd!')
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(errorMessage).toBe(PASSWORD_CONTENT_ERR)
    })
  })

  describe('Validating a password that does not contain a special character', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validatePassword('p4sSw0rd1')
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(errorMessage).toBe(PASSWORD_CONTENT_ERR)
    })
  })
})
