<template>
  <div class="flex flex-col gap-12">
    <div v-if="pending">
      <h1>DATA LOADING</h1>
    </div>
    <div v-else>
      <div class="w-1/2">
        <YoutubePlayer :data="data" />
      </div>
      <div class="w-1/2">
        <YoutubePlaylistTrack
          v-for="(item, index) in data?.items"
          :id="item?.snippet.resourceId.videoId"
          :key="item?.id"
          :is-active="index === audioPlayerStore?.currentAudioIndex"
          :index="index"
          :title="item?.snippet.title"
          :thumbnail="item?.snippet.thumbnails.default.url"
          @video-id="saveVideoId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YoutubePlayer from '~/components/wrapper/YoutubePlayer'
import YoutubePlaylistTrack from '~/components/wrapper/YoutubePlaylistTrack'
import { useAudioplayerStore } from '~/store/audioplayer'
const audioPlayerStore = useAudioplayerStore()

type Props = {
  playlistId: string
}

const props = defineProps<Props>()

const config = useRuntimeConfig()
const API_KEY = config.public.youtube.apiKey
const { data, pending } = await useFetch(
  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${props.playlistId}&key=${API_KEY}`,
)

const videoId = ref()
const currentVideoIndex = ref(0)
audioPlayerStore.setCurrentAudioIndex(currentVideoIndex.value)

function saveVideoId(payload: { id: string; index: number }) {
  videoId.value = payload.id
  currentVideoIndex.value = payload.index
  audioPlayerStore.setCurrentAudioIndex(payload.index)
}
</script>
