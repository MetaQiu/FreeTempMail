<template>
  <section class="py-20 mt-16 bg-gradient-to-br from-green-50 via-blue-50 to-green-50 relative overflow-hidden" id="testimonials">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-25">
      <div class="absolute top-16 left-20 w-56 h-56 bg-gradient-to-br from-green-300 to-blue-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-16 w-40 h-40 bg-gradient-to-br from-blue-300 to-green-300 rounded-full blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-full blur-xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <h2 class="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 bg-clip-text text-transparent">{{ $t('tempmail.testimonials.title') }}</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl border border-green-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="relative">
              <img src="~/assets/imgs/head/Q56a-E7a_400x400.jpg" alt="John Smith" class="w-14 h-14 rounded-full object-cover border-2 border-green-200 group-hover:border-green-400 transition-all duration-300">
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">John Smith</h4>
              <p class="text-gray-600 text-sm">{{ $t('tempmail.testimonials.user1.role') }}</p>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -top-2 -left-2 text-4xl text-green-200 font-serif">"</div>
            <p class="text-gray-700 leading-relaxed pl-4 italic">{{ $t('tempmail.testimonials.user1.comment') }}</p>
          </div>
          <div class="flex mt-4 space-x-1">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl border border-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="relative">
              <img src="~/assets/imgs/head/_0jm4JCN_400x400.jpg" alt="Sarah Johnson" class="w-14 h-14 rounded-full object-cover border-2 border-blue-200 group-hover:border-blue-400 transition-all duration-300">
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Sarah Johnson</h4>
              <p class="text-gray-600 text-sm">{{ $t('tempmail.testimonials.user2.role') }}</p>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -top-2 -left-2 text-4xl text-blue-200 font-serif">"</div>
            <p class="text-gray-700 leading-relaxed pl-4 italic">{{ $t('tempmail.testimonials.user2.comment') }}</p>
          </div>
          <div class="flex mt-4 space-x-1">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl border border-green-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="relative">
              <img src="~/assets/imgs/head/773JgJ71_400x400.jpg" alt="Mike Chen" class="w-14 h-14 rounded-full object-cover border-2 border-green-200 group-hover:border-green-400 transition-all duration-300">
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">Mike Chen</h4>
              <p class="text-gray-600 text-sm">{{ $t('tempmail.testimonials.user3.role') }}</p>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -top-2 -left-2 text-4xl text-green-200 font-serif">"</div>
            <p class="text-gray-700 leading-relaxed pl-4 italic">{{ $t('tempmail.testimonials.user3.comment') }}</p>
          </div>
          <div class="flex mt-4 space-x-1">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl border border-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="relative">
              <img src="~/assets/imgs/head/UFStG2aG_400x400.jpg" alt="Alen Wu" class="w-14 h-14 rounded-full object-cover border-2 border-blue-200 group-hover:border-blue-400 transition-all duration-300">
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Alen Wu</h4>
              <p class="text-gray-600 text-sm">{{ $t('tempmail.testimonials.user4.role') }}</p>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -top-2 -left-2 text-4xl text-blue-200 font-serif">"</div>
            <p class="text-gray-700 leading-relaxed pl-4 italic">{{ $t('tempmail.testimonials.user4.comment') }}</p>
          </div>
          <div class="flex mt-4 space-x-1">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl border border-green-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="relative">
              <img src="~/assets/imgs/head/X_lkYpoR_400x400.jpg" alt="Alex Rivera" class="w-14 h-14 rounded-full object-cover border-2 border-green-200 group-hover:border-green-400 transition-all duration-300">
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">Alex Rivera</h4>
              <p class="text-gray-600 text-sm">{{ $t('tempmail.testimonials.user5.role') }}</p>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -top-2 -left-2 text-4xl text-green-200 font-serif">"</div>
            <p class="text-gray-700 leading-relaxed pl-4 italic">{{ $t('tempmail.testimonials.user5.comment') }}</p>
          </div>
          <div class="flex mt-4 space-x-1">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        
        <div class="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl border border-blue-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
          <div class="flex items-center gap-4 mb-6">
            <div class="relative">
              <img src="~/assets/imgs/head/66Z_Ppre_400x400.jpg" alt="Emily Davis" class="w-14 h-14 rounded-full object-cover border-2 border-blue-200 group-hover:border-blue-400 transition-all duration-300">
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Emily Davis</h4>
              <p class="text-gray-600 text-sm">{{ $t('tempmail.testimonials.user6.role') }}</p>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -top-2 -left-2 text-4xl text-blue-200 font-serif">"</div>
            <p class="text-gray-700 leading-relaxed pl-4 italic">{{ $t('tempmail.testimonials.user6.comment') }}</p>
          </div>
          <div class="flex mt-4 space-x-1">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>