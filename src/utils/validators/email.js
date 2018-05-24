const emailPattern = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/

export const EMAIL_VALIDATION_ERR = 'Invalid email address'

export default function validateEmail (email) {
  return emailPattern.test(email) === false ? EMAIL_VALIDATION_ERR : ''
}
