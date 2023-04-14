<script setup>
import YoutubePlaylistTrack from "~/components/wrapper/YoutubePlaylistTrack.vue";

const props = defineProps({
  playlistId: String
})


const config = useRuntimeConfig()
const API_KEY = config.public.youtube.apiKey
const { data, pending } = await useFetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${props.playlistId}&key=${API_KEY}`)
const firstVideoId = ref()

const iframeSrc = computed(() => {
  return `//www.youtube.com/embed/${firstVideoId.value}`
})

function saveFirstVideoId(payload) {
  firstVideoId.value = payload
}



</script>

<template>

  <div class="flex gap-12">
    <div class="w-1/2">
      <iframe class="h-[200px] w-full" :src="iframeSrc" frameborder="0"></iframe>
    </div>
    <div v-if="!pending"  class="w-1/2">
      <YoutubePlaylistTrack v-for="(item, index) in data?.items" :id="item?.snippet.resourceId.videoId" :key="item?.id" :index="index" :title="item?.snippet.title" :thumbnail="item?.snippet.thumbnails.default.url" @video-id="saveFirstVideoId" />
    </div>
  </div>
</template>
