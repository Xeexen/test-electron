import { api } from '@/api/axios'
import { TaskRequest } from '@/models/Task'
import { useQuery } from '@tanstack/vue-query'

const fetchAttendant = async (id: string): Promise<TaskRequest[]> => {
  const { data } = await api.get(`/taskRequest/attendant/${id}`)
  return data
}

const useReviewerTaskRequest = (id: string) => {
  const { data, isError, isFetching } = useQuery<TaskRequest[]>({
    queryFn: () => fetchAttendant(id),
    queryKey: ['reviewer-task', id]
  })

  return {
    isTaskCreatorLoading: isFetching,
    isTaskCreatorError: isError,
    taskCreatorData: data
  }
}

export default useReviewerTaskRequest
