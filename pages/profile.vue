<template>
  <main>
    <section>
      <BaseContainer>
        <div class="flex justify-between">
          <BaseHeadline type="h1" element="h1" class="mb-8" text="Profile" />
        </div>
        <pre>
            {{ user }}
          </pre>
      </BaseContainer>
    </section>
    <section>
      <BaseContainer>
        <div class="flex justify-between">
          <BaseHeadline type="h2" element="h2" class="mb-8" text = "Likes" />
        </div>
        <pre>{{ likes }}</pre>
      </BaseContainer>
    </section>
  </main>
</template>
<script setup lang="ts">

const user = useSupabaseUser()
const client = useSupabaseClient()

const { data: likes } = await useAsyncData('likes', async () => {
  if(!user.value) return
  const { data } = await client.from('Likes').select('*').eq('user_id', user.value.id)
  return data
})

</script>