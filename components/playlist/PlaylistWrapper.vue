<template>
  <div v-if="playlistData" class="bg-gray-90 rounded-md overflow-hidden">
    <PlaylistTrack />
    <PlaylistControls />
    <PlaylistTracklist :playlist-items="playlistData" />
  </div>
</template>

<script setup lang="ts">
import type { PlaylistComment, YoutubeItem } from "~/types.d.ts";
import { useAudioplayer } from '~/composables/useAudioPlayer'

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
const {
  currentAudioId,
  currentAudioIndex,
  setPlaylistData,
  setCurrentAudioIndex,
  setCurrentAudioId,
  setCurrentAudioIdByIndex,
  setIsPlaying
} = useAudioplayer()
const playlistData: Ref<Array<YoutubeItem | PlaylistComment> | null> = ref(null)

const { data, pending }: ApiResponse = await useFetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${props.playlistId}&key=${API_KEY}`,
)

watch(pending, () => {
  if (!pending.value) {
    if(props.comments) {
      playlistData.value = mergeData(data?.value?.items, props.comments)
      setCurrentAudioId(playlistData.value[0].snippet.resourceId.videoId)
    } else {
      playlistData.value = data?.value?.items
    }
    setPlaylistData(playlistData.value)
    initPlaylist()
  }
}, { immediate: true })

watch(props.comments, () => {
  if (props.comments) {
    playlistData.value = mergeData(data?.value?.items, props.comments)
    setPlaylistData(playlistData.value)
    initPlaylist()
  }
})

function initPlaylist() {
  setCurrentAudioIndex(0)
  setCurrentAudioIdByIndex(0)
  if (!currentAudioId.value && !currentAudioIndex.value) {
    setIsPlaying(false)
  }
}

function mergeData(dataYoutube: YoutubeItem[], dataComments: PlaylistComment[]) {
  const youtubeDataEnriched = dataYoutube?.map(item => ({ ...item, type: "PlaylistYoutubeTrack" }));
  if (youtubeDataEnriched && typeof youtubeDataEnriched[Symbol.iterator] === 'function') {
    const mergedData: Array<YoutubeItem | PlaylistComment> = [...youtubeDataEnriched];

    dataComments.forEach(comment => {
      const enrichedComment = { ...comment, type: "PlaylistComment" };
      mergedData.splice(enrichedComment.index, 0, enrichedComment);
    });

    return mergedData;
  }

  return [];
}
</script>