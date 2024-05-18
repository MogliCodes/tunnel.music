<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const { data: Likes } = await useAsyncData('restaurant', async () => {
  const { data } = await client.from('Likes').select('name, user_id').eq('user_id', user.value.id)

  return data
})

const userLikes = useState('userLikes', () => Likes?.value?.map((like) => like.name) || [])


</script>

<style>
p {
  margin-bottom: 1rem;
}
</style>