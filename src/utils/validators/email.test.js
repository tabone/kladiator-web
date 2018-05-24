import { EMAIL_VALIDATION_ERR, default as validateEmail } from './email'

describe('Email Validator', () => {
  describe('Validating a valid email', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validateEmail('taboneluca3@gmail.com')
    })

    it('should indicate that it is valid', () => {
      expect(errorMessage).toBe('')
    })
  })

  describe('Validating an invalid email', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validateEmail('taboneluca3com')
    })

    it('should return a message informing the user that the email is invalid', () => {
      expect(errorMessage).toBe(EMAIL_VALIDATION_ERR)
    })
  })
})
