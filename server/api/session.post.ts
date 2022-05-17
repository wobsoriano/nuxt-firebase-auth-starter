import { setCookie } from 'h3'

export default defineEventHandler(async(event) => {
  const body = await useBody(event)
  const cookieOptions = useRuntimeConfig().public.firebaseAuthCookie
  console.log(cookieOptions)
  if (body.token) {
    setCookie(event, `${cookieOptions.name}-token`, body.token, {
      domain: cookieOptions.domain,
      maxAge: cookieOptions.lifetime ?? 0,
      path: cookieOptions.path,
      sameSite: cookieOptions.sameSite as boolean | 'lax' | 'strict' | 'none',
    })
    return 'auth cookie set'
  }

  setCookie(event, `${cookieOptions.name}-token`, '', {
    maxAge: -1,
    path: cookieOptions.path,
  })
  return 'auth cookie cleared'
})
