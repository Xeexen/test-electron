import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import vuetify from './plugins/vuetify'
import { VueQueryPlugin } from '@tanstack/vue-query'

import '@/scss/style.scss'
import '@/scss/impTailwind.css'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import VueApexCharts from 'vue3-apexcharts'
import VueTablerIcons from 'vue-tabler-icons'
import pluginPiniaPersist from 'pinia-plugin-persistedstate'
import SvgSprite from '@/components/shared/SvgSprite.vue'

// google-fonts
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/700.css'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/500.css'
import '@fontsource/public-sans/600.css'
import '@fontsource/public-sans/700.css'

import { fakeBackend } from '@/utils/helpers/fake-backend'

const app = createApp(App)
fakeBackend()
const pinia = createPinia()
pinia.use(pluginPiniaPersist)
app.use(router)
app.use(VueQueryPlugin)
app.use(PerfectScrollbarPlugin)
app.component('SvgSprite', SvgSprite)
app.use(pinia)
app.use(VueTablerIcons)
app.use(VueApexCharts)
app.use(vuetify).mount('#app')
