import { User } from './User'

export interface ErrorApiResponse {
  message: string
  errors: string[]
}

export interface LoginResponse {
  user: User
  token: string
}
