import { RucDuty } from './Ruc'
import { User } from './User'

export interface Task {
  id: string
  rucDuty: RucDuty
  state: string
  date: string
}

export interface TaskRequest {
  id: string
  user: User
  attendant: User
  task: Task
  evidence: any
  approved: boolean
}

export type TaskRequestState = 'Pendiente' | 'En proceso' | 'Completado' | 'Atrasado' | 'Corregir'
export const TaskRequestStateArray = [
  'Pendiente',
  'En proceso',
  'Completado',
  'Atrasado',
  'Corregir'
]
