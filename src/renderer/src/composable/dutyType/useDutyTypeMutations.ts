import { api } from '@/api/axios'
import { DutyType } from '@/models/Ruc'
import { useMutation } from '@tanstack/vue-query'

const save = async (item: DutyType): Promise<any> => {
  const { data } = await api.post('/duty-type', item)
  return data
}

const useDutyTypeMutations = () => {
  const saveMutations = useMutation({ mutationFn: save })
  return {
    saveMutations
  }
}

export default useDutyTypeMutations
