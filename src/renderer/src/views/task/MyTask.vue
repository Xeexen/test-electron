<script setup lang="ts">
import useMyTasks from '@/composable/task/useMyTasks'
import useTaskRequestMutations from '@/composable/taskRequest/useTaskRequestMutations'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { Task } from '@/models/Task'
import { showErrorToast, showSuccessToast } from '@/service/sweetAlert'
import { userStore } from '@/stores/useStore'
import { Icon } from '@iconify/vue'
import { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { watch } from 'vue'

const { isMyTaskLoading, myTaskData } = useMyTasks()
const { saveTaskRequestMutations } = useTaskRequestMutations()
const store = userStore()

const headers = [
  { title: 'state', value: 'state', class: 'my-header-style' },
  { title: 'obligacion', value: 'rucDuty.type.name' },
  { title: 'RUC', value: 'rucDuty.parentRuc' },
  { title: 'Nombre', value: 'rucDuty.parentName' },
  { title: 'Supervisor', value: 'rucDuty.supervisor' },
  { title: 'Date', value: 'date' },
  { title: 'Acciones', value: 'actions', width: 50 }
]

const sendTaskToReview = (task: Task) => {
  Swal.fire({
    title: 'Estas seguro?',
    text: 'Una vez enviada a revisar no se puede eliminar!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, enviar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      saveTaskRequestMutations.mutate({
        taskId: task.id,
        userId: store.user.id
      })
    }
  })
}

watch(saveTaskRequestMutations.isError, () => {
  if (saveTaskRequestMutations.isError.value) {
    const error = saveTaskRequestMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(saveTaskRequestMutations.isSuccess, () => {
  if (saveTaskRequestMutations.isSuccess.value) {
    showSuccessToast('Tarea enviada')
  }
})
</script>

<template>
  <div>
    <VDataTable :items="myTaskData" :loading="isMyTaskLoading" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <VBtn
          color="primary"
          variant="tonal"
          icon
          density="comfortable"
          @click="sendTaskToReview(item)"
          :loading="saveTaskRequestMutations.isPending.value"
        >
          <Icon icon="mingcute:send-fill" />
        </VBtn>
      </template>
    </VDataTable>
  </div>
</template>

<style scoped></style>
