import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
      firebaseAuthCookie: {
        name: 'fb',
        lifetime: 60 * 60 * 8,
        domain: '',
        path: '/',
        sameSite: 'lax',
      }
    }
  },
  experimental: {
    viteNode: true
  },
})
