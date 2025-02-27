import { User } from './User'

export interface Ruc {
  id: string
  name: string
  ruc: string
  active: boolean
  createdAt?: Date | null
  user: User
  obligations: RucDuty[]
  obligationsCount: number
}

export interface RucDuty {
  id: string
  date: Date
  user: User
  ruc: Ruc
  type: DutyType
}

export interface DutyType {
  id: string
  name: string
  frequency: number
}
