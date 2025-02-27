import { Task } from './Task'

export interface Dashboard {
  totalTask: number
  completedTask: number
  inProgressTask: number
  overdueTask: number
  mvpUsers: any
  recentTasks: Task[]
  monthlyTasks: any[]
  yearlyTasks: YearlyTask[]
  semesterTasks: any[]
}

export interface YearlyTask {
  name: string
  data: number[]
}
