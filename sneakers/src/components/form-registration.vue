<script setup>
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const users = ref([])
const name = ref('')
const email = ref('')
const password = ref('')
const token = ref('')
const imageUrl = ref('')

const isAuthorized = ref(false)
const isLoginInProgress = ref(false)

const router = useRouter()

const backApi = 'https://7a1bc2bfcd9321a6.mokky.dev/users'

const addUser = async () => {
  try {
    const { data } = await axios.get(backApi)

    const userExists = data.some((user) => user.email === email.value)

    if (!userExists) {
      const response = await axios.post(backApi, {
        name: name.value,
        email: email.value,
        password: password.value,
        token: uuidv4(),
        user_id: users.id
      })
      if (response.status === 201) {
        token.value = response.data.token
        isAuthorized.value = true
        router.push('/account')
      }
    } else {
      console.log('Такой пользователь уже существует')
    }
  } catch (error) {
    console.log(error)
  }
}

const loginUser = async () => {
  try {
    const { data } = await axios.get(`${backApi}?email=${email.value}&password=${password.value}`)

    if (data.length) {
      token.value = data[0].token

      isAuthorized.value = true
      router.push('/account')
    } else {
      console.log('Неверный логин или пароль')
    }
  } catch (error) {
    console.log(error)
  }
}

watch(isAuthorized, (newVal) => {
  if (newVal) {
    localStorage.setItem('token', token.value)
  }
})
</script>

<template>
  <div>
    <form
      @submit.prevent="addUser"
      class="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-teal-300 opacity-100 flex items-center justify-center"
    >
      <div class="p-10 bg-white rounded-lg shadow-lg">
        <div>
          <h1 class="text-2xl text-center mb-5 font-bold border-b border-slate-200">Войти</h1>
        </div>

        <div class="relative mb-4">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <img src="/user.svg" class="h-5 w-5" />
          </span>
          <input
            type="text"
            v-model="name"
            id="text"
            class="w-full pl-10 p-2 border rounded-full bg-gray-100"
            placeholder="Имя пользователя"
            required
          />
        </div>
        <div class="form-group mb-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <img src="/email.svg" class="h-5 w-5" />
            </span>
            <input
              type="email"
              v-model="email"
              id="email"
              class="w-full pl-10 p-2 border rounded-full bg-gray-100"
              placeholder="E-mail"
              required
            />
          </div>
        </div>
        <div class="form-group mb-6">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <img src="/password.svg" class="h-5 w-5" />
            </span>
            <input
              type="password"
              v-model="password"
              id="password"
              class="w-full pl-10 p-2 border rounded-full bg-gray-100"
              placeholder="Пароль"
              required
            />
          </div>
        </div>
        <div class="flex flex-col items-center border-t pt-4 mt-4">
          <button
            type="button"
            @click="loginUser"
            class="w-full py-2 px-4 mb-2 bg-blue-500 text-white rounded shadow"
          >
            Войти
          </button>
          <p class="mb-2">Или</p>
          <button @click="addUser" class="w-full py-2 px-4 bg-green-500 text-white rounded shadow">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
