// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js' }]
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

  nitro: {
    prerender: {
      // https://github.com/nuxt-themes/docus/issues/944#issuecomment-1634580369
      concurrency: 1,
      // https://github.com/nuxt-themes/docus/issues/944#issuecomment-1634798275
      failOnError: false,
      crawlLinks: true,
      routes: ['/playlists', '/albums']
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    "@nuxtjs/supabase",
    "@nuxt/icon",
    "@nuxtjs/plausible",
    "@nuxt/scripts"
  ],

  content: {
    documentDriven: true,
    experimental: {
      // @ts-ignore
      clientDb: true,
      stripQueryParameters: false
    },
    api: {
      baseURL: '/api/_content'
    }
  },

  supabase: {
    redirect: false,
  },

  compatibilityDate: "2025-02-17",

  scripts: {
    youtube: true
  }
})