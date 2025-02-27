<script setup lang="ts">
import useCreatorTaskRequest from '@/composable/taskRequest/useCreatorTaskRequest'
import { userStore } from '@/stores/useStore'

const store = userStore()

const { isTaskCreatorLoading, taskCreatorData } = useCreatorTaskRequest(store.user.id)
const headers = [
  { title: 'Supervisor', value: 'attendant.name' },
  { title: 'Obligacion', value: 'task.rucDuty.type.name' },
  { title: 'Fecha', value: 'task.date' },
  { title: 'State', value: 'task.state' }
]
</script>

<template>
  <VDataTable :items="taskCreatorData" :loading="isTaskCreatorLoading" :headers="headers">
  </VDataTable>
</template>

<style scoped></style>
