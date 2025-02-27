<script setup lang="ts">
import InputSection from '@/components/shared/InputSection.vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import useReviewerTaskRequest from '@/composable/taskRequest/useReviewerTaskRequest'
import useTaskRequestMutations from '@/composable/taskRequest/useTaskRequestMutations'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { TaskRequestStateArray, type TaskRequestState } from '@/models/Task'
import { showErrorToast } from '@/service/sweetAlert'
import { userStore } from '@/stores/useStore'
import { Icon } from '@iconify/vue'
import { AxiosError } from 'axios'
import { ref, watch } from 'vue'
const store = userStore()

const { isTaskCreatorLoading, taskCreatorData } = useReviewerTaskRequest(store.user.id)
const { updateTaskRequestMutations } = useTaskRequestMutations()

const taskRequestId = ref('')
const showUpdate = ref(false)
const taskRequestState = ref<TaskRequestState>('Completado')

const headers = [
  { title: 'Solicitante', value: 'user.name' },
  { title: 'Obligacion', value: 'task.rucDuty.type.name' },
  { title: 'Ruc', value: 'task.rucDuty.parentRuc' },
  { title: 'Nombre', value: 'task.rucDuty.parentName' },
  { title: 'Fecha', value: 'task.date' },
  { title: 'State', value: 'task.state' },
  { title: 'Acciones', value: 'actions', width: 50 }
]

const onTaskRequestUpdate = () => {
  updateTaskRequestMutations.mutate({
    state: taskRequestState.value,
    taskRequestId: taskRequestId.value
  })
}
const onStartTaskUpdate = (id: string) => {
  taskRequestId.value = id
  showUpdate.value = true
}

watch(updateTaskRequestMutations.isError, () => {
  if (updateTaskRequestMutations.isError.value) {
    const error = updateTaskRequestMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(updateTaskRequestMutations.isSuccess, () => {
  if (updateTaskRequestMutations.isSuccess.value) {
    taskRequestId.value = ''
    taskRequestState.value = 'Completado'
    showUpdate.value = false
  }
})
</script>

<template>
  <VDataTable :items="taskCreatorData" :loading="isTaskCreatorLoading" :headers="headers">
    <template v-slot:item.actions="{ item }">
      <VBtn
        color="primary"
        @click="onStartTaskUpdate(item.id)"
        :loading="updateTaskRequestMutations.isPending.value"
        variant="tonal"
        icon
      >
        <Icon icon="material-symbols:edit-document-rounded" />
      </VBtn>
    </template>
  </VDataTable>
  <VDialog max-width="400" v-model="showUpdate">
    <UiParentCard title="Actualizar tarea">
      <InputSection label="Estado">
        <VSelect
          variant="solo-filled"
          flat
          :items="TaskRequestStateArray"
          v-model="taskRequestState"
        />
      </InputSection>
      <VBtn
        @click="onTaskRequestUpdate"
        :loading="updateTaskRequestMutations.isPending.value"
        color="primary"
      >
        Actualizar
      </VBtn>
    </UiParentCard>
  </VDialog>
</template>

<style scoped></style>
