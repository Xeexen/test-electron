<script setup lang="ts">
import { shallowRef } from 'vue'
import sidebarItems from './sidebarItem'

import { useDisplay } from 'vuetify/lib/framework.mjs'
import Logo from '../logo/LogoMain.vue'
import NavCollapse from './NavCollapse/NavCollapse.vue'
import NavGroup from './NavGroup/NavGroup.vue'
import NavItem from './NavItem/NavItem.vue'

const sidebarMenu = shallowRef(sidebarItems)
const { mdAndDown } = useDisplay()
</script>

<template>
  <v-navigation-drawer
    left
    permanent
    elevation="0"
    rail-width="90"
    mobile-breakpoint="lg"
    width="220"
    app
    class="leftSidebar"
    :rail="mdAndDown"
    expand-on-hover
  >
    <!---Logo part -->

    <div class="pt-4">
      <Logo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list aria-busy="true" class="px-2" aria-label="menu list">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
