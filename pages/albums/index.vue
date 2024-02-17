<template>
  <main>
    <BaseContainer>
      <div class="flex justify-between">
        <BaseHeadline type="h1" element="h1" class="mb-8" text="Albums" />
      </div>
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <div v-if="navigation">
          <ul class="grid gap-8" :class="columnClass">
            <li v-for="item in getAlbumInfo(navigation)" :key="item._path">
              <NuxtLink :to="item._path">
                <MusicTeaser v-bind="item" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </ContentNavigation>
    </BaseContainer>
  </main>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = {
  where: [{ type: 'album' }],
  limit: 20,
  sort: [{ date: -1 }],
}

type AlbumInfo = {
  title: string
  type: 'album' | 'playlist'
  genres: string
  youtubeId: string
  spotifyId: string
  release: string
}

function getAlbumInfo(navigation: any): AlbumInfo {
  return navigation?.[0].children
}

const columnCount = ref(4)

const columnClass = computed<string>(() => {
  return columnCount.value ? `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columnCount.value}` : 'grid-cols-2 lg:grid-cols-3'
})
</script>
