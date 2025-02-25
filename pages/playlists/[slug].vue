<template>
  <main>
    <BaseContainer>
      <div class="flex-col items-center flex gap-4">
        <div class="w-full lg:w-3/4">
          <div class="content w-full">
            <div class="flex justify-between">
              <div class="flex gap-1">
                <NuxtLink :to="`/genres/${slugifyGenre(genre)}`"
                  class="bg-gray-90 text-gray-20 text-xs p-2 rounded-md line-clamp-1 bottom-0"
                  v-for="genre in page.genres">{{ genre }}
                </NuxtLink>
              </div>
            </div>
            <ContentDoc />
          </div>
          <client-only>
            <YoutubeWrapper v-if="page?.playlistId" :comments="page?.comments || []" :playlist-id="page?.playlistId" />
            <p v-else class="text-white">No playlist ID found</p>
          </client-only>
        </div>
        <NuxtLink class="rounded-md mr-2 inline-block dark:bg-gray-90 text-gray-20 px-4 py-2 text-sm" to="/playlists">
          Back to playlists
        </NuxtLink>
      </div>
    </BaseContainer>
  </main>
</template>

<script setup lang="ts">
import { useAudioplayer } from '~/composables/useAudioPlayer'
import YoutubeWrapper from '~/components/wrapper/YoutubeWrapper.vue'

const {
  clearPlaylistData
} = useAudioplayer()

const { page } = useContent()
clearPlaylistData()

// Add debug logging
console.log('Page data:', page)

function slugifyGenre(genre: string) {
  return genre.toLowerCase().replace(/ /g, '-')
}
</script>

<style>
.content h1 {
  @apply font-display;
  @apply text-4xl;
  @apply mb-8;
  @apply mt-2;
}

.content h2 {
  @apply font-bold;
  @apply mt-4;
}

.content p {
  @apply text-gray-20;
}

.content p a {
  border-bottom: 2px solid white;
}

.content p a:hover {
  color: white;
}
</style>