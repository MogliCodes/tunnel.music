<template>
  <div v-if="playlistData" class="bg-gray-90 rounded-md overflow-hidden">
    <PlaylistTrack />
    <PlaylistControls />
    <PlaylistTracklist :playlist-items="playlistData" />
  </div>
</template>

<script setup lang="ts">
import type { PlaylistComment, YoutubeItem } from "~/types.d.ts";
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
}, { immediate: true })

watch(props.comments, () => {
  if (props.comments) {
    playlistData.value = mergeData(data?.value?.items, props.comments)
    audioStore.setPlaylistData(playlistData.value)
    initPlaylist()
  }
})

function initPlaylist() {
  if (!audioStore.currentAudioId && !audioStore.currentAudioIndex) {
    audioStore.setCurrentAudioIndex(0)
    audioStore.setCurrentAudioIdByIndex(0)
    audioStore.setIsPlaying(false)
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

  // If youtubeDataEnriched is not iterable, you might want to handle it differently.
  // For now, returning an empty array as a default value.
  return [];
}


</script>
