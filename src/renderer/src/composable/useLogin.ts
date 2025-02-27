import { api } from '@/api/axios'
import { LoginResponse } from '@/models/ApiResponse'
import { useMutation } from '@tanstack/vue-query'

const login = async (req: { email: string; password: string }): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/login', req)
  return data
}

const useLogin = () => {
  const loginMutations = useMutation({ mutationFn: login })

  return {
    loginMutations
  }
}

export default useLogin
