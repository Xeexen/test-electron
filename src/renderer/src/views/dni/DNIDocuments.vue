<script setup lang="ts">
import InputSection from '@/components/shared/InputSection.vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import useRucMutations from '@/composable/ruc/useRucMutations'
import useRucs from '@/composable/ruc/useRucs'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { Ruc, RucDuty } from '@/models/Ruc'
import { showErrorToast } from '@/service/sweetAlert'
import { Icon } from '@iconify/vue'
import { AxiosError } from 'axios'
import { ref, watch } from 'vue'
import AddDuty from './create/AddDuty.vue'
import useRucDutyMutations from '@/composable/ruc/useRucDutyMutations'

const { isRucsLoading, rucData, refetchRucs } = useRucs()
const { saveRucMutations } = useRucMutations()

const headers = [
  { title: 'Nombre', value: 'name', class: 'my-header-style' },
  { title: 'Documento', value: 'ruc' },
  { title: 'Creador', value: 'user.name' },
  { title: 'Creacion', value: 'createdAt' },
  { title: 'Obligaciones', value: 'obligationsCount' },
  { title: 'Acciones', value: 'actions', width: 50 }
]

const ruc = ref<Ruc>({} as Ruc)
const showUpdateForm = ref(false)
const showUpdateObligations = ref(false)
const obligations = ref<RucDuty[]>([])

const onShowUpdate = (selectedRuc: Ruc) => {
  ruc.value = { ...selectedRuc }
  showUpdateForm.value = true
}

const onShowUpdateObligations = (selectedRuc: Ruc) => {
  ruc.value = { ...selectedRuc }
  obligations.value = JSON.parse(JSON.stringify(selectedRuc.obligations))
  showUpdateObligations.value = true
}
const { deleteDutyMutations, saveDutyMutations, updateDutyMutations } = useRucDutyMutations()
const onSave = () => {
  saveRucMutations.mutate(ruc.value)
}

watch(saveRucMutations.isError, () => {
  if (saveRucMutations.isError.value) {
    const error = saveRucMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(saveRucMutations.isSuccess, () => {
  if (saveRucMutations.isSuccess.value) {
    refetchRucs()
    showUpdateForm.value = false
    ruc.value = {} as Ruc
  }
})

const onAddDuty = (duty: RucDuty) => {
  saveDutyMutations.mutate({ ...duty, ruc: ruc.value })
}

const onDeleteDuty = (duty: RucDuty) => {
  deleteDutyMutations.mutate(duty.id)
}

const onDutyBack = () => {
  showUpdateObligations.value = false
  ruc.value = {} as Ruc
  obligations.value = []
}

const onCreated = () => {}

watch(deleteDutyMutations.isError, () => {
  if (deleteDutyMutations.isError.value) {
    const error = deleteDutyMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(deleteDutyMutations.isSuccess, () => {
  if (deleteDutyMutations.isSuccess.value) {
    obligations.value = obligations.value.filter((x) => x.id != deleteDutyMutations.variables.value)
  }
})

watch(saveDutyMutations.isError, () => {
  if (saveDutyMutations.isError.value) {
    const error = saveDutyMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(saveDutyMutations.isSuccess, () => {
  if (saveDutyMutations.isSuccess.value) {
    obligations.value.push(saveDutyMutations.variables.value!)
  }
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div class="tw:flex tw:w-full tw:justify-between">
        <VTextField max-width="400" variant="solo" flat placeholder="buscar" />
        <VBtn :to="{ name: 'dni-documents-add' }" color="primary">Crear cliente</VBtn>
      </div>
    </VCol>
    <VCol cols="12">
      <VDataTable :items="rucData" :loading="isRucsLoading" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn variant="text" v-bind="props" icon>
                <Icon icon="mdi:dots-vertical" />
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <template #prepend>
                  <div
                    class="tw:flex tw:gap-2 tw:items-center tw:cursor-pointer"
                    @click="onShowUpdate(item)"
                  >
                    <VBtn icon variant="tonal" flat density="compact" color="success">
                      <Icon icon="material-symbols:edit-outline-rounded" />
                    </VBtn>
                    <p>Editar</p>
                  </div>
                </template>
              </v-list-item>
              <v-list-item>
                <div
                  class="tw:flex tw:gap-2 tw:items-center tw:cursor-pointer"
                  @click="onShowUpdateObligations(item)"
                >
                  <VBtn icon variant="tonal" flat density="compact" color="primary">
                    <Icon icon="material-symbols-light:format-list-bulleted-add-rounded" />
                  </VBtn>
                  <p>Obligaciones</p>
                </div>
              </v-list-item>
              <v-list-item> </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </VDataTable>
      <VDialog max-width="600" v-model="showUpdateForm">
        <UiParentCard title="Modificar">
          <InputSection label="Nombre">
            <VTextField
              placeholder="Ingrese nombre"
              v-model="ruc.name"
              variant="solo-filled"
              flat
            />
          </InputSection>
          <InputSection label="Ruc">
            <VTextField
              placeholder="Ingrese documento"
              v-model="ruc.ruc"
              variant="solo-filled"
              flat
            />
          </InputSection>
          <div class="tw:w-full tw:flex tw:justify-end">
            <VBtn
              color="primary"
              flat
              variant="elevated"
              @click="onSave"
              :loading="saveRucMutations.isPending.value"
              >Guardar</VBtn
            >
          </div>
        </UiParentCard>
      </VDialog>
      <VDialog fullscreen v-model="showUpdateObligations" transition="dialog-bottom-transition">
        <VContainer>
          <AddDuty
            @back="onDutyBack"
            @duties-created="onCreated"
            @duty-add="onAddDuty"
            @duty-delete="onDeleteDuty"
            :back-text="'Cancelar'"
            :create-text="'create'"
            :title-text="'Obligations'"
            :duties="obligations"
          />
        </VContainer>
      </VDialog>
    </VCol>
  </VRow>
</template>

<style scoped></style>
