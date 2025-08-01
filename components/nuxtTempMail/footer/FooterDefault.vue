<template>
  <footer class="bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 text-gray-600 pt-16 pb-8 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">

        <div class="col-span-2 md:col-span-1">
          <a href="#" class="flex items-center mb-4 text-gray-900 text-xl font-semibold">
            <img src="/assets/imgs/icon/tempmail.png" alt="FreeTempMail Logo" class="h-12 w-auto mr-2">
            {{ $config.public.appName || 'FreeTempMail' }}
          </a>
          <a href="https://nuxtpro.com" target="_blank" class="inline-flex items-center text-xs bg-gradient-to-r from-green-100 to-blue-100 hover:from-green-200 hover:to-blue-200 text-gray-700 px-3 py-2 rounded-lg border border-green-200 transition-all duration-200 shadow-sm">
            Built with 🚀 NuxtPro
          </a>
        </div>

        <div>
          <h5 class="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">{{ $t('footer.menu') }}</h5>
          <ul class="space-y-3">
            <li><NuxtLink to="#" class="hover:text-green-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">{{ $t('footer.home') }}</NuxtLink></li>
            <li><NuxtLink to="#features" class="hover:text-green-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">{{ $t('footer.features') }}</NuxtLink></li>
            <li><NuxtLink to="#testimonials" class="hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">{{ $t('footer.testimonials') }}</NuxtLink></li>
            <li><NuxtLink to="#faq" class="hover:text-green-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">{{ $t('footer.faq') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h5 class="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">{{ $t('footer.legal') }}</h5>
          <ul class="space-y-3">
            <li><NuxtLink to="/license" class="hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">{{ $t('footer.license') }}</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-green-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">{{ $t('footer.privacy') }}</NuxtLink></li>
            <li><NuxtLink to="/terms" class="hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">{{ $t('footer.terms') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h5 class="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">{{ $t('footer.friendsList') }}</h5>
          <ul class="space-y-3">
            <li><a href="https://metaqiu.cn" target="_blank" class="hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">METAQIU</a></li>
          </ul>
        </div>

      </div>
      <!-- Divider line -->
      <hr class="my-8 border-gradient-to-r from-green-200 via-blue-200 to-green-200" />
      <!-- Copyright information -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-500 text-sm">
        <div class="mb-4 sm:mb-0 max-w-md">
          <div class="mb-2">
            &copy; {{ currentYear }} {{ $config.public.appName || 'FreeTempMail' }} All Rights Reserved.
          </div>
          <div class="text-xs text-gray-400 leading-relaxed">
            {{ $t('footer.projectBasedOn') }}
            <a href="https://github.com/PennyJoly/FreeTempMail"
               target="_blank"
               class="text-blue-500 hover:text-blue-600 underline decoration-1 underline-offset-2 transition-colors duration-200">
              FreeTempMail
            </a>
            {{ $t('footer.openSourceProject') }}
            <a href="https://github.com/PennyJoly"
               target="_blank"
               class="text-blue-500 hover:text-blue-600 underline decoration-1 underline-offset-2 transition-colors duration-200">
              @PennyJoly
            </a>
            {{ $t('footer.originalContribution') }}
          </div>
        </div>

        <div class="flex space-x-4">
          <a href="https://github.com/MetaQiu" target="_blank" class="hover:text-gray-800 transition-all duration-200 transform hover:scale-110 p-2 rounded-full hover:bg-white hover:shadow-md" aria-label="GitHub">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.397.098 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear());

</script>

<style>
/* Add any specific styles for the footer here */
footer a {
  transition: all 0.2s ease-in-out;
}
/* Ensure SVGs in links inherit color */
footer a svg {
  display: inline-block; /* Or block depending on layout needs */
  fill: currentColor; /* Ensure SVG uses the link's text color */
}
</style>