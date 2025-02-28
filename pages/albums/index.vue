<template>
  <main>
    <BaseContainer>
      <div class="flex justify-between">
        <BaseHeadline type="h1" element="h1" class="mb-8" text="Albums" />
      </div>
      <div class="mb-8 hidden md:block">
        <MusicGenres @select-genre="selectGenre($event)" />
      </div>
      <div>
        <ul class="grid gap-8" :class="columnClass">
          <li v-for="item in filteredAlbums" :key="item._path">
            <NuxtLink :to="item._path">
              <MusicTeaser 
                :title="item.title || ''" 
                :type="item.type || 'album'" 
                :genres="item.genres" 
                :youtubeId="item.youtubeId" 
                :spotifyId="item.spotifyId" 
                :release="item.release"
                :navigation="item.navigation" 
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </BaseContainer>
  </main>
</template>

<script setup lang="ts">
import MusicGenres from "~/components/music/MusicGenres.vue";

// Fetch all albums at build time
const { data: allAlbums } = await useAsyncData('albums', () => 
  queryContent('albums').find()
)

// Client-side state for filtering
const selectedGenre = ref('*')

// Computed property for filtered albums
const filteredAlbums = computed(() => {
  if (!allAlbums.value) return []
  
  if (selectedGenre.value === '*') {
    return allAlbums.value
  }
  
  return allAlbums.value.filter(album => 
    album.genres && Array.isArray(album.genres) && 
    album.genres.includes(selectedGenre.value)
  )
})

// Handle route changes for direct links with genre parameter
const route = useRoute()

onMounted(() => {
  // Check if there's a genre in the URL on initial load
  if (route.query.genre) {
    selectedGenre.value = route.query.genre as string
  }
})

// Watch for route changes
watch(() => route.query.genre, (newGenre) => {
  if (newGenre) {
    selectedGenre.value = newGenre as string
  } else {
    selectedGenre.value = '*'
  }
}, { immediate: true })

// Handle genre selection from component
function selectGenre(genre: string) {
  selectedGenre.value = genre
  
  // Update URL without reloading the page
  const newQuery = {...route.query}
  
  if (genre === '*') {
    delete newQuery.genre
  } else {
    newQuery.genre = genre
  }
  
  navigateTo({
    query: newQuery
  }, { replace: true })
}

const columnCount = ref(4)

const columnClass = computed<string>(() => {
  return columnCount.value ? `grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-${columnCount.value}` : 'grid-cols-2 lg:grid-cols-3'
})
</script>
