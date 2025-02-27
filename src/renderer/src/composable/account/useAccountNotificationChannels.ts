import { api } from '@/api/axios'
import { NotificationChannel } from '@/models/NotificationChannel'
import { userStore } from '@/stores/useStore'
import { useQuery } from '@tanstack/vue-query'

const userSt = userStore()

const fetchChannels = async (): Promise<NotificationChannel[]> => {
  const { data } = await api.get(`/notification-channel/${userSt.user.id}`)
  return data
}

const useAccountNotificationChannels = () => {
  const { data, isError, isFetching } = useQuery<NotificationChannel[]>({
    queryFn: fetchChannels,
    queryKey: ['notification-channel', userSt.user.id]
  })
  return {
    notificationChannelsData: data,
    isNotificationChannelsError: isError,
    isNotificationChannelsLoading: isFetching
  }
}

export default useAccountNotificationChannels
