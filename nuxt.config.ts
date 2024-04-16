// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: true,
  app: {
    head: {
      script: [{src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js'}]
    }
  },
  runtimeConfig: {
    public: {
      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
      },
      youtube: {
        apiKey: process.env.YOUTUBE_API_KEY,
      },
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@pinia/nuxt'],
  content: {
    documentDriven: true,
    experimental: {
      clientDb: true
    }
  },
  // nitro: {
  //   prerender: {
  //     // https://github.com/nuxt-themes/docus/issues/944#issuecomment-1634580369
  //     concurrency: 1,
  //     // https://github.com/nuxt-themes/docus/issues/944#issuecomment-1634798275
  //     failOnError: false,
  //   },
  // },
})
