<template>
  <article class="rounded-md overflow-hidden">
    <figure class="relative">
      <div class="absolute pointer-events-none top-2 right-2 bottom-2 left-2 z-10">
        <div class="flex gap-2  flex-wrap">
          <div v-for="(genre, index) in genres" :key="`genre-${index}`" class="bg-gray-90 text-gray-20 text-xs p-2 rounded-md line-clamp-1 bottom-0">{{ genre }}</div>
        </div>
      </div>
      <div class="aspect-square w-full bg-gray-100">
        <img v-if="props?.navigation?.cover" class="brightness-50 hover:brightness-100 transition duration-1000" :src="props?.navigation?.cover" alt="" />
      </div>
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
  genres?: Array<string>
  youtubeId?: string
  spotifyId?: string
  release?: string
  cover?: string
  navigation?: {
    cover: string
  }
}

const props = defineProps<Props>()
</script>
