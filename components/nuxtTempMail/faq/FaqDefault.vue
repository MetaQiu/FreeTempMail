<template>
  <section class="py-20 mt-16 bg-gradient-to-br from-white via-blue-50 to-green-50 relative overflow-hidden" id="faq">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-32 left-16 w-48 h-48 bg-gradient-to-br from-blue-300 to-green-300 rounded-full blur-3xl"></div>
      <div class="absolute bottom-16 right-20 w-64 h-64 bg-gradient-to-br from-green-300 to-blue-300 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <h2 class="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 bg-clip-text text-transparent">{{ $t('tempmail.faqs.title') }}</h2>
      <div class="space-y-6 max-w-4xl mx-auto">
        <div v-for="(faq, index) in faqs" :key="faq.id" class="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl border transition-all duration-300 transform hover:-translate-y-1 group" 
             :class="[
               index % 2 === 0 ? 'border-green-200 hover:border-green-300' : 'border-blue-200 hover:border-blue-300'
             ]"
             @click="handleToggle(index)">
          <h3 class="font-semibold flex justify-between items-center text-gray-900 cursor-pointer group-hover:text-green-700 transition-colors duration-300">
            <span class="flex items-center">
              <div class="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-sm font-bold transition-all duration-300"
                   :class="[
                     index % 2 === 0 
                       ? 'bg-gradient-to-r from-green-500 to-blue-500 group-hover:from-green-600 group-hover:to-blue-600' 
                       : 'bg-gradient-to-r from-blue-500 to-green-500 group-hover:from-blue-600 group-hover:to-green-600'
                   ]">
                {{ faq.id }}
              </div>
              {{ $t('tempmail.faqs.question' + faq.id) }}
            </span>
            <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110"
                 :class="[
                   isOpen[index] 
                     ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white rotate-180' 
                     : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 group-hover:from-green-200 group-hover:to-blue-200'
                 ]">
              <svg class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </h3>
          <div v-if="isOpen[index]" class="mt-4 pt-4 border-t transition-all duration-300"
               :class="[
                 index % 2 === 0 ? 'border-green-200' : 'border-blue-200'
               ]">
            <p class="text-gray-600 leading-relaxed pl-11 animate-fadeIn">{{ $t('tempmail.faqs.answer' + faq.id) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const faqs = ref([
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 }
]);

const isOpen = ref(Array(faqs.value.length).fill(false));

const handleToggle = (index) => {
  isOpen.value[index] = !isOpen.value[index];
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>