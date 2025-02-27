import { api } from '@/api/axios'
import { Notification } from '@/models/Notifications'
import { userStore } from '@/stores/useStore'
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'

const userSt = userStore()
const notifications = ref<Notification[]>([])

const fetchNoti = async (): Promise<Notification[]> => {
  const { data } = await api.get(`/notifications/${userSt.user.id}`)
  return data
}

const useNotifications = () => {
  const { data, isError, isFetching } = useQuery<Notification[]>({
    queryFn: fetchNoti,
    queryKey: ['my-notifications']
  })

  watch(data, () => {
    if (data.value) {
      notifications.value = data.value
    }
  })

  return {
    notificationData: data,
    isNotificationsError: isError,
    isNotificationsLoading: isFetching,
    notifications
  }
}

export default useNotifications
