<template>
  <div class="mt-4 w-full rounded-2xl bg-black bg-opacity-30 p-8">
    <p class="mb-0 pb-4 text-center text-2xl font-bold">Track list</p>
    <div v-for="(item, index) in audioPlayerStore.playlistData" :key="index">
      <div v-if="item.hasOwnProperty('kind')">
        <YoutubePlaylistTrack
          :id="item?.snippet?.resourceId.videoId"
          :key="item?.id"
          :is-active="index === audioPlayerStore?.currentAudioIndex"
          :index="index"
          :title="item?.snippet?.title"
          :thumbnail="item?.snippet?.thumbnails.default.url"
        />
      </div>
      <div v-else>
        <YoutubePlaylistCommentary
          :is-active="isActive(index)"
          :playlist-index="item?.index"
          :audio-file="item?.path"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YoutubePlaylistTrack from '~/components/wrapper/YoutubePlaylistTrack.vue'
import { useAudioplayerStore } from '~/store/audioplayer'
import YoutubePlaylistCommentary from '~/components/wrapper/YoutubePlaylistCommentary.vue'
const audioPlayerStore = useAudioplayerStore()

function isActive(index): boolean {
  return index === audioPlayerStore?.currentAudioIndex
}

// function saveVideoId(payload: { id: string; index: number }) {
//   audioPlayerStore.setCurrentAudioIndex(payload.index)
//   audioPlayerStore.setCurrentAudioIdByIndex(payload.index)
// }
</script>
