<script setup lang="ts">
import { ref, watch } from 'vue'
import CreateRuc from './create/CreateRuc.vue'
import { Ruc, RucDuty } from '@/models/Ruc'
import AddDuty from './create/AddDuty.vue'
import useRucMutations from '@/composable/ruc/useRucMutations'
import { AxiosError } from 'axios'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { showErrorToast } from '@/service/sweetAlert'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/useStore'

const onboarding = ref('1')
const ruc = ref<Ruc>({} as Ruc)
const obligations = ref<RucDuty[]>([])
const { saveRucFullMutations } = useRucMutations()
const router = useRouter()
const store = userStore()

const onAddDuty = (duty: RucDuty) => {
  obligations.value.push(duty)
}

const onDeleteDuty = (duty: RucDuty) => {
  obligations.value = obligations.value.filter((x) => x.id != duty.id)
}

const onRucCreated = (item: Ruc) => {
  onboarding.value = '2'
  ruc.value = item
}

const onDutyBack = () => {
  onboarding.value = '1'
}

const onCreated = () => {
  ruc.value.user = store.user
  saveRucFullMutations.mutate({
    obligations: obligations.value,
    ruc: ruc.value
  })
}

watch(saveRucFullMutations.isError, () => {
  if (saveRucFullMutations.isError.value) {
    const error = saveRucFullMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(saveRucFullMutations.isSuccess, () => {
  if (saveRucFullMutations.isSuccess.value) {
    router.push({ name: 'dni-documents' })
  }
})
</script>

<template>
  <VContainer class="py-0">
    <div class="tw:w-full tw:flex tw:justify-center">
      <div class="tw:max-w-2xl">
        <VWindow v-model="onboarding">
          <VWindowItem value="1">
            <CreateRuc @ruc-created="onRucCreated" />
          </VWindowItem>
          <VWindowItem value="2">
            <AddDuty
              @back="onDutyBack"
              @duties-created="onCreated"
              @duty-add="onAddDuty"
              @duty-delete="onDeleteDuty"
              :back-text="'Atras'"
              :create-text="'Crear'"
              :title-text="'Paso 2 de 2: Crea obligaciones'"
              :duties="obligations"
            />
          </VWindowItem>
        </VWindow>
      </div>
    </div>
  </VContainer>
</template>

<style scoped></style>
