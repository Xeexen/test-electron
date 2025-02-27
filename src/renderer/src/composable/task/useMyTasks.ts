import { api } from '@/api/axios'
import { Task } from '@/models/Task'
import { userStore } from '@/stores/useStore'
import { useQuery } from '@tanstack/vue-query'

const store = userStore()

const fetchMyTask = async (): Promise<Task[]> => {
  const { data } = await api.get(`/task/${store.user.id}`)
  return data
}

const useMyTasks = () => {
  const { data, isError, isFetching } = useQuery<Task[]>({
    queryFn: fetchMyTask,
    queryKey: ['my-task', store.user.id]
  })

  return {
    myTaskData: data,
    isMyTaskLoading: isFetching,
    isMyTaskError: isError
  }
}

export default useMyTasks
