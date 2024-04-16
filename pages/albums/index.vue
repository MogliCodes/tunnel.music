<template>
  <main>
    <BaseContainer>
      <div class="flex justify-between">
        <BaseHeadline type="h1" element="h1" class="mb-8" text="Albums" />
      </div>
      <div class="mb-8">
        <MusicGenres @select-genre="selectGenre($event)" />
      </div>
      <ContentNavigation v-slot="{ navigation }" :query="query">
        <div v-if="navigation">
          <ul class="grid gap-8" :class="columnClass">
            <li v-for="item in albums" :key="item._path">
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
import MusicGenres from "~/components/music/MusicGenres.vue";
const query: Ref<QueryBuilderParams> = ref({
  where: [{ type: 'album',  }],
  limit: 20,
  sort: [{ date: -1 }],
})

const genreFilter = ref('Ambient')
const albums: Ref = ref([])

albums.value = await queryContent('albums').find()|| []


watch(genreFilter, async (genre) => {
  await getAlbumsByGenre(genre)
})

const route = useRoute();
watch(() => route.fullPath, async () => {
  console.log('route changed', route)
  await getAlbumsByGenre(route.query.genre as string)
}, { immediate: false });

function selectGenre(genre: string) {
  genreFilter.value = genre
}

async function getAlbumsByGenre(genre: string) {
  albums.value =  await queryContent('albums').where({ 'genres': { $contains: genre } }).find() || []
  // add genre as url param
  if(!window) return
  const url = new URL(window?.location.href)
  url.searchParams.set('genre', genre)
  window?.history.pushState({}, '', url)
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
