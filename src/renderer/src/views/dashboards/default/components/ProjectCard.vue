<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue'
import CardHeader from '@/components/shared/CardHeader.vue'
import { Dashboard } from '@/models/Dashboard'

interface props {
  dashboard: Dashboard | undefined
  isLoading: boolean
  hasError: boolean
}

const props = defineProps<props>()
</script>
<template>
  <CardHeader title="Proximas Tareas" class="overflow-hidden">
    <div class="pa-6">
      <v-list class="py-5" aria-busy="true" aria-label="project list">
        <v-list-item rounded="md" v-if="props.isLoading"> </v-list-item>
        <v-list-item rounded="md" v-else-if="props.hasError"> </v-list-item>
        <v-list-item
          v-for="(item, index) in props.dashboard.recentTasks"
          :key="index"
          :value="index"
          rounded="md"
          v-else
        >
          <template v-slot:prepend>
            <v-avatar size="8" :color="'warning'"></v-avatar>
          </template>
          <div class="tw:w-40 tw:truncate tw:p-2">
            <span class="">{{ item.rucDuty.type.name }}</span>
          </div>
          <template v-slot:append>
            <v-chip size="small" rounded="md" v-if="!item.task">
              {{ item.rucDuty.user.name }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
      <v-btn color="primary" variant="flat" rounded="md" block :to="{ name: 'task' }">
        <template v-slot:prepend>
          <SvgSprite name="custom-plus" style="width: 18px; height: 18px" />
        </template>
        Task
      </v-btn>
    </div>
  </CardHeader>
</template>
