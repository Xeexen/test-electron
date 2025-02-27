<template>
  <div class="logo">
    <RouterLink :to="{ name: 'home' }" aria-label="logo">
      <VImg :src="logo" height="60" />
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
//@ts-ignore
import logo from '@/assets/images/logo-bbf.png'
</script>
