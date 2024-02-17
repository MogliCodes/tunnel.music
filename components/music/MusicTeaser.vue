<template>
  <article class="rounded-md overflow-hidden">
    <figure class="relative">
      <div class="absolute pointer-events-none top-2 right-2 bottom-2 left-2 z-10">
        <div class="flex gap-2  flex-wrap">
          <div v-for="(genre, index) in genresSplitted" :key="`genre-${index}`" class="bg-gray-90 text-gray-20 text-xs p-2 rounded-md line-clamp-1 bottom-0">{{ genre }}</div>
        </div>
      </div>
      <img class="aspect-square w-full grayscale brightness-50 hover:brightness-100 hover:grayscale-0 transition duration-1000" :src="props?.cover" alt="" />
    </figure>
    <figcaption class="p-4 bg-gray-90 line-clamp-1">
      <h2 class="mt-2 text-gray-20 truncate">{{ props.title }}</h2>
    </figcaption>
  </article>
</template>

<script setup lang="ts">
type Props = {
  title: string
  type: 'album' | 'playlist'
  genres: string
  youtubeId?: string
  spotifyId?: string
  release?: string
  cover?: string
}

const props = defineProps<Props>()
const genresSplitted = props?.genres?.split(', ')
</script>
