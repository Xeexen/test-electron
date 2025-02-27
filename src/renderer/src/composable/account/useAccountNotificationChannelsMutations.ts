import { api } from '@/api/axios'
import { NotificationChannel } from '@/models/NotificationChannel'
import { useMutation } from '@tanstack/vue-query'

const saveChannel = async (item: NotificationChannel): Promise<any> => {
  const { data } = await api.post('/notification-channel/add', item)
  return data
}

const useAccountNotificationChannelsMutations = () => {
  const saveChannelMutations = useMutation({ mutationFn: saveChannel })

  return {
    saveChannelMutations
  }
}

export default useAccountNotificationChannelsMutations
