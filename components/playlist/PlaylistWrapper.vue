<template>
  <div>
    <PlaylistTrack />
    <PlaylistControls />
    <PlaylistTracklist :playlist-items="playlistData" />
  </div>
</template>

<script setup lang="ts">
import type { PlaylistComment, YoutubeItem } from "~/types.d.ts";
import {Ref} from "vue";
import { useAudioplayerStore } from '~/store/audioplayer'

type Props = {
  playlistId: string
  comments: []
}

type ApiResponse = {
  data: Ref | null
  pending: Ref<boolean>
}


const props = defineProps<Props>()
const config = useRuntimeConfig()
const API_KEY = config.public.youtube.apiKey
const audioStore = useAudioplayerStore()
const playlistData: Ref<Array<YoutubeItem | PlaylistComment> | null> = ref(null)

const { data, pending }: ApiResponse = await useFetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${props.playlistId}&key=${API_KEY}`,
)

watch(pending, () => {
  if (!pending.value) {
    if(props.comments) {
      playlistData.value = mergeData(data?.value?.items, props.comments)
    } else {
      playlistData.value = data?.value?.items
    }
    audioStore.setPlaylistData(playlistData.value)
    initPlaylist()
  }
})

function initPlaylist() {
  if (!audioStore.currentAudioId && !audioStore.currentAudioIndex) {
    audioStore.setCurrentAudioIndex(0)
    audioStore.setCurrentAudioIdByIndex(0)
  }
}

function mergeData(dataYoutube: YoutubeItem[], dataComments: PlaylistComment[]) {
  const youtubeDataEnriched = dataYoutube.map(item => ({...item, type: "PlaylistYoutubeTrack"}))
  const mergedData: Array<YoutubeItem | PlaylistComment> = [...youtubeDataEnriched]
  dataComments.map(comment => ({...comment, type: "PlaylistComment"})).forEach(comment => {
    mergedData.splice(comment.index, 0, comment);
  })
  return mergedData
}

</script>
