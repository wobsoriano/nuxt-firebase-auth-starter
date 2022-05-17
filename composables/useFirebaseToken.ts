import { useCookie, useRuntimeConfig } from '#imports'

export default function() {
  const cookieOptions = useRuntimeConfig().public.firebaseAuthCookie
  return useCookie(`${cookieOptions.name}-token`)
}
