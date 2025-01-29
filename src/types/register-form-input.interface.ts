import type { LoginFormInputInterface } from './login-form-input.interface'

export interface RegisterFormInputInterface extends LoginFormInputInterface {
  username: string
  firstName: string
  lastName: string
  confirmPassword: string
}
