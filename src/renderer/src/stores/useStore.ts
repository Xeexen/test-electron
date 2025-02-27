import type { Role, User } from '@/models/User'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore(
  'user-store',
  () => {
    const token = ref('')
    const tour = ref(true)
    const user = ref<User>({} as User)
    const role = ref<Role>({} as Role)
    const tenantId = ref()
    const logout = () => {
      user.value = {} as User
      role.value = {} as Role
      token.value = ''
      tenantId.value = ''
    }
    const setToken = (newToken: string) => {
      token.value = newToken
    }
    const setUser = (newUser: User) => {
      user.value = newUser
    }
    const setRole = (newRole: Role) => {
      role.value = newRole
    }
    const setTenantId = (newTenantId: string) => {
      tenantId.value = newTenantId
    }
    return {
      token,
      user,
      tenantId,
      role,
      tour,
      logout,
      setToken,
      setUser,
      setTenantId,
      setRole
    }
  },
  { persist: true }
)
