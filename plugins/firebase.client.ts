import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import formatUser from '~/helpers/format-user'

export default defineNuxtPlugin(async(nuxtApp) => {
  const firebaseUser = useUser()
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    databaseURL: config.firebaseDatabaseURL,
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  nuxtApp.hooks.hook('app:mounted', () => {
    // Listen to Supabase auth changes
    auth.onIdTokenChanged(async(user) => {
      if (user) {
        const token = await user.getIdToken()
        setServerSession(token)
        firebaseUser.value = formatUser(user)
      }
      else {
        setServerSession('')
        firebaseUser.value = null
      }
    })
  })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
    },
  }
})

function setServerSession(token: string) {
  return $fetch('/api/session', {
    method: 'POST',
    body: {
      token,
    },
  })
}
