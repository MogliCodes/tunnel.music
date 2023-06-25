<template>
  <div>
    <div v-if="pending">
      <h1>DATA LOADING</h1>
    </div>
    <div v-else>
      <div class="w-1/2">
        <YoutubePlayer
          v-if="audioStore.currentAudioId"
          :data="data"
          :audio-id="audioStore.currentAudioId"
        />
        <YoutubePlaylist
          :youtube-tracks="data?.items"
          :comments="props.comments"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YoutubePlayer from '~/components/wrapper/YoutubePlayer'
import YoutubePlaylist from '~/components/wrapper/YoutubePlaylist.vue'
import { useAudioplayerStore } from '~/store/audioplayer'
const audioStore = useAudioplayerStore()

type Props = {
  playlistId: string
  comments: []
}

const props = defineProps<Props>()
const config = useRuntimeConfig()
const API_KEY = config.public.youtube.apiKey
const { data, pending } = await useFetch(
  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${props.playlistId}&key=${API_KEY}`,
)
</script>
