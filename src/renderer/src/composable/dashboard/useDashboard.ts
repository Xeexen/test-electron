import { api } from '@/api/axios'
import { Dashboard } from '@/models/Dashboard'
import { useQuery } from '@tanstack/vue-query'

const fetchDashboard = async (): Promise<Dashboard> => {
  const { data } = await api.get('/dashboard')
  return data
}

const useDashboard = () => {
  const { data, isError, isFetching } = useQuery({
    queryFn: fetchDashboard,
    queryKey: ['dashboards']
  })
  return {
    dashboardData: data,
    isDashboardLoading: isFetching,
    isDashboardError: isError
  }
}

export default useDashboard
