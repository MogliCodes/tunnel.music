<template>
  <div>
    you are now logged in as
    <div v-if="user" class="flex items-center gap-2">
      <span class="font-bold">{{ user.email }}</span>
      <span v-if="user.user_metadata.avatar_url" class="block w-8 h-8 rounded-full overflow-hidden">
        <img :src="user.user_metadata.avatar_url" alt="">
      </span>
    </div>
  <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

const client = useSupabaseClient()

const { data } = await useAsyncData('restaurant', async () => {
  const { data } = await client.from('Likes').select('name, user_id')

  return data
})
</script>