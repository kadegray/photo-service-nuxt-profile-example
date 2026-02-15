// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-30',


  /*
  * Default
  * SSR - Server-side Rendering
  */
  modules: [
    '@nuxtjs/tailwindcss',
    'photo-service-vue/nuxt'
  ],
  photoService: {
    baseUrl: process.env.PHOTO_SERVICE_BASE_URL || 'https://photoservice.ibexel.com',
    tenantId: process.env.PHOTO_SERVICE_TENANT_ID || '1',
  },

  /*
  * SPA - Single-page App
  * Add this in addition to the modules and photoService
  */
  // ssr: false,

  /*
  * SSG - Static Site Generation
  * Add this in addition to the modules and photoService
  */
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //   },
  // },


  build: {
    transpile: ['photo-service-vue'],
  },

  devtools: { enabled: true },
})
