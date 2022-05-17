import { getAuth } from 'firebase-admin/auth'
import app from '~/config/firebase-admin'
import formatUser from '~/helpers/format-user'

// Acts like nuxtServerInit.
// Checks if token is valid on first load.

export default defineNuxtPlugin(async() => {
  const token = useFirebaseToken()
  const firebaseUser = useUser()
  const auth = getAuth(app)
  
  if (!token.value) return

  try {
    const result = await auth.verifyIdToken(token.value)
    firebaseUser.value = formatUser(result)
  }
  catch (e) {
    // Not authenticated or invalid token
  }
})
