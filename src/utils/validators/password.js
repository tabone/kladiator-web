const passwordPattern = /(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).*$/

export const PASSWORD_LENGTH_ERR = 'Password must be at least 8 characters long'
export const PASSWORD_CONTENT_ERR = 'Password should contain at least one ' +
  'number, one special  character and have a mixture of upper and lowercase ' +
  'letters'

export default function validatePassword (password) {
  if (password.length < 8) {
    return PASSWORD_LENGTH_ERR
  }

  if (passwordPattern.test(password) === false) {
    return PASSWORD_CONTENT_ERR
  }

  return ''
}
