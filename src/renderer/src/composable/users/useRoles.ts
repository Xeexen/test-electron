import { api } from '@/api/axios'
import type { Role } from '@/models/User'
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'

const roles = ref<Role[]>([])

const fetchRoles = async (): Promise<Role[]> => {
  const { data } = await api.get('/roles')
  return data
}

const useRoles = () => {
  const { data, isError, isFetching } = useQuery({ queryFn: fetchRoles, queryKey: ['admin-roles'] })

  watch(data, () => {
    if (data.value) {
      roles.value = data.value
    }
  })

  return {
    isRolesError: isError,
    isRolesLoading: isFetching,
    roles
  }
}

export default useRoles
