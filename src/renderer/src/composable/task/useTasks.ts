import { api } from '@/api/axios'
import { Criteria } from '@/models/Criteria'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { Task } from 'electron'
import { ref, watch } from 'vue'

const tasks = ref<Task[]>([])

const fetch = async (): Promise<Task[]> => {
  const { data } = await api.get('/task')
  return data
}

const match = async (criteria: Criteria): Promise<Task[]> => {
  const { data } = await api.post('/task/match', criteria)
  return data
}

const useTasks = () => {
  const { data, isFetching, isError, refetch } = useQuery({
    queryFn: fetch,
    queryKey: ['all-task']
  })
  const matchMutations = useMutation({ mutationFn: match })

  const refetchTask = () => {
    tasks.value = []
    if (data.value) {
      tasks.value = data.value
    }
    refetch()
  }
  watch(data, () => {
    if (data.value) {
      tasks.value = data.value
    }
  })

  return {
    tasks,
    isTasksLoading: isFetching,
    isTasksError: isError,
    refetchTask,
    matchMutations
  }
}

export default useTasks
