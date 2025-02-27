<script setup lang="ts">
import { ref } from 'vue'
import MyTask from './MyTask.vue'
import ReviewerTask from './ReviewerTask.vue'
import SendedTask from './SendedTask.vue'

const tab = ref()
</script>
<template>
  <v-tabs v-model="tab" density="compact">
    <v-tab value="1">My Task</v-tab>
    <v-tab value="2">Task to review</v-tab>
    <v-tab value="3">Task sent to review</v-tab>
  </v-tabs>
  <v-tabs-window v-model="tab" class="py-2">
    <v-tabs-window-item value="1">
      <MyTask />
    </v-tabs-window-item>

    <v-tabs-window-item value="2">
      <ReviewerTask />
    </v-tabs-window-item>

    <v-tabs-window-item value="3">
      <SendedTask />
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<style scoped></style>
