import { api } from '@/api/axios'
import { User } from '@/models/User'
import { useMutation } from '@tanstack/vue-query'

const saveUser = async (user: User): Promise<any> => {
  const { data } = await api.post('/user', user)
  return data
}

const useUserMutations = () => {
  const saveUserMutations = useMutation({ mutationFn: saveUser })
  return {
    saveUserMutations
  }
}

export default useUserMutations
