import { getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { useCookie } from 'h3'

// This is just a sample middleware that protects
// a single route.

export default defineEventHandler(async(event) => {
  const { req, res } = event
  const cookieOptions = useRuntimeConfig().public.firebaseAuthCookie
  if (req.url === '/api/protected') {
    const token = useCookie(event, `${cookieOptions.name}-token`)
    const app = getApp()
    const auth = getAuth(app)
    try {
      await auth.verifyIdToken(token)
    }
    catch (e) {
      res.statusCode = 400
      res.end(
        'You must be signed in to view the protected content on this page.',
      )
    }
  }
})
