import { User } from './User'

export interface NotificationChannel {
  id: string
  channelType: string
  destination: string
  user: User
  enabled: boolean
}

export type channelType = 'email' | 'whatsApp'

export const channelTypeArray = ['email', 'whatsApp']
