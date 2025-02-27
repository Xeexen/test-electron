<script setup lang="ts">
import useUsers from '@/composable/users/useUsers'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const { isUsersLoading, userData } = useUsers()
const search = ref()

const headers = [
  { title: 'Nombre', value: 'name', class: 'my-header-style' },
  { title: 'Correo', value: 'email' },
  { title: 'Rol', value: 'roles[0].name' },
  { title: 'Acciones', value: 'actions', width: 50 }
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div class="w-100 d-flex justify-space-between">
        <VTextField max-width="500" placeholder="buscar" variant="solo" flat v-model="search">
          <template #prepend-inner>
            <Icon icon="material-symbols:search" />
          </template>
        </VTextField>
        <VBtn :to="{ name: 'users-add' }" color="primary">Create new user</VBtn>
      </div>
    </VCol>
    <VCol cols="12">
      <VDataTable
        :items="userData"
        :loading="isUsersLoading"
        color="primary"
        :headers="headers"
        :search="search"
      >
      </VDataTable>
    </VCol>
  </VRow>
</template>

<style scoped></style>
