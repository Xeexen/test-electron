import { api } from '@/api/axios'
import { User } from '@/models/User'
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'

const users = ref<User[]>([])

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/user')
  return data
}

const useUsers = () => {
  const { data, isError, isFetching } = useQuery<User[]>({
    queryFn: fetchUsers,
    queryKey: ['admins-users']
  })

  watch(data, () => {
    if (data.value) {
      users.value = data.value
    }
  })

  return {
    users,
    userData: data,
    isUserError: isError,
    isUsersLoading: isFetching
  }
}

export default useUsers
