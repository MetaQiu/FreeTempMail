<template>
  <div class="fixed inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center z-50">
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 border border-green-200">
      <!-- 标题 -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">隐私保护</h2>
        <p class="text-gray-600">请输入访问密码以继续使用服务</p>
      </div>

      <!-- 密码输入表单 -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">访问密码</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入密码"
              :class="{ 'border-red-500': error }"
              @input="clearError"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            </button>
          </div>
          <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading || !password.trim()"
          class="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            验证中...
          </span>
          <span v-else>确认访问</span>
        </button>
      </form>

      <!-- 提示信息 -->
      <div class="mt-6 text-center">
        <p class="text-xs text-gray-500">
          此密码用于保护您的隐私，防止未授权访问
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  onSuccess: () => void
}

const props = defineProps<Props>()

const password = ref('')
const showPassword = ref(false)
const error = ref('')
const isLoading = ref(false)

const config = useRuntimeConfig()

const clearError = () => {
  error.value = ''
}

const handleSubmit = async () => {
  if (!password.value.trim()) {
    error.value = '请输入密码'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    // 验证密码
    const correctPassword = config.public.accessPassword
    const inputPassword = password.value.trim()

    // 支持字符串和数字类型的密码比较
    let isPasswordCorrect = false
    if (typeof correctPassword === 'string') {
      isPasswordCorrect = inputPassword === correctPassword
    } else if (typeof correctPassword === 'number') {
      isPasswordCorrect = inputPassword === String(correctPassword)
    }

    if (correctPassword && isPasswordCorrect) {
      // 密码正确，保存到 sessionStorage
      sessionStorage.setItem('tempmail_auth', 'true')
      sessionStorage.setItem('tempmail_auth_time', Date.now().toString())

      // 调用成功回调
      props.onSuccess()
    } else {
      error.value = '密码错误，请重试'
      password.value = ''
    }
  } catch (err) {
    error.value = '验证失败，请重试'
  } finally {
    isLoading.value = false
  }
}

// 组件挂载时聚焦到密码输入框
onMounted(() => {
  const input = document.querySelector('input[type="password"], input[type="text"]') as HTMLInputElement
  if (input) {
    input.focus()
  }
})
</script>
