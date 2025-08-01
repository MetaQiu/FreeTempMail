<template>
  <div class="bg-black min-h-screen py-16">
    <HeaderDefault />

    <Card class="max-w-4xl mx-auto my-8 shadow-lg bg-gray-800 border-gray-700">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold tracking-tight text-yellow-400">{{ $t('privacy.title') }}</CardTitle>
        <CardDescription class="text-gray-400">{{ $t('privacy.subtitle') }}</CardDescription>
        <p class="text-sm text-gray-500 pt-1">{{ $t('privacy.date') }}</p>
      </CardHeader>
      <CardContent>
        <div class="prose prose-lg max-w-none prose-invert text-gray-200 prose-headings:text-white prose-strong:text-white prose-a:text-yellow-400 hover:prose-a:text-yellow-300">
          <h2 class="mt-8 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('privacy.introduction.heading') }}</h2>
          <p>{{ $t('privacy.introduction.p1') }}</p>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('privacy.infoCollect.heading') }}</h2>
          <p>{{ $t('privacy.infoCollect.p1') }}</p>
          <ul class="list-disc pl-6">
            <li><strong>{{ $t('privacy.infoCollect.item1.title') }}</strong>: {{ $t('privacy.infoCollect.item1.content') }}</li>
            <li><strong>{{ $t('privacy.infoCollect.item2.title') }}</strong>: {{ $t('privacy.infoCollect.item2.content') }}</li>
            <li><strong>{{ $t('privacy.infoCollect.item3.title') }}</strong>: {{ $t('privacy.infoCollect.item3.content') }}</li>
          </ul>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('privacy.infoUse.heading') }}</h2>
          <p>{{ $t('privacy.infoUse.p1') }}</p>
          <ul class="list-disc pl-6">
            <li>{{ $t('privacy.infoUse.item1') }}</li>
            <li>{{ $t('privacy.infoUse.item2') }}</li>
            <li>{{ $t('privacy.infoUse.item3') }}</li>
            <li>{{ $t('privacy.infoUse.item4') }}</li>
            <li>{{ $t('privacy.infoUse.item5') }}</li>
            <li>{{ $t('privacy.infoUse.item6') }}</li>
          </ul>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('privacy.dataSecurity.heading') }}</h2>
          <p>{{ $t('privacy.dataSecurity.p1') }}</p>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('privacy.thirdParty.heading') }}</h2>
          <p>{{ $t('privacy.thirdParty.p1') }}</p>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('privacy.changes.heading') }}</h2>
          <p>{{ $t('privacy.changes.p1') }}</p>

          <h2 class="mt-12 border-b pb-2 border-gray-700 text-yellow-400">{{ $t('privacy.contact.heading') }}</h2>
          <p><a href="https://github.com/MetaQiu" target="_blank">{{ $t('privacy.contact.p1') }}</a></p>
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

const metaTitle = 'Privacy Policy | Free Temporary Email | FreeTempMail'
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
  twitterImage: 'your og image url'
});
</script>

<style>
body {
  padding-top: 64px; /* Match navbar height */
  background-color: #000; /* Ensure body default matches if needed */
}

.prose.prose-invert a {
 /* color: theme('colors.yellow.400'); */ /* Already set in template */
}
.prose.prose-invert a:hover {
  /* color: theme('colors.yellow.300'); */ /* Already set in template */
}

.prose h2 {
  margin-top: theme('margin.12') !important;
  border-bottom-width: 1px;
  /* border-color handled by prose-invert or explicitly */
  padding-bottom: theme('padding.2');
}

.prose h2:first-of-type {
   margin-top: theme('margin.8') !important;
}


.prose h3 {
 /* color: theme('colors.gray.700') !important; */ /* Handled by prose-invert */
 margin-top: theme('margin.6') !important;
}

.prose .text-muted-foreground {
  color: theme('colors.gray.400') !important; 
}

.prose > :first-child {
  margin-top: 0 !important;
}
.prose > :last-child {
  margin-bottom: 0 !important;
}
</style>