<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue'
import useLogin from '@/composable/useLogin'
import { ErrorApiResponse } from '@/models/ApiResponse'
import { showErrorToast } from '@/service/sweetAlert'
import { userStore } from '@/stores/useStore'
import { AxiosError } from 'axios'
import { Form } from 'vee-validate'
import { onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const checkbox = ref(false)
const valid = ref(false)
const show1 = ref(false)
const password = ref('')
const username = ref('')
const { loginMutations } = useLogin()
const router = useRouter()
const store = userStore()

onBeforeMount(() => {
  if (store.token) {
    router.push({ name: 'home' })
  }
})

function validate() {
  loginMutations.mutate({ password: password.value, email: username.value })
}

watch(loginMutations.isError, () => {
  if (loginMutations.isError.value) {
    let error = loginMutations.error.value as AxiosError<ErrorApiResponse>
    showErrorToast(error)
  }
})

watch(loginMutations.isSuccess, () => {
  if (loginMutations.isSuccess.value) {
    let response = loginMutations.data.value
    if (response) {
      try {
        window.electron.ipcRenderer.send('login', JSON.stringify(response))
      } catch (error) {}
      store.setUser(response.user)
      store.setToken(response.token)
      router.push({ name: 'home' })
    }
  }
})
</script>

<template>
  <div class="d-flex justify-space-between align-center mt-4">
    <h3 class="text-h3 text-center mb-0">Login</h3>
  </div>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <div class="mb-6">
      <v-label>Email Address</v-label>
      <v-text-field
        aria-label="email address"
        v-model="username"
        class="mt-2"
        density="comfortable"
        required
        placeholder="Enter your email"
        hide-details="auto"
        variant="outlined"
        color="primary"
      ></v-text-field>
    </div>
    <div>
      <v-label>Password</v-label>
      <v-text-field
        aria-label="password"
        v-model="password"
        required
        variant="outlined"
        placeholder="Enter your password"
        density="comfortable"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="pwdInput mt-2"
      >
        <template v-slot:append-inner>
          <v-btn color="secondary" aria-label="icon" icon rounded variant="text">
            <SvgSprite
              name="custom-eye-invisible"
              style="width: 20px; height: 20px"
              v-if="show1 == false"
              @click="show1 = !show1"
            />
            <SvgSprite
              name="custom-eye"
              style="width: 20px; height: 20px"
              v-if="show1 == true"
              @click="show1 = !show1"
            />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'You must agree to continue!']"
        label="Keep me sign in"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox>
      <div class="ml-auto">
        <router-link to="/forgot-pwd1" class="text-darkText link-hover"
          >Forgot Password?</router-link
        >
      </div>
    </div>
    <v-btn
      color="primary"
      :loading="isSubmitting"
      block
      class="mt-5"
      variant="flat"
      size="large"
      rounded="md"
      :disabled="valid"
      type="submit"
    >
      Login</v-btn
    >
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
</template>
