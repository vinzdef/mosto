
export default {
  mode: 'universal',

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'msapplication-TitleColor', content: '#000' },
      { name: 'theme-color', content: '#000' },
      { property: 'og:title', content: process.env.npm_package_name || '' },
      { property: 'og:description', content: process.env.npm_package_description || '' },
      { property: 'og:url', content: '' },
      { property: 'og:image', content: '' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: process.env.npm_package_name || '' },
      { name: 'twitter:description', content: process.env.npm_package_description || '' },
      { name: 'twitter:image', content: '' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]

  },

  router: {
    prefetchLinks: false
  },

  loading: { color: '#fff' },

  css: [ '@/scss/style.scss' ],

  plugins: [
    { src: '~/plugins/event-hub.js', mode: 'client' }
  ],

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa'
  ],

  styleResources: {
    scss: ['./scss/shared.scss']
  },

  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
