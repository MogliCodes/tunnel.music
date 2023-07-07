<template>
  <div>
    <div v-if="pending">
      <h1>DATA LOADING</h1>
    </div>
    <div v-else class="w-full">
      <YoutubePlayer
        v-if="audioStore.currentAudioId"
        :data="data"
        :audio-id="audioStore.currentAudioId"
      />
      <div v-else class="h-[360px] w-full bg-pink-500"></div>
      <YoutubePlaylistControls @toggle-play="togglePlay" />
      <YoutubePlaylist
        :youtube-tracks="data?.items"
        :comments="props.comments"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import YoutubePlayer from '~/components/wrapper/YoutubePlayer'
import YoutubePlaylist from '~/components/wrapper/YoutubePlaylist.vue'
import { useAudioplayerStore } from '~/store/audioplayer'
import YoutubePlaylistControls from '~/components/wrapper/YoutubePlaylistControls.vue'
const audioStore = useAudioplayerStore()

// let youtubePlayer
//
// onMounted(() => {
//   youtubePlayer = inject('youtubePlayer')
// })
type Props = {
  playlistId: string
  comments: []
}

type YoutubeItem = {
  snippet: {
    resourceId: {
      videoId: string
    }
  }
}
type ApiResponse = {
  data: Ref | null
  pending: Ref<boolean>
}
type MergedDataItem = YoutubeItem | object
type MergedData = MergedDataItem[]

const props = defineProps<Props>()
const config = useRuntimeConfig()
const API_KEY = config.public.youtube.apiKey
const mergedData: Ref<MergedData | null> = ref(null)

const { data, pending }: ApiResponse = await useFetch(
  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${props.playlistId}&key=${API_KEY}`,
)

watch(pending, () => {
  if (!pending.value) {
    mergeData(data?.value?.items, props.comments)
    audioStore.setPlaylistData(mergedData.value)
    initPlaylist()
  }
})

function initPlaylist() {
  if (!audioStore.currentAudioId && !audioStore.currentAudioIndex) {
    console.log('INIT')
    audioStore.setCurrentAudioIndex(0)
    audioStore.setCurrentAudioIdByIndex(0)
    console.log('audiostore', audioStore.currentAudioId)
  }
}

// function togglePlay() {
//   console.log('TEST TOGGLE', youtubePlayer)
//   youtubePlayer.playVideo()
// }

function insertAtIndex(arr, items) {
  for (const item of items) {
    if (
      item.hasOwnProperty('index') &&
      item.index >= 0 &&
      item.index < arr.length
    ) {
      arr.splice(item.index, 0, item)
    } else {
      arr.push(item)
    }
  }

  return arr
}

function mergeData(dataYoutube: YoutubeItem[], dataComments: any) {
  if (!dataYoutube) return
  mergedData.value = [...dataYoutube]
  insertAtIndex(mergedData.value, dataComments)
}
</script>
