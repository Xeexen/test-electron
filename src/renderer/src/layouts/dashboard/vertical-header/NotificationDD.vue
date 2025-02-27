<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue'
import useNotifications from '@/composable/notifications/useNotifications'
import {
  manageNotificationsIcon,
  manageNotificationsRoute,
  Notification
} from '@/models/Notifications'
import { Icon } from '@iconify/vue'
import moment from 'moment'
import { useRouter } from 'vue-router'

const { isNotificationsLoading, notificationData, notifications } = useNotifications()

const router = useRouter()

const onNotiClick = (noti: Notification) => {
  router.push(manageNotificationsRoute(noti))
}
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="true" offset="6, 0">
    <template v-slot:activator="{ props }">
      <v-btn icon class="text-secondary ml-sm-2 ml-1" color="secondary" rounded="sm" v-bind="props">
        <v-badge
          color="success"
          :content="notifications.length"
          offset-x="-2"
          offset-y="-2"
          v-if="notifications.length > 0"
        >
          <SvgSprite name="custom-notification" />
        </v-badge>
        <SvgSprite name="custom-notification" v-else />
      </v-btn>
    </template>
    <v-sheet rounded="md" width="450" class="notification-dropdown py-6">
      <div class="d-flex align-center justify-space-between pb-4 px-6">
        <h5 class="text-h5 mb-0">Notifications</h5>
        <!-- <a href="#" class="text-primary link-hover text-h6"> Mark all read </a> -->
      </div>
      <div
        class="tw:grid tw:place-content-center"
        v-if="isNotificationsLoading"
        style="height: calc(100vh - 300px); max-height: 430px"
      >
        <VProgressCircular color="primary" indeterminate />
      </div>
      <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 430px" v-else>
        <v-list class="py-0 px-6" lines="two" aria-label="notification list" aria-busy="true">
          <v-list-item
            value="1"
            color="secondary"
            class="no-spacer py-5 mb-3 px-3"
            rounded="md"
            v-for="item in notificationData"
            :key="item.id"
            @click="onNotiClick(item)"
          >
            <template v-slot:prepend>
              <v-avatar size="40" variant="flat" color="primary" class="mr-3 py-2">
                <Icon :icon="manageNotificationsIcon(item)" height="22" />
              </v-avatar>
            </template>
            <div class="tw:flex">
              <h6 class="text-h6 text-lightText mb-0">
                {{ item.descriptions }}
              </h6>
            </div>
            <p class="text-caption text-lightText my-0">
              {{ moment(item.createdAt).format('DD/MM/YYYY') }}
            </p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
      <!-- <div class="pt-2 text-center">
        <a href="#" class="text-primary text-h6 link-hover">View All</a>
      </div> -->
    </v-sheet>
  </v-menu>
</template>

<style lang="scss">
.v-tooltip {
  > .v-overlay__content.custom-tooltip {
    padding: 2px 6px;
  }
}
</style>
