import { api } from '@/api/axios'
import { RucDuty } from '@/models/Ruc'
import { useMutation } from '@tanstack/vue-query'

const deleteDuty = async (id: string): Promise<any> => {
  const { data } = await api.delete(`/ruc-duty/${id}`)
  return data
}

const updateDuty = async (rucDuty: RucDuty): Promise<any> => {
  const { data } = await api.put('', rucDuty)
  return data
}

const saveDuty = async (rucDuty: RucDuty): Promise<any> => {
  const { data } = await api.post('/ruc-duty/add', rucDuty)
  return data
}

const useRucDutyMutations = () => {
  const deleteDutyMutations = useMutation({ mutationFn: deleteDuty })
  const updateDutyMutations = useMutation({ mutationFn: updateDuty })
  const saveDutyMutations = useMutation({ mutationFn: saveDuty })

  return {
    deleteDutyMutations,
    updateDutyMutations,
    saveDutyMutations
  }
}

export default useRucDutyMutations
