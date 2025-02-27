<script setup lang="ts">
import { Dashboard } from '@/models/Dashboard'
import { ref, computed, watch } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const primaryColor = theme.current.value.colors.primary

const menulist = ref(['Today', 'Weekly', 'Monthly'])

interface props {
  dashboard: Dashboard | undefined
  isLoading: boolean
  hasError: boolean
}

const props = defineProps<props>()

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 260,
      fontFamily: `inherit`,
      foreColor: 'rgba(var(--v-theme-lightText), var(--v-high-opacity))',
      toolbar: false
    },
    colors: [primaryColor, theme.current.value.colors.secondary, '#FF5B27', '#00B09F'],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    grid: {
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))',
      strokeDashArray: 4
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    legend: {
      show: true
    }
  }
})

const areaChart = ref({
  series: []
})

watch(
  () => props.dashboard,
  () => {
    areaChart.value.series = props.dashboard.yearlyTasks
  }
)
</script>
<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Tareas del año</h5>
      </div>
    </v-card-text>
    <v-card-item class="pt-0">
      <div class="text-right">
        <h6 class="text-subtitle-1">
          5.44%
          <v-chip color="success" variant="flat" size="small" rounded="md">+2.6%</v-chip>
        </h6>
      </div>
      <apexchart type="area" height="260" :options="chartOptions" :series="areaChart.series">
      </apexchart>
    </v-card-item>
  </v-card>
</template>
