const usernamePattern = /^[a-z0-9_-]+$/

export const USERNAME_LENGTH_ERR = 'Username must be 3 to 16 characters long'
export const USERNAME_CONTENT_ERR = 'Username may have lower case letters, ' +
  'numbers, _ and -'

export default function validateUsername (username) {
  if (username.length < 3 || username.length > 16) {
    return USERNAME_LENGTH_ERR
  }

  if (usernamePattern.test(username) === false) {
    return USERNAME_CONTENT_ERR
  }

  return ''
}
