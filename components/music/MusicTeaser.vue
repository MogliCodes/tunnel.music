<template>
  <article class="rounded-md overflow-hidden">
    <figure class="relative">
      <div class="absolute pointer-events-none top-2 right-2 bottom-2 left-2 z-10">
        <div class="flex gap-2  flex-wrap">
          <div v-for="(genre, index) in genres" :key="`genre-${index}`" class="bg-gray-90 text-gray-20 text-xs p-2 rounded-md line-clamp-1 bottom-0">{{ genre }}</div>
        </div>
      </div>
      <div class="aspect-square w-full bg-gray-100 relative">
        <HeartIcon class="cursor-pointer w-8 h-8 fill-text right-2 top-2 absolute" v-if="isLiked" />
        <img v-if="props?.navigation?.cover" class="w-full brightness-50 opacity-50 hover:opacity-100 hover:brightness-100 transition duration-500" :src="props?.navigation?.cover" alt="" />
      </div>
    </figure>
    <figcaption class="p-4 bg-gray-90 line-clamp-1">
      <h2 class="mt-2 text-gray-20 truncate">{{ props.title }}</h2>
    </figcaption>
  </article>
</template>

<script setup lang="ts">
import HeartIcon from "assets/icons/HeartIcon.vue";

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
  isLiked?: boolean
}

const props = defineProps<Props>()

</script>
