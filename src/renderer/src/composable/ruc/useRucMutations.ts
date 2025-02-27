import { api } from '@/api/axios'
import { Ruc, RucDuty } from '@/models/Ruc'
import { useMutation } from '@tanstack/vue-query'

const saveRuc = async (ruc: Ruc): Promise<any> => {
  const { data } = await api.put('/ruc/update', ruc)
  return data
}

const saveRucFull = async (req: { ruc: Ruc; obligations: RucDuty[] }): Promise<any> => {
  const { data } = await api.post('/ruc/create', req)
  return data
}

const useRucMutations = () => {
  const saveRucMutations = useMutation({ mutationFn: saveRuc })
  const saveRucFullMutations = useMutation({ mutationFn: saveRucFull })

  return {
    saveRucMutations,
    saveRucFullMutations
  }
}

export default useRucMutations
