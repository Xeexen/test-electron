import { api } from '@/api/axios'
import { TaskRequestState } from '@/models/Task'
import { useMutation } from '@tanstack/vue-query'

const saveTaskRequest = async (req: { userId: string; taskId: string }) => {
  const { data } = await api.post('/taskRequest/add', req)
  return data
}

const updateTaskRequest = async (req: { taskRequestId: string; state: TaskRequestState }) => {
  const { data } = await api.put('/taskRequest/update', req)
  return data
}

const useTaskRequestMutations = () => {
  const saveTaskRequestMutations = useMutation({ mutationFn: saveTaskRequest })
  const updateTaskRequestMutations = useMutation({ mutationFn: updateTaskRequest })
  return {
    saveTaskRequestMutations,
    updateTaskRequestMutations
  }
}

export default useTaskRequestMutations
