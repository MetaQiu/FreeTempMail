export default defineNuxtConfig({
  app:{
    head:{
      title: process.env.NUXT_PUBLIC_APP_NAME || 'FreeTempMail',
      meta:[
        { 
          name: 'google-site-verification', 
          content: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE  // Google Search Console verification code  
        }
      ]
    }
  },
  ssr: true,
  compatibilityDate: '2024-11-01',  
  devtools: { enabled: false },

  //指定全局css
  css:['~/assets/css/tailwind.css','~/assets/css/fonts.css'],

  //引入tailwindcss
  modules:[
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],
  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en-US', 'zh-CN','JP'],
    defaultLocale: 'en-US',
    vueI18n: '@@/i18n/config.ts',
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  sitemap: {
    defaults: {
      changefreq: 'daily',
      priority: 0.8
    }
  },
  //运行时全局变量
  runtimeConfig: {
    //此处定义的属性只能在服务端获取到
    // Server
    name: 'jackson',
    environment: process.env.NODE_ENV || 'development',
    //public中定义的属性既可以在服务端，也可以在客户端获取到
    public: {
      env: process.env.NUXT_PUBLIC_ENV || 'development',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      domainUrl: process.env.NUXT_PUBLIC_DOMAIN_URL,
      availableDomains: process.env.NUXT_PUBLIC_AVAILABLE_DOMAINS,
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      isServer: true,
    },
    // The private keys which are only available on the server-side
  },
  devServer: {
    port: Number(process.env.PORT) || 3000,
    host: '0.0.0.0' // 允许所有 IP 访问
  },
  vite: {
    server: {
      allowedHosts: ['mail.aitre.cc'] // 允许指定域名
    }
  }
})