<script setup lang="ts">
// imported components
import WelcomeBanner from './components/WelcomeBanner.vue'
import RepeatCustomer from '@/views/widgets/chart/components/RepeatCustomer.vue'
import ProjectOverview from '@/views/widgets/chart/components/ProjectOverview.vue'
import UserCard from '@/views/widgets/statistics/components/UserCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import TransactionCard from '@/views/widgets/data/components/TransactionCard.vue'
import TotalIncome from '@/views/widgets/chart/components/TotalIncome.vue'
import useDashboard from '@/composable/dashboard/useDashboard'
import ChartCards from '@/views/widgets/chart/components/ChartCards.vue'

const { dashboardData, isDashboardError, isDashboardLoading } = useDashboard()
</script>

<template>
  <!-- -------------------------------------------------------------------- -->
  <!-- welcome banner -->
  <!-- -------------------------------------------------------------------- -->
  <!-- <v-row class="my-0">
    <v-col cols="12">
      <WelcomeBanner />
    </v-col>
  </v-row> -->

  <!-- -------------------------------------------------------------------- -->
  <!-- Chart widgets -->
  <!-- -------------------------------------------------------------------- -->
  <ChartCards
    :dashboard="dashboardData"
    :is-loading="isDashboardLoading"
    :has-error="isDashboardError"
  />

  <v-row class="mb-0">
    <v-col cols="12" xl="9" md="8">
      <v-row>
        <!-- -------------------------------------------------------------------- -->
        <!-- Repeat customer -->
        <!-- -------------------------------------------------------------------- -->
        <v-col cols="12">
          <RepeatCustomer
            :dashboard="dashboardData"
            :is-loading="isDashboardLoading"
            :has-error="isDashboardError"
          />
        </v-col>

        <!-- -------------------------------------------------------------------- -->
        <!-- Project overview -->
        <!-- -------------------------------------------------------------------- -->
        <!-- <v-col cols="12">
          <ProjectOverview />
        </v-col> -->
      </v-row>
    </v-col>

    <v-col cols="12" xl="3" md="4">
      <v-row>
        <!-- -------------------------------------------------------------------- -->
        <!-- Project -->
        <!-- -------------------------------------------------------------------- -->
        <v-col cols="12">
          <ProjectCard
            :dashboard="dashboardData"
            :is-loading="isDashboardLoading"
            :has-error="isDashboardError"
          />
        </v-col>

        <!-- -------------------------------------------------------------------- -->
        <!-- User card -->
        <!-- -------------------------------------------------------------------- -->
        <!-- <v-col cols="12">
          <UserCard />
        </v-col> -->
      </v-row>
    </v-col>
  </v-row>

  <v-row>
    <!-- -------------------------------------------------------------------- -->
    <!-- Transactions -->
    <!-- -------------------------------------------------------------------- -->
    <!-- <v-col cols="12" md="6">
      <TransactionCard />
    </v-col> -->

    <!-- -------------------------------------------------------------------- -->
    <!-- Total income -->
    <!-- -------------------------------------------------------------------- -->
    <!-- <v-col cols="12" md="6">
      <TotalIncome />
    </v-col> -->
  </v-row>
</template>
