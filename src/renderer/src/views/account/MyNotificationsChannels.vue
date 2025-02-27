<script setup lang="ts">
import InputSection from '@/components/shared/InputSection.vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import useAccountNotificationChannels from '@/composable/account/useAccountNotificationChannels'
import useAccountNotificationChannelsMutations from '@/composable/account/useAccountNotificationChannelsMutations'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { channelTypeArray, NotificationChannel } from '@/models/NotificationChannel'
import { showErrorToast } from '@/service/sweetAlert'
import { userStore } from '@/stores/useStore'
import { AxiosError } from 'axios'
import { ref, watch } from 'vue'
import { v4 as uuid } from 'uuid'

const { isNotificationChannelsLoading, notificationChannelsData } = useAccountNotificationChannels()
const { saveChannelMutations } = useAccountNotificationChannelsMutations()
const newNotifications = ref<NotificationChannel>({} as NotificationChannel)
const userSt = userStore()

const headers = [
  { title: 'Tipo', value: 'channelType' },
  { title: 'Destino', value: 'destination' },
  { title: 'Estado', value: 'enabled' },
  { title: 'Acciones', value: 'actions', width: 50 }
]

const showAddChannelForm = ref(false)

const onSave = () => {
  newNotifications.value.user = userSt.user
  newNotifications.value.id = uuid()
  saveChannelMutations.mutate(newNotifications.value)
}

watch(saveChannelMutations.isError, () => {
  if (saveChannelMutations.isError.value) {
    const error = saveChannelMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(saveChannelMutations.isSuccess, () => {
  if (saveChannelMutations.isSuccess.value) {
    showAddChannelForm.value = false
    newNotifications.value = {} as NotificationChannel
  }
})
</script>

<template>
  <VRow>
    <VCol cols="12" class="py-0">
      <h1 class="tw:text-xl tw:font-semibold">Mis canales</h1>
    </VCol>
    <VCol cols="12">
      <div class="tw:flex tw:gap-2">
        <VBtn color="primary" variant="elevated" flat @click="showAddChannelForm = true"
          >Crear</VBtn
        >
      </div>
    </VCol>
    <VCol cols="12">
      <VDataTable
        :headers="headers"
        :items="notificationChannelsData"
        :loading="isNotificationChannelsLoading"
      ></VDataTable>

      <VDialog v-model="showAddChannelForm" max-width="500" persistent>
        <UiParentCard title="Crear canal">
          <InputSection label="Tipo">
            <VSelect
              :items="channelTypeArray"
              placeholder="Channel type"
              v-model="newNotifications.channelType"
            />
          </InputSection>
          <InputSection label="Destino">
            <VTextField placeholder="Enter destiny" v-model="newNotifications.destination" />
          </InputSection>
          <div class="tw:flex tw:w-full tw:justify-end tw:gap-2">
            <VBtn color="primary" @click="showAddChannelForm = false">Cancelar</VBtn>
            <VBtn color="primary" variant="elevated" @click="onSave">Guardar</VBtn>
          </div>
        </UiParentCard>
      </VDialog>
    </VCol>
  </VRow>
</template>

<style scoped></style>
