// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
})
