export interface User {
  id: string
  name: string
  password: string
  email: string
  roles: Role[]
  active: boolean
}

export interface Role {
  id: string
  name: string
  description: string
}
