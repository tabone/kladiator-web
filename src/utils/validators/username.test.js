import {
  USERNAME_LENGTH_ERR,
  USERNAME_CONTENT_ERR,
  default as validateUsername
} from './username'

describe('Username Validator', () => {
  describe('Validating a username that meets all criteria', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validateUsername('tabo_ne-3')
    })

    it('should indicate that it is valid', () => {
      expect(errorMessage).toBe('')
    })
  })

  describe('Validating a username that does not meet the length criteria', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validateUsername('ta')
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(errorMessage).toBe(USERNAME_LENGTH_ERR)
    })
  })

  describe('Validating a username that has an unaccepted character', () => {
    let errorMessage = null

    beforeEach(() => {
      errorMessage = validateUsername('tabone^')
    })

    it('should return a message indicating the reason why it is invalid', () => {
      expect(errorMessage).toBe(USERNAME_CONTENT_ERR)
    })
  })
})
