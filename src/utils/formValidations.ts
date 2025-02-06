/**
 * Validates a given email address.
 *
 * @param {string} email
 * @returns {string[]} An array of error messages if the email is invalid, or an empty array if it is valid.
 */
export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []

  const errors = []

  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  const isValidEmailFormat = emailRegex.test(trimmedEmail)

  if (!isValidEmailFormat) errors.push('Invalid email format')

  return errors
}

/**
 * Validate a password string.
 *
 * @param {string} password
 * @returns {string[]} - An array of error messages if the password is invalid.
 */
export const validatePassword = (password: string) => {
  if (!password) return []

  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one digit')
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  return errors
}
