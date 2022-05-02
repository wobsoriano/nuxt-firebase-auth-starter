interface User {
  uid: string
  email: string
}

export default function() {
  return useState<User>('user', () => null)
}
