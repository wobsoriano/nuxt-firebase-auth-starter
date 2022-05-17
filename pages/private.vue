<script setup lang="ts">
const { $firebaseAuth } = useNuxtApp()
const { data } = await useLazyAsyncData<{ message: string }>('protected', () =>
  $fetch('/api/protected', {
    headers: useRequestHeaders(['cookie'])
  }),
)
const router = useRouter()
const user = useUser()

const signOut = async() => {
  await $firebaseAuth.signOut()
  router.push('/')
}
</script>

<template>
  <div v-if="user">
    <div>Welcome, {{ user.email }}</div>
    <div>{{ data ? data.message : 'Fetching...' }}</div>
    <button @click="signOut">
      Sign out
    </button>
  </div>
</template>
