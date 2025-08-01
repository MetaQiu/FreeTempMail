<template>
  <div class="bg-black min-h-screen py-16">
    <HeaderDefault />

    <Card class="max-w-4xl mx-auto my-8 shadow-lg bg-gray-800 border-gray-700">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold tracking-tight text-yellow-400">{{ $t('license.title') }}</CardTitle>
        <CardDescription class="text-gray-400">{{ $t('license.subtitle') }}</CardDescription>
        <p class="text-sm text-gray-500 pt-1">{{ $t('license.date') }}</p>
      </CardHeader>
      <CardContent>
        <div class="prose prose-lg max-w-none prose-invert text-gray-200 prose-headings:text-white prose-strong:text-white prose-a:text-yellow-400 hover:prose-a:text-yellow-300">
          <h2 class="mt-8 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('license.section1.heading') }}</h2>
          <h3 class="!mt-6">{{ $t('license.section1.subheading') }}</h3>
          <p>{{ $t('license.section1.p1') }}</p>
          <p>{{ $t('license.section1.p2') }}</p>

          <h3 class="!mt-6">{{ $t('license.section2.heading') }}</h3>
          <p>{{ $t('license.section2.item1') }}</p>
          <p>{{ $t('license.section2.item2') }}</p>
          <p>{{ $t('license.section2.item3') }}</p>
          <p>{{ $t('license.section2.item4') }}</p>

          <h3 class="!mt-6">{{ $t('license.section3.heading') }}</h3>
          <p>{{ $t('license.section3.item1') }}</p>
          <p>{{ $t('license.section3.item2') }}</p>
          <p>{{ $t('license.section3.item3') }}</p>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('license.section4.heading') }}</h2>
          <h3 class="!mt-6">{{ $t('license.section4.subheading1') }}</h3>
          <p>{{ $t('license.section4.item1a') }}</p>
          <p>{{ $t('license.section4.item1b') }}</p>
          <h3 class="!mt-6">{{ $t('license.section4.subheading2') }}</h3>
          <p>{{ $t('license.section4.item2a') }}</p>
          <p>{{ $t('license.section4.item2b') }}</p>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('license.section5.heading') }}</h2>
          <p>{{ $t('license.section5.p1') }}</p>
          <p>{{ $t('license.section5.p2') }}</p>
          <p>{{ $t('license.section5.p3') }}</p>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('license.section6.heading') }}</h2>
          <p><a href="https://github.com/MetaQiu" target="_blank">{{ $t('license.section6.p1') }}</a></p>
        </div>
      </CardContent>
    </Card>

    <FooterDefault />
  </div>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import HeaderDefault from '~/components/nuxtTempMail/header/HeaderDefault.vue';
import FooterDefault from '~/components/nuxtTempMail/footer/FooterDefault.vue';

const config = useRuntimeConfig();

useHead({
  link: [
    { rel: 'canonical', href: config.public.baseUrl || 'https://mail.aitre.cc' }
  ]
})

const metaTitle = 'License | Free Temporary Email | FreeTempMail'
const metaDescription = 'FreeTempMail is a free temporary email service that allows you to create disposable email addresses to protect your privacy. No registration required, instant generation, automatic email reception.'

useHead({
  title: metaTitle,
  meta: [
    {
      name: 'description',
      content: 'FreeTempMail is a free temporary email service that allows you to create disposable email addresses to protect your privacy. No registration required, instant generation, automatic email reception.'
    },
    {
      name: 'keywords',
      content: 'FreeTempMail, Free Temporary Email, Temporary Email, Temporary Email Service, Temporary Email Address, Temporary Email Generator, Temporary Email Service, Temporary Email Address, Temporary Email Generator'
      
    }
  ]
})



useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: 'your og image url', // Make sure this image exists in your public folder
  ogUrl: config.public.baseUrl || 'https://mail.aitre.cc',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterSite: config.public.baseUrl || 'https://mail.aitre.cc',
  twitterImage: 'your og image urls'
});
</script>

<style>
body {
  padding-top: 64px; /* Match navbar height */
  background-color: #000; /* Ensure body default matches if needed */
}

/* prose-invert will handle dark mode link colors, but explicit is fine for override */
.prose.prose-invert {
  color: theme('colors.gray.300');
}

.prose.prose-invert a {
  /* color: theme('colors.yellow.400'); */ /* Already set in template */
}
.prose.prose-invert a:hover {
  /* color: theme('colors.yellow.300'); */ /* Already set in template */
}

.prose h3 {
 /* prose-invert should handle this, !important not usually needed with prose-invert */
}

.prose .text-muted-foreground {
  color: theme('colors.gray.400') !important; 
}
</style>