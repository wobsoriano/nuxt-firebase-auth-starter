import type { IncomingMessage, ServerResponse } from 'http'
import { useCookie } from 'h3'
import { getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export default  defineEventHandler(async(event) => {
  const { req, res } = event
  if (req.url.includes('/api/')) {
    const token = useCookie(req, 'token')
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
