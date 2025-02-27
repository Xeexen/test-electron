<script setup lang="ts">
import useReportsMutations from '@/composable/reports/useReportsMutations'
import { Icon } from '@iconify/vue'
import { computed, ref, watch } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import moment from 'moment'
import useTasks from '@/composable/task/useTasks'
import { Criteria } from '@/models/Criteria'
import { AxiosError } from 'axios'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { showErrorToast } from '@/service/sweetAlert'

const { generaMutations, bossMutations, dogMutations } = useReportsMutations()
const { isTasksLoading, tasks, refetchTask, matchMutations } = useTasks()
const startDate = ref(new Date())
const endDate = ref(new Date())
const criteria = ref<Criteria>({ filters: [] })

const filter = () => {
  criteria.value = {
    filters: [
      {
        joinTable: 'rucDuty.user',
        logicalOperator: 'AND',
        column: 'id',
        operation: 'JOIN',
        value: 'dc526b0f-4361-4853-aa70-462103301a5d'
      }
    ]
  }
  matchMutations.mutate(criteria.value)
}

watch(matchMutations.isError, () => {
  if (matchMutations.isError.value) {
    const error = matchMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

const headers = [
  { title: 'state', value: 'state', class: 'my-header-style' },
  { title: 'obligacion', value: 'rucDuty.type.name' },
  { title: 'RUC', value: 'rucDuty.parentRuc' },
  { title: 'Nombre', value: 'rucDuty.parentName' },
  { title: 'Supervisor', value: 'rucDuty.supervisor' },
  { title: 'Date', value: 'date' }
]

const reports = [
  {
    title: 'Gerencial',
    description: 'descarga reporte de todos los deberes',
    icon: 'ant-design:stock-outlined',
    onClick: () => {
      generaMutations.mutate({
        endDate: moment(endDate.value).format('YYYY-MM-DD'),
        startDate: moment(startDate.value).format('YYYY-MM-DD')
      })
    },
    isLoading: computed(() => generaMutations.isPending.value)
  },
  {
    title: 'Mis asistentes',
    description: 'descarga reporte de los deberes de mis asistentes',
    icon: 'ci:users-group',
    onClick: () => {
      bossMutations.mutate({
        endDate: moment(endDate.value).format('YYYY-MM-DD'),
        startDate: moment(startDate.value).format('YYYY-MM-DD')
      })
    },
    isLoading: computed(() => bossMutations.isPending.value)
  },
  {
    title: 'Mis deberes',
    description: 'descarga reporte de todos mis deberes',
    icon: 'hugeicons:task-done-01',
    onClick: () => {
      dogMutations.mutate({
        endDate: moment(endDate.value).format('YYYY-MM-DD'),
        startDate: moment(startDate.value).format('YYYY-MM-DD')
      })
    },
    isLoading: computed(() => dogMutations.isPending.value)
  }
]
</script>
<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <h2 class="tw:text-2xl tw:font-semibold">Reports Overview</h2>
      </VCol>
      <VCol cols="12">
        <div class="tw:flex tw:gap-2">
          <VDateInput variant="solo" flat v-model="startDate" />
          <VDateInput variant="solo" flat v-model="endDate" />
        </div>
      </VCol>
      <VCol cols="4" v-for="item in reports">
        <VCard color="secondary" variant="tonal" flat class="px-0">
          <VCardTitle class="px-3">
            <VAvatar color="secondary" variant="tonal">
              <Icon :icon="item.icon" />
            </VAvatar>
          </VCardTitle>
          <VCardItem class="py-0 px-4">
            <div class="tw:flex tw:gap-2 tw:flex-col tw:text-black">
              <h3 class="tw:text-lg tw:font-semibold">{{ item.title }}</h3>
              <h6 class="tw:text-xs">{{ item.description }}</h6>
            </div>
          </VCardItem>
          <VCardActions class="px-4">
            <VBtn
              color="secondary"
              variant="elevated"
              flat
              rounded="lg"
              @click="item.onClick"
              :loading="item.isLoading.value"
            >
              Generar
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VDataTable :items="tasks" :headers="headers" :loading="isTasksLoading">
          <template #top>
            <div class="tw:m-4 tw:w-full">
              <div class="tw:w-full tw:flex tw:justify-end tw:gap-2 pa-2">
                <div class=""></div>
                <VBtn icon @click="refetchTask" color="primary" density="compact">
                  <Icon icon="tabler:reload" />
                </VBtn>
                <VBtn icon @click="filter" color="primary" density="compact" variant="text">
                  <Icon icon="material-symbols:filter-alt" />
                </VBtn>
              </div>
            </div>
          </template>
        </VDataTable>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped></style>
