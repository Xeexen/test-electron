import { api } from '@/api/axios'
import { TaskRequest } from '@/models/Task'
import { useQuery } from '@tanstack/vue-query'

const fetchCreator = async (id: string): Promise<TaskRequest[]> => {
  const { data } = await api.get(`/taskRequest/creator/${id}`)
  return data
}

const useCreatorTaskRequest = (id: string) => {
  const { data, isError, isFetching } = useQuery<TaskRequest[]>({
    queryFn: () => fetchCreator(id),
    queryKey: ['creator-task', id]
  })

  return {
    isTaskCreatorLoading: isFetching,
    isTaskCreatorError: isError,
    taskCreatorData: data
  }
}

export default useCreatorTaskRequest
