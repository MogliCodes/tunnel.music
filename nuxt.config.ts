// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
  content: {
    documentDriven: true,
  },
})
