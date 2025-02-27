import { api } from '@/api/axios'
import { Ruc } from '@/models/Ruc'
import { useQuery } from '@tanstack/vue-query'

const fetchRucs = async (): Promise<Ruc[]> => {
  const { data } = await api.get('/ruc')
  return data
}

const useRucs = () => {
  const { data, isError, isFetching, refetch } = useQuery<Ruc[]>({
    queryFn: fetchRucs,
    queryKey: ['rucs-admin']
  })
  return {
    rucData: data,
    isRucsError: isError,
    isRucsLoading: isFetching,
    refetchRucs: refetch
  }
}

export default useRucs
