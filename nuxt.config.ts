// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [(_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/sanity',
    '@stefanobartoletti/nuxt-social-share'
  ],
  sanity: {
    projectId: 'bkw931fv'
  },
  socialShare: {
    baseUrl: 'https://www.kanoee.me' // required!
    // other optional module options
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    optimizeDeps: {
      include: ["@sanity/visual-editing"],
    },
  },
})