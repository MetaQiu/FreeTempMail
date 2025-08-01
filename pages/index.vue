<template>
  <div class="bg-gradient-to-br from-white via-green-50 to-blue-50 min-h-screen">
    <HeaderDefault />
    <TempMailGenerator />
    <FeaturesDefault />
    <TestimonialsDefault />
    <FaqDefault />
    <FooterDefault />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import HeaderDefault from '~/components/nuxtTempMail/header/HeaderDefault.vue';
import FooterDefault from '~/components/nuxtTempMail/footer/FooterDefault.vue';
import TempMailGenerator from '~/components/nuxtTempMail/tempmail/TempMailGenerator.vue';
import FeaturesDefault from '~/components/nuxtTempMail/features/FeaturesDefault.vue';
import TestimonialsDefault from '~/components/nuxtTempMail/testimonials/TestimonialsDefault.vue';
import FaqDefault from '~/components/nuxtTempMail/faq/FaqDefault.vue';

const { t } = useI18n();
const config = useRuntimeConfig();

const appName = computed(() => config.public.appName || 'FreeTempMail');
// const title = computed(() => t('tempmail.title') || `Free Temporary Email - ${appName.value}`);
const title = computed(() =>  `${appName.value}` || t('tempmail.title'));

const description = computed(() => t('tempmail.description') || 'Get temporary email addresses to protect your privacy. No registration required, instant generation, automatic email reception.');

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'your og image url',
  ogUrl: config.public.baseUrl || 'https://mail.aitre.cc',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterSite: config.public.baseUrl || 'https://mail.aitre.cc',
  twitterImage: 'your og image url',
});

useHead({
  link: [
    { rel: 'canonical', href: config.public.baseUrl || 'https://mail.aitre.cc' }
  ],
  title: title.value,
  meta: [
    {
      name: 'description',
      content: description.value
    },
    {
      name: 'keywords',
      content: 'temporary email, temp mail, disposable email, privacy protection, email generator, temporary inbox'
    }
  ]
});

</script>

<style scoped>
</style>