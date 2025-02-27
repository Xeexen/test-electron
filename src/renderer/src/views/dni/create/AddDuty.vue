<script setup lang="ts">
import InputSection from '@/components/shared/InputSection.vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import useDutyTypes from '@/composable/dutyType/useDutyTypes'
import useUsers from '@/composable/users/useUsers'
import { RucDuty } from '@/models/Ruc'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { v4 as uuid } from 'uuid'

interface props {
  backText: string
  createText: string
  titleText: string
  duties: RucDuty[]
}

const props = defineProps<props>()

const duty = ref<RucDuty>({} as RucDuty)

const emits = defineEmits(['duties-created', 'back', 'duty-delete', 'duty-add'])

const { userData, isUsersLoading } = useUsers()
const { dutyTypesData, isDutyTypesLoading } = useDutyTypes()

const showDialog = ref(false)

const onSubmit = () => {
  emits('duties-created')
}

const onBack = () => {
  emits('back')
}

const onDutyAdd = () => {
  emits('duty-add', { ...duty.value, id: uuid() })
  duty.value = {} as RucDuty
}
const onDelete = (item: RucDuty) => {
  emits('duty-delete', item)
}
</script>

<template>
  <VCard color="containerBg" flat>
    <VCardTitle>
      <div class="tw:flex tw:gap-2 tw:items-center">
        <p>
          {{ titleText }}
        </p>
        <VBtn icon color="success" variant="tonal" density="compact" @click="showDialog = true">
          <Icon icon="material-symbols:add-circle-outline-rounded" />
        </VBtn>
      </div>
    </VCardTitle>
    <VCardItem>
      <div v-if="duties.length <= 0" class="">
        <p>No tiene obligaciones</p>
      </div>
      <div class="tw:flex tw:flex-col tw:gap-2" v-else>
        <div class="tw:flex tw:gap-2 tw:items-center" v-for="item in duties">
          <v-avatar size="45" rounded="md" color="lightprimary">
            <Icon icon="material-symbols:lab-profile" height="24" class="text-primary" />
          </v-avatar>
          <div class="tw:flex tw:flex-col tw:gap-1">
            <p class="tw:font-semibold tw:text-xs">{{ item.type.name }}</p>
            <p class="tw:text-xs">{{ item.date }}</p>
            <p class="tw:text-xs">{{ item.user.name }}</p>
          </div>
          <VBtn color="error" icon variant="tonal" density="compact" @click="onDelete(item)">
            <Icon icon="mdi:minus-circle-outline" />
          </VBtn>
        </div>
      </div>
    </VCardItem>
    <VCardActions class="py-0">
      <div class="tw:w-full tw:flex tw:justify-between">
        <VBtn color="primary" variant="elevated" rounded="lg" @click="onBack">
          {{ backText }}
        </VBtn>
        <VBtn color="primary" variant="elevated" rounded="lg" @click="onSubmit">
          {{ createText }}
        </VBtn>
      </div>
    </VCardActions>
    <VDialog max-width="500" v-model="showDialog" persistent>
      <UiParentCard title="Nueva obligacion">
        <InputSection label="Obligacion">
          <VSelect
            variant="solo-filled"
            flat
            item-title="name"
            return-object
            v-model="duty.type"
            :items="dutyTypesData"
            :loading="isDutyTypesLoading"
          />
        </InputSection>
        <InputSection label="Fecha">
          <VDateInput
            placeholder="Fecha"
            prepend-icon=""
            variant="solo-filled"
            flat
            data-date-format="YYYY-MM-DD"
            v-model="duty.date"
          />
        </InputSection>
        <InputSection label="Responsable">
          <VSelect
            :items="userData"
            :loading="isUsersLoading"
            item-title="name"
            return-object
            variant="solo-filled"
            flat
            v-model="duty.user"
          />
        </InputSection>
        <div class="tw:w-full tw:flex tw:justify-end tw:gap-2">
          <VBtn rounded="lg" @click="showDialog = false">Cancelar</VBtn>
          <VBtn rounded="lg" color="primary" @click="onDutyAdd">Agregar</VBtn>
        </div>
      </UiParentCard>
    </VDialog>
  </VCard>
</template>

<style scoped></style>
