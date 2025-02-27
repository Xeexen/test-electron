<script setup lang="ts">
import InputSection from '@/components/shared/InputSection.vue'
import useRoles from '@/composable/users/useRoles'
import useUserMutations from '@/composable/users/useUserMutations'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { User } from '@/models/User'
import { showErrorToast } from '@/service/sweetAlert'
import { AxiosError } from 'axios'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const { saveUserMutations } = useUserMutations()
const user = ref<User>({} as User)
const router = useRouter()
const { isRolesLoading, roles } = useRoles()

const onUserSubmit = () => {
  saveUserMutations.mutate(user.value)
}

watch(saveUserMutations.isError, () => {
  if (saveUserMutations.isError.value) {
    const error = saveUserMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(saveUserMutations.isSuccess, () => {
  if (saveUserMutations.isSuccess.value) {
    router.push({ name: 'users' })
  }
})
</script>
<template>
  <VContainer class="py-0">
    <div class="d-flex align-center w-full flex-column">
      <VCard max-width="400" color="containerBg" variant="flat" class="py-0">
        <VCardTitle class="py-0">
          <h3>Crear nuevo usuario</h3>
        </VCardTitle>
        <VCardItem class="pb-0">
          <InputSection label="Nombre">
            <VTextField placeholder="Nombre completo" variant="solo" flat v-model="user.name" />
          </InputSection>
          <InputSection label="Email">
            <VTextField placeholder="Email corporativo" variant="solo" flat v-model="user.email" />
          </InputSection>
          <InputSection label="Password">
            <VTextField
              placeholder="Contraseña del usuario"
              variant="solo"
              flat
              v-model="user.password"
            />
          </InputSection>
          <InputSection label="Rol">
            <VSelect
              placeholder="Rol del usuario"
              variant="solo"
              flat
              :items="roles"
              return-object
              v-model="user.roles"
              multiple
              item-title="name"
              :loading="isRolesLoading"
            />
          </InputSection>
        </VCardItem>
        <VCardActions>
          <div class="d-flex justify-end ga-2 w-100">
            <VBtn color="primary">Cancelar</VBtn>
            <VBtn color="success" variant="elevated" rounded="md" @click="onUserSubmit">Crear</VBtn>
          </div>
        </VCardActions>
      </VCard>
    </div>
  </VContainer>
</template>

<style scoped></style>
