<template>
  <section class="py-20 mt-16 bg-gradient-to-br from-white via-green-50 to-blue-50 relative overflow-hidden" id="features">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-blue-200 to-green-200 rounded-full blur-2xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <h2 class="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 bg-clip-text text-transparent">{{ $t('tempmail.features.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center group">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2 border-2 border-blue-200 hover:border-green-300">
            <svg class="w-10 h-10 text-blue-600 group-hover:text-green-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-200">
            <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">{{ $t('tempmail.features.secure.title') }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ $t('tempmail.features.secure.description') }}</p>
          </div>
        </div>

        <div class="text-center group">
          <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2 border-2 border-green-200 hover:border-blue-300">
            <svg class="w-10 h-10 text-green-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
            <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{{ $t('tempmail.features.fast.title') }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ $t('tempmail.features.fast.description') }}</p>
          </div>
        </div>

        <div class="text-center group">
          <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2 border-2 border-purple-200 hover:border-green-300">
            <svg class="w-10 h-10 text-purple-600 group-hover:text-green-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
            <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">{{ $t('tempmail.features.unlimited.title') }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ $t('tempmail.features.unlimited.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>