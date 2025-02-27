<script setup lang="ts">
import useDutyTypes from '@/composable/dutyType/useDutyTypes'
import { DutyType } from '@/models/Ruc'
import { ref, watch } from 'vue'
import { v4 as uuid } from 'uuid'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import InputSection from '@/components/shared/InputSection.vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import useDutyTypeMutations from '@/composable/dutyType/useDutyTypeMutations'
import { AxiosError } from 'axios'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { showErrorToast } from '@/service/sweetAlert'
import { Icon } from '@iconify/vue'

const { dutyTypesData, isDutyTypesLoading, refetchDutyTypes } = useDutyTypes()
const { saveMutations } = useDutyTypeMutations()
const dutyType = ref<DutyType>({} as DutyType)
const showDialogForm = ref(false)
const search = ref()

const headers = [
  { title: 'Nombre', value: 'name', class: 'my-header-style' },
  { title: 'Frecuencia (meses)', value: 'frequency' },
  { title: 'Acciones', value: 'actions', width: 50 }
]

const onAddNew = () => {
  dutyType.value = {
    id: uuid(),
    frequency: 1
  } as DutyType
  showDialogForm.value = true
}

const onUpdate = (item: DutyType) => {
  dutyType.value = { ...item }
  showDialogForm.value = true
}

const onDutyTypeSubmit = () => {
  saveMutations.mutate(dutyType.value)
}

watch(saveMutations.isError, () => {
  if (saveMutations.isError.value) {
    const error = saveMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(saveMutations.isSuccess, () => {
  if (saveMutations.isSuccess.value) {
    dutyType.value = {
      id: uuid()
    } as DutyType
    showDialogForm.value = false
    refetchDutyTypes()
  }
})
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <div class="tw:flex tw:gap-2 tw:items-center tw:w-full tw:justify-between">
          <VTextField
            max-width="500"
            placeholder="Buscar"
            variant="solo"
            hide-details
            flat
            v-model="search"
          />
          <VBtn color="primary" flat variant="elevated" @click="onAddNew">Agregar nuevo</VBtn>
        </div>
      </VCol>
      <VCol cols="12">
        <VDataTable
          :items="dutyTypesData"
          :loading="isDutyTypesLoading"
          :headers="headers"
          :search="search"
        >
          <template #item.actions="{ item }">
            <VBtn
              icon
              flat
              variant="tonal"
              density="compact"
              @click="onUpdate(item)"
              color="success"
            >
              <Icon icon="line-md:pencil-alt-twotone" />
            </VBtn>
          </template>
        </VDataTable>
      </VCol>
    </VRow>
    <VDialog max-width="500" v-model="showDialogForm">
      <UiParentCard title="Guardar obligacion">
        <InputSection label="Nombre">
          <VTextField
            placeholder="Nombre de la obligacion"
            v-model="dutyType.name"
            variant="solo-filled"
            flat
          />
        </InputSection>

        <InputSection label="Frecuencia (mensual)">
          <VNumberInput
            placeholder="Numero de meses"
            v-model="dutyType.frequency"
            variant="solo-filled"
            flat
            :min="1"
            :max="12"
          />
        </InputSection>
        <VBtn @click="onDutyTypeSubmit" :loading="saveMutations.isPending.value" color="primary"
          >Guardar</VBtn
        >
      </UiParentCard>
    </VDialog>
  </VContainer>
</template>

<style scoped></style>
