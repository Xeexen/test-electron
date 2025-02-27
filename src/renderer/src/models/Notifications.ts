import { User } from './User'

export interface Notification {
  id: string
  route: string
  icon: string
  createdAt: string
  tittle: string
  descriptions: string
  user: User
  read: boolean
}

export const manageNotificationsRoute = (noti: Notification) => {
  if (noti.icon == 'task') {
    return { name: 'task' }
  }

  return { name: 'home' }
}

export const manageNotificationsIcon = (noti: Notification) => {
  if (noti.icon == 'task') {
    return 'hugeicons:task-edit-02'
  }

  return 'hugeicons:task-edit-02'
}
