import { api } from '@/api/axios'
import { userStore } from '@/stores/useStore'
import { useMutation } from '@tanstack/vue-query'

const userSt = userStore()
const genera = async (req: { startDate: string; endDate: string }): Promise<Blob> => {
  const { data } = await api.post('/report/general', req, {
    responseType: 'blob'
  })
  return data
}

const boss = async (req: { startDate: string; endDate: string }): Promise<Blob> => {
  const { data } = await api.post(
    '/report/assistant',
    { ...req, userId: userSt.user.id },
    {
      responseType: 'blob'
    }
  )
  return data
}

const dog = async (req: { startDate: string; endDate: string }): Promise<Blob> => {
  const { data } = await api.post(
    '/report/user',
    { ...req, userId: userSt.user.id },
    {
      responseType: 'blob'
    }
  )
  return data
}

const useReportsMutations = () => {
  const generaMutations = useMutation({
    mutationFn: genera,
    onSuccess(data, __, _) {
      const url = window.URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reporte_general.xlsx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }
  })

  const dogMutations = useMutation({
    mutationFn: dog,
    onSuccess(data, __, _) {
      const url = window.URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reporte_usuario.xlsx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }
  })

  const bossMutations = useMutation({
    mutationFn: boss,
    onSuccess(data, __, _) {
      const url = window.URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reporte_asistentes.xlsx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }
  })

  return {
    generaMutations,
    dogMutations,
    bossMutations
  }
}

export default useReportsMutations
