import { api } from '@/api/axios'
import type { DutyType } from '@/models/Ruc'
import { useQuery } from '@tanstack/vue-query'

const fetchDutyTypes = async (): Promise<DutyType[]> => {
  const { data } = await api.get('/duty-type')
  return data
}

const useDutyTypes = () => {
  const { data, isFetching, isError, refetch } = useQuery<DutyType[]>({
    queryKey: ['duty-types'],
    queryFn: fetchDutyTypes
  })
  return {
    dutyTypesData: data,
    isDutyTypesLoading: isFetching,
    isDutyTypesError: isError,
    refetchDutyTypes: refetch
  }
}

export default useDutyTypes
