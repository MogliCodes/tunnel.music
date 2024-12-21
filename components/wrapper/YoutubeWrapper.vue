<template>
  <div>
    <div v-if="pending">
      <h1>DATA LOADING</h1>
    </div>
    <div v-else class="w-full">
      <YoutubePlayer
        v-if="currentAudioId.value"
        :data="data"
        :audio-id="currentAudioId.value"
      />
      <div v-else class="h-[360px] w-full bg-pink-500"></div>
      <YoutubePlaylistControls />
      <YoutubePlaylist
        :youtube-tracks="data?.items"
        :comments="props.comments"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import YoutubePlayer from '~/components/wrapper/YoutubePlayer'
import YoutubePlaylist from '~/components/wrapper/YoutubePlaylist.vue'
import { useAudioplayer } from '~/composables/useAudioPlayer'
import YoutubePlaylistControls from '~/components/wrapper/YoutubePlaylistControls.vue'

const {
  currentAudioId,
  currentAudioIndex,
  setPlaylistData,
  setCurrentAudioIndex,
  setCurrentAudioIdByIndex
} = useAudioplayer()

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
    if(props.comments) {
      mergeData(data?.value?.items, props.comments)
    } else {
      mergedData.value = data?.value?.items
    }
    setPlaylistData(mergedData.value)
    initPlaylist()
  }
})

function initPlaylist() {
  if (!currentAudioId.value && !currentAudioIndex.value) {
    console.log('INIT')
    setCurrentAudioIndex(0)
    setCurrentAudioIdByIndex(0)
    console.log('currentAudioId', currentAudioId.value)
  }
}

function insertAtIndex(arr: MergedDataItem[], items: MergedDataItem[]) {
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