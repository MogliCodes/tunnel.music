<template>
  <main>
    <BaseContainer>
      <div class="flex justify-between">
        <BaseHeadline type="h1" element="h1" class="mb-8" text="Playlists" />
      </div>
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <ul class="grid gap-8" :class="columnClass">
          <li v-for="item in playlists" :key="item._path">
            <NuxtLink :to="item._path">
              <MusicTeaser v-bind="item" :is-liked="getUserLikes(item._path)" />
            </NuxtLink>
          </li>
        </ul>
      </ContentNavigation>
    </BaseContainer>
  </main>
</template>

<script setup lang="ts">
// ts-ignore
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = {
  where: [{ type: 'playlist' }],
  limit: 20,
  sort: [{ date: -1 }],
}

const { data: playlists } = await useAsyncData('home', () => queryContent('playlists').find()|| [], { lazy: true})

const columnCount = ref(3)

const columnClass = computed<string>(() => {
  return columnCount.value ? `grid-cols-1 md:grid-cols-${columnCount.value}` : 'grid-cols-1 md:grid-cols-3'
})


const userLikes: any = useState('userLikes')

function getUserLikes(path: string) {
  return userLikes?.value?.includes(path.split('/').pop())
}
</script>
