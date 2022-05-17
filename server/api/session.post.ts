import { setCookie } from 'h3'
import cookieOptions from '~/config/cookie'

export default defineEventHandler(async(event) => {
  const body = await useBody(event)

  if (body.token) {
    setCookie(event, 'firebase-token', body.token, {
      domain: cookieOptions.domain,
      maxAge: cookieOptions.lifetime ?? 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite as boolean | 'lax' | 'strict' | 'none',
    })
    return 'auth cookie set'
  }

  setCookie(event, 'firebase-token', '', {
    maxAge: -1,
    path: cookieOptions.path,
  })
  return 'auth cookie cleared'
})
