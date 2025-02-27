<script setup lang="ts">
import InputSection from '@/components/shared/InputSection.vue'
import { Ruc } from '@/models/Ruc'
import { ref } from 'vue'

const ruc = ref<Ruc>({} as Ruc)
const emits = defineEmits(['ruc-created'])

const onSubmit = () => {
  emits('ruc-created', ruc.value)
}
</script>

<template>
  <VCard color="containerBg" flat>
    <VCardTitle> Paso 1 de 2: Informacion Personal </VCardTitle>
    <VCardItem>
      <InputSection label="Nombre">
        <VTextField variant="solo" flat placeholder="Ingrese el nombre" v-model="ruc.name" />
      </InputSection>
      <InputSection label="Ruc">
        <VTextField variant="solo" flat placeholder="Ingrese el ruc" v-model="ruc.ruc" />
      </InputSection>
    </VCardItem>
    <VCardActions class="py-0">
      <div class="tw:w-full tw:flex tw:justify-end">
        <VBtn color="primary" variant="elevated" rounded="lg" @click="onSubmit">Siguiente</VBtn>
      </div>
    </VCardActions>
  </VCard>
</template>

<style scoped></style>
